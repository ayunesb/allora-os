import { supabase } from './supabase';

const STRIPE_FUNCTION_ENDPOINT = "/functions/v1/stripe";

/**
 * Creates a Stripe checkout session for subscription
 * @returns A promise with the checkout URL
 */
export const createCheckoutSession = async (priceId: string): Promise<string | null> => {
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
          priceId
        }
      }
    );

    if (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }

    return data.url;
  } catch (error) {
    console.error('Failed to create checkout session:', error);
    return null;
  }
};

/**
 * Creates a Stripe customer portal session for managing subscription
 * @returns A promise with the portal URL
 */
export const createCustomerPortalSession = async (): Promise<string | null> => {
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

    return data.url;
  } catch (error) {
    console.error('Failed to create customer portal session:', error);
    return null;
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
 * Check if a user has an active subscription
 * @returns A promise with subscription status
 */
export const checkSubscriptionStatus = async (): Promise<{
  isActive: boolean;
  planId?: string;
  expiresAt?: string;
}> => {
  try {
    // Get the current user profile which should contain subscription info
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      return { isActive: false };
    }
    
    // Fetch the profile from database which contains subscription status
    const { data, error } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_plan_id, subscription_expires_at')
      .eq('id', session.user.id)
      .single();
      
    if (error || !data) {
      console.error('Error fetching subscription status:', error);
      return { isActive: false };
    }
    
    return {
      isActive: data.subscription_status === 'active',
      planId: data.subscription_plan_id,
      expiresAt: data.subscription_expires_at
    };
  } catch (error) {
    console.error('Failed to check subscription status:', error);
    return { isActive: false };
  }
};
