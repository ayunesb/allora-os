
import React from 'react';
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useBreakpoint } from '@/hooks/use-mobile';
import { useLeads } from '@/hooks/admin/useLeads';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  LeadsHeader,
  LeadsSearchBar,
  LeadsTable,
  MobileLeadCards,
  AddLeadDialog 
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
    handleDelete,
    refetchLeads
  } = useLeads();
  
  // Fetch campaigns for the AddLeadDialog
  const { data: campaigns = [] } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('id, name')
        .order('name', { ascending: true });
        
      if (error) throw error;
      return data || [];
    }
  });
  
  return (
    <div className="animate-fadeIn space-y-4 sm:space-y-6">
      <LeadsHeader 
        isMobileView={isMobileView}
      />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="w-full sm:w-72">
          <LeadsSearchBar 
            searchQuery={searchQuery} 
            onSearchChange={setSearchQuery} 
          />
        </div>
        <AddLeadDialog 
          campaigns={campaigns}
          onLeadAdded={refetchLeads}
          isMobileView={isMobileView}
        />
      </div>
      
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
