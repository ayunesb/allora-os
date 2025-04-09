
/**
 * Utility functions for working with test company data
 * Used for development and testing purposes
 */

import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/models/company';

/**
 * Fetches a test company from the database
 * @returns Promise resolving to a test company or null
 */
export async function getTestCompany(): Promise<Company | null> {
  // Using explicit column selection and maybeSingle to avoid deep type instantiation error
  const { data, error } = await supabase
    .from('companies')
    .select('id, name, created_at, details, industry')
    .eq('is_test', true)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching test company:', error);
    return null;
  }

  return data as Company | null;
}

/**
 * Creates a new test company in the database
 * @param name Name for the test company
 * @returns Promise resolving to the created test company or null
 */
export async function createTestCompany(name: string): Promise<Company | null> {
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
    .select('id, name, created_at, details, industry')
    .maybeSingle();

  if (error) {
    console.error('Error creating test company:', error);
    return null;
  }

  return data as Company | null;
}

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
