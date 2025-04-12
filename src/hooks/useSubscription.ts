
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { 
  getSubscriptionDetails, 
  createCheckoutSession, 
  createCustomerPortalSession,
  cancelSubscription,
  reactivateSubscription,
  changeSubscriptionPlan
} from '@/backend/stripe';
import { SubscriptionDetails } from '@/types/stripe';

/**
 * Custom hook for managing subscriptions
 * @returns Functions and state for subscription management
 */
export function useSubscription() {
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionDetails | null>(null);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Fetch subscription details
  const fetchSubscriptionDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      const details = await getSubscriptionDetails();
      setSubscription(details);
    } catch (error) {
      console.error('Error fetching subscription details:', error);
      toast.error('Failed to load subscription information');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Load subscription data on mount
  useEffect(() => {
    fetchSubscriptionDetails();
  }, [fetchSubscriptionDetails]);
  
  // Subscribe to a plan
  const subscribeToPlan = async (priceId: string, successUrl?: string, cancelUrl?: string) => {
    try {
      setIsSubscribing(true);
      const { url, error } = await createCheckoutSession(priceId, successUrl, cancelUrl);
      
      if (error) {
        throw new Error(error);
      }
      
      if (url) {
        window.location.href = url;
        return true;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      toast.error(`Failed to create checkout session: ${error.message}`);
      return false;
    } finally {
      setIsSubscribing(false);
    }
  };
  
  // Open the customer portal
  const openCustomerPortal = async () => {
    try {
      setIsUpdating(true);
      const { url, error } = await createCustomerPortalSession();
      
      if (error) {
        throw new Error(error);
      }
      
      if (url) {
        window.location.href = url;
        return true;
      } else {
        throw new Error('No portal URL returned');
      }
    } catch (error: any) {
      toast.error(`Failed to access billing portal: ${error.message}`);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Cancel a subscription
  const cancelCurrentSubscription = async () => {
    if (!subscription?.subscriptionId) {
      toast.error('No active subscription to cancel');
      return false;
    }
    
    try {
      setIsUpdating(true);
      const { success, error } = await cancelSubscription(subscription.subscriptionId);
      
      if (!success) {
        throw new Error(error || 'Failed to cancel subscription');
      }
      
      toast.success('Your subscription will be canceled at the end of the billing period');
      await fetchSubscriptionDetails();
      return true;
    } catch (error: any) {
      toast.error(`Failed to cancel subscription: ${error.message}`);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Reactivate a subscription
  const reactivateCurrentSubscription = async () => {
    if (!subscription?.subscriptionId) {
      toast.error('No subscription to reactivate');
      return false;
    }
    
    try {
      setIsUpdating(true);
      const { success, error } = await reactivateSubscription(subscription.subscriptionId);
      
      if (!success) {
        throw new Error(error || 'Failed to reactivate subscription');
      }
      
      toast.success('Your subscription has been reactivated');
      await fetchSubscriptionDetails();
      return true;
    } catch (error: any) {
      toast.error(`Failed to reactivate subscription: ${error.message}`);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Change subscription plan
  const changePlan = async (newPriceId: string) => {
    if (!subscription?.subscriptionId) {
      toast.error('No active subscription to change');
      return false;
    }
    
    try {
      setIsUpdating(true);
      const { success, error } = await changeSubscriptionPlan(subscription.subscriptionId, newPriceId);
      
      if (!success) {
        throw new Error(error || 'Failed to change subscription plan');
      }
      
      toast.success('Your subscription plan has been updated');
      await fetchSubscriptionDetails();
      return true;
    } catch (error: any) {
      toast.error(`Failed to change subscription plan: ${error.message}`);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };
  
  return {
    subscription,
    isLoading,
    isSubscribing,
    isUpdating,
    subscribeToPlan,
    openCustomerPortal,
    cancelCurrentSubscription,
    reactivateCurrentSubscription,
    changePlan,
    refresh: fetchSubscriptionDetails
  };
}
