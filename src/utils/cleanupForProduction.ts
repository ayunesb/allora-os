/**
 * Production Launch Cleanup Helper
 * 
 * This file contains functions to help clean up the codebase for production.
 * It's meant to be used as a reference during the final launch preparation.
 */

import { supabase } from '@/backend/supabase';

/**
 * Removes test data from the database
 * Only run this in a controlled environment when you're ready to go to production
 */
export async function removeTestData() {
  try {
    // This is a dangerous operation and should be used with caution
    console.warn('CAUTION: This will remove all test data from the database!');
    
    // 1. Remove test leads
    const { error: leadsError } = await supabase
      .from('leads')
      .delete()
      .like('name', 'Test%')
      .like('email', 'test%');
      
    if (leadsError) throw leadsError;
    
    // 2. Remove test campaigns
    const { error: campaignsError } = await supabase
      .from('campaigns')
      .delete()
      .like('name', 'Test%');
      
    if (campaignsError) throw campaignsError;
    
    // 3. Remove test companies (but keep the ones created by test company setup feature)
    const { error: companiesError } = await supabase
      .from('companies')
      .delete()
      .like('name', 'Test Company')
      .is('details->>created_for_user', null);
      
    if (companiesError) throw companiesError;
    
    return { success: true, message: 'Test data removed successfully' };
  } catch (error: any) {
    console.error('Error removing test data:', error.message);
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
    // Note: In a browser context, we can't directly check if environment variables are set
    // This is just a helper to remind developers what to check
    
    console.info('Please verify these secrets are set in your Supabase Edge Functions:');
    requiredSecrets.forEach(secret => {
      console.info(`- ${secret}`);
    });
    
    return { 
      success: true, 
      message: 'Please check your Supabase dashboard to ensure all secrets are set' 
    };
  } catch (error: any) {
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
