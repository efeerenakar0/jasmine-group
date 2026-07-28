(() => {
  const placeholder = '../images/property-placeholder.svg';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[character]);

  function trustedImage(url) {
    if (!url) return false;
    const safeSegments = pathname => {
      try {
        return decodeURIComponent(pathname).split('/').every(segment => segment !== '.' && segment !== '..');
      } catch {
        return false;
      }
    };
    if (!/^https?:\/\//i.test(url)) {
      const localPath = String(url).replace(/^\.\.\//, '');
      return /^images\/[a-z0-9._/-]+$/i.test(localPath) && safeSegments(localPath);
    }
    try {
      const parsed = new URL(url);
      return /(?:^|\.)supabase\.co$/i.test(parsed.hostname)
        && parsed.pathname.includes('/storage/v1/object/public/')
        && safeSegments(parsed.pathname);
    } catch {
      return false;
    }
  }

  function displayImage(url) {
    if (!trustedImage(url)) return placeholder;
    if (/^https?:\/\//i.test(url) || url.startsWith('../')) return url;
    return `../${url.replace(/^\/+/, '')}`;
  }

  function englishLocation(value) {
    return String(value || '')
      .replace(/\bMh\./gi, 'District')
      .replace(/\bMahallesi\b/gi, 'District')
      .replace(/\bMerkez\b/gi, 'Centre');
  }

  function propertyKind(property) {
    const source = String(property.title || '').toLocaleLowerCase('tr-TR');
    if (source.includes('villa')) return 'Villa';
    if (source.includes('penthouse')) return 'Penthouse';
    if (source.includes('arsa')) return 'Land';
    if (source.includes('ticari') || source.includes('dükkan') || source.includes('ofis')) return 'Commercial Property';
    return 'Apartment';
  }

  function englishPropertyTitle(property) {
    const district = englishLocation(String(property.location || '').split('/').slice(-1)[0].trim()).replace(/\s+District$/i, '');
    const status = property.type === 'rent' ? 'for Rent' : 'for Sale';
    const area = property.area_net ? ` · ${property.area_net}` : '';
    return `${property.rooms || ''} ${propertyKind(property)} ${status} in ${district || 'Alanya'}${area}`.trim();
  }

  function englishPropertyDescription(property) {
    const district = englishLocation(String(property.location || '').split('/').slice(-1)[0].trim()).replace(/\s+District$/i, '');
    const use = property.type === 'rent' ? 'rental' : 'sale';
    return `${property.rooms || 'Residential'} ${propertyKind(property).toLowerCase()} offered for ${use} in ${district || 'Alanya'}. Request current availability, approved media, exact specifications and property-specific documents from an advisor.`;
  }

  function englishBathrooms(value) {
    const match = String(value || '').match(/\d+(?:[.,]\d+)?/);
    if (!match) return '-';
    const count = match[0].replace(',', '.');
    return `${count} ${Number(count) === 1 ? 'bathroom' : 'bathrooms'}`;
  }

  function trackEvent(name, parameters = {}) {
    if (localStorage.getItem('jg_cookie_consent') !== 'accepted') return;
    if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, parameters);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...parameters });
  }

  function trackPropertyView() {
    if (!window.__jasminePropertyContext || window.__jasminePropertyViewTracked) return;
    if (localStorage.getItem('jg_cookie_consent') !== 'accepted') return;
    trackEvent('view_item', window.__jasminePropertyContext);
    window.__jasminePropertyViewTracked = true;
  }

  function loadAnalytics() {
    if (window.__jasmineAnalyticsLoaded) return;
    const config = window.JASMINE_ANALYTICS || {};
    window.__jasmineAnalyticsLoaded = true;
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
    if (config.metaPixelId) {
      window.fbq = window.fbq || function fbq() { (window.fbq.queue = window.fbq.queue || []).push(arguments); };
      const pixel = document.createElement('script');
      pixel.async = true;
      pixel.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(pixel);
      window.fbq('init', config.metaPixelId);
      window.fbq('track', 'PageView');
    }
    trackPropertyView();
  }

  function initConsent() {
    const choice = localStorage.getItem('jg_cookie_consent');
    if (choice === 'accepted') return loadAnalytics();
    if (choice === 'rejected') return;
    const banner = document.createElement('section');
    banner.className = 'cookie-consent';
    banner.innerHTML = '<div><strong>Your privacy is your choice.</strong><p>Analytics and advertising tools only load after your consent. <a href="cookie-policy.html">Cookie policy</a></p></div><div class="cookie-actions"><button data-cookie="reject">Reject</button><button data-cookie="accept">Accept</button></div>';
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

  async function fetchPropertyData(query = '') {
    try {
      const response = await fetch(`/api/properties?limit=500${query}`);
      if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) throw new Error('API unavailable');
      return await response.json();
    } catch {
      const fallback = await fetch('../admin/data.json');
      if (!fallback.ok) throw new Error('Fallback unavailable');
      return await fallback.json();
    }
  }

  async function loadProperties() {
    const grid = document.getElementById('en-property-grid');
    if (!grid) return;
    try {
      const propertyType = document.body.dataset.enPropertyType || 'sale';
      const data = await fetchPropertyData(`&type=${encodeURIComponent(propertyType)}`);
      window.enPropertyType = propertyType;
      window.enProperties = (data.properties || []).filter(item => !item.type || item.type === propertyType);
      const locations = [...new Set(window.enProperties.map(item => String(item.location || '').split('/').slice(-1)[0].trim()).filter(Boolean))].sort();
      const select = document.getElementById('en-location');
      locations.forEach(location => select?.insertAdjacentHTML('beforeend', `<option value="${escapeHTML(location)}">${escapeHTML(location)}</option>`));
      const requestedLocation = new URLSearchParams(window.location.search).get('loc');
      if (requestedLocation && select) {
        const match = [...select.options].find(option => option.value.toLowerCase().includes(requestedLocation.toLowerCase()));
        if (match) select.value = match.value;
      }
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
      const image = displayImage(approvedImage);
      const locationName = englishLocation(String(property.location || '').split('/').slice(-1)[0].trim());
      const message = encodeURIComponent(`Hello, I would like information about property ${property.id}.`);
      const isRental = property.type === 'rent';
      const title = englishPropertyTitle(property);
      return `<article class="property-item property-card-v2">
        <div class="property-card-media"><img src="${escapeHTML(image)}" alt="${escapeHTML(title)}" loading="lazy">${approvedImage ? '' : '<span class="media-pending-badge"><i class="fa-solid fa-camera"></i> Verified photos on request</span>'}</div>
        <div class="property-card-content"><div class="property-card-eyebrow">${isRental ? 'FOR RENT' : 'FOR SALE'} · ${escapeHTML(locationName)}</div><h2 class="prop-title">${escapeHTML(title)}</h2><div class="prop-location">${escapeHTML(englishLocation(property.location))}</div><div class="prop-rooms"><span>${escapeHTML(property.rooms || '-')} rooms</span><span>${escapeHTML(property.area_net || '-')}</span></div><div class="prop-footer"><div><small>${isRental ? 'Monthly price' : 'Price'}</small><div class="prop-price">€ ${Number(property.price_eur || 0).toLocaleString('en-GB')}${isRental ? ' / month' : ''}</div></div><div class="en-card-actions"><a class="prop-btn" href="property-detail.html?id=${encodeURIComponent(property.id)}">VIEW</a><a class="prop-btn primary" href="https://wa.me/905330850769?text=${message}">ENQUIRE</a></div></div><p class="property-card-verification"><i class="fa-solid fa-circle-check"></i> Price and availability are subject to advisor confirmation.</p></div>
      </article>`;
    }).join('') || '<article class="listing-empty-state"><h3>No matching property found.</h3><a href="contact.html">Request a personal shortlist</a></article>';
  }

  function setMeta(selector, value) {
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(selector.includes('property=') ? 'property' : 'name', selector.match(/["']([^"']+)["']/)?.[1] || '');
      document.head.appendChild(element);
    }
    element.setAttribute('content', value);
  }

  async function loadPropertyDetail() {
    const container = document.getElementById('en-property-detail');
    if (!container) return;
    try {
      const id = new URLSearchParams(window.location.search).get('id');
      const data = await fetchPropertyData();
      const property = (data.properties || []).find(item => String(item.id) === String(id));
      if (!property) throw new Error('not-found');

      const approvedImages = (property.images || []).filter(trustedImage).map(displayImage);
      const image = approvedImages[0] || placeholder;
      const isRental = property.type === 'rent';
      const title = englishPropertyTitle(property);
      const description = englishPropertyDescription(property);
      const canonical = `${location.origin}/en/property-detail.html?id=${encodeURIComponent(property.id)}`;
      document.title = `${title} | Jasmine Group`;
      document.getElementById('en-detail-heading').textContent = title;
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
      setMeta('meta[name="description"]', `${title}. ${description}`.slice(0, 160));
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[property="og:url"]', canonical);
      setMeta('meta[property="og:image"]', new URL(image, location.href).href);

      const schema = document.createElement('script');
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: title,
        description,
        url: canonical,
        image: approvedImages.map(item => new URL(item, location.href).href),
        offers: { '@type': 'Offer', price: Number(property.price_eur || 0), priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
        address: { '@type': 'PostalAddress', addressLocality: englishLocation(property.location), addressRegion: 'Antalya', addressCountry: 'TR' },
      });
      document.head.appendChild(schema);

      const message = encodeURIComponent(`Hello, I would like verified information about property ${property.id}.`);
      window.__jasminePropertyContext = {
        item_id: property.id,
        item_name: title,
        item_category: property.type,
        value: Number(property.price_eur || 0),
        currency: 'EUR',
        locale: 'en',
      };
      trackPropertyView();
      container.innerHTML = `<div class="en-detail-layout">
        <div class="en-detail-media"><img src="${escapeHTML(image)}" alt="${escapeHTML(title)}">${approvedImages.length ? '' : '<span class="media-pending-badge"><i class="fa-solid fa-camera"></i> Verified property photos on request</span>'}</div>
        <article class="en-detail-summary"><p class="section-kicker">${isRental ? 'FOR RENT' : 'FOR SALE'} · ${escapeHTML(property.id)}</p><h2>${escapeHTML(title)}</h2><p class="prop-location"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(englishLocation(property.location))}</p><strong class="en-detail-price">€ ${Number(property.price_eur || 0).toLocaleString('en-GB')}${isRental ? ' / month' : ''}</strong>
          <div class="en-detail-facts"><span><small>Rooms</small>${escapeHTML(property.rooms || '-')}</span><span><small>Bathrooms</small>${escapeHTML(englishBathrooms(property.bathrooms))}</span><span><small>Net area</small>${escapeHTML(property.area_net || '-')}</span><span><small>Reference</small>${escapeHTML(property.id)}</span></div>
          <p>${escapeHTML(description)}</p><div class="property-card-verification"><i class="fa-solid fa-circle-check"></i> Price, availability, media and property-specific documents are subject to advisor confirmation.</div>
          <div class="en-hero-actions"><a href="https://wa.me/905330850769?text=${message}">Ask on WhatsApp</a><a href="contact.html?property=${encodeURIComponent(property.id)}">Request a consultation</a></div>
        </article>
      </div><section class="proof-standard"><div><p class="section-kicker">BEFORE YOU DECIDE</p><h2>Request the current property file.</h2></div><p>Ask for confirmed availability, approved media and the property-specific information required by your independent legal and technical professionals.</p></section>`;
    } catch {
      document.getElementById('en-detail-heading').textContent = 'Property not found';
      container.innerHTML = '<article class="listing-empty-state"><h2>This property is no longer available in the public collection.</h2><p>Request a current shortlist with similar options.</p><a href="buy.html">Browse current properties</a></article>';
    }
  }

  async function renderEnglishBlogs() {
    const grid = document.getElementById('en-blog-grid');
    if (!grid) return;
    try {
      const response = await fetch('../blogs-en.json');
      if (!response.ok) throw new Error('Blog data unavailable');
      const blogs = await response.json();
      grid.innerHTML = blogs.map(blog => `<article class="blog-card-v2"><a href="blog/${encodeURIComponent(blog.id)}.html" class="blog-img"><img src="${escapeHTML(displayImage(blog.image))}" alt="${escapeHTML(blog.title)}" loading="lazy"><span>${escapeHTML(blog.category)}</span></a><div class="blog-body"><time>${escapeHTML(blog.date)}</time><h2><a href="blog/${encodeURIComponent(blog.id)}.html">${escapeHTML(blog.title)}</a></h2><p>${escapeHTML(blog.excerpt)}</p><a class="blog-read-more" href="blog/${encodeURIComponent(blog.id)}.html">Read guide <i class="fa-solid fa-arrow-right"></i></a></div></article>`).join('');
    } catch {
      grid.innerHTML = '<article class="listing-empty-state"><h3>Guides are temporarily unavailable.</h3><a href="contact.html">Ask an advisor</a></article>';
    }
  }

  function initMobileNavigation() {
    const button = document.getElementById('en-menu-button');
    const close = document.getElementById('en-menu-close');
    const menu = document.getElementById('en-mobile-menu');
    const overlay = document.getElementById('en-menu-overlay');
    if (!button || !menu || !overlay) return;
    const setOpen = open => {
      menu.classList.toggle('active', open);
      overlay.classList.toggle('active', open);
      button.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    button.addEventListener('click', () => setOpen(true));
    close?.addEventListener('click', () => setOpen(false));
    overlay.addEventListener('click', () => setOpen(false));
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
      trackEvent('generate_lead', { source: 'en-contact', locale: 'en' });
    } catch {
      status.className = 'form-status is-error';
      status.textContent = 'Please contact us on WhatsApp: +90 533 085 0769.';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-en-lead]').forEach(form => form.addEventListener('submit', submitLead));
    ['en-search', 'en-location', 'en-rooms', 'en-sort'].forEach(id => document.getElementById(id)?.addEventListener('input', renderProperties));
    initMobileNavigation();
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => link.addEventListener('click', () => trackEvent('contact_whatsapp', { page: window.location.pathname, locale: 'en' })));
    loadAnalyticsConfiguration();
    loadProperties();
    loadPropertyDetail();
    renderEnglishBlogs();
  });
})();
