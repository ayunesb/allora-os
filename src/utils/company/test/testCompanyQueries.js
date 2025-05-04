import { supabase } from '@/backend/supabase';
/**
 * Checks if the test company exists in the database
 */
export async function testCompanyExists() {
    try {
        const { data, error } = await supabase
            .from('companies')
            .select('id')
            .eq('name', 'Test Company')
            .maybeSingle();
        if (error)
            throw error;
        return !!data;
    }
    catch (error) {
        console.error('Error checking test company:', error);
        return false;
    }
}
/**
 * Gets the test company if it exists
 */
export async function getTestCompany() {
    try {
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('name', 'Test Company')
            .maybeSingle();
        if (error) {
            return {
                success: false,
                message: `Error fetching test company: ${error.message}`,
                errorCode: error.code
            };
        }
        return {
            success: true,
            data: data,
            message: data ? 'Test company found' : 'No test company found'
        };
    }
    catch (error) {
        return {
            success: false,
            message: `Error fetching test company: ${error.message}`,
            error: error.message
        };
    }
}
/**
 * Creates a test company in the database if it doesn't exist
 */
export async function ensureTestCompanyExists() {
    try {
        // Check if company already exists
        const exists = await testCompanyExists();
        if (exists) {
            const { data } = await supabase
                .from('companies')
                .select('*')
                .eq('name', 'Test Company')
                .maybeSingle();
            return data;
        }
        // Create test company
        const { data, error } = await supabase
            .from('companies')
            .insert([
            {
                name: 'Test Company',
                industry: 'Technology',
                details: {
                    founded: 2023,
                    size: 'small',
                    description: 'A test company for development purposes'
                }
            }
        ])
            .select()
            .single();
        if (error)
            throw error;
        return data;
    }
    catch (error) {
        console.error('Error creating test company:', error);
        return null;
    }
}
