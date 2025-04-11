import { supabase } from '@/integrations/supabase/client';
import { ValidationResult } from './types';

/**
 * Validates the legal acceptance system functionality
 */
export async function validateLegalAcceptance(): Promise<ValidationResult> {
  try {
    // 1. Check if the user_legal_acceptances table exists
    const { error: tableCheckError } = await supabase
      .from('user_legal_acceptances')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      if (tableCheckError.code === '42P01') { // Table doesn't exist
        return {
          valid: false,
          message: "The user_legal_acceptances table does not exist in the database."
        };
      }
      
      return {
        valid: false,
        message: `Error accessing user_legal_acceptances: ${tableCheckError.message}`
      };
    }
    
    // 2. Verify the structure by attempting to fetch specific columns
    const { error: structureCheckError } = await supabase
      .from('user_legal_acceptances')
      .select('user_id, terms_of_service, privacy_policy, messaging_consent, terms_version, privacy_version, consent_version')
      .limit(1);
    
    if (structureCheckError) {
      return {
        valid: false,
        message: `Table structure invalid: ${structureCheckError.message}`
      };
    }
    
    // 3. Check for permissions - try a test insertion and then delete it
    const testUserId = '00000000-0000-0000-0000-000000000000'; // Dummy UUID for testing
    
    // Check insertion permission
    const { error: insertError } = await supabase
      .from('user_legal_acceptances')
      .insert({
        user_id: testUserId,
        terms_of_service: true,
        privacy_policy: true,
        messaging_consent: true,
        terms_version: 'test',
        privacy_version: 'test',
        consent_version: 'test',
        ip_address: '127.0.0.1',
        user_agent: 'Validator Test'
      })
      .select();
    
    // Remove test record regardless of whether it was inserted
    await supabase
      .from('user_legal_acceptances')
      .delete()
      .eq('user_id', testUserId);
    
    if (insertError) {
      // Permission error but table exists and structure is valid
      if (insertError.code === '42501' || insertError.message?.includes('permission')) {
        return {
          valid: false,
          message: `RLS policy may be preventing insertions: ${insertError.message}`
        };
      }
      
      // Other insertion error
      return {
        valid: false,
        message: `Test insertion failed: ${insertError.message}`
      };
    }
    
    // 4. Check if legal hook is properly implemented
    if (typeof window !== 'undefined') {
      try {
        // Just check if the module exists and can be imported
        const { useLegalAcceptance } = await import('@/hooks/useLegalAcceptance');
        if (!useLegalAcceptance) {
          return {
            valid: false,
            message: "useLegalAcceptance hook exists but may not be properly implemented."
          };
        }
      } catch (error) {
        return {
          valid: false,
          message: "Failed to load useLegalAcceptance hook: " + (error instanceof Error ? error.message : String(error))
        };
      }
    }
    
    return {
      valid: true,
      message: "Legal acceptance system is properly configured."
    };
  } catch (error) {
    return {
      valid: false,
      message: "Unexpected error during legal acceptance validation: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}
