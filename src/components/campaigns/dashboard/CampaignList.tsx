
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Campaign } from '@/types/fixed/Campaign';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface CampaignListProps {
  campaigns: Campaign[];
  filteredCampaigns?: Campaign[];
  onCreateCampaign?: () => void;
  isLoading?: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({ 
  campaigns, 
  filteredCampaigns,
  onCreateCampaign,
  isLoading = false 
}) => {
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(null);
  const campaignsToDisplay = filteredCampaigns || campaigns;

  const toggleCampaign = (id: string) => {
    setExpandedCampaignId(expandedCampaignId === id ? null : id);
  };

  if (isLoading) {
    return <p>Loading campaigns...</p>;
  }

  if (!campaignsToDisplay || campaignsToDisplay.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No campaigns found.</p>
        {onCreateCampaign && (
          <Button onClick={onCreateCampaign} className="mt-4">
            Create Campaign
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {campaignsToDisplay.map((campaign) => (
        <Card key={campaign.id}>
          <CardHeader>
            <CardTitle>{campaign.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{campaign.description}</p>
            <div className="mt-2">
              <Badge variant="secondary">{campaign.status}</Badge>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div>
              {campaign.startDate && (
                <p className="text-xs text-muted-foreground">
                  Starts: {format(new Date(campaign.startDate), 'MMM dd, yyyy')}
                </p>
              )}
            </div>
            <Button asChild variant="link">
              <Link to={`/campaigns/${campaign.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
