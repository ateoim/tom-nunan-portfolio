export type ProjectCategory = 'AI & RAG' | 'Data & BI' | 'Automation' | 'Full-Stack';

export type FilterCategory = 'All' | ProjectCategory;

export type RoleTrackId =
  | 'ai-automation'
  | 'data-bi'
  | 'business-analyst'
  | 'software-engineer';

export interface ArchitectureLayer {
  layer: string;
  detail: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  categories: ProjectCategory[];
  featured: boolean;
  repoUrl?: string;
  isPrivateRepo?: boolean;
  demoUrl?: string;
  screenshotUrl?: string;
  demoTask?: string;
  estimateAssumptions?: string[];
  keyTradeOff?: string;
  verifiedByTests?: string;
  stack: string[];
  problemStatement: string;
  architectureOverview: ArchitectureLayer[];
  engineeringDecisions: string[];
  verifiedCapabilities: string[];
  highlightMetric: string;
}

export interface RoleCapability {
  capability: string;
  evidence: string;
  projectIds: string[];
  modules: string[];
}

export interface RoleTrack {
  id: RoleTrackId;
  label: string;
  shortLabel: string;
  positioning: string;
  coreTools: string[];
  capabilities: RoleCapability[];
}

export interface EngineeringStandard {
  id: string;
  title: string;
  tag: string;
  description: string;
  practice: string;
}

export interface ProfileInfo {
  name: string;
  headline: string;
  subheadline: string;
  location: string;
  degree: string;
  institution: string;
  educationNote: string;
  githubUrl: string;
  githubHandle: string;
  focusAreas: string[];
  resumeSummary: string;
  coreCompetencies: {
    group: string;
    items: string[];
  }[];
}

export const FILTER_CATEGORIES: readonly FilterCategory[] = [
  'All',
  'AI & RAG',
  'Data & BI',
  'Automation',
  'Full-Stack',
] as const;

export const PROFILE: ProfileInfo = {
  name: 'Tom Nunan',
  headline: 'AI Systems, Data Analytics & Full-Stack Software Engineering',
  subheadline:
    'Information Technology graduate (RMIT University, Melbourne) designing deterministic retrieval pipelines, visual workflow engines, SQL-backed BI tooling, and type-safe web applications.',
  location: 'Melbourne, Australia',
  degree: 'Bachelor of Information Technology',
  institution: 'RMIT University',
  educationNote: 'Completed Bachelor of Information Technology coursework — Melbourne, Australia',
  githubUrl: 'https://github.com/ateoim',
  githubHandle: '@ateoim',
  focusAreas: [
    'AI Systems & RAG',
    'Workflow Automation',
    'Business Analysis',
    'Data Analytics & BI',
    'Software Engineering',
  ],
  resumeSummary:
    'Information Technology graduate from RMIT University (Melbourne) focused on bridging analytical problem framing with production-grade software delivery. Builds verifiable, client-and-server TypeScript systems spanning hybrid document retrieval, DAG workflow orchestration, in-browser SQL analytics, and schema-validated full-stack applications.',
  coreCompetencies: [
    {
      group: 'Languages & Runtime',
      items: ['TypeScript (Strict)', 'JavaScript (ES2022)', 'SQL (SQLite / Analytical)', 'HTML5 / CSS3'],
    },
    {
      group: 'AI, Retrieval & Automation',
      items: ['Hybrid RAG (BM25 + TF-IDF + RRF)', 'DAG Topological Orchestration', 'OpenAI API Integration', 'Prompt & Structured Output Pipelines'],
    },
    {
      group: 'Data, Analytics & BI',
      items: ['In-Browser SQLite (WASM)', 'SaaS KPI & Cohort Modelling', 'Percentile & Compensation Analytics', 'Recharts / Interactive Visualisation'],
    },
    {
      group: 'Engineering & Delivery',
      items: ['React & Vite', 'Express & Zod Validation', 'Vitest Unit Testing', 'GitHub Actions CI/CD'],
    },
  ],
};

