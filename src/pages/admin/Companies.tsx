
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from 'sonner';
import { CompanyTable, CreateCompanyDialog, CompanyHeader } from '@/components/admin/companies';
import { useCompanyManagement } from '@/hooks/admin';
import useAdminFunctions from '@/hooks/useAdminFunctions';
import { supabase } from '@/integrations/supabase/client';

export default function AdminCompanies() {
  const { loadCompanyUsers, setSelectedCompany } = useAdminFunctions();
  const { companies, isLoading, loadCompanies } = useCompanyManagement();
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const handleCreateCompany = async (companyData: { name: string; industry: string }) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([companyData])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Company created successfully');
      // Refresh the companies list
      loadCompanies();
      setOpenAddDialog(false);
    } catch (error: any) {
      console.error('Error creating company:', error);
      toast.error('Failed to create company: ' + error.message);
      throw error; // Rethrow to let the dialog component handle it
    }
  };

  const handleViewUsers = (companyId: string) => {
    setSelectedCompany(companyId);
    loadCompanyUsers(companyId);
    // Navigate to company users view
    window.location.href = '/admin/users';
  };

  return (
    <div className="container mx-auto px-4 pt-6 pb-12">
      <CompanyHeader onAddCompanyClick={() => setOpenAddDialog(true)} />
      
      <CreateCompanyDialog 
        open={openAddDialog} 
        onOpenChange={setOpenAddDialog}
        onCreateCompany={handleCreateCompany}
      />
      
      <Card className="border-primary/10 shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyTable 
            companies={companies}
            isLoading={isLoading}
            onViewUsers={handleViewUsers}
          />
        </CardContent>
      </Card>
    </div>
  );
}
