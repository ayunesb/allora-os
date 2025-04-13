
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { UserTable } from '@/components/admin/users/UserTable';
import { UserManagementHeader } from '@/components/admin/users/UserManagementHeader';
import { UserListSkeleton } from '@/components/admin/users/UserListSkeleton';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import useAdminFunctions from '@/hooks/admin/useAdminFunctions';
import { useBreakpoint } from '@/hooks/use-mobile';

export default function UserManagement() {
  const { users, loadUsers, isLoading, updateUser, deleteUser } = useAdminFunctions();
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);

  useEffect(() => {
    // Load users when component mounts
    loadUsers();
    fetchCompanies();
  }, [loadUsers]);

  const fetchCompanies = async () => {
    setLoadingCompanies(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('id, name')
        .order('name');
      
      if (error) throw error;
      
      setCompanies(data || []);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
    } finally {
      setLoadingCompanies(false);
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      deleteUser(userId);
    }
  };

  return (
    <div className="container mx-auto py-8 animate-fadeIn">
      <UserManagementHeader 
        companies={companies} 
        loadingCompanies={loadingCompanies} 
        onUserAdded={loadUsers}
      />
      
      <Card className={`border-white/10 shadow-md ${isMobileView ? 'p-2' : ''} bg-[#111827]`}>
        <div className={`${isMobileView ? 'px-3 py-3 pb-1' : 'px-6 py-4 pb-2'}`}>
          <h2 className={`${isMobileView ? 'text-lg' : 'text-xl'} font-semibold text-white`}>User Accounts</h2>
        </div>
        <div className={isMobileView ? 'p-3' : 'p-6 pt-2'}>
          {isLoading ? (
            <UserListSkeleton />
          ) : (
            <UserTable 
              users={users} 
              onUpdateUser={updateUser} 
              onDeleteUser={handleDeleteUser} 
            />
          )}
        </div>
      </Card>
    </div>
  );
}
