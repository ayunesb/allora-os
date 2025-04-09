
import { getTestCompany } from './getTestCompany';
import { createTestCompany } from './createTestCompany';

/**
 * Sets up a test company for a specific user
 * @param userEmail Email of the user to set up the test company for
 * @returns Promise resolving to success status
 */
export async function runTestCompanySetup(userEmail: string): Promise<boolean> {
  try {
    // Create a test company name based on the user's email
    const companyName = `Test Company - ${userEmail.split('@')[0]}`;
    
    // Check if a test company already exists for this user
    const existingCompany = await getTestCompany();
    
    // If a test company exists, just return success
    if (existingCompany) {
      console.log('Test company already exists:', existingCompany.name);
      return true;
    }
    
    // Create a new test company
    const newCompany = await createTestCompany(companyName);
    
    if (!newCompany) {
      console.error('Failed to create test company');
      return false;
    }
    
    console.log('Successfully created test company:', newCompany.name);
    return true;
  } catch (error) {
    console.error('Error in test company setup:', error);
    return false;
  }
}
