
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, BarChart3 } from 'lucide-react';
import { Campaign } from '@/types/unified-types';

interface CampaignMetricCardsProps {
  campaign: Campaign;
}

export function CampaignMetricCards({ campaign }: CampaignMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Budget</CardDescription>
          <CardTitle className="text-2xl flex items-center">
            <DollarSign className="h-5 w-5 mr-1 text-green-500" />
            ${campaign.budget?.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Management Fee:</span>
              <span>${campaign.management_fee?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-muted-foreground">Total Amount:</span>
              <span>${campaign.total_amount?.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Target Audience</CardDescription>
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-1 text-blue-500" />
            {campaign.targeting?.audience || 'Not specified'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span>{campaign.targeting?.location || 'Not specified'}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Campaign Status</CardDescription>
          <CardTitle className="text-lg flex items-center">
            <BarChart3 className="h-5 w-5 mr-1 text-purple-500" />
            {campaign.deployment_status === 'deployed' ? 'Deployed' : campaign.payment_status === 'paid' ? 'Ready to Deploy' : 'Payment Required'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Payment Status:</span>
              <span className={campaign.payment_status === 'paid' ? 'text-green-500' : 'text-amber-500'}>
                {campaign.payment_status === 'paid' ? 'Paid' : 'Pending'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date Created:</span>
              <span>{new Date(campaign.created_at || '').toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
