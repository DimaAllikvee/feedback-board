import React, { useState } from 'react';
import { RuneChevronUp } from './icons/RuneIcons';
import { AnimatedCounter } from './ui/AnimatedCounter';

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
    setTimeout(() => setAnimating(false), 250);
    onVote();
  };

  const isVertical = orientation === 'vertical';

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={hasVoted ? 'Remove upvote' : 'Upvote this idea'}
      className={`group relative inline-flex items-center justify-center transition-all duration-150 select-none cursor-pointer ${
        isVertical
          ? 'flex-col min-w-[50px] px-2.5 py-2 rounded-xl text-center'
          : 'flex-row gap-1.5 px-3 py-1.5 rounded-lg'
      } ${
        hasVoted
          ? 'bg-zinc-800 text-zinc-100 border border-zinc-600 shadow-sm'
          : 'bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200'
      } ${animating ? 'scale-95' : ''}`}
    >
      <RuneChevronUp
        size={isVertical ? 17 : 14}
        className={`transition-transform duration-150 ${
          hasVoted ? 'text-zinc-100 -translate-y-0.5' : 'group-hover:-translate-y-0.5'
        }`}
      />
      <div className={`${isVertical ? 'text-xs font-mono font-medium mt-0.5' : 'text-xs font-mono font-medium'}`}>
        <AnimatedCounter value={count} />
      </div>
      {isPro && hasVoted && (
        <span 
          className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-zinc-300 ring-2 ring-zinc-950" 
          title="Supporter Priority Weight (3x)" 
        />
      )}
    </button>
  );
};
