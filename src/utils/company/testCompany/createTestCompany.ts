
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/models/company';

/**
 * Creates a new test company in the database
 * @param name Name for the test company
 * @returns Promise resolving to the created test company or null
 */
export async function createTestCompany(name: string): Promise<Partial<Company> | null> {
  try {
    // Using explicit column selection and type assertion to avoid deep type issues
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
      .select('id, name, created_at, industry')
      .single();

    if (error) {
      console.error('Error creating test company:', error);
      return null;
    }

    // Use explicit type assertion without deep inference
    return data as Partial<Company> | null;
  } catch (error) {
    console.error('Error in createTestCompany:', error);
    return null;
  }
}
