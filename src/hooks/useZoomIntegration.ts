
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  duration: number;
  join_url: string;
  password?: string;
}

export function useZoomIntegration() {
  const { profile } = useAuth();
  const companyId = profile?.company_id;
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const [integration, setIntegration] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if Zoom is connected
  const checkConnection = useCallback(async () => {
    if (!companyId) return { connected: false };
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('company_zoom_integrations')
        .select('*')
        .eq('company_id', companyId)
        .eq('is_connected', true)
        .single();
      
      if (error) {
        console.error('Error checking Zoom connection:', error);
        return { connected: false };
      }
      
      setIntegration(data);
      return { connected: !!data };
    } catch (error) {
      console.error('Error checking Zoom connection:', error);
      return { connected: false };
    } finally {
      setIsLoading(false);
    }
  }, [companyId]);
  
  // Start OAuth flow
  const connectZoom = useCallback(async () => {
    if (!companyId) {
      toast.error('Company profile not found');
      return;
    }
    
    setIsConnecting(true);
    try {
      // Configure redirect URI based on environment
      const redirectUri = `${window.location.origin}/zoom-callback`;
      
      // Get the authorization URL
      const response = await supabase.functions.invoke('zoom', {
        body: { 
          action: 'auth-url',
          redirectUri,
          companyId
        }
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Redirect to Zoom OAuth
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error connecting to Zoom:', error);
      toast.error('Failed to connect to Zoom: ' + error.message);
    } finally {
      setIsConnecting(false);
    }
  }, [companyId]);
  
  // Handle OAuth callback
  const handleCallback = useCallback(async (code: string, state: string, redirectUri: string) => {
    try {
      const response = await supabase.functions.invoke('zoom', {
        body: {
          action: 'auth-callback',
          code,
          state,
          redirectUri
        }
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast.success('Zoom connected successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error handling Zoom callback:', error);
      toast.error('Failed to connect Zoom: ' + error.message);
      return { success: false, error };
    }
  }, []);
  
  // Create a Zoom meeting
  const createMeeting = useCallback(async (
    topic: string,
    startTime: string,
    duration: number = 60,
    agenda?: string,
    password?: string
  ) => {
    if (!companyId) {
      toast.error('Company profile not found');
      return null;
    }
    
    setIsCreatingMeeting(true);
    try {
      const response = await supabase.functions.invoke('zoom', {
        body: {
          action: 'create-meeting',
          companyId,
          topic,
          startTime,
          duration,
          agenda,
          password
        }
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast.success('Zoom meeting created successfully!');
      return response.data.meeting as ZoomMeeting;
    } catch (error) {
      console.error('Error creating Zoom meeting:', error);
      toast.error('Failed to create Zoom meeting: ' + error.message);
      return null;
    } finally {
      setIsCreatingMeeting(false);
    }
  }, [companyId]);
  
  // Get upcoming meetings
  const getUpcomingMeetings = useCallback(async () => {
    if (!companyId) return [];
    
    try {
      const { data, error } = await supabase
        .from('company_zoom_meetings')
        .select('*')
        .eq('company_id', companyId)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching upcoming meetings:', error);
      return [];
    }
  }, [companyId]);
  
  // Disconnect Zoom
  const disconnectZoom = useCallback(async () => {
    if (!companyId) return { success: false };
    
    try {
      const response = await supabase.functions.invoke('zoom', {
        body: {
          action: 'disconnect',
          companyId
        }
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      toast.success('Zoom disconnected successfully');
      setIntegration(null);
      return { success: true };
    } catch (error) {
      console.error('Error disconnecting Zoom:', error);
      toast.error('Failed to disconnect Zoom: ' + error.message);
      return { success: false, error };
    }
  }, [companyId]);
  
  return {
    checkConnection,
    connectZoom,
    handleCallback,
    createMeeting,
    getUpcomingMeetings,
    disconnectZoom,
    isConnecting,
    isCreatingMeeting,
    isLoading,
    integration
  };
}
