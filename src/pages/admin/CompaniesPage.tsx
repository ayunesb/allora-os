
import React, { useState } from "react";
import { CompanyHeader, CompanyTable } from "@/components/admin/companies";
import { Company } from "@/models/company";

export default function CompaniesPage() {
  // Update the company data to match the required model.Company type
  const [companies, setCompanies] = useState<Company[]>([
    { id: 'company-1', name: 'Acme Inc.', industry: 'Technology', created_at: '2025-01-15' },
    { id: 'company-2', name: 'Global Tech', industry: 'Manufacturing', created_at: '2025-02-20' },
    { id: 'company-3', name: 'Future Solutions', industry: 'Healthcare', created_at: '2025-03-10' }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddCompany = () => {
    console.log('Add company clicked');
  };
  
  const handleViewUsers = (companyId: string) => {
    console.log('View users for company', companyId);
  };
  
  return (
    <div className="space-y-6">
      <CompanyHeader onAddCompanyClick={handleAddCompany} />
      <CompanyTable 
        companies={companies}
        isLoading={isLoading}
        onViewUsers={handleViewUsers}
      />
    </div>
  );
}
