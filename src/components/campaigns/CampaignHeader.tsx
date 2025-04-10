
import { BarChart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CampaignHeaderProps = {
  onNewCampaign: () => void;
};

export default function CampaignHeader({ onNewCampaign }: CampaignHeaderProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <BarChart className="h-8 w-8 text-primary mr-3" />
          <div>
            <h1 className="text-3xl font-bold">Marketing Campaigns</h1>
            <p className="text-gray-300 mt-1">
              Create and manage ad campaigns with AI executive assistance
            </p>
          </div>
        </div>
        
        <Button onClick={onNewCampaign} className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-md shadow-md hover:shadow-lg transition-all">
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </div>
    </>
  );
}
