import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RuneCircleCheck, RuneX, RuneSparkles, RuneShield } from '../icons/RuneIcons';
import { cn } from '../../lib/utils';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'admin';
  title: string;
  description?: string;
}

interface ToastStackProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

/**
 * Animated Toast Stack inspired by beui.dev & rare-ui
 * Renders with snappy spring transitions and accessible status announcement.
 */
export const ToastStack: React.FC<ToastStackProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 450, damping: 28 }}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl",
              toast.type === 'admin'
                ? "bg-rose-950/90 border-rose-500/30 text-rose-100"
                : toast.type === 'success'
                ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-100"
                : "bg-zinc-900/95 border-zinc-800 text-zinc-100"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {toast.type === 'admin' ? (
                <RuneShield size={16} className="text-rose-400" />
              ) : toast.type === 'success' ? (
                <RuneCircleCheck size={16} className="text-emerald-400" />
              ) : (
                <RuneSparkles size={16} className="text-indigo-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold">{toast.title}</div>
              {toast.description && (
                <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                  {toast.description}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="flex-shrink-0 p-1 rounded-lg text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              <RuneX size={13} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
