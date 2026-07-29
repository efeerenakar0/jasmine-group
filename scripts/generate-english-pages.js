const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'en');
const baseUrl = 'https://jasmine-group.vercel.app';
const assetVersion = '2026072814';
const regionContent = JSON.parse(fs.readFileSync(path.join(root, 'regions-content.json'), 'utf8'));
const guideContent = JSON.parse(fs.readFileSync(path.join(root, 'guides-content.json'), 'utf8'));

function header(active, turkishPath) {
  const links = [
    ['buy', 'buy.html', 'BUY'],
    ['rent', 'rent.html', 'RENT'],
    ['services', 'services.html', 'SERVICES'],
    ['regions', 'regions.html', 'AREAS'],
    ['guide', 'buying-guide.html', 'BUYING GUIDE'],
    ['company', 'corporate.html', 'COMPANY'],
    ['blog', 'blog.html', 'INSIGHTS'],
    ['contact', 'contact.html', 'CONTACT'],
  ];
  return `<header class="main-header"><div class="container">
    <a href="./" class="site-logo">JASMINE <span>GROUP</span></a>
    <nav class="main-nav">${links.map(([key, href, label]) => `<a href="${href}"${key === active ? ' class="active"' : ''}>${label}</a>`).join('')}<a href="../${turkishPath}">TR</a></nav>
    <button class="mobile-menu-btn" id="en-menu-button" type="button" aria-label="Open navigation" aria-expanded="false"><i class="fa-solid fa-bars"></i></button>
  </div></header>
  <div class="msm-overlay" id="en-menu-overlay"></div>
  <aside class="mobile-side-menu" id="en-mobile-menu" aria-label="Mobile navigation">
    <div class="msm-header"><a href="./" class="site-logo">JASMINE <span>GROUP</span></a><button class="msm-close" id="en-menu-close" type="button" aria-label="Close navigation"><i class="fa-solid fa-xmark"></i></button></div>
    <nav class="msm-nav">${links.map(([, href, label]) => `<a href="${href}">${label}</a>`).join('')}<a href="../${turkishPath}">TÜRKÇE</a></nav>
  </aside>`;
}

function footer() {
  return `<footer class="main-footer compact-footer"><div class="container">
    <div><a href="./" class="site-logo">JASMINE <span>GROUP</span></a><p>Property selection, viewings and transaction coordination in and around Alanya.</p></div>
    <nav><a href="services.html">Services</a><a href="regions.html">Areas</a><a href="team.html">Team</a><a href="blog.html">Insights</a><a href="privacy.html">Privacy</a><a href="contact.html">Contact</a></nav>
  </div></footer>`;
}

function shell(page) {
  const canonical = `${baseUrl}/en/${page.file}`;
  const turkish = `${baseUrl}/${page.turkishPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${page.title}</title>
  <meta name="description" content="${page.description}" />
  <meta property="og:title" content="${page.title}" />
  <meta property="og:description" content="${page.description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${baseUrl}/images/hero1.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="tr" href="${turkish}" />
  <link rel="alternate" hreflang="en" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${turkish}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="../style.css?v=${assetVersion}" />
${page.schema ? `  <script type="application/ld+json">${JSON.stringify(page.schema)}</script>\n` : ''}</head>
<body class="english-site"${page.bodyAttributes ? ` ${page.bodyAttributes}` : ''}>
  ${header(page.active, page.turkishPath)}
  <main>${page.content}</main>
  ${footer()}
  <script src="site.js?v=${assetVersion}" defer></script>
</body>
</html>
`;
}

