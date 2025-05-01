
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Campaign } from '@/types/fixed/Campaign';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface CampaignListProps {
  campaigns: Campaign[];
  isLoading?: boolean;
}

export const CampaignList: React.FC<CampaignListProps> = ({ campaigns, isLoading = false }) => {
  const [expandedCampaignId, setExpandedCampaignId] = useState<string | null>(null);

  const toggleCampaign = (id: string) => {
    setExpandedCampaignId(expandedCampaignId === id ? null : id);
  };

  if (isLoading) {
    return <p>Loading campaigns...</p>;
  }

  if (!campaigns || campaigns.length === 0) {
    return <p>No campaigns found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {campaigns.map((campaign) => (
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
