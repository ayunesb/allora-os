
import { supabase } from '@/integrations/supabase/client';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { User } from '@/models/user';

/**
 * TestCompany utilities module
 * Provides functionality for creating and managing test companies
 */

// Export simplified interfaces to avoid deep type recursion
export interface TestCompany {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

// Simple response types to avoid deep type recursion
export interface TestCompanyResponse {
  success: boolean;
  data: TestCompany | null;
  message: string;
  error?: string;
  errorCode?: string;
}

// Simplified setup result with direct properties
export interface TestCompanySetupResult {
  success: boolean;
  message: string;
  error?: string;
  errorCode?: string;
  companyId?: string;
  companyName?: string;
}

/**
 * Fetches a test company from the database
 */
export async function getTestCompany(): Promise<TestCompanyResponse> {
  try {
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

    // Explicitly create a new object with only the needed properties
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

/**
 * Creates a new test company in the database
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

/**
 * Sets up a test company for a specific user by email
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
