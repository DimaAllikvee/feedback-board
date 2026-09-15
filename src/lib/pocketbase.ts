import PocketBase from 'pocketbase';
import { FeedbackPost, Comment, User } from '../types';

// Environment variable for PocketBase URL (Project Week requirement)
const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(POCKETBASE_URL);

// Realistic English SaaS Feedback Posts (Canny.io style)
export const INITIAL_POSTS: FeedbackPost[] = [
  {
    id: 'pb-post-1',
    title: 'Automated Slack and Discord notification webhooks',
    description: 'Provide webhook triggers for channels so product teams and engineers instantly receive updates whenever new feature ideas are submitted or cross high upvote thresholds.',
    category: 'integration',
    status: 'planned',
    author: {
      id: 'u-1',
      name: 'Alex Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      is_pro: true,
      role: 'user'
    },
    upvotes_count: 52,
    comments_count: 6,
    is_pinned: true,
    created: '2026-09-12T10:30:00Z',
    updated: '2026-09-14T14:10:00Z'
  },
  {
    id: 'pb-post-2',
    title: 'Dark & Light theme toggle with custom brand accent colors',
    description: 'Allow workspace administrators to upload custom company logos, set brand hex colors, and toggle sleek dark and OLED themes for the public feedback portal.',
    category: 'ui-ux',
    status: 'in_progress',
    author: {
      id: 'u-2',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      is_pro: false,
      role: 'user'
    },
    upvotes_count: 89,
    comments_count: 14,
    is_pinned: false,
    created: '2026-09-10T09:15:00Z',
    updated: '2026-09-15T08:00:00Z'
  },
  {
    id: 'pb-post-3',
    title: 'CSV and JSON export with voter metadata & segmentation',
    description: 'Essential for product managers to export feedback datasets, compute correlation matrices, and import customer demands directly into Jira or Linear.',
    category: 'feature',
    status: 'completed',
    author: {
      id: 'u-3',
      name: 'Marcus Brody',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      is_pro: true,
      role: 'user'
    },
    upvotes_count: 36,
    comments_count: 4,
    is_pinned: false,
    created: '2026-09-08T12:00:00Z',
    updated: '2026-09-13T16:30:00Z'
  },
  {
    id: 'pb-post-4',
    title: 'Multi-Factor Authentication (TOTP 2FA) & SSO enforcement',
    description: 'Support Google Authenticator and enterprise SAML SSO so enterprise workspace admin panels remain strictly protected against credential stuffing.',
    category: 'feature',
    status: 'under_review',
    author: {
      id: 'u-4',
      name: 'Dmitri Allikvee',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      is_pro: true,
      role: 'admin'
    },
    upvotes_count: 24,
    comments_count: 3,
    is_pinned: false,
    created: '2026-09-14T11:45:00Z',
    updated: '2026-09-14T11:45:00Z'
  },
  {
    id: 'pb-post-5',
    title: 'Touch-optimized mobile gesture navigation and swipe actions',
    description: 'When browsing on mobile smartphones, provide smooth slide gestures to upvote and collapse long descriptions with progressive disclosure.',
    category: 'improvement',
    status: 'under_review',
    author: {
      id: 'u-5',
      name: 'Sarah Connor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      is_pro: false,
      role: 'user'
    },
    upvotes_count: 17,
    comments_count: 2,
    is_pinned: false,
    created: '2026-09-13T14:20:00Z',
    updated: '2026-09-13T14:20:00Z'
  },
  {
    id: 'pb-post-6',
    title: 'Rich link unfurling for Figma prototypes and GitHub issues',
    description: 'When contributors paste Figma frame URLs or GitHub pull request links, automatically generate an inline card preview with thumbnail and status.',
    category: 'improvement',
    status: 'planned',
    author: {
      id: 'u-6',
      name: 'Simon Cruz',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      is_pro: false,
      role: 'user'
    },
    upvotes_count: 31,
    comments_count: 5,
    is_pinned: false,
    created: '2026-09-11T18:00:00Z',
    updated: '2026-09-14T09:10:00Z'
  }
];

export const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    post_id: 'pb-post-1',
    author: {
      id: 'u-4',
      name: 'Dmitri Allikvee (Admin)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      is_pro: true,
      role: 'admin'
    },
    content: 'Great suggestion! We are rolling out PocketBase webhook dispatchers in our next Coolify deployment cycle.',
    created: '2026-09-12T14:22:00Z'
  },
  {
    id: 'c-2',
    post_id: 'pb-post-1',
    author: {
      id: 'u-2',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      is_pro: false,
      role: 'user'
    },
    content: 'Discord webhooks would be extremely useful for our indie hacker community!',
    created: '2026-09-13T09:10:00Z'
  },
  {
    id: 'c-3',
    post_id: 'pb-post-2',
    author: {
      id: 'u-1',
      name: 'Alex Vance',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      is_pro: true,
      role: 'user'
    },
    content: 'The current dark mode already looks phenomenal with the subtle glassmorphic panels.',
    created: '2026-09-11T11:05:00Z'
  }
];

export const DEMO_USERS: Record<string, User> = {
  admin: {
    id: 'user-admin',
    name: 'Dmitri Allikvee',
    email: 'dmitri@admin.io',
    role: 'admin',
    is_pro: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
  },
  pro_user: {
    id: 'user-pro',
    name: 'Alex Vance',
    email: 'alex@startup.io',
    role: 'user',
    is_pro: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
  },
  regular_user: {
    id: 'user-guest',
    name: 'Guest Contributor',
    email: 'guest@feedback.io',
    role: 'user',
    is_pro: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
  }
};
