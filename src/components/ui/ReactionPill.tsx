import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import confetti from 'canvas-confetti';

interface ReactionPillProps {
  postId: string;
  className?: string;
}

const EMOJIS = ['👍', '🚀', '💡', '🔥', '❤️'];

/**
 * ReactionPill component inspired by rare-ui (https://github.com/swamimalode07/rare-ui)
 */
export const ReactionPill: React.FC<ReactionPillProps> = ({ className = '' }) => {
  const [reactions, setReactions] = useState<{ [emoji: string]: number }>({
    '👍': 3,
    '🚀': 2,
    '💡': 1,
  });
  const [userReacted, setUserReacted] = useState<{ [emoji: string]: boolean }>({});
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectEmoji = (emoji: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const has = userReacted[emoji];
    setReactions((prev) => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + (has ? -1 : 1),
    }));
    setUserReacted((prev) => ({
      ...prev,
      [emoji]: !has,
    }));
    setMenuOpen(false);

    if (!has) {
      try {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 12,
          spread: 35,
          origin: { x, y },
          scalar: 0.8,
          disableForReducedMotion: true,
        });
      } catch (err) {
        // safe
      }
    }
  };

  return (
    <div className={cn("relative flex items-center gap-1.5", className)} onClick={(e) => e.stopPropagation()}>
      {/* Active reaction buttons */}
      {Object.entries(reactions)
        .filter(([, count]) => count > 0)
        .map(([emoji, count]) => (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={(e) => handleSelectEmoji(emoji, e)}
            className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-medium border transition-colors",
              userReacted[emoji]
                ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"
            )}
          >
            <span>{emoji}</span>
            <span className="text-[10px]">{count}</span>
          </motion.button>
        ))}

      {/* Add reaction trigger */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 px-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          title="Add emoji reaction"
        >
          +😀
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute left-0 bottom-full mb-1.5 z-30 flex items-center gap-1 p-1 rounded-full bg-zinc-900/95 border border-zinc-700 shadow-xl backdrop-blur-md"
            >
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={(e) => handleSelectEmoji(emoji, e)}
                  className="p-1 rounded-full text-sm hover:scale-125 transition-transform active:scale-95"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
