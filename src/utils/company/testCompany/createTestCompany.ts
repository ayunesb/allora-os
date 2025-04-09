
import { supabase } from '@/integrations/supabase/client';
import { TestCompany, TestCompanyResponse } from './index';

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
    if (!name || name.trim().length === 0) {
      return {
        success: false,
        data: null,
        message: 'Invalid company name provided',
        error: 'Company name must be a non-empty string',
        errorCode: 'VALIDATION_ERROR'
      };
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
      return {
        success: false,
        data: null,
        message: 'Error creating test company',
        error: error.message,
        errorCode: error.code
      };
    }

    // Explicitly convert to TestCompany type
    const testCompany: TestCompany = {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      industry: data.industry
    };

    return {
      success: true,
      data: testCompany,
      message: `Test company "${name}" created successfully`
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      data: null,
      message: 'Error in createTestCompany',
      error: errorMessage
    };
  }
}
