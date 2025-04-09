
import { supabase } from '@/integrations/supabase/client';

// Define explicit type for the company structure
interface CompanyBase {
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
export async function createTestCompany(name: string): Promise<CompanyBase | null> {
  try {
    // Input validation
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid company name provided');
    }

    // Using explicit column selection and type safety
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

    // Return with explicit typing
    return data ? {
      id: data.id,
      name: data.name,
      created_at: data.created_at,
      industry: data.industry
    } : null;
  } catch (error) {
    console.error('Error in createTestCompany:', error);
    return null;
  }
}
