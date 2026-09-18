import React from 'react';
import {
  ChevronUp,
  ChevronDown,
  Kanban,
  List,
  MessageSquare,
  Sparkles,
  Crown,
  Pin,
  Search,
  Plus,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Filter,
  Shield,
  User,
  Trash2,
  Send,
  X,
  Code,
  Zap,
  Bug,
  Share2,
  Palette,
  ArrowUpDown,
  Flame,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Edit2,
  ThumbsUp,
  Lightbulb,
  Heart,
  AlertTriangle,
  Bookmark,
  GripVertical,
  CreditCard,
  ExternalLink,
  LogOut,
  Copy,
  CheckCheck,
  ShieldCheck,
  Terminal,
  BookOpen,
  Layers,
  SlidersHorizontal,
  Bell,
  Inbox,
  RotateCcw,
  CircleHelp,
  Plug,
  LucideProps
} from 'lucide-react';

export interface RuneIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  styleVariant?: 'normal' | 'duotone' | 'fill';
}

/**
 * Helper to produce standard, pixel-perfect 24x24 geometric icons.
 * Guarantees complete vector paths with strokeLinecap/strokeLinejoin and no clipping.
 */
const createRuneIcon = (LucideIcon: React.ComponentType<LucideProps>, defaultStrokeWidth: number = 2) => {
  const Component: React.FC<RuneIconProps> = ({ size = 20, className = '', ...props }) => (
    <LucideIcon
      size={size}
      className={className}
      strokeWidth={defaultStrokeWidth}
      {...(props as any)}
    />
  );
  return Component;
};

export const RuneChevronUp = createRuneIcon(ChevronUp, 2.2);
export const RuneChevronDown = createRuneIcon(ChevronDown, 2.2);
export const RuneKanban = createRuneIcon(Kanban, 2);
export const RuneList = createRuneIcon(List, 2);
export const RuneMessageSquare = createRuneIcon(MessageSquare, 2);
export const RuneSparkles = createRuneIcon(Sparkles, 2);
export const RuneCrown = createRuneIcon(Crown, 2);
export const RunePin = createRuneIcon(Pin, 2);
export const RuneSearch = createRuneIcon(Search, 2);
export const RunePlus = createRuneIcon(Plus, 2.2);
export const RuneCheck = createRuneIcon(Check, 2.2);
export const RuneCircleCheck = createRuneIcon(CheckCircle2, 2);
export const RuneClock = createRuneIcon(Clock, 2);
export const RuneCompass = createRuneIcon(Compass, 2);
export const RuneFilter = createRuneIcon(Filter, 2);
export const RuneShield = createRuneIcon(Shield, 2);
export const RuneUser = createRuneIcon(User, 2);
export const RuneTrash = createRuneIcon(Trash2, 2);
export const RuneSend = createRuneIcon(Send, 2);
export const RuneX = createRuneIcon(X, 2.2);
export const RuneCode = createRuneIcon(Code, 2);
export const RuneZap = createRuneIcon(Zap, 2);
export const RuneBug = createRuneIcon(Bug, 2);
export const RuneShare = createRuneIcon(Share2, 2);
export const RunePalette = createRuneIcon(Palette, 2);
export const RuneArrowUpDown = createRuneIcon(ArrowUpDown, 2);
export const RuneFlame = createRuneIcon(Flame, 2);
export const RuneEye = createRuneIcon(Eye, 2);
export const RuneEyeOff = createRuneIcon(EyeOff, 2);
export const RuneLock = createRuneIcon(Lock, 2);
export const RuneMail = createRuneIcon(Mail, 2);
export const RuneArrowRight = createRuneIcon(ArrowRight, 2.2);
export const RuneEdit = createRuneIcon(Edit2, 2);
export const RuneThumbsUp = createRuneIcon(ThumbsUp, 2);
export const RuneLightbulb = createRuneIcon(Lightbulb, 2);
export const RuneHeart = createRuneIcon(Heart, 2);
export const RuneBookmark = createRuneIcon(Bookmark, 2);
export const RuneAlertTriangle = createRuneIcon(AlertTriangle, 2);
export const RuneGripVertical = createRuneIcon(GripVertical, 2);
export const RuneCreditCard = createRuneIcon(CreditCard, 2);
export const RuneExternalLink = createRuneIcon(ExternalLink, 2);
export const RuneLogOut = createRuneIcon(LogOut, 2);
export const RuneCopy = createRuneIcon(Copy, 2);
export const RuneCheckCheck = createRuneIcon(CheckCheck, 2);
export const RuneShieldCheck = createRuneIcon(ShieldCheck, 2);
export const RuneTerminal = createRuneIcon(Terminal, 2);
export const RuneBookOpen = createRuneIcon(BookOpen, 2);
export const RuneLayers = createRuneIcon(Layers, 2);
export const RuneSliders = createRuneIcon(SlidersHorizontal, 2);
export const RuneBell = createRuneIcon(Bell, 2);
export const RuneInbox = createRuneIcon(Inbox, 2);
export const RuneRotateCcw = createRuneIcon(RotateCcw, 2);
export const RuneCircleHelp = createRuneIcon(CircleHelp, 2);
export const RunePlug = createRuneIcon(Plug, 2);

export const RuneGithub: React.FC<RuneIconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const RuneGoogle: React.FC<RuneIconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    {...props}
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.01 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export const RuneDiscord: React.FC<RuneIconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const RuneXTwitter: React.FC<RuneIconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const RuneSlack: React.FC<RuneIconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
  </svg>
);



