
import React from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { 
  CompanyHeader, 
  CompanyTable, 
  CreateCompanyDialog 
} from "@/components/admin/companies";

export default function AdminCompanies() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <PageErrorBoundary pageName="Company Management">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <CompanyHeader 
          onCreateCompany={() => setIsCreateDialogOpen(true)}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
        
        <CompanyTable searchQuery={searchQuery} />
        
        <CreateCompanyDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen} 
        />
      </div>
    </PageErrorBoundary>
  );
}
