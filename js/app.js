/**
 * creatorhub-app.js — Application Controller
 * Auth, routing, rendering, search, modals, reviews, theme
 */

const SYMBOLS = {
  spark: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  sun: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  arrowRight: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  star: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  starEmpty: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  lock: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
};

const App = {
  state: { user:null, page:'home', prodCat:'all', theme:'dark' },

  init() {
    this.loadAuth();
    this.loadTheme();
    this.renderAll();
    this.bindGlobals();
    console.log('⚡ CreatorHub v3 ready');
  },

  // ============================================================
  // THEME
  // ============================================================
  loadTheme() {
    const saved = localStorage.getItem('hub_theme');
    if (saved) this.state.theme = saved;
    this.applyTheme();
    this.renderThemeToggle();
  },

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('hub_theme', this.state.theme);
    this.renderThemeToggle();
  },

  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
  },

  renderThemeToggle() {
    const el = document.getElementById('themeToggle');
    if (!el) return;
    el.innerHTML = this.state.theme === 'dark' ? SYMBOLS.sun : SYMBOLS.moon;
    el.title = `Switch to ${this.state.theme === 'dark' ? 'light' : 'dark'} mode`;
  },

  // ============================================================
  // AUTH
  // ============================================================
  loadAuth() {
    try { this.state.user = JSON.parse(localStorage.getItem('hub_user')); } catch(e){}
    this.renderAuthUI();
  },

  saveAuth() {
    if (this.state.user) localStorage.setItem('hub_user', JSON.stringify(this.state.user));
    else localStorage.removeItem('hub_user');
    this.renderAuthUI();
  },

  login(provider) {
    const mock = {
      google:  { id:'u1', name:'Osama', email:'osama@gmail.com', role:'seller', tier:'exclusive' },
      github:  { id:'u2', name:'OsamaDev', email:'osama@github.com', role:'seller', tier:'pro' },
      facebook:{ id:'u3', name:'Osama K.', email:'osama@fb.com', role:'buyer', tier:'free' },
      twitter: { id:'u4', name:'@osamacreates', email:'osama@tw.com', role:'buyer', tier:'free' },
      email:   { id:'u5', name:'Osama', email:'osama@email.com', role:'seller', tier:'exclusive' }
    };
    this.state.user = mock[provider] || mock.email;
    this.saveAuth();
    document.getElementById('loginModal').classList.remove('open');
    this.toast(`Welcome, ${this.state.user.name}`, 'success');
    this.navTo('dashboard');
  },

  logout() { this.state.user = null; this.saveAuth(); this.navTo('home'); this.toast('Signed out', 'info'); },

  reqAuth() { if(!this.state.user){ openById('loginModal'); return false; } return true; },

  renderAuthUI() {
    const el = document.getElementById('authUI');
    if (!el) return;
    if (this.state.user) {
      el.innerHTML = `
        <div style="position:relative;">
          <div class="nav-avatar" onclick="App.toggleDD()">${this.state.user.name[0]}</div>
          <div class="nav-dropdown" id="userDD">
            <a onclick="App.navTo('dashboard')">📊 Dashboard</a>
            <a onclick="App.navTo('my-store')">🏪 My Store</a>
            <a onclick="App.navTo('settings')">⚙️ Settings</a>
            <div class="divider"></div>
            <a onclick="App.logout()" style="color:#ef4444;">🚪 Sign Out</a>
          </div>
        </div>`;
    } else {
      el.innerHTML = `<button class="btn btn-sm btn-ghost" onclick="openById('loginModal')">Sign In</button>
        <button class="btn btn-sm btn-primary" onclick="openById('registerModal')">Get Started</button>`;
    }
  },

  toggleDD() {
    const dd = document.getElementById('userDD');
    if (dd) dd.classList.toggle('open');
  },

  // ============================================================
  // GLOBAL BINDINGS
  // ============================================================
  bindGlobals() {
    document.addEventListener('click', e => {
      if (!e.target.closest('.nav-avatar') && !e.target.closest('.nav-dropdown')) {
        const dd = document.getElementById('userDD'); if (dd) dd.classList.remove('open');
      }
      if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
    });

    document.getElementById('mobileToggle').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('open');
    });

    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

    // Login form
    document.getElementById('loginBtn').addEventListener('click', () => {
      const e = document.getElementById('loginEmail').value;
      const p = document.getElementById('loginPass').value;
      if (!e || !p) { this.toast('Fill all fields', 'error'); return; }
      if (p === 'forgot') { this.toast('Reset link sent to ' + e, 'info'); return; }
      this.login('email');
    });

    // Register form
    document.getElementById('regBtn').addEventListener('click', () => {
      const n = document.getElementById('regName').value;
      const e = document.getElementById('regEmail').value;
      const p = document.getElementById('regPass').value;
      if (!n || !e || !p) { this.toast('Fill all fields', 'error'); return; }
      this.state.user = { id:'u'+Date.now(), name:n, email:e, role:'seller', tier:'free' };
      this.saveAuth();
      closeById('registerModal');
      this.toast(`Welcome, ${n}! 🎉`, 'success');
      this.navTo('dashboard');
    });

    // Seller form
    document.getElementById('sellerBtn').addEventListener('click', function(e) {
      e.preventDefault(); this.disabled = true; this.textContent = 'Submitting...';
      setTimeout(() => {
        document.getElementById('sellerForm').style.display = 'none';
        document.getElementById('sellerOk').style.display = 'block';
      }, 1200);
    });

    // Product tabs
    document.getElementById('prodTabs').addEventListener('click', e => {
      if (!e.target.classList.contains('tab')) return;
      document.querySelectorAll('#prodTabs .tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      this.state.prodCat = e.target.dataset.cat;
      this.renderProducts();
    });

    // Tools search
    const ts = document.getElementById('toolsSearch');
    if (ts) ts.addEventListener('input', e => {
      const t = e.target.value.toLowerCase();
      document.querySelectorAll('#toolsGrid .tool-card').forEach(c => {
        c.style.display = (c.dataset.search || '').includes(t) ? '' : 'none';
      });
    });

    // Products search
    const ps = document.getElementById('prodSearch');
    if (ps) ps.addEventListener('input', e => {
      const t = e.target.value.toLowerCase();
      document.querySelectorAll('#prodGrid .product-card').forEach(c => {
        c.style.display = (c.dataset.search || '').includes(t) ? '' : 'none';
      });
    });
  },

  // ============================================================
  // NAVIGATION
  // ============================================================
  navTo(page) {
    this.state.page = page;
    document.querySelectorAll('.page-panel').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-links a[data-page]').forEach(a => a.classList.toggle('active', a.dataset.page === page));
    document.getElementById('navLinks').classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'marketplace') this.renderMarketplace();
    if (page === 'ads') this.renderAds();
    if (page === 'videos') this.renderVideos();
    if (page === 'discussions') this.renderDiscussions();
    if (page === 'roadmap') this.renderRoadmap();
    if (page === 'faq') this.renderFAQ();
    if (page === 'dashboard' && !this.state.user) { this.navTo('home'); openById('loginModal'); return; }
    if (page === 'dashboard') this.renderDashboard();
    if (page === 'my-store' && !this.reqAuth()) return;
    if (page === 'my-store') this.renderMyStore();
    if (page === 'settings' && !this.reqAuth()) return;
    if (page === 'settings') this.renderSettings();
  },

  // ============================================================
  // RENDER ALL
  // ============================================================
  renderAll() {
    this.renderTools();
    this.renderProducts();
    this.renderTiers();
  },

  renderTools() {
    const g = document.getElementById('toolsGrid'); if (!g) return;
    g.innerHTML = HUB.tools.map(t => `
      <a href="${t.url}" target="_blank" rel="noopener" class="tool-card" data-search="${t.name.toLowerCase()} ${t.desc.toLowerCase()}">
        <div class="icon-box icon-box-md icon-${t.color}">${svgIcon(t.color)}</div>
        <div class="tool-body">
          <h3>${t.name}</h3>
          <p>${t.desc}</p>
          <div class="domain">${new URL(t.url).hostname}</div>
        </div>
        <span class="tool-arrow">${SYMBOLS.arrowRight}</span>
      </a>
    `).join('');
  },

  renderProducts() {
    const g = document.getElementById('prodGrid'); if (!g) return;
    const cat = this.state.prodCat;
    const items = cat === 'all' ? HUB.products : HUB.products.filter(p => p.cat === cat);
    g.innerHTML = items.map(p => {
      const prs = HUB.reviews.filter(r => r.pid === p.id);
      const avg = prs.length ? (prs.reduce((s,r)=>s+r.rating,0)/prs.length).toFixed(1) : p.rating;
      return `
        <div class="product-card${p.featured?' featured':''}" data-search="${p.name.toLowerCase()} ${p.desc.toLowerCase()}">
          <div class="product-media"><div class="icon-box icon-box-lg icon-accent">${svgLg(p.cat)}</div></div>
          <div class="product-cat">${p.cat}</div>
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <div class="product-price-row">
            <span class="product-price">$${p.price}</span>
            <span class="product-rating">${SYMBOLS.star} ${avg} (${prs.length||p.reviews})</span>
          </div>
          <div class="product-actions">
            <a href="${p.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Buy on Gumroad ${SYMBOLS.external}</a>
            <button class="btn btn-ghost btn-sm" onclick="App.openReviews('${p.id}')">Reviews</button>
          </div>
        </div>`;
    }).join('');
  },

  renderTiers() {
    const g = document.getElementById('tiersGrid'); if (!g) return;
    g.innerHTML = HUB.tiers.map(t => `
      <div class="tier-card${t.id==='pro'?' popular':''}${t.id==='exclusive'?' exclusive':''}">
        <div class="icon-box icon-box-lg icon-accent" style="margin:0 auto 12px;">${svgLg(t.id)}</div>
        <div class="tier-name">${t.name}</div>
        <div style="font-size:0.78rem;color:var(--accent-light);font-weight:600;margin-bottom:8px;">${t.label}</div>
        <div class="tier-price">${t.price===0?'Free':'$'+t.price}<span>/mo</span></div>
        <div class="tier-comm">${t.comm===0?'0% — you keep 100%':t.comm+'% platform fee'}</div>
        <ul>${t.has.map(h=>`<li>${h}</li>`).join('')}${t.miss.map(m=>`<li class="x">${m}</li>`).join('')}</ul>
        <button class="btn ${t.id==='pro'?'btn-primary':t.id==='exclusive'?'btn-ghost':'btn-secondary'} btn-sm" style="width:100%;" onclick="${t.id==='free'?"App.navTo('marketplace')":"openById('sellerModal')"}">${t.price===0?'Start Free':'Get Started'}</button>
      </div>
    `).join('');
  },

  // ---- PAGE RENDERERS ----
  renderMarketplace() {
    const g = document.getElementById('marketGrid'); if (!g) return;
    g.innerHTML = HUB.sellers.map(s => `
      <div class="tool-card" style="cursor:default;">
        <div class="icon-box icon-box-md icon-accent">${s.name[0]}</div>
        <div class="tool-body">
          <h3>${s.store}</h3>
          <p>${s.name} · ${s.products} products · ${s.tier.toUpperCase()} tier</p>
          <div class="domain">Member since ${s.since}</div>
        </div>
        <button class="btn btn-sm btn-ghost" onclick="App.toast('Full store preview coming with seller dashboard','info')">View</button>
      </div>
    `).join('');
  },

  renderAds() {
    const g = document.getElementById('adsGrid'); if (!g) return;
    g.innerHTML = HUB.ads.map(a => `
      <div class="tier-card">
        <div class="icon-box icon-box-lg icon-accent" style="margin:0 auto 12px;">${svgLg(a.icon)}</div>
        <h3 style="font-size:1rem;">${a.title}</h3>
        <p style="font-size:0.82rem;color:var(--text-muted);margin:8px 0;">${a.desc}</p>
        <div class="tier-price">$${a.price}<span>/mo</span></div>
        <button class="btn btn-primary btn-sm" style="width:100%;" onclick="App.buyAd('${a.id}')">Reserve Slot</button>
      </div>
    `).join('');
  },

  buyAd(id) {
    if (!this.reqAuth()) return;
    const a = HUB.ads.find(x => x.id === id);
    this.toast(`Ad interest: ${a.title}. We'll contact ${this.state.user.email}.`, 'success');
  },

  renderVideos() {
    const g = document.getElementById('videosGrid'); if (!g) return;
    g.innerHTML = HUB.videos.map(v => `
      <div class="product-card">
        <div class="product-media" style="cursor:pointer;position:relative;">
          <div class="icon-box icon-box-lg icon-accent">${svgLg('play')}</div>
          ${v.premium ? '<span style="position:absolute;top:10px;right:10px;background:var(--amber);color:#000;font-size:0.65rem;font-weight:700;padding:3px 10px;border-radius:4px;">'+SYMBOLS.lock+' Premium</span>' : ''}
        </div>
        <h3 style="font-size:0.9rem;">${v.title}</h3>
        <p class="desc">${v.desc} · ${v.dur}</p>
        <span style="font-size:0.75rem;color:${v.premium?'var(--amber)':'var(--green)'}">${v.premium ? 'Pro+ required' : 'Free to watch'}</span>
      </div>
    `).join('');
  },

  renderDiscussions() {
    const g = document.getElementById('discGrid'); if (!g) return;
    g.innerHTML = HUB.discussions.map(d => `
      <div class="tool-card" style="cursor:pointer;">
        <div class="tool-body">
          <h3 style="cursor:pointer;" onclick="App.toast('Discussion view coming soon','info')">${d.title}</h3>
          <p style="font-size:0.78rem;color:var(--text-muted);">👤 ${d.author} · 💬 ${d.replies} · 👁 ${d.views} · ${d.cat} · ${d.date}</p>
        </div>
      </div>
    `).join('');
  },

  renderRoadmap() {
    const g = document.getElementById('rmGrid'); if (!g) return;
    g.innerHTML = HUB.roadmap.map(r => `
      <div class="tool-card" style="flex-direction:column;align-items:flex-start;border-left:3px solid;border-left-color: var(--${r.color}); cursor:default;">
        <div style="font-size:0.72rem;font-weight:700;color:var(--${r.color});margin-bottom:6px;">${r.phase}</div>
        <h3 style="margin-bottom:10px;">${r.title}</h3>
        <ul style="list-style:none;font-size:0.83rem;color:var(--text-secondary);">
          ${r.items.map(i => `<li style="padding:3px 0;">▸ ${i}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  },

  renderFAQ() {
    const g = document.getElementById('faqGrid'); if (!g) return;
    g.innerHTML = HUB.faq.map(f => `
      <div class="tool-card" style="flex-direction:column;align-items:flex-start;cursor:default;">
        <h3 style="margin-bottom:6px;">${f.q}</h3>
        <p style="font-size:0.84rem;color:var(--text-secondary);line-height:1.6;">${f.a}</p>
      </div>
    `).join('');
  },

  renderDashboard() {
    const el = document.getElementById('dashContent'); if (!el) return;
    const u = this.state.user;
    el.innerHTML = `
      <div class="grid-3">
        <div class="tier-card" style="text-align:center;">
          <div class="icon-box icon-box-lg icon-accent" style="margin:0 auto 12px;">${u.name[0]}</div>
          <h3>${u.name}</h3>
          <p style="color:var(--text-muted);font-size:0.82rem;">${u.email}</p>
          <span style="font-size:0.75rem;color:var(--accent-light);font-weight:600;">${u.tier.toUpperCase()} Tier</span>
        </div>
        <div class="tier-card" style="text-align:center;">
          <div class="icon-box icon-box-lg icon-green" style="margin:0 auto 12px;">📦</div>
          <div class="tier-price">${HUB.products.length}</div>
          <p style="color:var(--text-muted);">Products Listed</p>
        </div>
        <div class="tier-card" style="text-align:center;">
          <div class="icon-box icon-box-lg icon-amber" style="margin:0 auto 12px;">💰</div>
          <div class="tier-price">$0</div>
          <p style="color:var(--text-muted);">Earnings (Tracked in Q4)</p>
        </div>
      </div>`;
  },

  renderMyStore() {
    const el = document.getElementById('storeContent'); if (!el) return;
    el.innerHTML = `<div class="grid-3">${HUB.products.map(p => `
      <div class="tier-card" style="text-align:center;">
        <div class="product-media" style="height:120px;margin-bottom:12px;"><div class="icon-box icon-box-lg icon-accent">${svgLg(p.cat)}</div></div>
        <h3 style="font-size:0.88rem;">${p.name.split(' — ')[0]}</h3>
        <div class="tier-price">$${p.price}</div>
        <p style="font-size:0.78rem;color:var(--text-muted);">★ ${p.rating} · ${p.reviews} reviews</p>
        <button class="btn btn-sm btn-ghost" style="width:100%;margin-top:8px;" onclick="App.openReviews('${p.id}')">View Reviews</button>
      </div>
    `).join('')}</div>`;
  },

  renderSettings() {
    const el = document.getElementById('setContent'); if (!el) return;
    el.innerHTML = `
      <div class="tool-card" style="flex-direction:column;margin-bottom:16px;">
        <h3>⚙️ Account Settings</h3>
        <div class="form-group"><label>Display Name</label><input value="${this.state.user.name}" id="setName"></div>
        <div class="form-group"><label>Email</label><input value="${this.state.user.email}" disabled></div>
        <div class="form-group"><label>Tier</label><input value="${this.state.user.tier.toUpperCase()}" disabled></div>
        <button class="btn btn-primary" onclick="App.saveSet()">Save Changes</button>
      </div>
      <div class="tool-card" style="flex-direction:column;">
        <h3>🔐 Password & Recovery</h3>
        <div class="form-group"><label>New Password</label><input type="password" id="setPass"></div>
        <div class="form-group"><label>Recovery Email</label><input type="email" id="setRecovery"></div>
        <button class="btn btn-secondary" onclick="App.toast('Security settings saved','success')">Update Security</button>
      </div>`;
  },

  saveSet() {
    const n = document.getElementById('setName').value;
    if (n) { this.state.user.name = n; this.saveAuth(); this.toast('Saved','success'); }
  },

  // ---- REVIEWS ----
  openReviews(pid) {
    const p = HUB.products.find(x => x.id === pid);
    const rs = HUB.reviews.filter(r => r.pid === pid);
    const m = document.getElementById('reviewModal');
    const c = document.getElementById('reviewBody');
    c.innerHTML = `
      <h2>${p ? p.name : 'Reviews'}</h2>
      <div style="display:flex;align-items:center;gap:8px;margin:8px 0 16px;">
        ${'★★★★★'.split('').map(()=>SYMBOLS.star).join('')}
        <span style="font-size:0.84rem;color:var(--text-secondary);">${rs.length} reviews</span>
        ${this.state.user?`<button class="btn btn-sm btn-ghost" onclick="App.addReview('${pid}')">Write Review</button>`:''}
      </div>
      ${rs.length===0?'<div class="empty-state"><h3>No reviews yet</h3><p>Be the first to share your experience.</p></div>':''}
      ${rs.map(r=>`
        <div class="tool-card" style="flex-direction:column;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-weight:600;font-size:0.86rem;">${r.author}</span>
            <span style="font-size:0.74rem;color:var(--text-muted);">${r.date}</span>
          </div>
          <div style="color:var(--amber);font-size:0.75rem;margin:4px 0;">${Array(r.rating).fill(SYMBOLS.star).join('')}</div>
          <p style="font-size:0.84rem;color:var(--text-secondary);">${r.text}</p>
          <div style="display:flex;gap:8px;margin-top:6px;">
            <button class="btn btn-sm btn-ghost" style="font-size:0.75rem;">👍 Helpful</button>
            <button class="btn btn-sm btn-ghost" style="font-size:0.75rem;color:var(--red);" onclick="App.toast('Report submitted','info')">🚩 Report</button>
          </div>
        </div>
      `).join('')}
      <button class="btn btn-secondary btn-sm" style="margin-top:12px;" onclick="closeById('reviewModal')">Close</button>`;
    m.classList.add('open');
  },

  addReview(pid) {
    const t = prompt('Your review:'); if (!t) return;
    const r = parseInt(prompt('Rating (1-5):','5')); if (!r||r<1||r>5) return;
    HUB.reviews.unshift({ id:'r'+Date.now(), pid, author:this.state.user.name, rating:r, text:t, date:new Date().toISOString().split('T')[0] });
    this.toast('Review posted!','success');
    this.openReviews(pid);
  },

  // ---- TOAST ----
  toast(msg, type) {
    const s = document.getElementById('toasts');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = msg;
    s.appendChild(t);
    setTimeout(() => { t.style.opacity='0'; t.style.transition='opacity 0.3s'; setTimeout(()=>t.remove(),300); }, 3500);
  }
};

// ---- ICON GENERATORS ----
function svgIcon(color) {
  const icons = {
    accent: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    green: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    amber: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    red: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
  };
  return icons[color] || icons.accent;
}

function svgLg(cat) {
  const icons = {
    freelance: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
    bundles: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    marketing: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    productivity: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    pro: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    exclusive: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    free: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    star: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    rocket: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    pin: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    play: '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    mail: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>'
  };
  return icons[cat] || icons.bundles;
}

// ---- HELPERS ----
function openById(id) { document.getElementById(id).classList.add('open'); }
function closeById(id) { document.getElementById(id).classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => App.init());
