
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useZoomIntegration } from '@/hooks/useZoomIntegration';
import { Video, Link2, Loader2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export function ZoomConnector() {
  const { 
    checkConnection, 
    connectZoom, 
    disconnectZoom, 
    isConnecting, 
    integration,
    isConnected: connectionStatus
  } = useZoomIntegration();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    async function checkZoomConnection() {
      const result = await checkConnection();
      setIsConnected(result.connected);
      setIsLoading(false);
    }
    
    checkZoomConnection();
  }, [checkConnection]);
  
  const handleConnect = async () => {
    try {
      await connectZoom();
    } catch (error) {
      toast.error('Failed to initiate Zoom connection');
    }
  };
  
  const handleDisconnect = async () => {
    const confirmed = window.confirm('Are you sure you want to disconnect your Zoom integration? Any scheduled Zoom meetings will remain but you won\'t be able to create new ones.');
    
    if (!confirmed) return;
    
    const result = await disconnectZoom();
    
    if (result.success) {
      setIsConnected(false);
      toast.success('Zoom account disconnected successfully');
    } else {
      toast.error('Failed to disconnect Zoom account');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-blue-600" />
          Zoom Integration
        </CardTitle>
        <CardDescription>
          Connect your Zoom account to schedule meetings with clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary/70" />
          </div>
        ) : isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-950/40 p-3 rounded-md text-green-700 dark:text-green-400">
              <div className="bg-green-100 dark:bg-green-900/50 p-1 rounded-full">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Your Zoom account is connected</span>
            </div>
            
            {integration && (
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Connected: {integration.created_at ? formatDistanceToNow(new Date(integration.created_at), { addSuffix: true }) : 'Recently'}</p>
                <p>Last updated: {formatDistanceToNow(new Date(integration.updated_at), { addSuffix: true })}</p>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              <p>Allora AI can now create and manage Zoom meetings on your behalf.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm bg-amber-50 dark:bg-amber-950/40 p-3 rounded-md text-amber-700 dark:text-amber-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Your Zoom account is not connected</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Connect your Zoom account to enable Allora AI to create and manage meetings on your behalf.</p>
              <p className="mt-2">This integration allows us to:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Create Zoom meetings for strategic discussions</li>
                <li>Schedule follow-up calls with your team</li>
                <li>Provide one-click access to your meetings</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleDisconnect}
            >
              Disconnect Zoom
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => window.open('https://zoom.us/meeting', '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Zoom Dashboard
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleConnect}
            disabled={isConnecting}
            className="w-full sm:w-auto"
          >
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Link2 className="mr-2 h-4 w-4" />
                Connect Zoom Account
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
