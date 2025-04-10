
import React from 'react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase';
import { handleApiError } from '@/utils/api/errorHandling';
import { useAuthState } from '@/hooks/useAuthState';
import { Lead } from '@/models/lead';
import {
  LeadsHeader,
  LeadsEmptyState,
  LeadsLoading,
  LeadsDescription
} from '@/components/dashboard/leads';

export default function DashboardLeads() {
  const { user } = useAuthState();
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['dashboard-leads', user?.id],
    queryFn: async () => {
      try {
        // This would typically filter leads for the current user/company
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return data as Lead[] || [];
      } catch (error) {
        throw error;
      }
    },
    enabled: !!user?.id,
  });
  
  // Handle error from the query
  React.useEffect(() => {
    if (error) {
      handleApiError(error, {
        customMessage: 'Failed to load your leads data'
      });
    }
  }, [error]);
  
  return (
    <div className="animate-fadeIn space-y-6">
      <LeadsHeader isMobileView={isMobileView} />
      
      {isLoading ? (
        <LeadsLoading />
      ) : (
        <LeadsEmptyState />
      )}
    </div>
  );
}
