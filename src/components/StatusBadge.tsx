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
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
          <RuneClock size={12} className="text-zinc-400" />
          <span>Under Review</span>
        </span>
      );
    case 'planned':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
          <RuneCompass size={12} className="text-zinc-400" />
          <span>Planned</span>
        </span>
      );
    case 'in_progress':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
          <RuneSparkles size={12} className="text-zinc-400" />
          <span>In Progress</span>
        </span>
      );
    case 'completed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-zinc-800/80 text-zinc-200 border border-zinc-700/60 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
          <RuneCircleCheck size={12} className="text-emerald-400" />
          <span>Completed</span>
        </span>
      );
    case 'closed':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full font-medium bg-zinc-900 text-zinc-500 border border-zinc-800 ${sizeClasses} ${className}`}>
          <RuneX size={12} />
          <span>Closed</span>
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
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 ${className}`}>
          <RuneCode size={12} className="text-zinc-400" />
          <span>Feature</span>
        </span>
      );
    case 'improvement':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 ${className}`}>
          <RuneZap size={12} className="text-zinc-400" />
          <span>Improvement</span>
        </span>
      );
    case 'bug':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 ${className}`}>
          <RuneBug size={12} className="text-zinc-400" />
          <span>Bug</span>
        </span>
      );
    case 'integration':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 ${className}`}>
          <RuneShare size={12} className="text-zinc-400" />
          <span>Integration</span>
        </span>
      );
    case 'ui-ux':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 ${className}`}>
          <RunePalette size={12} className="text-zinc-400" />
          <span>UI / UX</span>
        </span>
      );
    default:
      return null;
  }
};
