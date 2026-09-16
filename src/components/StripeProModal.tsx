import React from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { SUPPORTER_PLAN, getStripeCheckoutUrl } from '../lib/stripe';
import { 
  RuneCrown, 
  RuneX, 
  RuneCheck, 
  RuneExternalLink,
  RuneShield,
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
}) => {
  const checkoutUrl = getStripeCheckoutUrl(currentUser?.email);

  const handleRedirectToStripe = () => {
    window.location.href = checkoutUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#0c0d12] border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button with Tactile Feedback */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors z-20 cursor-pointer"
        >
          <RuneX size={18} />
        </motion.button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5 relative z-10">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 shadow-sm">
            <RuneCrown size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-bold text-zinc-100 tracking-tight">
                {SUPPORTER_PLAN.name}
              </h2>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wider uppercase bg-zinc-900 text-zinc-300 border border-zinc-800">
                Official Stripe Checkout
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Back development and shape priorities with 3x voting weight
            </p>
          </div>
        </div>

        {/* Active Member Notice (if already Supporter) */}
        {currentUser?.is_pro && (
          <div className="mb-4 p-3 rounded-xl bg-zinc-900/80 border border-zinc-700/80 text-xs text-zinc-300 flex items-center gap-2">
            <RuneSparkles size={14} className="text-amber-400 shrink-0" />
            <span>
              Your account currently has <strong className="text-zinc-100">Supporter status active</strong>. You can test or renew your subscription below anytime.
            </span>
          </div>
        )}

        {/* Price Box */}
        <div className="flex items-baseline gap-2 p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 mb-5 relative z-10">
          <span className="text-3xl font-extrabold text-zinc-100">{SUPPORTER_PLAN.price}</span>
          <span className="text-xs text-zinc-400">/ {SUPPORTER_PLAN.period} (via Stripe)</span>
          <span className="ml-auto text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            Stripe Test Mode
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

        {/* Stripe Info Callout */}
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 leading-relaxed mb-6 relative z-10">
          <p className="font-semibold text-zinc-100 mb-1 flex items-center gap-1.5">
            <RuneShield size={14} className="text-zinc-400" />
            <span>Official Stripe Hosted Checkout</span>
          </p>
          <p className="text-zinc-400 text-[11px] mb-2">
            Clicking the button will open the official, SSL-secured Stripe Checkout page. In Stripe Test Mode, enter card <code className="bg-zinc-950 px-1 py-0.5 rounded font-mono text-zinc-300 border border-zinc-800">4242 4242 4242 4242</code> with any future expiration date.
          </p>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400">
            <RuneCheck size={12} className="text-emerald-400" />
            <span>Automatic return and instant Supporter activation upon payment</span>
          </div>
        </div>

        {/* Primary CTA: Launch Official Stripe Checkout */}
        <div className="space-y-2.5 relative z-10">
          <button
            type="button"
            onClick={handleRedirectToStripe}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-100 active:scale-98 transition-all cursor-pointer shadow-lg hover:shadow-white/10"
          >
            <RuneCrown size={15} />
            <span>Proceed to Official Stripe Checkout ($9/mo)</span>
            <RuneExternalLink size={14} className="text-zinc-600" />
          </button>
        </div>

        {/* Security Footer */}
        <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <span className="flex items-center gap-1">
            <RuneShield size={12} />
            <span>End-to-End SSL Encrypted</span>
          </span>
          <span>Powered by Stripe</span>
        </div>

      </motion.div>
    </motion.div>
  );
};
