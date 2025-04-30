
import { useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';

export interface ZoomIntegration {
  created_at: string;
  updated_at: string;
  user_id?: string;
  account_id?: string;
  status?: string;
}

export interface ZoomCallbackResult {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code?: string;
  };
}

export function useZoomIntegration() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [integration, setIntegration] = useState<ZoomIntegration | null>(null);

  const checkConnection = async (): Promise<{ connected: boolean; integration?: ZoomIntegration }> => {
    try {
      const response = await fetchApi<{ connected: boolean; integration?: ZoomIntegration }>('/api/zoom/status', 'GET');
      
      if (response.integration) {
        setIntegration(response.integration);
        setIsConnected(response.connected);
      }
      
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to check Zoom connection status');
      return { connected: false };
    }
  };

  const initiateZoomConnection = async (): Promise<string> => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const response = await fetchApi<{ authUrl: string }>('/api/zoom/authorize', 'POST', {
        redirectUri: `${window.location.origin}/zoom-callback`,
        state: Math.random().toString(36).substring(2)
      });
      
      return response.authUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Zoom');
      throw err;
    } finally {
      setIsConnecting(false);
    }
  };
  
  const connectZoom = async (): Promise<void> => {
    try {
      const authUrl = await initiateZoomConnection();
      window.location.href = authUrl;
    } catch (err: any) {
      setError(err.message || 'Failed to connect to Zoom');
      throw err;
    }
  };
  
  const handleCallback = async (code: string, state: string, redirectUri: string): Promise<ZoomCallbackResult> => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const response = await fetchApi<{ success: boolean; integration?: ZoomIntegration }>('/api/zoom/callback', 'POST', {
        code,
        state,
        redirectUri
      });
      
      if (response.success) {
        setIsConnected(true);
        if (response.integration) {
          setIntegration(response.integration);
        }
        return { success: true, data: response };
      } else {
        setError('Failed to connect Zoom account');
        return { 
          success: false, 
          error: { 
            message: 'Failed to connect Zoom account'
          }
        };
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while connecting to Zoom');
      return {
        success: false,
        error: {
          message: err.message || 'An error occurred while connecting to Zoom',
          code: err.code
        }
      };
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectZoom = async (): Promise<{ success: boolean }> => {
    try {
      const response = await fetchApi<{ success: boolean }>('/api/zoom/disconnect', 'POST');
      
      if (response.success) {
        setIsConnected(false);
        setIntegration(null);
      }
      return response;
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect Zoom');
      return { success: false };
    }
  };
  
  return {
    isConnecting,
    isConnected,
    error,
    integration,
    initiateZoomConnection,
    handleCallback,
    disconnectZoom,
    connectZoom,
    checkConnection
  };
}
