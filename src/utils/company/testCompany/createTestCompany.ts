
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
 * Creates a new test company in the database
 * @param name Name for the test company
 * @returns Promise resolving to the created test company or null
 */
export async function createTestCompany(name: string): Promise<TestCompany | null> {
  try {
    // Input validation
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid company name provided');
    }

    // Using explicit column selection
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

    return data as TestCompany;
  } catch (error) {
    console.error('Error in createTestCompany:', error);
    return null;
  }
}
