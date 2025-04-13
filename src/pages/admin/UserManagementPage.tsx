
import React from "react";
import { UserTable } from "@/components/admin/users";
import { UserManagementHeader } from "@/components/admin/users";

export default function UserManagementPage() {
  return (
    <div className="space-y-6">
      <UserManagementHeader />
      <UserTable />
    </div>
  );
}
