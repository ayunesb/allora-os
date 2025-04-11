
import { useState } from "react";
import ConnectPlatformsCard from "@/components/adplatforms/ConnectPlatformsCard";
import { getAdPlatformConnections } from "@/services/adPlatformService";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Facebook, AlertTriangle } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdPlatformsConnectionProps {
  onComplete?: () => Promise<void>;
  companyName: string;
  isLoading?: boolean;
}

export function AdPlatformsConnection({ 
  onComplete, 
  companyName,
  isLoading: externalLoading = false 
}: AdPlatformsConnectionProps) {
  const [metaConnected, setMetaConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { profile } = useAuth();

  // Check if user has connected ad accounts
  useEffect(() => {
    const checkConnections = async () => {
      setIsLoading(true);
      try {
        const connections = await getAdPlatformConnections();
        
        setMetaConnected(connections.some(conn => conn.platform === 'meta' && conn.is_active));
        setTiktokConnected(connections.some(conn => conn.platform === 'tiktok' && conn.is_active));
      } catch (error) {
        console.error('Error checking ad platform connections:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (profile?.company_id) {
      checkConnections();
    } else {
      setIsLoading(false);
    }
  }, [profile]);

  const handleProceed = async () => {
    if (onComplete) {
      await onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Connect Your Ad Accounts</h2>
        <p className="text-muted-foreground">
          Connect your Meta and TikTok ad accounts to help {companyName} AI provide more targeted strategy recommendations
        </p>
      </div>

      {profile?.company_id ? (
        <ConnectPlatformsCard
          metaConnected={metaConnected}
          tiktokConnected={tiktokConnected}
          isLoading={isLoading || externalLoading}
          onProceed={handleProceed}
        />
      ) : (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-800">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Company Setup Required
            </CardTitle>
            <CardDescription className="text-amber-700">
              Please complete the company setup before connecting ad platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <div className="flex items-center opacity-50">
                <Facebook className="mr-2 h-4 w-4 text-blue-600" />
                <span>Meta (Facebook/Instagram)</span>
                <Button variant="outline" size="sm" className="ml-auto" disabled>
                  Connect
                </Button>
              </div>
              <div className="flex items-center opacity-50">
                <TikTokIcon className="mr-2 h-4 w-4" />
                <span>TikTok</span>
                <Button variant="outline" size="sm" className="ml-auto" disabled>
                  Connect
                </Button>
              </div>
              <Button className="w-full mt-2" onClick={handleProceed}>
                Continue Without Connecting
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>* You can skip this step and connect your ad accounts later from the dashboard.</p>
        <p>* Connecting your ad accounts helps our AI provide more personalized strategy recommendations.</p>
      </div>
    </div>
  );
}
