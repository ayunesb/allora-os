
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { createCustomer } from '@/backend/stripe';

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
    if (stripeResult.success && stripeResult.customerId) {
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
    const response = await createCustomer(companyName, email, {
      industry,
      source: 'allora_platform'
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to create Stripe customer');
    }
    
    return {
      success: true,
      customerId: response.customerId
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
    // First check if a record already exists
    const { data, error: fetchError } = await supabase
      .from('company_integrations')
      .select('*')
      .eq('company_id', companyId)
      .maybeSingle();
      
    if (fetchError) throw fetchError;
    
    if (data) {
      // Update existing record
      const { error: updateError } = await supabase
        .from('company_integrations')
        .update({ 
          integration_ids: integrationIds 
        })
        .eq('company_id', companyId);
        
      if (updateError) throw updateError;
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('company_integrations')
        .insert({ 
          company_id: companyId,
          integration_ids: integrationIds
        });
        
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
    const { data, error } = await supabase
      .from('company_integrations')
      .select('integration_ids')
      .eq('company_id', companyId)
      .maybeSingle();
      
    if (error) throw error;
    
    // Ensure we're returning a Record<string, string> or null
    if (data?.integration_ids) {
      const typedIntegrationIds: Record<string, string> = {};
      
      // Convert the JSONB data to the expected type
      if (typeof data.integration_ids === 'object') {
        Object.entries(data.integration_ids).forEach(([key, value]) => {
          if (typeof value === 'string') {
            typedIntegrationIds[key] = value;
          }
        });
      }
      
      return typedIntegrationIds;
    }
    
    return null;
  } catch (error: any) {
    console.error('Failed to get company integration IDs:', error.message);
    return null;
  }
}
