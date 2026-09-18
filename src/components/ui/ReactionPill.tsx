import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { 
  RuneThumbsUp, 
  RuneLightbulb, 
  RuneZap, 
  RuneHeart, 
  RuneBookmark, 
  RunePlus 
} from '../icons/RuneIcons';

interface ReactionPillProps {
  postId: string;
  className?: string;
}

export interface ReactionConfig {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

export const REACTIONS: ReactionConfig[] = [
  { id: 'agree', label: 'Agree', icon: RuneThumbsUp },
  { id: 'insight', label: 'Insightful', icon: RuneLightbulb },
  { id: 'impact', label: 'High Impact', icon: RuneZap },
  { id: 'appreciate', label: 'Appreciate', icon: RuneHeart },
  { id: 'bookmark', label: 'Bookmark', icon: RuneBookmark },
];

/**
 * ReactionPill component using clean, neutral semantic SVG iconography.
 * Fully replaces cartoon emojis with minimal, professional indicators.
 */
export const ReactionPill: React.FC<ReactionPillProps> = ({ className = '' }) => {
  const [reactions, setReactions] = useState<{ [id: string]: number }>({
    agree: 4,
    insight: 2,
    impact: 1,
  });
  const [userReacted, setUserReacted] = useState<{ [id: string]: boolean }>({});
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectReaction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const has = userReacted[id];
    setReactions((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + (has ? -1 : 1)),
    }));
    setUserReacted((prev) => ({
      ...prev,
      [id]: !has,
    }));
    setMenuOpen(false);
  };

  return (
    <div className={cn("relative flex items-center gap-1.5", className)} onClick={(e) => e.stopPropagation()}>
      {/* Active reaction buttons */}
      {REACTIONS.map((item) => {
        const count = reactions[item.id] || 0;
        if (count <= 0) return null;
        const Icon = item.icon;
        const isReacted = Boolean(userReacted[item.id]);

        return (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={(e) => handleSelectReaction(item.id, e)}
            title={item.label}
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-[background-color,border-color,color] duration-100 cursor-pointer select-none",
              isReacted
                ? "bg-zinc-800 text-zinc-100 border-zinc-600 shadow-sm"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-800/80 hover:text-zinc-200 hover:bg-zinc-800/60 hover:border-zinc-700"
            )}
          >
            <Icon size={14} className={cn("shrink-0", isReacted ? "text-zinc-100" : "text-zinc-400")} />
            <span className="text-[11px] font-mono leading-none">{count}</span>
          </motion.button>
        );
      })}

      {/* Add reaction trigger button */}
      <div className="relative">
        <motion.button
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-700 transition-[background-color,border-color,color] duration-100 cursor-pointer"
          title="Add reaction"
        >
          <RunePlus size={13} className="shrink-0" />
          <span className="text-[11px] leading-none">React</span>
        </motion.button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'bottom left' }}
              className="absolute left-0 bottom-full mb-1.5 z-30 flex items-center gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-700/80 shadow-2xl backdrop-blur-xl"
            >
              {REACTIONS.map((item) => {
                const Icon = item.icon;
                const isReacted = Boolean(userReacted[item.id]);
                return (
                  <motion.button
                    key={item.id}
                    whileTap={{ scale: 0.94 }}
                    type="button"
                    onClick={(e) => handleSelectReaction(item.id, e)}
                    title={item.label}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg transition-colors cursor-pointer",
                      isReacted
                        ? "bg-zinc-800 text-zinc-100 border border-zinc-600"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                    )}
                  >
                    <Icon size={15} className="shrink-0" />
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
