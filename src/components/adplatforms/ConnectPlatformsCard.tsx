
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, TiktokLogo, Check, ArrowRight } from "lucide-react";
import { initiateMetaAuth, initiateTikTokAuth } from '@/services/adPlatformService';
import { Skeleton } from '../ui/skeleton';

interface ConnectPlatformsCardProps {
  metaConnected: boolean;
  tiktokConnected: boolean;
  isLoading: boolean;
  onProceed?: () => void;
}

export default function ConnectPlatformsCard({
  metaConnected,
  tiktokConnected,
  isLoading,
  onProceed
}: ConnectPlatformsCardProps) {
  const [isConnecting, setIsConnecting] = useState<'meta' | 'tiktok' | null>(null);

  const handleConnectMeta = async () => {
    setIsConnecting('meta');
    await initiateMetaAuth();
    // The page will redirect, so no need to set loading to false
  };

  const handleConnectTikTok = async () => {
    setIsConnecting('tiktok');
    await initiateTikTokAuth();
    // The page will redirect, so no need to set loading to false
  };

  const canProceed = metaConnected || tiktokConnected;

  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-32" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Connect Your Ad Accounts</CardTitle>
        <CardDescription>
          Connect your Meta (Facebook/Instagram) and/or TikTok ad accounts to enable 
          automated campaign deployment.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Button
          variant={metaConnected ? "outline" : "default"}
          className={`w-full h-14 justify-between ${metaConnected ? 'border-green-500' : ''}`}
          onClick={handleConnectMeta}
          disabled={metaConnected || isConnecting !== null}
        >
          <div className="flex items-center">
            <Facebook className="mr-2 h-5 w-5 text-blue-600" />
            <span>Meta (Facebook/Instagram)</span>
          </div>
          
          {metaConnected ? (
            <span className="flex items-center text-green-500">
              <Check className="mr-1 h-4 w-4" />
              Connected
            </span>
          ) : (
            <span>Connect Account</span>
          )}
        </Button>

        <Button
          variant={tiktokConnected ? "outline" : "default"}
          className={`w-full h-14 justify-between ${tiktokConnected ? 'border-green-500' : ''}`}
          onClick={handleConnectTikTok}
          disabled={tiktokConnected || isConnecting !== null}
        >
          <div className="flex items-center">
            <TiktokLogo className="mr-2 h-5 w-5" />
            <span>TikTok</span>
          </div>
          
          {tiktokConnected ? (
            <span className="flex items-center text-green-500">
              <Check className="mr-1 h-4 w-4" />
              Connected
            </span>
          ) : (
            <span>Connect Account</span>
          )}
        </Button>
      </CardContent>
      
      <CardFooter>
        {onProceed && (
          <Button 
            onClick={onProceed} 
            disabled={!canProceed}
            className="ml-auto"
          >
            Proceed to Campaign Creation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
