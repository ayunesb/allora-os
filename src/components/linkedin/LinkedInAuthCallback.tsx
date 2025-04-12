
import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLinkedInIntegration } from '@/hooks/useLinkedInIntegration';
import { Loader2 } from 'lucide-react';

export const LinkedInAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuthCallback } = useLinkedInIntegration();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const processAuth = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        if (!code || !state) {
          setError('Missing required parameters');
          setIsProcessing(false);
          return;
        }
        
        const success = await handleAuthCallback(code, state);
        
        if (success) {
          // Redirect to LinkedIn integration page
          navigate('/linkedin-integration');
        } else {
          setError('Authentication failed');
        }
      } catch (err: any) {
        console.error('Error processing LinkedIn auth callback:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setIsProcessing(false);
      }
    };
    
    processAuth();
  }, [searchParams, handleAuthCallback, navigate]);
  
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>LinkedIn Authentication</CardTitle>
          <CardDescription>
            {isProcessing 
              ? 'Processing your LinkedIn authentication...' 
              : error 
                ? 'There was a problem connecting to LinkedIn' 
                : 'Successfully connected to LinkedIn'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Please wait while we complete the authentication process</p>
            </div>
          ) : error ? (
            <div className="text-center text-destructive">
              <p className="mb-4">Error: {error}</p>
              <p>Please try connecting again from the LinkedIn integration page.</p>
            </div>
          ) : (
            <div className="text-center text-green-600">
              <p className="mb-4">Successfully connected to LinkedIn!</p>
              <p>You'll be redirected to the LinkedIn integration page.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
