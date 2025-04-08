
import { useState, useEffect, useCallback } from 'react';
import { User } from '@/models/user';
import { Company } from '@/models/company';
import { 
  getAllUsers, 
  getAllCompanies, 
  updateUserAsAdmin, 
  updateCompanyAsAdmin,
  deleteUserAsAdmin,
  deleteCompanyAsAdmin,
  getCompanyUsers
} from '@/backend/adminService';
import { 
  getSystemAnalytics,
  getCompanyDashboardAnalytics
} from '@/backend/analyticsService';
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
      const allUsers = await getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const allCompanies = await getAllCompanies();
      setCompanies(allCompanies);
    } catch (error) {
      console.error('Error loading companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadCompanyUsers = useCallback(async (companyId: string) => {
    if (!companyId) return;
    
    setIsLoading(true);
    try {
      const users = await getCompanyUsers(companyId);
      setCompanyUsers(users);
      setSelectedCompany(companyId);
    } catch (error) {
      console.error('Error loading company users:', error);
      toast.error('Failed to load company users');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (userId: string, data: any) => {
    setIsLoading(true);
    try {
      const success = await updateUserAsAdmin(userId, data);
      if (success) {
        // Refresh the users list
        await loadUsers();
        if (selectedCompany) {
          await loadCompanyUsers(selectedCompany);
        }
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers, loadCompanyUsers, selectedCompany]);

  const updateCompany = useCallback(async (companyId: string, data: any) => {
    setIsLoading(true);
    try {
      const success = await updateCompanyAsAdmin(companyId, data);
      if (success) {
        // Refresh the companies list
        await loadCompanies();
      }
    } catch (error) {
      console.error('Error updating company:', error);
      toast.error('Failed to update company');
    } finally {
      setIsLoading(false);
    }
  }, [loadCompanies]);

  const deleteUser = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const success = await deleteUserAsAdmin(userId);
      if (success) {
        // Refresh the users list
        await loadUsers();
        if (selectedCompany) {
          await loadCompanyUsers(selectedCompany);
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setIsLoading(false);
    }
  }, [loadUsers, loadCompanyUsers, selectedCompany]);

  const deleteCompany = useCallback(async (companyId: string) => {
    setIsLoading(true);
    try {
      const success = await deleteCompanyAsAdmin(companyId);
      if (success) {
        // Refresh the companies list
        await loadCompanies();
        if (selectedCompany === companyId) {
          setSelectedCompany(null);
          setCompanyUsers([]);
        }
      }
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Failed to delete company');
    } finally {
      setIsLoading(false);
    }
  }, [loadCompanies, selectedCompany]);

  const loadSystemAnalytics = useCallback(async () => {
    setIsLoading(true);
    try {
      const analytics = await getSystemAnalytics();
      setSystemAnalytics(analytics);
    } catch (error) {
      console.error('Error loading system analytics:', error);
      toast.error('Failed to load system analytics');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadDashboardAnalytics = useCallback(async (companyId: string) => {
    if (!companyId) return;
    
    setIsLoading(true);
    try {
      const analytics = await getCompanyDashboardAnalytics(companyId);
      setDashboardAnalytics(analytics);
    } catch (error) {
      console.error('Error loading dashboard analytics:', error);
      toast.error('Failed to load dashboard analytics');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
    setSelectedCompany,
    loadSystemAnalytics,
    loadDashboardAnalytics
  };
}
