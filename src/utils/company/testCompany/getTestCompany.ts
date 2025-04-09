
import { supabase } from '@/integrations/supabase/client';
import { TestCompany } from './index';

/**
 * Fetches a test company from the database using explicit column selection
 * to avoid deep type inference issues
 */
export async function getTestCompany(): Promise<TestCompany | null> {
  try {
    // Use a simpler query approach with explicit cast to avoid type inference issues
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

    return data as TestCompany;
  } catch (error) {
    console.error('Unexpected error in getTestCompany:', error);
    return null;
  }
}
