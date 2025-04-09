
import { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

export function usePendingApprovals() {
  const [isLoading, setIsLoading] = useState(true);
  const [pendingApprovals, setPendingApprovals] = useState(0);

  useEffect(() => {
    const fetchPendingApprovals = async () => {
      try {
        setIsLoading(true);
        
        // Get pending approvals count from user actions table
        const { count, error } = await supabase
          .from('user_actions')
          .select('*', { count: 'exact', head: true })
          .eq('category', 'approval')
          .eq('metadata->status', 'pending');
          
        if (error) throw error;
        setPendingApprovals(count || 0);
      } catch (error: any) {
        console.error("Error fetching pending approvals:", error);
        toast.error("Failed to load pending approvals");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPendingApprovals();
  }, []);

  return {
    isLoading,
    pendingApprovals
  };
}
