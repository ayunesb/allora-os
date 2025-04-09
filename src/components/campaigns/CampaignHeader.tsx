
import { BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CampaignHeaderProps = {
  onNewCampaign: () => void;
};

export default function CampaignHeader({ onNewCampaign }: CampaignHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <BarChart className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
        </div>
        
        <Button onClick={onNewCampaign} className="allora-button">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
      
      <p className="text-xl text-gray-300 mb-10">
        Create and manage email, video, and ad campaigns
      </p>
    </>
  );
}
