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

export const SUPPORTER_PLAN: PricingPlan = {
  id: 'supporter-membership',
  name: 'Supporter Membership',
  price: '$9',
  period: 'month',
  description: 'Unlock 3x upvote priority weight, unlimited feature proposals, and a verified Supporter badge.',
  popular: true,
  features: [
    '3x Upvote Priority Weight on all roadmap cards',
    'Unlimited feature proposals & feedback submissions',
    'Verified Supporter badge on profile and comments',
    'Direct moderation priority & roadmap influence',
    'Early beta invite access for upcoming features',
    'Automatic Stripe Webhook payment verification'
  ]
};

export const PRO_PLAN = SUPPORTER_PLAN;

// Real Stripe Test Mode Hosted Checkout URLs
export const STRIPE_CHECKOUT_URL_PROD = 'https://buy.stripe.com/test_00wcMY4zJ2Qf5qq6BAdEs01';
export const STRIPE_CHECKOUT_URL_LOCAL = 'https://buy.stripe.com/test_eVq4gsc2beyXbOO1hgdEs02';

export const getStripeCheckoutUrl = (userEmail?: string): string => {
  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const baseUrl = isLocal ? STRIPE_CHECKOUT_URL_LOCAL : STRIPE_CHECKOUT_URL_PROD;
  if (userEmail) {
    return `${baseUrl}?prefilled_email=${encodeURIComponent(userEmail)}`;
  }
  return baseUrl;
};


