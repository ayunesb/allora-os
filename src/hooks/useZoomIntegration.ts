
import { useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';

interface ZoomCallbackResult {
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
  
  const handleCallback = async (code: string, state: string, redirectUri: string): Promise<ZoomCallbackResult> => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const response = await fetchApi<{ success: boolean }>('/api/zoom/callback', 'POST', {
        code,
        state,
        redirectUri
      });
      
      if (response.success) {
        setIsConnected(true);
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
  
  const disconnectZoom = async (): Promise<boolean> => {
    try {
      const response = await fetchApi<{ success: boolean }>('/api/zoom/disconnect', 'POST');
      
      if (response.success) {
        setIsConnected(false);
        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect Zoom');
      return false;
    }
  };
  
  return {
    isConnecting,
    isConnected,
    error,
    initiateZoomConnection,
    handleCallback,
    disconnectZoom
  };
}
