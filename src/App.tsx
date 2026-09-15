import React, { useState, useEffect, useRef } from 'react';
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
  INITIAL_POSTS 
} from './lib/pocketbase';
import { Navbar } from './components/Navbar';
import { KanbanBoard } from './components/KanbanBoard';
import { PostList } from './components/PostList';
import { PostDetailModal } from './components/PostDetailModal';
import { NewPostModal } from './components/NewPostModal';
import { StripeProModal } from './components/StripeProModal';
import { AuthModal } from './components/AuthModal';
import { ToastStack, ToastMessage } from './components/ui/Toast';
import { 
  RuneSparkles, 
  RuneCrown, 
  RuneCircleCheck, 
  RuneCompass,
  RuneClock
} from './components/icons/RuneIcons';

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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentUser, selectedPost, isNewPostOpen, isStripeModalOpen, isAuthModalOpen]);

  // Load live data from PocketBase (fallback to initial posts if PB empty or offline)
  useEffect(() => {
    async function loadDataFromPocketBase() {
      try {
        const records = await pb.collection('posts').getFullList({
          sort: '-created',
          expand: 'author',
        });
        if (records && records.length > 0) {
          const mapped: FeedbackPost[] = records.map((r) => ({
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
            has_voted: false,
            comments_count: r.comments_count || 0,
            is_pinned: Boolean(r.is_pinned),
            created: r.created,
            updated: r.updated,
          }));
          setPosts(mapped);
          addToast('Connected to PocketBase', 'Synced live community records', 'success');
        } else {
          setPosts(INITIAL_POSTS);
        }
      } catch {
        setPosts(INITIAL_POSTS);
      }
    }
    loadDataFromPocketBase();
  }, []);

  // Filter posts based on search query
  const filteredPosts = posts.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query);
    
    if (!matchesSearch) return false;

    if (activeTab === 'my-posts') {
      return currentUser ? p.author.id === currentUser.id : false;
    }
    if (activeTab === 'my-votes') {
      return Boolean(p.has_voted);
    }
    return true;
  });

  // Upvote Action (Calculates weights: PRO users get 3x voting weight!)
  const handleVote = (postId: string) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to upvote feature proposals.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const alreadyVoted = Boolean(post.has_voted);
          const weight = currentUser.is_pro ? 3 : 1;
          const newCount = alreadyVoted
            ? Math.max(0, post.upvotes_count - weight)
            : post.upvotes_count + weight;

          const updated = {
            ...post,
            has_voted: !alreadyVoted,
            upvotes_count: newCount,
          };

          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }

          if (!alreadyVoted) {
            addToast(
              'Vote Registered',
              currentUser.is_pro ? '+3 PRO Priority Votes added!' : '+1 vote recorded.',
              'success'
            );
          } else {
            addToast('Vote Removed', 'Your upvote has been revoked.', 'info');
          }

          return updated;
        }
        return post;
      })
    );
  };

  // Submit New Proposal
  const handleCreatePost = (data: { title: string; description: string; category: PostCategory }) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to submit a proposal.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const newPost: FeedbackPost = {
      id: `post-${Date.now()}`,
      title: data.title,
      description: data.description,
      category: data.category,
      status: 'under_review',
      author: {
        id: currentUser.id,
        name: currentUser.name,
        is_pro: currentUser.is_pro,
        role: currentUser.role,
      },
      upvotes_count: currentUser.is_pro ? 3 : 1,
      has_voted: true,
      comments_count: 0,
      is_pinned: false,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    setPosts([newPost, ...posts]);
    addToast('Idea Published', 'Your feature proposal is now live on the board.', 'success');
  };

  // Add Comment
  const handleAddComment = (postId: string, content: string) => {
    if (!currentUser) {
      addToast('Sign In Required', 'Please sign in to add comments.', 'info');
      setIsAuthModalOpen(true);
      return;
    }

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      post_id: postId,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        is_pro: currentUser.is_pro,
        role: currentUser.role,
      },
      content,
      created: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updated = { ...p, comments_count: p.comments_count + 1 };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          return updated;
        }
        return p;
      })
    );

    addToast('Comment Posted', 'Your reply was added to the discussion.', 'info');
  };

  // Admin status update
  const handleUpdateStatus = (postId: string, newStatus: PostStatus) => {
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
    addToast('Status Changed', `Roadmap milestone moved to ${newStatus.replace('_', ' ')}`, 'admin');
  };

  // Admin pin toggle
  const handleTogglePin = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const updated = { ...p, is_pinned: !p.is_pinned };
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(updated);
          }
          addToast(
            updated.is_pinned ? 'Feature Pinned' : 'Feature Unpinned',
            updated.is_pinned ? 'Pinned to top of list' : 'Returned to standard sorting',
            'admin'
          );
          return updated;
        }
        return p;
      })
    );
  };

  // Admin delete post
  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    setComments((prev) => prev.filter((c) => c.post_id !== postId));
    setSelectedPost(null);
    addToast('Proposal Deleted', 'Feature card removed from database.', 'admin');
  };

  // Admin delete comment
  const handleDeleteComment = (commentId: string) => {
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
      addToast('Sign In Required', 'Please sign in before subscribing to PRO.', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    setIsStripeModalOpen(true);
  };

  // PRO Upgrade handler
  const handleUpgradeSuccess = (_transactionId: string) => {
    setCurrentUser((prev) => (prev ? { ...prev, is_pro: true } : prev));
    addToast('PRO Membership Active!', 'Enjoy 3x upvote weight and supporter badge perks.', 'success');
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

      {/* Hero Banner with Live Metrics (Solid background without gradients) */}
      <section className="relative border-b border-zinc-800/80 bg-zinc-950 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-300 border border-zinc-800 mb-3">
                <RuneSparkles size={13} className="text-indigo-400" />
                <span>Product Feedback & Roadmap Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Shape our Product Roadmap together
              </h1>
              <p className="text-sm text-zinc-400 max-w-2xl mt-1.5 leading-relaxed">
                Submit feature proposals, upvote priorities with 3x PRO weight, and watch ideas transition smoothly from review to live production.
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold mb-0.5">
                  <RuneClock size={13} />
                  <span>Review</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-100">{underReviewCount}</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="flex items-center justify-center gap-1 text-blue-400 text-xs font-bold mb-0.5">
                  <RuneCompass size={13} />
                  <span>Planned</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-100">{plannedCount}</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="flex items-center justify-center gap-1 text-purple-400 text-xs font-bold mb-0.5">
                  <RuneSparkles size={13} />
                  <span>In Progress</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-100">{inProgressCount}</div>
              </div>

              <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold mb-0.5">
                  <RuneCircleCheck size={13} />
                  <span>Completed</span>
                </div>
                <div className="text-lg font-extrabold text-zinc-100">{completedCount}</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Active Tab Views */}
        {activeTab === 'roadmap' ? (
          <KanbanBoard
            posts={filteredPosts}
            onVote={handleVote}
            onSelectPost={setSelectedPost}
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
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950/80 py-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-400">FeedbackPulse SaaS MVP</span>
            <span>•</span>
            <span>PocketBase + Coolify + React 19 + Stripe</span>
          </div>
          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1">
              <RuneCrown size={13} className="text-amber-400" />
              <span>Stripe Test Mode Enabled</span>
            </span>
            <span>•</span>
            <span>Developed by Dmitri Allikvee</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification Stack */}
      <ToastStack toasts={toasts} onDismiss={handleDismissToast} />

      {/* Post Details Modal */}
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

      {/* New Post Modal */}
      {isNewPostOpen && (
        <NewPostModal
          currentUser={currentUser}
          onClose={() => setIsNewPostOpen(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {/* Stripe PRO Modal */}
      {isStripeModalOpen && (
        <StripeProModal
          currentUser={currentUser}
          onClose={() => setIsStripeModalOpen(false)}
          onUpgradeSuccess={handleUpgradeSuccess}
        />
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}

    </div>
  );
};

export default App;
