import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FeedbackPost, SortOption } from '../types';
import { UpvoteButton } from './UpvoteButton';
import { StatusBadge, CategoryBadge } from './StatusBadge';
import { SpotlightCard } from './ui/SpotlightCard';
import { UserAvatar } from './ui/UserAvatar';
import { 
  RuneFilter, 
  RuneArrowUpDown, 
  RunePin, 
  RuneMessageSquare, 
  RuneSparkles,
  RuneFlame,
  RuneClock,
  RuneLayers,
  RuneCode,
  RuneZap,
  RuneBug,
  RunePlug,
  RunePalette,
  RuneInbox,
  RuneRotateCcw
} from './icons/RuneIcons';
import { CustomSelect } from './ui/CustomSelect';

interface PostListProps {
  posts: FeedbackPost[];
  onVote: (postId: string) => void;
  onSelectPost: (post: FeedbackPost) => void;
  isPro?: boolean;
}

export const PostList: React.FC<PostListProps> = ({
  posts,
  onVote,
  onSelectPost,
  isPro = false
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('votes');

  // Filter
  const filteredPosts = posts.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Sort
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;

    if (sortBy === 'votes') {
      if (b.upvotes_count !== a.upvotes_count) {
        return b.upvotes_count - a.upvotes_count;
      }
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
    if (sortBy === 'newest') {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
    if (sortBy === 'trending') {
      const scoreA = a.upvotes_count * 1.5 + a.comments_count * 2;
      const scoreB = b.upvotes_count * 1.5 + b.comments_count * 2;
      return scoreB - scoreA;
    }
    return 0;
  });

  const categories: { id: string; label: string; icon: React.ComponentType<{ size?: number | string; className?: string }> }[] = [
    { id: 'all', label: 'All Topics', icon: RuneLayers },
    { id: 'feature', label: 'Features', icon: RuneCode },
    { id: 'improvement', label: 'Improvements', icon: RuneZap },
    { id: 'bug', label: 'Bug Reports', icon: RuneBug },
    { id: 'integration', label: 'Integrations', icon: RunePlug },
    { id: 'ui-ux', label: 'UI / UX', icon: RunePalette },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Filters and Sorting bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 backdrop-blur-md relative z-20">
        
        {/* Category Filter Pills with Snappy Sliding Indicator */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5">
          <RuneFilter size={14} className="text-zinc-500 mr-1 hidden lg:block shrink-0" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors duration-100 cursor-pointer select-none ${
                  isActive
                    ? 'text-zinc-950 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-xl bg-zinc-100 shadow-sm"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon size={12} className={isActive ? 'relative z-10 text-zinc-950' : 'relative z-10 text-zinc-500'} />
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Total count & Sort Selector */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
          <span className="text-zinc-400 whitespace-nowrap">
            Showing <strong className="text-zinc-200 font-mono">{sortedPosts.length}</strong> items
          </span>

          <CustomSelect<SortOption>
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            icon={<RuneArrowUpDown size={13} className="text-zinc-400" />}
            options={[
              { value: 'votes', label: 'Most Upvoted', icon: <RuneSparkles size={13} className="text-amber-400" /> },
              { value: 'trending', label: 'Trending', icon: <RuneFlame size={13} className="text-orange-400" /> },
              { value: 'newest', label: 'Newest First', icon: <RuneClock size={13} className="text-blue-400" /> },
            ]}
            size="sm"
            align="right"
            ariaLabel="Sort feedback posts"
          />
        </div>

      </div>

      {/* Post List */}
      <div className="space-y-3">
        {sortedPosts.length === 0 ? (
          <div className="p-10 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-3 shadow-inner">
              <RuneInbox size={22} />
            </div>
            <p className="text-sm font-semibold text-zinc-200">No proposals match your current filters</p>
            <p className="text-xs text-zinc-500 mt-1 max-w-sm">Try resetting your category or search to discover all community ideas.</p>
            {selectedCategory !== 'all' && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setSelectedCategory('all')}
                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors cursor-pointer shadow-sm"
              >
                <RuneRotateCcw size={12} />
                <span>Reset to All Topics</span>
              </motion.button>
            )}
          </div>
        ) : (
          sortedPosts.map((post) => (
            <SpotlightCard
              key={post.id}
              spotlightColor="rgba(255, 255, 255, 0.03)"
              onClick={() => onSelectPost(post)}
              className={`group flex items-start gap-4 p-4 sm:p-5 rounded-2xl cursor-pointer transition-[transform,border-color,background-color] duration-150 ease-out hover:-translate-y-0.5 border-zinc-800/80 hover:border-zinc-700 bg-zinc-900/30 ${
                post.is_pinned ? 'border-zinc-700 bg-zinc-900/50' : ''
              }`}
            >

              {/* Upvote column on left */}
              <div className="relative z-10 flex-shrink-0 pt-0.5">
                <UpvoteButton
                  count={post.upvotes_count}
                  hasVoted={post.has_voted}
                  onVote={() => onVote(post.id)}
                  orientation="vertical"
                  isPro={isPro}
                />
              </div>

              {/* Post content in center */}
              <div className="relative z-10 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {post.is_pinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-zinc-300 bg-zinc-800 px-2 py-0.5 rounded-md border border-zinc-700">
                      <RunePin size={11} className="text-zinc-400" />
                      PINNED
                    </span>
                  )}
                  <StatusBadge status={post.status} />
                  <CategoryBadge category={post.category} />
                </div>

                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors line-clamp-1 mb-1">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                  {post.description}
                </p>

                {/* Author footer */}
                <div className="flex items-center gap-2.5 sm:gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <UserAvatar name={post.author.name} size="xs" />
                    <span className="text-zinc-300 font-medium">{post.author.name}</span>
                    {post.author.is_pro && (
                      <span className="text-[9px] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded">Supporter</span>
                    )}
                  </div>

                  <span className="text-zinc-600">•</span>
                  <span>{new Date(post.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>

                  {/* Mobile-only comment counter in meta footer */}
                  <div className="sm:hidden ml-auto flex items-center gap-1 text-zinc-400">
                    <RuneMessageSquare size={12} />
                    <span className="font-mono text-xs">{post.comments_count}</span>
                  </div>
                </div>
              </div>

              {/* Comments counter pill (Desktop/Tablet) */}
              <div className="relative z-10 hidden sm:flex flex-shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 group-hover:border-zinc-700 transition-colors text-xs self-center">
                <RuneMessageSquare size={13} />
                <span className="font-medium font-mono">{post.comments_count}</span>
              </div>
            </SpotlightCard>
          ))
        )}
      </div>
    </div>
  );
};
