import React, { useState, useEffect } from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { UserManagementHeader, UserTable } from "@/components/admin/users";
import { EntityListSkeleton } from "@/components/admin/EntityListSkeleton";
import { toast } from "sonner";
import { useUserManagement } from "@/hooks/admin/useUserManagement";
export default function AdminUsers() {
  const { users, isLoading, loadUsers, updateUser, deleteUser } =
    useUserManagement();
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
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
          { id: "company-1", name: "Acme Inc." },
          { id: "company-2", name: "Global Tech" },
          { id: "company-3", name: "Future Solutions" },
        ]);
        setLoadingCompanies(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to load companies");
      setLoadingCompanies(false);
    }
  };
  const handleUserAdded = () => {
    toast.success("User added successfully");
    loadUsers();
  };
  const handleUpdateUser = (userId, updates) => {
    updateUser(userId, updates);
    toast.success("User updated");
  };
  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      deleteUser(userId);
      toast.success("User deleted");
    }
  };
  if (isLoading || loadingCompanies) {
    return <EntityListSkeleton />;
  }
  return (
    <PageErrorBoundary pageName="User Management">
      <div className="space-y-6">
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
      </div>
    </PageErrorBoundary>
  );
}
