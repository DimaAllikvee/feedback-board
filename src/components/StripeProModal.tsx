import React, { useState } from 'react';
import { User } from '../types';
import { SUPPORTER_PLAN, simulateStripeCheckout } from '../lib/stripe';
import { 
  RuneCrown, 
  RuneX, 
  RuneCheck, 
  RuneSparkles 
} from './icons/RuneIcons';

interface StripeProModalProps {
  currentUser: User | null;
  onClose: () => void;
  onUpgradeSuccess: (transactionId: string) => void;
}

export const StripeProModal: React.FC<StripeProModalProps> = ({
  currentUser,
  onClose,
  onUpgradeSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(Boolean(currentUser?.is_pro));

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const result = await simulateStripeCheckout(currentUser?.id || 'guest', SUPPORTER_PLAN.id);
      if (result.success) {
        setIsSuccess(true);
        onUpgradeSuccess(result.transactionId);

        setTimeout(() => {
          onClose();
        }, 1600);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#0c0d12] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl animate-modal-in overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors z-20 cursor-pointer"
        >
          <RuneX size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6 relative z-10">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 shadow-sm">
            <RuneCrown size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
                {SUPPORTER_PLAN.name}
              </h2>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-zinc-900 text-zinc-300 border border-zinc-800">
                Supporter
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Back development and shape priorities with 3x voting weight
            </p>
          </div>
        </div>

        {/* Price Box */}
        <div className="flex items-baseline gap-2 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-6 relative z-10">
          <span className="text-3xl font-extrabold text-zinc-100">{SUPPORTER_PLAN.price}</span>
          <span className="text-xs text-zinc-400">/ {SUPPORTER_PLAN.period} (via Stripe)</span>
          <span className="ml-auto text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Stripe Active
          </span>
        </div>

        {/* Features List */}
        <div className="space-y-2.5 mb-6 relative z-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Supporter Benefits:
          </p>
          {SUPPORTER_PLAN.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
              <div className="p-0.5 rounded-full bg-zinc-800 text-zinc-200 mt-0.5">
                <RuneCheck size={11} />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stripe Card Simulator Info */}
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 mb-6 text-xs text-zinc-400 leading-relaxed relative z-10">
          <div className="font-medium text-zinc-200 mb-1 flex items-center gap-1.5">
            <RuneSparkles size={13} className="text-zinc-400" />
            <span>Stripe Test Mode Simulator</span>
          </div>
          Uses mock card <code className="bg-zinc-950 px-1.5 py-0.5 rounded font-mono text-zinc-300 border border-zinc-800">4242 4242 4242 4242</code>. Subscribing activates the Supporter role with instant 3x priority upvoting.
        </div>

        {/* CTA Button */}
        <div className="relative z-10">
          {isSuccess ? (
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-xs font-semibold text-zinc-100 flex items-center justify-center gap-2">
              <RuneCheck size={16} className="text-emerald-400" />
              <span>Supporter Membership Active! Thank you for supporting Hometown.</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white active:scale-98 transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing Checkout...</span>
                </>
              ) : (
                <>
                  <RuneCrown size={15} />
                  <span>Join as Supporter ($9/mo)</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
