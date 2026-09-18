import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Rune from './icons/RuneIcons';
import { 
  RuneX, 
  RunePlus, 
  RuneSearch, 
  RuneCrown, 
  RuneShield, 
  RunePin, 
  RuneMail, 
  RuneLock, 
  RuneMessageSquare
} from './icons/RuneIcons';
import { HometownLogo } from './icons/HometownLogo';
import { StatusBadge, CategoryBadge } from './StatusBadge';
import { UpvoteButton } from './UpvoteButton';
import { UserAvatar } from './ui/UserAvatar';
import { ReactionPill } from './ui/ReactionPill';
import { PasswordToggle } from './ui/PasswordToggle';
import { PostStatus, PostCategory } from '../types';

import { ToastMessage } from './ui/Toast';

interface ShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
}

export const ShowcaseModal: React.FC<ShowcaseModalProps> = ({
  isOpen,
  onClose,
  onTriggerToast,
}) => {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'primitives' | 'badges' | 'interactive' | 'forms' | 'icons'>('primitives');
  const [demoVotes, setDemoVotes] = useState(42);
  const [demoHasVoted, setDemoHasVoted] = useState(false);
  const [demoPassword, setDemoPassword] = useState('supersecret');
  const [showDemoPassword, setShowDemoPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with Emil Kowalski snappy fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 6 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl bg-[#0d0e14] border border-zinc-800 shadow-2xl overflow-hidden z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-100">
              <HometownLogo size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-zinc-100">Component Showcase & Styleguide</h2>
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  Ref.tools Protocol
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Isolated sandbox for inspecting verified design system primitives without prototype gravity.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close showcase modal"
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            <RuneX size={16} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 pb-2 border-b border-zinc-800/60 bg-zinc-950/30 overflow-x-auto no-scrollbar">
          {[
            { id: 'primitives' as const, label: 'Buttons & Upvotes' },
            { id: 'badges' as const, label: 'Badges & Statuses' },
            { id: 'forms' as const, label: 'Inputs & Form Controls' },
            { id: 'interactive' as const, label: 'Reactions & Toasts' },
            { id: 'icons' as const, label: 'Icons & System Glyphs' },
          ].map((tab) => {
            const isActive = activeShowcaseTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveShowcaseTab(tab.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer select-none ${
                  isActive ? 'text-zinc-100 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeShowcaseTab"
                    className="absolute inset-0 rounded-xl bg-zinc-800 border border-zinc-700/80 shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeShowcaseTab === 'primitives' && (
            <div className="space-y-6">
              {/* Buttons */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Button Hierarchy & States
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-colors cursor-pointer shadow-sm"
                  >
                    <RunePlus size={14} />
                    <span>Primary Action</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <RuneCrown size={14} className="text-zinc-400" />
                    <span>Secondary Action</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 bg-rose-950/30 border border-rose-900/50 hover:bg-rose-950/60 transition-colors cursor-pointer"
                  >
                    <span>Destructive</span>
                  </motion.button>

                  <motion.button
                    disabled
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-500 bg-zinc-900/50 border border-zinc-800/40 opacity-50 cursor-not-allowed"
                  >
                    <span>Disabled State</span>
                  </motion.button>
                </div>
              </div>

              {/* Upvote Buttons */}
              <div className="pt-4 border-t border-zinc-800/60">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Upvote Primitives (Tactile Spring & Animated Counters)
                </h3>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[11px] text-zinc-400">Vertical (List Card)</span>
                    <UpvoteButton
                      count={demoVotes}
                      hasVoted={demoHasVoted}
                      onVote={() => {
                        setDemoHasVoted(!demoHasVoted);
                        setDemoVotes(demoHasVoted ? demoVotes - 1 : demoVotes + 1);
                      }}
                      orientation="vertical"
                      isPro={false}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[11px] text-zinc-400">Vertical Supporter (3x Weight)</span>
                    <UpvoteButton
                      count={demoVotes + 12}
                      hasVoted={true}
                      onVote={() => onTriggerToast('Supporter Vote', 'Active +3 priority weight registered', 'success')}
                      orientation="vertical"
                      isPro={true}
                    />
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[11px] text-zinc-400">Horizontal (Kanban Card)</span>
                    <UpvoteButton
                      count={demoVotes}
                      hasVoted={demoHasVoted}
                      onVote={() => {
                        setDemoHasVoted(!demoHasVoted);
                        setDemoVotes(demoHasVoted ? demoVotes - 1 : demoVotes + 1);
                      }}
                      orientation="horizontal"
                      isPro={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'badges' && (
            <div className="space-y-6">
              {/* Status Badges */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Roadmap Status Indicators
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {(['under_review', 'planned', 'in_progress', 'completed'] as PostStatus[]).map((st) => (
                    <StatusBadge key={st} status={st} />
                  ))}
                </div>
              </div>

              {/* Category Badges */}
              <div className="pt-4 border-t border-zinc-800/60">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Feature Categories
                </h3>
                <div className="flex flex-wrap items-center gap-2.5">
                  {(['feature', 'improvement', 'bug', 'integration', 'ui-ux'] as PostCategory[]).map((cat) => (
                    <CategoryBadge key={cat} category={cat} />
                  ))}
                </div>
              </div>

              {/* Role & System Badges */}
              <div className="pt-4 border-t border-zinc-800/60">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Roles & Metadata Badges
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700">
                    <RunePin size={11} className="text-zinc-400" />
                    PINNED
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded-md">
                    <RuneShield size={12} />
                    Admin
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-200 bg-zinc-800 border border-zinc-700 px-2 py-0.5 rounded-md">
                    <RuneCrown size={12} className="text-zinc-400" />
                    Supporter (3x)
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs">
                    <RuneMessageSquare size={13} />
                    <span className="font-mono font-medium text-zinc-200">14</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'forms' && (
            <div className="space-y-4 max-w-md">
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Accessible Form Controls (WCAG AAA Focus Rings)
              </h3>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Email Address Input
                </label>
                <div className="relative flex items-center">
                  <RuneMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="email"
                    defaultValue="developer@hometown.io"
                    className="w-full bg-zinc-900/80 text-xs text-zinc-100 placeholder-zinc-500 pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:border-zinc-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Password with Visibility Toggle
                </label>
                <div className="relative flex items-center">
                  <RuneLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type={showDemoPassword ? 'text' : 'password'}
                    value={demoPassword}
                    onChange={(e) => setDemoPassword(e.target.value)}
                    className="w-full bg-zinc-900/80 text-xs text-zinc-100 placeholder-zinc-500 pl-10 pr-10 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:border-zinc-500 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                    <PasswordToggle
                      isVisible={showDemoPassword}
                      onToggle={() => setShowDemoPassword(!showDemoPassword)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Search with Leading Icon
                </label>
                <div className="relative flex items-center">
                  <RuneSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search proposals, milestones, topics..."
                    className="w-full bg-zinc-900/80 text-xs text-zinc-100 placeholder-zinc-500 pl-10 pr-3.5 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 focus:border-zinc-500 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeShowcaseTab === 'interactive' && (
            <div className="space-y-6">
              {/* Reactions */}
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Semantic Reaction System (Rare-UI delight)
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <ReactionPill postId="showcase-demo-post" />
                </div>
              </div>

              {/* Toast Triggers */}
              <div className="pt-4 border-t border-zinc-800/60">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Notification Stack Previews
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onTriggerToast('Proposal Created', 'Your feature idea is now live on the board', 'success')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-medium hover:bg-emerald-950/70 transition-colors cursor-pointer"
                  >
                    Trigger Success Toast
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerToast('Vote Registered', '+3 Supporter Priority Votes recorded', 'info')}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    Trigger Info Toast
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerToast('Status Updated', 'Roadmap milestone moved to Planned', 'admin')}
                    className="px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-medium hover:bg-purple-950/70 transition-colors cursor-pointer"
                  >
                    Trigger Admin Toast
                  </button>

                  <button
                    type="button"
                    onClick={() => onTriggerToast('Connection Failed', 'Could not reach server. Retrying in 5s...', 'error')}
                    className="px-3 py-1.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-medium hover:bg-rose-950/70 transition-colors cursor-pointer"
                  >
                    Trigger Error Toast
                  </button>
                </div>
              </div>

              {/* User Avatars */}
              <div className="pt-4 border-t border-zinc-800/60">
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Consistent User Avatars (Sizes xs, sm, md)
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <UserAvatar name="Alex Vance" size="xs" />
                    <span className="text-xs text-zinc-400">xs (20px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserAvatar name="Elena Rostova" size="sm" />
                    <span className="text-xs text-zinc-400">sm (28px)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserAvatar name="Marcus Chen" size="md" />
                    <span className="text-xs text-zinc-400">md (36px)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ICONS & SYSTEM GLYPHS TAB */}
          {activeShowcaseTab === 'icons' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Pixel-Perfect Geometric SVG Icons (Lucide & Simple Icons)
                </h3>
                <p className="text-xs text-zinc-500">
                  Calibrated 24x24 stroke vectors with concentric alignment and no raster artifacts.
                </p>
              </div>

              {[
                {
                  group: 'Navigation & Structure',
                  icons: [
                    { name: 'RuneKanban', icon: Rune.RuneKanban },
                    { name: 'RuneList', icon: Rune.RuneList },
                    { name: 'RuneSearch', icon: Rune.RuneSearch },
                    { name: 'RuneFilter', icon: Rune.RuneFilter },
                    { name: 'RuneArrowUpDown', icon: Rune.RuneArrowUpDown },
                    { name: 'RuneLayers', icon: Rune.RuneLayers },
                    { name: 'RuneChevronUp', icon: Rune.RuneChevronUp },
                    { name: 'RuneChevronDown', icon: Rune.RuneChevronDown },
                    { name: 'RuneArrowRight', icon: Rune.RuneArrowRight },
                  ],
                },
                {
                  group: 'Actions & Utilities',
                  icons: [
                    { name: 'RunePlus', icon: Rune.RunePlus },
                    { name: 'RuneCheck', icon: Rune.RuneCheck },
                    { name: 'RuneCheckCheck', icon: Rune.RuneCheckCheck },
                    { name: 'RuneCircleCheck', icon: Rune.RuneCircleCheck },
                    { name: 'RuneCopy', icon: Rune.RuneCopy },
                    { name: 'RuneEdit', icon: Rune.RuneEdit },
                    { name: 'RuneTrash', icon: Rune.RuneTrash },
                    { name: 'RuneSend', icon: Rune.RuneSend },
                    { name: 'RuneRotateCcw', icon: Rune.RuneRotateCcw },
                    { name: 'RuneInbox', icon: Rune.RuneInbox },
                    { name: 'RuneX', icon: Rune.RuneX },
                    { name: 'RuneGripVertical', icon: Rune.RuneGripVertical },
                  ],
                },
                {
                  group: 'Categories & Topics',
                  icons: [
                    { name: 'RuneCode (Feature)', icon: Rune.RuneCode },
                    { name: 'RuneZap (Improvement)', icon: Rune.RuneZap },
                    { name: 'RuneBug (Bug Report)', icon: Rune.RuneBug },
                    { name: 'RunePlug (Integration)', icon: Rune.RunePlug },
                    { name: 'RunePalette (UI / UX)', icon: Rune.RunePalette },
                  ],
                },
                {
                  group: 'Statuses & Reactions',
                  icons: [
                    { name: 'RuneClock', icon: Rune.RuneClock },
                    { name: 'RuneCompass', icon: Rune.RuneCompass },
                    { name: 'RuneSparkles', icon: Rune.RuneSparkles },
                    { name: 'RuneFlame', icon: Rune.RuneFlame },
                    { name: 'RuneThumbsUp', icon: Rune.RuneThumbsUp },
                    { name: 'RuneHeart', icon: Rune.RuneHeart },
                    { name: 'RuneLightbulb', icon: Rune.RuneLightbulb },
                    { name: 'RuneBookmark', icon: Rune.RuneBookmark },
                    { name: 'RuneAlertTriangle', icon: Rune.RuneAlertTriangle },
                  ],
                },
                {
                  group: 'Security & Auth',
                  icons: [
                    { name: 'RuneUser', icon: Rune.RuneUser },
                    { name: 'RuneCrown', icon: Rune.RuneCrown },
                    { name: 'RuneShield', icon: Rune.RuneShield },
                    { name: 'RuneShieldCheck', icon: Rune.RuneShieldCheck },
                    { name: 'RuneLock', icon: Rune.RuneLock },
                    { name: 'RuneLogOut', icon: Rune.RuneLogOut },
                    { name: 'RuneEye', icon: Rune.RuneEye },
                    { name: 'RuneEyeOff', icon: Rune.RuneEyeOff },
                  ],
                },
                {
                  group: 'Developer & Official Brands',
                  icons: [
                    { name: 'RuneTerminal', icon: Rune.RuneTerminal },
                    { name: 'RuneBookOpen', icon: Rune.RuneBookOpen },
                    { name: 'RuneGithub', icon: Rune.RuneGithub },
                    { name: 'RuneGoogle', icon: Rune.RuneGoogle },
                    { name: 'RuneDiscord', icon: Rune.RuneDiscord },
                    { name: 'RuneXTwitter', icon: Rune.RuneXTwitter },
                    { name: 'RuneSlack', icon: Rune.RuneSlack },
                  ],
                },
              ].map((section) => (
                <div key={section.group} className="space-y-2.5">
                  <h4 className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider">
                    {section.group}
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                    {section.icons.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.name}
                          className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-200 shrink-0">
                            <Icon size={16} />
                          </div>
                          <span className="text-[11px] font-mono text-zinc-300 truncate">
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800/80 bg-zinc-950/50 flex items-center justify-between text-xs text-zinc-500">
          <span>Design tokens: Tailwind v4 / HSL curated neutrals</span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-medium transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
