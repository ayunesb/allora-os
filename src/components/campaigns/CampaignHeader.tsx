
import { BarChart, Plus, MegaphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type CampaignHeaderProps = {
  onNewCampaign: () => void;
};

export default function CampaignHeader({ onNewCampaign }: CampaignHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-fadeIn">
      <div className="flex items-center">
        <BarChart className="h-8 w-8 text-primary mr-3" />
        <div>
          <h1 className="text-3xl font-bold gradient-text">Marketing Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage ad campaigns with AI executive assistance
          </p>
        </div>
      </div>
      
      <Button 
        onClick={onNewCampaign} 
        variant="gradient"
        className="shadow-lg hover:shadow-primary/20"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Campaign
      </Button>
    </div>
  );
}
