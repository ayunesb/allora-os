/**
 * Production Launch Cleanup Helper
 * 
 * This file contains functions to help clean up the codebase for production.
 * It's meant to be used as a reference during the final launch preparation.
 */

import { supabase } from '@/backend/supabase';
import { logger } from '@/utils/loggingService';

/**
 * Removes test data from the database
 * Only run this in a controlled environment when you're ready to go to production
 */
export async function removeTestData() {
  try {
    // Log the start of the cleanup process
    logger.info('Starting test data cleanup process', { process: 'removeTestData' });
    
    // This is a dangerous operation and should be used with caution
    console.warn('CAUTION: This will remove all test data from the database!');
    
    // 1. Remove test leads
    const { error: leadsError } = await supabase
      .from('leads')
      .delete()
      .like('name', 'Test%')
      .like('email', 'test%');
      
    if (leadsError) throw leadsError;
    logger.info('Test leads removed successfully', { table: 'leads' });
    
    // 2. Remove test campaigns
    const { error: campaignsError } = await supabase
      .from('campaigns')
      .delete()
      .like('name', 'Test%');
      
    if (campaignsError) throw campaignsError;
    logger.info('Test campaigns removed successfully', { table: 'campaigns' });
    
    // 3. Remove test companies (but keep the ones created by test company setup feature)
    const { error: companiesError } = await supabase
      .from('companies')
      .delete()
      .like('name', 'Test Company')
      .is('details->>created_for_user', null);
      
    if (companiesError) throw companiesError;
    logger.info('Test companies removed successfully', { table: 'companies' });
    
    return { success: true, message: 'Test data removed successfully' };
  } catch (error: any) {
    logger.error('Error removing test data:', { error: error.message });
    return { success: false, error: error.message };
  }
}

/**
 * Verifies that all required API secrets are set
 */
export async function verifyApiSecrets() {
  const requiredSecrets = [
    'STRIPE_SECRET_KEY',
    'POSTMARK_API_KEY',
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'HEYGEN_API_KEY',
  ];
  
  try {
    // Check if we can retrieve the secrets from Supabase
    const { data, error } = await supabase.functions.invoke('verify-secrets', {
      body: { secrets: requiredSecrets },
    });
    
    if (error) throw error;
    
    if (data && data.missingSecrets && data.missingSecrets.length > 0) {
      return {
        success: false,
        message: `Missing required secrets: ${data.missingSecrets.join(', ')}`,
        missingSecrets: data.missingSecrets
      };
    }
    
    return { 
      success: true, 
      message: 'All required API secrets are properly configured'
    };
  } catch (error: any) {
    logger.error('Error verifying API secrets:', { error: error.message });
    return { success: false, error: error.message };
  }
}

/**
 * Checklist for final production launch
 */
export const productionLaunchChecklist = [
  '✅ Remove all console.log statements',
  '✅ Remove all TODO comments',
  '✅ Turn off test modes in API calls',
  '✅ Ensure all API keys are set in Supabase Edge Functions',
  '✅ Clean up test data',
  '✅ Test all critical user flows',
  '✅ Verify email templates are working',
  '✅ Check that Stripe payments are processing correctly',
  '✅ Ensure SMS sending is working',
  '✅ Test Heygen video generation',
];
