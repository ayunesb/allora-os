
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
import { Lead } from "@/models/lead";

export default function AdminLeads() {
  const [isAddLeadDialogOpen, setIsAddLeadDialogOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);

  // Mock data
  const leads: Lead[] = [];
  const campaigns = [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusUpdate = async (leadId: string, status: Lead['status']) => {
    console.log("Update lead status:", leadId, status);
    return Promise.resolve(true);
  };

  const handleDelete = async (leadId: string) => {
    console.log("Delete lead:", leadId);
    return Promise.resolve(true);
  };

  const handleRefetchLeads = () => {
    console.log("Refetching leads...");
  };

  return (
    <PageErrorBoundary pageName="Lead Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <LeadsHeader 
          isMobileView={isMobile}
          onAddLead={() => setIsAddLeadDialogOpen(true)} 
        />
        
        <LeadsSearchBar 
          searchQuery={searchQuery} 
          onSearchChange={handleSearch}
        />
        
        {isMobile ? (
          <MobileLeadCards 
            leads={leads}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        ) : (
          <LeadsTable 
            leads={leads}
            sortBy="name"
            sortOrder="asc"
            onSort={() => {}}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        )}
        
        <AddLeadDialog 
          campaigns={campaigns}
          onLeadAdded={handleRefetchLeads}
          isMobileView={isMobile}
        />
      </div>
    </PageErrorBoundary>
  );
}