const serviceCards = [
  ['fa-magnifying-glass-location', 'Property Advisory', 'A comparable shortlist shaped around budget, intended use, preferred area and daily-life priorities.', 'buy.html', 'Explore properties'],
  ['fa-video', 'Online and In-person Viewings', 'Structured video calls and planned tours help you screen options before making a decision.', 'guides/uzaktan-alim-ve-vekaletname.html', 'Remote buying guide'],
  ['fa-chart-line', 'Investment Comparison', 'Review location, use potential and total acquisition considerations within one consistent framework.', 'guides/masraflar-vergi-ve-odeme-planlamasi.html', 'Cost planning guide'],
  ['fa-house-circle-check', 'Seller Preparation', 'Positioning and launch preparation based on the property, its location and comparable portfolio evidence.', 'sell.html', 'Request an assessment'],
  ['fa-file-signature', 'Transaction Coordination', 'A clear checklist and coordination with the relevant licensed legal, financial and technical professionals.', 'guides/tapu-ve-hukuki-kontrol.html', 'Title review guide'],
  ['fa-key', 'After-sale Contact', 'Practical direction for utilities, moving and settlement through appropriate service providers.', 'guides/dask-sigorta-ve-abonelikler.html', 'Post-handover guide'],
];

const pages = [
  {
    file: 'services.html',
    turkishPath: 'services.html',
    active: 'services',
    title: 'Real Estate Services in Alanya | Jasmine Group',
    description: 'Property search, viewings, seller preparation, transaction coordination and after-sale contact for clients in Alanya.',
    content: `<section class="editorial-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">END-TO-END ADVISORY</p><h1>One coordinated team for every stage of your property journey.</h1><p>Move from initial criteria to handover through clear, planned and verifiable steps.</p><a href="contact.html" class="editorial-cta">Speak to an advisor <i class="fa-solid fa-arrow-right"></i></a></div><div class="editorial-hero-note"><span>01</span><strong>Needs before listings.</strong><p>We start with your decision criteria and build a focused shortlist instead of sending an unfiltered catalogue.</p></div></div></section>
    <section class="container content-section"><div class="section-heading"><div><p class="section-kicker">SERVICE AREAS</p><h2>Every contact point needed for a clearer decision</h2></div></div><div class="service-matrix">${serviceCards.map(([icon, title, text, href, label], index) => `<article><i class="fa-solid ${icon}"></i><span>0${index + 1}</span><h3>${title}</h3><p>${text}</p><a href="${href}">${label}</a></article>`).join('')}</div></section>
    <section class="process-band"><div class="container"><div><p class="section-kicker">WORKING MODEL</p><h2>Know what happens at every stage.</h2></div><ol><li><span>1</span><strong>Discovery</strong><p>Goals and budget</p></li><li><span>2</span><strong>Shortlist</strong><p>Comparable options</p></li><li><span>3</span><strong>Viewing</strong><p>Online or in person</p></li><li><span>4</span><strong>Checks</strong><p>Price and documents</p></li><li><span>5</span><strong>Coordination</strong><p>Transfer and beyond</p></li></ol></div></section>
    <section class="container content-cta"><div><p class="section-kicker">PERSONAL ADVISORY</p><h2>Share your criteria and build the first shortlist with us.</h2></div><a href="contact.html">Request a consultation</a></section>`,
  },
  {
    file: 'regions.html',
    turkishPath: 'regions.html',
    active: 'regions',
    title: 'Alanya Area Guide | Jasmine Group',
    description: 'Compare Mahmutlar, Avsallar, Kargicak, Kestel, Cikcilli, Kizlar Pinari, Guller Pinari and Konakli with current property counts.',
    content: `<section class="editorial-hero region-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">DISCOVER ALANYA BY LIFESTYLE</p><h1>The right home starts with the right area.</h1><p>Compare city access, coastal living, privacy and housing character around your real daily routine.</p></div><div class="editorial-hero-note"><span>${String(regionContent.length).padStart(2, '0')}</span><strong>Current portfolio areas</strong><p>This guide follows the districts represented in the current Jasmine collection, without listing empty locations as active inventory.</p></div></div></section>
    <section class="container region-hub-grid">${regionContent.map((region, index) => `<article class="region-hub-card"><a class="region-hub-media" href="regions/${region.slug}.html"><img src="../${region.image}" alt="${region.enName} area guide" loading="lazy"><span>${String(index + 1).padStart(2, '0')}</span></a><div><p class="section-kicker">${region.kickerEn}</p><h2><a href="regions/${region.slug}.html">${region.enName}</a></h2><p>${region.summaryEn}</p><div class="region-tags">${region.tagsEn.map(tag => `<span>${tag}</span>`).join('')}</div><div class="region-hub-footer"><strong><span data-region-count="${region.location}">—</span> current properties</strong><a href="regions/${region.slug}.html">Explore area <i class="fa-solid fa-arrow-right"></i></a></div></div></article>`).join('')}</section>
    <section class="container proof-standard"><div><p class="section-kicker">HOW TO USE THE GUIDE</p><h2>Compare the micro-location, not only the district name.</h2></div><p>Street, gradient, orientation, building management and actual walking routes can change the experience within the same area. Property counts update from the live collection; price and availability remain subject to advisor confirmation.</p></section>
    <section class="container content-cta"><div><p class="section-kicker">AREA COMPARISON</p><h2>Clarify which part of Alanya fits your daily life.</h2></div><a href="contact.html">Ask an area advisor</a></section>`,
  },
  {
    file: 'team.html',
    turkishPath: 'team.html',
    active: 'company',
    title: 'Property Advisory Team | Jasmine Group',
    description: 'Meet the advisory functions that coordinate property selection, client communication, transactions and after-sale contact.',
    content: `<section class="editorial-hero team-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">PEOPLE-LED ADVISORY</p><h1>Different expertise, one coordinated client experience.</h1><p>Personal names and portraits are published only with team approval. Here we transparently explain how each advisory function supports you.</p></div><div class="editorial-hero-note"><span><i class="fa-solid fa-users"></i></span><strong>One contact, coordinated team</strong><p>Your request reaches the right function without losing context along the way.</p></div></div></section>
    <section class="container content-section"><div class="section-heading"><div><p class="section-kicker">ADVISORY FUNCTIONS</p><h2>The team structure behind your journey</h2></div></div><div class="team-role-grid">
      <article><div class="team-role-icon"><i class="fa-solid fa-map-location-dot"></i></div><h3>Area and Portfolio</h3><p>Compares locations, projects and resale options around your criteria.</p><span>Discovery · shortlist · viewing</span></article>
      <article><div class="team-role-icon"><i class="fa-solid fa-comments"></i></div><h3>Client Communication</h3><p>Records your brief and coordinates calls, tours and feedback.</p><span>CRM · scheduling · follow-up</span></article>
      <article><div class="team-role-icon"><i class="fa-solid fa-file-circle-check"></i></div><h3>Transaction Coordination</h3><p>Plans document and transfer steps with the relevant licensed professionals.</p><span>Checklist · referral · timeline</span></article>
      <article><div class="team-role-icon"><i class="fa-solid fa-key"></i></div><h3>After-sale Contact</h3><p>Maintains practical communication through handover, moving and settlement.</p><span>Handover · utilities · settlement</span></article>
    </div></section><section class="container proof-standard"><div><p class="section-kicker">PUBLISHING STANDARD</p><h2>Real people, real roles, explicit consent.</h2></div><p>Names, languages, roles and portraits will only be published with explicit team approval. Stock portraits are never presented as real advisors.</p></section><section class="container content-cta"><div><p class="section-kicker">MEET THE TEAM</p><h2>Reach the right advisory function for your brief.</h2></div><a href="contact.html">Plan a conversation</a></section>`,
  },
  {
    file: 'customer-stories.html',
    turkishPath: 'customer-stories.html',
    active: 'company',
    title: 'Client Experience Standard | Jasmine Group',
    description: 'See how Jasmine Group structures discovery, shortlisting, viewings and transaction coordination without unverified testimonials.',
    content: `<section class="editorial-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">CLIENT EXPERIENCE</p><h1>Trust is built through a process you can examine.</h1><p>Until a client has explicitly approved a public review, we publish our service standard rather than anonymous or invented testimonials.</p></div><div class="editorial-hero-note"><span><i class="fa-solid fa-shield-heart"></i></span><strong>Consent-led publishing</strong><p>Future client stories will identify what was delivered, what was verified and what the client approved for publication.</p></div></div></section>
    <section class="container content-section"><div class="section-heading"><div><p class="section-kicker">WHAT CLIENTS CAN EXPECT</p><h2>A documented journey from brief to handover</h2></div></div><div class="service-matrix">
      <article><i class="fa-solid fa-list-check"></i><span>01</span><h3>Written Property Brief</h3><p>Budget, location, intended use and non-negotiable criteria are recorded before options are shared.</p></article>
      <article><i class="fa-solid fa-scale-balanced"></i><span>02</span><h3>Comparable Shortlist</h3><p>Options are presented in a consistent format so differences are easier to evaluate.</p></article>
      <article><i class="fa-solid fa-circle-check"></i><span>03</span><h3>Advisor Confirmation</h3><p>Price and availability are confirmed before travel, reservation or decision-making.</p></article>
      <article><i class="fa-solid fa-video"></i><span>04</span><h3>Remote Clarity</h3><p>Online viewings help international buyers narrow the field before visiting Alanya.</p></article>
      <article><i class="fa-solid fa-user-lock"></i><span>05</span><h3>Privacy Control</h3><p>Personal details and feedback are never published without explicit permission.</p></article>
      <article><i class="fa-solid fa-comments"></i><span>06</span><h3>Recorded Follow-up</h3><p>Questions, viewings and next steps are kept together through the CRM workflow.</p></article>
    </div></section><section class="container proof-standard"><div><p class="section-kicker">REVIEW POLICY</p><h2>No anonymous praise presented as proof.</h2></div><p>Verified reviews will be published only after the client confirms the wording and permitted identity details. Commercial results and returns will not be implied without evidence.</p></section><section class="container content-cta"><div><p class="section-kicker">START YOUR JOURNEY</p><h2>Experience the advisory process directly.</h2></div><a href="contact.html">Share your brief</a></section>`,
  },
  {
    file: 'corporate.html',
    turkishPath: 'corporate.html',
    active: 'company',
    title: 'About Jasmine Group | Alanya Property Advisory',
    description: 'Learn about Jasmine Group’s Alanya-focused property advisory model, publishing standards and client process.',
    content: `<section class="editorial-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">ABOUT JASMINE GROUP</p><h1>Local property guidance designed around clearer decisions.</h1><p>Jasmine Group coordinates property discovery, viewings and transaction communication for buyers, tenants and sellers in and around Alanya.</p></div><div class="editorial-hero-note"><span>JG</span><strong>Evidence before claims</strong><p>We publish verified portfolio information and clearly label details that still require advisor confirmation.</p></div></div></section>
    <section class="container corporate-editorial"><div><p class="section-kicker">OUR ROLE</p><h2>We make a complex market easier to navigate.</h2></div><div><p>Property decisions combine lifestyle, location, legal, financial and technical considerations. Our role is to organise those conversations, provide a focused portfolio view and connect each step with the appropriate professional expertise.</p><p>We do not replace licensed legal, tax or technical specialists. We coordinate the journey and make responsibilities visible.</p></div></section>
    <section class="container content-section"><div class="service-matrix"><article><i class="fa-solid fa-eye"></i><span>01</span><h3>Transparency</h3><p>Unknown or changing details are marked for advisor confirmation instead of being presented as fact.</p></article><article><i class="fa-solid fa-location-dot"></i><span>02</span><h3>Local Focus</h3><p>Area comparisons are built around real daily life in Alanya, not generic destination marketing.</p></article><article><i class="fa-solid fa-people-arrows"></i><span>03</span><h3>Coordination</h3><p>One property brief connects the relevant advisory, viewing and transaction conversations.</p></article></div></section>
    <section class="container proof-standard"><div><p class="section-kicker">CONTENT STANDARD</p><h2>No invented awards, numbers or testimonials.</h2></div><p>Experience dates, transaction totals, team biographies, reviews and awards will only appear when evidence and publication permission are available.</p></section><section class="container content-cta"><div><p class="section-kicker">WORK WITH US</p><h2>Start with a clear conversation about your property goal.</h2></div><a href="contact.html">Contact Jasmine Group</a></section>`,
  },
  {
    file: 'sell.html',
    turkishPath: 'sell.html',
    active: 'services',
    title: 'Sell Property in Alanya | Jasmine Group',
    description: 'Prepare and position your Alanya property for sale with evidence-led pricing, verified media and organised buyer communication.',
    content: `<section class="editorial-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">SELLER ADVISORY</p><h1>Bring your property to market with a clear plan.</h1><p>Build the launch around evidence, accurate information, approved media and organised buyer communication.</p><a href="contact.html" class="editorial-cta">Request a seller consultation <i class="fa-solid fa-arrow-right"></i></a></div><div class="editorial-hero-note"><span><i class="fa-solid fa-house-circle-check"></i></span><strong>Accuracy before promotion</strong><p>Property details, ownership documents and publishing permission are checked before the listing goes live.</p></div></div></section>
    <section class="container content-section"><div class="section-heading"><div><p class="section-kicker">SELLING ROADMAP</p><h2>From preparation to qualified enquiries</h2></div></div><div class="service-matrix"><article><i class="fa-solid fa-clipboard-check"></i><span>01</span><h3>Property Brief</h3><p>Record condition, location, specifications, ownership context and sale priorities.</p></article><article><i class="fa-solid fa-scale-balanced"></i><span>02</span><h3>Market Positioning</h3><p>Compare relevant portfolio evidence and agree a transparent pricing approach.</p></article><article><i class="fa-solid fa-camera"></i><span>03</span><h3>Verified Media</h3><p>Publish only approved photography, plans and descriptions that represent the property accurately.</p></article><article><i class="fa-solid fa-bullhorn"></i><span>04</span><h3>Launch</h3><p>Present the property through the website, direct enquiries and appropriate marketing channels.</p></article><article><i class="fa-solid fa-user-check"></i><span>05</span><h3>Buyer Communication</h3><p>Record enquiries, viewing feedback and next steps in one coordinated workflow.</p></article><article><i class="fa-solid fa-file-signature"></i><span>06</span><h3>Transfer Coordination</h3><p>Plan agreed transaction steps with the relevant licensed professionals.</p></article></div></section>
    <section class="container proof-standard"><div><p class="section-kicker">WHAT WE NEED</p><h2>A truthful listing starts with complete information.</h2></div><p>Ownership details, property specifications, approved photographs, availability and the owner's publishing consent are required before a listing can be presented as verified.</p></section><section class="container content-cta"><div><p class="section-kicker">PROPERTY ASSESSMENT</p><h2>Share the property details for a confidential first review.</h2></div><a href="contact.html">Start the assessment</a></section>`,
  },
  {
    file: 'buying-guide.html',
    turkishPath: 'buying-guide.html',
    active: 'guide',
    title: 'Property Buying and Transaction Guides | Jasmine Group',
    description: 'Official-source guides for buying, title checks, costs, remote transactions, insurance, residence permits and citizenship distinctions.',
    content: `<section class="editorial-hero guide-hub-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">JASMINE KNOWLEDGE CENTRE</p><h1>Better decisions start with better questions.</h1><p>Separate the property journey into practical files covering selection, title, payment, insurance and official applications.</p><a href="contact.html" class="editorial-cta">Request a personal transaction plan <i class="fa-solid fa-arrow-right"></i></a></div><div class="editorial-hero-note"><span>${String(guideContent.length).padStart(2, '0')}</span><strong>Official-source decision guides</strong><p>Every guide links directly to the relevant public authority and avoids fixed figures or outcome guarantees.</p></div></div></section>
    <section class="container guide-hub-intro"><div><p class="section-kicker">CHOOSE YOUR TOPIC</p><h2>Open the transaction file you need instead of one long generic article.</h2></div><p>These pages support general preparation. Use an appropriately licensed independent professional for property- and applicant-specific legal, tax, technical or immigration advice.</p></section>
    <section class="container guide-hub-grid">${guideContent.map((guide, index) => `<article><i class="fa-solid ${guide.icon}"></i><span>${String(index + 1).padStart(2, '0')}</span><p class="section-kicker">${guide.categoryEn}</p><h2><a href="guides/${guide.slug}.html">${guide.titleEn}</a></h2><p>${guide.summaryEn}</p><a href="guides/${guide.slug}.html">Open guide <i class="fa-solid fa-arrow-right"></i></a></article>`).join('')}</section>
    <section class="source-standard-band"><div class="container"><div><p class="section-kicker">PUBLISHING STANDARD</p><h2>Do not decide without opening the official source.</h2><p>Direct links to the Land Registry, Revenue Administration, Migration Management, e-Government and DASK appear inside the relevant guide.</p></div><div class="source-authorities"><span>TKGM</span><span>GİB</span><span>MIGRATION</span><span>e-GOVERNMENT</span><span>DASK</span></div></div></section>
    <section class="container process-band-light"><div><p class="section-kicker">JASMINE WORKING MODEL</p><h2>We separate coordination from independent professional advice.</h2></div><ol><li><span>01</span><strong>Property brief</strong><p>Objectives, budget and timing</p></li><li><span>02</span><strong>Portfolio comparison</strong><p>A verifiable shortlist</p></li><li><span>03</span><strong>Professional review</strong><p>Legal, tax and technical checks</p></li><li><span>04</span><strong>Transaction coordination</strong><p>Payment, transfer and handover plan</p></li></ol></section>
    <section class="container content-cta"><div><p class="section-kicker">YOUR QUESTION</p><h2>Turn the guides into a plan for your budget, area and intended use.</h2></div><a href="contact.html">Speak to an advisor</a></section>`,
  },
  {
    file: 'privacy.html',
    turkishPath: 'privacy.html',
    active: '',
    title: 'Privacy Notice | Jasmine Group',
    description: 'How Jasmine Group handles website enquiries, consent, analytics choices and personal data.',
    content: `<section class="legal-hero"><div class="container"><p class="section-kicker">PRIVACY</p><h1>Privacy Notice</h1><p>Last updated: 28 July 2026</p></div></section><section class="container legal-content"><h2>Who controls the data?</h2><p>Jasmine Group processes information submitted through this website for property advisory and communication purposes. Contact: jasminegroupemlak@gmail.com.</p><h2>What we collect</h2><p>We may collect your name, phone number, email address, message, property reference, language, campaign parameters, consent time and a privacy-protected technical identifier used for abuse prevention.</p><h2>Why we use it</h2><p>Information is used to respond to your request, prepare a property shortlist, arrange viewings, maintain service records, protect the forms from misuse and measure marketing only where consent has been granted.</p><h2>Legal basis and choice</h2><p>Depending on the interaction, processing may rely on your request, consent, legitimate operational interests or legal obligations. Optional analytics and advertising tools do not load before your cookie choice.</p><h2>Sharing and storage</h2><p>Data may be handled by contracted hosting, database, email and CRM providers and by licensed specialists involved at your request. Access is limited to what is necessary for the relevant service.</p><h2>Your rights</h2><p>You may request access, correction, deletion or information about processing, subject to applicable law. Send requests to jasminegroupemlak@gmail.com.</p><h2>Security</h2><p>Administrative access uses signed sessions, restricted service credentials and transport security. No online system can guarantee absolute security.</p></section>`,
  },
  {
    file: 'kvkk.html',
    turkishPath: 'kvkk.html',
    active: '',
    title: 'Personal Data Information Notice (KVKK) | Jasmine Group',
    description: 'English summary of Jasmine Group personal data processing information under Turkish Law No. 6698.',
    content: `<section class="legal-hero"><div class="container"><p class="section-kicker">TURKISH DATA PROTECTION</p><h1>KVKK Information Notice</h1><p>English information summary for international visitors</p></div></section><section class="container legal-content"><h2>Data controller and scope</h2><p>This notice explains the general handling of personal data submitted to Jasmine Group through the website and advisory channels under Turkish Personal Data Protection Law No. 6698.</p><h2>Categories and purposes</h2><p>Identity, contact, request, transaction, consent and limited technical security information may be processed to answer enquiries, provide advisory services, arrange viewings, maintain records, meet legal duties and protect systems.</p><h2>Collection methods</h2><p>Data may be collected through web forms, phone, email, WhatsApp, meetings and documents you voluntarily provide.</p><h2>Transfers</h2><p>Where necessary and legally permitted, information may be shared with hosting and communication providers, authorised public bodies and independent legal, financial or technical professionals involved in your request.</p><h2>Your applications</h2><p>Requests concerning the rights available under Article 11 of Law No. 6698 can be sent to jasminegroupemlak@gmail.com. Identity verification may be requested before a response is provided.</p><h2>Language</h2><p>This English page is an informational translation. The Turkish notice should be reviewed for the operative local-language wording.</p></section>`,
  },
  {
    file: 'terms.html',
    turkishPath: 'terms.html',
    active: '',
    title: 'Website Terms of Use | Jasmine Group',
    description: 'Terms governing property information, website use, professional advice and external services.',
    content: `<section class="legal-hero"><div class="container"><p class="section-kicker">WEBSITE TERMS</p><h1>Terms of Use</h1><p>Last updated: 28 July 2026</p></div></section><section class="container legal-content"><h2>General information</h2><p>The website provides general property and service information. Listings, prices, availability, measurements and features can change and are subject to advisor confirmation.</p><h2>No professional advice</h2><p>Website content is not legal, tax, financial, investment or technical advice. Obtain independent advice from appropriately licensed professionals before making a commitment.</p><h2>Property media</h2><p>Images and plans are published only where an approved source is available. A placeholder or “photos on request” notice means property-specific media has not yet been verified for public display.</p><h2>Enquiries and agreements</h2><p>Submitting a form does not create a brokerage, reservation or purchase agreement. Any service or transaction terms must be agreed separately in writing.</p><h2>Acceptable use</h2><p>You may not attempt unauthorised access, misuse forms, copy the database at scale or interfere with the availability or security of the website.</p><h2>External services</h2><p>Links to maps, messaging, payment or professional services are governed by their own terms and privacy practices.</p><h2>Changes</h2><p>These terms and website content may be updated when services, legal requirements or technology change.</p></section>`,
  },
  {
    file: 'cookie-policy.html',
    turkishPath: 'cookie-policy.html',
    active: '',
    title: 'Cookie Policy | Jasmine Group',
    description: 'Information about essential storage, analytics consent and advertising technologies on the Jasmine Group website.',
    content: `<section class="legal-hero"><div class="container"><p class="section-kicker">YOUR CHOICE</p><h1>Cookie Policy</h1><p>Analytics and advertising tools require your prior consent.</p></div></section><section class="container legal-content"><h2>Essential storage</h2><p>The website may use local browser storage for privacy choices, preferred currency, language, favourites and interface settings. These functions support the experience you request.</p><h2>Analytics</h2><p>Google Analytics or Google Tag Manager is loaded only after an “Accept” choice and only when a valid measurement identifier has been configured.</p><h2>First-party conversion measurement</h2><p>After an “Accept” choice, limited interactions such as property views, WhatsApp link clicks and successful enquiry form submissions may be recorded in Jasmine Group's own measurement system. The record is limited to the event type, page path, property reference, language, device category and, when available, UTM campaign fields or the first external referring hostname.</p><p>Names, phone numbers, email addresses, message content, full page queries and raw IP addresses are not written to analytics events. A random browser-session value is converted on the server into a one-way HMAC digest when the privacy key is configured; its raw value is not stored or exposed to the admin dashboard. Selecting “Reject” also prevents these first-party measurement requests.</p><h2>Advertising</h2><p>Meta Pixel or similar advertising technology is loaded only after consent and only when the relevant account identifier has been configured.</p><h2>Rejecting optional tools</h2><p>Selecting “Reject” prevents optional analytics and advertising scripts from loading. You can clear the site data in your browser to reset the choice.</p><h2>Third-party links</h2><p>WhatsApp, maps and other external services may set their own cookies after you choose to visit them.</p></section>`,
  },
  {
    file: 'rent.html',
    turkishPath: 'rent.html',
    active: 'rent',
    title: 'Property for Rent in Alanya | Jasmine Group',
    description: 'Browse current Alanya rental property and request confirmed availability, terms and viewing information.',
    bodyAttributes: 'data-en-properties data-en-property-type="rent"',
    content: `<section class="listing-hero"><div class="container"><p class="section-kicker">ALANYA RENTAL COLLECTION</p><h1>Find a rental that works for daily life.</h1><p class="listing-hero-lead">Filter the current collection and request confirmed terms, availability and viewing information from an advisor.</p></div></section>
    <section class="container page-content"><div class="en-filter-bar"><label>Search<input id="en-search" type="search" placeholder="Area, feature or property code" /></label><label>Area<select id="en-location"><option value="">All areas</option></select></label><label>Property type<select id="en-category"><option value="">All types</option><option value="apartment">Apartment</option><option value="villa">Villa</option><option value="land">Land</option><option value="commercial">Commercial</option></select></label><label>Portfolio status<select id="en-market"><option value="">All statuses</option><option value="new">New build</option><option value="resale">Resale</option><option value="under_construction">Under construction</option></select></label><label>Rooms<select id="en-rooms"><option value="">All rooms</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label><label>Minimum price (€)<input id="en-price-min" type="number" min="0" step="100" /></label><label>Maximum price (€)<input id="en-price-max" type="number" min="0" step="100" /></label><label>Minimum net area (m²)<input id="en-area-min" type="number" min="0" step="1" /></label><label>Sort<select id="en-sort"><option value="newest">Newest</option><option value="price-asc">Lowest price</option><option value="price-desc">Highest price</option></select></label></div><div class="listing-discovery-tools"><div id="en-active-filter-chips" class="active-filter-chips" aria-live="polite"></div><div class="listing-discovery-actions"><button id="en-filter-reset" type="button"><i class="fa-solid fa-rotate-left"></i> Clear filters</button><button id="en-save-search" type="button"><i class="fa-regular fa-bookmark"></i> Save search</button><button id="en-share-search" type="button"><i class="fa-solid fa-share-nodes"></i> Share search</button></div></div><div class="en-results-heading"><p class="section-kicker">CURRENT RENTALS</p><strong id="en-count">Loading properties...</strong></div><div id="en-property-grid" class="property-list listing-grid"></div><section class="content-cta"><div><p class="section-kicker">PERSONAL RENTAL BRIEF</p><h2>Share your dates, area and room needs.</h2></div><a href="contact.html">Request a shortlist</a></section></section>`,
  },
  {
    file: 'property-detail.html',
    turkishPath: 'property-detail.html',
    active: 'buy',
    title: 'Alanya Property Details | Jasmine Group',
    description: 'Review property specifications and request verified price, availability, media and viewing information.',
    bodyAttributes: 'data-en-property-detail',
    content: `<section class="listing-hero compact-listing-hero"><div class="container"><p class="section-kicker">PROPERTY DETAILS</p><h1 id="en-detail-heading">Reviewing the property...</h1><p class="listing-hero-lead">Price, availability and property-specific documents remain subject to advisor confirmation.</p></div></section><section class="container page-content" id="en-property-detail"><div class="collection-loading"><i class="fa-solid fa-spinner fa-spin"></i> Loading property information...</div></section>`,
  },
  {
    file: 'blog.html',
    turkishPath: 'blog.html',
    active: 'blog',
    title: 'Alanya Property Insights | Jasmine Group',
    description: 'Practical area, buying, ownership and property decision guides for Alanya.',
    content: `<section class="editorial-hero"><div class="container editorial-hero-grid"><div><p class="section-kicker">JASMINE INSIGHTS</p><h1>Make property decisions with better questions.</h1><p>Practical guides for comparing areas, costs, viewings, documents and ownership responsibilities.</p></div><div class="editorial-hero-note"><span><i class="fa-solid fa-book-open"></i></span><strong>General information</strong><p>Guides support preparation but do not replace current legal, tax, financial or technical advice.</p></div></div></section><section class="container content-section"><div class="section-heading"><div><p class="section-kicker">LATEST GUIDES</p><h2>Alanya property knowledge centre</h2></div></div><div class="blog-grid-v2" id="en-blog-grid"></div></section><section class="container content-cta"><div><p class="section-kicker">PERSONAL QUESTION</p><h2>Turn the research into a clear property brief.</h2></div><a href="contact.html">Ask an advisor</a></section>`,
  },
];

fs.mkdirSync(output, { recursive: true });
for (const page of pages) {
  fs.writeFileSync(path.join(output, page.file), shell(page));
}

console.log(`Generated ${pages.length} English pages.`);

module.exports = { assetVersion, baseUrl, footer, header, pages, shell };
