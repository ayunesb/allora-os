import { supabase } from "@/integrations/supabase/client";
import { User } from "@/models/user";
import { Company } from "@/models/company";
import { toast } from "sonner";

// Types for admin operations
export interface AdminUserUpdateData {
  name?: string;
  role?: "admin" | "user";
  company_id?: string | null;
}

export interface AdminCompanyUpdateData {
  name?: string;
  industry?: string;
}

// Get all users for admin dashboard
export const getAllUsers = async (): Promise<User[]> => {
  try {
    // Query the profiles table to get all users
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, company_id, role, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Transform the data to include email (which might come from auth.users
    // but we can't directly query that with client-side code)
    // For now, we'll use the id as a placeholder for email
    return (data || []).map((profile) => ({
      id: profile.id,
      name: profile.name || "",
      email: `user-${profile.id.substring(0, 8)}@example.com`, // Placeholder email
      company_id: profile.company_id,
      role: profile.role as "admin" | "user",
      created_at: profile.created_at,
    }));
  } catch (error: any) {
    console.error("Error fetching all users:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return [];
  }
};

// Get all companies
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error: any) {
    console.error("Error fetching all companies:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return [];
  }
};

// Update user as admin
export const updateUserAsAdmin = async (
  userId: string,
  data: AdminUserUpdateData,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("profiles")
      .update(data)
      .eq("id", userId);

    if (error) {
      throw error;
    }

    toast.success("User updated successfully");
    return true;
  } catch (error: any) {
    console.error("Error updating user as admin:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Update company as admin
export const updateCompanyAsAdmin = async (
  companyId: string,
  data: AdminCompanyUpdateData,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("companies")
      .update(data)
      .eq("id", companyId);

    if (error) {
      throw error;
    }

    toast.success("Company updated successfully");
    return true;
  } catch (error: any) {
    console.error("Error updating company as admin:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Delete user as admin
export const deleteUserAsAdmin = async (userId: string): Promise<boolean> => {
  try {
    // Note: Deleting from the auth.users table requires admin API access
    // which is not available in the client. Typically this would be done
    // via a Supabase Edge Function with service_role access.
    // For now, we'll just delete from profiles as a demonstration

    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) {
      throw error;
    }

    toast.success("User profile deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting user as admin:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Delete company as admin
export const deleteCompanyAsAdmin = async (
  companyId: string,
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("companies")
      .delete()
      .eq("id", companyId);

    if (error) {
      throw error;
    }

    toast.success("Company deleted successfully");
    return true;
  } catch (error: any) {
    console.error("Error deleting company as admin:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Get users for a specific company
export const getCompanyUsers = async (companyId: string): Promise<User[]> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, company_id, role, created_at")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // Transform the data to include required fields for the User type
    return (data || []).map((profile) => ({
      id: profile.id,
      name: profile.name || "",
      email: `user-${profile.id.substring(0, 8)}@example.com`, // Placeholder email
      company_id: profile.company_id,
      role: profile.role as "admin" | "user",
      created_at: profile.created_at,
    }));
  } catch (error: any) {
    console.error("Error fetching company users:", error.message);
    toast.error(`Admin error: ${error.message}`);
    return [];
  }
};
