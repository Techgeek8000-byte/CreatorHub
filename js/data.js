/**
 * creatorhub-data.js — All marketplace data
 * Replace with API calls in production
 */
const CREATORHUB = window.CREATORHUB || {};

// ---- TOOLS ----
CREATORHUB.tools = [
  { id: 'recai', name: 'RecAI', desc: 'AI-powered recruitment and resume analysis. Automate candidate screening in seconds.', url: 'https://recai-lilac.vercel.app/', icon: '🤖', color: 'purple', screenshots: 3 },
  { id: 'covercraft', name: 'CovercraftAI', desc: 'Generate professional cover letters and job applications powered by AI.', url: 'https://covercraft-ai-jade.vercel.app/', icon: '📝', color: 'blue', screenshots: 2 },
  { id: 'calchub', name: 'Calchub', desc: 'Financial, health, math, and unit conversion calculators. One hub for all calculations.', url: 'https://calc-hub-ashy.vercel.app/', icon: '🧮', color: 'green', screenshots: 1 },
  { id: 'toolpdf', name: 'ToolPDF', desc: 'Free PDF tools — merge, split, compress, convert, edit. No signup needed.', url: 'https://tool-pdf-six.vercel.app/', icon: '📄', color: 'rose', screenshots: 4 },
  { id: 'seokit', name: 'SEOKit', desc: 'Complete SEO toolkit — keyword research, meta tags, site audit, rank tracker.', url: 'https://seo-kit-tau.vercel.app/', icon: '🔍', color: 'amber', screenshots: 3 },
  { id: 'pixelforge', name: 'PixelForge', desc: 'AI image generation suite. Create stunning visuals from text prompts instantly.', url: 'https://pixelforge-ai-chi.vercel.app/', icon: '🎨', color: 'indigo', screenshots: 2 },
  { id: 'convertflow', name: 'Convertflow', desc: 'Conversion optimization — A/B testing, heatmaps, and funnel analytics for growth.', url: 'https://convert-flow-beta.vercel.app/', icon: '📊', color: 'cyan', screenshots: 2 }
];

