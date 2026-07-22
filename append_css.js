const fs = require("fs");

const css = `
/* ============================================================
   PROPERTY DETAIL REDESIGN (ANTALYA HOMES STYLE)
   ============================================================ */

.breadcrumb {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.breadcrumb a {
  color: var(--navy);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.breadcrumb a:hover { color: var(--red); }
.breadcrumb .separator { color: #cbd5e1; font-size: 11px; }

.detail-page-wrapper {
  display: grid;
  grid-template-columns: 2.2fr 1fr;
  gap: 30px;
  margin-top: 20px;
  align-items: start;
}

/* Left Column */
.detail-left-col {
  min-width: 0; /* Prevents flex/grid blowouts */
}
.detail-main-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--navy);
  margin-bottom: 8px;
  line-height: 1.3;
}
.detail-location-subtitle {
  color: var(--text-muted);
  font-size: 15px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.detail-location-subtitle i {
  color: var(--red);
}

/* Gallery */
.detail-gallery-container {
  margin-bottom: 30px;
  position: relative;
}
.detail-main-img-box {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  background: #f0f0f0;
  position: relative;
}
.detail-main-img-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.4s ease;
}
.detail-main-img-box:hover img {
  transform: scale(1.02);
}
.detail-badge-overlay {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--red);
  color: #fff;
  padding: 6px 14px;
  font-weight: 700;
  font-size: 12px;
  border-radius: 4px;
  text-transform: uppercase;
  z-index: 10;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.detail-fav-overlay {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255,255,255,0.9);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  transition: 0.2s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.15);
}
.detail-fav-overlay:hover {
  color: var(--red);
  transform: scale(1.1);
}
.detail-thumbs-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 transparent;
}
.detail-thumbs-scroll::-webkit-scrollbar { height: 6px; }
.detail-thumbs-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.detail-thumb {
  width: 120px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 6px;
  object-fit: cover;
  cursor: pointer;
  opacity: 0.6;
  transition: 0.2s;
  border: 2px solid transparent;
}
.detail-thumb:hover, .detail-thumb.active {
  opacity: 1;
}
.detail-thumb.active {
  border-color: var(--red);
}

/* Specs Table */
.detail-specs-box {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
}
.detail-specs-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
}
.detail-specs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 30px;
}
.spec-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 8px;
}
.spec-label {
  color: var(--text-muted);
  font-size: 14px;
}
.spec-value {
  color: var(--navy);
  font-weight: 600;
  font-size: 14px;
}

/* Description */
.detail-desc-box {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 30px;
}
.detail-desc-text {
  color: #444;
  line-height: 1.8;
  font-size: 15px;
}

/* Right Column (Sidebar) */
.detail-right-col {
  position: sticky;
  top: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Price Box */
.sidebar-price-box {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.sidebar-price {
  font-size: 32px;
  font-weight: 800;
  color: var(--red);
}
.sidebar-ref {
  font-size: 13px;
  color: var(--text-muted);
  margin-top: 5px;
}

/* Contact Form Box */
.sidebar-contact-box {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
}
.sidebar-agent {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}
.sidebar-agent-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.sidebar-agent-info h4 {
  font-size: 16px;
  color: var(--navy);
  margin-bottom: 4px;
}
.sidebar-agent-info p {
  font-size: 13px;
  color: var(--text-muted);
}
.sidebar-form input, .sidebar-form textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  margin-bottom: 12px;
  font-family: inherit;
  font-size: 14px;
  box-sizing: border-box;
}
.sidebar-form button {
  width: 100%;
  background: var(--navy);
  color: #fff;
  border: none;
  padding: 14px;
  font-size: 15px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}
.sidebar-form button:hover {
  background: var(--navy-light);
}
.sidebar-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
}
.sidebar-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: 0.3s;
}
.sidebar-action-btn.wa {
  background: #25d366;
  color: #fff;
}
.sidebar-action-btn.wa:hover { background: #128C7E; }
.sidebar-action-btn.call {
  background: var(--bg-light);
  color: var(--navy);
  border: 1px solid var(--border);
}
.sidebar-action-btn.call:hover { background: #e2e8f0; }

/* Similar Props in Detail */
.detail-similar-title {
  font-size: 20px;
  color: var(--navy);
  margin-bottom: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
}

@media (max-width: 992px) {
  .detail-page-wrapper {
    grid-template-columns: 1fr;
  }
  .detail-right-col {
    position: static;
  }
  .detail-main-img-box {
    height: 350px;
  }
  .detail-specs-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 576px) {
  .detail-main-img-box {
    height: 250px;
  }
}
`;

fs.appendFileSync('style.css', css);
console.log('Appended layout CSS to style.css');
