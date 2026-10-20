import React, { useState } from 'react';
import { Cpu, Globe, Shield, Server, Database, Layers, ArrowRight, Zap, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ArchitectureNode {
  id: string;
  title: string;
  category: string;
  tech: string;
  latency: string;
  reliability: string;
  summary: string;
  responsibilities: string[];
  snippet: string;
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: 'client',
    title: 'Client UI & Hydration',
    category: 'Presentation Layer',
    tech: 'React 19 · Next.js · Tailwind · WebSockets',
    latency: '< 16ms (60 FPS)',
    reliability: 'Offline-First (CRDT / IndexedDB)',
    summary: 'Optimistic updates render mutations locally in 0ms while binary WebSocket packets propagate delta changes to other connected clients.',
    responsibilities: [
      'Zero-layout shift hydration with Server Components',
      'Local-first optimistic state updates',
      'Dual WebSocket + WebRTC connection multiplexing'
    ],
    snippet: `// Client-side optimistic dispatch
const mutateState = (delta: BinaryUpdate) => {
  localDoc.applyUpdate(delta); // 0ms local frame
  wsClient.send(delta);        // broadcast delta
};`
  },
  {
    id: 'edge',
    title: 'Global Edge & CDN',
    category: 'Edge Infrastructure',
    tech: 'Cloudflare Workers · Anycast Routing',
    latency: '< 8ms TLS Handshake',
    reliability: '99.999% SLA',
    summary: 'Global edge network terminating SSL, serving static cache assets, and inspecting geo-headers for multi-region database routing.',
    responsibilities: [
      'Sub-10ms Anycast routing to nearest edge pop',
      'Dynamic GraphQL response caching with stale-while-revalidate',
      'DDoS rate limiting and cryptographic bot verification'
    ],
    snippet: `export default {
  async fetch(req, env, ctx) {
    const cached = await caches.default.match(req);
    if (cached) return cached;
    return fetchAndWarm(req, env);
  }
};`
  },
  {
    id: 'gateway',
    title: 'API Gateway & Reverse Proxy',
    category: 'Ingress & Security',
    tech: 'Go Reverse Proxy · gRPC Gateway · JWT',
    latency: '1.2ms Proxy Overhead',
    reliability: 'Zero-Downtime Rolling Deploys',
    summary: 'High-throughput reverse proxy written in Go, handling distributed rate limiting via Redis token bucket, JWT validation, and gRPC translation.',
    responsibilities: [
      'Token bucket rate limiting per API key',
      'HMAC & JWT signature verification',
      'HTTP/2 to gRPC protocol multiplexing'
    ],
    snippet: `func IngressHandler(w http.ResponseWriter, r *http.Request) {
    token := r.Header.Get("Authorization")
    if !authValidator.Verify(token) {
        http.Error(w, "Unauthorized", 401)
        return
    }
    grpcProxy.ServeHTTP(w, r)
}`
  },
  {
    id: 'services',
    title: 'Distributed Microservices',
    category: 'Application Logic',
    tech: 'Go · Node.js · Docker · Kubernetes',
    latency: '3 - 8ms P95 Execution',
    reliability: 'Circuit Breakers + Graceful Degradation',
    summary: 'Decoupled domain services communicating via high-performance protobuf RPCs with automated horizontal pod autoscaling.',
    responsibilities: [
      'Stateless service instances scaling with CPU & queue lag',
      'Circuit breakers preventing cascading backend outages',
      'Structured OpenTelemetry distributed tracing spans'
    ],
    snippet: `type OrderService struct {
    repo    OrderRepository
    events  kafka.Producer
    circuit *gobreaker.CircuitBreaker
}
func (s *OrderService) PlaceOrder(ctx context.Context, o *Order) error`
  },
  {
    id: 'cache',
    title: 'Distributed Caching & Locks',
    category: 'State & Caching',
    tech: 'Redis Cluster · Redlock Algorithm',
    latency: '< 1ms Memory Lookup',
    reliability: 'Multi-AZ Replication',
    summary: 'In-memory Redis Cluster providing distributed mutex locks for concurrency control, pub/sub notifications, and ephemeral session storage.',
    responsibilities: [
      'Distributed locks (Redlock) preventing overselling',
      'Ephemeral session state with automated TTL cleanup',
      'Low-latency Pub/Sub message dispatching'
    ],
    snippet: `// Redlock concurrency protection
const lock = await redlock.acquire(["locks:stock:sku-902"], 1500);
try {
  await executeAtomicDeduction();
} finally {
  await lock.release();
}`
  },
  {
    id: 'db',
    title: 'Transactional Persistence',
    category: 'Data Storage',
    tech: 'PostgreSQL · TimescaleDB · Read Replicas',
    latency: '4ms Indexed Queries',
    reliability: 'Automated WAL Backups + Failover',
    summary: 'ACID-compliant relational store with automated replication, query tuning using EXPLAIN ANALYZE, and connection pooling via PgBouncer.',
    responsibilities: [
      'Strict relational schema integrity & foreign keys',
      'Time-series metrics partitioning via Timescale hypertables',
      'Read-replica traffic distribution for analytics'
    ],
    snippet: `BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
UPDATE accounts SET balance = balance - 100 WHERE id = 'acc_1';
UPDATE accounts SET balance = balance + 100 WHERE id = 'acc_2';
COMMIT;`
  },
  {
    id: 'eventbus',
    title: 'Event Streaming & Audit Log',
    category: 'Asynchronous Pipeline',
    tech: 'Apache Kafka · Zookeeper / KRaft',
    latency: '< 5ms Event Pub',
    reliability: 'At-Least-Once Delivery Guarantees',
    summary: 'Durable distributed commit log decoupling compute workers, enabling event replay, asynchronous auditing, and analytics ETL.',
    responsibilities: [
      'Event sourcing and immutable domain audit trails',
      'Asynchronous webhook dispatch and email notifications',
      'Zero-loss consumer group replay during incident triage'
    ],
    snippet: `writer := kafka.NewWriter(kafka.WriterConfig{
    Brokers:  []string{"kafka-broker:9092"},
    Topic:    "orders.completed",
    Balancer: &kafka.LeastBytes{},
})`
  }
];

