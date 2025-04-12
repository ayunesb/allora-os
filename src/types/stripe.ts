
/**
 * Types for Stripe subscription management
 */

export interface StripeSubscriptionPrice {
  id: string;
  currency: string;
  unit_amount: number;
  recurring: {
    interval: 'day' | 'week' | 'month' | 'year';
    interval_count: number;
  };
  product: string;
  nickname?: string;
  metadata?: Record<string, string>;
}

export interface StripeProduct {
  id: string;
  name: string;
  description?: string;
  default_price?: string | StripeSubscriptionPrice;
  active: boolean;
  metadata?: Record<string, string>;
  images?: string[];
  features?: string[];
}

export interface SubscriptionStatus {
  isActive: boolean;
  planId?: string;
  planName?: string;
  expiresAt?: string;
  cancelAtPeriodEnd?: boolean;
  currentPeriodEnd?: string;
  status?: 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'trialing' | 'unpaid';
}

export interface SubscriptionDetails extends SubscriptionStatus {
  subscriptionId?: string;
  customerId?: string;
  priceId?: string;
  createdAt?: string;
  canceledAt?: string;
}

export interface CreateCheckoutSessionResponse {
  url: string | null;
  sessionId?: string;
  error?: string;
}

export interface CreateCustomerPortalResponse {
  url: string | null;
  error?: string;
}

export interface CreateCustomerResponse {
  success: boolean;
  customerId?: string;
  error?: string;
}

export interface StripeProductsResponse {
  products: StripeProduct[];
  error?: string;
}
