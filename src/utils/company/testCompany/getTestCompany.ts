
import { supabase } from '@/integrations/supabase/client';

// Define a simple company interface to avoid complex type dependencies
interface Company {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

/**
 * Fetches a test company from the database
 * @returns Promise resolving to a test company or null
 */
export async function getTestCompany(): Promise<Company | null> {
  try {
    // Using a simple approach to querying to avoid complex type issues
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

    // Return with explicit typing
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
