
import React from 'react';
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBreakpoint } from '@/hooks/use-mobile';
import { useLeads } from '@/hooks/admin/useLeads';
import { 
  LeadsHeader,
  LeadsSearchBar,
  LeadsTable,
  MobileLeadCards 
} from '@/components/admin/leads';

export default function AdminLeads() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const { 
    leads, 
    isLoading, 
    searchQuery,
    setSearchQuery,
    sortBy,
    sortOrder,
    toggleSort,
    handleStatusUpdate,
    handleDelete
  } = useLeads();
  
  const handleAddNewLead = () => {
    // To be implemented - for now just a placeholder for the button
    alert('Add new lead functionality will be implemented soon');
  };
  
  return (
    <div className="animate-fadeIn space-y-4 sm:space-y-6">
      <LeadsHeader 
        isMobileView={isMobileView} 
        onAddNewLead={handleAddNewLead}
      />
      
      <LeadsSearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          {/* Desktop view */}
          {!isMobileView && (
            <Card className="border-primary/10 shadow-sm overflow-hidden hidden sm:block">
              <LeadsTable 
                leads={leads}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={toggleSort}
                onStatusUpdate={handleStatusUpdate}
                onDelete={handleDelete}
              />
            </Card>
          )}
          
          {/* Mobile view */}
          {isMobileView && (
            <MobileLeadCards 
              leads={leads}
              onStatusUpdate={handleStatusUpdate}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}
