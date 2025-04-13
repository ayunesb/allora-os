
import React, { useState, useEffect } from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { UserManagementHeader, UserTable, InviteUserDialog } from "@/components/admin/users";
import { User } from "@/models/user";
import { toast } from "sonner";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<Array<{ id: string; name: string }>>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);

  useEffect(() => {
    // Mock loading users
    const timer = setTimeout(() => {
      setUsers([]);
      setIsLoading(false);
      setCompanies([{ id: '1', name: 'Default Company' }]);
      setLoadingCompanies(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleUserAdded = () => {
    toast.success("User added successfully");
    // Would normally refetch users here
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    console.log("Update user:", userId, updates);
    toast.success("User updated");
  };

  const handleDeleteUser = (userId: string) => {
    console.log("Delete user:", userId);
    toast.success("User deleted");
  };

  return (
    <PageErrorBoundary pageName="User Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <UserManagementHeader 
          companies={companies}
          loadingCompanies={loadingCompanies}
          onUserAdded={handleUserAdded}
        />
        
        <UserTable 
          users={users}
          isLoading={isLoading}
          onUpdateUser={handleUpdateUser}
          onDeleteUser={handleDeleteUser}
        />
        
        {/* The InviteUserDialog is now handled within UserManagementHeader */}
      </div>
    </PageErrorBoundary>
  );
}
