import React, { useState, useRef } from 'react';
import { FeedbackPost, PostStatus, User } from '../types';
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
  RuneMessageSquare,
  RuneGripVertical,
  RuneArrowRight
} from './icons/RuneIcons';

interface KanbanBoardProps {
  posts: FeedbackPost[];
  currentUser?: User | null;
  onVote: (postId: string) => void;
  onSelectPost: (post: FeedbackPost) => void;
  onUpdateStatus?: (postId: string, newStatus: PostStatus) => void;
  isPro?: boolean;
}

interface ColumnConfig {
  id: PostStatus;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  accentColor: string;
  dotColor: string;
  dropBorder: string;
  dropBg: string;
}

const COLUMNS: ColumnConfig[] = [
  {
    id: 'under_review',
    title: 'Under Review',
    subtitle: 'Assessing demand & feasibility',
    icon: RuneClock,
    accentColor: 'text-amber-400',
    dotColor: 'bg-amber-400/80',
    dropBorder: 'border-amber-400/60',
    dropBg: 'bg-amber-400/5',
  },
  {
    id: 'planned',
    title: 'Planned',
    subtitle: 'Scheduled on product roadmap',
    icon: RuneCompass,
    accentColor: 'text-blue-400',
    dotColor: 'bg-blue-400/80',
    dropBorder: 'border-blue-400/60',
    dropBg: 'bg-blue-400/5',
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    subtitle: 'Active engineering & design',
    icon: RuneSparkles,
    accentColor: 'text-purple-400',
    dotColor: 'bg-purple-400/80',
    dropBorder: 'border-purple-400/60',
    dropBg: 'bg-purple-400/5',
  },
  {
    id: 'completed',
    title: 'Completed',
    subtitle: 'Shipped to live production',
    icon: RuneCircleCheck,
    accentColor: 'text-emerald-400',
    dotColor: 'bg-emerald-400/80',
    dropBorder: 'border-emerald-400/60',
    dropBg: 'bg-emerald-400/5',
  }
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  posts,
  currentUser,
  onVote,
  onSelectPost,
  onUpdateStatus,
  isPro = false
}) => {
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<PostStatus | null>(null);
  const isDraggingRef = useRef(false);

  const draggedPost = draggedPostId ? posts.find((p) => p.id === draggedPostId) : null;

  const canMovePost = (post: FeedbackPost) => {
    if (!currentUser) return false;
    return currentUser.role === 'admin' || currentUser.id === post.author.id;
  };

  const handleDragStart = (e: React.DragEvent, post: FeedbackPost) => {
    if (!canMovePost(post)) return;
    isDraggingRef.current = true;
    setDraggedPostId(post.id);
    e.dataTransfer.setData('text/plain', post.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedPostId(null);
    setDragOverColId(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 60);
  };

  const handleDragOver = (e: React.DragEvent, columnId: PostStatus) => {
    if (!draggedPostId) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColId !== columnId) {
      setDragOverColId(columnId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, columnId: PostStatus) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    if (dragOverColId === columnId) {
      setDragOverColId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: PostStatus) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('text/plain') || draggedPostId;
    setDragOverColId(null);
    setDraggedPostId(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 60);

    if (postId && onUpdateStatus) {
      const post = posts.find((p) => p.id === postId);
      if (post && post.status !== targetColumnId) {
        onUpdateStatus(postId, targetColumnId);
      }
    }
  };

  return (
    <div className="w-full pb-6 pt-1">
      {/* Velocity Progress Bar (ReUI / Coss pattern) */}
      <RoadmapProgressBar posts={posts} />

      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-w-[320px] lg:min-w-[1040px]">
        {COLUMNS.map((column) => {
          const colPosts = posts
            .filter((p) => p.status === column.id)
            .sort((a, b) => {
              if (Boolean(b.is_pinned) !== Boolean(a.is_pinned)) {
                return (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0);
              }
              if (b.upvotes_count !== a.upvotes_count) {
                return b.upvotes_count - a.upvotes_count;
              }
              return new Date(b.created).getTime() - new Date(a.created).getTime();
            });
          
          const Icon = column.icon;
          const isDropTarget = dragOverColId === column.id && draggedPost && draggedPost.status !== column.id;

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={(e) => handleDragLeave(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`flex flex-col rounded-2xl p-3.5 backdrop-blur-md min-h-[540px] transition-all duration-150 ${
                isDropTarget
                  ? `bg-zinc-900/80 border-2 border-dashed ${column.dropBorder} ${column.dropBg} shadow-lg shadow-black/40 ring-1 ring-zinc-700/50`
                  : 'bg-zinc-950/40 border border-zinc-800/80'
              }`}
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
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto pt-1 pb-2 px-1 -mx-1">
                {/* Drop Slot Indicator when dragging over this column */}
                {isDropTarget && (
                  <div className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl border border-dashed border-zinc-500/80 bg-zinc-900/60 text-xs font-medium text-zinc-200 transition-all animate-pulse">
                    <RuneArrowRight size={14} className={column.accentColor} />
                    <span>Drop to move to {column.title}</span>
                  </div>
                )}

                {colPosts.length === 0 && !isDropTarget ? (
                  <div className="flex flex-col items-center justify-center h-40 border border-dashed border-zinc-800/80 rounded-xl p-4 text-center">
                    <p className="text-xs text-zinc-400">No ideas in this column yet</p>
                  </div>
                ) : (
                  colPosts.map((post) => {
                    const canMove = canMovePost(post);
                    const isBeingDragged = draggedPostId === post.id;

                    return (
                      <SpotlightCard
                        key={post.id}
                        spotlightColor="rgba(255, 255, 255, 0.03)"
                        draggable={canMove}
                        onDragStart={(e) => handleDragStart(e, post)}
                        onDragEnd={handleDragEnd}
                        onClick={() => {
                          if (isDraggingRef.current) return;
                          onSelectPost(post);
                        }}
                        className={`group cursor-pointer p-4 flex flex-col transition-all duration-150 border-zinc-800/80 hover:border-zinc-700 ${
                          isBeingDragged
                            ? 'opacity-40 scale-[0.98] border-dashed border-zinc-500 bg-zinc-900/80 pointer-events-none'
                            : 'hover:-translate-y-0.5'
                        } ${
                          post.is_pinned ? 'border-zinc-700 bg-zinc-900/50' : 'bg-zinc-900/30'
                        } ${canMove ? 'cursor-grab active:cursor-grabbing' : ''}`}
                      >
                        {/* Top Meta Bar: Pinned indicator & Drag Handle */}
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {post.is_pinned && (
                              <div className="flex items-center gap-1 text-[10px] font-semibold text-zinc-300">
                                <RunePin size={12} className="text-zinc-400" />
                                <span>PINNED PROPOSAL</span>
                              </div>
                            )}
                          </div>

                          {/* Tactile Drag Handle for Admins & Authors */}
                          {canMove && (
                            <div 
                              title="Drag to move milestone"
                              className="text-zinc-600 group-hover:text-zinc-400 transition-colors p-0.5 -mr-1"
                            >
                              <RuneGripVertical size={14} />
                            </div>
                          )}
                        </div>

                        {/* Category badge, Quick Move Selector, Upvote */}
                        <div className="flex items-start justify-between gap-2.5 mb-2.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <CategoryBadge category={post.category} />

                            {/* Accessible Quick Status Selector (1-Click Move) */}
                            {canMove && onUpdateStatus && (
                              <div 
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center"
                              >
                                <select
                                  aria-label={`Change milestone for ${post.title}`}
                                  value={post.status}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    onUpdateStatus(post.id, e.target.value as PostStatus);
                                  }}
                                  className="text-[10px] font-medium bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100 border border-zinc-700/70 rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-400 cursor-pointer transition-colors"
                                >
                                  <option value="under_review">Under Review</option>
                                  <option value="planned">Planned</option>
                                  <option value="in_progress">In Progress</option>
                                  <option value="completed">Completed</option>
                                </select>
                              </div>
                            )}
                          </div>

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
                    );
                  })
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
