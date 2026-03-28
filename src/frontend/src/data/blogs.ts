export const CATEGORY_COLORS: Record<string, string> = {
  SEO: "oklch(0.62 0.19 198)",
  "Local SEO": "oklch(0.62 0.19 198)",
  "Technical SEO": "oklch(0.62 0.19 198)",
  "PPC Advertising": "oklch(0.72 0.22 60)",
  "Web Design": "oklch(0.72 0.22 280)",
  "UI/UX Design": "oklch(0.72 0.22 280)",
  "Social Media": "oklch(0.72 0.22 340)",
  "App Development": "oklch(0.62 0.19 142)",
  "Content Marketing": "oklch(0.72 0.22 142)",
  Branding: "oklch(0.72 0.22 265)",
  "Email Marketing": "oklch(0.72 0.22 195)",
  "Lead Generation": "oklch(0.72 0.22 142)",
  "Web Development": "oklch(0.62 0.19 195)",
  "Video Marketing": "oklch(0.72 0.22 45)",
  ORM: "oklch(0.72 0.22 280)",
  CRO: "oklch(0.72 0.22 340)",
  "Digital Marketing": "oklch(0.72 0.22 60)",
};

export type ContentBlock = {
  type: "heading" | "paragraph" | "list";
  text?: string;
  items?: string[];
};

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  gradient: string;
  content: ContentBlock[];
};

