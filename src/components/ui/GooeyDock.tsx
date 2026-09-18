import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GooeyTooltip, GooeyTooltipItem } from './GooeyTooltip';
import { 
  RunePlus, 
  RuneKanban, 
  RuneList, 
  RuneCrown, 
  RuneSearch,
  RuneX
} from '../icons/RuneIcons';
import { HometownLogo } from '../icons/HometownLogo';
import { ActiveTab } from '../../types';

interface GooeyDockProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNewPost: () => void;
  onOpenSearch: () => void;
  onOpenShowcase: () => void;
  onOpenStripe: () => void;
}

export const GooeyDock: React.FC<GooeyDockProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewPost,
  onOpenSearch,
  onOpenShowcase,
  onOpenStripe,
}) => {
  const [isMinimized, setIsMinimized] = React.useState(false);

  const dockItems: GooeyTooltipItem[] = [
    {
      id: 'dock-new-post',
      label: 'Idea',
      icon: RunePlus,
      tooltip: 'Create Proposal',
      onClick: onOpenNewPost,
      ariaLabel: 'Create new proposal',
    },
    {
      id: 'dock-kanban',
      label: 'Roadmap',
      icon: RuneKanban,
      tooltip: activeTab === 'roadmap' ? 'Roadmap (Active)' : 'Kanban Roadmap',
      onClick: () => onSelectTab('roadmap'),
      ariaLabel: 'Switch to Roadmap Kanban view',
    },
    {
      id: 'dock-feed',
      icon: RuneList,
      tooltip: activeTab === 'list' ? 'List (Active)' : 'List Feed',
      onClick: () => onSelectTab('list'),
      ariaLabel: 'Switch to Feedback list feed',
    },
    {
      id: 'dock-search',
      icon: RuneSearch,
      tooltip: 'Search (⌘K)',
      onClick: onOpenSearch,
      ariaLabel: 'Search proposals',
    },
    {
      id: 'dock-pro',
      icon: RuneCrown,
      tooltip: 'Supporter Tier',
      onClick: onOpenStripe,
      ariaLabel: 'Open supporter pro modal',
    },
    {
      id: 'dock-lab',
      icon: HometownLogo,
      tooltip: 'Component Lab',
      onClick: onOpenShowcase,
      ariaLabel: 'Open UI Component Showcase',
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden sm:flex flex-col items-center pointer-events-auto select-none">
      <AnimatePresence mode="wait">
        {!isMinimized ? (
          <motion.div
            key="dock-expanded"
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center p-1.5 rounded-2xl bg-zinc-950/85 backdrop-blur-xl border border-zinc-800/90 shadow-2xl shadow-black/60 ring-1 ring-white/5"
          >
            {/* The Liquid Gooey Tooltip Engine */}
            <GooeyTooltip
              items={dockItems}
              buttonClassName="bg-zinc-900 hover:bg-zinc-850 text-zinc-100 hover:text-white"
              tooltipClassName="bg-zinc-900 text-zinc-100 font-medium shadow-md"
              tooltipTop={-46}
              filterId="floating-dock-gooey"
            />

            {/* Quick minimize button */}
            <div className="pl-1 ml-1 border-l border-zinc-800/80">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                title="Minimize quick dock"
                aria-label="Minimize quick dock"
                className="p-1.5 rounded-xl text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors cursor-pointer"
              >
                <RuneX size={13} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="dock-minimized"
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMinimized(false)}
            aria-label="Restore quick action dock"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/90 backdrop-blur-md border border-zinc-800 text-zinc-300 text-xs font-medium shadow-lg hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <HometownLogo size={14} className="text-zinc-200" />
            <span>Quick Actions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
