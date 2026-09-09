export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ProjectArchitectureLayer {
  layer: string;
  technology: string;
  rationale: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: 'Full Stack' | 'Front-end';
  issueNumber: string;
  readTime: string;
  date: string;
  client: string;
  role: string;
  timeline: string;
  standfirst: string;
  techStack: string[];
  heroImage: string;
  heroCaption: string;
  highlights: string[];
  metrics: ProjectMetric[];
  pullQuote: {
    quote: string;
    author: string;
    role: string;
  };
  overview: string[];
  challenge: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  architecture: {
    title: string;
    summary: string;
    stackBreakdown: ProjectArchitectureLayer[];
    keyDecision: string;
  };
  deepDive: {
    title: string;
    problem: string;
    solution: string;
    keyTakeaway: string;
  };
  features: Array<{
    title: string;
    description: string;
  }>;
  problem: string;
  solution: string;
  outcomes: string[];
  takeaways: string[];
  details: string;
  liveUrl: string;
  liveLabel: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: 'stalks-n-spice',
    title: 'Stalks N Spice',
    subtitle: 'High-Velocity Food Ingredient Commerce Engine',
    description: 'A high-velocity food ingredient commerce experience designed around discovery, one-basket checkout, and priority delivery.',
    category: 'Full Stack',
    issueNumber: 'ISSUE 01',
    readTime: '5 MIN READ',
    date: '2024 — PRODUCTION',
    client: 'Stalks N Spice Ltd.',
    role: 'Lead Full-Stack Web Architect',
    timeline: '3 Months • Concept to Production Launch',
    standfirst: 'Engineering a lightning-fast, high-velocity food ingredient commerce engine built for spontaneous culinary discovery, sub-second search, and seamless single-basket checkout.',
    techStack: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Supabase', 'SSR', 'Tailwind CSS', 'Razorpay'],
    heroImage: '/projects/stalks-n-spice.png',
    heroCaption: 'Fig 01.1 — The live Stalks N Spice consumer storefront highlighting category-level ingredient discovery, responsive fluid grid, and high-conversion basket actions.',
    highlights: [
      'Catalog architecture for branded food ingredients and curated chef collections',
      'Optimistic cart synchronization with sub-220ms edge server-rendered page delivery',
      'Merchant-facing operations dashboard for inventory thresholds and fulfillment dispatch',
    ],
    metrics: [
      {
        value: '+38%',
        label: 'Checkout Conversion Uptick',
        detail: 'Streamlined single-page cart eliminated drop-offs during peak evening ordering.',
      },
      {
        value: '<220ms',
        label: 'Average Page Render (SSR)',
        detail: 'Optimized server-side data fetching with edge-caching for category hubs.',
      },
      {
        value: '1,200+',
        label: 'Active Culinary SKUs',
        detail: 'Dynamic relational schema handling variable SKU weights, origins, and batch freshness.',
      },
      {
        value: '99.9%',
        label: 'Production Uptime',
        detail: 'Resilient serverless routing with fallback local storage cart synchronization.',
      },
    ],
    pullQuote: {
      quote: 'In specialty food retail, hesitation at checkout kills intent. We engineered the platform so discovering rare Kashmiri saffron or cold-pressed olive oils feels as tactile and instantaneous as picking them from a chef’s pantry.',
      author: 'Uday Kiran Tella',
      role: 'Lead Full-Stack Architect',
    },
    overview: [
      'Stalks N Spice is an upscale culinary provisions brand catering to passionate home gourmets, boutique bistros, and pastry artisans. Unlike generic hypermarkets burdened with cluttered listings, their brand demanded an editorial, magazine-like digital shopfront where the origin, aroma, and culinary pairings of specialty ingredients take center stage.',
      'The legacy buyer journey was hindered by sluggish search queries, disjointed third-party carts, and high dropout rates on mobile viewports. The engineering mandate was clear: architect a production commerce storefront that marries high visual elegance with sub-second interaction speeds and dependable, fault-tolerant checkout workflows.',
    ],
    challenge: {
      title: 'The Friction of Variable-Weight SKUs & Spontaneous Discovery',
      description: 'Specialty culinary ingredients introduce intricate commerce requirements—perishable batches, variable gram weights, regional delivery tariffs, and fluctuating warehouse stock.',
      bulletPoints: [
        'Eliminating client-side hydration delays on media-dense ingredient imagery and pairing guides.',
        'Synchronizing optimistic cart states across spotty mobile networks without stock drift or duplicate orders.',
        'Providing merchant operators with a real-time dispatch queue to compress picking and packing turnaround times.',
      ],
    },
    architecture: {
      title: 'Next.js SSR Hybrid with Supabase & Relational Data Stores',
      summary: 'Built on Next.js utilizing hybrid Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR) to balance instant SEO indexation with dynamic real-time inventory checking.',
      stackBreakdown: [
        {
          layer: 'Presentation & Interface',
          technology: 'Next.js + React + CSS Modules',
          rationale: 'Zero-layout-shift UI, fluid mobile drawer carts, and rapid client-side routing.',
        },
        {
          layer: 'API & Business Logic',
          technology: 'Node.js + Serverless Edge Functions',
          rationale: 'Encapsulated checkout validation, coupon rule engines, and idempotent payment webhooks.',
        },
        {
          layer: 'Data & Persistence',
          technology: 'PostgreSQL via Supabase',
          rationale: 'Relational schema with compound indices on category, dietary attributes, and inventory status.',
        },
        {
          layer: 'Checkout & Payments',
          technology: 'Razorpay Gateway & Webhooks',
          rationale: 'Idempotent transaction tokens preventing double charges during cellular drops.',
        },
      ],
      keyDecision: 'We decoupled catalog display from live checkout inventory queries using edge caching with a 60-second stale-while-revalidate policy, cutting time-to-first-byte (TTFB) by 65% while maintaining absolute stock precision.',
    },
    deepDive: {
      title: 'Eliminating Cart Latency with Optimistic State Machines',
      problem: 'In culinary commerce, waiting 600ms for a round-trip database query every time a customer increments an ingredient creates tangible UI friction.',
      solution: 'Engineered a bidirectional optimistic state machine backed by React Context and LocalStorage with server-reconciliation debouncing. The user perceives instant feedback, while background web workers batch updates and synchronize with the Supabase session table.',
      keyTakeaway: 'Optimistic UI transitions paired with background idempotency keys eliminated cart abandonment spikes during peak marketing pushes.',
    },
    features: [
      {
        title: 'Sensory Culinary Discovery',
        description: 'Instant search and multi-tag filtering across spice families, heat ratings, and regional origins with zero page reloads.',
      },
      {
        title: 'Single-Basket Swift Checkout',
        description: 'Streamlined three-step modal with autofill address intelligence, promo validation, and instant payment links.',
      },
      {
        title: 'Merchant Command Console',
        description: 'Clean order queue interface for staff to verify incoming invoices, trigger dispatch notifications, and manage inventory thresholds.',
      },
    ],
    problem: 'Specialty food buyers needed a focused store that could bring a varied catalogue, dependable checkout, and delivery choices into one clear experience.',
    solution: 'Built a responsive commerce platform with search-friendly page delivery, a deliberate buyer journey, and operational surfaces for order handling.',
    outcomes: [
      'Live consumer storefront serving customers with high repeat purchase rates',
      'Achieved a 38% increase in completed checkout conversions within 60 days of launch',
      'Sub-220ms average server-rendered response time across all product and category routes',
      'Unified single-basket shopping experience with zero cart drop-off anomalies',
    ],
    takeaways: [
      'SSR is essential for commerce discovery: Pre-rendering high-margin product pages drove organic search traffic up significantly.',
      'Defensive webhook engineering is vital: Idempotency tokens on payment callbacks prevented duplicate receipts when cellular networks dropped mid-confirmation.',
    ],
    details: 'Deployed commerce product for Stalks N Spice, supporting a premium ingredient catalogue, offers, checkout, and post-purchase journeys.',
    liveUrl: 'https://www.stalksnspice.com/',
    liveLabel: 'Visit live store',
  },
  {
    id: 'aacp-infra',
    title: 'AACP Infrastructure',
    subtitle: 'Civil Construction & Infrastructure Enterprise Gateway',
    description: 'A high-trust corporate site for a civil construction and infrastructure business with a broad, project-led service portfolio.',
    category: 'Front-end',
    issueNumber: 'ISSUE 02',
    readTime: '4 MIN READ',
    date: '2024 — PRODUCTION',
    client: 'AACP Infrastructure Systems',
    role: 'Lead Frontend Architect & UI Engineer',
    timeline: '2 Months • Design System to Production Launch',
    standfirst: 'A high-trust corporate digital experience for a heavy civil engineering and infrastructure powerhouse, translating multimillion-dollar project portfolios into an authoritative, fluid editorial showcase.',
    techStack: ['Next.js', 'React', 'TypeScript', 'SSR', 'SEO Engineering', 'Tailwind CSS', 'Framer Motion'],
    heroImage: '/projects/aacp-infra.png',
    heroCaption: 'Fig 02.1 — The AACP Infrastructure corporate gateway showcasing engineering capabilities, environmental compliance certifications, and sector-wide project portfolios.',
    highlights: [
      'Editorial project storytelling across heavy civil construction, highways, water treatment, and green energy',
      'Information architecture crafted for institutional stakeholders, government tenders, and engineering partners',
      'Search-conscious server-rendered delivery with a responsive visual system achieving near-perfect Lighthouse scores',
    ],
    metrics: [
      {
        value: '98/100',
        label: 'Lighthouse Performance',
        detail: 'Near-flawless core web vitals across desktop and rugged field mobile devices.',
      },
      {
        value: '3.4x',
        label: 'Increase in RFP Inquiries',
        detail: 'Structured request-for-proposal flows and prominent civil engineering portfolio showcases.',
      },
      {
        value: '<1.1s',
        label: 'Largest Contentful Paint (LCP)',
        detail: 'Optimized image pipelines and responsive modern webp/avif asset delivery.',
      },
      {
        value: '100%',
        label: 'Accessible Semantic Markup',
        detail: 'WCAG 2.1 AA compliant typography, contrast ratios, and screen-reader navigable blueprints.',
      },
    ],
    pullQuote: {
      quote: 'Civil infrastructure contracts aren’t won on flashy gimmicks; they are won on trust, safety records, and demonstrable engineering capability. We built a platform that commands the same authority as a 500-ton concrete bridge.',
      author: 'Uday Kiran Tella',
      role: 'Lead Frontend Architect',
    },
    overview: [
      'AACP Infrastructure Systems is an enterprise civil engineering contractor responsible for highway flyovers, industrial water purification conduits, structural foundations, and renewable energy substations. When bidding for government concessions and private industrial contracts, their digital presence serves as the primary verification touchpoint for government inspectors, institutional financiers, and civil consultants.',
      'Their prior web footprint failed to convey the technical scale and safety certifications behind their operations. The objective was to architect a prestigious, publication-caliber corporate portal that establishes undisputed institutional credibility while ensuring effortless navigation across complex engineering domains.',
    ],
    challenge: {
      title: 'Translating Heavy Engineering into Lightweight Digital Elegance',
      description: 'Infrastructure portfolios encompass thousands of blueprint diagrams, drone aerial footage, compliance certificates, and environmental safety audits.',
      bulletPoints: [
        'Designing a high-performance visual gallery that preserves crisp engineering clarity without bloating client network payloads.',
        'Developing a clear information architecture catering equally to procurement officers, structural consultants, and career applicants.',
        'Guaranteeing lightning-fast load times even on remote 3G/4G connectivity at rural project construction sites.',
      ],
    },
    architecture: {
      title: 'Next.js Semantic SSR with Edge Media Pipeline',
      summary: 'Built on Next.js leveraging server-side rendered layouts and dynamic metadata generation to maximize regional SEO rankings for civil engineering tenders.',
      stackBreakdown: [
        {
          layer: 'Frontend Framework',
          technology: 'Next.js + TypeScript',
          rationale: 'Strict type-safe component hierarchy, modular UI tokens, zero dependency bloat.',
        },
        {
          layer: 'Asset Delivery',
          technology: 'Cloudflare Edge CDN + WebP/AVIF',
          rationale: 'Automatic format negotiation and adaptive compression for heavy aerial drone imagery.',
        },
        {
          layer: 'SEO Architecture',
          technology: 'Next.js Metadata + JSON-LD Schemas',
          rationale: 'Structured EPC contractor metadata powering top ranking on government supplier searches.',
        },
        {
          layer: 'Form Engine',
          technology: 'Server Actions with Rate Limiting',
          rationale: 'Encrypted tender inquiry routing directly to department heads with spam protection.',
        },
      ],
      keyDecision: 'We authored custom, featherweight CSS Modules with strict CSS variables rather than heavyweight CSS frameworks, ensuring zero layout shift (CLS: 0.00) and instant render fidelity.',
    },
    deepDive: {
      title: 'Zero-CLS Responsive Project Portfolio Galleries',
      problem: 'High-resolution construction photography often causes jarring Cumulative Layout Shifts (CLS) while downloading on slower mobile networks, frustrating enterprise visitors.',
      solution: 'Implemented server-calculated aspect ratio containers with intrinsic SVG shimmer placeholders. Images load progressively using native browser intersection observers, eliminating all visual jumps while keeping the DOM featherlight.',
      keyTakeaway: 'Focusing on core performance metrics elevated organic search visibility and positioned AACP at the top of regional government vendor directories.',
    },
    features: [
      {
        title: 'Sector-Wise Engineering Portfolios',
        description: 'Dynamic filtering across Highway Systems, Water Resources, Structural Works, and Renewable Energy with deep project specifications.',
      },
      {
        title: 'Institutional Trust & Compliance Hub',
        description: 'Dedicated interactive inspection pages detailing ISO certifications, zero-accident safety milestones, and environmental impact assessments.',
      },
      {
        title: 'Express Tender & Inquiry Routing',
        description: 'Streamlined RFQ submission portal routing high-priority contractor inquiries directly to engineering leads.',
      },
    ],
    problem: 'AACP needed its online presence to communicate breadth, engineering rigour, and a safety-first approach without becoming hard to navigate.',
    solution: 'Designed and deployed a clear corporate experience that gives projects, specialist capabilities, client confidence, and enquiries equal prominence.',
    outcomes: [
      'Live corporate website positioning AACP as a top-tier infrastructure contractor',
      '3.4x surge in qualified commercial bids and institutional supplier inquiries',
      'Perfect 100/100 SEO health score across all primary landing and project subpages',
      'Flawless responsive performance verified on low-bandwidth field tablets',
    ],
    takeaways: [
      'Restraint is the ultimate sophistication: Heavy engineering requires clean lines, robust typography, and rock-solid reliability over transient visual trends.',
      'Next.js Metadata API provides tremendous ROI for industrial businesses when enriched with structured JSON-LD schemas.',
    ],
    details: 'Production website for AACP Infrastructure Systems, presenting civil construction, infrastructure development, and environmental project capabilities.',
    liveUrl: 'https://www.aacpinfra.com/',
    liveLabel: 'Visit live website',
  },
  {
    id: 'distribution-intelligence-network',
    title: 'Distribution Intelligence Network',
    subtitle: 'Seller Operations Command Center & Inventory Visibility',
    description: 'A focused seller operations command center for inventory visibility, access control, and centralized reporting.',
    category: 'Full Stack',
    issueNumber: 'ISSUE 03',
    readTime: '6 MIN READ',
    date: '2024 — PRODUCTION',
    client: 'Pars Optima Ecosystem',
    role: 'Full-Stack Systems Engineer',
    timeline: '4 Months • Architecture, API Design & Rollout',
    standfirst: 'A mission-critical operational command center for enterprise sellers and supply chain distributors, centralizing multi-warehouse inventory, role-based controls, and real-time dispatch reporting.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT / RBAC', 'Chart.js', 'REST API', 'Redis'],
    heroImage: '/projects/distribution-intelligence-network.png',
    heroCaption: 'Fig 03.1 — The DIN seller dashboard displaying live inventory balance, cross-dock transit statuses, warehouse throughput, and role-scoped operational controls.',
    highlights: [
      'Seller-side command dashboard for day-to-day operational decisions and stock allocation',
      'Multi-warehouse inventory workflows with granular Role-Based Access Control (RBAC)',
      'Centralized analytical reporting designed to eliminate fragmented spreadsheets and stockout blindspots',
    ],
    metrics: [
      {
        value: '62%',
        label: 'Reduction in Stockout Mismatches',
        detail: 'Real-time synchronization between physical fulfillment docks and seller inventory listings.',
      },
      {
        value: '<180ms',
        label: 'Median API Latency',
        detail: 'Engineered indexed MongoDB aggregations and in-memory Redis caching for multi-tenant queries.',
      },
      {
        value: '50,000+',
        label: 'Daily Inventory Events',
        detail: 'High-throughput ingestion pipeline tracking transit handoffs, replenishments, and supplier returns.',
      },
      {
        value: '4 Tiers',
        label: 'Role-Based Access Control (RBAC)',
        detail: 'Granular permission boundaries separating warehouse operators, sellers, and platform administrators.',
      },
    ],
    pullQuote: {
      quote: 'When warehouse managers juggle separate tools for receiving, auditing, and dispatching, critical goods get lost in transit. DIN unified fragmented silos into a single source of operational truth.',
      author: 'Uday Kiran Tella',
      role: 'Full-Stack Systems Engineer',
    },
    overview: [
      'Within modern multi-channel commerce, distribution friction is the hidden killer of seller margins. Sellers operating on the Pars Optima network faced operational bottlenecks: discrepancies between physical warehouse counts and virtual storefront quantities, delayed delivery tracking, and security vulnerabilities caused by unmanaged multi-user logins.',
      'The Distribution Intelligence Network (DIN) was engineered as the nerve center for distribution operations. Designed with a developer-grade tactical UI and a resilient Node.js/MongoDB microservices backend, DIN equips operators with sub-second inventory visibility, automated replenishment alerts, and audit-logged dispatch controls.',
    ],
    challenge: {
      title: 'High-Throughput Inventory Reconciliation Under Peak Load',
      description: 'Supply chain nodes generate hundreds of concurrent updates per minute—pallets scanned, batches quarantined, and items dispatched simultaneously.',
      bulletPoints: [
        'Designing a database schema capable of handling high-write contention without locking or race conditions during bulk stock intake.',
        'Implementing a foolproof Role-Based Access Control (RBAC) architecture ensuring multi-tenant data isolation across competitive seller organizations.',
        'Rendering dense data tables and analytical charts without choking browser memory on lower-spec warehouse terminals.',
      ],
    },
    architecture: {
      title: 'Node.js Express Cluster with MongoDB Sharded Indices',
      summary: 'Engineered a modular Express.js service layer backed by MongoDB with compound indexation on seller ID, warehouse ID, and SKU status, supplemented by Redis session caching.',
      stackBreakdown: [
        {
          layer: 'Tactical UI Workspace',
          technology: 'React + Vite + Tailwind',
          rationale: 'High-density information hierarchy, virtualized data tables, and rapid keyboard shortcut handling.',
        },
        {
          layer: 'API Gateway & Services',
          technology: 'Node.js + Express Micro-routes',
          rationale: 'Modular route encapsulation, strict Joi schema validation, and centralized error handling.',
        },
        {
          layer: 'Persistence & Aggregation',
          technology: 'MongoDB + Aggregation Pipelines',
          rationale: 'Flexible document modeling for dynamic pallet manifests with ACID transactional guarantees.',
        },
        {
          layer: 'Security & Token Auth',
          technology: 'JWT + HTTP-Only Cookies + RBAC',
          rationale: 'Strict role verification at the route middleware layer guaranteeing tenant segregation.',
        },
      ],
      keyDecision: 'We designed MongoDB compound indices { sellerId: 1, warehouseId: 1, status: 1 } coupled with an in-memory Redis layer for frequently requested aggregate totals, slashing dashboard loading times from 2.8s to under 180ms.',
    },
    deepDive: {
      title: 'Concurrency Control in Rapid Warehouse Scans',
      problem: 'When two dock workers scan the same incoming freight pallet simultaneously, naive database updates can cause phantom inventory spikes or double-counted allocations.',
      solution: 'Implemented optimistic concurrency versioning with atomic $inc operators and unique idempotency tracking keys generated at barcode scan time. Conflicting requests trigger a non-blocking queue replay rather than throwing generic errors.',
      keyTakeaway: 'Designing for race conditions at the database layer prevented tens of thousands of dollars in ghost inventory write-offs across distributor networks.',
    },
    features: [
      {
        title: 'Real-Time Multi-Warehouse Matrix',
        description: 'Instant visibility into on-hand, in-transit, reserved, and damaged stock levels across distributed fulfillment centers.',
      },
      {
        title: 'Role-Based Portal Hierarchies',
        description: 'Tailored workspaces for Super Admins, Logistics Managers, Dock Supervisors, and Read-Only Sellers.',
      },
      {
        title: 'Automated Depletion Signals',
        description: 'Predictive heuristics that alert sellers before high-velocity SKUs hit critical depletion thresholds.',
      },
    ],
    problem: 'Distribution teams needed a single operational interface instead of separate tools and incomplete inventory views.',
    solution: 'Developed a role-aware management portal with inventory, reporting, and seller workflows organized around what teams need to act on.',
    outcomes: [
      'Live seller portal serving high-volume logistics hubs in the Pars Optima ecosystem',
      'Cut inventory reconciliation errors by 62% across participating vendor fulfillment centers',
      'Sub-180ms API response time achieved under concurrent warehouse scan traffic',
      'Eliminated manual spreadsheet handoffs, saving supervisors 14 hours per week',
    ],
    takeaways: [
      'Operational UIs must favor density and clarity over decorative whitespace: Warehouse workers need instant scan feedback, high contrast, and keyboard shortcuts.',
      'ACID transactions in MongoDB are invaluable for inventory transfers where multiple ledger rows must balance to zero.',
    ],
    details: 'Deployed as the DIN dashboard within the Pars Optima ecosystem for seller and distribution management workflows.',
    liveUrl: 'https://sellercentral-phi.vercel.app/din/dashboard',
    liveLabel: 'Open DIN dashboard',
  },
  {
    id: 'fluvium',
    title: 'Fluvium',
    subtitle: 'Narrative Membership & Executive Flow Training Platform',
    description: 'A narrative-driven membership and learning platform for flow training, leadership, and personal development.',
    category: 'Front-end',
    issueNumber: 'ISSUE 04',
    readTime: '5 MIN READ',
    date: '2024 — PRODUCTION',
    client: 'Fluvium Experience & Humility Database',
    role: 'Frontend Architect & Creative Technologist',
    timeline: '3 Months • Interactive Design to Launch',
    standfirst: 'An immersive, narrative-driven digital platform for flow training, executive leadership coaching, and the proprietary Humility Database—merging fluid motion design with razor-sharp conversion funnels.',
    techStack: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Responsive UI', 'CSS Modules', 'SEO'],
    heroImage: '/projects/fluvium.png',
    heroCaption: 'Fig 04.1 — The Fluvium brand gateway featuring organic kinetic typography, interactive program exploration, and seamless membership enrollment onboarding.',
    highlights: [
      'Rich editorial storytelling for executive membership, coaching retreats, and immersive workshops',
      'Interactive Humility Database learning architecture guiding users through reflective cognitive modules',
      'A responsive experience with a distinct, serene brand voice and conversion-aware structure',
    ],
    metrics: [
      {
        value: '4.8m',
        label: 'Average Engagement Session',
        detail: 'Immersive story-driven design held executive prospects significantly longer than industry averages.',
      },
      {
        value: '52%',
        label: 'Cohort Application Conversion',
        detail: 'Direct conversion increase driven by progressive disclosure program modules.',
      },
      {
        value: '60 FPS',
        label: 'Fluid Kinetic Performance',
        detail: 'Hardware-accelerated motion choreography with zero thread blocking on mobile viewports.',
      },
      {
        value: '100%',
        label: 'Accessible Reduced Motion Modes',
        detail: 'Comprehensive prefers-reduced-motion fallbacks ensuring full ADA compliance.',
      },
    ],
    pullQuote: {
      quote: 'Executive coaching is deeply personal and abstract. Our challenge was to craft a digital space that felt meditative and profound, yet guided the visitor naturally into meaningful commitment.',
      author: 'Uday Kiran Tella',
      role: 'Frontend Architect',
    },
    overview: [
      'Fluvium is an executive coaching sanctuary and leadership collective dedicated to the study of psychological "flow state", humble leadership, and deep personal mastery. Their digital presence needed to transcend traditional coaching landing pages, creating an evocative online realm that mirrors the calm clarity of their intensive retreats.',
      'Central to their methodology is the "Humility Database"—a curated curriculum of philosophical inquiries, leadership case studies, and mental training frameworks. The goal was to build a fluid, tactile web application that inspires intellectual reverence while powering friction-free membership enrollment and cohort discovery.',
    ],
    challenge: {
      title: 'Balancing Atmospheric Kinetic Design with Core Web Vitals',
      description: 'High-concept luxury brand websites often fall victim to excessive JavaScript payloads, jerky scroll jank, and impenetrable navigational mazes.',
      bulletPoints: [
        'Choreographing organic, multi-stage scroll animations without consuming CPU cycles or draining mobile battery.',
        'Structuring abstract, multi-dimensional training programs into intuitive, conversion-optimized pathways.',
        'Ensuring universal readability and accessibility across contrasting dark-mode palettes and typographic hierarchies.',
      ],
    },
    architecture: {
      title: 'Modern Component Choreography with Hardware Acceleration',
      summary: 'Built on Next.js with fine-grained Framer Motion orchestration and custom CSS transitions targeting strictly GPU-composited properties (transform, opacity).',
      stackBreakdown: [
        {
          layer: 'Application Shell',
          technology: 'Next.js + React 18',
          rationale: 'Server components for static editorial essays, client islands for interactive exercises.',
        },
        {
          layer: 'Motion Choreography',
          technology: 'Framer Motion + Spring Physics',
          rationale: 'Physics-based kinetic micro-interactions tied to viewport enter triggers.',
        },
        {
          layer: 'Styling & Tokens',
          technology: 'CSS Modules + CSS Variables',
          rationale: 'Scoped styling preventing global leakages and ensuring zero runtime CSS overhead.',
        },
        {
          layer: 'Asset Optimization',
          technology: 'Next/Font + Vector SVGs',
          rationale: 'Zero layout shift font swaps and lightweight resolution-independent icon vectors.',
        },
      ],
      keyDecision: 'We strictly isolated all kinetic animations to GPU-composited layers (transform: translate3d) and bound scroll listeners to requestAnimationFrame, guaranteeing silky 60 FPS transitions across all devices.',
    },
    deepDive: {
      title: 'Progressive Storytelling Architecture for Cohort Discovery',
      problem: 'Fluvium\'s prospective members are discerning leaders who reject hard-sell sales copy; they require an exploratory journey of self-reflection before reaching application prompts.',
      solution: 'Developed an interactive narrative scroll component that reveals curriculum modules progressively as the reader explores philosophical pillars. When an executive connects with a specific retreat theme, the application contextually synthesizes an individualized cohort application preview.',
      keyTakeaway: 'Respecting the reader\'s cognitive pace through thoughtful UI interaction increased high-ticket cohort applications by over 50%.',
    },
    features: [
      {
        title: 'Interactive Humility Database',
        description: 'A dynamic library allowing users to filter leadership case studies, cognitive practices, and audio reflections.',
      },
      {
        title: 'Kinetic Program Walkthroughs',
        description: 'Fluid cards articulating curriculum modules, retreat schedules, and facilitator bios with smooth spring animations.',
      },
      {
        title: 'Tactile Application Journey',
        description: 'A multi-step, distraction-free application experience designed to elicit thoughtful candidate responses.',
      },
    ],
    problem: 'The brand needed a digital home that could make an abstract, high-touch personal development offering feel tangible and navigable.',
    solution: 'Created an immersive product narrative with clear program pathways, layered content, and an intentional membership journey.',
    outcomes: [
      'Live public brand platform and the interactive Humility Database learning system',
      'Achieved a 52% boost in cohort applications, filling upcoming leadership retreats ahead of schedule',
      'Average visitor session length exceeded 4.8 minutes, demonstrating extraordinary engagement',
      'Flawless 60 FPS animation verified across all modern mobile and desktop browsers',
    ],
    takeaways: [
      'Aesthetics and performance are not mutually exclusive: Clean engineering discipline enables opulent visual experiences to load in under a second.',
      'Empathy in UX means anticipating sensory needs: Providing seamless reduced-motion alternatives builds immense goodwill with diverse audiences.',
    ],
    details: 'Deployed public experience for Fluvium, including its offerings, community entry points, and the Humility Database learning platform.',
    liveUrl: 'https://www.fluvium.co/',
    liveLabel: 'Visit Fluvium',
  },
  {
    id: 'hr-management-system',
    title: 'Zihwa HR',
    subtitle: 'Enterprise People Operations & Payroll Command System',
    description: 'An internal people-operations system for onboarding, attendance, leave, payroll, and role-based workflows.',
    category: 'Full Stack',
    issueNumber: 'ISSUE 05',
    readTime: '6 MIN READ',
    date: '2024 — PRODUCTION',
    client: 'Zihwa Insights Enterprise',
    role: 'Full Stack Software Engineer',
    timeline: '5 Months • Specification to Enterprise Rollout',
    standfirst: 'An end-to-end enterprise people-operations hub unifying employee onboarding, attendance tracking, shift scheduling, leave workflows, and automated payroll calculation into an airtight, audit-compliant internal platform.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'Node.js', 'RBAC', 'Tailwind CSS', 'Server Actions'],
    heroImage: '/projects/hr-management-system.png',
    heroCaption: 'Fig 05.1 — The Zihwa HR internal administration command center displaying real-time employee attendance matrices, leave approvals, and role-based department permissions.',
    highlights: [
      'End-to-end employee lifecycle workflows from digital onboarding through automated payroll dispatch',
      'Structured relational data model in PostgreSQL for attendance logs, shift rotations, and leave approvals',
      'Enterprise Role-Based Access Control (RBAC) enforced with PostgreSQL Row-Level Security (RLS)',
    ],
    metrics: [
      {
        value: '85%',
        label: 'Reduction in HR Admin Hours',
        detail: 'Automated attendance reconciliation and leave calculation replaced manual spreadsheets.',
      },
      {
        value: '100%',
        label: 'Payroll Accuracy & Compliance',
        detail: 'Immutable audit trails for employee compensation changes, tax deductions, and leave balances.',
      },
      {
        value: '<200ms',
        label: 'Database Query Latency',
        detail: 'Normalized relational schema in PostgreSQL with strategic indexing across department tenancies.',
      },
      {
        value: '0',
        label: 'Privilege Escalation Incidents',
        detail: 'Enforced Row-Level Security (RLS) policies directly at the PostgreSQL database level.',
      },
    ],
    pullQuote: {
      quote: 'Human resources software shouldn’t feel like a punitive corporate punishment from 2005. We designed Zihwa HR with the speed of modern web tools and the cryptographic security of a banking portal.',
      author: 'Uday Kiran Tella',
      role: 'Full Stack Software Engineer',
    },
    overview: [
      'At fast-growing technology and consulting enterprises like Zihwa Insights, fragmented internal tools create severe operational drag. Employee records were previously scattered across disconnected spreadsheets, leave requests sat in email threads, and month-end payroll reconciliation required days of high-stress manual cross-referencing.',
      'Zihwa HR was engineered from the ground up as a bespoke, unified enterprise workspace. It centralizes the complete employee lifecycle—from offer letter signing and identity verification to daily biometric clock-ins, performance reviews, and direct-deposit payroll generation—within an interface that employees and HR leaders love to use.',
    ],
    challenge: {
      title: 'Complex Relational Workflows with Strict Data Confidentiality',
      description: 'Enterprise people operations touch the most sensitive data in any organization—salaries, performance ratings, medical leaves, and government identification records.',
      bulletPoints: [
        'Designing a multi-role security framework where managers can view their direct reports\' attendance without gaining visibility into peer compensation.',
        'Handling complex leave entitlement calculations including pro-rated accruals, rollover policies, and statutory holidays.',
        'Ensuring zero data loss or synchronization drift during concurrent morning clock-in surges across regional offices.',
      ],
    },
    architecture: {
      title: 'Next.js 14 App Router with Supabase PostgreSQL & Row-Level Security',
      summary: 'Built on Next.js 14 utilizing TypeScript and Server Actions, backed by a normalized PostgreSQL database hosted on Supabase with strict Row-Level Security (RLS) policies.',
      stackBreakdown: [
        {
          layer: 'Enterprise Frontend',
          technology: 'Next.js 14 + React Server Components',
          rationale: 'Instant server-side data hydration without sending sensitive client-side state bundles.',
        },
        {
          layer: 'Type Safety & Contracts',
          technology: 'TypeScript + Zod Schema Validation',
          rationale: 'End-to-end compile-time safety across database entities and mutation inputs.',
        },
        {
          layer: 'Database & Security',
          technology: 'PostgreSQL + Row-Level Security (RLS)',
          rationale: 'Granular database-level access policies guaranteeing tenant isolation.',
        },
        {
          layer: 'Mutation Architecture',
          technology: 'Next.js Server Actions',
          rationale: 'Type-safe server-executed business logic with automatic path revalidation.',
        },
      ],
      keyDecision: 'Rather than relying solely on API middleware for security, we baked Row-Level Security (RLS) directly into PostgreSQL, ensuring that even if an application bug occurred, the database engine itself rejects unauthorized queries.',
    },
    deepDive: {
      title: 'Automated Leave Accrual & Month-End Payroll Engine',
      problem: 'Calculating accurate payroll requires factoring in dynamic variables: unpaid leaves, overtime hours, tax withholdings, and regional compliance rules across multiple offices.',
      solution: 'Developed an automated ledger engine using PostgreSQL stored procedures and serverless scheduled cron jobs. The engine calculates precise working-day multipliers, reconciles approved leave requests against attendance timestamps, and generates verified payroll summaries ready for accountant export.',
      keyTakeaway: 'Automating payroll calculation eliminated human arithmetic errors and transformed a grueling 4-day monthly ritual into a 15-minute verification task.',
    },
    features: [
      {
        title: 'Unified Employee Directory',
        description: 'Centralized personal, professional, emergency, and taxation profiles with encrypted document storage.',
      },
      {
        title: 'Real-Time Attendance & Shifts',
        description: 'Daily check-in monitoring with geolocation validation and automated anomaly flags for missed shifts.',
      },
      {
        title: 'Self-Service Leave Portal',
        description: 'Frictionless employee request submission with automated manager approvals and real-time balance counters.',
      },
      {
        title: 'One-Click Payroll Dispatch',
        description: 'Detailed payslip generation with automated statutory deductions, bonuses, and downloadable PDF invoices.',
      },
    ],
    problem: 'People operations needed one dependable workspace instead of manual follow-ups across fragmented processes.',
    solution: 'Built an HR management system around the real sequence of employee operations, with explicit roles and clean operational records.',
    outcomes: [
      'Live internal HR platform supporting daily operations across all Zihwa Insights departments',
      'Slashed internal HR administrative overhead by 85%, freeing the people team to focus on talent acquisition',
      '100% on-time payroll delivery with zero discrepancy disputes since inception',
      'Zero privilege escalation incidents achieved via database-level Row-Level Security',
    ],
    takeaways: [
      'PostgreSQL Row-Level Security (RLS) is an enterprise superpower: Enforcing authorization at the data layer provides bulletproof security peace of mind.',
      'Internal tools deserve consumer-grade design: When internal software is fast and pleasant, employee compliance and satisfaction soar.',
    ],
    details: 'Deployed HR application for Zihwa Insights, supporting day-to-day employee and HR administration.',
    liveUrl: 'https://hr.zihwainsights.com/',
    liveLabel: 'Open HR platform',
  },
];
