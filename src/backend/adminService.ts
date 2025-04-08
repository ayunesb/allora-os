
import { supabase } from './supabase';
import { User } from '@/models/user';
import { Company } from '@/models/company';
import { toast } from 'sonner';

// Types for admin operations
export interface AdminUserUpdateData {
  name?: string;
  role?: 'admin' | 'user';
  company_id?: string | null;
}

export interface AdminCompanyUpdateData {
  name?: string;
  industry?: string;
}

// Get all users for admin dashboard (mock implementation)
export const getAllUsers = async (): Promise<User[]> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return [
      {
        id: 'user-1',
        email: 'admin@example.com',
        name: 'Admin User',
        company_id: 'company-1',
        role: 'admin',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString() // 30 days ago
      },
      {
        id: 'user-2',
        email: 'user@example.com',
        name: 'Regular User',
        company_id: 'company-1',
        role: 'user',
        created_at: new Date(Date.now() - 15 * 86400000).toISOString() // 15 days ago
      }
    ];
  } catch (error: any) {
    console.error('Error fetching all users:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return [];
  }
};

// Get all companies for admin dashboard (mock implementation)
export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data
    return [
      {
        id: 'company-1',
        name: 'Acme Corporation',
        industry: 'Technology',
        created_at: new Date(Date.now() - 45 * 86400000).toISOString() // 45 days ago
      },
      {
        id: 'company-2',
        name: 'XYZ Enterprises',
        industry: 'Healthcare',
        created_at: new Date(Date.now() - 30 * 86400000).toISOString() // 30 days ago
      }
    ];
  } catch (error: any) {
    console.error('Error fetching all companies:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return [];
  }
};

// Update user as admin (mock implementation)
export const updateUserAsAdmin = async (
  userId: string,
  data: AdminUserUpdateData
): Promise<boolean> => {
  try {
    // In a real implementation, this would update the Supabase database
    console.log('Would update user:', userId, 'with data:', data);
    
    toast.success('User updated successfully');
    return true;
  } catch (error: any) {
    console.error('Error updating user as admin:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Update company as admin (mock implementation)
export const updateCompanyAsAdmin = async (
  companyId: string,
  data: AdminCompanyUpdateData
): Promise<boolean> => {
  try {
    // In a real implementation, this would update the Supabase database
    console.log('Would update company:', companyId, 'with data:', data);
    
    toast.success('Company updated successfully');
    return true;
  } catch (error: any) {
    console.error('Error updating company as admin:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Delete user as admin (mock implementation)
export const deleteUserAsAdmin = async (userId: string): Promise<boolean> => {
  try {
    // In a real implementation, this would delete from the Supabase database
    console.log('Would delete user:', userId);
    
    toast.success('User deleted successfully');
    return true;
  } catch (error: any) {
    console.error('Error deleting user as admin:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Delete company as admin (mock implementation)
export const deleteCompanyAsAdmin = async (companyId: string): Promise<boolean> => {
  try {
    // In a real implementation, this would delete from the Supabase database
    console.log('Would delete company:', companyId);
    
    toast.success('Company deleted successfully');
    return true;
  } catch (error: any) {
    console.error('Error deleting company as admin:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return false;
  }
};

// Get users for a specific company (mock implementation)
export const getCompanyUsers = async (companyId: string): Promise<User[]> => {
  try {
    // In a real implementation, this would query the Supabase database
    // For now, return mock data if the company ID matches our mock data
    if (companyId === 'company-1') {
      return [
        {
          id: 'user-1',
          email: 'admin@example.com',
          name: 'Admin User',
          company_id: companyId,
          role: 'admin',
          created_at: new Date(Date.now() - 30 * 86400000).toISOString()
        },
        {
          id: 'user-2',
          email: 'user@example.com',
          name: 'Regular User',
          company_id: companyId,
          role: 'user',
          created_at: new Date(Date.now() - 15 * 86400000).toISOString()
        }
      ];
    }
    
    return [];
  } catch (error: any) {
    console.error('Error fetching company users:', error.message);
    toast.error(`Admin error: ${error.message}`);
    return [];
  }
};
