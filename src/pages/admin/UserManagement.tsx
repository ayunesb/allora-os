
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { UserManagementHeader, UserTable } from "@/components/admin/users";
import { User } from "@/models/user";
import { toast } from "sonner";
import { useUserManagement } from "@/hooks/admin/useUserManagement";
import { Card } from "@/components/ui/card";
import { UserListSkeleton } from "@/components/admin/users/UserListSkeleton";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function UserManagement() {
  const { users, isLoading, loadUsers, updateUser, deleteUser } = useUserManagement();
  const [companies, setCompanies] = useState<{id: string, name: string}[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
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
      // For this implementation, we'll use a simple mock data
      // In a real implementation, this would fetch from the database
      setTimeout(() => {
        setCompanies([
          { id: 'company-1', name: 'Acme Inc.' },
          { id: 'company-2', name: 'Global Tech' },
          { id: 'company-3', name: 'Future Solutions' }
        ]);
        setLoadingCompanies(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching companies:', error);
      toast.error('Failed to load companies');
      setLoadingCompanies(false);
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      deleteUser(userId);
      toast.success('User deleted successfully');
    }
  };

  return (
    <>
      <Helmet>
        <title>User Management | Allora AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <UserManagementHeader 
          companies={companies} 
          loadingCompanies={loadingCompanies} 
          onUserAdded={loadUsers}
        />
        
        <Card className={`border-white/10 shadow-md ${isMobileView ? 'p-2' : ''} bg-[#111827]`}>
          {isLoading ? (
            <UserListSkeleton />
          ) : (
            <UserTable 
              users={users} 
              onUpdateUser={updateUser} 
              onDeleteUser={handleDeleteUser}
            />
          )}
        </Card>
      </div>
    </>
  );
}
