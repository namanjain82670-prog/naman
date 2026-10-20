import React, { useState } from 'react';
import { ArrowUpRight, Zap, ExternalLink, Github, Layers, Server, Activity, ShieldCheck } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData.ts';
import { ProjectModal } from './ProjectModal.tsx';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'Full-Stack', 'Distributed Systems', 'Developer Tools', 'Creative Web'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-2">
              Featured Engineering Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
              Selected Works & Architecture
            </h2>
          </div>

          {/* Interactive Filter Controls (Functional Button Tabs) */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, index) => {
            // Give first 2 featured items a prominent bento spread
            const isWide = index === 0 || index === 1;
            const gridSpan = isWide ? 'lg:col-span-6' : 'lg:col-span-4';

            return (
              <div
                key={project.id}
                onClick={() => setActiveModalProject(project)}
                className={`${gridSpan} group relative rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer shadow-lg hover:shadow-black/40`}
              >
                {/* Visual Media Header (if image exists) */}
                {project.image ? (
                  <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-zinc-950 border-b border-zinc-800/80">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                    
                    {/* Overlay chip */}
                    <div className="absolute top-4 left-4 text-xs font-mono text-zinc-300 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded border border-zinc-800">
                      {project.category}
                    </div>

                    <div className="absolute top-4 right-4 p-2 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-300 group-hover:text-amber-400 group-hover:bg-zinc-900 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-center justify-between">
                    {/* Unboxed category tag */}
                    <span className="text-xs font-mono text-amber-400 font-medium">
                      {project.category}
                    </span>
                    <div className="p-1.5 rounded-full text-zinc-500 group-hover:text-amber-400 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100 group-hover:text-amber-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                      {project.tagline}
                    </p>
                  </div>

                  <div>
                    {/* Primary Highlight Metrics - Clean tabular figures */}
                    <div className="grid grid-cols-2 gap-2 py-3 border-y border-zinc-800/70 mb-4">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label}>
                          <div className="text-base font-bold font-mono text-zinc-200 tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Clean unboxed tech list with typographic separators */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-400">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span key={tech} className="flex items-center gap-1.5">
                          <span>{tech}</span>
                          {i < Math.min(project.technologies.length, 4) - 1 && (
                            <span aria-hidden="true" className="text-zinc-600">·</span>
                          )}
                        </span>
                      ))}
                    </div>

                    {/* Click prompt */}
                    <div className="mt-4 pt-3 flex items-center justify-between text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">
                      <span>Click to inspect case study</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
