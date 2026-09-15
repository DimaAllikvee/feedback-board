import React, { useState } from 'react';
import { FeedbackPost, SortOption } from '../types';
import { UpvoteButton } from './UpvoteButton';
import { StatusBadge, CategoryBadge } from './StatusBadge';
import { SpotlightCard } from './ui/SpotlightCard';
import { BorderBeam } from './ui/BorderBeam';
import { 
  RuneFilter, 
  RuneArrowUpDown, 
  RunePin, 
  RuneMessageSquare, 
  RuneSparkles 
} from './icons/RuneIcons';

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
      return b.upvotes_count - a.upvotes_count;
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

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Topics' },
    { id: 'feature', label: 'Features' },
    { id: 'improvement', label: 'Improvements' },
    { id: 'bug', label: 'Bug Reports' },
    { id: 'integration', label: 'Integrations' },
    { id: 'ui-ux', label: 'UI / UX' },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Filters and Sorting bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 backdrop-blur-md">
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5">
          <RuneFilter size={15} className="text-zinc-500 mr-1 hidden lg:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/50 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Total count & Sort Selector */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3 text-xs">
          <span className="text-zinc-400 whitespace-nowrap">
            Showing <strong className="text-zinc-200">{sortedPosts.length}</strong> items
          </span>

          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-700/60 rounded-xl px-2.5 py-1.5">
            <RuneArrowUpDown size={14} className="text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Sort feedback posts"
              className="bg-transparent text-xs text-zinc-200 focus:outline-none cursor-pointer pr-1"
            >
              <option value="votes" className="bg-zinc-900 text-zinc-200">Most Upvoted</option>
              <option value="trending" className="bg-zinc-900 text-zinc-200">Trending</option>
              <option value="newest" className="bg-zinc-900 text-zinc-200">Newest First</option>
            </select>
          </div>
        </div>

      </div>

      {/* Post List */}
      <div className="space-y-3">
        {sortedPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20">
            <RuneSparkles size={32} className="text-zinc-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-zinc-300">No proposals match your current filters</p>
            <p className="text-xs text-zinc-500 mt-1">Try resetting the filters or submit the first idea!</p>
          </div>
        ) : (
          sortedPosts.map((post) => (
            <SpotlightCard
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 border-zinc-800 hover:border-indigo-500/40"
            >
              {post.is_pinned && <BorderBeam size={180} duration={9} colorFrom="#6366f1" colorTo="#3b82f6" />}

              {/* Upvote column on left */}
              <div className="flex-shrink-0 pt-0.5">
                <UpvoteButton
                  count={post.upvotes_count}
                  hasVoted={post.has_voted}
                  onVote={() => onVote(post.id)}
                  orientation="vertical"
                  isPro={isPro}
                />
              </div>

              {/* Post content in center */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {post.is_pinned && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/15 px-2 py-0.5 rounded-md border border-indigo-500/30">
                      <RunePin size={11} className="text-indigo-400" />
                      PINNED
                    </span>
                  )}
                  <StatusBadge status={post.status} />
                  <CategoryBadge category={post.category} />
                </div>

                <h3 className="text-base font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors line-clamp-1 mb-1">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-3">
                  {post.description}
                </p>

                {/* Author footer */}
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={post.author.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                      alt={post.author.name}
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="text-zinc-300 font-medium">{post.author.name}</span>
                    {post.author.is_pro && (
                      <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1 py-0.5 rounded">PRO</span>
                    )}
                  </div>

                  <span>•</span>
                  <span>{new Date(post.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Comments counter pill */}
              <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 text-xs">
                <RuneMessageSquare size={13} />
                <span className="font-bold">{post.comments_count}</span>
              </div>
            </SpotlightCard>
          ))
        )}
      </div>
    </div>
  );
};