// ---- PRODUCTS ----
CREATORHUB.products = [
  {
    id: 'freelancekit', name: 'FreelanceKit — Complete OS for Pakistani Freelancers',
    desc: 'Proposal templates, client management, invoicing, portfolio builder, local payment guides. Everything a Pakistani freelancer needs.',
    url: 'https://bahijan4.gumroad.com/l/mitybl', category: 'freelance', price: 19, rating: 4.8, reviews: 12,
    image: '📋', featured: true, seller: 'bahijan4'
  },
  {
    id: 'prompt-bundle', name: 'Complete AI Marketing Prompt Bundle (170 Prompts)',
    desc: 'Email + sales copy + social media prompts in one bundle. Save 40% vs buying separately.',
    url: 'https://bahijan4.gumroad.com/l/idjen', category: 'bundles', price: 29, rating: 4.9, reviews: 28,
    image: '🎯', featured: true, seller: 'bahijan4'
  },
  {
    id: 'mega-pack', name: '1000+ AI PROMPTS MEGA PACK',
    desc: 'The ultimate prompt library. Marketing, writing, coding, design, business — 1000+ prompts across every category.',
    url: 'https://bahijan4.gumroad.com/l/epvyit', category: 'bundles', price: 39, rating: 4.7, reviews: 45,
    image: '📚', featured: false, seller: 'bahijan4'
  },
  {
    id: 'email-prompts', name: '50 AI Email Marketing Prompts That Convert',
    desc: 'High-converting email sequences, subject lines, and newsletter prompts ready to use.',
    url: 'https://bahijan4.gumroad.com/l/slmda', category: 'marketing', price: 9, rating: 4.6, reviews: 18,
    image: '📧', featured: false, seller: 'bahijan4'
  },
  {
    id: 'sales-prompts', name: '50 AI Sales Copy Prompts That Close Deals',
    desc: 'Persuasive sales copy for landing pages, product descriptions, and pitch decks.',
    url: 'https://bahijan4.gumroad.com/l/jyynrh', category: 'marketing', price: 9, rating: 4.5, reviews: 15,
    image: '💼', featured: false, seller: 'bahijan4'
  },
  {
    id: 'social-prompts', name: '50 AI Social Media Prompts That Go Viral',
    desc: 'Viral content prompts for Twitter, LinkedIn, Instagram, and TikTok.',
    url: 'https://bahijan4.gumroad.com/l/kaalgq', category: 'marketing', price: 9, rating: 4.7, reviews: 22,
    image: '📱', featured: false, seller: 'bahijan4'
  },
  {
    id: 'goal-crusher', name: '30-Day Goal Crusher Planner — Printable Template',
    desc: 'Printable 30-day goal planner with daily tracking, habit builder, and reflection prompts.',
    url: 'https://bahijan4.gumroad.com/l/dpdourc', category: 'productivity', price: 5, rating: 4.4, reviews: 8,
    image: '📅', featured: false, seller: 'bahijan4'
  },
  {
    id: 'budget-boss', name: 'BUDGET BOSS — Ultimate Budget & Savings Tracker',
    desc: 'Take control of finances. Income, expenses, savings goals, and visual reports.',
    url: 'https://bahijan4.gumroad.com/l/kwkuha', category: 'productivity', price: 7, rating: 4.5, reviews: 11,
    image: '💰', featured: false, seller: 'bahijan4'
  },
  {
    id: 'habit-engine', name: 'The Habit Engine — 90-Day Habit Transformation',
    desc: 'Build lasting habits in 90 days. Daily check-ins, streaks, progress visualization.',
    url: 'https://bahijan4.gumroad.com/l/rcffp', category: 'productivity', price: 9, rating: 4.6, reviews: 14,
    image: '⚡', featured: false, seller: 'bahijan4'
  }
];

// ---- SELLERS (sample other sellers) ----
CREATORHUB.sellers = [
  { id: 'bahijan4', name: 'Osama', store: 'Bahijan Store', avatar: '🦞', tier: 'exclusive', products: 9, joined: '2026-01-01' },
  { id: 'ahmed-designs', name: 'Ahmed Khan', store: 'Ahmed Designs', avatar: '🎨', tier: 'pro', products: 12, joined: '2026-03-15' },
  { id: 'fatima-templates', name: 'Fatima R.', store: 'Template Hub PK', avatar: '📋', tier: 'pro', products: 8, joined: '2026-04-02' },
  { id: 'code-with-hassan', name: 'Hassan Ali', store: 'CodeWithHassan', avatar: '💻', tier: 'free', products: 3, joined: '2026-05-10' },
  { id: 'sarah-writes', name: 'Sarah M.', store: 'Creative Planners', avatar: '✍️', tier: 'free', products: 2, joined: '2026-06-20' }
];

// ---- VIDEOS ----
CREATORHUB.videos = [
  { id: 'v1', title: 'How FreelanceKit Helps You Land Clients Faster', desc: 'Walkthrough of every feature in FreelanceKit.', thumb: '📋', duration: '8:22', premium: false },
  { id: 'v2', title: 'AI Prompt Bundle: Real Examples That Convert', desc: 'See 10 prompts in action with real results.', thumb: '🎯', duration: '12:45', premium: true },
  { id: 'v3', title: 'ToolPDF Demo: Every Feature Explained', desc: 'Merge, split, compress — all PDF tools demoed.', thumb: '📄', duration: '5:30', premium: false },
  { id: 'v4', title: 'SEOKit Masterclass: Rank #1 on Google', desc: 'Complete SEO strategy using SEOKit step by step.', thumb: '🔍', duration: '18:10', premium: true },
  { id: 'v5', title: 'PixelForge: Create Stunning AI Art in Minutes', desc: 'Beginner to pro guide for AI image generation.', thumb: '🎨', duration: '9:55', premium: false },
  { id: 'v6', title: 'Budget Boss: Master Your Finances in 2026', desc: 'Full tutorial on using the budget tracker template.', thumb: '💰', duration: '7:40', premium: false }
];

