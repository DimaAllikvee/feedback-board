import React from 'react';
import { PostStatus, PostCategory } from '../types';
import { 
  RuneClock, 
  RuneCompass, 
  RuneSparkles, 
  RuneCircleCheck, 
  RuneX, 
  RuneCode, 
  RuneZap, 
  RuneBug, 
  RuneShare, 
  RunePalette 
} from './icons/RuneIcons';

interface StatusBadgeProps {
  status: PostStatus;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', size = 'sm' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'under_review':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 ${sizeClasses} ${className}`}>
          <RuneClock size={12} />
          Under Review
        </span>
      );
    case 'planned':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 ${sizeClasses} ${className}`}>
          <RuneCompass size={12} />
          Planned
        </span>
      );
    case 'in_progress':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 ${sizeClasses} ${className}`}>
          <RuneSparkles size={12} />
          In Progress
        </span>
      );
    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses} ${className}`}>
          <RuneCircleCheck size={12} />
          Completed
        </span>
      );
    case 'closed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 ${sizeClasses} ${className}`}>
          <RuneX size={12} />
          Closed
        </span>
      );
    default:
      return null;
  }
};

interface CategoryBadgeProps {
  category: PostCategory;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  switch (category) {
    case 'feature':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 ${className}`}>
          <RuneCode size={12} />
          Feature
        </span>
      );
    case 'improvement':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-sky-500/10 text-sky-300 border border-sky-500/20 ${className}`}>
          <RuneZap size={12} />
          Improvement
        </span>
      );
    case 'bug':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 ${className}`}>
          <RuneBug size={12} />
          Bug
        </span>
      );
    case 'integration':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20 ${className}`}>
          <RuneShare size={12} />
          Integration
        </span>
      );
    case 'ui-ux':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20 ${className}`}>
          <RunePalette size={12} />
          UI / UX
        </span>
      );
    default:
      return null;
  }
};
