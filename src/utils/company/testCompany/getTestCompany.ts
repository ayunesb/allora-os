
import { supabase } from '@/integrations/supabase/client';

/**
 * Simple Company interface with essential properties
 * Using a standalone interface avoids deep type inference issues
 */
interface TestCompany {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

/**
 * Fetches a test company from the database
 * @returns Promise resolving to a test company or null
 */
export async function getTestCompany(): Promise<TestCompany | null> {
  try {
    // Using a simplified approach with explicit column selection to avoid excessive type instantiation
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, created_at, industry')
      .eq('is_test', true)
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching test company:', error);
      return null;
    }

    // Check if we have any data
    if (!data) {
      return null;
    }

    // Return with explicit typing to avoid inference issues
    return {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      industry: data.industry
    };
  } catch (error) {
    console.error('Unexpected error in getTestCompany:', error);
    return null;
  }
}
