(() => {
  const placeholder = '../images/property-placeholder.svg';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character]);

  function trustedImage(url) {
    if (!url) return false;
    if (!/^https?:\/\//i.test(url)) return /^(?:\.\.\/)?images\/[a-z0-9._/-]+$/i.test(url);
    try {
      const parsed = new URL(url);
      return /(?:^|\.)supabase\.co$/i.test(parsed.hostname) && parsed.pathname.includes('/storage/v1/object/public/');
    } catch {
      return false;
    }
  }

  function loadAnalytics() {
    const config = window.JASMINE_ANALYTICS || {};
    if (config.gtmId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(config.gtmId)}`;
      document.head.appendChild(script);
    } else if (config.ga4Id) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.ga4Id)}`;
      document.head.appendChild(script);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', config.ga4Id, { anonymize_ip: true });
    }
  }

  function initConsent() {
    const choice = localStorage.getItem('jg_cookie_consent');
    if (choice === 'accepted') return loadAnalytics();
    if (choice === 'rejected') return;
    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.innerHTML = '<div><strong>Your privacy is your choice.</strong><p>Analytics and advertising tools only load after your consent. <a href="../cookie-policy.html">Cookie policy</a></p></div><div class="cookie-actions"><button data-cookie="reject">Reject</button><button data-cookie="accept">Accept</button></div>';
    document.body.appendChild(banner);
    banner.querySelectorAll('[data-cookie]').forEach(button => button.addEventListener('click', () => {
      const accepted = button.dataset.cookie === 'accept';
      localStorage.setItem('jg_cookie_consent', accepted ? 'accepted' : 'rejected');
      banner.remove();
      if (accepted) loadAnalytics();
    }));
  }

  function loadAnalyticsConfiguration() {
    const script = document.createElement('script');
    script.src = '../analytics-config.js';
    script.onload = initConsent;
    script.onerror = initConsent;
    document.head.appendChild(script);
  }

  async function loadProperties() {
    const grid = document.getElementById('en-property-grid');
    if (!grid) return;
    try {
      let data;
      try {
        const response = await fetch('/api/properties?type=sale&limit=500');
        if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('API unavailable');
        data = await response.json();
      } catch {
        const fallback = await fetch('../admin/data.json');
        if (!fallback.ok) throw new Error('Fallback unavailable');
        data = await fallback.json();
      }
      window.enProperties = (data.properties || []).filter(item => !item.type || item.type === 'sale');
      const locations = [...new Set(window.enProperties.map(item => String(item.location || '').split('/').slice(-1)[0].trim()).filter(Boolean))].sort();
      const select = document.getElementById('en-location');
      locations.forEach(location => select.insertAdjacentHTML('beforeend', `<option value="${escapeHTML(location)}">${escapeHTML(location)}</option>`));
      renderProperties();
    } catch {
      grid.innerHTML = '<article class="listing-empty-state"><h3>Property data is temporarily unavailable.</h3><p>Please contact our team for a personal shortlist.</p><a href="contact.html">Contact an advisor</a></article>';
      document.getElementById('en-count').textContent = 'Personal shortlist available';
    }
  }

  function renderProperties() {
    const query = document.getElementById('en-search').value.toLowerCase();
    const location = document.getElementById('en-location').value.toLowerCase();
    const rooms = document.getElementById('en-rooms').value;
    const sort = document.getElementById('en-sort').value;
    const properties = (window.enProperties || []).filter(item => {
      const haystack = `${item.title} ${item.location} ${item.description || item.desc || ''}`.toLowerCase();
      return (!query || haystack.includes(query))
        && (!location || String(item.location).toLowerCase().includes(location))
        && (!rooms || String(item.rooms || '').startsWith(rooms));
    });
    if (sort === 'price-asc') properties.sort((a, b) => Number(a.price_eur) - Number(b.price_eur));
    if (sort === 'price-desc') properties.sort((a, b) => Number(b.price_eur) - Number(a.price_eur));

    document.getElementById('en-count').textContent = `${properties.length} properties`;
    document.getElementById('en-property-grid').innerHTML = properties.slice(0, 60).map(property => {
      const approvedImage = (property.images || []).find(trustedImage);
      const image = approvedImage || placeholder;
      const locationName = String(property.location || '').split('/').slice(-1)[0].trim();
      const message = encodeURIComponent(`Hello, I would like information about property ${property.id}.`);
      return `<article class="property-item property-card-v2">
        <div class="property-card-media"><img src="${escapeHTML(image)}" alt="${escapeHTML(property.title)}" loading="lazy">${approvedImage ? '' : '<span class="media-pending-badge"><i class="fa-solid fa-camera"></i> Verified photos on request</span>'}</div>
        <div class="property-card-content"><div class="property-card-eyebrow">FOR SALE · ${escapeHTML(locationName)}</div><h2 class="prop-title">${escapeHTML(property.title)}</h2><div class="prop-location">${escapeHTML(property.location)}</div><div class="prop-rooms"><span>${escapeHTML(property.rooms || '-')} rooms</span><span>${escapeHTML(property.area_net || '-')}</span></div><div class="prop-footer"><div><small>Price</small><div class="prop-price">€ ${Number(property.price_eur || 0).toLocaleString('en-GB')}</div></div><a class="prop-btn primary" href="https://wa.me/905330850769?text=${message}">REQUEST DETAILS</a></div><p class="property-card-verification"><i class="fa-solid fa-circle-check"></i> Price and availability are subject to advisor confirmation.</p></div>
      </article>`;
    }).join('') || '<article class="listing-empty-state"><h3>No matching property found.</h3><a href="contact.html">Request a personal shortlist</a></article>';
  }

  async function submitLead(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = form.querySelector('.form-status');
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    payload.consent = data.get('consent') === 'on';
    payload.pageUrl = window.location.href;
    payload.locale = 'en';
    const campaign = new URLSearchParams(window.location.search);
    payload.utmSource = campaign.get('utm_source') || '';
    payload.utmMedium = campaign.get('utm_medium') || '';
    payload.utmCampaign = campaign.get('utm_campaign') || '';
    status.textContent = 'Sending your request...';
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Your request could not be sent.');
      form.reset();
      status.className = 'form-status is-success';
      status.textContent = 'Thank you. Our team will contact you shortly.';
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { source: 'en-contact' });
    } catch {
      status.className = 'form-status is-error';
      status.textContent = 'Please contact us on WhatsApp: +90 533 085 0769.';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-en-lead]').forEach(form => form.addEventListener('submit', submitLead));
    ['en-search', 'en-location', 'en-rooms', 'en-sort'].forEach(id => document.getElementById(id)?.addEventListener('input', renderProperties));
    loadAnalyticsConfiguration();
    loadProperties();
  });
})();
