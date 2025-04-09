
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

/**
 * Creates integration records for a new company in all master service accounts
 * This function is called during the onboarding process to set up a company with all integrations
 */
export async function setupCompanyIntegrations(
  companyId: string,
  companyName: string,
  industry: string,
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('Setting up integrations for company:', companyName);
    
    // Create integration mappings object to store external IDs
    const integrationIds: Record<string, string> = {};
    
    // 1. Create Stripe customer
    const stripeResult = await createStripeCustomer(companyName, email, industry);
    if (stripeResult.customerId) {
      integrationIds.stripe_customer_id = stripeResult.customerId;
    }
    
    // 2. Store all integration IDs in Supabase
    await storeIntegrationIds(companyId, integrationIds);
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to set up company integrations:', error);
    return { 
      success: false,
      error: error.message || 'An unexpected error occurred during integration setup'
    };
  }
}

/**
 * Creates a Stripe customer for a company in the master Stripe account
 */
async function createStripeCustomer(
  companyName: string, 
  email: string,
  industry: string
): Promise<{ success: boolean; customerId?: string; error?: string }> {
  try {
    // Call our custom function to create a Stripe customer
    const response = await fetch('/api/stripe/create-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: companyName,
        email,
        metadata: {
          industry,
          source: 'allora_platform'
        }
      }),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to create Stripe customer');
    }
    
    return {
      success: true,
      customerId: result.customerId
    };
  } catch (error: any) {
    console.error('Failed to create Stripe customer:', error);
    return {
      success: false,
      error: error.message || 'Failed to create Stripe customer'
    };
  }
}

/**
 * Stores integration IDs in the company_integrations table
 */
async function storeIntegrationIds(
  companyId: string,
  integrationIds: Record<string, string>
): Promise<void> {
  try {
    // First check if a record already exists by running the RPC function
    const { data, error: fetchError } = await supabase.rpc(
      'get_company_integrations',
      { p_company_id: companyId }
    );
      
    if (fetchError) throw fetchError;
    
    if (data && data.length > 0) {
      // Update existing record
      const { error: updateError } = await supabase.rpc(
        'update_company_integrations',
        { 
          p_company_id: companyId,
          p_integration_ids: integrationIds
        }
      );
        
      if (updateError) throw updateError;
    } else {
      // Create new record
      const { error: insertError } = await supabase.rpc(
        'insert_company_integrations',
        { 
          p_company_id: companyId,
          p_integration_ids: integrationIds
        }
      );
        
      if (insertError) throw insertError;
    }
  } catch (error: any) {
    console.error('Failed to store integration IDs:', error);
    throw error;
  }
}

/**
 * Retrieves the integration IDs for a company
 */
export async function getCompanyIntegrationIds(
  companyId: string
): Promise<Record<string, string> | null> {
  try {
    const { data, error } = await supabase.rpc(
      'get_company_integrations',
      { p_company_id: companyId }
    );
      
    if (error) throw error;
    
    return data?.[0]?.integration_ids || null;
  } catch (error: any) {
    console.error('Failed to get company integration IDs:', error.message);
    return null;
  }
}
