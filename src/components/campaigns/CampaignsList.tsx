
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  budget: number;
}

interface CampaignsListProps {
  campaigns: Campaign[];
  isLoading: boolean;
  handleEditCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  onCreateCampaign: () => void;
}

export default function CampaignsList({ 
  campaigns, 
  isLoading, 
  handleEditCampaign, 
  deleteCampaign,
  onCreateCampaign 
}: CampaignsListProps) {
  // Get AI-generated campaign insights
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  const campaignInsights = insights.filter(insight => insight.type === "campaign" as InsightType);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-[220px]">
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-3/4 mb-1" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (campaigns.length === 0 && campaignInsights.length === 0) {
    return (
      <Card className="text-center py-16">
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <PlusCircle className="h-12 w-12 text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">No campaigns yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Create your first campaign to start tracking your marketing efforts.
              </p>
            </div>
            <Button onClick={onCreateCampaign}>
              Create Campaign
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* User Created Campaigns */}
      {campaigns.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{campaign.name}</CardTitle>
                  <CardDescription>Platform: {campaign.platform}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><span className="font-medium">Budget:</span> ${campaign.budget}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditCampaign(campaign.id)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteCampaign(campaign.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* AI Recommended Campaigns */}
      {campaignInsights.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="text-amber-500 h-5 w-5" />
            <h3 className="text-xl font-semibold">AI Campaign Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaignInsights.map((insight) => (
              <Card key={insight.id} className="border-amber-200/50">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                      AI Recommendation
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{insight.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1 text-xs">
                    Recommended by: {insight.primaryBot.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    size="sm"
                    onClick={onCreateCampaign}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create from Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
