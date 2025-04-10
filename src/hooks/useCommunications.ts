
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';

export type CommunicationType = 'phone' | 'zoom' | 'whatsapp';
export type CommunicationStatus = 'scheduled' | 'completed' | 'missed' | 'cancelled';
export type CommunicationOutcome = 'follow_up' | 'opportunity' | 'closed_won' | 'closed_lost' | null;

export interface Communication {
  id: string;
  lead_id: string;
  type: CommunicationType;
  status: CommunicationStatus;
  scheduled_at: string | null;
  ended_at: string | null;
  notes: string | null;
  ai_summary: string | null;
  meeting_link: string | null;
  outcome: CommunicationOutcome;
  created_at: string;
  created_by: string | null;
  metadata: Record<string, any>;
  leads?: {
    name: string;
    email: string;
    phone: string;
    status: string;
  }
}

export interface ZoomMeetingData {
  topic: string;
  startTime: string;
  duration: number;
  timezone?: string;
  agenda?: string;
}

export interface CommunicationData {
  type: CommunicationType;
  status: CommunicationStatus;
  scheduledAt?: string;
  endedAt?: string;
  notes?: string;
  outcome?: CommunicationOutcome;
  updateLeadStatus?: boolean;
  leadStatus?: string;
  metadata?: Record<string, any>;
}

export function useCommunications() {
  const { user } = useAuthState();
  const queryClient = useQueryClient();
  
  const [isLoadingMutation, setIsLoadingMutation] = useState(false);
  
  // Fetch all communications
  const { 
    data: communications = [], 
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['communications'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('communications')
          .select('*, leads(name, email, phone, status)')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return data as Communication[];
      } catch (error: any) {
        console.error('Error fetching communications:', error.message);
        throw error;
      }
    },
    enabled: !!user?.id
  });

  // Create a new Zoom meeting
  const createZoomMeeting = async (leadId: string, meetingData: ZoomMeetingData) => {
    setIsLoadingMutation(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('communications', {
        body: { 
          action: 'create-zoom-meeting', 
          leadId, 
          meetingData 
        }
      });

      if (error) throw error;
      if (result.error) throw new Error(result.error);
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      
      toast.success('Zoom meeting created successfully');
      return result;
    } catch (error: any) {
      console.error('Error creating Zoom meeting:', error);
      toast.error(`Failed to create Zoom meeting: ${error.message}`);
      throw error;
    } finally {
      setIsLoadingMutation(false);
    }
  };

  // Log a WhatsApp or Phone communication
  const logCommunication = async (leadId: string, communicationData: CommunicationData) => {
    setIsLoadingMutation(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('communications', {
        body: { 
          action: 'log-communication', 
          leadId, 
          communicationData 
        }
      });

      if (error) throw error;
      if (result.error) throw new Error(result.error);
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      
      toast.success(`${communicationData.type} communication logged successfully`);
      return result;
    } catch (error: any) {
      console.error('Error logging communication:', error);
      toast.error(`Failed to log communication: ${error.message}`);
      throw error;
    } finally {
      setIsLoadingMutation(false);
    }
  };

  // Generate AI summary for a communication
  const generateAISummary = async (communicationId: string, transcriptText: string) => {
    setIsLoadingMutation(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('communications', {
        body: { 
          action: 'generate-summary',
          communicationId,
          transcriptText
        }
      });

      if (error) throw error;
      if (result.error) throw new Error(result.error);
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      
      toast.success('AI summary generated successfully');
      return result;
    } catch (error: any) {
      console.error('Error generating AI summary:', error);
      toast.error(`Failed to generate AI summary: ${error.message}`);
      throw error;
    } finally {
      setIsLoadingMutation(false);
    }
  };

  // Update communication status
  const updateCommunicationStatus = async (id: string, status: CommunicationStatus, notes?: string, outcome?: CommunicationOutcome) => {
    setIsLoadingMutation(true);
    try {
      const updateData: any = { status };
      if (notes !== undefined) updateData.notes = notes;
      if (outcome !== undefined) updateData.outcome = outcome;
      if (status === 'completed') updateData.ended_at = new Date().toISOString();
      
      const { error } = await supabase
        .from('communications')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ['communications'] });
      
      toast.success(`Communication marked as ${status}`);
      return true;
    } catch (error: any) {
      console.error('Error updating communication status:', error);
      toast.error(`Failed to update status: ${error.message}`);
      throw error;
    } finally {
      setIsLoadingMutation(false);
    }
  };

  // Get upcoming communications
  const getUpcomingCommunications = () => {
    return communications.filter(comm => 
      comm.status === 'scheduled' && 
      comm.scheduled_at && 
      new Date(comm.scheduled_at) > new Date()
    ).sort((a, b) => {
      if (!a.scheduled_at || !b.scheduled_at) return 0;
      return new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime();
    });
  };

  // Get past communications
  const getPastCommunications = () => {
    return communications.filter(comm => 
      (comm.status !== 'scheduled') || 
      (comm.scheduled_at && new Date(comm.scheduled_at) <= new Date())
    ).sort((a, b) => {
      // Default to created_at if scheduled_at is not available
      const dateA = a.ended_at || a.scheduled_at || a.created_at;
      const dateB = b.ended_at || b.scheduled_at || b.created_at;
      return new Date(dateB).getTime() - new Date(dateA).getTime(); // Descending
    });
  };

  return {
    communications,
    upcomingCommunications: getUpcomingCommunications(),
    pastCommunications: getPastCommunications(),
    isLoading,
    isLoadingMutation,
    error,
    refetch,
    createZoomMeeting,
    logCommunication,
    generateAISummary,
    updateCommunicationStatus
  };
}
