import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData.ts';
import { Briefcase, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 relative scroll-mt-20 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-2">
            Professional Track Record
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            Engineering Experience
          </h2>
          <p className="text-base text-zinc-400 max-w-xl leading-relaxed">
            Leading engineering squads, scaling high-concurrency systems, and building resilient developer-first platforms.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-10 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-px before:bg-zinc-800 before:-translate-x-1/2 before:hidden md:before:block">
          {EXPERIENCE_ITEMS.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={item.period + item.company}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start group"
              >
                {/* Desktop timeline marker dot */}
                <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-zinc-950 border-2 border-amber-400 z-10 group-hover:scale-125 transition-transform" />

                {/* Left side card / Right side card depending on even/odd */}
                <div className={`${isEven ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className="p-6 rounded-2xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 transition-all text-left shadow-lg">
                    {/* Period and Company Header - Clean unboxed text */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400 mb-2">
                      <span className="text-amber-400 font-semibold">{item.period}</span>
                      <span className="flex items-center gap-1.5 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-sm font-semibold text-zinc-300 mt-0.5 mb-3">
                      {item.company} <span className="font-normal text-zinc-500 font-mono">({item.type})</span>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-2 mb-5">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="text-xs text-zinc-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies applied */}
                    <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-400">
                      {item.technologies.map((tech, tIdx) => (
                        <span key={tech} className="flex items-center gap-1.5">
                          <span className="text-zinc-300">{tech}</span>
                          {tIdx < item.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">·</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty column for alternating balance on desktop */}
                <div className={`${isEven ? 'hidden md:block md:col-start-2' : 'hidden md:block md:col-start-1 md:row-start-1'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
