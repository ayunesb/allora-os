import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, RefreshCcw } from "lucide-react";
import { initiateMetaAuth, initiateTikTokAuth } from "@/services/adPlatformService";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

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
  const handleMetaConnect = async () => {
    try {
      await initiateMetaAuth();
    } catch (error) {
      console.error('Meta auth initiation failed:', error);
    }
  };

  const handleTikTokConnect = async () => {
    try {
      await initiateTikTokAuth();
    } catch (error) {
      console.error('TikTok auth initiation failed:', error);
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
              disabled={metaConnected || isLoading}
            >
              {isLoading ? (
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
              disabled={tiktokConnected || isLoading}
            >
              {isLoading ? (
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
