
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Create a checkout session for purchasing credits
 * @param creditAmount The amount of credits to purchase
 * @param priceId The Stripe price ID for this purchase
 * @returns A URL to redirect the user to Stripe checkout
 */
export const createCreditPurchaseCheckout = async (
  creditAmount: number,
  priceId: string
): Promise<string | null> => {
  try {
    // Get the current user's tenant ID
    const { data: profileData } = await supabase
      .from('profiles')
      .select('tenant_id')
      .single();
    
    if (!profileData?.tenant_id) {
      toast.error('Unable to identify your account. Please try again or contact support.');
      return null;
    }

    // Create a checkout session through our Edge Function
    const { data, error } = await supabase.functions.invoke('stripe', {
      body: {
        action: 'create-checkout-session',
        priceId: priceId,
        metadata: {
          tenant_id: profileData.tenant_id,
          credits: creditAmount.toString()
        }
      }
    });

    if (error || !data?.url) {
      console.error('Error creating checkout session:', error || 'No URL returned');
      toast.error('Unable to create checkout session. Please try again.');
      return null;
    }

    return data.url;
  } catch (error) {
    console.error('Error in createCreditPurchaseCheckout:', error);
    toast.error('An unexpected error occurred. Please try again.');
    return null;
  }
};

/**
 * Fetch the current credit balance for the user
 * @returns The number of credits available or null if there was an error
 */
export const getCurrentCreditBalance = async (): Promise<number | null> => {
  try {
    const { data, error } = await supabase
      .from('billing_profiles')
      .select('credits')
      .single();
    
    if (error || data === null) {
      console.error('Error fetching credit balance:', error);
      return null;
    }
    
    return data.credits;
  } catch (error) {
    console.error('Error in getCurrentCreditBalance:', error);
    return null;
  }
};
