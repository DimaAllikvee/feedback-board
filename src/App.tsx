import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FeedbackPost, 
  Comment, 
  User, 
  ActiveTab, 
  PostCategory, 
  PostStatus 
} from './types';
import { 
  pb, 
  INITIAL_POSTS,
  INITIAL_COMMENTS 
} from './lib/pocketbase';
import { Navbar } from './components/Navbar';
import { KanbanBoard } from './components/KanbanBoard';
import { PostList } from './components/PostList';
import { PostDetailModal } from './components/PostDetailModal';
import { NewPostModal } from './components/NewPostModal';
import { StripeProModal } from './components/StripeProModal';
import { AuthModal } from './components/AuthModal';
import { AuthGate } from './components/AuthGate';
import { ShowcaseModal } from './components/ShowcaseModal';
import { ToastStack, ToastMessage } from './components/ui/Toast';
import { RuneCrown } from './components/icons/RuneIcons';

export const App: React.FC = () => {
  // Start unauthenticated (User is NOT logged in by default)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (pb.authStore.isValid && pb.authStore.record) {
      const rec = pb.authStore.record;
      return {
        id: rec.id,
        name: rec.name || rec.email?.split('@')[0] || 'Member',
        email: rec.email,
        role: rec.role || 'user',
        is_pro: Boolean(rec.is_pro),
      };
    }
    return null;
  });

  const [posts, setPosts] = useState<FeedbackPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('roadmap');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  // Modals
  const [selectedPost, setSelectedPost] = useState<FeedbackPost | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isStripeModalOpen, setIsStripeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState(false);

  // Search input ref for keyboard shortcut (⌘K / /)
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Toast Helper
  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'admin' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync PocketBase auth state
  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((token, record) => {
      if (token && record) {
        setCurrentUser({
          id: record.id,
          name: record.name || record.email?.split('@')[0] || 'Member',
          email: record.email,
          role: record.role || 'user',
          is_pro: Boolean(record.is_pro),
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Keyboard Shortcuts (Design System Checklist & Cal.com patterns)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      const isInputFocused = activeTag === 'input' || activeTag === 'textarea';

      // ⌘K or / to search
      if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) && !isInputFocused) {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // 'N' for New Proposal
      if (e.key.toLowerCase() === 'n' && !isInputFocused && !selectedPost && !isNewPostOpen && !isStripeModalOpen && !isAuthModalOpen) {
        e.preventDefault();
        if (!currentUser) {
          addToast('Sign In Required', 'Please sign in to submit a proposal.', 'info');
          setIsAuthModalOpen(true);
        } else {
          setIsNewPostOpen(true);
        }
        return;
      }

      // Escape to close active modal
      if (e.key === 'Escape') {
        setSelectedPost(null);
        setIsNewPostOpen(false);
        setIsStripeModalOpen(false);
        setIsAuthModalOpen(false);
        setIsShowcaseOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser, selectedPost, isNewPostOpen, isStripeModalOpen, isAuthModalOpen, isShowcaseOpen]);

  // Load live data from PocketBase (fallback to initial posts if PB empty or offline)
  useEffect(() => {
    async function loadDataFromPocketBase() {
      try {
        const [postRecords, commentRecords] = await Promise.all([
          pb.collection('posts').getFullList({
            sort: '-created',
            expand: 'author',
          }),
          pb.collection('comments').getFullList({
            sort: 'created',
            expand: 'author',
          }).catch(() => []),
        ]);

        let userVotedPostIds = new Set<string>();
        if (pb.authStore.isValid && pb.authStore.record?.id) {
          try {
            const userVotes = await pb.collection('votes').getFullList({
              filter: `user = "${pb.authStore.record.id}"`,
            });
            userVotedPostIds = new Set(userVotes.map((v) => v.post));
          } catch {
            // votes read optional
          }
        }

        if (postRecords && postRecords.length > 0) {
          const mappedPosts: FeedbackPost[] = postRecords.map((r) => ({
            id: r.id,
            title: r.title,
            description: r.description,
            category: r.category as PostCategory,
            status: r.status as PostStatus,
            author: {
              id: r.expand?.author?.id || r.author,
              name: r.expand?.author?.name || 'Community Member',
              avatar: r.expand?.author?.avatar,
              is_pro: Boolean(r.expand?.author?.is_pro),
              role: r.expand?.author?.role || 'user',
            },
            upvotes_count: r.upvotes_count || 0,
            has_voted: userVotedPostIds.has(r.id),
            comments_count: r.comments_count || 0,
            is_pinned: Boolean(r.is_pinned),
            created: r.created,
            updated: r.updated,
          }));
          setPosts(mappedPosts);

          const mappedComments: Comment[] = (commentRecords || []).map((c) => ({
            id: c.id,
            post_id: c.post,
            author: {
              id: c.expand?.author?.id || c.author,
              name: c.expand?.author?.name || 'Community Member',
              avatar: c.expand?.author?.avatar,
              is_pro: Boolean(c.expand?.author?.is_pro),
              role: c.expand?.author?.role || 'user',
            },
            content: c.content,
            created: c.created,
          }));
          setComments(mappedComments);
        } else {
          setPosts(INITIAL_POSTS);
          setComments(INITIAL_COMMENTS);
        }
      } catch {
        setPosts(INITIAL_POSTS);
        setComments(INITIAL_COMMENTS);
      }
    }
    loadDataFromPocketBase();
  }, []);

  // Sync user's personal votes when auth changes
  useEffect(() => {
    async function syncUserVotes() {
      if (!pb.authStore.isValid || !pb.authStore.record?.id) {
        setPosts((prev) => prev.map((p) => ({ ...p, has_voted: false })));
        return;
      }
      try {
        const userVotes = await pb.collection('votes').getFullList({
          filter: `user = "${pb.authStore.record.id}"`,
        });
        const votedSet = new Set(userVotes.map((v) => v.post));
        setPosts((prev) =>
          prev.map((p) => ({
            ...p,
            has_voted: votedSet.has(p.id),
          }))
        );
      } catch {
        // silent fallback
      }
    }
    syncUserVotes();
  }, [currentUser]);

  // Filter posts based on search query
  const filteredPosts = posts.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    
    if (!matchesSearch) return false;

    if (activeTab === 'my-posts') {
      return currentUser ? (p.author.id === currentUser.id || p.author.name === currentUser.name) : false;
    }
    if (activeTab === 'my-votes') {
      return Boolean(p.has_voted);
    }
    return true;
  });

  // Upvote Action (Calculates weights: PRO users get 3x voting weight!)
  const handleVote = async (postId: string) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to upvote feature proposals.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const alreadyVoted = Boolean(post.has_voted);
    const weight = currentUser.is_pro ? 3 : 1;
    const newCount = alreadyVoted
      ? Math.max(0, post.upvotes_count - weight)
      : post.upvotes_count + weight;

    // Optimistic UI update
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id === postId) {
          const updated = {
            ...p,
            has_voted: !alreadyVoted,
            upvotes_count: newCount,
          };

          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }

          return updated;
        }
        return p;
      })
    );

    if (!alreadyVoted) {
      addToast(
        'Vote Registered',
        currentUser.is_pro ? '+3 Supporter Priority Votes recorded!' : '+1 vote recorded.',
        'success'
      );
    } else {
      addToast('Vote Removed', 'Your upvote has been revoked.', 'info');
    }

    // Persist to PocketBase
    try {
      const userId = pb.authStore.record?.id || currentUser.id;
      if (!alreadyVoted) {
        await pb.collection('votes').create({
          user: userId,
          post: postId,
          weight,
        });
      } else {
        const existing = await pb.collection('votes').getFirstListItem(`user="${userId}" && post="${postId}"`);
        if (existing) {
          await pb.collection('votes').delete(existing.id);
        }
      }

      await pb.collection('posts').update(postId, {
        upvotes_count: newCount,
      });
    } catch (err) {
      console.warn('PocketBase vote sync note:', err);
    }
  };

  // Submit New Proposal (Directly saved to PocketBase)
  const handleCreatePost = async (data: { title: string; description: string; category: PostCategory }) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to submit a proposal.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const initialWeight = currentUser.is_pro ? 3 : 1;
    let authorId = pb.authStore.record?.id || currentUser.id;

    // Ensure authorId is a valid record in users collection
    if (authorId === '7lti87ubaxdufdd' || !authorId || authorId.startsWith('u-')) {
      try {
        const match = await pb.collection('users').getFirstListItem(`email="${currentUser.email}"`);
        if (match) {
          authorId = match.id;
        } else {
          authorId = 'y8i7grvvdm2hn37';
        }
      } catch {
        authorId = 'y8i7grvvdm2hn37';
      }
    }

    try {
      // 1. Create post directly in PocketBase
      const record = await pb.collection('posts').create({
        title: data.title.trim(),
        description: data.description.trim(),
        category: data.category,
        status: 'under_review',
        author: authorId,
        upvotes_count: initialWeight,
        comments_count: 0,
        is_pinned: false,
      }, { expand: 'author' });

      // 2. Register initial author vote in votes collection
      try {
        await pb.collection('votes').create({
          user: authorId,
          post: record.id,
          weight: initialWeight,
        });
      } catch (voteErr) {
        console.warn('Initial vote record creation notice:', voteErr);
      }

      // 3. Construct the UI post object with the real PocketBase ID
      const newPost: FeedbackPost = {
        id: record.id,
        title: record.title,
        description: record.description,
        category: record.category as PostCategory,
        status: record.status as PostStatus,
        author: {
          id: record.expand?.author?.id || authorId,
          name: record.expand?.author?.name || currentUser.name,
          avatar: record.expand?.author?.avatar,
          is_pro: currentUser.is_pro,
          role: currentUser.role,
        },
        upvotes_count: initialWeight,
        has_voted: true,
        comments_count: 0,
        is_pinned: false,
        created: record.created,
        updated: record.updated,
      };

      setPosts((prev) => [newPost, ...prev]);
      setSelectedPost(newPost); // Immediately open created post so user sees it front & center
      addToast('Idea Published', 'Your feature proposal is saved to PocketBase and live on the board.', 'success');
    } catch (err: any) {
      console.error('Failed to create post in PocketBase:', err);
      const errMsg = err?.data?.message || err?.message || 'Could not save post to PocketBase.';
      addToast('Error Publishing Idea', errMsg, 'admin');
    }
  };

  // Add Comment (Persisted to PocketBase)
  const handleAddComment = async (postId: string, content: string) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to add comments.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const authorId = pb.authStore.record?.id || currentUser.id;

    try {
      const record = await pb.collection('comments').create({
        post: postId,
        author: authorId,
        content: content.trim(),
      }, { expand: 'author' });

      const newComment: Comment = {
        id: record.id,
        post_id: postId,
        author: {
          id: record.expand?.author?.id || authorId,
          name: record.expand?.author?.name || currentUser.name,
          avatar: record.expand?.author?.avatar,
          is_pro: currentUser.is_pro,
          role: currentUser.role,
        },
        content: record.content,
        created: record.created,
      };

      setComments((prev) => [...prev, newComment]);

      const post = posts.find((p) => p.id === postId);
      const nextCommentsCount = (post?.comments_count || 0) + 1;

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const updated = { ...p, comments_count: nextCommentsCount };
            if (selectedPost && selectedPost.id === postId) {
              setSelectedPost(updated);
            }
            return updated;
          }
          return p;
        })
      );

      // Persist comments_count to post
      try {
        await pb.collection('posts').update(postId, { comments_count: nextCommentsCount });
      } catch {
        // optional update
      }

      addToast('Comment Posted', 'Your reply was saved to PocketBase.', 'info');
    } catch (err: any) {
      console.error('Failed to save comment in PocketBase:', err);
      addToast('Failed to Post Comment', err?.message || 'Could not save comment to PocketBase', 'admin');
    }
  };

  // Roadmap milestone status update (Persisted to PocketBase)
  const handleUpdateStatus = async (postId: string, newStatus: PostStatus) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to update roadmap status.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    if (post.status === newStatus) return;

    const oldStatus = post.status;
    const isAuthor = currentUser.id === post.author.id;
    const isAdmin = currentUser.role === 'admin';

    if (!isAdmin && !isAuthor) {
      addToast('Permission Denied', 'Only project admins or the proposal author can update status.', 'admin');
      return;
    }

    const statusLabels: Record<PostStatus, string> = {
      under_review: 'Under Review',
      planned: 'Planned',
      in_progress: 'In Progress',
      completed: 'Completed',
      closed: 'Closed',
    };

    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updated = { ...p, status: newStatus, updated: new Date().toISOString() };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );

    addToast(
      'Milestone Updated',
      `Moved "${post.title.slice(0, 28)}${post.title.length > 28 ? '...' : ''}" to ${statusLabels[newStatus]}`,
      'admin'
    );

    try {
      await pb.collection('posts').update(postId, { status: newStatus });
    } catch (err: any) {
      console.error('PocketBase status update failed:', err);
      // Revert optimistic update
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const reverted = { ...p, status: oldStatus };
            if (selectedPost && selectedPost.id === postId) {
              setSelectedPost(reverted);
            }
            return reverted;
          }
          return p;
        })
      );
      addToast('Update Failed', err?.message || 'Could not update status in PocketBase.', 'admin');
    }
  };

  // Admin pin toggle (Persisted to PocketBase)
  const handleTogglePin = async (postId: string) => {
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    const nextPinned = !post.is_pinned;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updated = { ...p, is_pinned: nextPinned };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );

    addToast(
      nextPinned ? 'Feature Pinned' : 'Feature Unpinned',
      nextPinned ? 'Pinned to top of list' : 'Returned to standard sorting',
      'admin'
    );

    try {
      await pb.collection('posts').update(postId, { is_pinned: nextPinned });
    } catch (err) {
      console.warn('PocketBase pin toggle note:', err);
    }
  };

  // Admin delete post (Persisted to PocketBase)
  const handleDeletePost = async (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setComments((prev) => prev.filter((c) => c.post_id !== postId));
    setSelectedPost(null);
    addToast('Proposal Deleted', 'Feature card removed from database.', 'admin');

    try {
      await pb.collection('posts').delete(postId);
    } catch (err) {
      console.warn('PocketBase delete post note:', err);
    }
  };

  // Admin delete comment (Persisted to PocketBase)
  const handleDeleteComment = async (commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
    if (selectedPost) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === selectedPost.id
            ? { ...p, comments_count: Math.max(0, p.comments_count - 1) }
            : p
        )
      );
    }
    addToast('Comment Removed', 'Moderation action completed.', 'admin');

    try {
      await pb.collection('comments').delete(commentId);
    } catch (err) {
      console.warn('PocketBase delete comment note:', err);
    }
  };

  // Log Out Handler
  const handleLogout = () => {
    pb.authStore.clear();
    setCurrentUser(null);
    addToast('Signed Out', 'You have been logged out of your session.', 'info');
  };

  const handleOpenNewPost = () => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to submit a proposal.', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    setIsNewPostOpen(true);
  };

  const handleOpenStripeModal = () => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in before joining as a Supporter.', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    setIsStripeModalOpen(true);
  };

  // Supporter Upgrade handler
  const handleUpgradeSuccess = (_transactionId: string) => {
    setCurrentUser((prev) => (prev ? { ...prev, is_pro: true } : prev));
    addToast('Supporter Membership Active!', 'Thank you! Enjoy 3x upvote priority and community perks.', 'success');
  };

  // Roadmap Metrics
  const underReviewCount = posts.filter((p) => p.status === 'under_review').length;
  const plannedCount = posts.filter((p) => p.status === 'planned').length;
  const inProgressCount = posts.filter((p) => p.status === 'in_progress').length;
  const completedCount = posts.filter((p) => p.status === 'completed').length;

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Top Navigation */}
      <Navbar
        currentUser={currentUser}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNewPost={handleOpenNewPost}
        onOpenStripeModal={handleOpenStripeModal}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        searchInputRef={searchInputRef}
      />

      {/* Dynamic Main Body: AuthGate for guests vs Full Roadmap/Board for logged in members */}
      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div
            key="auth-gate-view"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-center"
          >
            <AuthGate
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                addToast('Welcome back!', `Signed in as ${user.name}`, 'success');
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="board-view"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            {/* Decluttered Minimalist Hero with Inline Status Strip */}
            <section className="border-b border-zinc-800/80 bg-[#090a0f] py-7 sm:py-9">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 leading-tight">
                      Product Roadmap & Feedback
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                      Propose features, cast priority votes with supporter weight, and track engineering progress from review to shipped.
                    </p>
                  </div>

                  {/* Streamlined inline status indicators */}
                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                      <span className="text-zinc-400">Review:</span>
                      <span className="font-mono font-medium text-zinc-200">{underReviewCount}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80" />
                      <span className="text-zinc-400">Planned:</span>
                      <span className="font-mono font-medium text-zinc-200">{plannedCount}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80" />
                      <span className="text-zinc-400">In Progress:</span>
                      <span className="font-mono font-medium text-zinc-200">{inProgressCount}</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                      <span className="text-zinc-400">Completed:</span>
                      <span className="font-mono font-medium text-zinc-200">{completedCount}</span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
              {/* Active Tab Views with Snappy Emil Kowalski Transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeTab === 'roadmap' ? (
                    <KanbanBoard
                      posts={filteredPosts}
                      currentUser={currentUser}
                      onVote={handleVote}
                      onSelectPost={setSelectedPost}
                      onUpdateStatus={handleUpdateStatus}
                      isPro={Boolean(currentUser?.is_pro)}
                    />
                  ) : (
                    <PostList
                      posts={filteredPosts}
                      onVote={handleVote}
                      onSelectPost={setSelectedPost}
                      isPro={Boolean(currentUser?.is_pro)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-medium text-zinc-300">Hometown Board</span>
            <span>•</span>
            <span>Community Feedback & Roadmap</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsShowcaseOpen(true)}
              className="text-zinc-400 hover:text-zinc-200 underline underline-offset-4 cursor-pointer transition-colors"
            >
              Component Showcase
            </button>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <RuneCrown size={13} className="text-zinc-400" />
              <span>Stripe Test Mode Active</span>
            </span>
            <span>•</span>
            <span>PocketBase Backend</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification Stack */}
      <ToastStack toasts={toasts} onDismiss={handleDismissToast} />

      {/* Component Showcase Modal (Ref.tools protocol) */}
      <AnimatePresence>
        {isShowcaseOpen && (
          <ShowcaseModal
            isOpen={isShowcaseOpen}
            onClose={() => setIsShowcaseOpen(false)}
            onTriggerToast={addToast}
          />
        )}
      </AnimatePresence>

      {/* Post Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <PostDetailModal
            post={selectedPost}
            currentUser={currentUser}
            comments={comments}
            onClose={() => setSelectedPost(null)}
            onVote={handleVote}
            onAddComment={handleAddComment}
            onUpdateStatus={handleUpdateStatus}
            onTogglePin={handleTogglePin}
            onDeletePost={handleDeletePost}
            onDeleteComment={handleDeleteComment}
          />
        )}
      </AnimatePresence>

      {/* New Post Modal */}
      <AnimatePresence>
        {isNewPostOpen && (
          <NewPostModal
            currentUser={currentUser}
            onClose={() => setIsNewPostOpen(false)}
            onSubmit={handleCreatePost}
          />
        )}
      </AnimatePresence>

      {/* Stripe Supporter Modal */}
      <AnimatePresence>
        {isStripeModalOpen && (
          <StripeProModal
            currentUser={currentUser}
            onClose={() => setIsStripeModalOpen(false)}
            onUpgradeSuccess={handleUpgradeSuccess}
          />
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal
            onClose={() => setIsAuthModalOpen(false)}
            onLoginSuccess={(user) => setCurrentUser(user)}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
