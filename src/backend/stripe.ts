
import { supabase } from '@/integrations/supabase/client';
import { CreateCheckoutSessionResponse, CreateCustomerResponse, CreateCustomerPortalResponse, SubscriptionDetails } from '@/types/stripe';

const STRIPE_FUNCTION_ENDPOINT = "/functions/v1/stripe";

/**
 * Creates a Stripe checkout session for subscription
 * @param priceId The ID of the price to subscribe to
 * @param successUrl Optional custom success URL
 * @param cancelUrl Optional custom cancel URL
 * @returns A promise with the checkout URL and session ID
 */
export const createCheckoutSession = async (
  priceId: string, 
  successUrl?: string,
  cancelUrl?: string
): Promise<CreateCheckoutSessionResponse> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to create checkout session');
    }

    // Call the Stripe edge function
    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "create-checkout-session",
          priceId,
          successUrl,
          cancelUrl
        }
      }
    );

    if (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }

    return {
      url: data.url,
      sessionId: data.sessionId
    };
  } catch (error: any) {
    console.error('Failed to create checkout session:', error);
    return { 
      url: null,
      error: error.message || 'Failed to create checkout session'
    };
  }
};

/**
 * Creates a Stripe customer portal session for managing subscription
 * @returns A promise with the portal URL
 */
export const createCustomerPortalSession = async (): Promise<CreateCustomerPortalResponse> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to access customer portal');
    }

    // Call the Stripe edge function
    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "create-customer-portal"
        }
      }
    );

    if (error) {
      console.error('Error creating customer portal session:', error);
      throw error;
    }

    return { url: data.url };
  } catch (error: any) {
    console.error('Failed to create customer portal session:', error);
    return { 
      url: null,
      error: error.message || 'Failed to access customer portal'
    };
  }
};

/**
 * Fetches available subscription products
 * @returns A promise with the list of products
 */
export const getSubscriptionProducts = async () => {
  try {
    // Call the Stripe edge function
    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "get-products"
        }
      }
    );

    if (error) {
      console.error('Error fetching subscription products:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch subscription products:', error);
    return [];
  }
};

/**
 * Check if a user has an active subscription and get detailed subscription information
 * @returns A promise with detailed subscription status
 */
export const getSubscriptionDetails = async (): Promise<SubscriptionDetails> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { isActive: false };
    }
    
    // Call the Stripe edge function to get detailed subscription information
    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "get-subscription-details"
        }
      }
    );
    
    if (error) {
      console.error('Error fetching subscription details:', error);
      throw error;
    }
    
    return {
      isActive: data.isActive,
      planId: data.planId,
      planName: data.planName,
      expiresAt: data.expiresAt,
      cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      currentPeriodEnd: data.currentPeriodEnd,
      status: data.status,
      subscriptionId: data.subscriptionId,
      customerId: data.customerId,
      priceId: data.priceId,
      createdAt: data.createdAt,
      canceledAt: data.canceledAt
    };
  } catch (error: any) {
    console.error('Failed to get subscription details:', error);
    return { 
      isActive: false,
      error: error.message 
    };
  }
};

/**
 * Creates a Stripe customer for a company
 * This is used by the master account integration system
 */
export const createCustomer = async (
  name: string, 
  email: string, 
  metadata: Record<string, string> = {}
): Promise<CreateCustomerResponse> => {
  try {
    // Get the current auth session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to create a customer');
    }

    // Call the Stripe edge function
    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "create-customer",
          name,
          email,
          metadata
        }
      }
    );

    if (error) {
      console.error('Error creating Stripe customer:', error);
      throw error;
    }

    if (!data?.customerId) {
      throw new Error('No customer ID returned from Stripe');
    }

    return {
      success: true,
      customerId: data.customerId
    };
  } catch (error: any) {
    console.error('Failed to create Stripe customer:', error);
    return {
      success: false,
      error: error.message || 'Failed to create Stripe customer'
    };
  }
};

/**
 * Cancel a subscription at the end of the current billing period
 * @param subscriptionId The ID of the subscription to cancel
 * @returns A promise with the cancellation result
 */
export const cancelSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to cancel subscription');
    }

    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "cancel-subscription",
          subscriptionId
        }
      }
    );

    if (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to cancel subscription:', error);
    return {
      success: false,
      error: error.message || 'Failed to cancel subscription'
    };
  }
};

/**
 * Reactivate a subscription that was previously set to cancel at period end
 * @param subscriptionId The ID of the subscription to reactivate
 * @returns A promise with the reactivation result
 */
export const reactivateSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to reactivate subscription');
    }

    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "reactivate-subscription",
          subscriptionId
        }
      }
    );

    if (error) {
      console.error('Error reactivating subscription:', error);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to reactivate subscription:', error);
    return {
      success: false,
      error: error.message || 'Failed to reactivate subscription'
    };
  }
};

/**
 * Change subscription plan to a new price
 * @param subscriptionId The ID of the subscription to update
 * @param newPriceId The ID of the new price to assign
 * @returns A promise with the update result
 */
export const changeSubscriptionPlan = async (
  subscriptionId: string, 
  newPriceId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('Authentication required to change subscription plan');
    }

    const { data, error } = await supabase.functions.invoke(
      "stripe",
      {
        body: {
          action: "change-subscription-plan",
          subscriptionId,
          newPriceId
        }
      }
    );

    if (error) {
      console.error('Error changing subscription plan:', error);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to change subscription plan:', error);
    return {
      success: false,
      error: error.message || 'Failed to change subscription plan'
    };
  }
};
