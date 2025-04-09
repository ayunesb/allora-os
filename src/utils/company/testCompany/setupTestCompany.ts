
import { supabase } from '@/backend/supabase';
import { getTestCompany } from './getTestCompany';
import { createTestCompany } from './createTestCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { User } from '@/models/user';
import { TestCompanySetupResult } from './index';
import { isValidEmail } from '@/utils/validation';
import { successResponse, errorResponse } from '@/utils/api/standardResponse';

/**
 * Sets up a test company for a specific user by email
 * 
 * @example
 * // Set up a test company for a user
 * const result = await runTestCompanySetup("user@example.com");
 * if (result.success) {
 *   console.log(`Company set up with ID: ${result.companyId}`);
 * } else {
 *   console.error(`Setup failed: ${result.message}`);
 * }
 * 
 * @param userEmail Email of the user to set up the test company for
 * @returns Promise resolving with standardized result object with companyId and companyName
 */
export async function runTestCompanySetup(userEmail: string): Promise<TestCompanySetupResult> {
  // Validate input
  if (!isValidEmail(userEmail)) {
    const response = errorResponse(
      'Invalid email format provided',
      'Email validation failed',
      'VALIDATION_ERROR'
    ) as TestCompanySetupResult;
    return response;
  }

  try {
    // Step 1: Get user profile by email
    const userProfile: User | null = await getUserProfileByEmail(userEmail);
    
    if (!userProfile) {
      const response = errorResponse(
        `No user found with email: ${userEmail}`,
        'User lookup failed',
        'USER_NOT_FOUND'
      ) as TestCompanySetupResult;
      return response;
    }

    // Step 2: Check for existing test company
    const existingCompanyResponse = await getTestCompany();
    
    // If a test company exists, return success with details
    if (existingCompanyResponse.success && existingCompanyResponse.data) {
      const existingCompany = existingCompanyResponse.data;
      const response = successResponse(
        null,
        'Test company already exists'
      ) as TestCompanySetupResult;
      
      response.companyId = existingCompany.id;
      response.companyName = existingCompany.name;
      
      return response;
    }
    
    // Step 3: Create a test company name based on the user's email
    const username = userEmail.split('@')[0];
    const companyName = `Test Company - ${username}`;
    
    // Step 4: Create a new test company
    const newCompanyResponse = await createTestCompany(companyName);
    
    if (!newCompanyResponse.success || !newCompanyResponse.data) {
      const response = errorResponse(
        'Failed to create test company',
        newCompanyResponse.error || 'Company creation returned null',
        'COMPANY_CREATION_FAILED'
      ) as TestCompanySetupResult;
      return response;
    }

    const newCompany = newCompanyResponse.data;
    
    // Step 5: Associate the user with the new test company
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ 
        company_id: newCompany.id,
        company: companyName,
        email: userEmail  // Ensure email is stored in profile
      })
      .eq('id', userProfile.id);
      
    if (profileUpdateError) {
      const response = errorResponse(
        `Created company but failed to associate with user: ${profileUpdateError.message}`,
        profileUpdateError.message,
        profileUpdateError.code
      ) as TestCompanySetupResult;
      return response;
    }
    
    const response = successResponse(
      null,
      'Successfully created and associated test company'
    ) as TestCompanySetupResult;
    
    response.companyId = newCompany.id;
    response.companyName = newCompany.name;
    
    return response;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const response = errorResponse(
      `Error in test company setup: ${errorMessage}`,
      errorMessage
    ) as TestCompanySetupResult;
    return response;
  }
}
