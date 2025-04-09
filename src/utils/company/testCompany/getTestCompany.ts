
import { supabase } from '@/integrations/supabase/client';

// Define a minimal interface for test companies
interface TestCompany {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

/**
 * Fetches a test company from the database using explicit column selection
 * to avoid deep type inference issues
 */
export async function getTestCompany(): Promise<TestCompany | null> {
  try {
    // Use a raw query approach to avoid type inference issues completely
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
