import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HometownLogo } from './icons/HometownLogo';
import { 
  RuneGithub, 
  RuneCrown, 
  RuneLock, 
  RuneCode, 
  RuneSparkles, 
  RuneArrowRight, 
  RuneCheck, 
  RuneShield,
  RuneExternalLink
} from './icons/RuneIcons';
import { LegalModalTab } from './LegalModal';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenShowcase: () => void;
  onOpenStripe: () => void;
  onOpenNewPost?: () => void;
  onOpenLegal: (tab: LegalModalTab) => void;
  onTriggerToast: (message: string, type?: 'success' | 'info' | 'admin' | 'error') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenShowcase,
  onOpenStripe,
  onOpenNewPost,
  onOpenLegal,
  onTriggerToast,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      onTriggerToast('Please enter a valid email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    onTriggerToast('Subscribed! You will receive roadmap & release digests.', 'success');
    setNewsletterEmail('');
    setTimeout(() => setIsSubscribed(false), 4000);
  };

  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl relative overflow-hidden">
      {/* Top ambient highlight shimmer */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          
          {/* Brand and Mission Column (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 shadow-sm">
                <HometownLogo size={18} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-semibold tracking-tight text-white">Hometown</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-medium">
                  BOARD
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Empowering product teams to listen to user feedback, prioritize high-impact proposals with community voting, and ship transparent public roadmaps.
            </p>

            {/* Live operational status pill */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] text-zinc-300 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-medium text-zinc-200">All Systems Operational</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400 font-mono text-[10px]">PocketBase Live Sync</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400">
                <RuneLock size={11} className="text-zinc-400" />
                <span>Stripe PCI-DSS</span>
              </div>
            </div>

            {/* Newsletter digest subscription */}
            <div className="pt-2">
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Get release & roadmap updates..."
                  className="w-full bg-zinc-900/90 text-xs text-zinc-100 placeholder-zinc-500 px-3 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/20 focus:border-zinc-600 transition-all"
                />
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {isSubscribed ? (
                    <>
                      <RuneCheck size={13} className="text-emerald-600" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <span>Join</span>
                      <RuneArrowRight size={12} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>

          {/* Nav Column 1: Product (2-3 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Product</h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('roadmap')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                >
                  Public Roadmap
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('list')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                >
                  All Proposals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateTab('roadmap')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <span>Kanban Milestones</span>
                  <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">DnD</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenStripe}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left flex items-center gap-1.5 text-zinc-300"
                >
                  <RuneCrown size={12} className="text-amber-400 shrink-0" />
                  <span>Supporter Perks</span>
                  <span className="text-[9px] font-semibold px-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">PRO</span>
                </button>
              </li>
              {onOpenNewPost && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenNewPost}
                    className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                  >
                    Submit Idea
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Nav Column 2: Ecosystem & Developer (2-3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Ecosystem</h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('api')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <RuneCode size={13} className="text-zinc-400 shrink-0" />
                  <span>REST API & Webhooks</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenShowcase}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left flex items-center gap-1.5 text-zinc-300"
                >
                  <RuneSparkles size={13} className="text-blue-400 shrink-0" />
                  <span>Component Showcase</span>
                  <span className="text-[9px] font-mono px-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">Ref.tools</span>
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/DimaAllikvee/feedback-board"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
                >
                  <RuneGithub size={13} className="text-zinc-400 shrink-0" />
                  <span>GitHub Repository</span>
                  <RuneExternalLink size={11} className="text-zinc-500" />
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTriggerToast('Webhooks: Slack & Discord triggers are active on milestone changes.', 'info')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                >
                  Slack & Discord Bots
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Column 3: Trust & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">Trust & Legal</h3>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onTriggerToast('Cookies: Only functional session tokens are stored. No third-party tracking.', 'info')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left"
                >
                  Cookie Settings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-zinc-200 transition-colors cursor-pointer text-left flex items-center gap-1.5"
                >
                  <RuneShield size={12} className="text-emerald-400 shrink-0" />
                  <span>Security & SOC 2</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer bottom bar */}
        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2026 Hometown Technologies Inc.</span>
            <span>•</span>
            <span>Open Source under MIT License.</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://github.com/DimaAllikvee/feedback-board"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Source Code"
              className="hover:text-white transition-colors"
            >
              <RuneGithub size={16} />
            </a>

            <button
              type="button"
              onClick={onOpenShowcase}
              aria-label="Component Showcase"
              className="hover:text-white transition-colors cursor-pointer"
            >
              <RuneSparkles size={16} />
            </button>

            <button
              type="button"
              onClick={() => onOpenLegal('api')}
              aria-label="REST API"
              className="hover:text-white transition-colors cursor-pointer"
            >
              <RuneCode size={16} />
            </button>

            <span className="text-zinc-700">|</span>

            <span className="text-[11px] font-mono text-zinc-400">
              v1.2.0 • PROD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
