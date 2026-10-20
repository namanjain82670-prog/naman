import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Terminal, ExternalLink, Sparkles, Layers, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface HeroProps {
  onOpenContact: () => void;
  onExploreProjects: () => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreProjects, onOpenTerminal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Ambient background glow & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Split-screen layout (Left column: Typographic hierarchy, Right column: Large visual container at matching height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch mb-16">
          {/* Left Column (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial kicker - clean unboxed typography without pills */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-amber-400 tracking-wider uppercase mb-5">
              <span>Full-Stack Software Engineer</span>
              <span aria-hidden="true">/</span>
              <span>Systems & Creative Technologist</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-100 leading-[1.08] mb-6 [text-wrap:balance]">
              Architecting resilient backends & fluid, precision-grade interfaces.
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-8">
              Hello, I'm <strong className="font-semibold text-zinc-100">Naman Jain</strong>. I specialize in building high-throughput distributed architectures, zero-latency streaming pipelines, and responsive web applications. Bridging deep systems engineering with clean visual craftsmanship.
            </p>

            {/* Action buttons & affordances */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onExploreProjects}
                className="px-6 py-3 text-sm font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-400/20 hover:shadow-amber-400/35 flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Selected Works</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTerminal}
                className="px-5 py-3 text-sm font-mono font-medium text-zinc-300 hover:text-zinc-100 bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Launch CLI Playground</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 text-sm font-mono text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 hover:border-zinc-700 rounded-lg transition-colors flex items-center gap-2"
                title="Copy Email Address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span className="truncate max-w-[170px]">{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Unboxed Status Note */}
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Available for senior full-stack roles, distributed systems, & technical consulting</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span className="text-zinc-400">India / Remote worldwide</span>
            </div>
          </div>

          {/* Right Column (lg:col-span-5): Studio Workspace Media Container */}
          <div className="lg:col-span-5 flex items-stretch">
            <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-900 shadow-2xl group flex flex-col">
              <div className="relative w-full h-full min-h-[360px] lg:min-h-[460px] overflow-hidden">
                <img
                  src="/src/assets/images/naman_workspace_editorial_1792470455874.jpg"
                  alt="Naman Jain Engineering Studio & Workspace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                {/* Measured Scrim for Media Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Overlaid Engineering Card Detail */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-700/60 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="text-zinc-200 font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      Core Stack Architecture
                    </span>
                    <span className="text-emerald-400">Production Ready</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-2.5">
                    Distributed microservices in Go & Node.js, event sourcing with Kafka, transactional PostgreSQL, and reactive React frontends.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                    <span className="text-zinc-300">TypeScript</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">Go</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">React 19</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">Kafka</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">Redis</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-300">PostgreSQL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width KPI strip placed below the hero split (as prescribed by Portfolio reference) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-zinc-800/80">
          {PERSONAL_INFO.stats.map((stat) => (
            <div
              key={stat.label}
              className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-zinc-100 tabular-nums mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-zinc-200 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-zinc-400">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Elegant animated marquee ribbon acting as section divider */}
      <div className="w-full mt-16 py-3.5 border-y border-zinc-800/80 bg-zinc-950/60 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap text-xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-6">
          <span>DISTRIBUTED SYSTEMS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>HIGH-THROUGHPUT EVENT STREAMS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>REACT 19 & NEXT.JS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>GO & MICROSERVICES</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>ZERO-LAG WEBSOCKETS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>APACHE KAFKA & REDIS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>POSTGRESQL & TIMESCALEDB</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>DESIGNER PRECISION UI</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          {/* Repeat for seamless infinite marquee loop */}
          <span>DISTRIBUTED SYSTEMS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>HIGH-THROUGHPUT EVENT STREAMS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>REACT 19 & NEXT.JS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>GO & MICROSERVICES</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>ZERO-LAG WEBSOCKETS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>APACHE KAFKA & REDIS</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>POSTGRESQL & TIMESCALEDB</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
          <span>DESIGNER PRECISION UI</span>
          <span aria-hidden="true" className="text-amber-400">✦</span>
        </div>
      </div>
    </section>
  );
};
