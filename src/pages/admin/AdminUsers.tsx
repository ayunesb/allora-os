
import React from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { UserManagementHeader, UserTable, InviteUserDialog } from "@/components/admin/users";

export default function AdminUsers() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false);

  return (
    <PageErrorBoundary pageName="User Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <UserManagementHeader onInviteClick={() => setIsInviteDialogOpen(true)} />
        
        <UserTable />
        
        <InviteUserDialog 
          open={isInviteDialogOpen} 
          onOpenChange={setIsInviteDialogOpen} 
        />
      </div>
    </PageErrorBoundary>
  );
}
