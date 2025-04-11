
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, RefreshCcw, AlertCircle } from "lucide-react";
import { initiateMetaAuth, initiateTikTokAuth } from "@/services/adPlatformService";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { useState } from "react";
import { toast } from "sonner";

interface ConnectPlatformsCardProps {
  metaConnected: boolean;
  tiktokConnected: boolean;
  isLoading: boolean;
  onProceed: () => void;
}

export default function ConnectPlatformsCard({
  metaConnected,
  tiktokConnected,
  isLoading,
  onProceed
}: ConnectPlatformsCardProps) {
  const [metaConnecting, setMetaConnecting] = useState(false);
  const [tiktokConnecting, setTiktokConnecting] = useState(false);
  const [metaError, setMetaError] = useState<string | null>(null);
  const [tiktokError, setTiktokError] = useState<string | null>(null);

  const handleMetaConnect = async () => {
    try {
      setMetaConnecting(true);
      setMetaError(null);
      const result = await initiateMetaAuth();
      if (!result.success) {
        setMetaError(result.error || 'Failed to initiate Meta authorization');
      }
    } catch (error: any) {
      console.error('Meta auth initiation failed:', error);
      setMetaError(error.message || 'Unknown error');
      toast.error('Failed to connect to Meta. Please try again.');
    } finally {
      setMetaConnecting(false);
    }
  };

  const handleTikTokConnect = async () => {
    try {
      setTiktokConnecting(true);
      setTiktokError(null);
      const result = await initiateTikTokAuth();
      if (!result.success) {
        setTiktokError(result.error || 'Failed to initiate TikTok authorization');
      }
    } catch (error: any) {
      console.error('TikTok auth initiation failed:', error);
      setTiktokError(error.message || 'Unknown error');
      toast.error('Failed to connect to TikTok. Please try again.');
    } finally {
      setTiktokConnecting(false);
    }
  };

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>Connect Ad Platforms</CardTitle>
        <CardDescription>
          Connect your Meta and TikTok ad accounts to start creating campaigns
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Facebook className="mr-2 h-4 w-4 text-blue-600" />
              <span>Meta (Facebook/Instagram)</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleMetaConnect}
              disabled={metaConnected || isLoading || metaConnecting}
            >
              {metaConnecting ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : metaConnected ? (
                'Connected'
              ) : (
                'Connect'
              )}
            </Button>
          </div>
          {metaError && (
            <div className="flex items-center text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{metaError}</span>
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TikTokIcon className="mr-2 h-4 w-4" />
              <span>TikTok</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTikTokConnect}
              disabled={tiktokConnected || isLoading || tiktokConnecting}
            >
              {tiktokConnecting ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : tiktokConnected ? (
                'Connected'
              ) : (
                'Connect'
              )}
            </Button>
          </div>
          {tiktokError && (
            <div className="flex items-center text-red-500 text-sm mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>{tiktokError}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={onProceed}
          disabled={!metaConnected && !tiktokConnected}
        >
          Proceed to Create Campaign
        </Button>
      </CardFooter>
    </Card>
  );
}
