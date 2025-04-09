
import { supabase } from '@/integrations/supabase/client';
import { TestCompany, TestCompanyResponse } from './index';
import { successResponse, errorResponse } from '@/utils/api/standardResponse';

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
    // Use a simpler query approach with explicit cast to avoid type inference issues
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, created_at, industry')
      .eq('is_test', true)
      .limit(1)
      .maybeSingle();
      
    if (error) {
      return errorResponse(
        'Error fetching test company', 
        error.message,
        error.code
      );
    }

    if (!data) {
      return successResponse(null, 'No test company found');
    }

    return successResponse(data as TestCompany, 'Test company found');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return errorResponse('Unexpected error in getTestCompany', errorMessage);
  }
}
