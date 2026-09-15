import React from 'react';
import { cn } from '../../lib/utils';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

/**
 * Kbd Component directly adapted from cosscom/coss (Cal.com Design System)
 * Used for keyboard shortcut indicators with proper border & surface styling.
 */
export const Kbd: React.FC<KbdProps> = ({ children, className = '', ...props }) => {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 items-center justify-center rounded px-1.5 font-mono text-[10px] font-semibold",
        "bg-zinc-800/90 text-zinc-400 border border-zinc-700/60 shadow-[0_1px_1px_rgba(0,0,0,0.5)] select-none",
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
};

export const KbdGroup: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className = '', ...props }) => {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} {...props}>
      {children}
    </span>
  );
};