export const PROJECTS: readonly Project[] = [
  {
    id: 'modelscope-intel',
    name: 'ModelScope',
    tagline: 'AI Model Intelligence, Live Pricing & 16 GB GPU Hardware Fit Calculator',
    summary:
      'Full-stack decision terminal comparing proprietary and open-weight LLMs across live OpenRouter/Hugging Face feeds, Pareto intelligence-per-dollar frontiers, GQA-aware VRAM/KV-cache quantisation estimates, and monthly workload TCO.',
    categories: ['AI & RAG', 'Data & BI', 'Full-Stack'],
    featured: true,
    isPrivateRepo: true,
    demoUrl: 'https://tom-modelscope-demo.netlify.app/',
    screenshotUrl: './screenshots/modelscope.png',
    demoTask:
      'First demo task: Open "Local VRAM Fit", select NVIDIA RTX 4060 Ti 16GB, choose Q4_K_M at 8K–16K context, and compare which open-weight models fit comfortably vs require CPU offload.',
    estimateAssumptions: [
      'Weights (GB) = totalParamsB × bytesPerParam (FP16 = 2.0, Q8_0 = 1.06, Q4_K_M = 0.58, IQ2_XXS = 0.31).',
      'FP16 GQA KV-cache (GB) = 2 × layers × kvHeads × headDim × contextLength × batchSize × 2 bytes / 1e9.',
      'Runtime & activation overhead = 12% of (Weights + KV) + 0.5 GB baseline.',
      'Discrete 16 GB VRAM is 100% addressable (≤85% Fits Comfortably, ≤100% Tight Fit); Apple unified memory reserves 20% for macOS.',
      'Decode speed (tok/s) is estimated from memory bandwidth divided by active quantised weights.',
    ],
    keyTradeOff:
      'Decode throughput (tok/s) uses an analytical memory-bandwidth model rather than live GPU kernel profiling, trading hardware-specific benchmark variance for instant, zero-GPU browser estimates across 9 quantisations and 11 hardware presets.',
    verifiedByTests:
      '10/10 Vitest unit & Express/SQLite integration tests (tests/modelscope.test.ts) verified monotonic weight drops (FP16 > Q8_0 > Q4_K_M), linear GQA KV-cache scaling, exceeds-memory flagging for 72B FP16 on 16 GB VRAM, Pareto non-dominance filtering, prompt-cache TCO savings, and SQLite watchlist/alert CRUD; live Netlify deployment verified HTTP 200, 0px desktop/mobile overflow, and watchlist persistence surviving a fresh server restart via Netlify Blobs.',
    stack: ['TypeScript', 'React 19', 'Express', 'Node 24 SQLite', 'Recharts', 'OpenRouter API', 'Vitest'],
    highlightMetric: '16 GB GPU Fit · Live OpenRouter Sync · 10/10 Tests',
    problemStatement:
      'Teams evaluating local vs API LLMs juggle fragmented pricing sheets, benchmark tables, and rough VRAM guesses. ModelScope unifies live OpenRouter/Hugging Face feeds, Pareto cost-vs-intelligence dominance, and transparent GQA-aware hardware math in one tool.',
    architectureOverview: [
      {
        layer: 'Zero-Key Live Data Aggregation',
        detail:
          'Syncs live model pricing and context windows from OpenRouter (/api/v1/models) and open-weight downloads from Hugging Face, tagging every metric with explicit data provenance (live-api, measured-benchmark, calculated-estimate).',
      },
      {
        layer: 'VRAM Physics, Pareto & TCO Engine',
        detail:
          'Computes weight memory across 9 quantisations (FP16 to IQ2_XXS), GQA-aware KV-cache scaling, bandwidth-derived tok/s, O(N log N) Pareto frontiers, and AUD/USD workload TCO.',
      },
      {
        layer: 'Persistent Watchlists & Alert Rules',
        detail:
          'Stores user watchlists, hardware profiles, and price/score alert rules in Node 24 SQLite backed by Netlify Blobs snapshots across restarts.',
      },
    ],
    engineeringDecisions: [
      'Modelled Grouped-Query Attention (GQA) KV-cache memory explicitly so 70B+ Llama/Qwen/DeepSeek footprints are not overestimated by naive MHA formulas.',
      'Separated live API metrics, measured benchmarks, and calculated estimates with explicit UI provenance badges.',
      'Generated copy-ready Ollama, vLLM, and LiteLLM router configurations directly from workload TCO selections.',
    ],
    verifiedCapabilities: [
      '16 GB GPU hardware fit comparison across Q4_K_M / Q8_0 / FP16 with transparent memory breakdown',
      'Live OpenRouter & Hugging Face catalog sync with USD/AUD pricing toggle',
      'Interactive Pareto intelligence-vs-cost scatter plot and capability progression timeline',
      '10 automated Vitest physics & API tests plus verified restart persistence on Netlify Server',
    ],
  },
  {
    id: 'signal-intelligence',
    name: 'Signal',
    tagline: 'Personal Intelligence & Research-to-Execution Engine',
    summary:
      'Full-stack intelligence workspace backed by Node 24 SQLite + FTS5 that imports X/Twitter archives, browser bookmarks, and live URLs into a deduplicated knowledge graph, scores commercial opportunities, and generates executable engineering blueprints.',
    categories: ['AI & RAG', 'Automation', 'Full-Stack'],
    featured: true,
    isPrivateRepo: true,
    demoUrl: 'https://tom-signal-demo.netlify.app/',
    screenshotUrl: './screenshots/signal.png',
    demoTask:
      'First demo task: Click "Launch Sample Walkthrough (No Sign-In)" to explore 10 pre-loaded discoveries, open the Knowledge Graph, and test SHA-256 deduplication with the built-in sample X archive in Import Studio.',
    keyTradeOff:
      'Uses Node 24 native node:sqlite + FTS5 checkpointed to Netlify Blobs instead of a managed Postgres + pgvector cluster, keeping hosting at $0/month with zero C++ build dependencies while scoping write concurrency to single-instance low-volume traffic.',
    verifiedByTests:
      '19/19 Vitest unit & Supertest/SQLite integration tests (tests/signal.test.ts) verified URL canonicalization, SHA-256 duplicate rejection (409 / duplicatesSkipped), SSRF blocking (localhost, 127.0.0.1, 169.254.169.254, RFC1918), official X window.YTD.like.part0 and Netscape HTML bookmark parsing, TF-IDF cosine ranking, deterministic blueprint generation, and scrypt cookie auth; live Netlify deployment verified HTTP 200, 0px desktop/mobile overflow, and saved item survival across a fresh server restart.',
    stack: ['TypeScript', 'React 19', 'Express', 'Node 24 SQLite', 'FTS5', 'Netlify Blobs', 'Vitest'],
    highlightMetric: '1-Click Sample Demo · SQLite FTS5 · 19/19 Tests',
    problemStatement:
      'Developers and founders save hundreds of X threads, GitHub repositories, and articles that turn into an unsearchable bookmark graveyard. Signal converts saved links into a deduplicated knowledge graph with transparent 4-factor opportunity scores and copy-ready build specifications.',
    architectureOverview: [
      {
        layer: 'Multi-Source Ingestion & SSRF Guard',
        detail:
          'Parses official X/Twitter archive exports, Netscape HTML browser bookmarks, Markdown documents, and SSRF-protected live GitHub/Reddit/web URLs with SHA-256 content deduplication.',
      },
      {
        layer: 'Persistent SQLite + FTS5 & Blobs Durability',
        detail:
          'Runs Node 24 native node:sqlite with FTS5 full-text search and TF-IDF cosine hybrid ranking, hydrated and checkpointed to Netlify Blobs so saved records survive server restarts.',
      },
      {
        layer: 'Knowledge Graph & Execution Studio',
        detail:
          'Computes weighted entity/semantic graph edges, 4-factor opportunity scores, personalised daily briefings, and structured markdown specifications for coding execution.',
      },
    ],
    engineeringDecisions: [
      'Used Node 24 built-in node:sqlite + FTS5 with Netlify Blobs snapshot checkpoints for durable full-stack persistence without paid database overhead.',
      'Implemented strict SSRF validation blocking loopback, RFC1918, and link-local cloud metadata targets prior to server-side URL fetching.',
      'Protected user workspaces with salted scrypt password hashing and HMAC-SHA256 HTTP-only session cookies alongside a 1-click synthetic sample walkthrough.',
    ],
    verifiedCapabilities: [
      'Zero-friction 1-click sample walkthrough with 10 pre-loaded discoveries (no sign-in or personal upload)',
      'Live X/Twitter archive & Netscape bookmark parsing with SHA-256 duplicate skipping',
      'Hybrid SQLite FTS5 + TF-IDF cosine search and Cmd/Ctrl+K command palette',
      '19 automated Vitest unit & Express/SQLite integration tests plus verified restart persistence',
    ],
  },
  {
    id: 'docintel-rag',
    name: 'DocIntel',
    tagline: 'Hybrid BM25 + TF-IDF Cosine + RRF Document Intelligence Platform',
    summary:
      'Client-side retrieval-augmented generation workbench supporting PDF and Markdown ingestion, hybrid lexical-vector ranking via Reciprocal Rank Fusion, and verifiable inline passage citations.',
    categories: ['AI & RAG', 'Full-Stack'],
    featured: true,
    repoUrl: 'https://github.com/ateoim/docintel-rag',
    demoUrl: 'https://ateoim.github.io/docintel-rag/',
    stack: ['TypeScript', 'React', 'Vite', 'BM25', 'TF-IDF Cosine', 'RRF', 'PDF.js', 'Vitest'],
    highlightMetric: 'Hybrid BM25 + Cosine + RRF with inline citations',
    problemStatement:
      'Pure keyword search misses semantic phrasing while opaque vector-only pipelines make it difficult to audit why a passage was retrieved. DocIntel provides a transparent, inspectable retrieval pipeline where every answer links directly back to scored source passages.',
    architectureOverview: [
      {
        layer: 'Ingestion & Chunking',
        detail:
          'Parses PDF and Markdown documents into normalized sections with configurable sliding-window chunking and overlap metadata.',
      },
      {
        layer: 'Dual Retrieval Index',
        detail:
          'Maintains parallel BM25 lexical scoring and TF-IDF cosine similarity indexes so exact terminology and broader topical overlap both surface.',
      },
      {
        layer: 'Fusion & Grounded Synthesis',
        detail:
          'Combines ranked candidate lists via Reciprocal Rank Fusion (RRF) and attaches passage-level inline citation anchors to generated responses.',
      },
    ],
    engineeringDecisions: [
      'Used Reciprocal Rank Fusion (k = 60) instead of raw score averaging to avoid calibration drift between unbounded BM25 scores and bounded cosine similarity.',
      'Executed indexing and ranking deterministically in TypeScript so retrieval behaviour can be unit-tested without external vector database flakiness.',
      'Structured chunk metadata (source document, page/section, character offsets) as first-class types to guarantee traceable inline citations.',
    ],
    verifiedCapabilities: [
      'Multi-document PDF and Markdown ingestion with live chunk inspection',
      'Side-by-side visibility into BM25, TF-IDF cosine, and fused RRF scores',
      'Inline passage citations with direct source highlighting',
      'Automated Vitest unit tests covering tokenization, scoring, and rank fusion',
    ],
  },
  {
    id: 'au-tech-market-intel',
    name: 'PulseAU',
    tagline: 'Australian Tech Job Market & Compensation Analytics Platform',
    summary:
      'Interactive analytics platform examining Australian software, data, and AI roles with AUD compensation percentiles, a 12% Superannuation toggle, city cost-of-living normalisation, and a skills-gap analyser.',
    categories: ['Data & BI'],
    featured: true,
    repoUrl: 'https://github.com/ateoim/au-tech-market-intel',
    demoUrl: 'https://ateoim.github.io/au-tech-market-intel/',
    stack: ['TypeScript', 'React', 'Vite', 'Recharts', 'Tailwind CSS', 'Vitest'],
    highlightMetric: 'AUD P25/P50/P75 percentiles + 12% Super & COL modelling',
    problemStatement:
      'Australian tech salary benchmarks are frequently distorted by US-centric figures, inconsistent inclusion of superannuation, and unadjusted interstate living costs. PulseAU models local market dynamics cleanly for candidates and hiring teams.',
    architectureOverview: [
      {
        layer: 'Structured Market Dataset',
        detail:
          'Typed Australian role, seniority, city, and skill taxonomy covering Melbourne, Sydney, Brisbane, Perth, Adelaide, and Canberra.',
      },
      {
        layer: 'Compensation Calculation Engine',
        detail:
          'Pure analytical functions computing P25/P50/P75 percentiles, base vs. total package (12% Superannuation), and city COL-adjusted purchasing power.',
      },
      {
        layer: 'Skills-Gap & Interactive Views',
        detail:
          'Compares a user-selected skill profile against target role requirements to surface high-leverage gaps and role-fit scores.',
      },
    ],
    engineeringDecisions: [
      'Isolated all percentile, superannuation, and COL-adjustment maths into pure, side-effect-free TypeScript modules for deterministic Vitest verification.',
      'Made the 12% Superannuation toggle a global reactive state so every chart, table, and city comparison recalculates consistently.',
      'Designed the skills-gap analyser around explicit weighted role profiles rather than opaque heuristics.',
    ],
    verifiedCapabilities: [
      'AUD compensation distributions (P25, median, P75) across roles and seniority tiers',
      'One-click Base Salary vs. Total Package (+12% Super) recalculation',
      'Interstate cost-of-living index comparisons across major Australian capitals',
      'Interactive skills-gap diagnostic mapping current skills against target roles',
    ],
  },
  {
    id: 'flowforge-ai-studio',
    name: 'FlowForge',
    tagline: 'Visual DAG-Based AI Workflow Automation Studio',
    summary:
      'Node-based workflow execution studio implementing Kahn’s topological sort, cycle detection, conditional branching, configurable retry policies, and step-by-step payload diffing.',
    categories: ['Automation', 'AI & RAG'],
    featured: true,
    repoUrl: 'https://github.com/ateoim/flowforge-ai-studio',
    demoUrl: 'https://ateoim.github.io/flowforge-ai-studio/',
    stack: ['TypeScript', 'React', 'Vite', 'DAG Engine', 'Tailwind CSS', 'Vitest'],
    highlightMetric: "Kahn's topological sort, cycle detection & payload diffs",
    problemStatement:
      'Multi-step AI and automation pipelines fail silently when execution order, branching conditions, and intermediate state mutations are hidden inside monolithic scripts. FlowForge makes graph execution explicit, inspectable, and deterministic.',
    architectureOverview: [
      {
        layer: 'Graph Validation & Scheduling',
        detail:
          "Validates node connections and computes deterministic execution stages using Kahn's topological sorting algorithm with explicit cycle detection.",
      },
      {
        layer: 'Execution Runtime & Fault Handling',
        detail:
          'Evaluates conditional routing predicates, handles node-level retry policies with backoff semantics, and captures structured execution traces.',
      },
      {
        layer: 'Visual Canvas & Payload Inspector',
        detail:
          'Renders the interactive workflow graph alongside a step-level JSON payload diff viewer showing exact input-to-output transformations.',
      },
    ],
    engineeringDecisions: [
      "Implemented Kahn's algorithm directly in a standalone graph engine module so cyclic graphs are rejected before execution begins.",
      'Modelled node inputs, outputs, and routing outcomes as immutable run snapshots, enabling reliable before/after payload diffing.',
      'Decoupled the execution engine from React rendering state so complex branching and retry scenarios run cleanly in Node-based Vitest suites.',
    ],
    verifiedCapabilities: [
      "Deterministic DAG execution via Kahn's topological sort with cycle rejection",
      'Conditional routing across branching workflow paths',
      'Configurable per-node retry handling and failure state capture',
      'Step-by-step payload diffing for debugging intermediate transformations',
    ],
  },
  {
    id: 'meridian-bi-platform',
    name: 'Meridian BI',
    tagline: 'In-Browser SQLite (WASM) Business Intelligence Platform',
    summary:
      'SQL-backed SaaS analytics platform executing real relational queries in the browser via SQLite WebAssembly, complete with executive KPI scorecards, cohort retention matrices, and a live SQL workbench.',
    categories: ['Data & BI', 'Full-Stack'],
    featured: true,
    repoUrl: 'https://github.com/ateoim/meridian-bi-platform',
    demoUrl: 'https://ateoim.github.io/meridian-bi-platform/',
    stack: ['TypeScript', 'React', 'SQLite (WASM)', 'SQL', 'Recharts', 'Vite', 'Vitest'],
    highlightMetric: 'Live in-browser SQLite WASM + cohort retention & SQL workbench',
    problemStatement:
      'Static dashboard mockups cannot demonstrate real relational modelling or ad-hoc analytical querying. Meridian BI embeds a real SQLite engine in WebAssembly so every KPI, cohort table, and custom query executes against normalized relational tables.',
    architectureOverview: [
      {
        layer: 'Relational Schema & Seed Layer',
        detail:
          'Initializes normalized SaaS tables (accounts, subscriptions, invoices, usage events) inside an in-browser SQLite WASM instance.',
      },
      {
        layer: 'Analytical Query Layer',
        detail:
          'Computes MRR/ARR movements, net revenue retention, churn, and monthly cohort retention matrices via composable SQL queries.',
      },
      {
        layer: 'Executive Views & SQL Workbench',
        detail:
          'Pairs curated executive dashboards with an interactive SQL editor featuring schema inspection, preset queries, and tabular result export.',
      },
    ],
    engineeringDecisions: [
      'Backed every executive metric with inspectable SQL rather than pre-baked JavaScript arrays so analysts can verify exact metric definitions.',
      'Enforced read-only query guards and clear error surfacing in the SQL workbench to keep exploratory analysis safe and responsive.',
      'Separated SQL query builders from UI charting components to support automated testing of metric calculations.',
    ],
    verifiedCapabilities: [
      'Real relational SQL execution in-browser via SQLite WebAssembly',
      'Executive SaaS KPI dashboards (MRR, ARR, churn, retention, expansion)',
      'Cohort retention heatmaps generated directly from relational subscription data',
      'Interactive SQL workbench with schema browser and runnable analytical presets',
    ],
  },
  {
    id: 'autogate',
    name: 'Autogate',
    tagline: 'Full-Stack TypeScript Application with Express, Radix UI & Zod',
    summary:
      'End-to-end TypeScript web application pairing an Express backend with a React, Radix UI, and Recharts frontend, unified by shared Zod runtime validation schemas.',
    categories: ['Full-Stack'],
    featured: false,
    repoUrl: 'https://github.com/ateoim/Autogate',
    stack: ['TypeScript', 'React', 'Express', 'Radix UI', 'Zod', 'Recharts'],
    highlightMetric: 'Shared Zod contracts across React + Express',
    problemStatement:
      'Full-stack web applications accumulate subtle integration bugs when frontend forms, API payloads, and server handlers drift out of sync. Autogate establishes a single source of truth for request/response validation and accessible UI primitives.',
    architectureOverview: [
      {
        layer: 'Shared Validation Contracts',
        detail:
          'Defines domain schemas with Zod so API inputs and client-side forms validate against identical type-inferred rules.',
      },
      {
        layer: 'Express API Layer',
        detail:
          'Structured REST endpoints with middleware-level schema validation and typed error responses.',
      },
      {
        layer: 'Accessible Client Interface',
        detail:
          'Built with React, Radix UI accessible primitives, and Recharts visualisations for structured data views.',
      },
    ],
    engineeringDecisions: [
      'Adopted Zod schemas as the boundary contract between Express routes and React forms to eliminate duplicate validation logic.',
      'Selected Radix UI headless primitives to ensure keyboard navigation, focus management, and ARIA semantics out of the box.',
      'Integrated Recharts for lightweight, responsive operational visualisations within a cohesive component library.',
    ],
    verifiedCapabilities: [
      'End-to-end TypeScript architecture across Express server and React client',
      'Runtime payload validation with Zod schema inference',
      'Accessible interactive controls built on Radix UI primitives',
      'Structured analytical views rendered with Recharts',
    ],
  },
  {
    id: 'character-planner',
    name: 'Character Planner',
    tagline: 'Interactive OpenAI-Integrated React & Audio Web Application',
    summary:
      'Interactive TypeScript and React web application combining OpenAI API integration with structured client-side state management and browser audio playback.',
    categories: ['AI & RAG', 'Full-Stack'],
    featured: false,
    repoUrl: 'https://github.com/ateoim/Character-Planner',
    demoUrl: 'https://ateoim.github.io/Character-Planner',
    stack: ['TypeScript', 'React', 'OpenAI API', 'Web Audio', 'Client State'],
    highlightMetric: 'OpenAI API workflows with client-side audio & state',
    problemStatement:
      'Interactive AI-assisted creative tools require responsive local state, clean API orchestration, and multimedia feedback without sluggish page reloads. Character Planner demonstrates structured prompt workflows paired with rich browser interactivity.',
    architectureOverview: [
      {
        layer: 'Prompt & API Integration',
        detail:
          'Manages structured OpenAI API requests, response parsing, and graceful loading/error states from the client.',
      },
      {
        layer: 'Client State Management',
        detail:
          'Coordinates character attributes, iterative edits, and persistent session state cleanly in TypeScript.',
      },
      {
        layer: 'Interactive Audio & UI',
        detail:
          'Integrates client-side audio controls alongside a responsive React interface deployed statically to GitHub Pages.',
      },
    ],
    engineeringDecisions: [
      'Structured API calls behind typed service helpers to isolate prompt formatting and error handling from UI components.',
      'Kept session state deterministic and serializable so user configurations remain predictable across interactions.',
      'Built as a zero-backend static deployment suitable for immediate browser testing via GitHub Pages.',
    ],
    verifiedCapabilities: [
      'OpenAI API integration with typed request/response handling',
      'Client-side audio playback and interactive UI state transitions',
      'Clean TypeScript & React component architecture',
      'Live static deployment on GitHub Pages',
    ],
  },
];

