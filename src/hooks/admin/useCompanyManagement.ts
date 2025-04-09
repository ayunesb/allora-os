
import { useState, useCallback } from 'react';
import { Company } from '@/models/company';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useCompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setCompanies(data || []);
    } catch (error: any) {
      console.error('Error loading companies:', error);
      toast.error(`Failed to load companies: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCompany = useCallback(async (companyId: string, data: any) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .update(data)
        .eq('id', companyId);

      if (error) {
        throw error;
      }
      
      toast.success('Company updated successfully');
      
      await loadCompanies();
      
      return true;
    } catch (error: any) {
      console.error('Error updating company:', error);
      toast.error(`Failed to update company: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadCompanies]);

  const deleteCompany = useCallback(async (companyId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', companyId);

      if (error) {
        throw error;
      }
      
      toast.success('Company deleted successfully');
      
      await loadCompanies();
      
      return true;
    } catch (error: any) {
      console.error('Error deleting company:', error);
      toast.error(`Failed to delete company: ${error.message}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [loadCompanies]);

  return {
    companies,
    isLoading,
    loadCompanies,
    updateCompany,
    deleteCompany
  };
}
