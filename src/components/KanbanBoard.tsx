import React, { useState, useRef } from 'react';
import { FeedbackPost, PostStatus, User } from '../types';
import { UpvoteButton } from './UpvoteButton';
import { CategoryBadge } from './StatusBadge';
import { SpotlightCard } from './ui/SpotlightCard';
import { RoadmapProgressBar } from './ui/RoadmapProgressBar';
import { UserAvatar } from './ui/UserAvatar';
import { CustomSelect } from './ui/CustomSelect';
import { 
  RuneClock, 
  RuneCompass, 
  RuneSparkles, 
  RuneCircleCheck, 
  RunePin, 
  RuneMessageSquare,
  RuneGripVertical,
  RuneArrowRight,
  RunePlus
} from './icons/RuneIcons';

interface KanbanBoardProps {
  posts: FeedbackPost[];
  currentUser?: User | null;
  onVote: (postId: string) => void;
  onSelectPost: (post: FeedbackPost) => void;
  onUpdateStatus?: (postId: string, newStatus: PostStatus) => void;
  onOpenNewPost?: () => void;
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
  currentUser: _currentUser,
  onVote,
  onSelectPost,
  onUpdateStatus,
  onOpenNewPost,
  isPro = false
}) => {
  const [draggedPostId, setDraggedPostId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<PostStatus | null>(null);
  const draggedPostIdRef = useRef<string | null>(null);
  const isDraggingRef = useRef(false);

  const draggedPost = draggedPostId ? posts.find((p) => p.id === draggedPostId) : null;

  // Allow dragging any proposal on the roadmap board
  const canMovePost = (_post: FeedbackPost) => true;

  const formatRelativeTime = (dateStr: string) => {
    const now = Date.now();
    const then = new Date(dateStr).getTime();
    const diffSeconds = Math.max(0, Math.floor((now - then) / 1000));
    if (diffSeconds < 60) return 'Just now';
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `${diffDays}d ago`;
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleDragStart = (e: React.DragEvent, post: FeedbackPost) => {
    isDraggingRef.current = true;
    draggedPostIdRef.current = post.id;
    setDraggedPostId(post.id);
    e.dataTransfer.setData('text/plain', post.id);
    e.dataTransfer.setData('application/json', JSON.stringify({ id: post.id }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedPostId(null);
    draggedPostIdRef.current = null;
    setDragOverColId(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const handleDragOver = (e: React.DragEvent, columnId: PostStatus) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColId !== columnId) {
      setDragOverColId(columnId);
    }
  };

  const handleDragEnter = (e: React.DragEvent, columnId: PostStatus) => {
    e.preventDefault();
    e.stopPropagation();
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
    e.stopPropagation();
    const dataTransferId = e.dataTransfer.getData('text/plain');
    const postId = dataTransferId || draggedPostIdRef.current || draggedPostId;
    
    setDragOverColId(null);
    setDraggedPostId(null);
    draggedPostIdRef.current = null;

    setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);

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
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={(e) => handleDragLeave(e, column.id)}
              onDrop={(e) => handleDrop(e, column.id)}
              className={`flex flex-col rounded-2xl p-3.5 backdrop-blur-md min-h-[560px] transition-all duration-150 ${
                isDropTarget
                  ? `bg-zinc-900/80 border-2 border-dashed ${column.dropBorder} ${column.dropBg} shadow-lg shadow-black/40 ring-1 ring-zinc-700/50`
                  : 'bg-zinc-950/40 border border-zinc-800/80'
              }`}
            >
              {/* Column Header (Kanbaaan style: status dot, title, tabular count, quick add) */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3 select-none">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                  <h3 className="font-semibold text-sm text-zinc-100 flex items-center gap-1.5">
                    <Icon size={15} className={column.accentColor} />
                    <span>{column.title}</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium tabular-nums bg-zinc-900 text-zinc-400 border border-zinc-800">
                    {colPosts.length}
                  </span>
                  {onOpenNewPost && (
                    <button
                      type="button"
                      onClick={() => onOpenNewPost()}
                      className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer select-none"
                      title={`Add proposal to ${column.title}`}
                      aria-label={`Add proposal to ${column.title}`}
                    >
                      <RunePlus size={13} />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-[11px] text-zinc-400 mb-3 px-1 -mt-1 select-none">
                {column.subtitle}
              </p>

              {/* Cards column */}
              <div 
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDrop={(e) => handleDrop(e, column.id)}
                className="flex flex-col gap-3 flex-1 overflow-y-auto pt-1 pb-2 px-1 -mx-1"
              >
                {/* Drop Slot Indicator when dragging over this column */}
                {isDropTarget && (
                  <div 
                    onDragOver={(e) => handleDragOver(e, column.id)}
                    onDrop={(e) => handleDrop(e, column.id)}
                    className="flex items-center justify-center gap-2 py-3.5 px-3 rounded-xl border-2 border-dashed border-indigo-500/50 bg-indigo-500/10 text-xs font-medium text-zinc-200 transition-all animate-pulse select-none"
                  >
                    <RuneArrowRight size={14} className={column.accentColor} />
                    <span>Drop here to move to {column.title}</span>
                  </div>
                )}

                {colPosts.length === 0 && !isDropTarget ? (
                  <div 
                    onDragOver={(e) => handleDragOver(e, column.id)}
                    onDrop={(e) => handleDrop(e, column.id)}
                    className="flex flex-col items-center justify-center h-48 border border-dashed border-zinc-800/80 rounded-xl p-4 text-center select-none"
                  >
                    <Icon size={20} className={`${column.accentColor} opacity-40 mb-2`} />
                    <p className="text-xs text-zinc-400 font-medium">No proposals in this milestone</p>
                    <p className="text-[11px] text-zinc-600 mt-0.5">Drag cards here</p>
                    {onOpenNewPost && (
                      <button
                        type="button"
                        onClick={() => onOpenNewPost()}
                        className="mt-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-zinc-300 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
                      >
                        <RunePlus size={11} />
                        <span>Add proposal</span>
                      </button>
                    )}
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
                        className={`group select-none cursor-grab active:cursor-grabbing p-3.5 flex flex-col rounded-xl transition-[transform,border-color,box-shadow,background-color] duration-150 border-zinc-800/80 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/50 will-change-transform ${
                          isBeingDragged
                            ? 'opacity-30 scale-[0.98] border-dashed border-zinc-500 bg-zinc-900/40 rotate-0'
                            : 'hover:-translate-y-0.5'
                        } ${
                          post.is_pinned ? 'border-zinc-700/80 bg-zinc-900/60' : 'bg-zinc-900/35 hover:bg-zinc-900/60'
                        }`}
                      >
                        {/* Top Meta Bar: Category badge, Pinned indicator & Drag Handle */}
                        <div className="flex items-center justify-between gap-2 mb-2 select-none">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <CategoryBadge category={post.category} />
                            {post.is_pinned && (
                              <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-300/90 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-md">
                                <RunePin size={11} className="text-amber-400" />
                                <span>PINNED</span>
                              </div>
                            )}
                          </div>

                          {/* Tactile Drag Handle */}
                          <div 
                            title="Drag to move milestone"
                            className="text-zinc-500 group-hover:text-zinc-300 transition-colors p-0.5 -mr-1 cursor-grab active:cursor-grabbing"
                          >
                            <RuneGripVertical size={14} />
                          </div>
                        </div>

                        {/* Title & Description with text balance / pretty */}
                        <h4 className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors line-clamp-2 mb-1 leading-snug select-none text-balance">
                          {post.title}
                        </h4>

                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-2.5 flex-1 select-none text-pretty">
                          {post.description}
                        </p>

                        {/* Meta info: Created relative date & quick mover */}
                        <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-500 mb-2.5 select-none">
                          <div className="flex items-center gap-1.5">
                            <span className="tabular-nums">{formatRelativeTime(post.created)}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className="text-zinc-400 capitalize">{post.category}</span>
                          </div>

                          {/* Accessible Quick Status Selector (1-Click Move) */}
                          {onUpdateStatus && (
                            <div 
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              draggable={false}
                              className="inline-flex items-center"
                            >
                              <CustomSelect<PostStatus>
                                value={post.status}
                                onChange={(val) => onUpdateStatus(post.id, val)}
                                options={[
                                  { value: 'under_review', label: 'Under Review', icon: <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" /> },
                                  { value: 'planned', label: 'Planned', icon: <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" /> },
                                  { value: 'in_progress', label: 'In Progress', icon: <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /> },
                                  { value: 'completed', label: 'Completed', icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" /> },
                                ]}
                                size="xs"
                                align="left"
                                ariaLabel={`Change milestone for ${post.title}`}
                              />
                            </div>
                          )}
                        </div>

                        {/* Footer: Author avatar on left, Comments count & Upvote button on right */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/60 text-[11px] text-zinc-400 select-none">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <UserAvatar name={post.author.name} size="xs" />
                            <span className="truncate max-w-[85px] font-medium text-zinc-300">{post.author.name}</span>
                            {post.author.is_pro && (
                              <span className="text-[9px] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 px-1 rounded">Supporter</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <div className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-200">
                              <RuneMessageSquare size={13} />
                              <span className="font-medium font-mono tabular-nums">{post.comments_count}</span>
                            </div>

                            <div
                              onClick={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              draggable={false}
                            >
                              <UpvoteButton
                                count={post.upvotes_count}
                                hasVoted={post.has_voted}
                                onVote={() => onVote(post.id)}
                                orientation="horizontal"
                                isPro={isPro}
                              />
                            </div>
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
