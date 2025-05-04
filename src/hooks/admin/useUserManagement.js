import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function useUserManagement() {
    const [users, setUsers] = useState([]);
    const [companyUsers, setCompanyUsers] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
            // Map the profiles data to match our User type structure
            const mappedUsers = (data || []).map(profile => ({
                id: profile.id,
                name: profile.name || '',
                email: profile.email || '',
                firstName: '',
                lastName: '',
                company_id: profile.company_id,
                role: profile.role || 'user',
                created_at: profile.created_at,
                company: '',
                industry: '',
                app_metadata: {}
            }));
            setUsers(mappedUsers);
        }
        catch (error) {
            console.error('Error loading users:', error);
            toast.error(`Failed to load users: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const loadCompanyUsers = useCallback(async (companyId) => {
        if (!companyId)
            return;
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
            // Map the profiles data to match our User type structure
            const mappedUsers = (data || []).map(profile => ({
                id: profile.id,
                name: profile.name || '',
                email: profile.email || '',
                firstName: '',
                lastName: '',
                company_id: profile.company_id,
                role: profile.role || 'user',
                created_at: profile.created_at,
                company: '',
                industry: '',
                app_metadata: {}
            }));
            setCompanyUsers(mappedUsers);
            setSelectedCompany(companyId);
        }
        catch (error) {
            console.error('Error loading company users:', error);
            toast.error(`Failed to load company users: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const updateUser = useCallback(async (userId, data) => {
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
        }
        catch (error) {
            console.error('Error updating user:', error);
            toast.error(`Failed to update user: ${error.message}`);
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }, [loadUsers, loadCompanyUsers, selectedCompany]);
    const deleteUser = useCallback(async (userId) => {
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
        }
        catch (error) {
            console.error('Error deleting user:', error);
            toast.error(`Failed to delete user: ${error.message}`);
            return false;
        }
        finally {
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