export const STATIC_BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "10 SEO Strategies That Will Dominate Google Rankings in 2025",
    excerpt:
      "Discover the latest SEO techniques that top agencies in India are using to rank clients on page one.",
    category: "SEO",
    author: "Ravi Sharma",
    date: "Mar 15, 2025",
    readTime: "7 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.16 195) 0%, oklch(0.28 0.12 220) 100%)",
    content: [
      {
        type: "paragraph",
        text: "SEO in 2025 is no longer just about keywords and backlinks. Google's algorithm has evolved to reward expertise, authoritativeness, and trustworthiness — the E-E-A-T framework. Businesses in India and globally need to adapt their strategies to stay competitive in an era of AI-generated content and voice search.",
      },
      { type: "heading", text: "1. Prioritise E-E-A-T Signals" },
      {
        type: "paragraph",
        text: "Google wants to see real experience behind content. Add author bios, cite sources, link to credible external sites, and showcase case studies. For local Indore businesses, having a well-maintained Google Business Profile with regular posts and reviews amplifies these trust signals dramatically.",
      },
      {
        type: "heading",
        text: "2. Target Long-Tail & Conversational Keywords",
      },
      {
        type: "paragraph",
        text: "Voice search and AI-driven queries favour natural language. Instead of targeting 'SEO agency India', optimise for 'which is the best SEO agency in Indore for small businesses'. Tools like AnswerThePublic and Google Search Console's query data reveal the exact phrases your audience uses.",
      },
      {
        type: "list",
        items: [
          "Use AI tools to map semantic keyword clusters",
          "Optimise for featured snippets with concise 40–60 word answers",
          "Build topic authority through pillar + cluster content architecture",
          "Implement schema markup for FAQs, products, and local business",
          "Improve Core Web Vitals — LCP under 2.5s, CLS under 0.1",
          "Earn backlinks via digital PR and expert commentary",
          "Optimise for Google's SGE (Search Generative Experience)",
          "Update older content regularly to maintain freshness signals",
          "Leverage internal linking to pass authority to deep pages",
          "Monitor GSC for impressions vs clicks — fix low CTR pages",
        ],
      },
      { type: "heading", text: "Why These Strategies Work in India's Market" },
      {
        type: "paragraph",
        text: "India's search landscape is unique — mobile-first, price-sensitive, and hyper-local. Businesses that combine geo-targeted SEO with these modern techniques see compounding organic traffic growth. EDMA has used this exact framework to help clients in Indore and across India triple their organic sessions within 6 months. The window to gain a competitive edge is now.",
      },
    ],
  },
  {
    id: 2,
    title: "Why Local SEO is the Secret Weapon for Indore Businesses",
    excerpt:
      "Businesses in Indore and Madhya Pradesh are leaving money on the table by ignoring local SEO.",
    category: "Local SEO",
    author: "Priya Patel",
    date: "Mar 10, 2025",
    readTime: "6 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.42 0.18 142) 0%, oklch(0.30 0.14 160) 100%)",
    content: [
      {
        type: "paragraph",
        text: "When someone in Indore searches 'digital marketing agency near me', Google's local pack shows three businesses front and centre — above all organic results. If your business isn't in that pack, you're invisible to the majority of high-intent local buyers. Local SEO is the fastest, most cost-effective way to capture this audience.",
      },
      { type: "heading", text: "Optimise Your Google Business Profile" },
      {
        type: "paragraph",
        text: "Your GBP is your local SEO foundation. Complete every field — business category, hours, services, photos, and posts. Businesses with complete profiles receive 7x more clicks than incomplete ones. Add photos of your office in Indore, respond to every review (positive and negative), and post weekly updates to keep your profile fresh.",
      },
      { type: "heading", text: "Build Local Citations and NAP Consistency" },
      {
        type: "paragraph",
        text: "NAP — Name, Address, Phone — must be identical across every directory listing: JustDial, IndiaMart, Sulekha, and your own website. Inconsistencies confuse Google and dilute your local ranking power. Use tools like BrightLocal to audit your citations across 40+ directories simultaneously.",
      },
      {
        type: "list",
        items: [
          "Collect reviews consistently — ask every satisfied client",
          "Use local keywords in page titles: 'Web Design Agency Indore'",
          "Create location-specific landing pages for each service",
          "Build backlinks from Indore-based news sites and directories",
          "Embed Google Maps on your contact page",
        ],
      },
      {
        type: "paragraph",
        text: "Indore is one of the fastest-growing business hubs in central India. The competition for local search visibility is intensifying. Businesses that invest in local SEO today will dominate the local pack for years. EDMA has helped dozens of Indore businesses reach the top three positions for their primary services — the results speak for themselves.",
      },
    ],
  },
  {
    id: 3,
    title: "The Ultimate Guide to Google Ads for Indian SMBs",
    excerpt:
      "Running Google Ads without a strategy burns budget fast. This guide covers keyword bidding, ad copy that converts, and targeting tricks.",
    category: "PPC Advertising",
    author: "Arjun Mehta",
    date: "Mar 5, 2025",
    readTime: "9 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.16 60) 0%, oklch(0.30 0.14 45) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Google Ads can deliver immediate, scalable results — or it can drain your budget with nothing to show for it. The difference is strategy. Small and medium businesses in India often make predictable mistakes: broad match everything, skip negative keywords, and judge success by clicks rather than conversions. This guide fixes all of that.",
      },
      { type: "heading", text: "Keyword Strategy: Intent Over Volume" },
      {
        type: "paragraph",
        text: "High-volume keywords attract window shoppers. High-intent keywords attract buyers. 'Digital marketing' has massive volume but low intent. 'Hire digital marketing agency Indore' has lower volume but buyers are ready to act. Build campaigns around buyer-intent keywords and use phrase or exact match to control spend.",
      },
      { type: "heading", text: "Ad Copy That Earns Clicks" },
      {
        type: "paragraph",
        text: "Your headline must match the searcher's intent precisely. Use numbers, include your USP, and always have a clear CTA. Test at least 3 responsive search ad variations per ad group. Headlines like 'Double Your Leads in 90 Days' or 'Google Ads Experts in Indore' outperform generic copy consistently.",
      },
      {
        type: "list",
        items: [
          "Set up conversion tracking before spending a rupee",
          "Use negative keywords to block irrelevant searches",
          "Enable location targeting to India or specific cities",
          "Set bid adjustments for mobile (often lower CPL)",
          "Review search term reports weekly and add negatives",
          "Test landing pages — never send ads to your homepage",
        ],
      },
      {
        type: "paragraph",
        text: "Elite agencies like EDMA consistently achieve 4–6x ROAS for Indian SMB clients by combining tight keyword targeting with conversion-optimised landing pages. The key insight is that Google Ads is a system — every variable (keywords, bids, ad copy, landing page) must be optimised in concert. Start small, measure relentlessly, and scale what works.",
      },
    ],
  },
  {
    id: 4,
    title: "Web Design Trends That Convert Visitors Into Clients in 2025",
    excerpt:
      "Stunning visuals alone don't sell — design psychology does. Explore the top web design trends maximising conversion rates.",
    category: "Web Design",
    author: "Sneha Joshi",
    date: "Feb 28, 2025",
    readTime: "8 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.18 280) 0%, oklch(0.28 0.14 300) 100%)",
    content: [
      {
        type: "paragraph",
        text: "The websites that generate the most business in 2025 share one trait: they are designed for conversion, not just aesthetics. Beautiful design gets attention, but strategic design — built on user psychology, clear hierarchy, and frictionless flows — converts visitors into paying clients. Here are the trends that actually move the needle.",
      },
      { type: "heading", text: "Dark Mode + High Contrast Colour Palettes" },
      {
        type: "paragraph",
        text: "Dark mode reduces eye strain and creates premium, modern aesthetics that resonate with tech-savvy audiences. Pairing dark backgrounds with vibrant accent colours (cyan, lime, amber) creates visual contrast that guides the eye to your most important CTAs. More than 80% of visitors now prefer dark-mode interfaces for extended browsing sessions.",
      },
      { type: "heading", text: "Micro-Interactions and Purposeful Animation" },
      {
        type: "paragraph",
        text: "Subtle hover effects, loading animations, and scroll-triggered reveals make interfaces feel alive and professional. But animation must serve function — a button that pulses draws attention to your primary CTA. A form that highlights errors clearly reduces frustration and abandonment. Every animation should have a purpose.",
      },
      {
        type: "list",
        items: [
          "Above-the-fold hero sections with single, clear CTAs",
          "Social proof immediately visible without scrolling",
          "Trust signals: certifications, client logos, review counts",
          "Sticky CTAs on mobile that follow the user while scrolling",
          "Fast load times — under 3 seconds on 4G",
          "Whitespace as a design element — reduce cognitive load",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA designs every client website with conversion as the primary metric. We combine the latest visual trends with proven UX patterns to create websites that don't just look impressive — they generate business. If your current website was built more than 2 years ago, a redesign could double your lead volume within 90 days.",
      },
    ],
  },
  {
    id: 5,
    title: "How Social Media Marketing Drives Real Revenue — Not Just Likes",
    excerpt:
      "Real social media marketing ties platform activity directly to revenue. Here's the framework EDMA uses to generate leads.",
    category: "Social Media",
    author: "Ravi Sharma",
    date: "Feb 22, 2025",
    readTime: "7 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.44 0.18 340) 0%, oklch(0.32 0.14 320) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Vanity metrics — likes, followers, reach — are the graveyard of social media marketing budgets. Every rupee spent on social should have a measurable return. The brands that win on social media in 2025 are those that treat every post as part of a revenue-generating system, not a branding exercise.",
      },
      { type: "heading", text: "Build a Content-to-Conversion Funnel" },
      {
        type: "paragraph",
        text: "Awareness content (tips, insights, trending topics) fills the top of the funnel. Engagement content (polls, questions, behind-the-scenes) builds trust in the middle. Conversion content (case studies, offers, testimonials) closes at the bottom. Most brands only post awareness content and wonder why social media 'doesn't work'.",
      },
      { type: "heading", text: "Platform-Specific Strategy" },
      {
        type: "paragraph",
        text: "Instagram Reels drive organic reach at unprecedented scale. LinkedIn generates high-quality B2B leads. Facebook groups build community and retargeting audiences. Twitter/X builds thought leadership. Each platform needs its own content format, tone, and KPIs. Cross-posting identical content to all platforms is a guaranteed way to underperform everywhere.",
      },
      {
        type: "list",
        items: [
          "Define platform-specific KPIs: leads, DMs, link clicks",
          "Invest in Reels and short-form video — highest organic reach",
          "Run retargeting ads to warm social audiences",
          "Use DM automation for lead qualification at scale",
          "Track UTM parameters from social to CRM conversions",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA manages social media for clients across industries in India and internationally. Our best-performing client saw a 320% increase in inbound inquiries within 6 months of switching from likes-focused posting to a revenue-focused framework. The strategy is replicable — and it starts with defining what 'success' actually means for your business.",
      },
    ],
  },
  {
    id: 6,
    title: "Mobile App Development: Native vs Cross-Platform in 2025",
    excerpt:
      "Choosing between React Native, Flutter, and native iOS/Android can define your app's success.",
    category: "App Development",
    author: "Arjun Mehta",
    date: "Feb 18, 2025",
    readTime: "10 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.16 195) 0%, oklch(0.28 0.12 180) 100%)",
    content: [
      {
        type: "paragraph",
        text: "The mobile app development decision — native or cross-platform — is one of the most consequential technical choices a business makes. Get it right and you ship faster, spend less, and reach more users. Get it wrong and you spend twice as much fixing performance issues and maintaining two codebases. Here's the definitive 2025 breakdown.",
      },
      { type: "heading", text: "When to Choose Native (Swift / Kotlin)" },
      {
        type: "paragraph",
        text: "Native development delivers the best performance and deepest platform integration. Choose native when your app relies heavily on device hardware (AR, camera processing, real-time graphics), requires platform-specific UX patterns, or when you have the budget and timeline to support two codebases. Gaming apps and high-performance fintech apps often benefit from native.",
      },
      {
        type: "heading",
        text: "Cross-Platform: Flutter vs React Native in 2025",
      },
      {
        type: "paragraph",
        text: "Flutter now edges out React Native in rendering performance thanks to its custom Impeller engine. React Native's new architecture (JSI + Fabric) has closed the gap significantly. For most business applications — e-commerce, on-demand services, enterprise tools — both deliver 95% of native performance at 60% of the cost. Flutter wins on UI consistency across platforms; React Native wins on web developer familiarity.",
      },
      {
        type: "list",
        items: [
          "Flutter: best for pixel-perfect UI across iOS and Android",
          "React Native: best if your team already knows JavaScript/TypeScript",
          "Both ship 1 codebase to 2 platforms — typically 40-60% cost saving",
          "PWA: consider if budget is tight and offline use isn't critical",
          "Performance gap vs native is now minimal for most use cases",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's mobile development team builds in both Flutter and React Native depending on client requirements. The decision is always made based on use case, team composition, and long-term maintenance cost — never on trend alone. If you're planning a mobile app in 2025, book a free technical consultation to determine the right stack for your specific goals.",
      },
    ],
  },
  {
    id: 7,
    title: "Content Marketing That Ranks: The Agency Blueprint",
    excerpt:
      "Publishing blogs isn't enough — strategic content architecture is. Learn how EDMA builds topic clusters that compound organic traffic.",
    category: "Content Marketing",
    author: "Priya Patel",
    date: "Feb 12, 2025",
    readTime: "8 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.42 0.18 142) 0%, oklch(0.32 0.14 155) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Most companies treat content marketing as a checkbox — publish a blog once a week and hope Google notices. Elite agencies treat it as an asset-building strategy. Every piece of content is engineered to capture a specific search intent, build topical authority, and guide visitors toward conversion. The difference in results is not incremental — it is exponential.",
      },
      { type: "heading", text: "The Pillar + Cluster Architecture" },
      {
        type: "paragraph",
        text: "A pillar page covers a broad topic comprehensively (e.g., 'Complete Guide to SEO in India'). Cluster pages cover specific subtopics in depth (e.g., 'Local SEO for Indore businesses', 'Technical SEO checklist 2025'). All cluster pages link back to the pillar, and the pillar links to each cluster. This architecture signals deep topical expertise to Google and generates powerful internal link equity.",
      },
      { type: "heading", text: "Content That Converts, Not Just Ranks" },
      {
        type: "paragraph",
        text: "Ranking content drives traffic. Converting content drives revenue. The best content does both. Include contextual CTAs within articles (not just banners), embed case studies that demonstrate real results, and create content upgrades (downloadable checklists, templates) that capture email leads. Every blog post should have a conversion goal beyond just organic ranking.",
      },
      {
        type: "list",
        items: [
          "Keyword research first — always validate search demand",
          "Map every piece to a funnel stage (awareness/consideration/decision)",
          "Update older posts every 6-12 months to maintain freshness",
          "Repurpose top-performing blogs into videos, carousels, and infographics",
          "Measure content ROI via organic-to-lead attribution in your CRM",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's content marketing clients see an average of 4x organic traffic growth within 12 months of implementing the pillar-cluster model. The key is consistency and quality — two to three high-quality posts per month outperform ten thin, rushed articles every time. If you're ready to build a content engine that generates compounding returns, let's talk.",
      },
    ],
  },
  {
    id: 8,
    title: "E-Commerce Website Design: 15 Must-Have Features for High Sales",
    excerpt:
      "A beautiful product page means nothing if checkout has friction. This guide covers the 15 non-negotiable features every e-commerce website needs.",
    category: "Web Design",
    author: "Sneha Joshi",
    date: "Feb 8, 2025",
    readTime: "9 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.16 60) 0%, oklch(0.28 0.12 75) 100%)",
    content: [
      {
        type: "paragraph",
        text: "India's e-commerce market is projected to reach $350 billion by 2030. The brands capturing this growth have one thing in common: their websites are engineered for sales, not just product display. From mega-menus to one-click checkout, every design decision on a high-converting e-commerce site is backed by conversion data.",
      },
      { type: "heading", text: "Above the Fold: The First 3 Seconds" },
      {
        type: "paragraph",
        text: "Your homepage hero must communicate three things instantly: what you sell, why you're different, and what to do next. A prominent search bar, trust signals (free shipping, easy returns, secure payment), and a featured product section should all be visible without scrolling. On mobile, this is even more critical — 78% of Indian e-commerce traffic is mobile.",
      },
      { type: "heading", text: "Product Pages That Close" },
      {
        type: "paragraph",
        text: "High-converting product pages include: multiple high-quality images with zoom, a concise benefit-focused description (not just specs), social proof (reviews count and star rating above the fold), clear price and savings, a prominent add-to-cart CTA, and urgency triggers (limited stock, time-limited offers). A/B testing product page layouts consistently yields 15–30% conversion rate improvements.",
      },
      {
        type: "list",
        items: [
          "Guest checkout option — mandatory for reducing cart abandonment",
          "Multiple payment options: UPI, cards, wallets, BNPL",
          "Product filters and sorting for catalogue navigation",
          "Related products and upsell cross-sell modules",
          "Wishlist functionality to recapture intent",
          "Mobile-first responsive design with thumb-friendly CTAs",
          "Fast site speed — every 1 second delay costs 7% conversion rate",
          "Live chat or WhatsApp integration for pre-purchase questions",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA has designed and developed e-commerce websites for brands across India that collectively process crores of rupees in monthly revenue. Every site we build is optimised from homepage to post-purchase confirmation. If your current store is underperforming, a conversion-focused redesign typically pays for itself within 60 days.",
      },
    ],
  },
  {
    id: 9,
    title: "Brand Identity Design: Why Your Logo is Just the Beginning",
    excerpt:
      "Companies spend thousands on a logo and nothing on brand consistency. Discover how a cohesive brand identity builds trust and commands premium pricing.",
    category: "Branding",
    author: "Ravi Sharma",
    date: "Feb 2, 2025",
    readTime: "6 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.18 280) 0%, oklch(0.30 0.14 265) 100%)",
    content: [
      {
        type: "paragraph",
        text: "A logo is a symbol. A brand is a feeling. The most valuable businesses in the world — from Apple to Tata — have brand identities so consistent and intentional that customers can identify them from a single colour, typeface, or tone of voice. Building this level of brand equity is not reserved for enterprises with crore-rupee marketing budgets.",
      },
      { type: "heading", text: "The Five Pillars of a Strong Brand Identity" },
      {
        type: "paragraph",
        text: "Great brand identity is built on five pillars: logo and logo system (primary, secondary, icon variants), colour palette (primary, secondary, neutral, alert colours with WCAG contrast compliance), typography (heading and body fonts with hierarchy rules), imagery style (photography guidelines, illustration style), and voice and tone (how your brand communicates across every touchpoint).",
      },
      { type: "heading", text: "Brand Consistency Across Every Touchpoint" },
      {
        type: "paragraph",
        text: "Your brand must look and feel identical across your website, social media, packaging, business cards, and email signatures. Inconsistency erodes trust. When a potential client sees your Instagram profile, then visits your website, then receives your proposal — every experience must reinforce the same premium, trustworthy brand image. This is achieved through a comprehensive brand style guide.",
      },
      {
        type: "list",
        items: [
          "Define your brand personality: 3-5 adjectives that describe your brand",
          "Create a brand colour palette with dark and light mode variants",
          "Choose 2 typefaces maximum — one display, one body",
          "Document all rules in a brand style guide PDF",
          "Audit all existing touchpoints and update inconsistencies",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's brand identity design service goes far beyond logo creation. We deliver a complete brand system — logo suite, colour palette, typography, imagery guidelines, and a brand style guide — that gives your team everything they need to present a consistent, premium brand to the world. Strong brand identity directly translates to higher pricing power and better customer retention.",
      },
    ],
  },
  {
    id: 10,
    title: "On-Page SEO Checklist: 20 Factors Google Actually Cares About",
    excerpt:
      "Use this 20-point checklist that EDMA's SEO team applies to every client website before a single backlink is built.",
    category: "SEO",
    author: "Arjun Mehta",
    date: "Jan 28, 2025",
    readTime: "11 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.16 195) 0%, oklch(0.26 0.12 210) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Before building a single backlink or creating any new content, every page on your website must be technically sound and on-page optimised. Skipping this foundation is the number one reason businesses spend thousands on SEO and see minimal results. Here is the exact checklist EDMA's SEO team uses as a non-negotiable baseline.",
      },
      { type: "heading", text: "Technical Foundation (Factors 1-8)" },
      {
        type: "list",
        items: [
          "1. HTTPS enabled and no mixed content warnings",
          "2. Canonical tags on all pages to prevent duplicate content",
          "3. XML sitemap submitted to Google Search Console",
          "4. Robots.txt correctly configured — not blocking key pages",
          "5. Page speed: LCP < 2.5s, FID < 100ms, CLS < 0.1",
          "6. Mobile responsive design tested on actual devices",
          "7. No broken internal links (404 errors)",
          "8. Structured data (schema markup) for business, products, FAQs",
        ],
      },
      { type: "heading", text: "Content Optimisation (Factors 9-20)" },
      {
        type: "list",
        items: [
          "9. Primary keyword in title tag (within first 60 characters)",
          "10. Unique meta description with keyword and CTA (150-160 chars)",
          "11. H1 tag present, unique, and contains primary keyword",
          "12. H2/H3 tags used for content hierarchy with secondary keywords",
          "13. Primary keyword appears in first 100 words of content",
          "14. Images have descriptive alt text with relevant keywords",
          "15. Internal links to related pages with descriptive anchor text",
          "16. Content word count appropriate for topic (600+ minimum)",
          "17. Outbound links to authoritative sources",
          "18. URL slug is short, descriptive, and contains keyword",
          "19. Open Graph tags for social media sharing",
          "20. Content freshness — last updated date visible where relevant",
        ],
      },
      {
        type: "paragraph",
        text: "Completing this checklist across your entire website before any off-page activity ensures every rupee spent on link building and content creation is amplified. EDMA's technical SEO audits typically identify 30-50 on-page issues on first review — all of which are fixed before any growth strategy begins. This is the unsexy but essential foundation of sustainable search rankings.",
      },
    ],
  },
  {
    id: 11,
    title: "Progressive Web Apps: The Future of Mobile Experience",
    excerpt:
      "PWAs load instantly, work offline, and convert like native apps — at a fraction of the cost.",
    category: "App Development",
    author: "Priya Patel",
    date: "Jan 22, 2025",
    readTime: "8 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.44 0.18 142) 0%, oklch(0.32 0.14 160) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Progressive Web Apps represent the most significant shift in mobile experience since the app store. PWAs are websites that behave like native apps — installable on home screens, functional offline, push-notification capable, and blazing fast thanks to service worker caching. For Indian businesses, where mobile data costs and device storage matter, PWAs offer a compelling alternative to native apps.",
      },
      { type: "heading", text: "What Makes a PWA Different" },
      {
        type: "paragraph",
        text: "A PWA must meet three criteria: reliability (loads instantly even on 2G via service worker cache), speed (responds quickly to user interactions), and engagement (feels like a native app, can be added to home screen). Technologies enabling this include Service Workers for offline caching, Web App Manifests for installation, and Push API for notifications. Modern browsers on Android and iOS both support full PWA functionality.",
      },
      { type: "heading", text: "PWA vs Native App: The Business Case" },
      {
        type: "paragraph",
        text: "Native apps cost 2-5x more to develop and require users to visit an app store. PWAs are discoverable via Google search, require no installation friction, and are maintained as a single codebase. Twitter Lite (a PWA) saw 65% more pages per session and 75% more Tweets after switching. Flipkart's PWA improved conversions by 70% in India's mobile-first market.",
      },
      {
        type: "list",
        items: [
          "No app store approval delays or 30% platform fees",
          "SEO benefits — PWAs are indexed by Google like websites",
          "Automatic updates — no waiting for users to update the app",
          "Fraction of native app development cost",
          "Works on any device with a modern browser",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA builds production-ready PWAs for businesses ready to deliver a world-class mobile experience without native app complexity. If you currently have a mobile website that users find slow or clunky, a PWA conversion can transform it into an app-like experience within 4-8 weeks. The ROI is typically immediate.",
      },
    ],
  },
  {
    id: 12,
    title: "Email Marketing in 2025: Automation Flows That Actually Convert",
    excerpt:
      "Cold email is dead — strategic email automation is alive. Learn the welcome sequences and re-engagement campaigns that drive 30-40% open rates.",
    category: "Email Marketing",
    author: "Sneha Joshi",
    date: "Jan 18, 2025",
    readTime: "7 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.16 340) 0%, oklch(0.30 0.12 325) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Email delivers ₹4,200 return for every ₹100 spent — the highest ROI of any marketing channel. But generic mass emails are dead. Modern email marketing is about sending the right message to the right person at exactly the right moment in their journey. Automation makes this possible at scale without any manual effort.",
      },
      { type: "heading", text: "The 5 Automation Flows Every Business Needs" },
      {
        type: "list",
        items: [
          "1. Welcome series (3-5 emails): introduce brand, deliver value, make a first offer",
          "2. Lead nurture sequence: educate prospects over 7-14 days toward conversion",
          "3. Cart abandonment (e-commerce): recover 10-15% of abandoned carts",
          "4. Post-purchase: upsell, cross-sell, request reviews, build loyalty",
          "5. Re-engagement: win back inactive subscribers before they churn",
        ],
      },
      { type: "heading", text: "Deliverability: The Hidden Battle" },
      {
        type: "paragraph",
        text: "The best email copy in the world is worthless if it lands in spam. Deliverability requires: authenticated sending domain (SPF, DKIM, DMARC), clean list hygiene (remove bounces and unengaged subscribers regularly), consistent sending volume (don't spike from 100 to 10,000 overnight), and engagement-first sending (prioritise opens and clicks by sending to engaged segments first).",
      },
      {
        type: "list",
        items: [
          "Subject line A/B testing is mandatory — test weekly",
          "Personalise beyond first name: product category, location, behaviour",
          "Segment by engagement level, purchase history, and demographics",
          "Plain text emails often outperform HTML for B2B audiences",
          "Send at optimal times: Tue-Thu 10am-11am for B2B in India",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA builds and manages email automation systems for clients across B2B and B2C sectors. Our best-performing welcome sequences achieve 45%+ open rates and 15%+ click rates — well above industry averages. Email remains the most personal, highest-converting channel available. If you're not using automation, you're leaving significant revenue on the table.",
      },
    ],
  },
  {
    id: 13,
    title: "UI/UX Design Principles That Reduce Bounce Rate Dramatically",
    excerpt:
      "These 8 UI/UX principles have helped EDMA reduce client bounce rates by up to 45%.",
    category: "UI/UX Design",
    author: "Ravi Sharma",
    date: "Jan 14, 2025",
    readTime: "9 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.18 60) 0%, oklch(0.28 0.14 50) 100%)",
    content: [
      {
        type: "paragraph",
        text: "A high bounce rate is one of the most expensive problems a website can have. When 70% of your visitors leave after viewing one page, you're spending money to drive traffic that never converts. The cause is almost always poor UX — confusing navigation, slow load times, unclear value propositions, or friction in the conversion path.",
      },
      { type: "heading", text: "Visual Hierarchy and the F-Pattern" },
      {
        type: "paragraph",
        text: "Eye-tracking studies show users scan web pages in an F-shaped pattern — horizontal movement at the top, then down the left side. Place your most important information (headline, primary CTA, key benefit) in these high-attention zones. Use size, colour, and contrast to create clear hierarchy — your headline should be 2-3x larger than body text, and your CTA should be the most visually distinct element on the page.",
      },
      { type: "heading", text: "Reducing Cognitive Load" },
      {
        type: "paragraph",
        text: "Every decision you ask a user to make adds cognitive load. Reduce options, simplify navigation, and remove anything that doesn't serve the user's primary goal. Hick's Law states that decision time increases logarithmically with the number of options. On a services page, lead with your most important service — don't present 20 equal options and expect the user to choose.",
      },
      {
        type: "list",
        items: [
          "Whitespace is not empty space — it is breathing room that improves comprehension",
          "Font size minimum 16px for body text on mobile",
          "Contrast ratio minimum 4.5:1 for text accessibility",
          "CTA buttons must be at least 44x44px for touch targets",
          "Forms should request minimum fields — every extra field drops completion 10%",
          "Use familiar patterns: hamburger menu, search icon top right, logo top left",
          "Progress indicators for multi-step processes reduce abandonment 20%",
          "Error messages must explain the problem AND the solution",
        ],
      },
      {
        type: "paragraph",
        text: "Applying these principles systematically across a client website is how EDMA has reduced bounce rates by 30-45% without increasing traffic spend. Good UX is the highest-ROI investment in your website. A 10% reduction in bounce rate on a site with 10,000 monthly visitors can mean hundreds of additional leads per month.",
      },
    ],
  },
  {
    id: 14,
    title: "Link Building in 2025: Strategies That Still Work",
    excerpt:
      "This is EDMA's current link-building playbook for building domain authority without risking Google penalties.",
    category: "SEO",
    author: "Arjun Mehta",
    date: "Jan 8, 2025",
    readTime: "10 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.42 0.16 195) 0%, oklch(0.30 0.12 200) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Backlinks remain one of Google's top three ranking factors in 2025, but the landscape has changed dramatically. Private blog networks, paid link schemes, and low-quality directory spam now trigger manual penalties. The agencies still winning at link building have pivoted to editorial link earning — a harder but far more durable strategy.",
      },
      { type: "heading", text: "Digital PR: The Highest-Quality Links" },
      {
        type: "paragraph",
        text: "Digital PR earns links by creating newsworthy content that journalists and bloggers want to reference. Data studies ('We surveyed 500 Indian SMBs about their digital marketing spend'), expert commentary (contributing quotes to industry publications), and original research earn links from high-DA news sites that money cannot buy. A single link from Economic Times or YourStory can move domain authority significantly.",
      },
      { type: "heading", text: "Guest Posting: Still Viable, Done Right" },
      {
        type: "paragraph",
        text: "Guest posting works when you target relevant, high-authority sites and write genuinely valuable content. It fails when you submit spun articles to DA20 link farms. Target sites your ideal customers actually read. Write your best content — better than your own blog. Include a natural author bio link to your service page. One link from a relevant DA50+ site beats 100 links from DA20 spam sites.",
      },
      {
        type: "list",
        items: [
          "HARO/Qwoted: answer journalist queries to earn media coverage links",
          "Broken link building: find broken links on relevant sites and offer your content",
          "Skyscraper technique: create definitively better content than ranking competitors",
          "Unlinked brand mentions: claim links where your brand is mentioned without attribution",
          "Podcast appearances: episode pages typically link to guests' websites",
          "Partnerships and integrations: co-marketing with complementary businesses",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's link building campaigns focus exclusively on white-hat, penalty-proof strategies that build lasting domain authority. Our average client sees a 15-25 point DA increase within 12 months of consistent link building. This authority compounds over time — links earned today will continue generating traffic and ranking power for years. It is the most valuable long-term SEO investment.",
      },
    ],
  },
  {
    id: 15,
    title: "How to Build a Lead Generation Machine With Your Website",
    excerpt:
      "We reveal the landing page architecture, CTA placement strategies, and lead magnet ideas that generate qualified leads on autopilot.",
    category: "Lead Generation",
    author: "Priya Patel",
    date: "Jan 3, 2025",
    readTime: "8 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.44 0.18 142) 0%, oklch(0.34 0.14 150) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Your website should be your best-performing salesperson — available 24/7, never takes a sick day, and can scale to handle any volume of traffic. Most websites are brochures. The ones that generate predictable leads are systems — engineered with specific entry points, nurture mechanisms, and conversion triggers working in concert.",
      },
      { type: "heading", text: "The Lead Generation Architecture" },
      {
        type: "paragraph",
        text: "A high-converting lead generation website has three core components: traffic magnets (SEO-optimised blog posts, landing pages targeting specific buyer intent queries), lead capture mechanisms (forms, chatbots, WhatsApp buttons, free consultation offers), and nurture pathways (email automation, retargeting ads, follow-up sequences). Remove any component and the system breaks.",
      },
      { type: "heading", text: "Lead Magnets That Actually Convert" },
      {
        type: "paragraph",
        text: "Generic 'Subscribe to our newsletter' offers have sub-1% conversion rates. Specific lead magnets — something your ideal client genuinely wants — convert at 5-15%. For a digital marketing agency, high-converting lead magnets include: Free SEO audit (personalised and specific), '10 ways to double your website leads' PDF, Free Google Ads account review, Website speed test with detailed recommendations.",
      },
      {
        type: "list",
        items: [
          "Place CTAs above the fold on every key page",
          "Use exit-intent popups — capture 5-10% of leaving visitors",
          "Chat widgets increase lead capture by 40% on average",
          "Reduce form fields to 3 or fewer for maximum completion",
          "Follow up within 5 minutes of form submission — conversion drops 80% after 30 mins",
          "A/B test CTA copy: 'Get Free Quote' vs 'Book Free Consultation'",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA builds lead generation systems for businesses that are tired of sporadic, unpredictable client acquisition. Our lead generation website builds include CRO-optimised design, integrated email automation, analytics tracking from click to client, and monthly performance reporting. If your website isn't generating at least one qualified lead per day, it's time for a strategic overhaul.",
      },
    ],
  },
  {
    id: 16,
    title: "Instagram Marketing for Indian Brands: What Works in 2025",
    excerpt:
      "Here's the content calendar framework EDMA uses to grow Indian brand accounts by 10K+ followers per quarter organically.",
    category: "Social Media",
    author: "Sneha Joshi",
    date: "Dec 28, 2024",
    readTime: "7 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.18 340) 0%, oklch(0.30 0.14 315) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Instagram has over 230 million users in India — the largest user base outside the US. For consumer brands, service businesses, and personal brands, it remains the highest-potential platform for organic reach in 2025, primarily through Reels. But the brands winning on Instagram understand the algorithm deeply and create content specifically engineered to be distributed.",
      },
      { type: "heading", text: "The Reels-First Strategy" },
      {
        type: "paragraph",
        text: "Instagram's algorithm prioritises Reels over every other content format for discovery. A static post reaches roughly 3-7% of your followers. A well-crafted Reel can reach 10-100x your follower count through the Explore feed and Reels tab. This means Reels is not optional for growth — it is the growth mechanism. Post 4-5 Reels per week minimum for aggressive growth.",
      },
      { type: "heading", text: "Content Mix for Maximum Engagement" },
      {
        type: "paragraph",
        text: "The 4-1-1 content framework works consistently for Indian brands: 4 value posts (tips, how-tos, industry insights), 1 social proof post (client result, testimonial, case study), 1 promotional post (offer, service highlight, CTA). This ratio builds trust and authority while keeping promotional content visible but not overwhelming. Audiences tolerate promotion when they're receiving genuine value.",
      },
      {
        type: "list",
        items: [
          "Hook viewers in the first 1.5 seconds — use text overlays",
          "Use trending audio to increase Reel distribution",
          "Engage with comments within the first hour of posting",
          "Collaborate with complementary brands for Collab posts",
          "Stories for daily engagement — polls, questions, behind-the-scenes",
          "Use 3-5 relevant, mid-size hashtags (100K-2M posts)",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA manages Instagram for clients across fashion, food, services, and tech sectors in India. Our average managed account grows by 8,000-15,000 followers per quarter organically using this framework. Growth is a byproduct of relevance — create content your ideal audience genuinely wants to watch and share, and the algorithm rewards you generously.",
      },
    ],
  },
  {
    id: 17,
    title: "WordPress vs Custom Development: Which Should You Choose?",
    excerpt:
      "We break down when to go custom, when to use WordPress, and how to avoid the costly mistakes most businesses make.",
    category: "Web Development",
    author: "Ravi Sharma",
    date: "Dec 22, 2024",
    readTime: "8 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.16 195) 0%, oklch(0.28 0.12 215) 100%)",
    content: [
      {
        type: "paragraph",
        text: "WordPress powers 43% of the web for good reason — it is flexible, cost-effective, and has a vast plugin ecosystem. But it is not the right choice for every project. The businesses that struggle with their websites either chose WordPress when they needed custom development, or built custom when WordPress would have served them perfectly. This guide ends the confusion.",
      },
      { type: "heading", text: "When WordPress Wins" },
      {
        type: "paragraph",
        text: "WordPress excels for: content-heavy websites (blogs, news sites, portfolios), standard business websites needing a CMS, e-commerce stores up to moderate scale (WooCommerce), and projects with limited budgets requiring fast delivery. WordPress sites can be built in 2-6 weeks at 40-60% of custom development cost. For 80% of business websites, WordPress is the right choice.",
      },
      { type: "heading", text: "When Custom Development is Essential" },
      {
        type: "paragraph",
        text: "Custom development is necessary when: your business logic is unique and doesn't fit any existing plugin, you need integrations with proprietary systems, performance is critical and WordPress's overhead is unacceptable, you're building a SaaS product or web application with complex user flows, or you have specific security requirements that CMS plugins cannot guarantee. Custom costs more upfront but eliminates technical debt.",
      },
      {
        type: "list",
        items: [
          "WordPress: faster to build, easier to manage content, larger talent pool",
          "Custom: better performance, no plugin conflicts, built exactly for your needs",
          "WordPress security requires active plugin management — update everything regularly",
          "Custom development: use modern stacks (React, Next.js, Node.js) for longevity",
          "Both can be SEO-optimised equally effectively",
          "Total cost of ownership over 3 years often favours custom for complex sites",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA builds both WordPress and custom websites depending on client requirements. We never recommend one over the other without understanding your business goals, content management needs, and long-term scalability requirements. The right choice is the one that serves your customers best and grows with your business — we'll help you make that decision with confidence.",
      },
    ],
  },
  {
    id: 18,
    title: "Video Marketing: How Short-Form Content Builds Long-Term Authority",
    excerpt:
      "Discover the video content strategy that positions your brand as an authority and drives inbound leads consistently.",
    category: "Video Marketing",
    author: "Arjun Mehta",
    date: "Dec 16, 2024",
    readTime: "6 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.42 0.18 60) 0%, oklch(0.32 0.14 45) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Video now accounts for 82% of all internet traffic. Brands that have built video libraries on YouTube, Instagram, and LinkedIn have created assets that compound in value — a video posted today can drive leads three years from now. Short-form video (under 90 seconds) is the fastest path to building brand authority in a crowded market.",
      },
      { type: "heading", text: "YouTube: The Long Game" },
      {
        type: "paragraph",
        text: "YouTube is the world's second largest search engine. A well-optimised YouTube channel provides dual benefit: video search traffic from YouTube itself, and a source of embeddable content that increases time-on-site for your website visitors. Long-form tutorials (10-20 minutes) build deep authority. Shorts (under 60 seconds) drive discovery. A combined strategy maximises both reach and depth.",
      },
      { type: "heading", text: "Short-Form Video: Reels, Shorts, and TikTok" },
      {
        type: "paragraph",
        text: "Short-form video follows a simple structure: hook (first 1.5 seconds — bold statement or surprising fact), content (deliver the promised value concisely), and CTA (tell viewers exactly what to do next). For B2B brands, video content that teaches something specific — '3 ways to double your website leads', 'How we ranked a client from page 5 to position 1' — drives significantly higher engagement and lead generation than promotional content.",
      },
      {
        type: "list",
        items: [
          "Batch-record video — film 10 videos in one session to stay consistent",
          "Repurpose long-form into 5-10 short clips per video",
          "Add captions — 80% of videos are watched on mute",
          "Use a consistent visual style (colours, fonts, lower thirds) for brand recognition",
          "Track performance: watch time percentage is the key YouTube metric",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's video marketing service covers strategy, scripting, editing, and distribution across all platforms. Clients who commit to a consistent video strategy for 6+ months invariably see it become their highest-performing lead generation channel. Video builds trust faster than any other medium — and in the service business, trust is the sale.",
      },
    ],
  },
  {
    id: 19,
    title: "Online Reputation Management: Protect and Grow Your Brand",
    excerpt:
      "ORM is not just damage control — it's proactive brand building. Learn the monitoring tools, review generation strategies, and crisis response frameworks.",
    category: "ORM",
    author: "Priya Patel",
    date: "Dec 10, 2024",
    readTime: "7 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.18 280) 0%, oklch(0.30 0.14 265) 100%)",
    content: [
      {
        type: "paragraph",
        text: "93% of consumers read online reviews before making a purchase decision. A single negative review on Google or Justdial, left unresponded to, can cost you 30+ potential customers. Online Reputation Management is not a reactive activity — it's a proactive system for building, protecting, and continuously improving how your brand appears across every digital touchpoint.",
      },
      { type: "heading", text: "Review Generation: The Proactive Approach" },
      {
        type: "paragraph",
        text: "Satisfied customers rarely leave reviews unprompted. Unhappy customers almost always do. The solution is a systematic review generation process: send a personalised follow-up message to every client 3-5 days after project completion, include a direct link to your Google Business Profile review page, and make the process effortless. EDMA clients using this system average 8-12 new reviews per month consistently.",
      },
      { type: "heading", text: "Monitoring Your Brand Across the Web" },
      {
        type: "paragraph",
        text: "You cannot manage what you cannot measure. Set up Google Alerts for your brand name, key personnel names, and product names. Monitor review platforms (Google, JustDial, IndiaMart, Trustpilot) weekly. Track social media mentions using free tools like Brand24 or Mention. Respond to every review — positive and negative — within 24 hours. Speed of response signals that you care about customer experience.",
      },
      {
        type: "list",
        items: [
          "Respond to negative reviews professionally — never defensively",
          "Address the complaint, offer a solution, and invite offline resolution",
          "Publish high-quality content to push down negative search results",
          "Ensure all business listings (NAP) are accurate and consistent",
          "Encourage employee advocacy to build authentic brand sentiment",
        ],
      },
      {
        type: "paragraph",
        text: "A strong online reputation is a competitive moat. Businesses with 4.7+ star ratings and 100+ reviews convert significantly more prospects than competitors with fewer, lower-rated reviews — even when the service quality is identical. EDMA's ORM service builds this moat systematically, transforming your online presence into a powerful trust signal that closes deals before a prospect even contacts you.",
      },
    ],
  },
  {
    id: 20,
    title: "React Native vs Flutter: Which Framework Wins in 2025?",
    excerpt:
      "We compare rendering performance, developer ecosystem, hiring costs, and real-world app examples to help you make the right choice.",
    category: "App Development",
    author: "Sneha Joshi",
    date: "Dec 4, 2024",
    readTime: "10 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.44 0.16 195) 0%, oklch(0.32 0.12 180) 100%)",
    content: [
      {
        type: "paragraph",
        text: "The React Native vs Flutter debate intensified in 2024 when both frameworks shipped major architectural updates. React Native's New Architecture (Fabric + JSI) eliminates the JavaScript bridge bottleneck. Flutter's Impeller rendering engine delivers consistent 60-120fps across devices. In 2025, the performance gap between both frameworks has narrowed to the point where use case and team expertise matter far more than benchmarks.",
      },
      { type: "heading", text: "Performance Benchmark Comparison" },
      {
        type: "paragraph",
        text: "In independent 2024 benchmarks: Flutter consistently renders at 60fps with Impeller enabled, with smoother animations and less jank than React Native on lower-end Android devices. React Native with the New Architecture performs within 5-10% of Flutter for typical business app workloads. Both significantly outperform Ionic and Cordova. For gaming or graphic-intensive apps, Flutter's custom renderer has a clear advantage.",
      },
      { type: "heading", text: "Ecosystem, Hiring, and Long-Term Maintenance" },
      {
        type: "paragraph",
        text: "React Native's ecosystem is vastly larger — tens of thousands of npm packages, massive Stack Overflow community, and a developer pool that includes every JavaScript developer. Flutter's ecosystem has grown rapidly but still has fewer production-ready packages for niche use cases. From a hiring perspective in India, React Native developers are approximately 3x more abundant than Flutter developers, which impacts project cost and maintenance continuity.",
      },
      {
        type: "list",
        items: [
          "Choose Flutter: pixel-perfect UI, animation-heavy apps, Google ecosystem",
          "Choose React Native: existing JS team, web-app-like logic, faster hiring",
          "Both: excellent for e-commerce, on-demand, enterprise, fintech",
          "Avoid both: AR/VR intensive, low-level hardware access — use native",
          "Budget consideration: Flutter and React Native have similar development costs in India",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's mobile team is proficient in both frameworks and makes the recommendation based on your specific app requirements, existing team composition, and long-term support needs. There is no universally correct answer — the best framework is the one your team will ship and maintain most effectively. Book a free technical consultation to get a recommendation tailored to your project.",
      },
    ],
  },
  {
    id: 21,
    title: "Core Web Vitals: The Technical SEO Guide for 2025",
    excerpt:
      "LCP, FID, CLS — Google's Core Web Vitals directly impact your rankings. This technical deep-dive explains the exact fixes to hit the green zone.",
    category: "Technical SEO",
    author: "Ravi Sharma",
    date: "Nov 28, 2024",
    readTime: "12 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.38 0.16 195) 0%, oklch(0.26 0.12 205) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Google's Core Web Vitals became an official ranking factor in 2021, but most websites still fail the assessment in 2025. Poor CWV scores are costing businesses real ranking positions — Google has confirmed that two equally relevant pages will rank differently based on page experience signals. Here's the definitive technical fix guide.",
      },
      {
        type: "heading",
        text: "LCP: Largest Contentful Paint (Target: Under 2.5s)",
      },
      {
        type: "paragraph",
        text: "LCP measures when the largest visible element (usually a hero image or heading) fully loads. Common causes of poor LCP: unoptimised images (use WebP, compress to under 100KB for hero images), no image preloading (add <link rel='preload' fetchpriority='high'> for hero images), render-blocking JavaScript (defer all non-critical scripts), and slow server response (use CDN, upgrade hosting). Fixing LCP alone often improves user perception of speed dramatically.",
      },
      {
        type: "heading",
        text: "CLS: Cumulative Layout Shift (Target: Under 0.1)",
      },
      {
        type: "paragraph",
        text: "CLS measures unexpected layout jumps. The most common cause: images without explicit width and height attributes (the browser doesn't know how much space to reserve). Fix: always define dimensions on all images and embedded content. Other causes: late-loading ads, dynamically injected content above the fold, and web fonts causing text to reflow. CLS is often the easiest CWV to fix completely.",
      },
      {
        type: "list",
        items: [
          "Use Google PageSpeed Insights (mobile score matters most)",
          "Install a caching plugin if on WordPress — WP Rocket or LiteSpeed",
          "Compress and convert all images to WebP format",
          "Use a CDN (Cloudflare free tier handles most SMB needs)",
          "Remove unused CSS and JavaScript — reduces render-blocking resources",
          "Preconnect to third-party domains (fonts, analytics)",
          "Implement lazy loading for below-fold images",
          "Test on real mobile devices — PageSpeed mobile and desktop can differ greatly",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's technical SEO audits include full Core Web Vitals assessment and a prioritised fix list for every client. Most websites can achieve green scores on all three metrics within 2-4 weeks of focused technical work. The ranking improvements that follow are consistent and measurable. If your PageSpeed mobile score is below 70, contact EDMA for a free site speed audit.",
      },
    ],
  },
  {
    id: 22,
    title: "Why Your Business Needs a Mobile-First Website Right Now",
    excerpt:
      "Over 70% of Indian internet users browse on mobile. If your website isn't mobile-first, you're invisible to the majority of your market.",
    category: "Web Design",
    author: "Arjun Mehta",
    date: "Nov 22, 2024",
    readTime: "6 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.42 0.18 142) 0%, oklch(0.32 0.14 158) 100%)",
    content: [
      {
        type: "paragraph",
        text: "India is a mobile-first country. Over 820 million Indians access the internet, and more than 70% of them do so exclusively through smartphones. If your website was designed for desktop and then 'made responsive', you have a desktop website that shrinks for mobile — not a mobile-first experience. The difference in user experience, bounce rate, and conversion rate is significant.",
      },
      { type: "heading", text: "Mobile-First vs Responsive Design" },
      {
        type: "paragraph",
        text: "Responsive design starts with the desktop layout and adapts it for smaller screens. Mobile-first design starts with the smallest screen and progressively enhances for larger screens. The result: mobile-first websites feel native on phones — touch targets are appropriately sized, typography is optimised for reading on small screens, and the most important content is visible without pinching or zooming. Google also uses mobile-first indexing, meaning it crawls and ranks your site based on the mobile version.",
      },
      { type: "heading", text: "Mobile UX Principles That Convert" },
      {
        type: "paragraph",
        text: "Mobile conversion optimisation requires specific design decisions: click-to-call buttons (tap the phone number and it calls automatically), thumb-friendly navigation (keep CTAs within the bottom 60% of the screen), fast load time under 3 seconds on 4G (Indian mobile network speeds are improving but LTE is standard), and minimal form fields (typing on mobile is effortful — fewer fields means more completions).",
      },
      {
        type: "list",
        items: [
          "Test your website on an actual budget Android phone — not just iPhone",
          "Use Google's Mobile-Friendly Test to identify specific issues",
          "Implement AMP for content-heavy pages like blogs",
          "WhatsApp chat integration converts 3-5x better than contact forms on mobile",
          "Sticky 'Call Now' or 'WhatsApp Us' buttons visible on all pages",
        ],
      },
      {
        type: "paragraph",
        text: "Every website EDMA builds in 2025 is designed mobile-first. We prototype on a 375px screen first and enhance from there. The result is websites that feel effortless on the devices your customers actually use. If your current website has a bounce rate above 65% on mobile, a mobile-first redesign is the fastest way to recover that lost traffic and conversion potential.",
      },
    ],
  },
  {
    id: 23,
    title: "LinkedIn B2B Marketing: How to Generate High-Quality Leads",
    excerpt:
      "Learn the organic content strategy, InMail outreach sequences, and targeting configurations that help EDMA clients close B2B deals from LinkedIn.",
    category: "Social Media",
    author: "Priya Patel",
    date: "Nov 16, 2024",
    readTime: "8 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.16 220) 0%, oklch(0.30 0.12 235) 100%)",
    content: [
      {
        type: "paragraph",
        text: "LinkedIn has 100 million users in India and remains the only platform where you can reach C-suite decision makers, department heads, and business owners with precise targeting. For B2B service providers, agencies, consultants, and SaaS companies, LinkedIn is the highest-quality lead generation platform available — when used strategically.",
      },
      { type: "heading", text: "Personal Brand Before Company Page" },
      {
        type: "paragraph",
        text: "Company pages have very limited organic reach on LinkedIn. Founder and executive personal profiles reach 5-10x more people with the same content. For B2B marketing, invest in building your founders' personal brands first. Post thought leadership content (insights, opinions, lessons learned), engage genuinely with your target audience's posts, and build a following of ideal clients before any outreach begins. Trust precedes transaction.",
      },
      { type: "heading", text: "LinkedIn Ads: Precise B2B Targeting" },
      {
        type: "paragraph",
        text: "LinkedIn Ads are expensive (CPCs of ₹500-2000) but the targeting is unmatched. You can target by job title, company size, industry, seniority, and even specific companies (Account-Based Marketing). The most effective B2B ad formats are: Lead Gen Forms (pre-filled with LinkedIn data — converts at 3-4x standard landing pages), Thought Leader Ads (amplify organic posts from executives), and Message Ads (direct InMail to decision makers).",
      },
      {
        type: "list",
        items: [
          "Optimise LinkedIn profile: headline, featured section, and about section first",
          "Post 3x per week minimum — consistency beats virality on LinkedIn",
          "Comment meaningfully on prospects' posts before sending connection requests",
          "Connection request acceptance rate above 30% requires personalised notes",
          "Follow up InMail sequences: 3 touches over 14 days, then stop",
          "Use Sales Navigator for advanced prospecting and lead tracking",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA runs LinkedIn marketing campaigns for B2B clients across IT services, consulting, manufacturing, and professional services sectors. Our best-performing clients generate 20-40 qualified B2B inquiries per month from LinkedIn alone. If your target customers are businesses and you're not on LinkedIn strategically, you are leaving your highest-value leads to competitors.",
      },
    ],
  },
  {
    id: 24,
    title: "Conversion Rate Optimisation: Small Changes, Big Revenue Impact",
    excerpt:
      "CRO isn't guesswork — it's systematic A/B testing, heatmap analysis, and funnel optimisation done right.",
    category: "CRO",
    author: "Sneha Joshi",
    date: "Nov 10, 2024",
    readTime: "9 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.44 0.18 340) 0%, oklch(0.34 0.14 325) 100%)",
    content: [
      {
        type: "paragraph",
        text: "Most businesses focus on getting more traffic to fix poor sales numbers. CRO experts know that doubling conversion rate on existing traffic is cheaper and faster than doubling traffic. If your website converts 1% of visitors and you get 5,000 visitors per month, improving to 2% conversion gives you double the leads without spending an extra rupee on marketing.",
      },
      {
        type: "heading",
        text: "The CRO Framework: Discover, Hypothesise, Test",
      },
      {
        type: "paragraph",
        text: "Effective CRO is a scientific process. Discover: use Google Analytics to find pages with high drop-off rates, Hotjar heatmaps to see where users click and scroll, and session recordings to watch real user behaviour. Hypothesise: form a specific, testable hypothesis ('Changing the CTA from green to orange will increase clicks by 15% because orange creates more urgency'). Test: run A/B tests with sufficient sample sizes (minimum 100 conversions per variant) before declaring winners.",
      },
      { type: "heading", text: "Quick Wins With Immediate Impact" },
      {
        type: "paragraph",
        text: "While running formal A/B tests takes time, several CRO changes reliably improve conversion rates immediately based on extensive research: removing navigation from landing pages (reduces bounce 15-25%), adding social proof near CTAs (testimonials, client count, review stars), reducing form fields from 7 to 3 (typically doubles completion rate), and making the CTA button colour contrast strongly against the page background.",
      },
      {
        type: "list",
        items: [
          "Use Hotjar or Microsoft Clarity (free) to record user sessions",
          "Track micro-conversions: scroll depth, video plays, button hovers",
          "Test page headlines first — highest impact, easiest to test",
          "Mobile and desktop users behave differently — test both separately",
          "One variable per test — multiple simultaneous changes obscure causation",
          "Statistical significance required before declaring a winner (95%+ confidence)",
        ],
      },
      {
        type: "paragraph",
        text: "EDMA's CRO service has delivered measurable conversion improvements ranging from 18% to 340% across client websites in diverse industries. The process is methodical, data-driven, and continuously improving. Conversion optimisation is not a one-time project — it is a permanent competitive advantage for businesses that commit to it. Start with the three highest-traffic pages on your website and work from there.",
      },
    ],
  },
  {
    id: 25,
    title: "How to Choose the Right Digital Marketing Agency in India",
    excerpt:
      "Discover the 10 questions you must ask before hiring a digital marketing agency, the red flags to avoid, and what separates elite agencies from order-takers.",
    category: "Digital Marketing",
    author: "Ravi Sharma",
    date: "Nov 4, 2024",
    readTime: "7 min read",
    gradient:
      "linear-gradient(135deg, oklch(0.40 0.18 60) 0%, oklch(0.30 0.14 50) 100%)",
    content: [
      {
        type: "paragraph",
        text: "India has over 50,000 digital marketing agencies. Most are order-takers — they execute what you ask, bill their hours, and deliver reports that look busy but move nothing. A small number are true growth partners who take ownership of your results and act as an extension of your team. Knowing how to tell them apart before signing a contract can save you lakhs of rupees and months of wasted time.",
      },
      {
        type: "heading",
        text: "10 Questions That Separate Great Agencies From Average Ones",
      },
      {
        type: "list",
        items: [
          "1. Can you show me 3 case studies with specific before/after metrics (not just logos)?",
          "2. Who specifically will be working on my account and what is their experience?",
          "3. How do you measure and report on ROI — not just traffic and impressions?",
          "4. What is your client retention rate over the last 12 months?",
          "5. What happens if results don't meet projections in month 3?",
          "6. Do you have experience in my specific industry?",
          "7. What tools do you use for SEO, analytics, and reporting?",
          "8. How often will we have strategic reviews (not just reports)?",
          "9. What is your process for staying current with algorithm updates?",
          "10. Can I speak to two existing clients as references?",
        ],
      },
      { type: "heading", text: "Red Flags to Walk Away From" },
      {
        type: "paragraph",
        text: "Guaranteed page 1 rankings (no one can guarantee Google rankings), pricing that seems too low to be sustainable (good marketers are expensive because they deliver results), vague deliverables with no measurable KPIs, long-term lock-in contracts with no performance clauses, and inability to explain their strategy in plain language — these are the most common signs of an agency that will cost you far more than their fee.",
      },
      {
        type: "paragraph",
        text: "EDMA was built on the belief that clients deserve transparency, measurable results, and a genuine partnership. We offer clear KPI agreements, monthly strategy reviews, and case studies with real numbers from real clients across India and internationally. If you're evaluating digital marketing agencies, we welcome the tough questions — because we have the answers and the results to back them up.",
      },
    ],
  },
];
