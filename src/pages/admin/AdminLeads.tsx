
import React from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { 
  LeadsHeader, 
  LeadsSearchBar, 
  LeadsTable, 
  AddLeadDialog, 
  MobileLeadCards 
} from "@/components/admin/leads";
import { useBreakpoint } from "@/hooks/use-mobile";

export default function AdminLeads() {
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <PageErrorBoundary pageName="Lead Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <LeadsHeader onAddLead={() => setIsAddLeadDialogOpen(true)} />
        
        <LeadsSearchBar 
          searchQuery={searchQuery} 
          onSearch={handleSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        
        {isMobile ? (
          <MobileLeadCards 
            searchQuery={searchQuery}
            statusFilter={statusFilter}
          />
        ) : (
          <LeadsTable 
            searchQuery={searchQuery}
            statusFilter={statusFilter}
          />
        )}
        
        <AddLeadDialog 
          open={isAddLeadDialogOpen} 
          onOpenChange={setIsAddLeadDialogOpen} 
        />
      </div>
    </PageErrorBoundary>
  );
}
