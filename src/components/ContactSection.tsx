import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Github, Linkedin, ArrowUpRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // Trigger native mailto link as fallback to initiate user client
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject || 'Engineering Inquiry')}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative scroll-mt-20 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Outreach Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-mono font-medium text-amber-400 uppercase tracking-wider mb-2">
                Initiate Conversation
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
                Let's Build Something Exceptional
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed">
                Whether you have an ambitious full-stack architecture challenge, need distributed systems guidance, or are seeking a lead engineer for your engineering squad, my inbox is open.
              </p>
            </div>

            {/* Email Card with 1-Click Copy */}
            <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl space-y-4">
              <div className="text-xs font-mono text-zinc-400 flex items-center justify-between">
                <span>Direct Inquiries</span>
                <span className="text-emerald-400">Response within 24h</span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="font-mono text-sm text-zinc-200 truncate">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-mono font-medium text-zinc-300 hover:text-zinc-100 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                  title="Copy email"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 text-xs font-mono text-zinc-300 hover:text-zinc-100 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 text-xs font-mono text-zinc-300 hover:text-zinc-100 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-400 flex items-center justify-between">
              <span>Looking for comprehensive credentials?</span>
              <button
                onClick={onOpenResume}
                className="text-amber-400 hover:text-amber-300 font-medium underline underline-offset-4 cursor-pointer"
              >
                Inspect Full Resume →
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100 mb-6">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                <span>Send a Direct Message</span>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-bold text-zinc-100">Message Prepared!</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Your default mail application has been prompted with your message pre-filled to <strong className="text-zinc-200">{PERSONAL_INFO.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-mono text-amber-400 hover:text-amber-300 border border-zinc-800 rounded-lg"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack Role / Engineering Architecture Discussion"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your team, system goals, or project scope..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-amber-400 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 text-xs font-semibold text-zinc-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-lg transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? 'Preparing Transmission...' : 'Transmit Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
