// Stripe Configuration (Project Week Guide - Theme 4.2 for Grade "A")
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_sample_51OEXAMPLEKEY0000000000';

export interface PlanFeature {
  title: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PRO_PLAN: PricingPlan = {
  id: 'pro-membership',
  name: 'PRO Supporter & Power User',
  price: '$9',
  period: 'month',
  description: 'Unlock 3x upvote priority weight, unlimited feature proposals, and a glowing verified PRO badge.',
  popular: true,
  features: [
    '3x Upvote Priority Weight on all roadmap cards',
    'Unlimited feature proposals & feedback submissions',
    'Exclusive glowing PRO Supporter badge on profile',
    'Direct moderation priority & roadmap influence',
    'Early beta invite access for scheduled features',
    'Automatic Stripe Webhook payment verification'
  ]
};

// Stripe Test Mode Checkout simulator & webhook confirmation
export const simulateStripeCheckout = async (_userId: string, _planId: string): Promise<{ success: boolean; transactionId: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `sub_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
      });
    }, 1200);
  });
};
