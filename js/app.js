/**
 * creatorhub-app.js — Main application controller
 * Handles: auth, navigation, rendering, modals, reviews, discussions, ads, search
 */

const App = {
  state: {
    user: null,           // { id, name, email, role, avatar, tier }
    currentPage: 'home',
    activeProductCat: 'all',
    activeToolSearch: '',
    activeProductSearch: ''
  },

  init() {
    this.loadAuthFromStorage();
    this.renderAll();
    this.bindNav();
    this.bindModals();
    this.bindSearch();
    this.bindProductFilters();
    this.bindTierButtons();
    this.bindScrollReveal();
    console.log('🚀 CreatorHub v2 ready —', new Date().toLocaleString());
  },

  // ============================================================
  // AUTH
  // ============================================================
  loadAuthFromStorage() {
    const saved = localStorage.getItem('creatorhub_user');
    if (saved) {
      try { this.state.user = JSON.parse(saved); } catch(e) { /* ignore */ }
    }
  },

  saveAuth() {
    if (this.state.user) {
      localStorage.setItem('creatorhub_user', JSON.stringify(this.state.user));
    } else {
      localStorage.removeItem('creatorhub_user');
    }
    this.renderAuthUI();
  },

  login(provider) {
    // Simulated login — in production, use Firebase Auth / Auth0 / Supabase
    const mockUsers = {
      google:  { id: 'u1', name: 'Osama', email: 'osama@gmail.com', role: 'seller', avatar: '🦞', tier: 'exclusive' },
      github:  { id: 'u2', name: 'OsamaDev', email: 'osama@github.com', role: 'seller', avatar: '🐙', tier: 'pro' },
      twitter: { id: 'u3', name: '@osamacreates', email: 'osama@twitter.com', role: 'buyer', avatar: '🐦', tier: 'free' },
      facebook:{ id: 'u4', name: 'Osama K.', email: 'osama@fb.com', role: 'buyer', avatar: '📘', tier: 'free' },
      email:   { id: 'u5', name: 'Osama', email: 'osama@email.com', role: 'seller', avatar: '🦞', tier: 'exclusive' }
    };

    this.state.user = mockUsers[provider] || mockUsers.email;
    this.saveAuth();

    // Close login modal
    document.getElementById('loginModal').classList.remove('open');
    this.showToast(`Welcome back, ${this.state.user.name}!`, 'success');
    this.navigate('dashboard');
  },

  logout() {
    this.state.user = null;
    this.saveAuth();
    this.navigate('home');
    this.showToast('Logged out successfully', 'info');
  },

  requireAuth() {
    if (!this.state.user) {
      this.openModal('loginModal');
      return false;
    }
    return true;
  },

  renderAuthUI() {
    const authEl = document.getElementById('authUI');
    if (!authEl) return;

    if (this.state.user) {
      authEl.innerHTML = `
        <div style="position:relative;">
          <div class="nav-avatar" onclick="App.toggleDropdown()">${this.state.user.avatar}</div>
          <div class="nav-dropdown" id="userDropdown">
            <a onclick="App.navigate('dashboard')">📊 Dashboard</a>
            <a onclick="App.navigate('my-store')">🏪 My Store</a>
            <a onclick="App.navigate('settings')">⚙️ Settings</a>
            <div class="divider"></div>
            <a onclick="App.logout()" style="color:#ef4444;">🚪 Logout</a>
          </div>
        </div>
      `;
    } else {
      authEl.innerHTML = `
        <button class="btn btn-sm btn-outline" onclick="App.openModal('loginModal')">Sign In</button>
        <button class="btn btn-sm btn-primary" onclick="App.openModal('registerModal')">Get Started</button>
      `;
    }
  },

  toggleDropdown() {
    document.getElementById('userDropdown').classList.toggle('open');
  },

  // ============================================================
  // NAVIGATION
  // ============================================================
  bindNav() {
    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-avatar') && !e.target.closest('.nav-dropdown')) {
        const dd = document.getElementById('userDropdown');
        if (dd) dd.classList.remove('open');
      }
      // Close modals on overlay click
      if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('open');
      }
    });

    // Mobile menu
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
      document.getElementById('navLinks').classList.toggle('open');
    });
  },

  navigate(page) {
    this.state.currentPage = page;

    // Hide all pages
    document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));

    // Show target page
    const target = document.getElementById(`page-${page}`);
    if (target) target.classList.add('active');

    // Update nav active
    document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
      a.classList.toggle('active', a.dataset.page === page);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    document.getElementById('navLinks').classList.remove('open');

    // Page-specific init
    if (page === 'marketplace') this.renderMarketplace();
    if (page === 'ads') this.renderAds();
    if (page === 'videos') this.renderVideos();
    if (page === 'discussions') this.renderDiscussions();
    if (page === 'roadmap') this.renderRoadmap();
    if (page === 'faq') this.renderFAQ();
    if (page === 'dashboard') this.renderDashboard();
    if (page === 'my-store' && !this.requireAuth()) { this.navigate('home'); return; }
    if (page === 'settings' && !this.requireAuth()) { this.navigate('home'); return; }
    if (page === 'my-store') this.renderMyStore();
    if (page === 'settings') this.renderSettings();
  },

  // ============================================================
  // RENDER ALL STATIC CONTENT
  // ============================================================
  renderAll() {
    this.renderTools();
    this.renderProducts();
    this.renderTiers();
    this.renderAuthUI();
  },

  renderTools() {
    const grid = document.getElementById('toolsGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.tools.map(t => `
      <a href="${t.url}" target="_blank" rel="noopener" class="tool-card" data-search="${t.name.toLowerCase()} ${t.desc.toLowerCase()}">
        <div class="tool-icon ${t.color}">${t.icon}</div>
        <div class="tool-info">
          <h3>${t.name}${t.warning ? ' ⚠️' : ''}</h3>
          <p>${t.desc}</p>
          <div class="tool-domain">${new URL(t.url).hostname}</div>
          ${t.warning ? `<p style="color:#f59e0b;font-size:0.7rem;margin-top:3px;">${t.warning}</p>` : ''}
        </div>
        <span class="tool-arrow">→</span>
      </a>
    `).join('');
  },

  renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    const cat = this.state.activeProductCat;
    const filtered = cat === 'all' ? CREATORHUB.products : CREATORHUB.products.filter(p => p.category === cat);

    grid.innerHTML = filtered.map(p => {
      const productReviews = CREATORHUB.reviews.filter(r => r.productId === p.id);
      const avgRating = productReviews.length > 0
        ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
        : p.rating;

      return `
        <div class="product-card${p.featured ? ' featured' : ''}" data-search="${p.name.toLowerCase()} ${p.desc.toLowerCase()}">
          <div class="product-image">${p.image}</div>
          <div class="product-category">${p.category}</div>
          <h3>${p.name}</h3>
          <p class="desc">${p.desc}</p>
          <div class="product-price">
            $${p.price}
            <span class="product-rating">★ ${avgRating} (${productReviews.length || p.reviews} reviews)</span>
          </div>
          <div class="product-footer">
            <a href="${p.url}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Buy on Gumroad</a>
            <button class="btn btn-outline btn-sm" onclick="App.openReviews('${p.id}')">Reviews</button>
          </div>
        </div>
      `;
    }).join('');
  },

  renderTiers() {
    const grid = document.getElementById('tiersGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.tiers.map(t => `
      <div class="tier-card${t.id === 'pro' ? ' popular' : ''}${t.id === 'exclusive' ? ' exclusive' : ''}">
        <div class="tier-icon">${t.icon}</div>
        <h3>${t.name}</h3>
        <div class="tier-price">${t.price === 0 ? 'Free' : '$' + t.price}<span>/month</span></div>
        <p style="font-size:0.82rem;color:var(--text-muted);margin-bottom:16px;">Commission: ${t.commission === 0 ? '0% (you keep 100%)' : t.commission + '% platform fee'}</p>
        <ul>
          ${t.features.map(f => `<li>${f}</li>`).join('')}
          ${t.missing.map(m => `<li class="x">${m}</li>`).join('')}
        </ul>
        <button class="btn ${t.id === 'pro' ? 'btn-primary' : t.id === 'exclusive' ? 'btn-outline' : 'btn-secondary'} btn-sm" style="width:100%;justify-content:center;" onclick="${t.id === 'free' ? "App.navigate('marketplace')" : "App.openModal('sellerModal')"}">${t.id === 'free' ? 'Start Free' : 'Get Started'}</button>
      </div>
    `).join('');
  },

  // ============================================================
  // MARKETPLACE PAGE
  // ============================================================
  renderMarketplace() {
    const grid = document.getElementById('marketplaceGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.sellers.map(s => `
      <div class="card" style="display:flex;gap:16px;align-items:center;">
        <div style="width:48px;height:48px;border-radius:50%;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex-shrink:0;">${s.avatar}</div>
        <div style="flex:1;min-width:0;">
          <h4 style="font-size:0.95rem;">${s.store}</h4>
          <p style="font-size:0.8rem;color:var(--text-muted);">${s.name} · ${s.products} products · ${s.tier.toUpperCase()}</p>
        </div>
        <span class="btn btn-sm btn-outline" onclick="alert('Store preview coming in v2')">View Store</span>
      </div>
    `).join('');
  },

  // ============================================================
  // ADS PAGE
  // ============================================================
  renderAds() {
    const grid = document.getElementById('adsGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.ads.map(a => `
      <div class="card" style="text-align:center;">
        <div style="font-size:2rem;margin-bottom:8px;">${a.type === 'hero' ? '🚀' : a.type === 'featured' ? '⭐' : a.type === 'sidebar' ? '📌' : '🎬'}</div>
        <h4>${a.title}</h4>
        <p style="font-size:0.82rem;color:var(--text-muted);margin:8px 0;">${a.desc}</p>
        <div style="font-size:1.2rem;font-weight:700;color:var(--accent);margin-bottom:12px;">$${a.price}<span style="font-size:0.8rem;color:var(--text-muted);font-weight:400;">/month</span></div>
        <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center;" onclick="App.buyAd('${a.id}')">Buy This Slot</button>
      </div>
    `).join('');
  },

  buyAd(adId) {
    if (!this.requireAuth()) return;
    const ad = CREATORHUB.ads.find(a => a.id === adId);
    this.showToast(`🎯 Ad interest registered: ${ad.title}. We'll contact you at ${this.state.user.email}.`, 'success');
  },

  // ============================================================
  // VIDEOS PAGE
  // ============================================================
  renderVideos() {
    const grid = document.getElementById('videosGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.videos.map(v => `
      <div class="video-card">
        <div class="video-thumb${v.premium ? ' premium' : ''}">${v.thumb}</div>
        <div class="video-info">
          <h4>${v.title}</h4>
          <p>${v.desc} · ${v.duration}</p>
          ${v.premium ? '<span style="font-size:0.75rem;color:var(--amber);">🔒 Premium content — Unlock with Pro tier</span>' : '<span style="font-size:0.75rem;color:var(--green);">Free to watch</span>'}
        </div>
      </div>
    `).join('');
  },

  // ============================================================
  // DISCUSSIONS PAGE
  // ============================================================
  renderDiscussions() {
    const grid = document.getElementById('discussionsGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.discussions.map(d => `
      <div class="discussion-card">
        <div class="discussion-title">${d.title}</div>
        <div class="discussion-meta">
          <span>👤 ${d.author}</span>
          <span>💬 ${d.replies} replies</span>
          <span>👁 ${d.views} views</span>
          <span>🏷 ${d.category}</span>
          <span>📅 ${d.date}</span>
        </div>
      </div>
    `).join('');

    // New discussion button
    const actions = document.getElementById('discussionActions');
    if (actions) {
      actions.innerHTML = `<button class="btn btn-primary btn-sm" onclick="App.newDiscussion()">+ New Discussion</button>`;
    }
  },

  newDiscussion() {
    if (!this.requireAuth()) return;
    const title = prompt('Discussion title:');
    if (!title) return;
    CREATORHUB.discussions.unshift({
      id: 'd' + Date.now(), title, author: this.state.user.name,
      replies: 0, views: 0, category: 'general', date: new Date().toISOString().split('T')[0]
    });
    this.renderDiscussions();
    this.showToast('Discussion created!', 'success');
  },

  // ============================================================
  // ROADMAP PAGE
  // ============================================================
  renderRoadmap() {
    const grid = document.getElementById('roadmapGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.roadmap.map((r, i) => `
      <div class="card" style="border-left:3px solid ${i === 0 ? 'var(--green)' : i === 1 ? 'var(--accent)' : i === 2 ? 'var(--amber)' : '#ec4899'};">
        <div style="font-size:0.75rem;font-weight:700;color:${i === 0 ? 'var(--green)' : i === 1 ? 'var(--accent)' : i === 2 ? 'var(--amber)' : '#ec4899'};margin-bottom:6px;">${r.phase}</div>
        <h4 style="margin-bottom:8px;">${r.title}</h4>
        <ul style="list-style:none;font-size:0.82rem;color:var(--text-secondary);">
          ${r.items.map(item => `<li style="padding:3px 0;">▸ ${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  },

  // ============================================================
  // FAQ PAGE
  // ============================================================
  renderFAQ() {
    const grid = document.getElementById('faqGrid');
    if (!grid) return;
    grid.innerHTML = CREATORHUB.faq.map(f => `
      <div class="card">
        <h4 style="margin-bottom:6px;">${f.q}</h4>
        <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">${f.a}</p>
      </div>
    `).join('');
  },

  // ============================================================
  // DASHBOARD
  // ============================================================
  renderDashboard() {
    if (!this.state.user) { this.navigate('home'); return; }
    const el = document.getElementById('dashboardContent');
    if (!el) return;
    const user = this.state.user;
    el.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;">
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;">👤</div>
          <h4>${user.name}</h4>
          <p style="color:var(--text-muted);font-size:0.8rem;">${user.email}</p>
          <span style="font-size:0.75rem;color:var(--accent);">Tier: ${user.tier.toUpperCase()}</span>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;">📦</div>
          <div style="font-size:1.5rem;font-weight:700;">${CREATORHUB.products.length}</div>
          <p style="color:var(--text-muted);font-size:0.8rem;">Products Listed</p>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;">👁</div>
          <div style="font-size:1.5rem;font-weight:700;">0</div>
          <p style="color:var(--text-muted);font-size:0.8rem;">Total Views (Tracked in v2)</p>
        </div>
        <div class="card" style="text-align:center;">
          <div style="font-size:2rem;">💰</div>
          <div style="font-size:1.5rem;font-weight:700;">$0</div>
          <p style="color:var(--text-muted);font-size:0.8rem;">Earnings (Tracked in v2)</p>
        </div>
      </div>
    `;
  },

  // ============================================================
  // MY STORE
  // ============================================================
  renderMyStore() {
    const el = document.getElementById('myStoreContent');
    if (!el) return;
    el.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <h4>🏪 My Products</h4>
        <p style="color:var(--text-muted);font-size:0.85rem;">${CREATORHUB.products.length} products listed</p>
      </div>
      <div class="grid-4">
        ${CREATORHUB.products.map(p => `
          <div class="card" style="text-align:center;">
            <div style="font-size:2rem;">${p.image}</div>
            <h4 style="font-size:0.88rem;margin:8px 0;">${p.name.split(' — ')[0]}</h4>
            <div style="font-size:0.82rem;color:var(--accent);">$${p.price}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin:4px 0;">★ ${p.rating} · ${p.reviews} reviews</div>
            <button class="btn btn-sm btn-outline" style="width:100%;justify-content:center;margin-top:8px;" onclick="App.openReviews('${p.id}')">View Reviews</button>
          </div>
        `).join('')}
      </div>
    `;
  },

  // ============================================================
  // SETTINGS
  // ============================================================
  renderSettings() {
    const el = document.getElementById('settingsContent');
    if (!el) return;
    el.innerHTML = `
      <div class="card" style="margin-bottom:16px;">
        <h4>⚙️ Account Settings</h4>
        <div class="form-group" style="margin-top:12px;">
          <label>Display Name</label>
          <input type="text" value="${this.state.user.name}" id="settingsName">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" value="${this.state.user.email}" id="settingsEmail" disabled>
        </div>
        <div class="form-group">
          <label>Current Tier</label>
          <input type="text" value="${this.state.user.tier.toUpperCase()}" disabled>
        </div>
        <button class="btn btn-primary" onclick="App.saveSettings()">Save Changes</button>
      </div>
      <div class="card">
        <h4>🔐 Password & Recovery</h4>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:12px;">Change password or set up account recovery.</p>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password" id="settingsPass">
        </div>
        <div class="form-group">
          <label>Recovery Email</label>
          <input type="email" placeholder="Backup email for recovery" id="settingsRecovery">
        </div>
        <button class="btn btn-secondary" onclick="App.showToast('Settings saved (simulated)', 'success')">Update Security</button>
      </div>
    `;
  },

  saveSettings() {
    const name = document.getElementById('settingsName').value;
    if (name) {
      this.state.user.name = name;
      this.saveAuth();
      this.showToast('Settings saved!', 'success');
    }
  },

  // ============================================================
  // REVIEWS MODAL
  // ============================================================
  openReviews(productId) {
    const product = CREATORHUB.products.find(p => p.id === productId);
    const productReviews = CREATORHUB.reviews.filter(r => r.productId === productId);
    const modal = document.getElementById('reviewModal');
    const content = document.getElementById('reviewContent');

    content.innerHTML = `
      <h3>${product ? product.name : 'Reviews'}</h3>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
        <div class="stars">
          ${[1,2,3,4,5].map(s => `<span class="star filled">★</span>`).join('')}
        </div>
        <span style="font-size:0.85rem;color:var(--text-secondary);">${productReviews.length} reviews</span>
        ${this.state.user ? `<button class="btn btn-sm btn-outline" onclick="App.addReview('${productId}')">Write Review</button>` : ''}
      </div>
      ${productReviews.length === 0 ? '<p style="color:var(--text-muted);">No reviews yet. Be the first!</p>' : ''}
      ${productReviews.map(r => `
        <div class="review-card">
          <div class="review-header">
            <span class="review-author">${r.author}</span>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="stars" style="margin-bottom:4px;">${[1,2,3,4,5].map(s => `<span class="star${s <= r.rating ? ' filled' : ''}">★</span>`).join('')}</div>
          <div class="review-text">${r.text}</div>
          <div class="review-actions">
            <button>👍 Helpful</button>
            <button class="report" onclick="App.reportReview('${r.id}')">🚩 Report</button>
          </div>
        </div>
      `).join('')}
    `;

    modal.classList.add('open');
  },

  addReview(productId) {
    const text = prompt('Write your review:');
    if (!text) return;
    const rating = parseInt(prompt('Rating (1-5):', '5'));
    if (!rating || rating < 1 || rating > 5) return;

    CREATORHUB.reviews.push({
      id: 'r' + Date.now(), productId, author: this.state.user.name,
      rating, text, date: new Date().toISOString().split('T')[0]
    });
    this.showToast('Review submitted!', 'success');
    this.openReviews(productId); // Refresh
  },

  reportReview(reviewId) {
    this.showToast('Report submitted. Our team will review this.', 'info');
  },

  // ============================================================
  // MODALS
  // ============================================================
  bindModals() {
    // Login
    document.getElementById('loginEmailBtn').addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPass').value;
      if (!email || !pass) { this.showToast('Please fill all fields', 'error'); return; }
      // Simulate password recovery flow
      if (pass === 'forgot') {
        this.showToast('📧 Password reset link sent to ' + email, 'info');
        return;
      }
      this.login('email');
    });

    // Register
    document.getElementById('registerBtn').addEventListener('click', () => {
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const pass = document.getElementById('regPass').value;
      if (!name || !email || !pass) { this.showToast('Please fill all fields', 'error'); return; }
      this.state.user = { id: 'u' + Date.now(), name, email, role: 'seller', avatar: '🆕', tier: 'free' };
      this.saveAuth();
      document.getElementById('registerModal').classList.remove('open');
      this.showToast(`Welcome to CreatorHub, ${name}! 🎉`, 'success');
      this.navigate('dashboard');
    });

    // Seller application
    document.getElementById('sellerFormBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const btn = e.target;
      btn.disabled = true;
      btn.textContent = 'Submitting...';
      setTimeout(() => {
        document.getElementById('sellerForm').style.display = 'none';
        document.getElementById('sellerSuccess').classList.add('show');
        btn.disabled = false;
        btn.textContent = 'Apply Now';
      }, 1200);
    });
  },

  openModal(id) {
    document.getElementById(id).classList.add('open');
  },

  closeModal(id) {
    document.getElementById(id).classList.remove('open');
  },

  // ============================================================
  // SEARCH
  // ============================================================
  bindSearch() {
    const toolsSearch = document.getElementById('toolsSearch');
    const productsSearch = document.getElementById('productsSearch');

    if (toolsSearch) {
      toolsSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('#toolsGrid .tool-card').forEach(card => {
          const text = card.dataset.search || '';
          card.style.display = text.includes(term) ? '' : 'none';
        });

        // Show/hide no results
        const visible = document.querySelectorAll('#toolsGrid .tool-card[style*="display:"]').length;
        const total = document.querySelectorAll('#toolsGrid .tool-card').length;
        const noResults = document.getElementById('toolsNoResults');
        if (noResults) {
          noResults.style.display = (visible === total && term) ? 'block' : 'none';
        }
      });
    }

    if (productsSearch) {
      productsSearch.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('#productsGrid .product-card').forEach(card => {
          const text = card.dataset.search || '';
          card.style.display = text.includes(term) ? '' : 'none';
        });
      });
    }
  },

  bindProductFilters() {
    document.getElementById('productTabs').addEventListener('click', (e) => {
      if (!e.target.classList.contains('tab')) return;
      document.querySelectorAll('#productTabs .tab').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      this.state.activeProductCat = e.target.dataset.cat;
      this.renderProducts();
    });
  },

  bindTierButtons() {
    // Tier filter buttons
    document.querySelectorAll('[data-tier]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tier = btn.dataset.tier;
        document.querySelectorAll('.tier-card').forEach(card => {
          card.style.opacity = tier === 'all' || card.querySelector('h3')?.textContent.toLowerCase().includes(tier) ? '1' : '0.4';
        });
      });
    });
  },

  bindScrollReveal() {
    // Simple intersection observer for subtle entrance animation
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.card, .tool-card, .product-card, .video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
      });
    }
  },

  // ============================================================
  // TOAST NOTIFICATIONS
  // ============================================================
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    const colors = { success: 'var(--green)', error: 'var(--red)', info: 'var(--accent)', warning: 'var(--amber)' };
    toast.style.cssText = `
      background: var(--bg-elevated); border: 1px solid var(--border-light);
      border-left: 3px solid ${colors[type] || colors.info}; border-radius: 8px;
      padding: 12px 18px; margin-bottom: 8px; font-size: 0.85rem;
      animation: slideIn 0.3s ease; max-width: 360px;
    `;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Add CSS animation for toasts
const toastStyle = document.createElement('style');
toastStyle.textContent = '@keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }';
document.head.appendChild(toastStyle);

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
