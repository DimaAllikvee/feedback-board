import React from 'react';
import { motion } from 'framer-motion';
import { RuneX, RuneShield } from './icons/RuneIcons';
import { HometownLogo } from './icons/HometownLogo';

export type LegalModalTab = 'privacy' | 'terms' | 'api';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalModalTab;
  onClose: () => void;
  onTabChange: (tab: LegalModalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800/90 rounded-2xl shadow-2xl z-10 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-900/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100">
              <HometownLogo size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                {activeTab === 'privacy' && 'Privacy Policy & Data Protection'}
                {activeTab === 'terms' && 'Terms of Service & Community Guidelines'}
                {activeTab === 'api' && 'REST API & Webhook Specifications'}
              </h2>
              <p className="text-[11px] text-zinc-400">
                Hometown Board • Production Compliance v1.0
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <RuneX size={16} />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-zinc-800/60 bg-zinc-950">
          <button
            type="button"
            onClick={() => onTabChange('privacy')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-zinc-200 text-zinc-100'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => onTabChange('terms')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'terms'
                ? 'border-zinc-200 text-zinc-100'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Terms of Service
          </button>
          <button
            type="button"
            onClick={() => onTabChange('api')}
            className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
              activeTab === 'api'
                ? 'border-zinc-200 text-zinc-100'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            API Reference
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed text-zinc-300">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">1. Information We Collect</h3>
                <p className="text-zinc-400">
                  Hometown collects only the essential data necessary to deliver community feedback and roadmap features. This includes user profile identifiers (name, verified email, avatar URL) provided during registration or OAuth sign-in (GitHub and Google).
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">2. Zero Tracking & No Ad Networks</h3>
                <p className="text-zinc-400">
                  We do not sell, rent, or monetize your personal information. We do not use third-party analytics trackers or behavioral advertising cookies. All session data is securely stored in our self-hosted PocketBase database with strict Access Control Lists (ACL).
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">3. Payment Information & Stripe</h3>
                <p className="text-zinc-400">
                  Supporter memberships and transactions are handled exclusively through Stripe Checkout. Hometown never stores, transmits, or has access to your full credit card numbers or banking secrets. Stripe complies with PCI-DSS Level 1 standards.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">4. GDPR & Data Deletion Rights</h3>
                <p className="text-zinc-400">
                  You retain full ownership of your data. You may request complete export or deletion of your account and submitted proposals at any time by contacting our workspace administrators.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">1. Community & Fair Use</h3>
                <p className="text-zinc-400">
                  Hometown is built for authentic product discussions, transparent feature proposals, and collaborative roadmap planning. Automated voting bots, vote manipulation, spam, or harassment are strictly prohibited and result in immediate account termination.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">2. Public Submissions & Intellectual Property</h3>
                <p className="text-zinc-400">
                  Feedback, ideas, and comments submitted to public boards are visible to the community. By posting proposals, you grant the workspace team permission to evaluate, prioritize, and implement suggested features into the product roadmap.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">3. Open Source Software Notice</h3>
                <p className="text-zinc-400">
                  FeedbackPulse / Hometown is crafted using open-source technologies including React, Tailwind CSS, Framer Motion, and PocketBase under the permissive MIT License.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">REST API Endpoints</h3>
                <p className="text-zinc-400 mb-2">
                  All community data can be accessed programmatically via standard JSON REST endpoints backed by PocketBase:
                </p>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center justify-between">
                    <span>GET /api/collections/posts/records</span>
                    <span className="text-emerald-400 text-[10px] font-sans font-medium">Public Read</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center justify-between">
                    <span>POST /api/collections/posts/records</span>
                    <span className="text-amber-400 text-[10px] font-sans font-medium">Auth Required</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center justify-between">
                    <span>GET /api/collections/comments/records</span>
                    <span className="text-emerald-400 text-[10px] font-sans font-medium">Public Read</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 flex items-center justify-between">
                    <span>POST /api/collections/users/auth-with-oauth2</span>
                    <span className="text-blue-400 text-[10px] font-sans font-medium">OAuth2 Flow</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-100 mb-1">Webhook Dispatchers</h3>
                <p className="text-zinc-400">
                  Engineering teams can configure webhooks to automatically forward newly submitted proposals or high-priority milestone changes directly to Slack, Discord, or Jira.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-800/80 bg-zinc-900/40 flex items-center justify-between">
          <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
            <RuneShield size={12} className="text-emerald-400" />
            <span>SSL 256-bit Encryption Verified</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};
