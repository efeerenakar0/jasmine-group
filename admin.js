(() => {
  const state = { properties: [], leads: [], readiness: null, analytics: null, editingId: null };
  const statusLabels = {
    published: 'Yayında', draft: 'Taslak', sold: 'Satıldı', rented: 'Kiralandı',
    new: 'Yeni', contacted: 'İletişim kuruldu', qualified: 'Nitelikli',
    viewing: 'Gösterim', won: 'Kazanıldı', lost: 'Kaybedildi',
  };
  const categoryLabels = { apartment: 'Daire', villa: 'Villa', land: 'Arsa', commercial: 'Ticari' };

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

  function formatDate(value) {
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? '-'
      : new Intl.DateTimeFormat('tr-TR', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
  }

  function filteredLeads() {
    const filter = document.getElementById('lead-filter').value;
    const query = document.getElementById('lead-search').value.toLocaleLowerCase('tr-TR').trim();
    return state.leads.filter(lead => {
      const haystack = `${lead.name} ${lead.phone} ${lead.email || ''} ${lead.property_id || ''} ${lead.source || ''} ${lead.message || ''}`.toLocaleLowerCase('tr-TR');
      return (!filter || lead.status === filter) && (!query || haystack.includes(query));
    });
  }

  function setView(view) {
    document.querySelectorAll('.admin-nav').forEach(button => button.classList.toggle('active', button.dataset.view === view));
    document.querySelectorAll('.admin-view').forEach(panel => panel.classList.toggle('active', panel.dataset.panel === view));
    const active = document.querySelector(`.admin-nav[data-view="${view}"]`);
    document.getElementById('view-title').textContent = active?.textContent.trim() || 'Yönetim';
    document.body.classList.remove('menu-open');
  }

  function renderOverview() {
    const propertyIdCounts = state.properties.reduce((counts, item) => {
      const id = String(item.id || '').trim();
      if (id) counts.set(id, (counts.get(id) || 0) + 1);
      return counts;
    }, new Map());
    const duplicateIds = [...propertyIdCounts.entries()].filter(([, count]) => count > 1);
    const uniqueProperties = state.properties.filter((item, index, all) => all.findIndex(candidate => candidate.id === item.id) === index);
    const published = uniqueProperties.filter(item => item.status === 'published' || !item.status).length;
    const newLeads = state.leads.filter(item => item.status === 'new').length;
    const external = state.properties.reduce((total, item) => total + (item.images || []).filter(isExternalImage).length, 0);
    document.getElementById('stat-properties').textContent = uniqueProperties.length;
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
      ['Yinelenen ilan kodu', duplicateIds.length, duplicateIds.length ? `${duplicateIds.map(([id, count]) => `${id} (${count})`).slice(0, 3).join(', ')}${duplicateIds.length > 3 ? '…' : ''}` : 'Her ilan kodu tekil'],
    ];
    document.getElementById('portfolio-health').innerHTML = issues.map(([label, count, hint]) => `
      <div class="health-row"><div><strong>${label}</strong><span>${hint}</span></div><strong>${count}</strong></div>`).join('');
  }

  function renderProperties() {
    const query = document.getElementById('property-search').value.toLocaleLowerCase('tr-TR');
    const idCounts = state.properties.reduce((counts, item) => {
      const id = String(item.id || '');
      counts.set(id, (counts.get(id) || 0) + 1);
      return counts;
    }, new Map());
    const properties = state.properties.filter(item => `${item.id} ${item.title} ${item.location}`.toLocaleLowerCase('tr-TR').includes(query));
    document.getElementById('property-table-body').innerHTML = properties.map(property => {
      const external = (property.images || []).filter(isExternalImage).length;
      return `<tr>
        <td><strong>${escapeHTML(property.title)}</strong><small>${escapeHTML(property.id)}${idCounts.get(property.id) > 1 ? ` · <span class="duplicate-code">Yinelenen kod (${idCounts.get(property.id)})</span>` : ''}</small></td>
        <td>${escapeHTML(property.location)}</td>
        <td><strong>${escapeHTML(categoryLabels[property.category] || 'Belirtilmedi')}</strong><small>${property.type === 'rent' ? 'Kiralık' : 'Satılık'}</small></td>
        <td><span class="status-pill ${escapeHTML(property.status || 'published')}">${escapeHTML(statusLabels[property.status] || 'Yayında')}</span></td>
        <td>€ ${Number(property.price_eur || 0).toLocaleString('tr-TR')}</td>
        <td>${(property.images || []).length} görsel${external ? ` · <strong>${external} harici</strong>` : ''}</td>
        <td><div class="row-actions"><button data-edit="${escapeHTML(property.id)}" title="Düzenle"><i class="fa-solid fa-pen"></i></button><button data-delete="${escapeHTML(property.id)}" title="Sil"><i class="fa-solid fa-trash"></i></button></div></td>
      </tr>`;
    }).join('') || '<tr><td colspan="7">Eşleşen ilan bulunamadı.</td></tr>';
  }

  function renderLeads() {
    const leads = filteredLeads();
    const summaryStatuses = ['new', 'contacted', 'qualified', 'viewing', 'won'];
    document.getElementById('lead-summary').innerHTML = summaryStatuses.map(status => `
      <div><span>${escapeHTML(statusLabels[status])}</span><strong>${state.leads.filter(lead => lead.status === status).length}</strong></div>`).join('');
    document.getElementById('lead-board').innerHTML = leads.map(lead => `
      <article class="lead-card" data-lead-card="${escapeHTML(lead.id)}">
        <div class="lead-card-top"><span class="status-pill ${escapeHTML(lead.status)}">${escapeHTML(statusLabels[lead.status] || lead.status)}</span><time>${escapeHTML(formatDate(lead.created_at))}</time></div>
        <h3>${escapeHTML(lead.name)}</h3>
        <a href="tel:${escapeHTML(String(lead.phone || '').replace(/[^\d+]/g, ''))}">${escapeHTML(lead.phone)}</a>
        ${lead.email ? `<p><a href="mailto:${escapeHTML(lead.email)}">${escapeHTML(lead.email)}</a></p>` : ''}
        <p class="lead-message">${escapeHTML(lead.message)}</p>
        <div class="lead-context"><span><i class="fa-solid fa-house"></i> ${escapeHTML(lead.property_id || 'Genel talep')}</span><span><i class="fa-solid fa-link"></i> ${escapeHTML(lead.source)}</span>${lead.contact_preference ? `<span><i class="fa-solid fa-comments"></i> ${escapeHTML({ phone: 'Telefon', whatsapp: 'WhatsApp', email: 'E-posta' }[lead.contact_preference] || lead.contact_preference)}</span>` : ''}${lead.availability ? `<span><i class="fa-solid fa-clock"></i> ${escapeHTML({ weekday_morning: 'Hafta içi sabah', weekday_afternoon: 'Hafta içi öğleden sonra', weekday_evening: 'Hafta içi akşam', weekend: 'Hafta sonu', flexible: 'Esnek' }[lead.availability] || lead.availability)}</span>` : ''}${lead.locale ? `<span><i class="fa-solid fa-language"></i> ${escapeHTML(String(lead.locale).toUpperCase())}</span>` : ''}</div>
        ${(lead.utm_source || lead.utm_medium || lead.utm_campaign) ? `<p class="lead-campaign">Kampanya: ${escapeHTML([lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(' / '))}</p>` : ''}
        <select data-lead-status="${lead.id}" aria-label="${escapeHTML(lead.name)} talep durumu">
          ${Object.entries(statusLabels).filter(([value]) => ['new','contacted','qualified','viewing','won','lost'].includes(value)).map(([value, label]) => `<option value="${value}" ${lead.status === value ? 'selected' : ''}>${label}</option>`).join('')}
        </select>
        <label class="lead-notes">Operasyon notu<textarea data-lead-notes rows="3" maxlength="4000" placeholder="Son görüşme, ihtiyaç, sonraki adım...">${escapeHTML(lead.notes || '')}</textarea></label>
        <button class="admin-secondary lead-save" data-save-lead="${escapeHTML(lead.id)}"><i class="fa-solid fa-floppy-disk"></i> Notu kaydet</button>
      </article>`).join('') || '<p>Bu filtreyle eşleşen talep bulunmuyor.</p>';
  }

  function renderMedia() {
    const mediaState = state.properties.map(property => ({
      ...property,
      external: (property.images || []).filter(isExternalImage).length,
      missing: !(property.images || []).length,
    }));
    const externalCount = mediaState.filter(item => item.external).length;
    const missingCount = mediaState.filter(item => item.missing).length;
    const readyCount = mediaState.filter(item => !item.missing && !item.external).length;
    document.getElementById('media-ready-count').textContent = readyCount;
    document.getElementById('media-missing-count').textContent = missingCount;
    document.getElementById('media-external-count').textContent = externalCount;
    document.getElementById('media-property-list').innerHTML = mediaState
      .filter(property => property.missing || property.external)
      .map(property => `<article class="media-item"><span class="status-pill ${property.external ? 'draft' : ''}">${property.external ? 'Harici bağlantı' : 'Görsel bekliyor'}</span><strong>${escapeHTML(property.id)} · ${escapeHTML(property.title)}</strong><span>${property.external ? `${property.external} bağlantı taşınmalı` : 'İlan yer tutucu görselle yayında'}</span><button class="admin-primary" data-edit="${escapeHTML(property.id)}">Görsel yükle</button></article>`).join('')
      || '<p>Tüm ilanların doğrulanmış medyası hazır.</p>';
  }

  function renderReadiness() {
    const readiness = state.readiness;
    if (!readiness) {
      document.getElementById('readiness-score').textContent = '0/0';
      document.getElementById('readiness-label').textContent = 'Kontrol bekliyor';
      document.getElementById('readiness-grid').innerHTML = '<p>Sistem durumu alınamadı.</p>';
      return;
    }
    document.getElementById('readiness-score').textContent = `${readiness.summary.ready}/${readiness.summary.total}`;
    document.getElementById('readiness-label').textContent = readiness.summary.productionReady ? 'Operasyonel servisler hazır' : 'Aktivasyon adımları bekliyor';
    document.getElementById('readiness-checked-at').textContent = `Son kontrol: ${formatDate(readiness.checkedAt)}`;
    const icons = { ready: 'fa-circle-check', missing: 'fa-circle-minus', error: 'fa-triangle-exclamation', optional: 'fa-circle-info' };
    document.getElementById('readiness-grid').innerHTML = readiness.services.map(service => `
      <article class="readiness-item ${escapeHTML(service.status)}">
        <i class="fa-solid ${icons[service.status] || icons.optional}"></i>
        <div><strong>${escapeHTML(service.label)}</strong><span>${escapeHTML(service.detail)}</span></div>
        <small>${service.status === 'ready' ? 'Hazır' : (service.status === 'optional' ? 'İsteğe bağlı' : service.status === 'error' ? 'Kontrol gerekli' : 'Eksik')}</small>
      </article>`).join('');
  }

  function renderAnalytics() {
    const analytics = state.analytics;
    const configured = analytics?.configured === true;
    document.getElementById('analytics-setup').hidden = configured;
    document.getElementById('analytics-content').hidden = !configured;
    if (!configured) return;

    const summary = analytics.summary || {};
    document.getElementById('analytics-views').textContent = Number(summary.views || 0).toLocaleString('tr-TR');
    document.getElementById('analytics-whatsapp').textContent = Number(summary.whatsapp || 0).toLocaleString('tr-TR');
    document.getElementById('analytics-leads').textContent = Number(summary.leads || 0).toLocaleString('tr-TR');
    document.getElementById('analytics-sessions').textContent = Number(summary.sessions || 0).toLocaleString('tr-TR');
    document.getElementById('analytics-contact-rate').textContent = `%${Number(summary.contactRate || 0).toLocaleString('tr-TR')} dönüşüm`;
    document.getElementById('analytics-lead-rate').textContent = `%${Number(summary.leadRate || 0).toLocaleString('tr-TR')} dönüşüm`;
    document.getElementById('analytics-updated').textContent = `Güncellendi: ${formatDate(analytics.generatedAt)}`;

    const funnel = [
      ['İlan görüntüleme', Number(summary.views || 0), 'views'],
      ['WhatsApp teması', Number(summary.whatsapp || 0), 'whatsapp'],
      ['Başarılı form', Number(summary.leads || 0), 'leads'],
    ];
    const funnelMaximum = Math.max(...funnel.map(item => item[1]), 1);
    document.getElementById('analytics-funnel').innerHTML = funnel.map(([label, value, type]) => `
      <div class="funnel-step ${type}">
        <div><span>${escapeHTML(label)}</span><strong>${value.toLocaleString('tr-TR')}</strong></div>
        <div class="funnel-track"><span style="width:${Math.max(value ? 6 : 0, (value / funnelMaximum) * 100)}%"></span></div>
      </div>`).join('');

    const daily = analytics.daily || [];
    const dailyMaximum = Math.max(...daily.map(item => Number(item.views || 0) + Number(item.whatsapp || 0) + Number(item.leads || 0)), 1);
    document.getElementById('analytics-daily').innerHTML = daily.slice(-14).map(item => {
      const total = Number(item.views || 0) + Number(item.whatsapp || 0) + Number(item.leads || 0);
      return `<div class="daily-row">
        <time>${escapeHTML(new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short' }).format(new Date(`${item.date}T12:00:00`)))}</time>
        <div class="daily-track"><span style="width:${Math.max(total ? 5 : 0, (total / dailyMaximum) * 100)}%"></span></div>
        <strong>${total}</strong>
      </div>`;
    }).join('') || '<p class="analytics-empty">Seçilen dönemde henüz onaylı olay bulunmuyor.</p>';

    document.getElementById('analytics-sources').innerHTML = (analytics.sources || []).map(source => `
      <div class="ranking-row">
        <strong>${escapeHTML(source.source)}</strong>
        <span>${Number(source.views || 0)} görüntüleme · ${Number(source.whatsapp || 0)} WhatsApp · ${Number(source.leads || 0)} form</span>
      </div>`).join('') || '<p class="analytics-empty">Kanal verisi henüz oluşmadı.</p>';

    document.getElementById('analytics-properties').innerHTML = (analytics.topProperties || []).map(item => {
      const property = state.properties.find(candidate => candidate.id === item.propertyId);
      return `<a href="property-detail.html?id=${encodeURIComponent(item.propertyId)}" target="_blank">
        <div><strong>${escapeHTML(property?.title || item.propertyId)}</strong><span>${escapeHTML(item.propertyId)}</span></div>
        <div><b>${Number(item.views || 0)}</b><span>görüntüleme</span></div>
        <div><b>${Number(item.whatsapp || 0)}</b><span>WhatsApp</span></div>
        <div><b>${Number(item.leads || 0)}</b><span>form</span></div>
      </a>`;
    }).join('') || '<p class="analytics-empty">İlan bazlı etkileşim henüz oluşmadı.</p>';
  }

  function renderAll() {
    renderOverview();
    renderProperties();
    renderLeads();
    renderMedia();
    renderAnalytics();
    renderReadiness();
  }

  async function loadData() {
    const days = document.getElementById('analytics-window').value;
    const results = await Promise.allSettled([
      api('/api/admin/properties'),
      api('/api/admin/leads'),
      api('/api/admin/readiness'),
      api(`/api/admin/analytics?days=${encodeURIComponent(days)}`),
    ]);
    if (results[0].status === 'fulfilled') state.properties = results[0].value.properties || [];
    if (results[1].status === 'fulfilled') state.leads = results[1].value.leads || [];
    if (results[2].status === 'fulfilled') state.readiness = results[2].value;
    if (results[3].status === 'fulfilled') state.analytics = results[3].value;
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

  async function updateLead(id, status, notes) {
    const result = await api(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
    const lead = state.leads.find(item => String(item.id) === String(id));
    if (lead) Object.assign(lead, result.lead || { status, notes });
    renderAll();
  }

  function csvCell(value) {
    let text = String(value ?? '').replace(/\r?\n/g, ' ');
    if (/^\s*[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }

  function exportLeadsCsv() {
    const columns = ['id', 'created_at', 'status', 'name', 'phone', 'email', 'property_id', 'source', 'locale', 'utm_source', 'utm_medium', 'utm_campaign', 'message', 'notes'];
    const rows = filteredLeads().map(lead => columns.map(column => csvCell(lead[column])).join(','));
    const csv = `\uFEFF${columns.join(',')}\n${rows.join('\n')}`;
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `jasmine-crm-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function refreshReadiness() {
    const button = document.getElementById('refresh-readiness-button');
    button.disabled = true;
    try {
      state.readiness = await api('/api/admin/readiness');
      renderReadiness();
      showAlert('');
    } catch (error) {
      showAlert(error.message);
    } finally {
      button.disabled = false;
    }
  }

  async function refreshAnalytics() {
    const select = document.getElementById('analytics-window');
    select.disabled = true;
    try {
      state.analytics = await api(`/api/admin/analytics?days=${encodeURIComponent(select.value)}`);
      renderAnalytics();
      showAlert('');
    } catch (error) {
      showAlert(error.message);
    } finally {
      select.disabled = false;
    }
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
    document.getElementById('lead-search').addEventListener('input', renderLeads);
    document.getElementById('lead-filter').addEventListener('change', renderLeads);
    document.getElementById('export-leads-button').addEventListener('click', exportLeadsCsv);
    document.getElementById('refresh-readiness-button').addEventListener('click', refreshReadiness);
    document.getElementById('analytics-window').addEventListener('change', refreshAnalytics);
    document.getElementById('add-property-button').addEventListener('click', () => openPropertyDialog());
    document.getElementById('property-form').addEventListener('submit', saveProperty);
    document.getElementById('logout-button').addEventListener('click', async () => {
      await api('/api/admin/logout', { method: 'POST' });
      window.location.replace('admin-login.html');
    });
    document.addEventListener('click', event => {
      const edit = event.target.closest('[data-edit]');
      const remove = event.target.closest('[data-delete]');
      const saveLead = event.target.closest('[data-save-lead]');
      if (edit) openPropertyDialog(edit.dataset.edit);
      if (remove) deleteProperty(remove.dataset.delete).catch(error => showAlert(error.message));
      if (saveLead) {
        const card = saveLead.closest('[data-lead-card]');
        const lead = state.leads.find(item => String(item.id) === String(saveLead.dataset.saveLead));
        const notes = card?.querySelector('[data-lead-notes]')?.value || '';
        if (lead) updateLead(lead.id, lead.status, notes).catch(error => showAlert(error.message));
      }
    });
    document.addEventListener('change', event => {
      const select = event.target.closest('[data-lead-status]');
      if (select) {
        const card = select.closest('[data-lead-card]');
        const notes = card?.querySelector('[data-lead-notes]')?.value || '';
        updateLead(select.dataset.leadStatus, select.value, notes).catch(error => showAlert(error.message));
      }
    });

    await loadData();
  });
})();