export const ROLE_TRACKS: readonly RoleTrack[] = [
  {
    id: 'ai-automation',
    label: 'AI & Automation Engineer',
    shortLabel: 'AI & Automation',
    positioning:
      'Designing deterministic retrieval pipelines, inspectable workflow graphs, and structured LLM integrations with verifiable outputs.',
    coreTools: ['Hybrid RAG (BM25 + TF-IDF + RRF)', "Kahn's DAG Sort", 'OpenAI API', 'TypeScript', 'Vitest'],
    capabilities: [
      {
        capability: 'Hybrid Retrieval & Grounded Citations',
        evidence:
          'Implemented BM25 lexical scoring, TF-IDF cosine similarity, Reciprocal Rank Fusion, and passage-level inline citations.',
        projectIds: ['docintel-rag'],
        modules: ['Document chunker & normalizer', 'BM25 + TF-IDF indexers', 'RRF rank fusion engine'],
      },
      {
        capability: 'DAG Orchestration & Execution Safety',
        evidence:
          "Built a visual workflow engine with Kahn's topological sort, cycle detection, conditional routing, retries, and payload diffing.",
        projectIds: ['flowforge-ai-studio'],
        modules: ['Topological scheduler', 'Conditional router & retry policy', 'Run snapshot diff viewer'],
      },
      {
        capability: 'Interactive LLM Application Design',
        evidence:
          'Integrated OpenAI API calls with typed client state management and browser audio interactivity.',
        projectIds: ['character-planner'],
        modules: ['Typed API service layer', 'Structured session state'],
      },
    ],
  },
  {
    id: 'data-bi',
    label: 'Data & BI Analyst',
    shortLabel: 'Data & BI',
    positioning:
      'Turning normalized relational datasets into auditable SQL metrics, cohort models, and executive decision dashboards.',
    coreTools: ['SQLite (WASM)', 'Analytical SQL', 'Cohort & KPI Modelling', 'Recharts', 'Percentile Analytics'],
    capabilities: [
      {
        capability: 'Relational SQL Modelling & Ad-Hoc Querying',
        evidence:
          'Backed executive SaaS KPIs and a live SQL workbench with an in-browser SQLite WebAssembly database.',
        projectIds: ['meridian-bi-platform'],
        modules: ['Normalized SaaS schema', 'Cohort retention SQL queries', 'Interactive SQL workbench'],
      },
      {
        capability: 'Market & Compensation Analytics',
        evidence:
          'Engineered AUD P25/P50/P75 salary distributions, 12% Superannuation toggles, and interstate COL normalisation.',
        projectIds: ['au-tech-market-intel'],
        modules: ['Percentile & Super engine', 'City COL comparator', 'Skills-gap scorer'],
      },
      {
        capability: 'Operational Data Visualisation',
        evidence:
          'Built clear, responsive charts and tabular breakdowns using Recharts with consistent formatting and unit-tested transforms.',
        projectIds: ['meridian-bi-platform', 'au-tech-market-intel', 'autogate'],
        modules: ['KPI scorecards', 'Retention heatmaps', 'Compensation distribution charts'],
      },
    ],
  },
  {
    id: 'business-analyst',
    label: 'Business Analyst',
    shortLabel: 'Business Analyst',
    positioning:
      'Translating domain ambiguity into structured requirements, decision frameworks, process models, and traceable metrics.',
    coreTools: ['KPI Definition', 'Process & Workflow Mapping', 'Gap Analysis', 'SQL Verification', 'Technical Documentation'],
    capabilities: [
      {
        capability: 'Process Modelling & Decision Logic',
        evidence:
          'Modelled branching operational workflows, exception retries, and state transitions visually so business rules remain auditable.',
        projectIds: ['flowforge-ai-studio'],
        modules: ['Visual DAG process canvas', 'Conditional routing rules', 'Step payload audit trail'],
      },
      {
        capability: 'Executive Metric Governance',
        evidence:
          'Defined transparent SaaS metrics (MRR, ARR, churn, cohort retention) backed by inspectable SQL rather than black-box spreadsheets.',
        projectIds: ['meridian-bi-platform'],
        modules: ['Metric SQL definitions', 'Executive KPI layer', 'Cohort analysis views'],
      },
      {
        capability: 'Capability & Market Gap Analysis',
        evidence:
          'Structured Australian role taxonomies and skills-gap scoring to support workforce planning and career benchmarking.',
        projectIds: ['au-tech-market-intel', 'docintel-rag'],
        modules: ['Role-skill taxonomy', 'Skills-gap diagnostic', 'Evidence-backed document Q&A'],
      },
    ],
  },
  {
    id: 'software-engineer',
    label: 'Software Engineer',
    shortLabel: 'Software Engineer',
    positioning:
      'Delivering maintainable, strict-TypeScript applications with clean module boundaries, schema validation, automated tests, and CI/CD.',
    coreTools: ['TypeScript (Strict)', 'React & Vite', 'Express & Zod', 'Radix UI', 'Vitest & GitHub Actions'],
    capabilities: [
      {
        capability: 'Full-Stack Architecture & Contract Safety',
        evidence:
          'Connected React frontends and Express APIs using shared Zod validation schemas and accessible Radix UI components.',
        projectIds: ['autogate', 'character-planner'],
        modules: ['Shared Zod schemas', 'Express REST routes', 'Accessible Radix UI views'],
      },
      {
        capability: 'Algorithmic Core Modules & Testability',
        evidence:
          'Separated graph scheduling, retrieval scoring, and statistical engines from UI state for fast, deterministic Vitest suites.',
        projectIds: ['docintel-rag', 'flowforge-ai-studio', 'au-tech-market-intel'],
        modules: ['Pure domain engines', 'Vitest unit suites', 'Strict TypeScript configs'],
      },
      {
        capability: 'Static & CI/CD Delivery Pipelines',
        evidence:
          'Automated typechecking, unit testing, and reproducible GitHub Pages deployments via GitHub Actions workflows.',
        projectIds: ['docintel-rag', 'au-tech-market-intel', 'flowforge-ai-studio', 'meridian-bi-platform'],
        modules: ['GitHub Actions CI', 'GitHub Pages CD', 'Vite relative-base builds'],
      },
    ],
  },
];

