
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { Company } from '@/models/company';

export async function fetchCompany(companyId: string): Promise<Company | null> {
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
  } catch (error: any) {
    console.error('Error fetching company:', error.message);
    return null;
  }
}

export async function fetchUserCompany(userId: string): Promise<Company | null> {
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
  } catch (error: any) {
    console.error('Error fetching user company:', error.message);
    return null;
  }
}

export async function updateCompany(
  companyId: string,
  updates: Partial<Omit<Company, 'id' | 'created_at'>>
): Promise<boolean> {
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
  } catch (error: any) {
    toast.error(`Failed to update company: ${error.message}`);
    return false;
  }
}
