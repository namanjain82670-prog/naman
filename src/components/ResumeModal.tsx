import React from 'react';
import { X, Download, Printer, CheckCircle2, MapPin, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE_ITEMS, SKILL_CATEGORIES } from '../data/portfolioData.ts';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const content = `# Naman Jain — Full-Stack Software Engineer
Email: ${PERSONAL_INFO.email}
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}

## Summary
${PERSONAL_INFO.bio}

## Core Competencies
${SKILL_CATEGORIES.map(c => `- **${c.name}**: ${c.skills.map(s => s.name).join(', ')}`).join('\n')}

## Experience
${EXPERIENCE_ITEMS.map(e => `### ${e.role} — ${e.company} (${e.period})
${e.summary}
${e.highlights.map(h => `- ${h}`).join('\n')}
Tech: ${e.technologies.join(', ')}
`).join('\n')}
`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Naman_Jain_Resume.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-amber-400 font-bold">CV / RESUME</span>
            <span aria-hidden="true">·</span>
            <span>Naman Jain</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="px-3 py-1.5 text-xs font-mono font-medium text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download MD</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Viewable Resume Sheet */}
        <div className="overflow-y-auto p-8 sm:p-12 space-y-8 bg-zinc-900 text-zinc-200">
          {/* Header */}
          <div className="border-b border-zinc-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Naman Jain</h1>
                <div className="text-base text-amber-400 font-medium mt-1">
                  Full-Stack Software Engineer & Distributed Systems Craftsman
                </div>
              </div>
              <div className="text-xs font-mono text-zinc-400 space-y-1">
                <div>{PERSONAL_INFO.email}</div>
                <div>{PERSONAL_INFO.location}</div>
                <div>github.com/namanjain</div>
              </div>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed mt-4 max-w-3xl">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Core Competencies */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map(cat => (
                <div key={cat.name} className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                  <div className="font-bold text-zinc-200 mb-1">{cat.name}</div>
                  <div className="text-zinc-400 leading-relaxed">
                    {cat.skills.map(s => s.name).join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-4">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCE_ITEMS.map((item) => (
                <div key={item.period} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-bold text-zinc-100">
                      {item.role} <span className="font-normal text-zinc-400">· {item.company}</span>
                    </div>
                    <div className="text-xs font-mono text-amber-400">{item.period}</div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                  <ul className="space-y-1">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-zinc-300 flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-[11px] font-mono text-zinc-500 pt-1">
                    Stack: {item.technologies.join(' · ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Open Source */}
          <div className="border-t border-zinc-800 pt-6">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">
              Education & Contributions
            </h2>
            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex justify-between">
                <div>
                  <span className="font-bold text-zinc-200">Bachelor of Technology in Computer Science & Engineering</span>
                  <div className="text-zinc-400">Focus on Distributed Systems, Algorithms & Operating Systems</div>
                </div>
                <div className="font-mono text-zinc-500">First Class with Distinction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
