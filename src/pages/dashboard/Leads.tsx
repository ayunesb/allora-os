
// Create a consistent implementation for the dashboard leads page
import React from 'react';
import { useBreakpoint } from '@/hooks/use-mobile';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/backend/supabase';
import { handleApiError } from '@/utils/api/errorHandling';
import { useAuthState } from '@/hooks/useAuthState';
import { Lead } from '@/models/lead';
import { Loader2 } from 'lucide-react';

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
      <h1 className={`${isMobileView ? 'text-xl' : 'text-2xl sm:text-3xl'} font-bold`}>
        Your Leads
      </h1>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Leads data will be displayed here. Please check the admin panel for full leads management.
          </p>
        </div>
      )}
    </div>
  );
}