export const ENGINEERING_STANDARDS: readonly EngineeringStandard[] = [
  {
    id: 'testing',
    title: 'Automated Verification',
    tag: 'Vitest',
    description:
      'Core algorithms—retrieval scoring, DAG sorting, compensation math, and catalog integrity—are isolated as pure modules and verified with Vitest.',
    practice: 'Unit tests run locally and on every push in CI.',
  },
  {
    id: 'cicd',
    title: 'Continuous Integration',
    tag: 'GitHub Actions',
    description:
      'Every repository runs automated typecheck, test, and production build gates before static artifacts deploy to GitHub Pages.',
    practice: 'Reproducible builds with frozen lockfiles.',
  },
  {
    id: 'types',
    title: 'Strict Type Safety',
    tag: 'TypeScript',
    description:
      'Strict compiler flags (`strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`) paired with runtime Zod validation at API boundaries.',
    practice: 'Zero `any` escapes in domain logic.',
  },
  {
    id: 'data',
    title: 'Relational & Data Rigour',
    tag: 'SQL & Schemas',
    description:
      'Metrics and analytics are backed by explicit relational schemas, SQLite WASM queries, and documented calculation rules.',
    practice: 'Auditable definitions over opaque mocks.',
  },
  {
    id: 'docs',
    title: 'Architecture Documentation',
    tag: 'Technical Docs',
    description:
      'Concise READMEs, architecture breakdowns, trade-off notes, and reproducible setup steps accompany every project.',
    practice: 'Written for engineers and reviewers.',
  },
];

export function filterProjectsByCategory(
  projects: readonly Project[],
  category: FilterCategory
): Project[] {
  if (category === 'All') {
    return [...projects];
  }
  return projects.filter((project) => project.categories.includes(category));
}

export function getProjectById(
  projects: readonly Project[],
  id: string
): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getRoleTrackById(
  tracks: readonly RoleTrack[],
  id: RoleTrackId
): RoleTrack | undefined {
  return tracks.find((track) => track.id === id);
}

export function getCategoryCounts(
  projects: readonly Project[]
): Record<FilterCategory, number> {
  return {
    All: projects.length,
    'AI & RAG': projects.filter((p) => p.categories.includes('AI & RAG')).length,
    'Data & BI': projects.filter((p) => p.categories.includes('Data & BI')).length,
    Automation: projects.filter((p) => p.categories.includes('Automation')).length,
    'Full-Stack': projects.filter((p) => p.categories.includes('Full-Stack')).length,
  };
}
