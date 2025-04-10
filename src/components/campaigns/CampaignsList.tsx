
import { Campaign } from "@/models/campaign";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import CampaignCard from "./CampaignCard";

interface CampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
  handleEditCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  onCreateCampaign: () => void;
  onApproveCampaign?: (id: string) => void;
  onExportCampaign?: (id: string, format: 'pdf' | 'csv') => void;
}

export default function CampaignsList({
  campaigns,
  isLoading,
  handleEditCampaign,
  deleteCampaign,
  onCreateCampaign,
  onApproveCampaign,
  onExportCampaign
}: CampaignsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-6" />
                <Skeleton className="h-2 w-full mb-3" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-24 w-full mb-4" />
              </div>
              <div className="border-t p-4 flex justify-between">
                <Skeleton className="h-9 w-[48%]" />
                <Skeleton className="h-9 w-[48%]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <div className="rounded-full bg-primary/10 p-3 mb-4">
            <LineChart className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            Create your first marketing campaign to start promoting your business and tracking results.
          </p>
          <Button onClick={onCreateCampaign}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Campaign
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {campaigns.map((campaign) => (
        <CampaignCard
          key={campaign.id}
          campaign={campaign}
          onEdit={handleEditCampaign}
          onDelete={deleteCampaign}
          onFeedback={(id, isPositive) => {
            if (isPositive && onApproveCampaign) {
              onApproveCampaign(id);
            }
          }}
          onExport={(id, format) => {
            if (onExportCampaign) {
              onExportCampaign(id, format);
            }
          }}
        />
      ))}
    </div>
  );
}
