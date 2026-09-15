import React, { useState } from 'react';
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

          {/* Quick Search with coss.com/ui Kbd indicator */}
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

          {/* Action CTAs & Auth */}
          <div className="flex items-center gap-2">
            
            {/* Supporter Pass Button (formerly Stripe PRO) */}
            <button
              onClick={onOpenStripeModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-all cursor-pointer"
              title="Supporter Membership (Stripe Billing)"
            >
              <RuneCrown size={14} className="text-zinc-400" />
              <span className="hidden sm:inline">Supporter</span>
              {currentUser?.is_pro && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>

            {/* New Post Button (Clean neutral high-contrast) */}
            <button
              onClick={onOpenNewPost}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white active:scale-98 transition-all cursor-pointer shadow-sm"
            >
              <RunePlus size={14} />
              <span>New Idea</span>
            </button>

            {/* Auth Profile or Sign In Button */}
            {currentUser ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 pr-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs transition-all cursor-pointer"
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
                  <RuneChevronDown size={14} className="text-zinc-400" />
                </button>

                {roleMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-900 border border-zinc-800 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-modal-in"
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

                    <button
                      onClick={() => { onLogout(); setRoleMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <RuneX size={14} />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer"
              >
                <RuneUser size={14} />
                <span>Sign In</span>
              </button>
            )}

          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar border-t border-zinc-800/40">
          <button
            onClick={() => onTabChange('roadmap')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'roadmap'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <RuneKanban size={14} className={activeTab === 'roadmap' ? "text-zinc-200" : "text-zinc-500"} />
            <span>Roadmap</span>
          </button>

          <button
            onClick={() => onTabChange('list')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'list'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <RuneList size={14} className={activeTab === 'list' ? "text-zinc-200" : "text-zinc-500"} />
            <span>All Posts</span>
          </button>

          <button
            onClick={() => onTabChange('my-posts')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'my-posts'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <RunePin size={14} className={activeTab === 'my-posts' ? "text-zinc-200" : "text-zinc-500"} />
            <span>My Submissions</span>
          </button>

          <button
            onClick={() => onTabChange('my-votes')}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'my-votes'
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            <RuneChevronUp size={14} className={activeTab === 'my-votes' ? "text-zinc-200" : "text-zinc-500"} />
            <span>My Upvoted</span>
          </button>
        </div>

      </div>
    </header>
  );
};
