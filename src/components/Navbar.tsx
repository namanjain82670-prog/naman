import React, { useState, useEffect } from 'react';
import { Mail, ArrowUpRight, Menu, X, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Terminal', href: '#terminal' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Strictly compliant 3-zone Top Bar Contract: Brand — 4-5 Links — 1 Primary Action */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-zinc-100 hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group"
          >
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            <span>Naman Jain</span>
            <span className="hidden sm:inline text-xs font-mono font-normal text-zinc-500 ml-1">/ Full-Stack</span>
          </a>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="hover:text-zinc-100 hover:underline underline-offset-8 decoration-amber-400/60 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenResume}
              className="px-3.5 py-1.5 text-xs font-mono font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <button
              onClick={onOpenContact}
              className="px-4 py-1.5 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-all shadow-sm shadow-amber-400/20 hover:shadow-amber-400/40 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-zinc-100 border border-zinc-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-zinc-950/95 border-b border-zinc-800 px-6 py-5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-zinc-300 hover:text-amber-400 py-2 border-b border-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="flex-1 py-2 text-xs font-mono text-zinc-300 border border-zinc-800 rounded-md flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="flex-1 py-2 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 rounded-md flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
