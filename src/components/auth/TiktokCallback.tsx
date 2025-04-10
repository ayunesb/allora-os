
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { RefreshCcw } from 'lucide-react';

export default function TiktokCallback() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const authCode = searchParams.get('auth_code');
        const errorParam = searchParams.get('error');
        
        if (errorParam) {
          setError(`TikTok authorization error: ${errorParam}`);
          setIsLoading(false);
          return;
        }
        
        if (!authCode) {
          setError('No authorization code provided');
          setIsLoading(false);
          return;
        }
        
        // Call the edge function to exchange the code for a token
        const response = await fetch(`/functions/v1/tiktok-auth?action=callback&auth_code=${authCode}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to authenticate with TikTok');
        }
        
        if (data.success) {
          toast.success('TikTok account connected successfully!');
          navigate('/dashboard/ad-accounts?platform=tiktok&success=true');
        } else {
          throw new Error(data.error || 'Failed to connect TikTok account');
        }
      } catch (error: any) {
        console.error('TikTok callback error:', error);
        setError(error.message || 'An error occurred during TikTok authentication');
        toast.error('Failed to connect TikTok account');
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [location, navigate]);

  const handleRetry = () => {
    window.location.href = '/dashboard/ad-accounts';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCcw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Connecting to TikTok...</h1>
          <p className="text-muted-foreground">Please wait while we authenticate your account.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={handleRetry}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <RefreshCcw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Redirecting...</h1>
        <p className="text-muted-foreground">You will be redirected to the dashboard shortly.</p>
      </div>
    </div>
  );
}
