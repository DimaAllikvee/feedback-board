import React from 'react';
import { HometownLogo } from './icons/HometownLogo';
import { 
  RuneGithub, 
  RuneSparkles, 
  RuneTerminal,
  RuneCrown,
  RuneShieldCheck,
  RuneDiscord
} from './icons/RuneIcons';
import { LegalModalTab } from './LegalModal';
import { ActiveTab } from '../types';

interface FooterProps {
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenShowcase: () => void;
  onOpenStripe: () => void;
  onOpenLegal: (tab: LegalModalTab) => void;
}

/**
 * Minimal, Production-Ready SaaS Footer
 * Inspired by 21st.dev, Linear.app, and Cal.com Coss
 * Uncluttered, purposeful, high-signal footer for real application dashboards.
 */
export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenShowcase,
  onOpenStripe,
  onOpenLegal,
}) => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl relative select-none">
      {/* Subtle top ambient glow line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          
          {/* Left: Brand + Live System Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100 shadow-sm">
                <HometownLogo size={14} />
              </div>
              <span className="font-semibold text-zinc-200 tracking-tight">Hometown</span>
            </div>

            <span className="text-zinc-700">•</span>

            {/* Live Operational Status Pill (21st.dev / Cal.com style) */}
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Operational</span>
            </div>

            <span className="text-zinc-700 hidden sm:inline">•</span>

            <span className="text-zinc-500 text-[11px] hidden sm:inline">
              © {new Date().getFullYear()} Hometown Technologies
            </span>
          </div>

          {/* Center / Nav: Clean, high-signal links */}
          <nav className="flex items-center gap-5 text-zinc-400 flex-wrap justify-center font-medium">
            <button
              type="button"
              onClick={() => onNavigateTab('roadmap')}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Roadmap
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('list')}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Proposals
            </button>
            <button
              type="button"
              onClick={onOpenStripe}
              className="hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <RuneCrown size={12} className="text-amber-400" />
              <span>Supporter</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Privacy
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              Terms
            </button>
            <button
              type="button"
              onClick={() => onOpenLegal('api')}
              className="hover:text-zinc-100 transition-colors cursor-pointer"
            >
              API Docs
            </button>
          </nav>

          {/* Right: Social & System Badges */}
          <div className="flex items-center gap-3 text-zinc-400">
            <button
              type="button"
              onClick={onOpenShowcase}
              aria-label="Component Showcase"
              title="UI Component Showcase"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
            >
              <RuneSparkles size={14} />
            </button>

            <button
              type="button"
              onClick={() => onOpenLegal('api')}
              aria-label="REST API & Developer Docs"
              title="REST API Endpoints & Docs"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors cursor-pointer"
            >
              <RuneTerminal size={14} />
            </button>

            <a
              href="https://discord.gg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord Community"
              title="Join Discord Community"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-[#5865F2] hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
            >
              <RuneDiscord size={14} />
            </a>

            <a
              href="https://github.com/DimaAllikvee/feedback-board"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              title="View on GitHub"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-colors"
            >
              <RuneGithub size={14} />
            </a>

            <span className="text-zinc-800">|</span>

            <div 
              title="Stripe PCI-DSS Certified Checkout"
              className="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-zinc-300 cursor-default"
            >
              <RuneShieldCheck size={13} className="text-emerald-400" />
              <span>Stripe</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
