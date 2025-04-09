
import { supabase } from '@/backend/supabase';
import { getTestCompany } from './getTestCompany';
import { createTestCompany } from './createTestCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';

/**
 * Validates if an email is in the correct format
 * @param email Email to validate
 * @returns Boolean indicating if the email is valid
 */
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sets up a test company for a specific user by email
 * @param userEmail Email of the user to set up the test company for
 * @returns Promise resolving with result object
 */
export async function runTestCompanySetup(userEmail: string): Promise<{
  success: boolean;
  message: string;
  companyId?: string;
  companyName?: string;
}> {
  // Validate input
  if (!isValidEmail(userEmail)) {
    return {
      success: false,
      message: 'Invalid email format provided'
    };
  }

  try {
    // Step 1: Get user profile by email
    const userProfile = await getUserProfileByEmail(userEmail);
    
    if (!userProfile) {
      return {
        success: false,
        message: `No user found with email: ${userEmail}`
      };
    }

    // Step 2: Check for existing test company
    const existingCompany = await getTestCompany();
    
    // If a test company exists, return success with details
    if (existingCompany) {
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
    const newCompany = await createTestCompany(companyName);
    
    if (!newCompany || !newCompany.id) {
      return {
        success: false,
        message: 'Failed to create test company'
      };
    }
    
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
      console.error('Error updating user profile with test company:', profileUpdateError);
      return {
        success: false,
        message: `Created company but failed to associate with user: ${profileUpdateError.message}`
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
    console.error('Error in test company setup:', error);
    return {
      success: false,
      message: `Error in test company setup: ${errorMessage}`
    };
  }
}
