export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Distributed Systems' | 'Developer Tools' | 'Creative Web';
  image?: string;
  featured: boolean;
  year: string;
  duration: string;
  role: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: {
    title: string;
    description: string;
    steps: { label: string; detail: string }[];
  };
  metrics: { value: string; label: string }[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  interactiveDemoType: 'telemetry' | 'catalog' | 'canvas' | 'raft' | 'pipeline';
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    level: string;
    experience: string;
    focus: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  technologies: string[];
}

export const PERSONAL_INFO = {
  name: "Naman Jain",
  roleTitle: "Full-Stack Software Engineer",
  subtitle: "Designing resilient distributed backends & high-performance modern web interfaces.",
  email: "namanjain82670@gmail.com",
  location: "India · Available Worldwide (Remote / Hybrid)",
  github: "https://github.com/namanjain",
  linkedin: "https://linkedin.com/in/naman-jain",
  bio: "Full-stack engineer with an obsession for end-to-end system reliability, lightning-fast rendering, and human-centered design. I specialize in bridging complex distributed cloud backends (Go, Node.js, Kafka, PostgreSQL) with fluid, accessible, and reactive user interfaces (React, TypeScript, WebSockets).",
  stats: [
    { value: "4+", label: "Years Engineering", detail: "Hands-on production delivery" },
    { value: "15+", label: "Production Deployments", detail: "From monoliths to microservices" },
    { value: "<40ms", label: "P99 Edge Latency", detail: "Optimized multi-region caching" },
    { value: "99.98%", label: "Uptime Standard", detail: "Zero data-loss architecture" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "aether",
    title: "Aether Systems",
    tagline: "Real-time distributed observability and automated incident remediation engine",
    category: "Distributed Systems",
    image: "/src/assets/images/project_distributed_system_1792470455843.jpg",
    featured: true,
    year: "2025",
    duration: "4 months",
    role: "Lead Full-Stack Architect",
    overview: "High-throughput telemetry ingestion pipeline handling over 1.2M metrics per second with live DAG dependency graphs, distributed tracing, and instant alert dispatching.",
    problem: "Existing monitoring suites suffered from severe 15-30s ingestion lag during traffic spikes, creating blind spots during critical microservice cascade failures.",
    solution: "Architected a zero-copy Go ingestion proxy layered over Kafka partitions and TimescaleDB hypertables, connected to a WebSockets-driven React visualization dashboard running canvas-accelerated topology graphs at 60 FPS.",
    architecture: {
      title: "Zero-Lag Streaming Pipeline",
      description: "Distributed trace collectors publish gRPC metrics into Kafka, compacted via Go workers into TimescaleDB, while a fanout WebSocket gateway streams delta changes to client dashboards.",
      steps: [
        { label: "Trace Collection", detail: "gRPC daemons batch process agent traces in 100ms intervals" },
        { label: "Kafka Partitioning", detail: "Partition keys keyed by service tenant for ordered ingestion" },
        { label: "Stream Aggregation", detail: "Go concurrent workers roll up 1s / 10s P95/P99 histograms" },
        { label: "Live Broadcast", detail: "WebSocket multiplexer pushes filtered node updates to browser" }
      ]
    },
    metrics: [
      { value: "1.2M", label: "Events / Sec" },
      { value: "2.1ms", label: "Avg Node Latency" },
      { value: "99.99%", label: "System Availability" },
      { value: "-65%", label: "Mean Time to Detect (MTTD)" }
    ],
    technologies: ["React 19", "TypeScript", "Go", "Apache Kafka", "TimescaleDB", "Docker", "WebSockets", "Tailwind CSS"],
    githubUrl: "https://github.com/namanjain/aether-systems",
    liveUrl: "https://aether-systems.demo",
    interactiveDemoType: "telemetry"
  },
  {
    id: "velocify",
    title: "Velocify Commerce",
    tagline: "Headless e-commerce infrastructure with sub-10ms catalog reads and real-time analytics",
    category: "Full-Stack",
    image: "/src/assets/images/project_cloud_commerce_1792470456851.jpg",
    featured: true,
    year: "2024",
    duration: "6 months",
    role: "Full-Stack Engineer",
    overview: "High-performance headless e-commerce platform built for instant edge response, automated stock reservation with optimistic locks, and unified checkout orchestration.",
    problem: "Legacy storefront was plagued by slow cold starts (3.4s LCP), stale stock read race conditions during flash sales, and fractured analytics across disparate systems.",
    solution: "Constructed an edge-cached GraphQL layer with Redis Cluster, Redis distributed locks for cart checkout atomicity, and an ultra-lean Next.js customer frontend hitting a 99 Core Web Vitals score.",
    architecture: {
      title: "Edge-First Multi-Tier Architecture",
      description: "Cloudflare edge workers terminate SSL and serve cached product variants, falling back to a Node/GraphQL microservice cluster backed by PostgreSQL read replicas.",
      steps: [
        { label: "Edge Gateway", detail: "Cloudflare Workers serve static catalog schema and cached queries" },
        { label: "GraphQL Mesh", detail: "Apollo Federation routes orders, inventory, and payment microservices" },
        { label: "Distributed Lock", detail: "Redlock algorithm ensures zero overselling during flash sales" },
        { label: "Audit Ledger", detail: "PostgreSQL transactional records with automated CDC stream to warehouse" }
      ]
    },
    metrics: [
      { value: "8.4ms", label: "P95 Edge API Response" },
      { value: "$84.2K", label: "Daily Processed Volume" },
      { value: "99/100", label: "Core Web Vitals" },
      { value: "320ms", label: "Average Checkout Time" }
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "GraphQL", "Redis Cluster", "PostgreSQL", "Stripe API", "Tailwind CSS"],
    githubUrl: "https://github.com/namanjain/velocify-commerce",
    liveUrl: "https://velocify.store",
    interactiveDemoType: "catalog"
  },
  {
    id: "synapsecanvas",
    title: "SynapseCanvas",
    tagline: "Multiplayer visual canvas engine with CRDT state synchronization & infinite zoom",
    category: "Creative Web",
    featured: true,
    year: "2024",
    duration: "3 months",
    role: "Author & Core Maintainer",
    overview: "Infinite spatial thinking whiteboard capable of rendering 10,000+ interactive nodes at 60 FPS with offline-first persistence and real-time conflict-free collaborative editing.",
    problem: "Standard DOM-based canvas solutions choke at scale (>500 elements) and lose data during momentary network disruptions or conflicting simultaneous writes.",
    solution: "Engineered a custom dual-layer rendering pipeline combining HTML5 Canvas 2D spatial indexing (R-Tree) with Yjs CRDTs over WebRTC and fallback WebSockets.",
    architecture: {
      title: "Local-First CRDT Protocol",
      description: "Client operates locally with zero input latency. State mutations are committed to an in-memory Y.Doc, encoded into binary updates, and peer-replicated via WebRTC datachannels.",
      steps: [
        { label: "Input Interception", detail: "Sub-pixel pointer events normalized with inertia smoothing" },
        { label: "Spatial Indexing", detail: "R-Tree bounding hierarchy prunes off-screen node calculations" },
        { label: "Yjs Delta Sync", detail: "Binary state diffs broadcasted over peer-to-peer data channels" },
        { label: "IndexedDB Snapshot", detail: "Automatic local persistence enables seamless offline continuity" }
      ]
    },
    metrics: [
      { value: "60 FPS", label: "Smooth Under 10k Nodes" },
      { value: "18ms", label: "Sync Latency (Cross-Region)" },
      { value: "100%", label: "Conflict Resolution Success" },
      { value: "0ms", label: "Perceived Local Input Delay" }
    ],
    technologies: ["TypeScript", "HTML5 Canvas", "Yjs CRDT", "WebRTC", "WebSockets", "IndexedDB", "Tailwind CSS"],
    githubUrl: "https://github.com/namanjain/synapse-canvas",
    liveUrl: "https://synapsecanvas.app",
    interactiveDemoType: "canvas"
  },
  {
    id: "nexus-kv",
    title: "NexusKV",
    tagline: "Distributed in-memory key-value storage engine implementing Raft consensus",
    category: "Distributed Systems",
    featured: false,
    year: "2023",
    duration: "3 months",
    role: "Systems Developer",
    overview: "A fault-tolerant distributed storage cluster with automatic leader election, distributed log compaction, write-ahead logging (WAL), and gRPC client libraries.",
    problem: "Understanding distributed failure modes requires hands-on exploration of network partitions, split-brain conditions, and non-blocking state snapshotting.",
    solution: "Built a ground-up Raft consensus protocol in Go, implementing linearizable reads, persistent log compaction using RocksDB, and simulated chaotic network drops.",
    architecture: {
      title: "Raft Consensus Cluster",
      description: "Odd-numbered nodes exchange periodic heartbeats. When a leader partitions, follower timeouts trigger an election cycle backed by randomized jitter.",
      steps: [
        { label: "Client Proposal", detail: "Writes routed directly to the elected cluster leader" },
        { label: "WAL Entry", detail: "Leader appends entry to local Write-Ahead Log before replying" },
        { label: "Quorum Replication", detail: "AppendEntries RPC replicates mutation to majority of peers" },
        { label: "State Machine Apply", detail: "Entry committed to in-memory hashtable and acknowledged" }
      ]
    },
    metrics: [
      { value: "140k", label: "Write Ops / Sec" },
      { value: "<150ms", label: "Leader Election Recovery" },
      { value: "Zero", label: "Data Loss Under Partition" },
      { value: "3-Node", label: "Minimum Quorum Resilience" }
    ],
    technologies: ["Go (Golang)", "gRPC", "Protobuf", "RocksDB", "Docker", "Linux cgroups"],
    githubUrl: "https://github.com/namanjain/nexus-kv",
    interactiveDemoType: "raft"
  },
  {
    id: "devpulse",
    title: "DevPulse CI",
    tagline: "Automated AST code review & static analysis bot for production Pull Requests",
    category: "Developer Tools",
    featured: false,
    year: "2024",
    duration: "2 months",
    role: "Full-Stack Engineer",
    overview: "Developer productivity tool that inspects GitHub PRs, analyzes Abstract Syntax Trees (AST) for performance regressions, memory leaks, and unwired API endpoints, and generates inline code suggestions.",
    problem: "Senior engineering time was heavily bottlenecked reviewing repetitive boilerplate flaws, missing database transaction rollbacks, and uncaught async exceptions.",
    solution: "Created an asynchronous webhook worker pipeline in Python FastAPI that parses git unified diffs into AST trees, checks against rule heuristics, and posts surgical review suggestions.",
    architecture: {
      title: "Diff-to-AST Analysis Engine",
      description: "GitHub Webhook triggers asynchronous Celery tasks that checkout branch diffs, run AST lint rules, and interact via GitHub GraphQL API.",
      steps: [
        { label: "Webhook Ingest", detail: "FastAPI receives cryptographic HMAC-verified PR push payload" },
        { label: "AST Parse", detail: "Tree-sitter generates AST representation of touched code blocks" },
        { label: "Rule Evaluation", detail: "Pattern matcher runs 80+ security & leak detection heuristics" },
        { label: "Surgical Annotation", detail: "GitHub GraphQL API posts inline code review suggestions" }
      ]
    },
    metrics: [
      { value: "-45%", label: "PR Cycle Time" },
      { value: "98.2%", label: "Dev Acceptance Rate" },
      { value: "0", label: "False Positive Security Blocks" },
      { value: "1.4s", label: "Average Review Generation" }
    ],
    technologies: ["Python", "FastAPI", "TypeScript", "Tree-sitter", "PostgreSQL", "Redis", "GitHub API"],
    githubUrl: "https://github.com/namanjain/devpulse-ci",
    interactiveDemoType: "pipeline"
  },
  {
    id: "aurastream",
    title: "AuraStream Gateway",
    tagline: "Serverless edge media transcoder with dynamic HLS packaging & caching",
    category: "Full-Stack",
    featured: false,
    year: "2023",
    duration: "3 months",
    role: "Backend & Cloud Engineer",
    overview: "Distributed video ingest and on-the-fly HLS chunking service utilizing FFmpeg compiled to WebAssembly running across serverless compute with zero cold-start penalty.",
    problem: "Traditional monolithic video processing instances sat idle during quiet hours, incurring huge EC2 infrastructure bills while struggling to scale quickly during burst uploads.",
    solution: "Built a chunked upload processor with event-driven Lambda workers that slice video into 4-second TS segments, generate multi-bitrate m3u8 playlists, and push directly to S3.",
    architecture: {
      title: "Distributed Chunk Pipeline",
      description: "Direct-to-S3 multi-part uploads trigger event notifications that fan out parallel transcode jobs for 1080p, 720p, and 480p streams.",
      steps: [
        { label: "Presigned Upload", detail: "Client streams multipart binary directly to nearest S3 bucket" },
        { label: "Lambda Fanout", detail: "S3 Event triggers 3 parallel transcode workers across resolutions" },
        { label: "HLS Packaging", detail: "WebAssembly FFmpeg builds encrypted 4-second chunk manifests" },
        { label: "Cloudflare Warmup", detail: "Edge CDN pre-caches manifest headers for instantaneous playback" }
      ]
    },
    metrics: [
      { value: "4.8x", label: "Faster Transcode Speed" },
      { value: "-42%", label: "Cloud Infrastructure Cost" },
      { value: "1080p60", label: "Max Supported Resolution" },
      { value: "<250ms", label: "Edge Playback Start Time" }
    ],
    technologies: ["Node.js", "TypeScript", "FFmpeg", "AWS Lambda", "S3", "Cloudflare CDN", "Docker"],
    githubUrl: "https://github.com/namanjain/aurastream-gateway",
    interactiveDemoType: "telemetry"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Frontend & UI Engineering",
    description: "Building responsive, accessible, high-framerate interfaces with pixel-level precision.",
    skills: [
      { name: "React 19 & Next.js", level: "Expert", experience: "4 yrs", focus: "Server Components, hooks, concurrent mode" },
      { name: "TypeScript", level: "Expert", experience: "4 yrs", focus: "Strict typing, generics, AST, build tooling" },
      { name: "Tailwind CSS", level: "Expert", experience: "4 yrs", focus: "Design systems, responsive layout, micro-interactions" },
      { name: "Motion & Canvas 2D", level: "Advanced", experience: "3 yrs", focus: "Compositor animations, 60fps renders, spatial canvas" },
      { name: "State Architecture", level: "Advanced", experience: "4 yrs", focus: "Zustand, Redux Toolkit, Yjs CRDT, optimistic UI" },
      { name: "Web Performance", level: "Expert", experience: "4 yrs", focus: "Core Web Vitals, code-splitting, bundle budgets" }
    ]
  },
  {
    name: "Backend & Microservices",
    description: "Architecting high-throughput, horizontally scalable API services and event-driven backends.",
    skills: [
      { name: "Node.js & Express", level: "Expert", experience: "4 yrs", focus: "Event loop optimization, streaming I/O, security" },
      { name: "Go (Golang)", level: "Advanced", experience: "2 yrs", focus: "Goroutines, channels, gRPC, microservices" },
      { name: "REST & GraphQL", level: "Expert", experience: "4 yrs", focus: "Federated schemas, pagination, rate limiting, OpenAPI" },
      { name: "WebSockets & WebRTC", level: "Advanced", experience: "3 yrs", focus: "Full-duplex real-time communication, P2P data channels" },
      { name: "Python & FastAPI", level: "Advanced", experience: "3 yrs", focus: "Async endpoints, worker pipelines, data parsing" }
    ]
  },
  {
    name: "Distributed Systems & Data",
    description: "Designing transactional integrity, caching strategies, and persistent storage layers.",
    skills: [
      { name: "PostgreSQL", level: "Expert", experience: "4 yrs", focus: "Complex joins, indexing, query EXPLAIN tuning, migrations" },
      { name: "Redis Cluster", level: "Expert", experience: "4 yrs", focus: "Pub/Sub, distributed locks (Redlock), caching tiers" },
      { name: "Apache Kafka", level: "Intermediate", experience: "2 yrs", focus: "Event partitions, consumer groups, backpressure" },
      { name: "TimescaleDB", level: "Advanced", experience: "2 yrs", focus: "Time-series rollups, hypertables, metrics aggregation" },
      { name: "MongoDB", level: "Advanced", experience: "3 yrs", focus: "Document schemas, aggregation pipelines, replica sets" }
    ]
  },
  {
    name: "DevOps & Cloud Architecture",
    description: "Automating zero-downtime deployments, container orchestration, and multi-region routing.",
    skills: [
      { name: "Docker & Containers", level: "Expert", experience: "4 yrs", focus: "Multi-stage builds, minimal images, layer caching" },
      { name: "Kubernetes & Orchestration", level: "Intermediate", experience: "2 yrs", focus: "Deployments, services, configmaps, ingress" },
      { name: "AWS Cloud (S3, ECS, Lambda)", level: "Advanced", experience: "3 yrs", focus: "Serverless pipelines, VPC networking, IAM security" },
      { name: "CI/CD & GitHub Actions", level: "Expert", experience: "4 yrs", focus: "Automated testing matrix, linting, preview deploys" },
      { name: "Cloudflare Workers & Edge", level: "Advanced", experience: "3 yrs", focus: "Edge caching, reverse proxy, DDoS mitigation" }
    ]
  },
  {
    name: "Testing, Reliability & Tools",
    description: "Ensuring fault tolerance, memory efficiency, and rigorous automated test coverage.",
    skills: [
      { name: "Vitest & Jest", level: "Expert", experience: "4 yrs", focus: "Unit & integration testing, mocking, high coverage" },
      { name: "Playwright", level: "Advanced", experience: "3 yrs", focus: "End-to-end browser testing, visual regression testing" },
      { name: "Linux & Bash", level: "Advanced", experience: "4 yrs", focus: "Shell automation, process monitoring, systemd, logs" },
      { name: "Git & Version Control", level: "Expert", experience: "4 yrs", focus: "Trunk-based development, rebase workflows, hooks" }
    ]
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    period: "2024 — Present",
    role: "Senior Full-Stack Engineer",
    company: "HyperScale Labs",
    location: "Bengaluru, India (Hybrid)",
    type: "Full-Time",
    summary: "Leading the core full-stack platform engineering team responsible for real-time collaboration engines and edge-optimized developer infrastructure.",
    highlights: [
      "Engineered a real-time multiplayer canvas engine serving 120,000+ active users with sub-20ms state sync latency.",
      "Spearheaded decomposition of a monolithic Node.js backend into isolated microservices in Go and TypeScript, increasing deployment frequency from bi-weekly to multiple times daily.",
      "Cut monthly cloud compute costs by 34% by introducing multi-tiered Redis caching and edge query deduplication.",
      "Mentored 6 junior and mid-level engineers in writing maintainable TypeScript, concurrent Go routines, and comprehensive E2E test suites."
    ],
    technologies: ["React 19", "TypeScript", "Go", "Redis", "PostgreSQL", "Kafka", "Docker", "AWS"]
  },
  {
    period: "2022 — 2024",
    role: "Full-Stack Software Developer",
    company: "Continuum Tech",
    location: "Gurugram, India",
    type: "Full-Time",
    summary: "Designed and implemented high-volume customer analytics dashboards, transactional payment integrations, and public developer APIs.",
    highlights: [
      "Designed and delivered 8+ customer-facing micro-frontends with 99.9% uptime and zero regressions across quarterly releases.",
      "Built an internal design system component library with strict accessibility (WCAG AA) compliance, reducing feature delivery time by 30%.",
      "Created an asynchronous report generation worker queue using Redis BullMQ, handling exports of 500k+ rows without blocking user threads.",
      "Established automated Playwright integration tests in CI/CD pipeline, lowering release bug rates by 42%."
    ],
    technologies: ["React", "Node.js", "Express", "TypeScript", "PostgreSQL", "Redis", "Playwright", "Tailwind CSS"]
  },
  {
    period: "2021 — 2022",
    role: "Software Engineering Intern",
    company: "OpenCloud Systems",
    location: "Remote",
    type: "Internship",
    summary: "Contributed to internal telemetry collection tools, automated OpenAPI documentation generation, and developer CLI utilities.",
    highlights: [
      "Built a high-performance metrics scraper in Go that parsed daemon health stats into Redis time-series.",
      "Redesigned the internal developer portal documentation, adding live executable code samples and schema explorer.",
      "Authored bash deployment scripts and Docker compose templates used across 20+ internal engineering testing sandboxes."
    ],
    technologies: ["Go", "Node.js", "Docker", "Redis", "Bash", "REST APIs"]
  }
];

export const SYSTEM_ARCHITECTURE_NODES = [
  { id: "client", name: "Client Layer", role: "Next.js 15 / React 19", detail: "SSR & client hydration, Tailwind styling, optimistic UI mutations" },
  { id: "edge", name: "Global Edge", role: "Cloudflare Workers", detail: "SSL termination, georouting, static asset & variant caching (<10ms)" },
  { id: "gateway", name: "API Gateway", role: "Reverse Proxy & Auth", detail: "JWT token validation, rate-limiting, CORS & request routing" },
  { id: "services", name: "Microservices", role: "Go & Node.js Clusters", detail: "Stateless container pods, domain services, gRPC internal communication" },
  { id: "cache", name: "Cache & State", role: "Redis Cluster", detail: "In-memory sessions, distributed locks, Pub/Sub channels" },
  { id: "db", name: "Persistence", role: "PostgreSQL & Timescale", detail: "ACID transactions, read-replicas, partitioned hypertables" },
  { id: "queue", name: "Event Bus", role: "Apache Kafka", detail: "Durable event log, asynchronous worker fanout, audit pipelines" }
];
