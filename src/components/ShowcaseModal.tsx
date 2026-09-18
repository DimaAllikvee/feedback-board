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
import { GooeyTooltip } from './ui/GooeyTooltip';
import { Plus, Upload, FolderGit2, Copy, Check, Heart } from 'lucide-react';
import { PostStatus, PostCategory } from '../types';

import { ToastMessage } from './ui/Toast';
import { TextMorph } from 'torph/react';

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
  const [activeShowcaseTab, setActiveShowcaseTab] = useState<'primitives' | 'badges' | 'forms' | 'interactive' | 'textmorph' | 'gooey' | 'icons'>('primitives');
  const [demoVotes, setDemoVotes] = useState(42);
  const [demoHasVoted, setDemoHasVoted] = useState(false);
  const [demoPassword, setDemoPassword] = useState('supersecret');
  const [showDemoPassword, setShowDemoPassword] = useState(false);
  const [gooeyPreset, setGooeyPreset] = useState<'original' | 'saas' | 'social'>('original');
  const [gooeyCanvasTheme, setGooeyCanvasTheme] = useState<'light' | 'dark'>('light');
  const [hasCopiedCode, setHasCopiedCode] = useState(false);

  // TextMorph showcase state
  const [morphStatusIdx, setMorphStatusIdx] = useState(0);
  const [morphNumber, setMorphNumber] = useState(1240);
  const [morphButtonState, setMorphButtonState] = useState<'idle' | 'copied' | 'ready'>('idle');
  const [morphCustomText, setMorphCustomText] = useState('FeedbackPulse v2.0');

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
            { id: 'textmorph' as const, label: 'TextMorph Dynamics' },
            { id: 'forms' as const, label: 'Inputs & Form Controls' },
            { id: 'interactive' as const, label: 'Reactions & Toasts' },
            { id: 'gooey' as const, label: 'Liquid Gooey Motion' },
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

          {/* TEXTMORPH DYNAMICS TAB */}
          {activeShowcaseTab === 'textmorph' && (
            <div className="space-y-6">
              {/* Header & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-zinc-100">
                      TextMorph Motion Engine
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
                      torph v0.1.3 · 0 Deps
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Spring-driven character & numeric place-value morphing (by Lochie Axon). Replaces abrupt layout jumps with fluid character interpolation.
                  </p>
                </div>
              </div>

              {/* Grid with Interactive Demos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Status Label Transitions */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-zinc-300">1. Roadmap Status Morph</span>
                      <span className="text-[10px] font-mono text-zinc-500">Live StatusBadge</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4">
                      When posts change status on the Kanban board or detail modal, individual characters morph smoothly in place.
                    </p>
                    <div className="flex items-center justify-center p-6 rounded-xl bg-zinc-950/60 border border-zinc-800/60 min-h-[90px]">
                      <StatusBadge
                        status={
                          (['under_review', 'planned', 'in_progress', 'completed', 'closed'] as PostStatus[])[
                            morphStatusIdx % 5
                          ]
                        }
                        size="md"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMorphStatusIdx((i) => (i + 1) % 5)}
                    className="w-full py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Rune.RuneRotateCcw size={13} />
                    <span>Next Roadmap Status</span>
                  </button>
                </div>

                {/* 2. Numeric Place-Value Sliding */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-zinc-300">2. Numeric Place-Value Sliding</span>
                      <span className="text-[10px] font-mono text-zinc-500">numbers=&#123;true&#125;</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4">
                      Digits match by place value (ones to ones, tens to tens) so counter transitions never distort layout.
                    </p>
                    <div className="flex items-center justify-center p-6 rounded-xl bg-zinc-950/60 border border-zinc-800/60 min-h-[90px]">
                      <div className="text-3xl font-extrabold text-zinc-100 font-mono tracking-tight">
                        $<TextMorph as="span" numbers ease={{ stiffness: 220, damping: 22 }}>
                          {morphNumber}
                        </TextMorph>
                        <span className="text-xs font-normal text-zinc-400 ml-1">/mo ARR</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setMorphNumber((n) => n + 1)}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700/60 transition-colors cursor-pointer"
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      onClick={() => setMorphNumber((n) => n + 50)}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700/60 transition-colors cursor-pointer"
                    >
                      +50
                    </button>
                    <button
                      type="button"
                      onClick={() => setMorphNumber((n) => Math.max(10, n - 25))}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700/60 transition-colors cursor-pointer"
                    >
                      -25
                    </button>
                    <button
                      type="button"
                      onClick={() => setMorphNumber(Math.floor(Math.random() * 9000 + 1000))}
                      className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700/60 transition-colors cursor-pointer"
                    >
                      Random
                    </button>
                  </div>
                </div>

                {/* 3. Action Button Label Feedback */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-zinc-300">3. Button State Feedback</span>
                      <span className="text-[10px] font-mono text-zinc-500">Zero Lag</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4">
                      Replaces flash-of-content button state changes with seamless letter morphing.
                    </p>
                    <div className="flex items-center justify-center p-6 rounded-xl bg-zinc-950/60 border border-zinc-800/60 min-h-[90px]">
                      <button
                        type="button"
                        onClick={() => {
                          if (morphButtonState === 'idle') {
                            setMorphButtonState('copied');
                            onTriggerToast('Link Copied', 'Share URL copied to clipboard', 'info');
                            setTimeout(() => setMorphButtonState('ready'), 2200);
                            setTimeout(() => setMorphButtonState('idle'), 4500);
                          }
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm ${
                          morphButtonState === 'copied'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : morphButtonState === 'ready'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : 'bg-zinc-100 text-zinc-950 hover:bg-white border border-transparent'
                        }`}
                      >
                        {morphButtonState === 'copied' ? (
                          <Check size={14} className="text-emerald-400 shrink-0" />
                        ) : morphButtonState === 'ready' ? (
                          <Rune.RuneShare size={14} className="text-blue-400 shrink-0" />
                        ) : (
                          <Copy size={14} className="text-zinc-950 shrink-0" />
                        )}
                        <TextMorph as="span" ease={{ stiffness: 260, damping: 24 }}>
                          {morphButtonState === 'copied'
                            ? 'Copied to Clipboard!'
                            : morphButtonState === 'ready'
                            ? 'Ready for Sharing'
                            : 'Copy Shareable Link'}
                        </TextMorph>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-500 text-center">
                    Click the button above to observe the smooth letter morphing and color transition.
                  </p>
                </div>

                {/* 4. Live Custom Text Playground */}
                <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-zinc-300">4. Live Custom Playground</span>
                      <span className="text-[10px] font-mono text-zinc-500">Interactive</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-2">
                      Type anything or pick a preset to see characters rearrange dynamically:
                    </p>
                    <input
                      type="text"
                      value={morphCustomText}
                      onChange={(e) => setMorphCustomText(e.target.value)}
                      placeholder="Type custom text..."
                      className="w-full bg-zinc-950 text-xs text-zinc-100 placeholder-zinc-500 px-3 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-400/30 mb-3"
                    />
                    <div className="flex items-center justify-center p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 min-h-[70px]">
                      <TextMorph
                        as="div"
                        ease={{ stiffness: 200, damping: 20 }}
                        className="text-lg font-bold text-cyan-400 font-mono text-center tracking-tight"
                      >
                        {morphCustomText || 'Start typing above...'}
                      </TextMorph>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      'FeedbackPulse v2.0',
                      'Fluid Micro-interactions',
                      'Zero Dependency Springs',
                      'Ship Features Faster',
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setMorphCustomText(preset)}
                        className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-mono border border-zinc-700/60 transition-colors cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications & Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Zero Dependencies
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    npm i torph
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    0 external runtime dependencies. Pure CSS translate transforms and rAF spring physics.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    Place-Value Alignment
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    numbers=&#123;true&#125;
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Digits slide vertically according to place value (units, tens, hundreds) instead of simple character shifts.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Spring Physics
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    stiffness: 220, damping: 22
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Emil Kowalski protocol compliance: snappy springs, zero lag, purposeful micro-feedback.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LIQUID GOOEY MOTION TAB */}
          {activeShowcaseTab === 'gooey' && (
            <div className="space-y-6">
              {/* Header & Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-zinc-100">
                      Liquid Gooey Tooltip Engine
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                      1:1 Original Port
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    Authentic recreation of Hitesh Suthar's gooey-tooltip with SVG feColorMatrix thresholding & dual-phase spring transitions.
                  </p>
                </div>

                {/* Preset & Canvas Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center p-0.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setGooeyCanvasTheme('light')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        gooeyCanvasTheme === 'light'
                          ? 'bg-zinc-800 text-zinc-100 font-medium shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Light Canvas
                    </button>
                    <button
                      type="button"
                      onClick={() => setGooeyCanvasTheme('dark')}
                      className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        gooeyCanvasTheme === 'dark'
                          ? 'bg-zinc-800 text-zinc-100 font-medium shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      Dark Canvas
                    </button>
                  </div>
                </div>
              </div>

              {/* Preset Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 mr-1">Presets:</span>
                {[
                  { id: 'original' as const, label: 'Original (hiteshdevcom)' },
                  { id: 'saas' as const, label: 'FeedbackPulse SaaS Dock' },
                  { id: 'social' as const, label: 'Social & Discussion' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setGooeyPreset(p.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                      gooeyPreset === p.id
                        ? 'bg-zinc-200 text-zinc-900 font-semibold shadow-sm'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Interactive Stage Canvas */}
              <div
                className={`w-full relative rounded-2xl border transition-colors p-2 ${
                  gooeyCanvasTheme === 'light'
                    ? 'bg-neutral-50 border-neutral-200'
                    : 'bg-zinc-950 border-zinc-800'
                }`}
              >
                <div
                  className={`w-full min-h-[200px] rounded-xl border flex flex-col items-center justify-center p-8 transition-colors ${
                    gooeyCanvasTheme === 'light'
                      ? 'bg-white border-neutral-200/80 shadow-inner'
                      : 'bg-zinc-900/30 border-zinc-800/80'
                  }`}
                >
                  <GooeyTooltip
                    items={
                      gooeyPreset === 'original'
                        ? [
                            {
                              icon: Plus,
                              tooltip: 'Add to cart',
                              onClick: () => onTriggerToast('E-Commerce', 'Added to cart with liquid feedback', 'success'),
                            },
                            {
                              label: 'Share',
                              icon: Upload,
                              tooltip: 'Copy link',
                              onClick: () => onTriggerToast('Share Link', 'Link copied to clipboard', 'info'),
                            },
                            {
                              label: 'Projects',
                              icon: FolderGit2,
                              tooltip: 'View Latest',
                              onClick: () => onTriggerToast('Navigation', 'Navigating to projects', 'info'),
                            },
                          ]
                        : gooeyPreset === 'saas'
                        ? [
                            {
                              label: 'Idea',
                              icon: RunePlus,
                              tooltip: 'Submit Proposal',
                              onClick: () => onTriggerToast('New Post', 'Proposal modal opened', 'info'),
                            },
                            {
                              label: 'Roadmap',
                              icon: Rune.RuneKanban,
                              tooltip: 'Kanban Board',
                              onClick: () => onTriggerToast('Roadmap', 'Switched to Kanban roadmap view', 'info'),
                            },
                            {
                              label: 'Pro',
                              icon: RuneCrown,
                              tooltip: 'Supporter Perks',
                              onClick: () => onTriggerToast('Stripe', 'Supporter modal opened', 'admin'),
                            },
                            {
                              icon: RuneSearch,
                              tooltip: 'Instant Search',
                              onClick: () => onTriggerToast('Search', 'Opening search (⌘K)', 'info'),
                            },
                          ]
                        : [
                            {
                              icon: Heart,
                              tooltip: 'Applaud Proposal',
                              onClick: () => onTriggerToast('Upvote', '+1 Praise recorded', 'success'),
                            },
                            {
                              label: 'Discuss',
                              icon: RuneMessageSquare,
                              tooltip: 'Open Thread',
                              onClick: () => onTriggerToast('Comments', 'Discussion thread opened', 'info'),
                            },
                            {
                              icon: RunePin,
                              tooltip: 'Pin Milestone',
                              onClick: () => onTriggerToast('Moderation', 'Proposal pinned to board', 'admin'),
                            },
                          ]
                    }
                    buttonClassName="bg-neutral-900 hover:bg-neutral-800 text-white"
                    tooltipClassName="bg-neutral-900 text-white"
                    tooltipTop={-45}
                    filterId="showcase-modal-gooey"
                  />

                  <p className="text-[11px] text-zinc-400 mt-6 text-center">
                    Hover across the buttons to experience liquid neck detachment, horizontal glide, and fluid collapse.
                  </p>
                </div>
              </div>

              {/* Technical Mechanics Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    Alpha Threshold Clamp
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Multiplies alpha by 20 and offsets by -10. Turns blurry gaussian falloff into an ultra-crisp liquid meniscus.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Composite operator="atop"
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    &lt;feComposite in="SourceGraphic" in2="goo" operator="atop" /&gt;
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Ensures labels, icons, and text inside the buttons stay 100% sharp without distortion.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-200 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Dual-Phase Springs
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">
                    POP: bounce 0.22, 0.7s<br />
                    MOVE: bounce 0.20, 0.2s
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Fresh detachment uses a bouncier spring; continuous sliding between items is fast & snappy.
                  </p>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-zinc-300">Implementation Code</h4>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        `import { motion } from "framer-motion";\nimport { useState, useRef } from "react";\n\n// See src/components/ui/GooeyTooltip.tsx for full source`
                      );
                      setHasCopiedCode(true);
                      setTimeout(() => setHasCopiedCode(false), 2000);
                      onTriggerToast('Code Copied', 'GooeyTooltip snippet copied to clipboard', 'info');
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-800 transition-colors cursor-pointer"
                  >
                    {hasCopiedCode ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
                  <pre>{`// SVG Filter definition
<svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
  <defs>
    <filter width="200%" height="200%" id="gooey-filter" x="-50%" y="-50%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
      <feComposite in="SourceGraphic" in2="goo" operator="atop" />
    </filter>
  </defs>
</svg>

// Spring Transitions
const POP_TRANSITION = { duration: 0.7, type: "spring", bounce: 0.22 };
const MOVE_TRANSITION = { duration: 0.2, type: "spring", bounce: 0.2 };`}</pre>
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
