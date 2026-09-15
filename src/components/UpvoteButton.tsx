import React, { useState } from 'react';
import { RuneChevronUp } from './icons/RuneIcons';
import { AnimatedCounter } from './ui/AnimatedCounter';
import confetti from 'canvas-confetti';

interface UpvoteButtonProps {
  count: number;
  hasVoted?: boolean;
  onVote: () => void;
  orientation?: 'vertical' | 'horizontal';
  isPro?: boolean;
}

export const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  count,
  hasVoted = false,
  onVote,
  orientation = 'vertical',
  isPro = false
}) => {
  const [animating, setAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    if (!hasVoted && isPro) {
      try {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        confetti({
          particleCount: 18,
          spread: 45,
          origin: { x, y },
          colors: ['#6366f1', '#a855f7', '#ec4899'],
          disableForReducedMotion: true
        });
      } catch (err) {
        // Safe catch
      }
    }

    onVote();
  };

  const isVertical = orientation === 'vertical';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={hasVoted ? 'Remove upvote' : 'Upvote this idea'}
      className={`group relative inline-flex items-center justify-center transition-all duration-200 select-none ${
        isVertical
          ? 'flex-col min-w-[50px] px-2.5 py-2 rounded-xl text-center'
          : 'flex-row gap-1.5 px-3 py-1.5 rounded-lg'
      } ${
        hasVoted
          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/50 shadow-sm shadow-indigo-500/20'
          : 'bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 hover:text-zinc-200'
      } ${animating ? 'animate-vote-pop' : ''}`}
    >
      <RuneChevronUp
        size={isVertical ? 18 : 15}
        className={`transition-transform duration-200 ${
          hasVoted ? 'text-indigo-400 -translate-y-0.5' : 'group-hover:-translate-y-0.5'
        }`}
      />
      <div className={`${isVertical ? 'text-xs mt-0.5' : 'text-xs'}`}>
        <AnimatedCounter value={count} />
      </div>
      {isPro && hasVoted && (
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-zinc-950 animate-pulse" title="PRO Priority Weight (3x)" />
      )}
    </button>
  );
};
