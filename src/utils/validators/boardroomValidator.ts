
import { supabase } from '@/integrations/supabase/client';
import { ValidationResult } from './types';

/**
 * Validates executive boardroom functionality
 */
export async function validateExecutiveBoardroom(): Promise<ValidationResult> {
  try {
    // Check if the ai_boardroom_debates table exists
    const { error: tableCheckError } = await supabase
      .from('ai_boardroom_debates')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      if (tableCheckError.code === '42P01') { // Table doesn't exist
        return {
          valid: false,
          message: "The ai_boardroom_debates table does not exist in the database."
        };
      }
      
      return {
        valid: false,
        message: `Error accessing ai_boardroom_debates: ${tableCheckError.message}`
      };
    }
    
    return {
      valid: true,
      message: "Executive boardroom functionality is ready."
    };
  } catch (error) {
    return {
      valid: false,
      message: "Error validating executive boardroom: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}
