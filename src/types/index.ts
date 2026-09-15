export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  is_pro: boolean;
  created?: string;
}

export type PostCategory = 'feature' | 'improvement' | 'bug' | 'integration' | 'ui-ux';

export type PostStatus = 'under_review' | 'planned' | 'in_progress' | 'completed' | 'closed';

export interface FeedbackPost {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  status: PostStatus;
  author: {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    is_pro?: boolean;
    role?: UserRole;
  };
  upvotes_count: number;
  has_voted?: boolean;
  comments_count: number;
  is_pinned?: boolean;
  created: string;
  updated: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    is_pro?: boolean;
    role?: UserRole;
  };
  content: string;
  created: string;
}

export type SortOption = 'votes' | 'newest' | 'trending';

export type ActiveTab = 'roadmap' | 'list' | 'my-posts' | 'my-votes';
