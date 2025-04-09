
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
  const { data, error } = await supabase
    .from('companies')
    .select()
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
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error creating test company:', error);
    return null;
  }

  return data as Company | null;
}
