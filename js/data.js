/**
 * creatorhub-data.js — Marketplace data store
 * Replace static data with API calls in production
 */
const HUB = {

  tools: [
    { id:'recai', name:'RecAI', desc:'AI-powered recruitment and resume analysis. Automate candidate screening, skill matching, and hiring workflows.', url:'https://recai-lilac.vercel.app/', color:'accent', category:'ai' },
    { id:'covercraft', name:'CovercraftAI', desc:'Generate professional cover letters and job applications with AI. Customize for every role in seconds.', url:'https://covercraft-ai-jade.vercel.app/', color:'green', category:'ai' },
    { id:'calchub', name:'Calchub', desc:'Financial, health, math, and unit conversion calculators. One hub for all your calculation needs.', url:'https://calc-hub-ashy.vercel.app/', color:'amber', category:'utility' },
    { id:'toolpdf', name:'ToolPDF', desc:'Free PDF toolkit — merge, split, compress, convert, and edit. No signup, no limits.', url:'https://tool-pdf-six.vercel.app/', color:'red', category:'utility' },
    { id:'seokit', name:'SEOKit', desc:'Complete SEO toolkit — keyword research, meta tag generator, site audit, and rank tracking.', url:'https://seo-kit-tau.vercel.app/', color:'amber', category:'marketing' },
    { id:'pixelforge', name:'PixelForge', desc:'AI image generation and editing suite. Create stunning visuals from text prompts instantly.', url:'https://pixelforge-ai-chi.vercel.app/', color:'accent', category:'ai' },
    { id:'convertflow', name:'Convertflow', desc:'Conversion rate optimization — A/B testing, heatmaps, and funnel analytics to grow your business.', url:'https://convert-flow-beta.vercel.app/', color:'green', category:'marketing' }
  ],

  products: [
    { id:'freelancekit', name:'FreelanceKit — Complete OS for Pakistani Freelancers', desc:'Proposal templates, client management, invoicing, portfolio builder, and local payment guides. Everything a Pakistani freelancer needs to land and manage clients.', url:'https://bahijan4.gumroad.com/l/mitybl', cat:'freelance', price:19, rating:4.8, reviews:12, featured:true },
    { id:'prompt-bundle', name:'Complete AI Marketing Prompt Bundle (170 Prompts)', desc:'All 170 AI marketing prompts in one bundle. Email, sales copy, and social media — save 40% vs buying individually.', url:'https://bahijan4.gumroad.com/l/idjen', cat:'bundles', price:29, rating:4.9, reviews:28, featured:true },
    { id:'mega-pack', name:'1000+ AI PROMPTS MEGA PACK', desc:'The ultimate prompt library. Over 1000 prompts across marketing, writing, coding, design, and business.', url:'https://bahijan4.gumroad.com/l/epvyit', cat:'bundles', price:39, rating:4.7, reviews:45, featured:false },
    { id:'email-prompts', name:'50 AI Email Marketing Prompts That Convert', desc:'High-converting email sequences, subject lines, and newsletter prompts — ready to use with any AI tool.', url:'https://bahijan4.gumroad.com/l/slmda', cat:'marketing', price:9, rating:4.6, reviews:18, featured:false },
    { id:'sales-prompts', name:'50 AI Sales Copy Prompts That Close Deals', desc:'Persuasive sales copy prompts for landing pages, product descriptions, and pitch decks.', url:'https://bahijan4.gumroad.com/l/jyynrh', cat:'marketing', price:9, rating:4.5, reviews:15, featured:false },
    { id:'social-prompts', name:'50 AI Social Media Prompts That Go Viral', desc:'Viral-worthy content prompts for Twitter, LinkedIn, Instagram, and TikTok.', url:'https://bahijan4.gumroad.com/l/kaalgq', cat:'marketing', price:9, rating:4.7, reviews:22, featured:false },
    { id:'goal-crusher', name:'30-Day Goal Crusher Planner — Printable Template', desc:'Printable 30-day planner with daily tracking, habit building, and reflection prompts.', url:'https://bahijan4.gumroad.com/l/dpdourc', cat:'productivity', price:5, rating:4.4, reviews:8, featured:false },
    { id:'budget-boss', name:'BUDGET BOSS — Ultimate Budget & Savings Tracker', desc:'Take control of your finances. Income tracking, expense categories, savings goals, and visual reports.', url:'https://bahijan4.gumroad.com/l/kwkuha', cat:'productivity', price:7, rating:4.5, reviews:11, featured:false },
    { id:'habit-engine', name:'The Habit Engine — 90-Day Habit Transformation', desc:'Build lasting habits in 90 days. Daily check-ins, streak tracking, and progress visualization.', url:'https://bahijan4.gumroad.com/l/rcffp', cat:'productivity', price:9, rating:4.6, reviews:14, featured:false }
  ],

  sellers: [
    { id:'osama', name:'Osama', store:'Bahijan Store', tier:'exclusive', products:9, since:'Jan 2026' },
    { id:'ahmed', name:'Ahmed Khan', store:'Ahmed Designs', tier:'pro', products:12, since:'Mar 2026' },
    { id:'fatima', name:'Fatima R.', store:'Template Hub PK', tier:'pro', products:8, since:'Apr 2026' },
    { id:'hassan', name:'Hassan Ali', store:'CodeWithHassan', tier:'free', products:3, since:'May 2026' }
  ],

  videos: [
    { id:'v1', title:'How FreelanceKit Helps You Land Clients Faster', desc:'Complete walkthrough of every feature in FreelanceKit.', dur:'8:22', premium:false },
    { id:'v2', title:'AI Prompt Bundle: Real Examples That Convert', desc:'See 10 prompts in action with real-world results.', dur:'12:45', premium:true },
    { id:'v3', title:'ToolPDF Demo: Every Feature Explained', desc:'Merge, split, compress — all PDF tools demonstrated step by step.', dur:'5:30', premium:false },
    { id:'v4', title:'SEOKit Masterclass: Rank #1 on Google', desc:'Complete SEO strategy using SEOKit from start to finish.', dur:'18:10', premium:true },
    { id:'v5', title:'PixelForge: Create Stunning AI Art in Minutes', desc:'Beginner to pro guide for AI image generation.', dur:'9:55', premium:false },
    { id:'v6', title:'Budget Boss: Master Your Finances in 2026', desc:'Full tutorial on using the budget tracker template.', dur:'7:40', premium:false }
  ],

  ads: [
    { id:'ad1', title:'Featured Listing', desc:'Top of search results. 30-day placement with "Featured" badge.', price:20, icon:'star' },
    { id:'ad2', title:'Hero Banner', desc:'Homepage hero placement. Seen by every visitor, every day.', price:30, icon:'rocket' },
    { id:'ad3', title:'Sidebar Ad', desc:'Persistent banner on marketplace pages. Monthly rotation.', price:10, icon:'pin' },
    { id:'ad4', title:'Video Pre-Roll', desc:'Your ad plays before premium video content.', price:15, icon:'play' },
    { id:'ad5', title:'Newsletter Feature', desc:'Featured in weekly CreatorHub newsletter. Sent to all subscribers.', price:25, icon:'mail' }
  ],

  tiers: [
    {
      id:'free', name:'Starter', price:0, comm:0, label:'Free Forever',
      has: ['List up to 3 products','Basic store profile','Standard placement','Discussion board access','Basic view analytics'],
      miss: ['Priority placement','Custom domain','Video uploads','Advanced analytics','Commission-free beyond 3 products']
    },
    {
      id:'pro', name:'Pro Seller', price:15, comm:10, label:'Best for Growing',
      has: ['Unlimited products','Featured search placement','Custom domain support','Advanced analytics dashboard','Priority 24h support','Video content uploads','Seller verification badge','90% payout on sales'],
      miss: ['Dedicated manager','API access','White-label storefront']
    },
    {
      id:'exclusive', name:'Exclusive', price:49, comm:5, label:'For Power Sellers',
      has: ['Everything in Pro','Homepage hero rotation','Dedicated account manager','Full API access','White-label storefront','Monthly newsletter feature','Social media promotion','Early feature access','Custom commission negotiation'],
      miss: []
    }
  ],

  reviews: [
    { id:'r1', pid:'freelancekit', author:'Ali R.', rating:5, text:'Saved me weeks of setup. The proposal templates alone are worth 10x the price. Every Pakistani freelancer needs this toolkit.', date:'2026-06-15' },
    { id:'r2', pid:'freelancekit', author:'Zara K.', rating:4, text:'Great toolkit. Would love to see more Fiverr-specific templates added in future updates.', date:'2026-06-28' },
    { id:'r3', pid:'prompt-bundle', author:'Usman J.', rating:5, text:'Was skeptical about AI prompts but these actually work. My email open rates went up 35% after using these.', date:'2026-07-02' },
    { id:'r4', pid:'mega-pack', author:'Nadia S.', rating:5, text:'1000+ prompts and I use at least 10 daily. Best investment for content creation I have made.', date:'2026-05-20' },
    { id:'r5', pid:'budget-boss', author:'Kamran T.', rating:4, text:'Finally understand where my money goes each month. Simple but powerful tracker.', date:'2026-06-10' },
    { id:'r6', pid:'habit-engine', author:'Maryam A.', rating:5, text:'On day 67 and I have never been this consistent with habits. The streak feature is addictive.', date:'2026-07-01' }
  ],

  discussions: [
    { id:'d1', title:'Best AI tools for Pakistani freelancers in 2026?', author:'Hassan A.', replies:23, views:450, cat:'tools', date:'2026-07-12' },
    { id:'d2', title:'How to price your digital products on Gumroad', author:'Fatima R.', replies:18, views:320, cat:'selling', date:'2026-07-10' },
    { id:'d3', title:'CreatorHub feature requests — what do you want next?', author:'Osama', replies:34, views:680, cat:'platform', date:'2026-07-08' },
    { id:'d4', title:'Success story: Made $500 in my first month on CreatorHub', author:'Ahmed K.', replies:15, views:280, cat:'stories', date:'2026-07-05' },
    { id:'d5', title:'Payment methods for Pakistani buyers — EasyPaisa integration?', author:'Sarah M.', replies:27, views:390, cat:'platform', date:'2026-07-03' }
  ],

  roadmap: [
    { phase:'Now — Q3 2026', title:'Platform Launch', color:'green', items:[
      'Unified marketplace live with all tools & products','Seller profiles & tier system','Product listings with Gumroad integration','Discussion boards & community','Ratings & reviews system','Video content section','Ad slot marketplace','Social login (Google, GitHub, Facebook, Twitter)','Dark/Light theme'
    ]},
    { phase:'Q4 2026', title:'Growth Engine', color:'accent', items:[
      'Custom domain support for sellers','Advanced analytics dashboard','Gumroad API auto-sync','Email newsletter system','Affiliate & referral program','Seller verification system','Automated commission tracking','Payment dashboard'
    ]},
    { phase:'Q1 2027', title:'Global Expansion', color:'amber', items:[
      'Multi-currency support','Local payments (EasyPaisa, JazzCash, UPI, WeChat Pay, Pix)','Multi-language UI','Regional landing pages (PK, IN, CN, EU, AU, US)','Stripe & PayPal direct integration','Escrow payment system','Mobile app (iOS + Android)'
    ]},
    { phase:'Q2 2027', title:'Creator Economy OS', color:'red', items:[
      'White-label storefront builder','Built-in course & membership platform','Creator analytics suite','Community forums per seller','Live streaming for demos','API marketplace for developers','Enterprise accounts','Franchise model for regional partners'
    ]}
  ],

  faq: [
    { q:'How does commission work?', a:'Starter tier: 0% (you keep 100%). Pro: 10% platform fee (you keep 90%). Exclusive: 5% fee. For Gumroad products, we use affiliate tracking. For direct sales (Phase 2), we handle payment processing and automatic commission splits.' },
    { q:'Can I use my own domain?', a:'Yes — Pro and Exclusive sellers get custom domain support. Buy a domain through any registrar, and we provide DNS instructions. Exclusive includes white-label storefront on your domain.' },
    { q:'What payment methods are supported?', a:'Currently Gumroad handles payments for linked products. Phase 2 (Q4 2026) adds Stripe and PayPal. Phase 3 (Q1 2027) adds regional methods: EasyPaisa, JazzCash, UPI, WeChat Pay, and more.' },
    { q:'Do I need to rebuild my websites?', a:'No. Your existing websites keep running as they are. CreatorHub is a discovery layer — it links to your sites and products. Nothing changes on your end.' },
    { q:'Is the free tier really free forever?', a:'Yes. Starter tier has no time limit, no hidden fees, and 0% commission. You can list up to 3 products at no cost, forever.' }
  ]
};
