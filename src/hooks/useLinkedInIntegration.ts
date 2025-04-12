
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/backend/supabase';
import { useAuth } from '@/context/AuthContext';
import { Lead } from '@/models/lead';
import { createLead } from '@/utils/leadHelpers';

type LinkedInConnection = {
  id: string;
  name: string;
  email?: string;
  title?: string;
  company?: string;
};

export function useLinkedInIntegration() {
  const { profile } = useAuth();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [connections, setConnections] = useState<LinkedInConnection[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initiate LinkedIn OAuth flow
  const connectToLinkedIn = async () => {
    try {
      setIsConnecting(true);
      
      // Generate a unique state parameter to prevent CSRF attacks
      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('linkedin_state', state);
      
      // Get the auth URL from our edge function
      const { data, error } = await supabase.functions.invoke('linkedin', {
        body: { action: 'get_auth_url', state },
      });
      
      if (error) throw error;
      
      // Redirect to LinkedIn for authentication
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Error connecting to LinkedIn:', error);
      toast.error(`Failed to connect to LinkedIn: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Handle the OAuth callback
  const handleAuthCallback = async (code: string, state: string) => {
    try {
      setIsConnecting(true);
      
      // Verify the state parameter to prevent CSRF attacks
      const savedState = sessionStorage.getItem('linkedin_state');
      if (!savedState || savedState !== state) {
        throw new Error('Invalid state parameter');
      }
      
      // Exchange the code for an access token
      const { data, error } = await supabase.functions.invoke('linkedin', {
        body: { 
          action: 'exchange_code', 
          code,
          state,
          companyId: profile?.company_id 
        },
      });
      
      if (error) throw error;
      
      // Store the access token
      setAccessToken(data.access_token);
      setIsAuthenticated(true);
      sessionStorage.removeItem('linkedin_state');
      toast.success('Successfully connected to LinkedIn');
      
      return true;
    } catch (error: any) {
      console.error('Error handling LinkedIn callback:', error);
      toast.error(`Failed to complete LinkedIn authentication: ${error.message}`);
      return false;
    } finally {
      setIsConnecting(false);
    }
  };
  
  // Search for connections
  const searchConnections = async (query: string) => {
    if (!accessToken) {
      toast.error('Not connected to LinkedIn');
      return [];
    }
    
    try {
      setIsSearching(true);
      
      const { data, error } = await supabase.functions.invoke('linkedin', {
        body: { 
          action: 'search_connections', 
          accessToken,
          query 
        },
      });
      
      if (error) throw error;
      
      setConnections(data.connections || []);
      return data.connections || [];
    } catch (error: any) {
      console.error('Error searching LinkedIn connections:', error);
      toast.error(`Failed to search connections: ${error.message}`);
      return [];
    } finally {
      setIsSearching(false);
    }
  };
  
  // Import selected connections as leads
  const importConnections = async (selectedConnections: LinkedInConnection[], campaignId: string) => {
    if (!accessToken || !profile?.company_id) {
      toast.error('Not connected to LinkedIn or company profile not loaded');
      return false;
    }
    
    try {
      setIsImporting(true);
      
      // Convert connections to leads
      const imported = await Promise.all(
        selectedConnections.map(async (connection) => {
          // Ensure required fields are present and non-optional
          if (!connection.name) {
            console.error('Connection missing required name field', connection);
            return false;
          }
          
          // Create a new lead from the connection data
          const leadData = {
            name: connection.name, // This is now guaranteed to be present
            email: connection.email,
            status: 'new' as const, // Use a const assertion to ensure correct type
            campaign_id: campaignId,
            source: 'linkedin',
            score: 20, // Assign a default initial score for LinkedIn imports
          };
          
          const lead = await createLead(leadData);
          return lead ? true : false;
        })
      );
      
      const successCount = imported.filter(success => success).length;
      
      if (successCount > 0) {
        toast.success(`Successfully imported ${successCount} leads from LinkedIn`);
        return true;
      } else {
        toast.error('Failed to import any leads');
        return false;
      }
    } catch (error: any) {
      console.error('Error importing LinkedIn connections:', error);
      toast.error(`Failed to import connections: ${error.message}`);
      return false;
    } finally {
      setIsImporting(false);
    }
  };
  
  // Disconnect from LinkedIn
  const disconnect = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    setConnections([]);
    toast.success('Disconnected from LinkedIn');
  };
  
  return {
    connectToLinkedIn,
    handleAuthCallback,
    searchConnections,
    importConnections,
    disconnect,
    connections,
    isAuthenticated,
    isConnecting,
    isSearching,
    isImporting,
  };
}
