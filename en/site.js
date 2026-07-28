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
    const categories = { apartment: 'Apartment', villa: 'Villa', land: 'Land', commercial: 'Commercial Property' };
    if (categories[property.category]) return categories[property.category];
    const source = String(property.title || '').toLocaleLowerCase('tr-TR');
    if (source.includes('villa')) return 'Villa';
    if (source.includes('penthouse')) return 'Penthouse';
    if (source.includes('arsa')) return 'Land';
    if (source.includes('ticari') || source.includes('dükkan') || source.includes('ofis')) return 'Commercial Property';
    return 'Apartment';
  }

  function propertyCategory(property) {
    const kind = propertyKind(property);
    if (kind === 'Villa') return 'villa';
    if (kind === 'Land') return 'land';
    if (kind === 'Commercial Property') return 'commercial';
    return 'apartment';
  }

  function metricNumber(value) {
    const match = String(value || '').replace(',', '.').match(/\d+(?:\.\d+)?/);
    return match ? Number(match[0]) : 0;
  }

  let compareIds = (() => {
    try {
      const stored = JSON.parse(localStorage.getItem('jg_property_compare') || '[]');
      return Array.isArray(stored) ? [...new Set(stored.filter(id => /^[A-Za-z0-9._-]+$/.test(id)))].slice(0, 3) : [];
    } catch {
      return [];
    }
  })();

  function ensureCompareUI() {
    let button = document.getElementById('en-compare-floating');
    if (button) return button;
    button = document.createElement('button');
    button.id = 'en-compare-floating';
    button.className = 'compare-floating-action';
    button.type = 'button';
    button.innerHTML = '<i class="fa-solid fa-code-compare"></i> Compare <span>0</span>';
    button.addEventListener('click', openCompare);
    document.body.appendChild(button);
    return button;
  }

  function updateCompareUI() {
    const floating = ensureCompareUI();
    floating.style.display = compareIds.length ? 'inline-flex' : 'none';
    floating.querySelector('span').textContent = String(compareIds.length);
    document.querySelectorAll('[data-en-compare-id]').forEach(button => {
      const active = compareIds.includes(button.dataset.enCompareId);
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    localStorage.setItem('jg_property_compare', JSON.stringify(compareIds));
  }

  function toggleCompare(id) {
    if (compareIds.includes(id)) compareIds = compareIds.filter(item => item !== id);
    else if (compareIds.length < 3) compareIds.push(id);
    else return;
    updateCompareUI();
  }

  function closeCompare() {
    document.getElementById('en-compare-modal')?.remove();
    document.body.style.overflow = '';
  }

  function openCompare() {
    closeCompare();
    const selected = compareIds.map(id => (window.enProperties || []).find(property => property.id === id)).filter(Boolean);
    const modal = document.createElement('section');
    modal.id = 'en-compare-modal';
    modal.className = 'collection-modal active compare-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Property comparison');
    const cards = selected.map(property => {
      const title = englishPropertyTitle(property);
      const image = displayImage((property.images || []).find(trustedImage));
      return `<article class="collection-item en-compare-card"><button type="button" data-remove="${escapeHTML(property.id)}" aria-label="Remove ${escapeHTML(property.id)}"><i class="fa-solid fa-xmark"></i></button><img src="${escapeHTML(image)}" alt="${escapeHTML(title)}"><div><small>${escapeHTML(englishLocation(property.location))}</small><h3>${escapeHTML(title)}</h3><strong>€ ${Number(property.price_eur || 0).toLocaleString('en-GB')}${property.type === 'rent' ? ' / month' : ''}</strong><dl><div><dt>Rooms</dt><dd>${escapeHTML(property.rooms || '-')}</dd></div><div><dt>Net area</dt><dd>${escapeHTML(property.area_net || '-')}</dd></div><div><dt>Type</dt><dd>${escapeHTML(propertyKind(property))}</dd></div>${property.floor ? `<div><dt>Floor</dt><dd>${escapeHTML(property.floor)}</dd></div>` : ''}${property.year_built ? `<div><dt>Year built</dt><dd>${escapeHTML(property.year_built)}</dd></div>` : ''}</dl><a href="properties/${encodeURIComponent(property.id)}.html">View property</a></div></article>`;
    }).join('') || '<div class="collection-empty"><h3>Your comparison list is empty.</h3><a href="buy.html">Browse properties</a></div>';
    modal.innerHTML = `<button class="collection-modal-backdrop" type="button" aria-label="Close comparison"></button><div class="collection-modal-panel"><header><div><p class="section-kicker">DECISION SUPPORT</p><h2>Compare properties</h2></div><button type="button" data-close aria-label="Close comparison"><i class="fa-solid fa-xmark"></i></button></header><div class="compare-content">${cards}</div></div>`;
    modal.querySelector('[data-close]').addEventListener('click', closeCompare);
    modal.querySelector('.collection-modal-backdrop').addEventListener('click', closeCompare);
    modal.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => { toggleCompare(button.dataset.remove); openCompare(); }));
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
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

  function analyticsSessionId() {
    let sessionId = sessionStorage.getItem('jg_analytics_session');
    if (sessionId) return sessionId;
    if (window.crypto?.randomUUID) sessionId = window.crypto.randomUUID();
    else {
      const bytes = new Uint8Array(16);
      window.crypto.getRandomValues(bytes);
      sessionId = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
    }
    sessionStorage.setItem('jg_analytics_session', sessionId);
    return sessionId;
  }

  function analyticsAttribution() {
    const params = new URLSearchParams(window.location.search);
    const current = {
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
      referrerHost: '',
    };
    if (current.utmSource || current.utmMedium || current.utmCampaign) {
      sessionStorage.setItem('jg_analytics_attribution', JSON.stringify(current));
      return current;
    }
    try {
      const storedAttribution = sessionStorage.getItem('jg_analytics_attribution');
      if (storedAttribution) return JSON.parse(storedAttribution);
    } catch {
      // Invalid session data is replaced with a fresh attribution record.
    }
    try {
      const referrer = document.referrer ? new URL(document.referrer) : null;
      current.referrerHost = referrer && referrer.hostname !== window.location.hostname ? referrer.hostname : '';
    } catch {
      current.referrerHost = '';
    }
    sessionStorage.setItem('jg_analytics_attribution', JSON.stringify(current));
    return current;
  }

  function recordFirstPartyEvent(name, parameters = {}) {
    const attribution = analyticsAttribution();
    const width = window.innerWidth;
    const device = width < 768 ? 'mobile' : (width < 1100 ? 'tablet' : 'desktop');
    fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        consent: true,
        eventName: name,
        sessionId: analyticsSessionId(),
        propertyId: parameters.property_id || '',
        pathname: window.location.pathname,
        locale: 'en',
        eventSource: parameters.source || '',
        utmSource: attribution.utmSource || '',
        utmMedium: attribution.utmMedium || '',
        utmCampaign: attribution.utmCampaign || '',
        referrerHost: attribution.referrerHost || '',
        device,
      }),
    }).catch(() => {});
  }

  function trackEvent(name, parameters = {}) {
    if (localStorage.getItem('jg_cookie_consent') !== 'accepted') return false;
    recordFirstPartyEvent(name, parameters);
    if (typeof window.gtag === 'function') window.gtag('event', name, parameters);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, parameters);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, ...parameters });
    return true;
  }

  function trackPropertyView() {
    if (!window.__jasminePropertyContext || window.__jasminePropertyViewTracked) return;
    if (localStorage.getItem('jg_cookie_consent') !== 'accepted') return;
    if (trackEvent('view_item', window.__jasminePropertyContext)) {
      window.__jasminePropertyViewTracked = true;
    }
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

  function englishFilterValues() {
    const value = id => document.getElementById(id)?.value?.trim() || '';
    return {
      q: value('en-search'),
      loc: value('en-location'),
      category: value('en-category'),
      market: value('en-market'),
      room: value('en-rooms'),
      min: value('en-price-min'),
      max: value('en-price-max'),
      areaMin: value('en-area-min'),
      sort: value('en-sort'),
    };
  }

  function englishFilterQuery(filters) {
    const params = new URLSearchParams();
    ['q', 'loc', 'category', 'market', 'room', 'min', 'max', 'areaMin'].forEach(key => {
      if (filters[key]) params.set(key, filters[key]);
    });
    if (filters.sort && filters.sort !== 'newest') params.set('sort', filters.sort);
    return params;
  }

  function renderEnglishFilterChips(filters, resultCount) {
    const container = document.getElementById('en-active-filter-chips');
    if (!container) return;
    const categoryLabels = { apartment: 'Apartment', villa: 'Villa', land: 'Land', commercial: 'Commercial' };
    const marketLabels = { new: 'New build', resale: 'Resale', under_construction: 'Under construction' };
    const labels = {
      q: value => `“${value}”`,
      loc: value => value,
      category: value => categoryLabels[value] || value,
      market: value => marketLabels[value] || value,
      room: value => value === '4' ? '4+ rooms' : `${value}+ rooms`,
      min: value => `Min €${Number(value).toLocaleString('en-GB')}`,
      max: value => `Max €${Number(value).toLocaleString('en-GB')}`,
      areaMin: value => `Min ${value} m²`,
    };
    const active = Object.entries(labels).filter(([key]) => filters[key]);
    container.innerHTML = active.length
      ? `<span class="filter-result-summary">${resultCount} results</span>${active.map(([key, formatter]) => `<button type="button" data-en-clear-filter="${key}">${escapeHTML(formatter(filters[key]))} <i class="fa-solid fa-xmark"></i></button>`).join('')}`
      : `<span class="filter-result-summary">${resultCount} current properties</span><span class="filter-empty-note">Add filters to focus your shortlist.</span>`;
  }

  function hydrateEnglishFilters() {
    const params = new URLSearchParams(window.location.search);
    const ids = {
      q: 'en-search', category: 'en-category', market: 'en-market', room: 'en-rooms',
      min: 'en-price-min', max: 'en-price-max', areaMin: 'en-area-min', sort: 'en-sort',
    };
    Object.entries(ids).forEach(([key, id]) => {
      const control = document.getElementById(id);
      if (control && params.get(key)) control.value = params.get(key);
    });
    const requestedLocation = params.get('loc');
    const locationControl = document.getElementById('en-location');
    if (requestedLocation && locationControl) {
      const match = [...locationControl.options].find(option => option.value.toLowerCase().includes(requestedLocation.toLowerCase()));
      if (match) locationControl.value = match.value;
    }
  }

  async function loadProperties() {
    const grid = document.getElementById('en-property-grid');
    if (!grid) return;
    try {
      const propertyType = document.body.dataset.enPropertyType || 'sale';
      const data = await fetchPropertyData(`&type=${encodeURIComponent(propertyType)}`);
      window.enPropertyType = propertyType;
      const seenIds = new Set();
      window.enProperties = (data.properties || []).filter(item => {
        if (item.type && item.type !== propertyType) return false;
        if (!item.id || seenIds.has(item.id)) return false;
        seenIds.add(item.id);
        return true;
      });
      const locations = [...new Set(window.enProperties.map(item => String(item.location || '').split('/').slice(-1)[0].trim()).filter(Boolean))].sort();
      const select = document.getElementById('en-location');
      locations.forEach(location => select?.insertAdjacentHTML('beforeend', `<option value="${escapeHTML(location)}">${escapeHTML(location)}</option>`));
      hydrateEnglishFilters();
      renderProperties();
    } catch {
      grid.innerHTML = '<article class="listing-empty-state"><h3>Property data is temporarily unavailable.</h3><p>Please contact our team for a personal shortlist.</p><a href="contact.html">Contact an advisor</a></article>';
      document.getElementById('en-count').textContent = 'Personal shortlist available';
    }
  }

  async function loadRegionCounts() {
    const counters = [...document.querySelectorAll('[data-region-count]')];
    if (!counters.length) return;
    try {
      const data = await fetchPropertyData();
      counters.forEach(counter => {
        const location = String(counter.dataset.regionCount || '').toLocaleLowerCase('tr-TR');
        const count = (data.properties || []).filter(property => (
          (!property.status || property.status === 'published')
          && String(property.location || '').toLocaleLowerCase('tr-TR').includes(location)
        )).length;
        counter.textContent = String(count);
      });
    } catch {
      // Build-time counts remain visible if the live data service is unavailable.
    }
  }

  function renderProperties() {
    const filters = englishFilterValues();
    const query = filters.q.toLowerCase();
    const location = filters.loc.toLowerCase();
    const minimumPrice = Number(filters.min || 0);
    const maximumPrice = Number(filters.max || Number.MAX_SAFE_INTEGER);
    const minimumArea = Number(filters.areaMin || 0);
    const properties = (window.enProperties || []).filter(item => {
      const haystack = `${item.id} ${item.title} ${item.location} ${item.description || item.desc || ''} ${(item.features || []).join(' ')}`.toLowerCase();
      const roomCount = Number.parseInt(String(item.rooms || ''), 10);
      return (!query || haystack.includes(query))
        && (!location || String(item.location).toLowerCase().includes(location))
        && (!filters.category || propertyCategory(item) === filters.category)
        && (!filters.market || item.market_status === filters.market)
        && (!filters.room || (filters.room === '4' ? roomCount >= 4 : roomCount === Number(filters.room)))
        && Number(item.price_eur || 0) >= minimumPrice
        && Number(item.price_eur || 0) <= maximumPrice
        && metricNumber(item.area_net) >= minimumArea;
    });
    if (filters.sort === 'price-asc') properties.sort((a, b) => Number(a.price_eur) - Number(b.price_eur));
    if (filters.sort === 'price-desc') properties.sort((a, b) => Number(b.price_eur) - Number(a.price_eur));

    document.getElementById('en-count').textContent = `${properties.length} properties`;
    const filterQuery = englishFilterQuery(filters).toString();
    window.history.replaceState({}, document.title, `${window.location.pathname}${filterQuery ? `?${filterQuery}` : ''}`);
    renderEnglishFilterChips(filters, properties.length);
    document.getElementById('en-property-grid').innerHTML = properties.slice(0, 60).map(property => {
      const approvedImage = (property.images || []).find(trustedImage);
      const image = displayImage(approvedImage);
      const locationName = englishLocation(String(property.location || '').split('/').slice(-1)[0].trim());
      const message = encodeURIComponent(`Hello, I would like information about property ${property.id}.`);
      const isRental = property.type === 'rent';
      const title = englishPropertyTitle(property);
      return `<article class="property-item property-card-v2">
        <div class="property-card-media"><img src="${escapeHTML(image)}" alt="${escapeHTML(title)}" loading="lazy">${approvedImage ? '' : '<span class="media-pending-badge"><i class="fa-solid fa-camera"></i> Verified photos on request</span>'}</div>
        <div class="property-card-content"><div class="property-card-eyebrow">${isRental ? 'FOR RENT' : 'FOR SALE'} · ${escapeHTML(propertyKind(property).toUpperCase())} · ${escapeHTML(locationName)}</div><h2 class="prop-title">${escapeHTML(title)}</h2><div class="prop-location">${escapeHTML(englishLocation(property.location))}</div><div class="prop-rooms"><span>${escapeHTML(property.rooms || '-')} rooms</span><span>${escapeHTML(property.area_net || '-')}</span>${property.market_status ? `<span>${escapeHTML({ new: 'New build', resale: 'Resale', under_construction: 'Under construction' }[property.market_status] || property.market_status)}</span>` : ''}</div><div class="prop-footer"><div><small>${isRental ? 'Monthly price' : 'Price'}</small><div class="prop-price">€ ${Number(property.price_eur || 0).toLocaleString('en-GB')}${isRental ? ' / month' : ''}</div></div><div class="en-card-actions"><button class="compare-btn" type="button" data-en-compare-id="${escapeHTML(property.id)}" aria-label="Add to comparison" aria-pressed="false"><i class="fa-solid fa-code-compare"></i></button><a class="prop-btn" href="properties/${encodeURIComponent(property.id)}.html">VIEW</a><a class="prop-btn primary" href="https://wa.me/905330850769?text=${message}">ENQUIRE</a></div></div><p class="property-card-verification"><i class="fa-solid fa-circle-check"></i> Price and availability are subject to advisor confirmation.</p></div>
      </article>`;
    }).join('') || '<article class="listing-empty-state"><h3>No matching property found.</h3><a href="contact.html">Request a personal shortlist</a></article>';
    document.querySelectorAll('[data-en-compare-id]').forEach(button => button.addEventListener('click', () => toggleCompare(button.dataset.enCompareId)));
    updateCompareUI();
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
      const id = new URLSearchParams(window.location.search).get('id') || document.body.dataset.propertyId;
      const data = await fetchPropertyData();
      const property = (data.properties || []).find(item => String(item.id) === String(id));
      if (!property) throw new Error('not-found');

      const approvedImages = (property.images || []).filter(trustedImage).map(displayImage);
      const image = approvedImages[0] || placeholder;
      const isRental = property.type === 'rent';
      const title = englishPropertyTitle(property);
      const description = englishPropertyDescription(property);
      const canonical = document.body.dataset.propertyId
        ? `${location.origin}/en/properties/${encodeURIComponent(property.id)}.html`
        : `${location.origin}/en/property-detail.html?id=${encodeURIComponent(property.id)}`;
      document.title = `${title} | Jasmine Group`;
      document.getElementById('en-detail-heading').textContent = title;
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
      setMeta('meta[name="description"]', `${title}. ${description}`.slice(0, 160));
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[property="og:url"]', canonical);
      setMeta('meta[property="og:image"]', new URL(image, location.href).href);

      document.getElementById('en-property-schema')?.remove();
      const schema = document.createElement('script');
      schema.id = 'en-property-schema';
      schema.type = 'application/ld+json';
      const schemaProperties = [
        ['Property type', propertyKind(property)],
        ['Portfolio status', { new: 'New build', resale: 'Resale', under_construction: 'Under construction' }[property.market_status]],
        ['Floor', property.floor],
        ['Year built', property.year_built],
        ['Heating', property.heating],
        ['Distance to sea', property.distance_sea_m !== null && property.distance_sea_m !== undefined ? `${property.distance_sea_m} m` : null],
        ['Distance to airport', property.distance_airport_km !== null && property.distance_airport_km !== undefined ? `${property.distance_airport_km} km` : null],
      ].filter(([, value]) => value !== null && value !== undefined && value !== '')
        .map(([name, value]) => ({ '@type': 'PropertyValue', name, value }));
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: title,
        description,
        url: canonical,
        image: approvedImages.map(item => new URL(item, location.href).href),
        offers: { '@type': 'Offer', price: Number(property.price_eur || 0), priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
        address: { '@type': 'PostalAddress', addressLocality: englishLocation(property.location), addressRegion: 'Antalya', addressCountry: 'TR' },
        floorSize: property.area_net ? { '@type': 'QuantitativeValue', value: metricNumber(property.area_net), unitCode: 'MTK' } : undefined,
        additionalProperty: schemaProperties.length ? schemaProperties : undefined,
      });
      document.head.appendChild(schema);

      const message = encodeURIComponent(`Hello, I would like verified information about property ${property.id}.`);
      const marketLabels = { new: 'New build', resale: 'Resale', under_construction: 'Under construction' };
      const furnishedLabels = { furnished: 'Furnished', unfurnished: 'Unfurnished', optional: 'Optional' };
      const facts = [
        ['Property type', propertyKind(property)],
        ['Rooms', property.rooms || '-'],
        ['Bathrooms', englishBathrooms(property.bathrooms)],
        ['Net area', property.area_net || '-'],
        ['Gross area', property.area_gross || '-'],
        ['Portfolio status', marketLabels[property.market_status]],
        ['Floor', property.floor],
        ['Year built', property.year_built],
        ['Furnishing', furnishedLabels[property.furnished_status]],
        ['Heating', property.heating],
        ['Reference', property.id],
      ].filter(([, value]) => value !== null && value !== undefined && value !== '');
      const featureSection = Array.isArray(property.features) && property.features.length
        ? `<section class="detail-feature-box"><div class="detail-specs-title"><i class="fa-solid fa-star"></i> Property features</div><div class="detail-feature-grid">${property.features.map(feature => `<span><i class="fa-solid fa-check"></i>${escapeHTML(feature)}</span>`).join('')}</div></section>`
        : '';
      const distanceFacts = [
        property.distance_sea_m !== null && property.distance_sea_m !== undefined && property.distance_sea_m !== '' ? ['Sea', `${Number(property.distance_sea_m).toLocaleString('en-GB')} m`] : null,
        property.distance_airport_km !== null && property.distance_airport_km !== undefined && property.distance_airport_km !== '' ? ['Airport', `${Number(property.distance_airport_km).toLocaleString('en-GB')} km`] : null,
      ].filter(Boolean);
      const distanceSection = distanceFacts.length
        ? `<section class="detail-distance-box"><div class="detail-specs-title"><i class="fa-solid fa-location-crosshairs"></i> Location distances</div><div class="detail-distance-grid">${distanceFacts.map(([label, value]) => `<div><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></div>`).join('')}</div><p>Distances come from the property record and remain subject to route and advisor confirmation.</p></section>`
        : '';
      window.__jasminePropertyContext = {
        property_id: property.id,
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
          <div class="en-detail-facts">${facts.map(([label, value]) => `<span><small>${escapeHTML(label)}</small>${escapeHTML(value)}</span>`).join('')}</div>
          <p>${escapeHTML(description)}</p><div class="property-card-verification"><i class="fa-solid fa-circle-check"></i> Price, availability, media and property-specific documents are subject to advisor confirmation.</div>
          <div class="en-hero-actions"><button class="compare-btn" type="button" id="en-detail-compare" data-en-compare-id="${escapeHTML(property.id)}" aria-label="Add to comparison" aria-pressed="false"><i class="fa-solid fa-code-compare"></i> Compare</button><a href="https://wa.me/905330850769?text=${message}">Ask on WhatsApp</a><a href="contact.html?property=${encodeURIComponent(property.id)}">Request a consultation</a></div>
        </article>
      </div>${featureSection}${distanceSection}<section class="proof-standard"><div><p class="section-kicker">BEFORE YOU DECIDE</p><h2>Request the current property file.</h2></div><p>Ask for confirmed availability, approved media and the property-specific information required by your independent legal and technical professionals.</p></section>`;
      document.getElementById('en-detail-compare')?.addEventListener('click', event => toggleCompare(event.currentTarget.dataset.enCompareId));
      updateCompareUI();
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

  function preserveLanguageQuery() {
    const page = window.location.pathname.split('/').pop();
    if (!['buy.html', 'rent.html', 'property-detail.html', 'contact.html'].includes(page)) return;
    document.querySelectorAll(`a[href="../${page}"]`).forEach(link => {
      link.href = `../${page}${window.location.search}`;
    });
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
    ['en-search', 'en-location', 'en-category', 'en-market', 'en-rooms', 'en-price-min', 'en-price-max', 'en-area-min', 'en-sort']
      .forEach(id => document.getElementById(id)?.addEventListener('input', renderProperties));
    document.getElementById('en-active-filter-chips')?.addEventListener('click', event => {
      const button = event.target.closest('[data-en-clear-filter]');
      if (!button) return;
      const ids = {
        q: 'en-search', loc: 'en-location', category: 'en-category', market: 'en-market',
        room: 'en-rooms', min: 'en-price-min', max: 'en-price-max', areaMin: 'en-area-min',
      };
      const control = document.getElementById(ids[button.dataset.enClearFilter]);
      if (control) control.value = '';
      renderProperties();
    });
    document.getElementById('en-filter-reset')?.addEventListener('click', () => {
      ['en-search', 'en-location', 'en-category', 'en-market', 'en-rooms', 'en-price-min', 'en-price-max', 'en-area-min']
        .forEach(id => { const control = document.getElementById(id); if (control) control.value = ''; });
      const sort = document.getElementById('en-sort');
      if (sort) sort.value = 'newest';
      renderProperties();
    });
    document.getElementById('en-save-search')?.addEventListener('click', event => {
      localStorage.setItem('jg_saved_search', JSON.stringify({ path: window.location.pathname, query: englishFilterQuery(englishFilterValues()).toString(), savedAt: new Date().toISOString() }));
      event.currentTarget.innerHTML = '<i class="fa-solid fa-bookmark"></i> Search saved';
    });
    document.getElementById('en-share-search')?.addEventListener('click', async event => {
      try {
        if (navigator.share) await navigator.share({ title: document.title, url: window.location.href });
        else await navigator.clipboard.writeText(window.location.href);
        event.currentTarget.innerHTML = '<i class="fa-solid fa-check"></i> Link ready';
      } catch {
        event.currentTarget.innerHTML = '<i class="fa-solid fa-link"></i> Copy from address bar';
      }
    });
    initMobileNavigation();
    preserveLanguageQuery();
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href*="wa.me"]');
      if (link) trackEvent('contact_whatsapp', {
        page: window.location.pathname,
        locale: 'en',
        property_id: window.__jasminePropertyContext?.property_id || '',
        source: 'whatsapp',
      });
    });
    loadAnalyticsConfiguration();
    loadProperties();
    loadPropertyDetail();
    loadRegionCounts();
    renderEnglishBlogs();
  });
})();
