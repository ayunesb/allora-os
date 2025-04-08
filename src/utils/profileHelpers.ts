
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

    // Cast the data to ensure it matches the UserProfile type
    return data ? {
      ...data,
      role: data.role as UserProfile['role']
    } : null;
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
    console.log("Creating company for user:", userId, companyName, industry);
    
    // First, check if the user already has a company_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', userId)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" - not an error in this case
      console.error("Profile fetch error:", profileError);
      throw profileError;
    }
    
    // If user already has a company, update it instead of creating new
    if (profile && profile.company_id) {
      console.log("User already has company, updating:", profile.company_id);
      const { error: updateError } = await supabase
        .from('companies')
        .update({ 
          name: companyName, 
          industry 
        })
        .eq('id', profile.company_id);
        
      if (updateError) {
        console.error("Company update error:", updateError);
        throw updateError;
      }
      
      // Update the profile with company name and industry
      return await updateUserProfile(userId, {
        company: companyName,
        industry
      });
    }
    
    // Create new company
    console.log("Creating new company");
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert([
        { name: companyName, industry }
      ])
      .select('id')
      .single();

    if (companyError) {
      console.error("Company creation error:", companyError);
      throw companyError;
    }

    console.log("Company created, updating profile with company_id:", companyData.id);
    // Update the user profile with company_id and set as admin
    return await updateUserProfile(userId, {
      company: companyName,
      industry,
      company_id: companyData.id,
      role: 'admin'
    });
  } catch (error: any) {
    console.error(`Failed to save company info:`, error);
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
