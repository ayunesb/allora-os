
import React from 'react';
import { InviteUserDialog } from './InviteUserDialog';

interface UserManagementHeaderProps {
  companies: { id: string; name: string }[];
  loadingCompanies: boolean;
  onUserAdded: () => void;
}

export const UserManagementHeader = ({ 
  companies, 
  loadingCompanies, 
  onUserAdded 
}: UserManagementHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage user accounts and permissions
        </p>
      </div>
      <InviteUserDialog 
        companies={companies} 
        loadingCompanies={loadingCompanies} 
        onSuccess={onUserAdded} 
      />
    </div>
  );
};
