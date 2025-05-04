import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
export async function fetchCompany(companyId) {
    try {
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .eq('id', companyId)
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    catch (error) {
        console.error('Error fetching company:', error.message);
        return null;
    }
}
export async function fetchUserCompany(userId) {
    try {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('company_id')
            .eq('id', userId)
            .single();
        if (profileError || !profile.company_id) {
            return null;
        }
        return await fetchCompany(profile.company_id);
    }
    catch (error) {
        console.error('Error fetching user company:', error.message);
        return null;
    }
}
export async function updateCompany(companyId, updates) {
    try {
        const { error } = await supabase
            .from('companies')
            .update(updates)
            .eq('id', companyId);
        if (error) {
            throw error;
        }
        toast.success('Company updated successfully');
        return true;
    }
    catch (error) {
        toast.error(`Failed to update company: ${error.message}`);
        return false;
    }
}
