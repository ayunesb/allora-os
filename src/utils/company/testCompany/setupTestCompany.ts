
import { supabase } from '@/backend/supabase';
import { getTestCompany } from './getTestCompany';
import { createTestCompany } from './createTestCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { User } from '@/models/user';
import { TestCompanySetupResult } from './index';

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
  if (!userEmail || !userEmail.includes('@')) {
    return {
      success: false,
      message: 'Invalid email format provided',
      error: 'Email validation failed',
      errorCode: 'VALIDATION_ERROR'
    };
  }

  try {
    // Step 1: Get user profile by email
    const userProfile: User | null = await getUserProfileByEmail(userEmail);
    
    if (!userProfile) {
      return {
        success: false,
        message: `No user found with email: ${userEmail}`,
        error: 'User lookup failed',
        errorCode: 'USER_NOT_FOUND'
      };
    }

    // Step 2: Check for existing test company
    const existingCompanyResponse = await getTestCompany();
    
    // If a test company exists, return success with details
    if (existingCompanyResponse.success && existingCompanyResponse.data) {
      const existingCompany = existingCompanyResponse.data;
      return {
        success: true,
        message: 'Test company already exists',
        companyId: existingCompany.id,
        companyName: existingCompany.name
      };
    }
    
    // Step 3: Create a test company name based on the user's email
    const username = userEmail.split('@')[0];
    const companyName = `Test Company - ${username}`;
    
    // Step 4: Create a new test company
    const newCompanyResponse = await createTestCompany(companyName);
    
    if (!newCompanyResponse.success || !newCompanyResponse.data) {
      return {
        success: false,
        message: 'Failed to create test company',
        error: newCompanyResponse.error || 'Company creation returned null',
        errorCode: 'COMPANY_CREATION_FAILED'
      };
    }

    const newCompany = newCompanyResponse.data;
    
    // Step 5: Associate the user with the new test company
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({ 
        company_id: newCompany.id,
        company: companyName,
        email: userEmail
      })
      .eq('id', userProfile.id);
      
    if (profileUpdateError) {
      return {
        success: false,
        message: `Created company but failed to associate with user: ${profileUpdateError.message}`,
        error: profileUpdateError.message,
        errorCode: profileUpdateError.code
      };
    }
    
    return {
      success: true,
      message: 'Successfully created and associated test company',
      companyId: newCompany.id,
      companyName: newCompany.name
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      message: `Error in test company setup: ${errorMessage}`,
      error: errorMessage
    };
  }
}