export const ArchitectureSection: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('services');

  const activeNode = ARCHITECTURE_NODES.find(n => n.id === activeNodeId) || ARCHITECTURE_NODES[0];

  return (
    <section id="architecture" className="py-20 md:py-28 relative scroll-mt-20 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-2">
            Systems Engineering Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            Interactive Full-Stack Architecture
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl leading-relaxed">
            Click through each layer of my end-to-end production architecture blueprint to inspect data flow, latency budgets, and failover strategies.
          </p>
        </div>

        {/* Interactive Architecture Flow Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 p-2 bg-zinc-900/80 border border-zinc-800 rounded-2xl mb-8 overflow-x-auto">
          {ARCHITECTURE_NODES.map((node, idx) => {
            const isActive = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 shadow-md shadow-amber-400/20'
                    : 'bg-zinc-950/60 hover:bg-zinc-800/60 text-zinc-300 border border-zinc-800/60'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span className={isActive ? 'text-zinc-900 font-bold' : 'text-zinc-500'}>
                    0{idx + 1}
                  </span>
                  {isActive && <Zap className="w-3.5 h-3.5 text-zinc-950" />}
                </div>
                <div>
                  <div className={`text-xs font-bold leading-tight ${isActive ? 'text-zinc-950' : 'text-zinc-200'}`}>
                    {node.title.split(' ')[0]} {node.title.split(' ')[1] || ''}
                  </div>
                  <div className={`text-[10px] mt-1 font-mono truncate ${isActive ? 'text-zinc-800 font-medium' : 'text-zinc-400'}`}>
                    {node.latency}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Layer Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          {/* Left Side: Specifications & Principles */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                <span>{activeNode.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-400">{activeNode.tech}</span>
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-3">
                {activeNode.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeNode.summary}
              </p>
            </div>

            {/* Metrics & Guarantees */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-800">
              <div>
                <div className="text-xs text-zinc-400 mb-0.5">Budgeted Latency</div>
                <div className="text-lg font-bold font-mono text-amber-400 tabular-nums">
                  {activeNode.latency}
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-400 mb-0.5">Fault Resilience</div>
                <div className="text-sm font-semibold text-emerald-400">
                  {activeNode.reliability}
                </div>
              </div>
            </div>

            {/* Core Responsibilities */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
                Core Architectural Responsibilities
              </div>
              <ul className="space-y-2">
                {activeNode.responsibilities.map((resp, i) => (
                  <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Code / Config Artifact */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="rounded-xl bg-black border border-zinc-800 overflow-hidden flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-950 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <span>{activeNode.id}_pipeline.ts</span>
                </span>
                <span className="text-zinc-500">Production Code Pattern</span>
              </div>
              <div className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto flex-1 bg-zinc-950/70">
                <pre>{activeNode.snippet}</pre>
              </div>
              <div className="p-3 bg-zinc-900/60 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                <span>Guaranteed Type Safety</span>
                <span className="text-emerald-400">Zero Deadlocks Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
