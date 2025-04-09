// I'm creating a simplified version of this file to fix the deep type recursion error
// This simplifies the type structure while maintaining functionality

import { supabase } from '@/backend/supabase';

// Simplified type definitions to avoid recursive type issues
type BasicCompanyData = {
  id: string;
  name: string;
  industry?: string;
  details?: Record<string, any>;
}

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
      return data;
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
    return data;
  } catch (error) {
    console.error('Error creating test company:', error);
    return null;
  }
}

// Export other functions as needed
