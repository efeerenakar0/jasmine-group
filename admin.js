(() => {
  const state = { properties: [], leads: [], editingId: null };
  const statusLabels = {
    published: 'Yayında', draft: 'Taslak', sold: 'Satıldı', rented: 'Kiralandı',
    new: 'Yeni', contacted: 'İletişim kuruldu', qualified: 'Nitelikli',
    viewing: 'Gösterim', won: 'Kazanıldı', lost: 'Kaybedildi',
  };

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character]);

  async function api(url, options = {}) {
    const response = await fetch(url, {
      credentials: 'same-origin',
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    if (response.status === 401) {
      window.location.replace('admin-login.html');
      throw new Error('Oturum sona erdi.');
    }
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw new Error('Sunucu API yanıtı doğrulanamadı.');
    }
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'İşlem tamamlanamadı.');
    return result;
  }

  function isExternalImage(url) {
    return /^https?:\/\//i.test(url) && !/supabase\.co\/storage\/v1\/object\/public\//i.test(url);
  }

  function showAlert(message) {
    const alert = document.getElementById('admin-alert');
    alert.textContent = message;
    alert.hidden = !message;
  }

  function setView(view) {
    document.querySelectorAll('.admin-nav').forEach(button => button.classList.toggle('active', button.dataset.view === view));
    document.querySelectorAll('.admin-view').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === view));
    const active = document.querySelector(`.admin-nav[data-view="${view}"]`);
    document.getElementById('view-title').textContent = active?.textContent.trim() || 'Yönetim';
    document.body.classList.remove('menu-open');
  }

  function renderOverview() {
    const published = state.properties.filter(item => item.status === 'published' || !item.status).length;
    const newLeads = state.leads.filter(item => item.status === 'new').length;
    const external = state.properties.reduce((total, item) => total + (item.images || []).filter(isExternalImage).length, 0);
    document.getElementById('stat-properties').textContent = state.properties.length;
    document.getElementById('stat-published').textContent = published;
    document.getElementById('stat-leads').textContent = newLeads;
    document.getElementById('stat-external').textContent = external;

    document.getElementById('recent-leads').innerHTML = state.leads.slice(0, 5).map(lead => `
      <div class="compact-row">
        <div><strong>${escapeHTML(lead.name)}</strong><span>${escapeHTML(lead.source)} · ${escapeHTML(lead.property_id || 'Genel')}</span></div>
        <span class="status-pill ${escapeHTML(lead.status)}">${escapeHTML(statusLabels[lead.status] || lead.status)}</span>
      </div>`).join('') || '<p>Henüz talep bulunmuyor.</p>';

    const issues = [
      ['Harici görsel', external, 'Medya yükleme ile değiştirilmeli'],
      ['Taslak ilan', state.properties.filter(item => item.status === 'draft').length, 'Yayın öncesi kontrol bekliyor'],
      ['Görselsiz ilan', state.properties.filter(item => !(item.images || []).length).length, 'Profesyonel fotoğraf gerekli'],
    ];
    document.getElementById('portfolio-health').innerHTML = issues.map(([label, count, hint]) => `
      <div class="health-row"><div><strong>${label}</strong><span>${hint}</span></div><strong>${count}</strong></div>`).join('');
  }

  function renderProperties() {
    const query = document.getElementById('property-search').value.toLocaleLowerCase('tr-TR');
    const properties = state.properties.filter(item => `${item.id} ${item.title} ${item.location}`.toLocaleLowerCase('tr-TR').includes(query));
    document.getElementById('property-table-body').innerHTML = properties.map(property => {
      const external = (property.images || []).filter(isExternalImage).length;
      return `<tr>
        <td><strong>${escapeHTML(property.title)}</strong><small>${escapeHTML(property.id)}</small></td>
        <td>${escapeHTML(property.location)}</td>
        <td>${property.type === 'rent' ? 'Kiralık' : 'Satılık'}</td>
        <td><span class="status-pill ${escapeHTML(property.status || 'published')}">${escapeHTML(statusLabels[property.status] || 'Yayında')}</span></td>
        <td>€ ${Number(property.price_eur || 0).toLocaleString('tr-TR')}</td>
        <td>${(property.images || []).length} görsel${external ? ` · <strong>${external} harici</strong>` : ''}</td>
        <td><div class="row-actions"><button data-edit="${escapeHTML(property.id)}" title="Düzenle"><i class="fa-solid fa-pen"></i></button><button data-delete="${escapeHTML(property.id)}" title="Sil"><i class="fa-solid fa-trash"></i></button></div></td>
      </tr>`;
    }).join('') || '<tr><td colspan="7">Eşleşen ilan bulunamadı.</td></tr>';
  }

  function renderLeads() {
    const filter = document.getElementById('lead-filter').value;
    const leads = state.leads.filter(lead => !filter || lead.status === filter);
    document.getElementById('lead-board').innerHTML = leads.map(lead => `
      <article class="lead-card">
        <span class="status-pill ${escapeHTML(lead.status)}">${escapeHTML(statusLabels[lead.status] || lead.status)}</span>
        <h3>${escapeHTML(lead.name)}</h3>
        <a href="tel:${escapeHTML(lead.phone)}">${escapeHTML(lead.phone)}</a>
        ${lead.email ? `<p><a href="mailto:${escapeHTML(lead.email)}">${escapeHTML(lead.email)}</a></p>` : ''}
        <p>${escapeHTML(lead.message)}</p>
        <p>${escapeHTML(lead.property_id || 'Genel talep')} · ${escapeHTML(lead.source)}</p>
        <select data-lead-status="${lead.id}" aria-label="${escapeHTML(lead.name)} talep durumu">
          ${Object.entries(statusLabels).filter(([value]) => ['new','contacted','qualified','viewing','won','lost'].includes(value)).map(([value, label]) => `<option value="${value}" ${lead.status === value ? 'selected' : ''}>${label}</option>`).join('')}
        </select>
      </article>`).join('') || '<p>Bu durumda talep bulunmuyor.</p>';
  }

  function renderMedia() {
    const externalCount = state.properties.reduce((total, item) => total + (item.images || []).filter(isExternalImage).length, 0);
    document.getElementById('media-external-count').textContent = externalCount;
    document.getElementById('media-property-list').innerHTML = state.properties
      .map(property => ({ ...property, external: (property.images || []).filter(isExternalImage).length }))
      .filter(property => property.external)
      .slice(0, 60)
      .map(property => `<article class="media-item"><strong>${escapeHTML(property.id)} · ${escapeHTML(property.title)}</strong><span>${property.external} bağlantı taşınmalı</span><button class="admin-primary" data-edit="${escapeHTML(property.id)}">Görsel yükle</button></article>`).join('')
      || '<p>Harici görsel bağlantısı bulunmuyor.</p>';
  }

  function renderAll() {
    renderOverview();
    renderProperties();
    renderLeads();
    renderMedia();
  }

  async function loadData() {
    const results = await Promise.allSettled([api('/api/admin/properties'), api('/api/admin/leads')]);
    if (results[0].status === 'fulfilled') state.properties = results[0].value.properties || [];
    if (results[1].status === 'fulfilled') state.leads = results[1].value.leads || [];
    const errors = results.filter(result => result.status === 'rejected').map(result => result.reason.message);
    showAlert(errors.length ? `Kurulum gerekli: ${[...new Set(errors)].join(' ')}` : '');
    renderAll();
  }

  function openPropertyDialog(id = null) {
    const form = document.getElementById('property-form');
    form.reset();
    state.editingId = id;
    const property = state.properties.find(item => item.id === id);
    document.getElementById('property-dialog-title').textContent = property ? 'İlanı düzenle' : 'Yeni ilan';
    form.elements.id.disabled = Boolean(property);
    if (property) {
      for (const [key, value] of Object.entries(property)) {
        const field = form.elements[key === 'desc' ? 'description' : key];
        if (!field) continue;
        if (key === 'images' || key === 'features') field.value = (value || []).join('\n');
        else field.value = value ?? '';
      }
    }
    document.getElementById('property-form-status').textContent = '';
    document.getElementById('property-dialog').showModal();
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function uploadFiles(files, propertyId) {
    const urls = [];
    for (const file of files) {
      if (file.size > 4 * 1024 * 1024) throw new Error(`${file.name} 4 MB sınırını aşıyor.`);
      const data = await fileToDataUrl(file);
      const result = await api('/api/admin/media', {
        method: 'POST',
        body: JSON.stringify({ propertyId, mimeType: file.type, data }),
      });
      urls.push(result.url);
    }
    return urls;
  }

  async function saveProperty(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById('property-form-status');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = Object.fromEntries(new FormData(form).entries());
    data.id = state.editingId || data.id;
    data.images = String(data.images || '').split('\n').map(item => item.trim()).filter(Boolean);
    data.features = String(data.features || '').split('\n').map(item => item.trim()).filter(Boolean);
    const files = Array.from(document.getElementById('property-media').files || []);
    status.textContent = files.length ? 'Görseller yükleniyor...' : 'İlan kaydediliyor...';

    try {
      if (files.length) data.images.push(...await uploadFiles(files, data.id));
      const editing = Boolean(state.editingId);
      const result = await api(editing ? `/api/admin/properties?id=${encodeURIComponent(data.id)}` : '/api/admin/properties', {
        method: editing ? 'PATCH' : 'POST',
        body: JSON.stringify(data),
      });
      const index = state.properties.findIndex(item => item.id === data.id);
      if (index >= 0) state.properties[index] = result.property;
      else state.properties.unshift(result.property);
      status.className = 'admin-status is-success';
      status.textContent = 'İlan kaydedildi.';
      renderAll();
      setTimeout(() => document.getElementById('property-dialog').close(), 500);
    } catch (error) {
      status.className = 'admin-status is-error';
      status.textContent = error.message;
    }
  }

  async function deleteProperty(id) {
    if (!window.confirm(`${id} kodlu ilanı silmek istediğinize emin misiniz?`)) return;
    await api(`/api/admin/properties?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    state.properties = state.properties.filter(item => item.id !== id);
    renderAll();
  }

  async function updateLeadStatus(id, status) {
    const result = await api(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    const lead = state.leads.find(item => String(item.id) === String(id));
    if (lead) Object.assign(lead, result.lead || { status });
    renderAll();
  }

  document.addEventListener('DOMContentLoaded', async () => {
    try {
      const session = await api('/api/admin/session');
      if (session.authenticated !== true || !session.user?.email) throw new Error('Oturum doğrulanamadı.');
      document.getElementById('admin-user').textContent = session.user.email;
    } catch {
      window.location.replace('admin-login.html');
      return;
    }

    document.querySelectorAll('.admin-nav').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
    document.querySelectorAll('[data-jump]').forEach(button => button.addEventListener('click', () => setView(button.dataset.jump)));
    document.querySelectorAll('[data-close-dialog]').forEach(button => button.addEventListener('click', () => document.getElementById('property-dialog').close()));
    document.getElementById('admin-menu-button').addEventListener('click', () => document.body.classList.toggle('menu-open'));
    document.getElementById('property-search').addEventListener('input', renderProperties);
    document.getElementById('lead-filter').addEventListener('change', renderLeads);
    document.getElementById('add-property-button').addEventListener('click', () => openPropertyDialog());
    document.getElementById('property-form').addEventListener('submit', saveProperty);
    document.getElementById('logout-button').addEventListener('click', async () => {
      await api('/api/admin/logout', { method: 'POST' });
      window.location.replace('admin-login.html');
    });
    document.addEventListener('click', event => {
      const edit = event.target.closest('[data-edit]');
      const remove = event.target.closest('[data-delete]');
      if (edit) openPropertyDialog(edit.dataset.edit);
      if (remove) deleteProperty(remove.dataset.delete).catch(error => showAlert(error.message));
    });
    document.addEventListener('change', event => {
      const select = event.target.closest('[data-lead-status]');
      if (select) updateLeadStatus(select.dataset.leadStatus, select.value).catch(error => showAlert(error.message));
    });

    await loadData();
  });
})();
