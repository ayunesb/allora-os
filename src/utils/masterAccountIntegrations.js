import { supabase } from '@/backend/supabase';
import { createCustomer } from '@/backend/stripe';
/**
 * Creates integration records for a new company in all master service accounts
 * This function is called during the onboarding process to set up a company with all integrations
 */
export async function setupCompanyIntegrations(companyId, companyName, industry, email) {
    try {
        console.log('Setting up integrations for company:', companyName);
        // Create integration mappings object to store external IDs
        const integrationIds = {};
        // 1. Create Stripe customer
        const stripeResult = await createStripeCustomer(companyName, email, industry);
        if (stripeResult.success && stripeResult.customerId) {
            integrationIds.stripe_customer_id = stripeResult.customerId;
            console.log('Created Stripe customer:', stripeResult.customerId);
        }
        else {
            console.warn('Failed to create Stripe customer:', stripeResult.error);
        }
        // 2. Store all integration IDs in Supabase
        await storeIntegrationIds(companyId, integrationIds);
        console.log('Successfully set up company integrations');
        return { success: true };
    }
    catch (error) {
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
async function createStripeCustomer(companyName, email, industry) {
    try {
        console.log('Creating Stripe customer for:', companyName, email);
        // Call the createCustomer function from our stripe.ts utility
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
    }
    catch (error) {
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
async function storeIntegrationIds(companyId, integrationIds) {
    try {
        console.log('Storing integration IDs for company:', companyId, integrationIds);
        // First check if a record already exists
        const { data, error: fetchError } = await supabase
            .from('company_integrations')
            .select('*')
            .eq('company_id', companyId)
            .maybeSingle();
        if (fetchError) {
            console.error('Error fetching existing integration record:', fetchError);
            throw fetchError;
        }
        if (data) {
            console.log('Updating existing integration record');
            // Update existing record
            const { error: updateError } = await supabase
                .from('company_integrations')
                .update({
                integration_ids: integrationIds
            })
                .eq('company_id', companyId);
            if (updateError) {
                console.error('Error updating integration record:', updateError);
                throw updateError;
            }
        }
        else {
            console.log('Creating new integration record');
            // Create new record
            const { error: insertError } = await supabase
                .from('company_integrations')
                .insert({
                company_id: companyId,
                integration_ids: integrationIds
            });
            if (insertError) {
                console.error('Error inserting integration record:', insertError);
                throw insertError;
            }
        }
        console.log('Successfully stored integration IDs');
    }
    catch (error) {
        console.error('Failed to store integration IDs:', error);
        throw error;
    }
}
/**
 * Retrieves the integration IDs for a company
 */
export async function getCompanyIntegrationIds(companyId) {
    try {
        console.log('Getting integration IDs for company:', companyId);
        const { data, error } = await supabase
            .from('company_integrations')
            .select('integration_ids')
            .eq('company_id', companyId)
            .maybeSingle();
        if (error) {
            console.error('Error fetching integration IDs:', error);
            throw error;
        }
        // Ensure we're returning a Record<string, string> or null
        if (data?.integration_ids) {
            const typedIntegrationIds = {};
            // Convert the JSONB data to the expected type
            if (typeof data.integration_ids === 'object') {
                Object.entries(data.integration_ids).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        typedIntegrationIds[key] = value;
                    }
                });
            }
            console.log('Found integration IDs:', typedIntegrationIds);
            return typedIntegrationIds;
        }
        console.log('No integration IDs found');
        return null;
    }
    catch (error) {
        console.error('Failed to get company integration IDs:', error.message);
        return null;
    }
}
