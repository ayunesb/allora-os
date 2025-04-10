
import { Campaign } from "@/models/campaign";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, PlusCircle, ThumbsUp, LineChart } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
  handleEditCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  onCreateCampaign: () => void;
  onApproveCampaign?: (id: string) => void;
}

export default function CampaignsList({
  campaigns,
  isLoading,
  handleEditCampaign,
  deleteCampaign,
  onCreateCampaign,
  onApproveCampaign,
}: CampaignsListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-9 w-full" />
            </CardFooter>
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
        <Card key={campaign.id} className="overflow-hidden border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{campaign.name}</CardTitle>
              {campaign.executiveBot && (
                <Avatar className="h-8 w-8 border border-primary/20">
                  <AvatarImage 
                    src={`/avatars/${campaign.executiveBot.toLowerCase().replace(/\s+/g, '-')}.png`}
                    alt={campaign.executiveBot} 
                  />
                  <AvatarFallback>{campaign.executiveBot.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <CardDescription>
              {campaign.platform} Campaign
              {campaign.executiveBot && ` • Recommended by ${campaign.executiveBot}`}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">{formatCurrency(campaign.budget || 0)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium">{campaign.status || "Draft"}</span>
              </div>
              
              {campaign.roi && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Expected ROI:</span>
                  <span className="font-medium">{campaign.roi}</span>
                </div>
              )}
              
              {campaign.justification && (
                <div className="text-sm mt-4">
                  <span className="text-muted-foreground block mb-1">Why it matters:</span>
                  <p className="text-sm">{campaign.justification}</p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEditCampaign(campaign.id)}
              className="flex-1"
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteCampaign(campaign.id)}
              className="flex-1 text-destructive hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            
            {onApproveCampaign && campaign.executiveBot && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onApproveCampaign(campaign.id)}
                className="w-full mt-2"
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like This Recommendation
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
