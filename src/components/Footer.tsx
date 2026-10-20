import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-800 bg-zinc-950 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-sm bg-amber-400" />
            <span className="font-bold text-zinc-200">Naman Jain</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span>Full-Stack Software Engineer</span>
            <span aria-hidden="true" className="text-zinc-700">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Quick links & Back to Top */}
          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="hover:text-zinc-200 transition-colors"
            >
              Projects
            </a>
            <a
              href="#architecture"
              className="hover:text-zinc-200 transition-colors"
            >
              Architecture
            </a>
            <a
              href="#skills"
              className="hover:text-zinc-200 transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="hover:text-zinc-200 transition-colors"
            >
              Experience
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-200 transition-colors"
            >
              Contact
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-zinc-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono text-[11px]">Top</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400 font-mono">
          <div>
            Built with React 19, TypeScript, Tailwind CSS & Motion. Handcrafted for sub-second static performance.
          </div>
          <div>
            {PERSONAL_INFO.email}
          </div>
        </div>
      </div>
    </footer>
  );
};
