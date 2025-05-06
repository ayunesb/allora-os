import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/admin/users/UserTable";
import { UserManagementHeader } from "@/components/admin/users/UserManagementHeader";
import { UserListSkeleton } from "@/components/admin/users/UserListSkeleton";
import { toast } from "sonner";
import { supabase } from "@/backend/supabase";
import useAdminFunctions from "@/hooks/useAdminFunctions";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function AdminUsers() {
  const { users, loadUsers, isLoading, updateUser, deleteUser } =
    useAdminFunctions();
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  useEffect(() => {
    // Load users when component mounts
    loadUsers();
    fetchCompanies();
  }, [loadUsers]);
  const fetchCompanies = async () => {
    setLoadingCompanies(true);
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("id, name")
        .order("name");
      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      toast.error("Failed to load companies");
    } finally {
      setLoadingCompanies(false);
    }
  };
  const handleDeleteUser = (userId, userName) => {
    // Create a dialog confirming the deletion
    if (window.confirm(`Are you sure you want to delete user ${userName}?`)) {
      deleteUser(userId);
      toast.success("User deleted successfully");
    }
  };
  return (
    <div className="animate-fadeIn">
      <UserManagementHeader
        companies={companies}
        loadingCompanies={loadingCompanies}
        onUserAdded={loadUsers}
      />

      <Card
        className={`border-white/10 shadow-md ${isMobileView ? "p-2" : ""} bg-[#111827]`}
      >
        <CardHeader className={`${isMobileView ? "px-3 py-3 pb-1" : "pb-2"}`}>
          <CardTitle className={`${isMobileView ? "text-lg" : ""} text-white`}>
            User Accounts
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobileView ? "p-3" : ""}>
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
