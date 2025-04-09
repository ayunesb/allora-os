
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/models/company';

/**
 * Fetches a test company from the database
 * @returns Promise resolving to a test company or null
 */
export async function getTestCompany(): Promise<Partial<Company> | null> {
  try {
    // Using explicit column selection and type casting to avoid deep type issues
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

    // Use just the first item with type assertion
    return data[0] as Partial<Company>;
  } catch (error) {
    console.error('Unexpected error in getTestCompany:', error);
    return null;
  }
}
