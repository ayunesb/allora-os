import React, { useState } from "react";
import { UserTable, UserManagementHeader } from "@/components/admin/users";
export default function UserManagementPage() {
  const [companies, setCompanies] = useState([
    { id: "company-1", name: "Acme Inc." },
    { id: "company-2", name: "Global Tech" },
    { id: "company-3", name: "Future Solutions" },
  ]);
  const [users, setUsers] = useState([
    {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      company_id: "company-1",
      created_at: "2025-01-01",
    },
    {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      company_id: "company-2",
      created_at: "2025-01-15",
    },
    {
      id: "user-3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "user",
      company_id: "company-3",
      created_at: "2025-02-01",
    },
  ]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
  const handleUserAdded = () => {
    // Handle user added functionality
    console.log("User added");
  };
  const handleUpdateUser = (userId, data) => {
    // Update user functionality
    console.log("Update user", userId, data);
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, ...data } : user)),
    );
  };
  const handleDeleteUser = (userId) => {
    // Delete user functionality
    console.log("Delete user", userId);
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };
  return (
    <div className="space-y-6">
      <UserManagementHeader
        companies={companies}
        loadingCompanies={loadingCompanies}
        onUserAdded={handleUserAdded}
      />
      <UserTable
        users={users}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
