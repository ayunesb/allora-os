
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useZoomIntegration } from '@/hooks/useZoomIntegration';
import { Loader2 } from 'lucide-react';

// Define the ZoomCallbackResult interface to match the useZoomIntegration hook's return type
interface ZoomCallbackResult {
  success: boolean;
  data?: any;
  error?: {
    message: string;
    code?: string;
  };
}

export default function ZoomCallback() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCallback } = useZoomIntegration();
  
  useEffect(() => {
    async function processCallback() {
      try {
        // Parse the URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        
        if (error) {
          setStatus('error');
          setErrorMessage(`Zoom authorization error: ${error}`);
          return;
        }
        
        if (!code || !state) {
          setStatus('error');
          setErrorMessage('Missing required parameters');
          return;
        }
        
        // Handle the callback
        const redirectUri = `${window.location.origin}/zoom-callback`;
        const result: ZoomCallbackResult = await handleCallback(code, state, redirectUri);
        
        if (result.success) {
          setStatus('success');
          // Redirect after a short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setStatus('error');
          setErrorMessage(result.error?.message || 'Failed to connect Zoom');
        }
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(error.message || 'An unexpected error occurred');
      }
    }
    
    processCallback();
  }, [location, handleCallback, navigate]);
  
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg border">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <h2 className="mt-4 text-2xl font-bold">Connecting to Zoom</h2>
              <p className="mt-2 text-muted-foreground">Please wait while we complete the connection...</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg className="h-6 w-6 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-green-600 dark:text-green-400">Successfully Connected!</h2>
              <p className="mt-2 text-muted-foreground">Your Zoom account has been connected to Allora AI.</p>
              <p className="mt-4 text-sm text-muted-foreground">Redirecting to dashboard...</p>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <svg className="h-6 w-6 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-red-600 dark:text-red-400">Connection Failed</h2>
              <p className="mt-2 text-muted-foreground">{errorMessage || 'An error occurred while connecting to Zoom.'}</p>
              <button 
                onClick={() => navigate('/dashboard')}
                className="mt-6 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
              >
                Return to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
