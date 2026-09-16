import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RuneCircleCheck, RuneX, RuneSparkles, RuneShield, RuneAlertTriangle } from '../icons/RuneIcons';
import { cn } from '../../lib/utils';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'admin' | 'error';
  title: string;
  description?: string;
}

interface ToastStackProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

/**
 * Animated Toast Stack inspired by Emil Kowalski (Sonner), Linear & rare-ui
 * Features calm neutral dark glass surfaces with refined semantic icon badges.
 */
export const ToastStack: React.FC<ToastStackProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.12 } }}
              transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              className={cn(
                "pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl",
                "bg-zinc-900/95 border border-zinc-800/90 text-zinc-100 shadow-2xl shadow-black/70 backdrop-blur-2xl ring-1 ring-white/[0.08]"
              )}
            >
              {/* Semantic Icon Badge */}
              <div className="flex-shrink-0 mt-0.5">
                {toast.type === 'success' && (
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                    <RuneCircleCheck size={15} />
                  </div>
                )}
                {toast.type === 'info' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                    <RuneSparkles size={15} />
                  </div>
                )}
                {toast.type === 'admin' && (
                  <div className="w-7 h-7 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
                    <RuneShield size={15} />
                  </div>
                )}
                {toast.type === 'error' && (
                  <div className="w-7 h-7 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400">
                    <RuneAlertTriangle size={15} />
                  </div>
                )}
              </div>

              {/* Message Copy */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-xs font-semibold text-zinc-100 tracking-tight">{toast.title}</div>
                {toast.description && (
                  <div className="text-[12px] text-zinc-400 mt-0.5 leading-snug">
                    {toast.description}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss notification"
                className="flex-shrink-0 p-1 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
              >
                <RuneX size={13} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
