
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

interface CampaignHeaderProps {
  onCreateClick: () => void;
  // Add the prop that's being used in CampaignsPage
  onCreateCampaign?: (campaign: any) => void;
}

const CampaignHeader = ({ onCreateClick, onCreateCampaign }: CampaignHeaderProps) => {
  const handleClick = () => {
    if (onCreateCampaign) {
      onCreateCampaign({});
    } else {
      onCreateClick();
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Campaign Management</h1>
        <p className="text-muted-foreground mt-2">
          Oversee all marketing campaigns
        </p>
      </div>
      <Button onClick={handleClick}>
        <Plus className="mr-2 h-4 w-4" />
        Create Campaign
      </Button>
    </div>
  );
};

export default CampaignHeader;
