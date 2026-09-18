import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  RuneTrash,
  RuneCopy,
  RuneCheckCheck
} from './icons/RuneIcons';
import { DeleteButton } from './ui/DeleteButton';
import { ReactionPill } from './ui/ReactionPill';
import { UserAvatar } from './ui/UserAvatar';
import { CustomSelect } from './ui/CustomSelect';

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
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?post=${post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const postComments = comments.filter((c) => c.post_id === post.id);
  const isAdmin = currentUser?.role === 'admin';
  const isAuthor = Boolean(currentUser && currentUser.id === post.author.id);
  const canModerate = isAdmin || isAuthor;

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl bg-[#0c0d12] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions bar top-right */}
        <div className="absolute top-5 right-5 flex items-center gap-1.5 z-20">
          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handleCopyLink}
            aria-label="Copy proposal link"
            title="Copy proposal link"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer border border-zinc-800/60 bg-zinc-900/40"
          >
            {copiedLink ? (
              <>
                <RuneCheckCheck size={14} className="text-emerald-400" />
                <span className="text-[11px] text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <RuneCopy size={14} />
                <span className="text-[11px]">Share</span>
              </>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors cursor-pointer"
          >
            <RuneX size={18} />
          </motion.button>
        </div>

        {/* Header tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4 pr-10">
          <CategoryBadge category={post.category} />
          <StatusBadge status={post.status} size="md" />
          {post.is_pinned && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-300 bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-700">
              <RunePin size={11} className="text-zinc-400" />
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
                <span className="text-[9px] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 px-1.5 py-0.2 rounded">Supporter</span>
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

        {/* Reaction Pill */}
        <div className="mb-6 flex items-center justify-between">
          <ReactionPill postId={post.id} />
          <span className="text-[11px] text-zinc-500">Quick reactions</span>
        </div>

        {/* MODERATION / STATUS CONTROLS */}
        {canModerate && (
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                <RuneShield size={15} className="text-zinc-400" />
                <span>{isAdmin ? 'Moderation Controls (Admin)' : 'Proposal Controls (Author)'}</span>
              </div>
              {statusSuccessMessage && (
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <RuneCheck size={12} /> Status Updated
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Change status */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400 font-medium">Status:</span>
                <CustomSelect<PostStatus>
                  value={post.status}
                  onChange={(val) => handleStatusChange(val)}
                  options={[
                    { 
                      value: 'under_review', 
                      label: 'Under Review', 
                      icon: <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" /> 
                    },
                    { 
                      value: 'planned', 
                      label: 'Planned', 
                      icon: <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" /> 
                    },
                    { 
                      value: 'in_progress', 
                      label: 'In Progress', 
                      icon: <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" /> 
                    },
                    { 
                      value: 'completed', 
                      label: 'Completed', 
                      icon: <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" /> 
                    },
                    { 
                      value: 'closed', 
                      label: 'Closed', 
                      icon: <span className="w-2 h-2 rounded-full bg-zinc-500 shrink-0" /> 
                    },
                  ]}
                  size="sm"
                  align="left"
                  ariaLabel="Set roadmap status"
                />
              </div>

              {/* Pin toggle */}
              {onTogglePin && (
                <button
                  type="button"
                  onClick={() => onTogglePin(post.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    post.is_pinned
                      ? 'bg-zinc-800 text-zinc-100 border-zinc-600'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-700 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  <RunePin size={13} />
                  <span>{post.is_pinned ? 'Unpin Proposal' : 'Pin to Top'}</span>
                </button>
              )}

              {/* Delete post */}
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
              <RuneMessageSquare size={15} className="text-zinc-400" />
              <span>Discussion</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
                {postComments.length}
              </span>
            </h3>
          </div>

          {/* New comment input */}
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <div className="relative rounded-2xl bg-zinc-900/80 border border-zinc-800 p-2.5 focus-within:border-indigo-500/60 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:bg-zinc-900 transition-all duration-150 shadow-sm">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!currentUser}
                placeholder={currentUser ? `Share constructive context as ${currentUser.name}...` : 'Sign in to join the discussion...'}
                rows={2}
                className="w-full bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 p-1.5 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 resize-none disabled:opacity-60 no-focus-ring"
              />
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 px-1.5 mt-0.5">
                <span className="text-[11px] text-zinc-500 font-mono">
                  {commentText.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!commentText.trim() || isSubmittingComment || !currentUser}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-[0.98]"
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
                        <span className="text-[9px] font-medium text-rose-400 bg-rose-500/10 border border-rose-500/30 px-1.5 py-0.2 rounded">
                          MODERATOR
                        </span>
                      )}
                      {comment.author.is_pro && comment.author.role !== 'admin' && (
                        <span className="text-[9px] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 px-1.5 py-0.2 rounded">
                          Supporter
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
                          className="text-zinc-500 hover:text-rose-400 p-0.5 transition-colors cursor-pointer"
                          title="Delete comment"
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

      </motion.div>
    </motion.div>
  );
};
