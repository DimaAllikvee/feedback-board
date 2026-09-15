import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RuneSearch, 
  RunePlus, 
  RuneKanban, 
  RuneList, 
  RuneCrown, 
  RuneUser, 
  RunePin, 
  RuneChevronUp,
  RuneChevronDown,
  RuneX
} from './icons/RuneIcons';
import { HometownLogo } from './icons/HometownLogo';
import { Kbd } from './ui/Kbd';
import { User, ActiveTab } from '../types';
import { UserAvatar } from './ui/UserAvatar';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentUser: User | null;
  onSwitchUser?: (userType: 'admin' | 'pro_user' | 'regular_user') => void;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewPost: () => void;
  onOpenStripeModal: () => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  onOpenNewPost,
  onOpenStripeModal,
  onOpenAuthModal,
  onLogout,
  searchInputRef,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#090a0f] backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Hometown Brand & Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 hover:border-zinc-700 transition-colors">
              <HometownLogo size={22} className="text-zinc-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-zinc-100">
                  Hometown
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  Board
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Feedback & Product Roadmap
              </p>
            </div>
          </div>

          {/* Quick Search with coss.com/ui Kbd indicator (Only shown when authenticated) */}
          {currentUser && (
            <div className="flex-1 max-w-md hidden md:block">
              <div className="relative flex items-center">
                <RuneSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search proposals, topics, or milestones..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-zinc-900/80 text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 pl-10 pr-16 py-2 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 transition-all"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery ? (
                    <button
                      onClick={() => onSearchChange('')}
                      aria-label="Clear search"
                      className="text-xs text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
                    >
                      <RuneX size={14} />
                    </button>
                  ) : (
                    <Kbd className="hidden lg:inline-flex">⌘K</Kbd>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs & Auth */}
          <div className="flex items-center gap-2">
            
            {currentUser && (
              <>
                {/* Supporter Pass Button (formerly Stripe PRO) */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={onOpenStripeModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-[background-color,border-color,color] duration-100 cursor-pointer select-none"
                  title="Supporter Membership (Stripe Billing)"
                >
                  <RuneCrown size={14} className="text-zinc-400 shrink-0" />
                  <span className="hidden sm:inline">Supporter</span>
                  {currentUser?.is_pro && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </motion.button>

                {/* New Post Button */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={onOpenNewPost}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white transition-[background-color,transform] duration-100 cursor-pointer shadow-sm select-none"
                >
                  <RunePlus size={14} className="shrink-0" />
                  <span>New Idea</span>
                </motion.button>
              </>
            )}

            {/* Auth Profile or Sign In Button */}
            {currentUser ? (
              <div className="relative">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs transition-[border-color,background-color] duration-100 cursor-pointer select-none"
                >
                  <UserAvatar name={currentUser.name} size="xs" />
                  <div className="hidden lg:block text-left leading-tight">
                    <div className="font-semibold text-zinc-200 truncate max-w-[110px]">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      {currentUser.role === 'admin' ? (
                        <span className="text-rose-400 font-medium">Admin</span>
                      ) : currentUser.is_pro ? (
                        <span className="text-zinc-200 font-medium">Supporter</span>
                      ) : (
                        <span>Member</span>
                      )}
                    </div>
                  </div>
                  <RuneChevronDown size={14} className="text-zinc-400 shrink-0" />
                </motion.button>

                <AnimatePresence>
                  {roleMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: -4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -4 }}
                      transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 shadow-2xl backdrop-blur-2xl z-50 text-xs"
                      onMouseLeave={() => setRoleMenuOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                        <p className="text-xs font-bold text-zinc-200 truncate">
                          {currentUser.name}
                        </p>
                        <p className="text-[11px] text-zinc-400 truncate">
                          {currentUser.email}
                        </p>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.96 }}
                        type="button"
                        onClick={() => { onLogout(); setRoleMenuOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <RuneX size={14} />
                        <span>Log Out</span>
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-[background-color,border-color,color] duration-100 cursor-pointer select-none"
              >
                <RuneUser size={14} className="shrink-0" />
                <span>Sign In</span>
              </motion.button>
            )}

          </div>
        </div>

        {/* Navigation Tabs Bar with Emil Kowalski Snappy Spring Indicator (Only shown when authenticated) */}
        {currentUser && (
          <div className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar border-t border-zinc-800/40">
            {[
              { id: 'roadmap' as const, label: 'Roadmap', icon: RuneKanban },
              { id: 'list' as const, label: 'All Posts', icon: RuneList },
              { id: 'my-posts' as const, label: 'My Submissions', icon: RunePin },
              { id: 'my-votes' as const, label: 'My Upvoted', icon: RuneChevronUp },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-100 cursor-pointer select-none",
                    isActive ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-lg bg-zinc-800 border border-zinc-700 shadow-sm"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <Icon size={14} className={cn("relative z-10 shrink-0", isActive ? "text-zinc-200" : "text-zinc-500")} />
                  <span className="relative z-10">{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        )}

      </div>
    </header>
  );
};
