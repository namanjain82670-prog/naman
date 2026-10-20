import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData.ts';
import { Code, Server, Database, Cloud, ShieldCheck } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const icons = [
    <Code className="w-4 h-4" />,
    <Server className="w-4 h-4" />,
    <Database className="w-4 h-4" />,
    <Cloud className="w-4 h-4" />,
    <ShieldCheck className="w-4 h-4" />
  ];

  const currentCategory = SKILL_CATEGORIES[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 md:py-28 relative scroll-mt-20 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-2">
              Capabilities & Tooling
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              Technical Competencies
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
            Engineered through production shipping, rigorous incident triage, and continuous benchmarking under heavy concurrent loads.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl mb-8 overflow-x-auto">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = idx === activeCategoryIndex;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-4 py-2.5 text-xs font-medium rounded-xl whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span>{icons[idx % icons.length]}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description Banner */}
        <div className="mb-8 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
          <span>{currentCategory.description}</span>
          <span className="font-mono text-zinc-500">{currentCategory.skills.length} core competencies</span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentCategory.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 rounded-xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                    {skill.name}
                  </h3>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <span className="text-amber-400 font-semibold">{skill.level}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="tabular-nums">{skill.experience}</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                  <span className="text-zinc-500 font-mono">Focus: </span>
                  {skill.focus}
                </p>
              </div>

              {/* Progress Bar Indicator */}
              <div className="mt-5 pt-3 border-t border-zinc-800/60 flex items-center gap-3">
                <div className="flex-1 h-1 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{
                      width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '82%' : '68%'
                    }}
                  />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  {skill.level === 'Expert' ? 'Production Master' : skill.level === 'Advanced' ? 'Advanced Scaled' : 'Competent'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
