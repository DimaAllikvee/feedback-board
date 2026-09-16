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


