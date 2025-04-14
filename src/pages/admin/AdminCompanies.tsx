
import React, { useState, useEffect } from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { 
  CompanyHeader, 
  CompanyTable, 
  CreateCompanyDialog 
} from "@/components/admin/companies";
import { EntityListSkeleton } from "@/components/admin/EntityListSkeleton";
import { useCompanyManagement } from "@/hooks/admin/useCompanyManagement";
import { toast } from "sonner";

export default function AdminCompanies() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { companies, isLoading, loadCompanies, updateCompany, deleteCompany } = useCompanyManagement();

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const handleViewUsers = (companyId: string) => {
    // In a real implementation, this would navigate to a filtered users view
    console.log("View users for company:", companyId);
    toast.info(`Viewing users for company ${companyId}`);
  };

  const handleCreateCompany = async (companyData: { name: string; industry: string }) => {
    try {
      // In a real implementation, this would call an API to create the company
      console.log("Create company:", companyData);
      toast.success("Company created successfully");
      setIsCreateDialogOpen(false);
      loadCompanies();
      return Promise.resolve();
    } catch (error) {
      toast.error("Failed to create company");
      return Promise.reject(error);
    }
  };

  const handleEditCompany = (company: any) => {
    console.log("Edit company:", company);
    toast.info(`Editing company ${company.name}`);
  };

  const handleDeleteCompany = (companyId: string) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(companyId);
      toast.success("Company deleted successfully");
    }
  };

  if (isLoading) {
    return <EntityListSkeleton />;
  }

  return (
    <PageErrorBoundary pageName="Company Management">
      <div className="space-y-6">
        <CompanyHeader 
          onAddCompanyClick={() => setIsCreateDialogOpen(true)}
        />
        
        <CompanyTable 
          companies={companies}
          isLoading={isLoading}
          onViewUsers={handleViewUsers}
          onEditCompany={handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
        />
        
        <CreateCompanyDialog 
          open={isCreateDialogOpen} 
          onOpenChange={setIsCreateDialogOpen}
          onCreateCompany={handleCreateCompany}
        />
      </div>
    </PageErrorBoundary>
  );
}
