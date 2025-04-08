
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

export type UserProfile = {
  id: string;
  name: string;
  company: string;
  company_id: string | null;
  industry: string;
  role: 'admin' | 'user';
  created_at: string;
};

export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error: any) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<UserProfile, 'id' | 'created_at'>>
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) {
      throw error;
    }

    toast.success('Profile updated successfully');
    return true;
  } catch (error: any) {
    toast.error(`Failed to update profile: ${error.message}`);
    return false;
  }
}

export async function saveCompanyInfo(
  userId: string,
  companyName: string,
  industry: string
): Promise<boolean> {
  try {
    // First, create the company entry
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert([
        { name: companyName, industry }
      ])
      .select('id')
      .single();

    if (companyError) {
      throw companyError;
    }

    // Update the user profile with company_id and set as admin
    return await updateUserProfile(userId, {
      company: companyName,
      industry,
      company_id: companyData.id,
      role: 'admin'
    });
  } catch (error: any) {
    toast.error(`Failed to save company info: ${error.message}`);
    return false;
  }
}

export async function addUserToCompany(
  userId: string,
  companyId: string,
  role: 'admin' | 'user' = 'user'
): Promise<boolean> {
  return await updateUserProfile(userId, {
    company_id: companyId,
    role
  });
}
