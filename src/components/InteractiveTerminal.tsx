import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Send, CornerDownLeft, Sparkles, Check, Copy } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES } from '../data/portfolioData.ts';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  time: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1.5 text-zinc-300">
          <p className="text-amber-400 font-bold">
            Welcome to Naman Jain's Interactive Engineering Shell (v4.2-static)
          </p>
          <p className="text-zinc-400 text-xs">
            Type <span className="text-amber-300 font-mono">help</span> or click any suggested command below to inspect system architecture, skills, and projects.
          </p>
        </div>
      ),
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Track command in history
    setCommandHistory(prev => [...prev, rawCmd]);
    setHistoryIndex(-1);

    let output: React.ReactNode;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs">
            <div className="text-amber-400 font-semibold mb-1">Available Interactive Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-zinc-300">
              <div><span className="text-amber-300 font-mono">skills</span> — Full breakdown of technical stack</div>
              <div><span className="text-amber-300 font-mono">projects</span> — List production full-stack systems</div>
              <div><span className="text-amber-300 font-mono">experience</span> — Professional engineering roles</div>
              <div><span className="text-amber-300 font-mono">bio</span> — Developer philosophy & background</div>
              <div><span className="text-amber-300 font-mono">stats</span> — Production metrics & benchmarks</div>
              <div><span className="text-amber-300 font-mono">contact</span> — Get direct email & social links</div>
              <div><span className="text-amber-300 font-mono">clear</span> — Reset terminal buffer</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-2 text-xs">
            <div className="text-amber-400 font-semibold">Core Technical Stack:</div>
            {SKILL_CATEGORIES.map(cat => (
              <div key={cat.name} className="border-l-2 border-zinc-800 pl-2">
                <span className="text-zinc-200 font-bold">{cat.name}: </span>
                <span className="text-zinc-400">
                  {cat.skills.map(s => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-2 text-xs">
            <div className="text-amber-400 font-semibold">Active Production Projects:</div>
            {PROJECTS.map(p => (
              <div key={p.id} className="p-2 rounded bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center justify-between text-zinc-200 font-bold">
                  <span>{p.title}</span>
                  <span className="text-[11px] text-zinc-400 font-normal">{p.category}</span>
                </div>
                <div className="text-zinc-400 mt-0.5">{p.tagline}</div>
                <div className="text-[11px] text-amber-300/90 font-mono mt-1">
                  Stack: {p.technologies.slice(0, 4).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        output = (
          <div className="space-y-2 text-xs">
            <div className="text-amber-400 font-semibold">Career Milestones:</div>
            <div className="space-y-1.5 text-zinc-300">
              <div>
                <span className="text-zinc-100 font-bold">HyperScale Labs</span> (2024–Present) · Senior Full-Stack Engineer
                <div className="text-zinc-400 pl-2">Multiplayer canvas, Go microservices, 120k+ MAU, 34% AWS cost cut.</div>
              </div>
              <div>
                <span className="text-zinc-100 font-bold">Continuum Tech</span> (2022–2024) · Full-Stack Software Developer
                <div className="text-zinc-400 pl-2">Analytics dashboard, internal UI system, BullMQ worker queues.</div>
              </div>
              <div>
                <span className="text-zinc-100 font-bold">OpenCloud Systems</span> (2021–2022) · Software Engineering Intern
                <div className="text-zinc-400 pl-2">Go telemetry scrapers, developer CLI tools, automated documentation.</div>
              </div>
            </div>
          </div>
        );
        break;

      case 'bio':
        output = (
          <div className="text-xs text-zinc-300 leading-relaxed space-y-1">
            <p className="text-amber-400 font-semibold">About Naman Jain:</p>
            <p>{PERSONAL_INFO.bio}</p>
            <p className="text-zinc-400 mt-1">
              Location: {PERSONAL_INFO.location}
            </p>
          </div>
        );
        break;

      case 'stats':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {PERSONAL_INFO.stats.map(s => (
              <div key={s.label} className="p-2 rounded bg-zinc-900 border border-zinc-800">
                <div className="text-lg font-bold font-mono text-amber-400">{s.value}</div>
                <div className="text-zinc-300">{s.label}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1.5 text-xs text-zinc-300">
            <div className="text-amber-400 font-semibold">Direct Communication Channels:</div>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-amber-300 underline">{PERSONAL_INFO.email}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-200 underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-200 underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs text-rose-400">
            zsh: command not found: <span className="font-mono text-zinc-200">{rawCmd}</span>. Type <span className="text-amber-300 font-mono cursor-pointer underline" onClick={() => executeCommand('help')}>help</span> for valid commands.
          </div>
        );
        break;
    }

    setHistory(prev => [
      ...prev,
      {
        command: rawCmd,
        output,
        time: new Date().toLocaleTimeString()
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    }
  };

  const quickCommands = ['help', 'projects', 'skills', 'experience', 'stats', 'contact'];

  return (
    <section id="terminal" className="py-20 md:py-28 relative scroll-mt-20 border-t border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-2">
            Developer Interactive Shell
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-2">
            CLI Playground
          </h2>
          <p className="text-sm text-zinc-400">
            Execute direct terminal queries to inspect my systems, dependencies, and benchmarks.
          </p>
        </div>

        {/* Quick Command Suggestions (Functional Buttons) */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-mono text-zinc-500">Quick run:</span>
          {quickCommands.map(cmd => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-amber-400 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded transition-colors cursor-pointer"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden font-mono">
          {/* Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-zinc-300">naman@fullstack: ~</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>bash / zsh</span>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div
            className="p-5 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto text-xs"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400">naman@workstation</span>
                  <span className="text-zinc-600">:</span>
                  <span className="text-amber-400">~</span>
                  <span className="text-zinc-300">$ {entry.command}</span>
                  <span className="ml-auto text-[10px] text-zinc-600">{entry.time}</span>
                </div>
                <div className="pl-4 border-l border-zinc-800/80">
                  {entry.output}
                </div>
              </div>
            ))}
            <div ref={terminalBottomRef} />
          </div>

          {/* Terminal Input Bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 bg-zinc-900/60 border-t border-zinc-800">
            <span className="text-emerald-400 text-xs font-mono font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type a command (e.g. skills, projects, contact, stats)..."
              className="flex-1 bg-transparent text-xs font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="p-1.5 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="Execute Command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
