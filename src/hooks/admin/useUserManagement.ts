
import { useState, useCallback } from 'react';
import { User } from '@/models/user';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, name, company_id, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Map the profiles data to match our User type structure
      const mappedUsers: User[] = (data || []).map(profile => ({
        id: profile.id,
        name: profile.name || '',
        company_id: profile.company_id,
        role: (profile.role as 'admin' | 'user') || 'user',
        created_at: profile.created_at
      }));

      setUsers(mappedUsers);
    } catch (error: any) {
      console.error('Error loading users:', error);
      toast.error(`Failed to load users: ${error.message}`);
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
        .select('id, name, company_id, role, created_at')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      // Map the profiles data to match our User type structure
      const mappedUsers: User[] = (data || []).map(profile => ({
        id: profile.id,
        name: profile.name || '',
        company_id: profile.company_id,
        role: (profile.role as 'admin' | 'user') || 'user',
        created_at: profile.created_at
      }));
      
      setCompanyUsers(mappedUsers);
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

  return {
    users,
    companyUsers,
    selectedCompany,
    isLoading,
    loadUsers,
    loadCompanyUsers,
    updateUser,
    deleteUser,
    setSelectedCompany
  };
}
