import React from 'react';
import { FeedbackPost, PostStatus } from '../types';
import { UpvoteButton } from './UpvoteButton';
import { CategoryBadge } from './StatusBadge';
import { SpotlightCard } from './ui/SpotlightCard';
import { RoadmapProgressBar } from './ui/RoadmapProgressBar';
import { UserAvatar } from './ui/UserAvatar';
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
  dotColor: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: 'under_review',
    title: 'Under Review',
    subtitle: 'Assessing demand & feasibility',
    icon: RuneClock,
    accentColor: 'text-zinc-300',
    dotColor: 'bg-amber-400/80',
  },
  {
    id: 'planned',
    title: 'Planned',
    subtitle: 'Scheduled on product roadmap',
    icon: RuneCompass,
    accentColor: 'text-zinc-300',
    dotColor: 'bg-blue-400/80',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    subtitle: 'Active engineering & design',
    icon: RuneSparkles,
    accentColor: 'text-zinc-200',
    dotColor: 'bg-purple-400/80',
  },
  {
    id: 'completed',
    title: 'Completed',
    subtitle: 'Shipped to live production',
    icon: RuneCircleCheck,
    accentColor: 'text-zinc-200',
    dotColor: 'bg-emerald-400/80',
  }
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  posts,
  onVote,
  onSelectPost,
  isPro = false
}) => {
  return (
    <div className="w-full pb-6 pt-1">
      {/* Velocity Progress Bar (ReUI / Coss pattern) */}
      <RoadmapProgressBar posts={posts} />

      <div className="w-full overflow-x-auto">
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
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                  <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-1.5">
                    <Icon size={15} className={column.accentColor} />
                    {column.title}
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {colPosts.length}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mb-3 px-1 -mt-1">
                {column.subtitle}
              </p>

              {/* Cards column */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                {colPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 border border-dashed border-zinc-800/80 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400">No ideas in this column yet</p>
                  </div>
                ) : (
                  colPosts.map((post) => (
                    <SpotlightCard
                      key={post.id}
                      spotlightColor="rgba(255, 255, 255, 0.03)"
                      onClick={() => onSelectPost(post)}
                      className={`group cursor-pointer p-4 flex flex-col transition-all duration-150 hover:-translate-y-0.5 border-zinc-800/80 hover:border-zinc-700 ${
                        post.is_pinned ? 'border-zinc-700 bg-zinc-900/50' : 'bg-zinc-900/30'
                      }`}
                    >
                      {/* Pinned badge */}
                      {post.is_pinned && (
                        <div className="flex items-center gap-1 text-[10px] font-semibold text-zinc-300 mb-2">
                          <RunePin size={12} className="text-zinc-400" />
                          <span>PINNED PROPOSAL</span>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-2.5 mb-2.5">
                        <CategoryBadge category={post.category} />
                        <UpvoteButton
                          count={post.upvotes_count}
                          hasVoted={post.has_voted}
                          onVote={() => onVote(post.id)}
                          orientation="horizontal"
                          isPro={isPro}
                        />
                      </div>

                      <h4 className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors line-clamp-2 mb-1.5 leading-snug">
                        {post.title}
                      </h4>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-3 flex-1">
                        {post.description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/60 text-[11px] text-zinc-400">
                        <div className="flex items-center gap-1.5">
                          <UserAvatar name={post.author.name} size="xs" />
                          <span className="truncate max-w-[95px] font-medium text-zinc-300">{post.author.name}</span>
                          {post.author.is_pro && (
                            <span className="text-[9px] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 px-1 rounded">Supporter</span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-200">
                          <RuneMessageSquare size={13} />
                          <span className="font-medium font-mono">{post.comments_count}</span>
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
    </div>
  );
};
