
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type UserProfile = {
  id: string;
  user_id: string;
  email?: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  company_id?: string | null;
  role?: string;
  last_activity?: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  company?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  personal_api_keys?: Record<string, string> | string | null | Json;
  industry?: string;
  stripe_customer_id?: string;
  subscription_status?: string;
  subscription_plan_id?: string;
  subscription_expires_at?: string;
  company_size?: string; 
  risk_appetite?: string; 
  goals?: string[]; 
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
      role: data.role as UserProfile['role'],
      personal_api_keys: data.personal_api_keys as UserProfile['personal_api_keys']
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
    // If updates contain personal_api_keys and it's an object, stringify it
    if (updates.personal_api_keys && typeof updates.personal_api_keys === 'object') {
      updates.personal_api_keys = JSON.stringify(updates.personal_api_keys);
    }

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
    
    if (!userId) {
      console.error("Cannot save company info: missing user ID");
      return false;
    }
    
    // First, check if the user already has a company_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', userId)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      // PGRST116 is "no rows returned" - not an error in this case
      console.error("Profile fetch error:", profileError);
      
      // Try to create a profile if it doesn't exist
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          company: companyName,
          industry
        });
        
      if (insertError) {
        console.error("Failed to create profile:", insertError);
        return false;
      }
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
