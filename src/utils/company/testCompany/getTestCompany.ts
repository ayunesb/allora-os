
import { supabase } from '@/integrations/supabase/client';

// Define explicit type interfaces for the company data structure
interface CompanyBase {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

/**
 * Fetches a test company from the database
 * @returns Promise resolving to a test company or null
 */
export async function getTestCompany(): Promise<CompanyBase | null> {
  try {
    // Using explicit column selection with specific types to avoid deep type issues
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, created_at, industry')
      .eq('is_test', true)
      .limit(1);

    if (error) {
      console.error('Error fetching test company:', error);
      return null;
    }

    // Check if we have any data
    if (!data || data.length === 0) {
      return null;
    }

    // Return with explicit typing to avoid recursive type issues
    return {
      id: data[0].id,
      name: data[0].name,
      created_at: data[0].created_at,
      industry: data[0].industry
    };
  } catch (error) {
    console.error('Unexpected error in getTestCompany:', error);
    return null;
  }
}
