import React, { useState } from 'react';
import { FeedbackPost, Comment, User, PostStatus } from '../types';
import { UpvoteButton } from './UpvoteButton';
import { StatusBadge, CategoryBadge } from './StatusBadge';
import { 
  RuneX, 
  RunePin, 
  RuneShield, 
  RuneCheck, 
  RuneMessageSquare, 
  RuneSend, 
  RuneTrash 
} from './icons/RuneIcons';
import { DeleteButton } from './ui/DeleteButton';
import { ReactionPill } from './ui/ReactionPill';
import { UserAvatar } from './ui/UserAvatar';

interface PostDetailModalProps {
  post: FeedbackPost;
  currentUser: User | null;
  comments: Comment[];
  onClose: () => void;
  onVote: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onUpdateStatus?: (postId: string, status: PostStatus) => void;
  onTogglePin?: (postId: string) => void;
  onDeletePost?: (postId: string) => void;
  onDeleteComment?: (commentId: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  currentUser,
  comments,
  onClose,
  onVote,
  onAddComment,
  onUpdateStatus,
  onTogglePin,
  onDeletePost,
  onDeleteComment
}) => {
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [statusSuccessMessage, setStatusSuccessMessage] = useState(false);

  const postComments = comments.filter((c) => c.post_id === post.id);
  const isAdmin = currentUser?.role === 'admin';

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !currentUser) return;

    setIsSubmittingComment(true);
    onAddComment(post.id, commentText.trim());
    setCommentText('');
    setIsSubmittingComment(false);
  };

  const handleStatusChange = (newStatus: PostStatus) => {
    if (onUpdateStatus) {
      onUpdateStatus(post.id, newStatus);
      setStatusSuccessMessage(true);
      setTimeout(() => setStatusSuccessMessage(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0d0f17] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-modal-in overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors z-20"
        >
          <RuneX size={18} />
        </button>

        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pr-10">
          <CategoryBadge category={post.category} />
          <StatusBadge status={post.status} size="md" />
          {post.is_pinned && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              <RunePin size={11} />
              <span>Pinned</span>
            </span>
          )}
        </div>

        {/* Post Title & Upvote */}
        <div className="flex items-start gap-4 mb-5">
          <UpvoteButton
            count={post.upvotes_count}
            hasVoted={post.has_voted}
            onVote={() => onVote(post.id)}
            orientation="vertical"
            isPro={Boolean(currentUser?.is_pro)}
          />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight leading-snug">
              {post.title}
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
              <UserAvatar name={post.author.name} size="xs" />
              <span className="text-zinc-200 font-medium">{post.author.name}</span>
              {post.author.is_pro && (
                <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/15 px-1 py-0.2 rounded border border-amber-500/30">PRO</span>
              )}
              <span>•</span>
              <span>{new Date(post.created).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        {/* Full description */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-300 text-sm leading-relaxed mb-4 whitespace-pre-line">
          {post.description}
        </div>

        {/* Reaction Pill from rare-ui */}
        <div className="mb-6 flex items-center justify-between">
          <ReactionPill postId={post.id} />
          <span className="text-[11px] text-zinc-500">React with quick emoji sentiment</span>
        </div>

        {/* ADMIN MODERATION CONTROLS (RBAC defense requirement) */}
        {isAdmin && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-300">
                <RuneShield size={16} className="text-rose-400" />
                <span>Admin Moderation Panel (Authorized as Dmitri Allikvee)</span>
              </div>
              {statusSuccessMessage && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <RuneCheck size={12} /> Status Updated!
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Change status */}
              <div className="flex items-center gap-2 text-xs">
                <label htmlFor="admin-status-select" className="text-zinc-300 font-medium">Set Roadmap Status:</label>
                <select
                  id="admin-status-select"
                  value={post.status}
                  onChange={(e) => handleStatusChange(e.target.value as PostStatus)}
                  aria-label="Set roadmap status"
                  className="bg-zinc-900 border border-zinc-700 rounded-xl px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="under_review">💡 Under Review</option>
                  <option value="planned">📌 Planned</option>
                  <option value="in_progress">⚡ In Progress</option>
                  <option value="completed">✅ Completed</option>
                  <option value="closed">❌ Closed</option>
                </select>
              </div>

              {/* Pin toggle */}
              {onTogglePin && (
                <button
                  type="button"
                  onClick={() => onTogglePin(post.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                    post.is_pinned
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  <RunePin size={13} />
                  <span>{post.is_pinned ? 'Unpin Feature' : 'Pin to Top'}</span>
                </button>
              )}

              {/* Delete post with rare-ui DeleteButton */}
              {onDeletePost && (
                <div className="ml-auto">
                  <DeleteButton
                    onConfirm={() => {
                      onDeletePost(post.id);
                      onClose();
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Discussion Section */}
        <div className="border-t border-zinc-800/80 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
              <RuneMessageSquare size={16} className="text-indigo-400" />
              <span>Discussion & Feedback</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-400">
                {postComments.length}
              </span>
            </h3>
          </div>

          {/* New comment input */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800 p-2 focus-within:border-zinc-700 transition-colors">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!currentUser}
                placeholder={currentUser ? `Leave constructive feedback as ${currentUser.name}...` : 'Please sign in to join the discussion...'}
                rows={2}
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 p-2 focus:outline-none resize-none disabled:opacity-60"
              />
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 px-2">
                <span className="text-[11px] text-zinc-500">
                  {commentText.length}/500 chars
                </span>
                <button
                  type="submit"
                  disabled={!commentText.trim() || isSubmittingComment || !currentUser}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  <RuneSend size={13} />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {postComments.length === 0 ? (
              <p className="text-xs text-zinc-500 italic py-2 text-center">
                No comments yet. Share your thoughts or technical context!
              </p>
            ) : (
              postComments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 text-xs text-zinc-300"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={comment.author.name} size="xs" />
                      <span className="font-semibold text-zinc-200">{comment.author.name}</span>
                      {comment.author.role === 'admin' && (
                        <span className="text-[9px] font-bold text-rose-400 bg-rose-500/15 border border-rose-500/30 px-1.5 py-0.2 rounded">
                          MODERATOR
                        </span>
                      )}
                      {comment.author.is_pro && comment.author.role !== 'admin' && (
                        <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1 py-0.2 rounded">
                          PRO
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500">
                        {new Date(comment.created).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {isAdmin && onDeleteComment && (
                        <button
                          onClick={() => onDeleteComment(comment.id)}
                          className="text-zinc-500 hover:text-rose-400 p-0.5 transition-colors"
                          title="Delete inappropriate comment"
                        >
                          <RuneTrash size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-zinc-300 leading-relaxed pl-6">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
