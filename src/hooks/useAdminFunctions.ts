import { useState, useEffect, useCallback } from 'react';
import { User } from '@/models/user';
import { Company } from '@/models/company';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function useAdminFunctions() {
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [systemAnalytics, setSystemAnalytics] = useState<any>(null);
  const [dashboardAnalytics, setDashboardAnalytics] = useState<any>(null);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, company_id, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data || []);
    } catch (error: any) {
      console.error('Error loading users:', error);
      toast.error(`Failed to load users: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
      toast.error(`Failed to load companies: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCompanyUsers = useCallback(async (companyId: string) => {
    if (!companyId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, email, company_id, role, created_at')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      setCompanyUsers(data || []);
      setSelectedCompany(companyId);
    } catch (error: any) {
      console.error('Error loading company users:', error);
      toast.error(`Failed to load company users: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId: string, data: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId);

      if (error) {
        throw error;
      }
      
      toast.success('User updated successfully');
      
      await loadUsers();
      if (selectedCompany) {
        await loadCompanyUsers(selectedCompany);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast.error(`Failed to update user: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers, loadCompanyUsers, selectedCompany]);

  const updateCompany = useCallback(async (companyId: string, data: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .update(data)
        .eq('id', companyId);

      if (error) {
        throw error;
      }
      
      toast.success('Company updated successfully');
      
      await loadCompanies();
      
      return true;
    } catch (error: any) {
      console.error('Error updating company:', error);
      toast.error(`Failed to update company: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadCompanies]);

  const deleteUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) {
        throw error;
      }
      
      toast.success('User deleted successfully');
      
      await loadUsers();
      if (selectedCompany) {
        await loadCompanyUsers(selectedCompany);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(`Failed to delete user: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers, loadCompanyUsers, selectedCompany]);

  const deleteCompany = useCallback(async (companyId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);

      if (error) {
        throw error;
      }
      
      toast.success('Company deleted successfully');
      
      await loadCompanies();
      if (selectedCompany === companyId) {
        setSelectedCompany(null);
        setCompanyUsers([]);
      }
      
      return true;
    } catch (error: any) {
      console.error('Error deleting company:', error);
      toast.error(`Failed to delete company: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadCompanies, selectedCompany]);

  return {
    users,
    companies,
    companyUsers,
    selectedCompany,
    isLoading,
    systemAnalytics,
    dashboardAnalytics,
    loadUsers,
    loadCompanies,
    loadCompanyUsers,
    updateUser,
    updateCompany,
    deleteUser,
    deleteCompany,
    setSelectedCompany
  };
}
