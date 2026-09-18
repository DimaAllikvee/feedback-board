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

import { TextMorph } from 'torph/react';

interface StatusBadgeProps {
  status: PostStatus;
  className?: string;
  size?: 'sm' | 'md';
}

interface StatusConfig {
  dotColor?: string;
  icon: React.ReactNode;
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

const STATUS_CONFIGS: Record<PostStatus, StatusConfig> = {
  under_review: {
    dotColor: 'bg-amber-400/80',
    icon: <RuneClock size={12} className="text-zinc-400 shrink-0" />,
    label: 'Under Review',
    bgClass: 'bg-zinc-800/80',
    textClass: 'text-zinc-300',
    borderClass: 'border-zinc-700/60',
  },
  planned: {
    dotColor: 'bg-blue-400/80',
    icon: <RuneCompass size={12} className="text-zinc-400 shrink-0" />,
    label: 'Planned',
    bgClass: 'bg-zinc-800/80',
    textClass: 'text-zinc-300',
    borderClass: 'border-zinc-700/60',
  },
  in_progress: {
    dotColor: 'bg-purple-400/80',
    icon: <RuneSparkles size={12} className="text-zinc-400 shrink-0" />,
    label: 'In Progress',
    bgClass: 'bg-zinc-800/80',
    textClass: 'text-zinc-200',
    borderClass: 'border-zinc-700/60',
  },
  completed: {
    dotColor: 'bg-emerald-400/80',
    icon: <RuneCircleCheck size={12} className="text-emerald-400 shrink-0" />,
    label: 'Completed',
    bgClass: 'bg-zinc-800/80',
    textClass: 'text-zinc-200',
    borderClass: 'border-zinc-700/60',
  },
  closed: {
    icon: <RuneX size={12} className="shrink-0" />,
    label: 'Closed',
    bgClass: 'bg-zinc-900',
    textClass: 'text-zinc-500',
    borderClass: 'border-zinc-800',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '', size = 'sm' }) => {
  const config = STATUS_CONFIGS[status];
  if (!config) return null;
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-colors duration-200 ${config.bgClass} ${config.textClass} border ${config.borderClass} ${sizeClasses} ${className}`}>
      {config.dotColor && <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${config.dotColor}`} />}
      {config.icon}
      <TextMorph as="span">{config.label}</TextMorph>
    </span>
  );
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
