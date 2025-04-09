
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from '@/components/admin/users/UserTable';
import { UserManagementHeader } from '@/components/admin/users/UserManagementHeader';
import { UserListSkeleton } from '@/components/admin/users/UserListSkeleton';
import { toast } from 'sonner';
import { supabase } from '@/backend/supabase';
import useAdminFunctions from '@/hooks/useAdminFunctions';

export default function AdminUsers() {
  const { users, loadUsers, isLoading, updateUser, deleteUser } = useAdminFunctions();
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);

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
    // Create a dialog confirming the deletion
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      deleteUser(userId);
      toast.success('User deleted successfully');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 animate-fadeIn">
      <UserManagementHeader 
        companies={companies} 
        loadingCompanies={loadingCompanies} 
        onUserAdded={loadUsers}
      />
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>User Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <UserListSkeleton />
          ) : (
            <UserTable 
              users={users} 
              onUpdateUser={updateUser} 
              onDeleteUser={handleDeleteUser} 
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