// ---- ADS ----
CREATORHUB.ads = [
  { id: 'ad1', title: 'Get Featured on CreatorHub', desc: 'Boost your product to the top of search results. 30-day placement.', price: 20, type: 'featured' },
  { id: 'ad2', title: 'Homepage Hero Banner', desc: 'Your product or brand on the hero section. Seen by every visitor.', price: 30, type: 'hero' },
  { id: 'ad3', title: 'Sidebar Ad Slot', desc: 'Persistent banner on all marketplace pages. Monthly rotation.', price: 10, type: 'sidebar' },
  { id: 'ad4', title: 'Video Ad Spot', desc: 'Promote your product before premium video content.', price: 15, type: 'video' }
];

// ---- TIERS ----
CREATORHUB.tiers = [
  {
    id: 'free', name: 'Starter', icon: '🌱', price: 0, commission: 0,
    features: [
      'List up to 3 products', 'Basic store profile', 'Standard listing placement',
      'Access to discussion boards', 'Basic analytics (views only)'
    ],
    missing: ['Priority placement', 'Custom domain support', 'Video uploads', 'Advanced analytics', 'Commission-free sales beyond 3 products']
  },
  {
    id: 'pro', name: 'Pro Seller', icon: '⭐', price: 15, commission: 10,
    features: [
      'Unlimited product listings', 'Featured placement in search', 'Custom domain support',
      'Advanced analytics dashboard', 'Priority support (24h response)',
      'Video content uploads', 'Commission payouts (90% to you)',
      'Seller verification badge'
    ],
    missing: ['Dedicated account manager', 'API access', 'White-label storefront']
  },
  {
    id: 'exclusive', name: 'Exclusive', icon: '👑', price: 49, commission: 5,
    features: [
      'Everything in Pro', 'Homepage hero feature rotation',
      'Dedicated account manager', 'Full API access for auto-sync',
      'White-label storefront (your domain)', 'Newsletter feature (monthly)',
      'Social media promotion by CreatorHub', 'Early access to new features',
      'Custom commission negotiation', 'Co-branded marketing materials'
    ],
    missing: []
  }
];

// ---- REVIEWS (sample) ----
CREATORHUB.reviews = [
  { id: 'r1', productId: 'freelancekit', author: 'Ali R.', rating: 5, text: 'This saved me weeks of setup. The proposal templates alone are worth 10x the price. Every Pakistani freelancer needs this.', date: '2026-06-15' },
  { id: 'r2', productId: 'freelancekit', author: 'Zara K.', rating: 4, text: 'Great toolkit. Would love to see more Fiverr-specific templates added.', date: '2026-06-28' },
  { id: 'r3', productId: 'prompt-bundle', author: 'Usman J.', rating: 5, text: 'I was skeptical about AI prompts but these actually work. My email open rates went up 35%.', date: '2026-07-02' },
  { id: 'r4', productId: 'mega-pack', author: 'Nadia S.', rating: 5, text: '1000+ prompts and I use at least 10 daily. Best investment for content creation.', date: '2026-05-20' },
  { id: 'r5', productId: 'budget-boss', author: 'Kamran T.', rating: 4, text: 'Finally understand where my money goes. Simple but powerful.', date: '2026-06-10' },
  { id: 'r6', productId: 'habit-engine', author: 'Maryam A.', rating: 5, text: 'On day 67 and I have never been this consistent. The streak feature is addictive.', date: '2026-07-01' }
];

