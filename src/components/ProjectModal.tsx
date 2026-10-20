import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, Activity, Server, Zap, ShieldCheck, CheckCircle2, RefreshCw, Terminal, Layers } from 'lucide-react';
import { Project } from '../data/portfolioData.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'sandbox'>('overview');

  // Interactive Sandbox States:
  // Aether: Telemetry Simulator
  const [telemetryRate, setTelemetryRate] = useState<number>(1200);
  const [latencyMs, setLatencyMs] = useState<number>(2.1);
  const [clusterHealthy, setClusterHealthy] = useState<boolean>(true);
  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    "[09:41:02] gRPC worker-04 ingested 42,000 trace spans in 12ms",
    "[09:41:03] Kafka partition-02 offset committed (lag: 0ms)",
    "[09:41:04] Timescale hypertable chunk rollover completed successfully",
  ]);

  // Velocify: Edge Catalog Simulator
  const [cacheHit, setCacheHit] = useState<boolean>(true);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);
  const [checkoutTime, setCheckoutTime] = useState<number>(280);

  // NexusKV: Raft Cluster Simulator
  const [raftLeader, setRaftLeader] = useState<number>(1);
  const [isElecting, setIsElecting] = useState<boolean>(false);
  const [nodeStates, setNodeStates] = useState<('leader' | 'follower' | 'partitioned')[]>([
    'leader',
    'follower',
    'follower'
  ]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  // Aether Simulator Handlers
  const handleSimulateBurst = () => {
    setTelemetryRate(2800);
    setLatencyMs(4.2);
    setSimulatedLogs(prev => [
      `[${new Date().toLocaleTimeString()}] ALERT: Traffic surge detected (2.8M req/s)`,
      `[${new Date().toLocaleTimeString()}] Auto-scaling 4 additional Go consumer workers`,
      `[${new Date().toLocaleTimeString()}] P99 latency stabilized at 4.2ms (Zero packet drop)`,
      ...prev.slice(0, 3)
    ]);
    setTimeout(() => {
      setTelemetryRate(1200);
      setLatencyMs(2.1);
    }, 4000);
  };

  // Velocify Checkout Handler
  const handleTriggerCheckout = () => {
    setCheckoutStatus('Locking inventory via Redis Redlock...');
    setTimeout(() => {
      setCheckoutStatus('PostgreSQL ACID ledger updated: Order #VLC-9824 committed (294ms)');
    }, 300);
  };

  // Raft Partition Handler
  const handleTriggerPartition = () => {
    setIsElecting(true);
    setNodeStates(['partitioned', 'follower', 'follower']);
    setTimeout(() => {
      setRaftLeader(2);
      setNodeStates(['partitioned', 'leader', 'follower']);
      setIsElecting(false);
    }, 150);
  };

  const handleResetCluster = () => {
    setRaftLeader(1);
    setNodeStates(['leader', 'follower', 'follower']);
    setIsElecting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium text-amber-400 uppercase">
              {project.category}
            </span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span className="text-xs font-mono text-zinc-400">
              {project.year} ({project.duration})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-2">
              {project.title}
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 p-1 bg-zinc-950/70 border border-zinc-800/80 rounded-xl w-fit">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              System Overview
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'architecture'
                  ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Architecture Blueprint
            </button>
            <button
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'sandbox'
                  ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Interactive Simulator</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Featured Image if present */}
              {project.image && (
                <div className="relative rounded-xl overflow-hidden border border-zinc-800 max-h-[320px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                </div>
              )}

              {/* Problem vs Solution 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/90">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span>The Engineering Problem</span>
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-zinc-950/50 border border-zinc-800/90">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2 flex items-center gap-1.5">
                    <span>Architectural Solution</span>
                  </h4>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Key Quantitative Metrics */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Production Impact & Metrics
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80"
                    >
                      <div className="text-2xl font-bold font-mono text-zinc-100 tabular-nums">
                        {metric.value}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Listing */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
                  Core Technologies
                </h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-300">
                  {project.technologies.map((tech, idx) => (
                    <span key={tech} className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-zinc-800/70 border border-zinc-700/60">
                        {tech}
                      </span>
                      {idx < project.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-zinc-600">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-zinc-950/60 border border-zinc-800">
                <h4 className="text-base font-semibold text-zinc-100 mb-1">
                  {project.architecture.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                  {project.architecture.description}
                </p>

                {/* Steps Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.architecture.steps.map((step, idx) => (
                    <div
                      key={step.label}
                      className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 relative flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-amber-400">
                          Phase 0{idx + 1}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-zinc-200 mb-1">
                          {step.label}
                        </div>
                        <div className="text-xs text-zinc-400 leading-relaxed">
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INTERACTIVE SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              {project.interactiveDemoType === 'telemetry' && (
                <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-amber-400" />
                        Live Stream Ingestion Simulator
                      </div>
                      <div className="text-xs text-zinc-400">
                        Simulate live telemetry burst and observe zero-lag recovery.
                      </div>
                    </div>
                    <button
                      onClick={handleSimulateBurst}
                      className="px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Inject 2.8M Event Spike</span>
                    </button>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-xs text-zinc-400">Ingest Rate</div>
                      <div className="text-xl font-bold font-mono text-zinc-100 tabular-nums">
                        {(telemetryRate / 1000).toFixed(2)}M / s
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-xs text-zinc-400">P99 Latency</div>
                      <div className={`text-xl font-bold font-mono tabular-nums ${latencyMs > 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {latencyMs}ms
                      </div>
                    </div>
                    <div className="p-3.5 rounded-lg bg-zinc-900 border border-zinc-800">
                      <div className="text-xs text-zinc-400">Consumer Lag</div>
                      <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                        0 ms
                      </div>
                    </div>
                  </div>

                  {/* Simulated Terminal Logs */}
                  <div className="p-3.5 rounded-lg bg-black border border-zinc-800/90 font-mono text-xs text-zinc-300 space-y-1">
                    <div className="text-zinc-500 text-[11px] border-b border-zinc-800 pb-1 mb-2">
                      Kafka Partition Consumer Daemon · stdout
                    </div>
                    {simulatedLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.interactiveDemoType === 'catalog' && (
                <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Sub-10ms Headless Edge & Checkout Sandbox
                      </div>
                      <div className="text-xs text-zinc-400">
                        Test Redis distributed locking with atomic stock reservation.
                      </div>
                    </div>
                    <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Edge Cache: Warm</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-zinc-200">
                        Enterprise Workstation Pro (SKU: WS-900X)
                      </div>
                      <div className="text-xs text-zinc-400">
                        Stock Remaining: 3 units · In-Memory Lock Active
                      </div>
                    </div>
                    <button
                      onClick={handleTriggerCheckout}
                      className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Trigger Atomic Checkout
                    </button>
                  </div>

                  {checkoutStatus && (
                    <div className="p-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{checkoutStatus}</span>
                    </div>
                  )}
                </div>
              )}

              {project.interactiveDemoType === 'raft' && (
                <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                        <Server className="w-4 h-4 text-amber-400" />
                        Raft Distributed Consensus Cluster
                      </div>
                      <div className="text-xs text-zinc-400">
                        Simulate network partition and witness sub-150ms leader failover.
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleTriggerPartition}
                        disabled={isElecting || nodeStates[0] === 'partitioned'}
                        className="px-3 py-1.5 text-xs font-mono text-rose-300 bg-rose-950/40 border border-rose-800/60 rounded-md hover:bg-rose-900/50 transition-colors disabled:opacity-50 cursor-pointer"
                      >
                        Partition Leader (Node 1)
                      </button>
                      <button
                        onClick={handleResetCluster}
                        className="px-3 py-1.5 text-xs font-mono text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-md transition-colors cursor-pointer"
                      >
                        Reset Cluster
                      </button>
                    </div>
                  </div>

                  {/* 3 Node Cluster Representation */}
                  <div className="grid grid-cols-3 gap-4">
                    {nodeStates.map((state, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border text-center transition-all ${
                          state === 'leader'
                            ? 'bg-amber-950/20 border-amber-500/80 shadow-lg shadow-amber-500/10'
                            : state === 'follower'
                            ? 'bg-zinc-900 border-zinc-800'
                            : 'bg-rose-950/20 border-rose-800/80'
                        }`}
                      >
                        <div className="text-xs font-mono text-zinc-400 mb-1">Node 0{idx + 1}</div>
                        <div className={`text-sm font-bold uppercase font-mono ${
                          state === 'leader' ? 'text-amber-400' : state === 'follower' ? 'text-zinc-300' : 'text-rose-400'
                        }`}>
                          {state}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-2 font-mono">
                          {state === 'leader' ? 'Serving Quorum Writes' : state === 'follower' ? 'Heartbeat OK' : 'Isolated Network'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-zinc-400 text-center">
                    {isElecting ? "Electing new leader via randomized timeout RPC..." : `Quorum intact. Node 0${raftLeader} is active cluster leader.`}
                  </div>
                </div>
              )}

              {project.interactiveDemoType === 'canvas' && (
                <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    Spatial Canvas 2D Engine Demo
                  </div>
                  <div className="h-44 w-full bg-zinc-900/90 rounded-lg border border-dashed border-zinc-700 flex flex-col items-center justify-center text-center p-4">
                    <Layers className="w-8 h-8 text-amber-400/80 mb-2 animate-bounce" />
                    <div className="text-sm font-semibold text-zinc-200">
                      R-Tree Spatial Indexing Active
                    </div>
                    <div className="text-xs text-zinc-400 max-w-sm mt-1">
                      10,000 vector entities rendered at sustained 60 FPS with Yjs CRDT delta compression.
                    </div>
                  </div>
                </div>
              )}

              {project.interactiveDemoType === 'pipeline' && (
                <div className="p-6 rounded-xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <div className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    DevPulse AST Code Review Scanner
                  </div>
                  <div className="p-4 rounded-lg bg-black border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
                    <div className="text-emerald-400">✓ Security Rule: No unsanitized raw SQL queries found.</div>
                    <div className="text-amber-400">⚡ Performance: Suggested memoizing useMemo() on heavy data calculation in line 84.</div>
                    <div className="text-emerald-400">✓ Reliability: All database transactions wrapped in defer tx.Rollback().</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-800">
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>Naman Jain · Architecture Portfolio</span>
            </div>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-mono text-zinc-300 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Production Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
