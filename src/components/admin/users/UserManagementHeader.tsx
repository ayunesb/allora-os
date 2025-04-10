
import React from 'react';
import { InviteUserDialog } from './InviteUserDialog';
import { useBreakpoint } from '@/hooks/use-mobile';
import { UserPlus } from 'lucide-react';

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
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
      <div className="w-full sm:w-auto">
        <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold text-white`}>
          User Management
        </h1>
        <p className="text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
          Manage user accounts and permissions
        </p>
      </div>
      <div className={`${isMobileView ? 'w-full' : 'w-auto'}`}>
        <InviteUserDialog 
          companies={companies} 
          loadingCompanies={loadingCompanies} 
          onSuccess={onUserAdded} 
        />
      </div>
    </div>
  );
};
