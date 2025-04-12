
import { Campaign } from '@/models/campaign';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Facebook, CheckCircle, Clock, PauseCircle, CreditCard } from 'lucide-react';
import { TikTokIcon } from "@/components/icons/TikTokIcon";

interface CampaignCardProps {
  campaign: Campaign;
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const navigate = useNavigate();

  const getStatusDisplay = (campaign: Campaign) => {
    if (campaign.payment_status !== 'paid') {
      return {
        icon: <CreditCard className="h-5 w-5 text-amber-500" />,
        label: 'Payment Required',
        color: 'text-amber-500'
      };
    }
    
    if (campaign.deployment_status === 'pending' || campaign.deployment_status === 'ready') {
      return {
        icon: <Clock className="h-5 w-5 text-blue-500" />,
        label: 'Ready to Deploy',
        color: 'text-blue-500'
      };
    }
    
    if (campaign.deployment_status === 'deployed') {
      if (campaign.platform_status === 'ACTIVE' || campaign.platform_status === 'CAMPAIGN_STATUS_ENABLE') {
        return {
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
          label: 'Live',
          color: 'text-green-500'
        };
      } else {
        return {
          icon: <PauseCircle className="h-5 w-5 text-purple-500" />,
          label: campaign.platform_status || 'Unknown',
          color: 'text-purple-500'
        };
      }
    }
    
    return {
      icon: <Clock className="h-5 w-5 text-gray-500" />,
      label: campaign.deployment_status || 'Unknown',
      color: 'text-gray-500'
    };
  };

  const getPlatformIcon = (platform: string) => {
    if (platform === 'meta') {
      return <Facebook className="h-5 w-5 text-blue-600" />;
    }
    
    if (platform === 'tiktok') {
      return <TikTokIcon className="h-5 w-5" />;
    }
    
    return null;
  };

  const status = getStatusDisplay(campaign);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{campaign.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              {getPlatformIcon(campaign.ad_platform || '')}
              <span className="ml-1">
                {campaign.ad_platform === 'meta' ? 'Meta Ads' : 'TikTok Ads'}
              </span>
            </CardDescription>
          </div>
          <div className={`flex items-center ${status.color}`}>
            {status.icon}
            <span className="ml-1 text-xs">{status.label}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Budget:</span>
              <span>${campaign.budget}</span>
              
              <span className="text-muted-foreground">Fee:</span>
              <span>${campaign.management_fee}</span>
              
              <span className="text-muted-foreground">Created:</span>
              <span>{new Date(campaign.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          
          {campaign.deployment_status === 'deployed' && campaign.performance_metrics && (
            <div className="bg-muted rounded-md p-3">
              <h4 className="text-sm font-medium mb-2">Performance</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-muted-foreground">Impressions:</span>
                <span>{campaign.performance_metrics.impressions?.toLocaleString() || 0}</span>
                
                <span className="text-muted-foreground">Clicks:</span>
                <span>{campaign.performance_metrics.clicks?.toLocaleString() || 0}</span>
                
                <span className="text-muted-foreground">CTR:</span>
                <span>{campaign.performance_metrics.ctr || 0}%</span>
                
                <span className="text-muted-foreground">Spend:</span>
                <span>${campaign.performance_metrics.spend || 0}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button 
          variant="outline" 
          onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
          className="w-full"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
