
import { supabase } from '@/backend/supabase';
import { SubscriptionDetails, CreateCheckoutSessionResponse, CreateCustomerPortalResponse } from '@/types/stripe';

// Fetch current subscription details
export const getSubscriptionDetails = async (): Promise<SubscriptionDetails> => {
  try {
    // First, check if the user is logged in
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError || !userData?.user) {
      return { isActive: false, error: 'User not authenticated' };
    }
    
    // Call the check-subscription edge function
    const { data, error } = await supabase.functions.invoke('check-subscription');
    
    if (error) {
      console.error('Error checking subscription:', error);
      return { 
        isActive: false, 
        error: `Failed to check subscription status: ${error.message}` 
      };
    }
    
    // Return the subscription details
    return {
      isActive: data.subscribed,
      planName: data.subscription_tier,
      expiresAt: data.subscription_end,
      status: data.subscribed ? 'active' : 'canceled'
    };
  } catch (error) {
    console.error('Error in getSubscriptionDetails:', error);
    return {
      isActive: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Create a checkout session
export const createCheckoutSession = async (
  priceId: string,
  successUrl?: string,
  cancelUrl?: string
): Promise<CreateCheckoutSessionResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { 
        action: 'create-checkout-session', 
        priceId,
        successUrl,
        cancelUrl
      }
    });
    
    if (error) throw error;
    
    return { 
      url: data.url,
      sessionId: data.sessionId
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      url: null,
      error: error instanceof Error ? error.message : 'Failed to create checkout session'
    };
  }
};

// Create a customer portal session
export const createCustomerPortalSession = async (
  returnUrl?: string
): Promise<CreateCustomerPortalResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { 
        action: 'create-customer-portal',
        returnUrl
      }
    });
    
    if (error) throw error;
    
    return { url: data.url };
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    return {
      url: null,
      error: error instanceof Error ? error.message : 'Failed to create customer portal session'
    };
  }
};

// Cancel a subscription
export const cancelSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { 
        action: 'cancel-subscription',
        subscriptionId
      }
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to cancel subscription'
    };
  }
};

// Reactivate a canceled subscription
export const reactivateSubscription = async (subscriptionId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { 
        action: 'reactivate-subscription',
        subscriptionId
      }
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reactivate subscription'
    };
  }
};

// Change subscription plan
export const changeSubscriptionPlan = async (
  subscriptionId: string, 
  newPriceId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { 
        action: 'change-subscription-plan',
        subscriptionId,
        newPriceId
      }
    });
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error changing subscription plan:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to change subscription plan'
    };
  }
};

// Get available products and prices
export const getProducts = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { action: 'get-products' }
    });
    
    if (error) throw error;
    
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Create a customer in Stripe
export const createCustomer = async (email: string, name?: string): Promise<{ customerId?: string; error?: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: { 
        action: 'create-customer',
        email,
        name
      }
    });
    
    if (error) throw error;
    
    return { customerId: data.customerId };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      error: error instanceof Error ? error.message : 'Failed to create customer'
    };
  }
};