// ---- DISCUSSIONS ----
CREATORHUB.discussions = [
  { id: 'd1', title: 'Best AI tools for Pakistani freelancers in 2026?', author: 'Hassan A.', replies: 23, views: 450, category: 'tools', date: '2026-07-12' },
  { id: 'd2', title: 'How to price your digital products on Gumroad', author: 'Fatima R.', replies: 18, views: 320, category: 'selling', date: '2026-07-10' },
  { id: 'd3', title: 'CreatorHub feature requests — what do you want next?', author: 'Osama', replies: 34, views: 680, category: 'platform', date: '2026-07-08' },
  { id: 'd4', title: 'Success story: Made $500 in my first month', author: 'Ahmed K.', replies: 15, views: 280, category: 'stories', date: '2026-07-05' },
  { id: 'd5', title: 'Payment methods for Pakistani buyers — EasyPaisa/JazzCash integration?', author: 'Sarah M.', replies: 27, views: 390, category: 'platform', date: '2026-07-03' }
];

// ---- ROADMAP ----
CREATORHUB.roadmap = [
  { phase: 'Q3 2026 (Now)', title: 'Platform Launch', items: [
    'Unified marketplace live', 'Basic seller profiles', 'Product listings with Gumroad links',
    'Tool directory', 'Tier system (Free/Pro/Exclusive)', 'Discussion boards', 'Ratings & reviews',
    'Video content section', 'Ad slot marketplace', 'Social login (Google, GitHub, Twitter, Facebook)'
  ]},
  { phase: 'Q4 2026', title: 'Growth Engine', items: [
    'Custom domain support for sellers', 'Advanced analytics dashboard',
    'Gumroad API auto-sync', 'Email newsletter system', 'Affiliate/referral program',
    'Seller verification system', 'Automated commission tracking', 'Payment dashboard'
  ]},
  { phase: 'Q1 2027', title: 'Global Expansion', items: [
    'Multi-currency support', 'Local payment methods (EasyPaisa, JazzCash, UPI, WeChat Pay, Pix)',
    'Multi-language UI (Urdu, Hindi, Chinese, Spanish, Arabic)',
    'Regional landing pages (PK, IN, CN, EU, AU, US)',
    'Stripe/PayPal direct integration', 'Escrow payment system', 'Mobile app (iOS + Android)'
  ]},
  { phase: 'Q2 2027', title: 'Creator Economy OS', items: [
    'White-label storefront builder', 'Built-in course/membership platform',
    'Creator analytics suite', 'Community forums per seller', 'Live streaming for product demos',
    'API marketplace for developers', 'Enterprise accounts for agencies', 'Franchise model for regional partners'
  ]}
];

// ---- FAQ ----
CREATORHUB.faq = [
  { q: 'How do I earn commission on CreatorHub?', a: 'When you list as a Pro or Exclusive seller, products sold through your CreatorHub store earn you 90-95% (we take 5-10%). For Gumroad products, we use affiliate links. For direct sales, we handle payment processing and payout.' },
  { q: 'Can I use my own domain?', a: 'Yes — Pro and Exclusive sellers get custom domain support. Buy a domain (we recommend Namecheap or Porkbun), and we provide DNS setup instructions. Exclusive tier includes white-label storefront with your own domain.' },
  { q: 'What payment methods do you support?', a: 'Currently Gumroad handles payments for linked products. Phase 2 (Q4 2026) adds direct payment processing. Phase 3 (Q1 2027) adds EasyPaisa, JazzCash, UPI, WeChat Pay, Pix, and other regional methods.' },
  { q: 'How do ads work?', a: 'You can purchase ad slots (sidebar, featured listing, hero banner, video ads) starting at $10/month. Your ad appears on the CreatorHub marketplace. Third-party advertisers can also buy slots — movie promotions, app ads, brand campaigns.' },
  { q: 'Is there a free tier?', a: 'Yes — the Starter tier is 100% free. List up to 3 products, get basic analytics, and access discussion boards. Zero commission, forever.' }
];
