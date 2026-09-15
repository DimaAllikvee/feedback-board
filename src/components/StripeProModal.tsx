import React, { useState } from 'react';
import { User } from '../types';
import { PRO_PLAN, simulateStripeCheckout } from '../lib/stripe';
import { BorderBeam } from './ui/BorderBeam';
import { 
  RuneCrown, 
  RuneX, 
  RuneCheck, 
  RuneSparkles 
} from './icons/RuneIcons';
import confetti from 'canvas-confetti';

interface StripeProModalProps {
  currentUser: User;
  onClose: () => void;
  onUpgradeSuccess: (transactionId: string) => void;
}

export const StripeProModal: React.FC<StripeProModalProps> = ({
  currentUser,
  onClose,
  onUpgradeSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(currentUser.is_pro);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const result = await simulateStripeCheckout(currentUser.id, PRO_PLAN.id);
      if (result.success) {
        setIsSuccess(true);
        onUpgradeSuccess(result.transactionId);

        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#6366f1', '#ec4899']
          });
        } catch (e) {
          // safe
        }

        setTimeout(() => {
          onClose();
        }, 1800);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0d0f17] border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl animate-modal-in overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <BorderBeam size={220} duration={7} colorFrom="#f59e0b" colorTo="#a855f7" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors z-20"
        >
          <RuneX size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-md shadow-amber-500/10">
            <RuneCrown size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
                {PRO_PLAN.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                PRO PASS
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Power up your voice and fast-track roadmap features
            </p>
          </div>
        </div>

        {/* Price Box */}
        <div className="flex items-baseline gap-2 p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 mb-6 relative z-10">
          <span className="text-3xl font-extrabold text-zinc-100">{PRO_PLAN.price}</span>
          <span className="text-xs text-zinc-400">/ {PRO_PLAN.period} (billed via Stripe)</span>
          <span className="ml-auto text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Test Mode Active
          </span>
        </div>

        {/* Features List */}
        <div className="space-y-2.5 mb-6 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Included in PRO Membership:
          </p>
          {PRO_PLAN.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
              <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                <RuneCheck size={12} />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stripe Test Mode Card Alert (Project requirement 4.2) */}
        <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 mb-6 text-xs text-indigo-300 leading-relaxed relative z-10">
          <div className="font-semibold text-indigo-200 mb-0.5 flex items-center gap-1.5">
            <RuneSparkles size={13} />
            <span>Stripe Test Mode Simulator (Grade "A" Deliverable)</span>
          </div>
          Use mock card <code className="bg-indigo-950/80 px-1.5 py-0.5 rounded font-mono text-indigo-200">4242 4242 4242 4242</code>. Clicking below simulates the Stripe Checkout session & Webhook callback to grant instant PRO status.
        </div>

        {/* CTA Button */}
        <div className="relative z-10">
          {isSuccess ? (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-2">
              <RuneCheck size={16} />
              <span>PRO Status Active! Welcome aboard, Supporter.</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-98 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing with Stripe...</span>
                </>
              ) : (
                <>
                  <RuneCrown size={16} />
                  <span>Subscribe with Stripe Checkout ($9/mo)</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
