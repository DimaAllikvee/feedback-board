import React from 'react';
import { FeedbackPost, PostStatus } from '../types';
import { UpvoteButton } from './UpvoteButton';
import { CategoryBadge } from './StatusBadge';
import { SpotlightCard } from './ui/SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { 
  RuneClock, 
  RuneCompass, 
  RuneSparkles, 
  RuneCircleCheck, 
  RunePin, 
  RuneMessageSquare 
} from './icons/RuneIcons';

interface KanbanBoardProps {
  posts: FeedbackPost[];
  onVote: (postId: string) => void;
  onSelectPost: (post: FeedbackPost) => void;
  isPro?: boolean;
}

interface ColumnConfig {
  id: PostStatus;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  accentColor: string;
  headerBg: string;
  dotColor: string;
  spotlightColor: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: 'under_review',
    title: 'Under Review',
    subtitle: 'Assessing demand & feasibility',
    icon: RuneClock,
    accentColor: 'text-amber-400',
    headerBg: 'bg-amber-500/10 border-amber-500/20',
    dotColor: 'bg-amber-400',
    spotlightColor: 'rgba(251, 191, 36, 0.12)'
  },
  {
    id: 'planned',
    title: 'Planned',
    subtitle: 'Scheduled on the product roadmap',
    icon: RuneCompass,
    accentColor: 'text-blue-400',
    headerBg: 'bg-blue-500/10 border-blue-500/20',
    dotColor: 'bg-blue-400',
    spotlightColor: 'rgba(96, 165, 250, 0.12)'
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    subtitle: 'Active engineering & design',
    icon: RuneSparkles,
    accentColor: 'text-purple-400',
    headerBg: 'bg-purple-500/10 border-purple-500/20',
    dotColor: 'bg-purple-400',
    spotlightColor: 'rgba(192, 132, 252, 0.14)'
  },
  {
    id: 'completed',
    title: 'Completed',
    subtitle: 'Shipped to live production',
    icon: RuneCircleCheck,
    accentColor: 'text-emerald-400',
    headerBg: 'bg-emerald-500/10 border-emerald-500/20',
    dotColor: 'bg-emerald-400',
    spotlightColor: 'rgba(52, 211, 153, 0.12)'
  }
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  posts,
  onVote,
  onSelectPost,
  isPro = false
}) => {
  return (
    <div className="w-full overflow-x-auto pb-6 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[320px] lg:min-w-[1040px]">
        {COLUMNS.map((column) => {
          const colPosts = posts
            .filter((p) => p.status === column.id)
            .sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0) || b.upvotes_count - a.upvotes_count);
          
          const Icon = column.icon;

          return (
            <div
              key={column.id}
              className="flex flex-col rounded-2xl bg-zinc-950/40 border border-zinc-800/80 p-3.5 backdrop-blur-md min-h-[520px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                  <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-1.5">
                    <Icon size={16} className={column.accentColor} />
                    {column.title}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                  {colPosts.length}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mb-3 px-1 -mt-1">
                {column.subtitle}
              </p>

              {/* Cards column */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                {colPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 border border-dashed border-zinc-800 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400">No ideas in this column yet</p>
                  </div>
                ) : (
                  colPosts.map((post) => (
                    <SpotlightCard
                      key={post.id}
                      spotlightColor={column.spotlightColor}
                      onClick={() => onSelectPost(post)}
                      className="group cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 border-zinc-800/80 hover:border-indigo-500/40"
                    >
                      {/* Featured Border Beam for pinned items */}
                      {post.is_pinned && <BorderBeam size={150} duration={8} colorFrom="#6366f1" colorTo="#a855f7" />}

                      {/* Pinned badge */}
                      {post.is_pinned && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 mb-2">
                          <RunePin size={12} className="text-indigo-400" />
                          <span>PINNED FEATURE</span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2.5 mb-2">
                        <CategoryBadge category={post.category} />
                        <UpvoteButton
                          count={post.upvotes_count}
                          hasVoted={post.has_voted}
                          onVote={() => onVote(post.id)}
                          orientation="horizontal"
                          isPro={isPro}
                        />
                      </div>

                      <h4 className="font-semibold text-sm text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-2 mb-1.5 leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3 flex-1">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={post.author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                            alt={post.author.name}
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span className="truncate max-w-[95px] font-medium text-zinc-300">{post.author.name}</span>
                          {post.author.is_pro && (
                            <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1 rounded">PRO</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-200">
                          <RuneMessageSquare size={13} />
                          <span className="font-semibold">{post.comments_count}</span>
                        </div>
                      </div>
                    </SpotlightCard>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
