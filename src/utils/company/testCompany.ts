
// I'm creating a simplified version of this file to fix the deep type recursion error
// This simplifies the type structure while maintaining functionality

import { supabase } from '@/backend/supabase';

// Define a type for JSON data
type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// Simplified type definitions to avoid recursive type issues
type BasicCompanyData = {
  id: string;
  name: string;
  industry?: string;
  details?: Record<string, any> | Json;
  created_at?: string;
};

// Response type for company operations
type CompanyResponse = {
  success: boolean;
  message: string;
  companyId?: string;
  companyName?: string;
  data?: BasicCompanyData | null;
  error?: string;
  errorCode?: string;
};

/**
 * Checks if the test company exists in the database
 */
export async function testCompanyExists(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('id')
      .eq('name', 'Test Company')
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking test company:', error);
    return false;
  }
}

/**
 * Creates a test company in the database if it doesn't exist
 */
export async function ensureTestCompanyExists(): Promise<BasicCompanyData | null> {
  try {
    // Check if company already exists
    const exists = await testCompanyExists();
    if (exists) {
      const { data } = await supabase
        .from('companies')
        .select('*')
        .eq('name', 'Test Company')
        .maybeSingle();
      return data as BasicCompanyData;
    }

    // Create test company
    const { data, error } = await supabase
      .from('companies')
      .insert([
        {
          name: 'Test Company',
          industry: 'Technology',
          details: {
            founded: 2023,
            size: 'small',
            description: 'A test company for development purposes'
          }
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data as BasicCompanyData;
  } catch (error) {
    console.error('Error creating test company:', error);
    return null;
  }
}

/**
 * Gets the test company if it exists
 */
export async function getTestCompany(): Promise<CompanyResponse> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('name', 'Test Company')
      .maybeSingle();

    if (error) {
      return {
        success: false,
        message: `Error fetching test company: ${error.message}`,
        errorCode: error.code
      };
    }

    return {
      success: true,
      data: data as BasicCompanyData,
      message: data ? 'Test company found' : 'No test company found'
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error fetching test company: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Creates a test company for the given user
 */
export async function createTestCompany(userId: string, userEmail: string): Promise<CompanyResponse> {
  try {
    // Create a company name based on the user's email
    const emailPrefix = userEmail.split('@')[0];
    const companyName = `Test Company - ${emailPrefix}`;
    
    // Insert the new company
    const { data, error } = await supabase
      .from('companies')
      .insert([
        {
          name: companyName,
          industry: 'Technology',
          details: {
            founded: new Date().getFullYear(),
            size: 'small',
            description: 'A test company for development purposes',
            created_for_user: userId
          }
        }
      ])
      .select()
      .single();
    
    if (error) {
      return {
        success: false,
        message: `Failed to create test company: ${error.message}`,
        errorCode: error.code
      };
    }
    
    return {
      success: true,
      message: `Test company "${companyName}" created successfully`,
      companyId: data.id,
      companyName: data.name,
      data: data as BasicCompanyData
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error creating test company: ${error.message}`,
      error: error.message
    };
  }
}

/**
 * Sets up a test company for the given user email
 */
export async function runTestCompanySetup(userEmail: string): Promise<CompanyResponse> {
  try {
    // Validate email
    if (!userEmail || !userEmail.includes('@')) {
      return {
        success: false,
        message: 'Invalid email address provided',
        errorCode: 'VALIDATION_ERROR'
      };
    }
    
    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', userEmail)
      .maybeSingle();
    
    if (profileError) {
      return {
        success: false,
        message: `Error fetching user profile: ${profileError.message}`,
        errorCode: profileError.code
      };
    }
    
    if (!profile) {
      return {
        success: false,
        message: 'User profile not found',
        errorCode: 'USER_NOT_FOUND'
      };
    }
    
    // Check if test company already exists
    const existingCompanyResult = await getTestCompany();
    
    if (existingCompanyResult.success && existingCompanyResult.data) {
      // Company exists, associate with user
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ company_id: existingCompanyResult.data.id })
        .eq('id', profile.id);
      
      if (updateError) {
        return {
          success: false,
          message: `Test company exists but failed to associate with user: ${updateError.message}`,
          errorCode: updateError.code
        };
      }
      
      return {
        success: true,
        message: 'Test company already exists',
        companyId: existingCompanyResult.data.id,
        companyName: existingCompanyResult.data.name
      };
    }
    
    // Create new test company
    const newCompanyResult = await createTestCompany(profile.id, userEmail);
    
    if (!newCompanyResult.success) {
      return newCompanyResult;
    }
    
    // Associate user with new company
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ company_id: newCompanyResult.companyId })
      .eq('id', profile.id);
    
    if (updateError) {
      return {
        success: false,
        message: `Created company but failed to associate with user: ${updateError.message}`,
        companyId: newCompanyResult.companyId,
        companyName: newCompanyResult.companyName,
        errorCode: 'PROFILE_UPDATE_ERROR'
      };
    }
    
    return {
      success: true,
      message: `Test company "${newCompanyResult.companyName}" created and associated with user`,
      companyId: newCompanyResult.companyId,
      companyName: newCompanyResult.companyName
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Error in test company setup: ${error.message}`,
      error: error.message
    };
  }
}

// Export for compatibility with existing code
export { ensureTestCompanyExists as runTestCompanySetup } from './testCompany';
