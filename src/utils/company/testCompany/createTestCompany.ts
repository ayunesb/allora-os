
import { supabase } from '@/integrations/supabase/client';
import { TestCompany, TestCompanyResponse } from './index';
import { successResponse, errorResponse } from '@/utils/api/standardResponse';
import { isNonEmptyString } from '@/utils/validation';

/**
 * Creates a new test company in the database
 * 
 * @example
 * // Create a new test company
 * const response = await createTestCompany("Test Company ABC");
 * if (response.success) {
 *   console.log(`Created company with ID: ${response.data?.id}`);
 * } else {
 *   console.error(`Error: ${response.message}`);
 * }
 * 
 * @param name Name for the test company
 * @returns Promise resolving to a standardized response with the created test company
 */
export async function createTestCompany(name: string): Promise<TestCompanyResponse> {
  try {
    // Input validation
    if (!isNonEmptyString(name)) {
      return errorResponse('Invalid company name provided', 'Company name must be a non-empty string', 'VALIDATION_ERROR');
    }

    // Using explicit column selection
    const { data, error } = await supabase
      .from('companies')
      .insert([
        {
          name,
          is_test: true,
          status: 'active',
          created_at: new Date().toISOString(),
        },
      ])
      .select('id, name, created_at, industry')
      .single();

    if (error) {
      return errorResponse(
        'Error creating test company', 
        error.message,
        error.code
      );
    }

    return successResponse(
      data as TestCompany, 
      `Test company "${name}" created successfully`
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return errorResponse('Error in createTestCompany', errorMessage);
  }
}
