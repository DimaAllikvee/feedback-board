import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RuneEye, RuneEyeOff } from '../icons/RuneIcons';
import { cn } from '../../lib/utils';

export interface PasswordToggleProps {
  isVisible: boolean;
  onToggle: () => void;
  ariaLabel?: string;
  size?: number;
  className?: string;
}

/**
 * PasswordToggle component
 * Complies with AGENTS.md, Emil Kowalski (Snappy Springs), and better-ui (icon-transitions.md).
 * 
 * Features:
 * - Tactile press feedback (whileTap scale 0.96)
 * - Exact better-ui contextual icon transition (scale 0.25 -> 1, opacity 0 -> 1, blur 4px -> 0px, bounce: 0)
 * - Concentric hover pill with accessible touch target (28x28px)
 * - Clear state indication (accentuated color when password exposed)
 */
export const PasswordToggle: React.FC<PasswordToggleProps> = ({
  isVisible,
  onToggle,
  ariaLabel,
  size = 15,
  className,
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      type="button"
      onClick={onToggle}
      aria-label={ariaLabel || (isVisible ? 'Hide password' : 'Show password')}
      aria-pressed={isVisible}
      className={cn(
        "relative flex items-center justify-center w-7 h-7 rounded-lg",
        "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/80 active:bg-zinc-700/60",
        "transition-colors duration-150 cursor-pointer select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/30",
        isVisible && "text-zinc-200 bg-zinc-800/50",
        className
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={isVisible ? 'eye-off' : 'eye-on'}
          initial={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.25, filter: 'blur(4px)' }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          className="flex items-center justify-center shrink-0"
        >
          {isVisible ? <RuneEyeOff size={size} /> : <RuneEye size={size} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};
