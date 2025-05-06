import { ArrowLeft, RefreshCcw, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Facebook } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
export function CampaignDetailHeader({
  campaign,
  onBack,
  onDeploy,
  isDeploying,
}) {
  const getStatusBadge = () => {
    if (campaign.payment_status !== "paid") {
      return <Badge variant="destructive">Payment Required</Badge>;
    }
    if (campaign.deployment_status === "pending") {
      return <Badge variant="outline">Pending Deployment</Badge>;
    }
    if (campaign.deployment_status === "ready") {
      return (
        <Badge
          variant="outline"
          className="bg-yellow-100 text-yellow-800 border-yellow-300"
        >
          Ready to Deploy
        </Badge>
      );
    }
    if (campaign.deployment_status === "deployed") {
      if (
        campaign.platform_status === "ACTIVE" ||
        campaign.platform_status === "CAMPAIGN_STATUS_ENABLE"
      ) {
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Live
          </Badge>
        );
      } else {
        return <Badge variant="secondary">{campaign.platform_status}</Badge>;
      }
    }
    return <Badge>{campaign.deployment_status}</Badge>;
  };
  // Helper function to determine platform safely
  const getPlatform = () => {
    return campaign.ad_platform || campaign.platform;
  };
  return (
    <div className="flex items-center mb-8">
      <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back
      </Button>
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{campaign.name}</h1>
          {getStatusBadge()}
        </div>
        <div className="flex items-center text-muted-foreground mt-1">
          {getPlatform() === "meta" ? (
            <Facebook className="h-4 w-4 mr-1 text-blue-600" />
          ) : (
            <TikTokIcon className="h-4 w-4 mr-1" />
          )}
          <span>{getPlatform() === "meta" ? "Meta Ads" : "TikTok Ads"}</span>
        </div>
      </div>

      <div className="ml-auto flex gap-2">
        {campaign.payment_status === "paid" &&
          campaign.deployment_status === "ready" && (
            <Button onClick={onDeploy} disabled={isDeploying}>
              {isDeploying ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Share2 className="mr-2 h-4 w-4" />
                  Deploy Campaign
                </>
              )}
            </Button>
          )}
      </div>
    </div>
  );
}
