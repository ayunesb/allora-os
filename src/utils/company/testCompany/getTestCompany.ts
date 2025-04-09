
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
    // Using raw query approach to avoid type inference issues completely
    const { data, error } = await supabase
      .from('companies')
      .select('id, name, created_at, industry')
      .eq('is_test', true)
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching test company:', error);
      return null;
    }

    return data as TestCompany;
  } catch (error) {
    console.error('Unexpected error in getTestCompany:', error);
    return null;
  }
}
