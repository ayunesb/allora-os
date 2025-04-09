
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/models/company";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import useAdminFunctions from '@/hooks/useAdminFunctions';
import { CompanyTable, CreateCompanyDialog, CompanyHeader } from '@/components/admin/companies';

export default function AdminCompanies() {
  const { loadCompanyUsers, setSelectedCompany } = useAdminFunctions();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      // Get all companies
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
      toast.error('Failed to load companies: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCompany = async (companyData: { name: string; industry: string }) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([companyData])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Company created successfully');
      setCompanies([data, ...companies]);
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
