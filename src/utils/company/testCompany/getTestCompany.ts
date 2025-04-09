
import { supabase } from '@/integrations/supabase/client';
import { TestCompany, TestCompanyResponse } from './index';

/**
 * Fetches a test company from the database using explicit column selection
 * to avoid deep type inference issues
 * 
 * @example
 * // Get test company data
 * const response = await getTestCompany();
 * if (response.success) {
 *   console.log(`Found test company: ${response.data?.name}`);
 * } else {
 *   console.error(`Error: ${response.message}`);
 * }
 * 
 * @returns Promise resolving to a standardized response with test company data
 */
export async function getTestCompany(): Promise<TestCompanyResponse> {
  try {
    // Use a simpler query approach with explicit column selection
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, created_at, industry')
      .eq('is_test', true)
      .limit(1)
      .maybeSingle();
      
    if (error) {
      return {
        success: false,
        data: null,
        message: 'Error fetching test company',
        error: error.message,
        errorCode: error.code
      };
    }

    if (!data) {
      return {
        success: true,
        data: null,
        message: 'No test company found'
      };
    }

    // Explicitly transform to TestCompany type to avoid deep inference
    const testCompany: TestCompany = {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      industry: data.industry || undefined
    };

    return {
      success: true,
      data: testCompany,
      message: 'Test company found'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      data: null,
      message: 'Unexpected error in getTestCompany',
      error: errorMessage
    };
  }
}
