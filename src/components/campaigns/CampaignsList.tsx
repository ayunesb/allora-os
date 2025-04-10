
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, PlusCircle, Lightbulb } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatRoleTitle } from "@/utils/consultation";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  budget: number;
  description?: string;
  aiGenerated?: boolean;
  primaryBot?: any;
  collaborators?: any[];
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
  const { insights, isLoading: insightsLoading, getDetailedInsight } = useCompanyInsights();
  const campaignInsights = insights.filter(insight => insight.type === "campaign" as InsightType);
  
  // Extract AI-generated campaigns
  const aiCampaigns = campaigns.filter(campaign => campaign.aiGenerated);
  const regularCampaigns = campaigns.filter(campaign => !campaign.aiGenerated);
  
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
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
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
      <Card className="text-center p-6 mb-6">
        <div className="mb-4">
          <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground" />
        </div>
        <CardTitle className="mb-2">No Campaigns Yet</CardTitle>
        <CardDescription className="mb-4">
          Create your first marketing campaign to reach your target audience
        </CardDescription>
        <Button onClick={onCreateCampaign}>Create New Campaign</Button>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* AI-Generated Campaigns */}
      {aiCampaigns.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">AI-Generated Campaign Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiCampaigns.map((campaign) => {
              const detailedInsight = campaign.description && getDetailedInsight(`campaign-${campaign.name.toLowerCase().replace(/\s+/g, '-')}`);
              
              return (
                <Card key={campaign.id} className="border-amber-200/50 hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
                        <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
                        AI Recommended
                      </Badge>
                      <Badge>{campaign.platform}</Badge>
                    </div>
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    
                    {campaign.primaryBot && (
                      <div className="flex items-center mt-1">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage 
                            src={campaign.primaryBot.avatar} 
                            alt={campaign.primaryBot.name} 
                          />
                          <AvatarFallback>{campaign.primaryBot.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <span>{campaign.primaryBot.name}</span>
                          <span className="text-muted-foreground ml-1 text-xs">
                            ({formatRoleTitle(campaign.primaryBot.role)})
                          </span>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  
                  <CardContent>
                    {detailedInsight?.keyPoints ? (
                      <div className="text-sm text-muted-foreground">
                        <ul className="list-disc pl-4 space-y-0.5">
                          {detailedInsight.keyPoints.slice(0, 2).map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {campaign.description || `A targeted ${campaign.platform} campaign with a budget of $${campaign.budget.toLocaleString()}.`}
                      </p>
                    )}
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Budget:</span>
                      <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-1">
                    <div className="w-full flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => handleEditCampaign(campaign.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1" 
                        onClick={() => deleteCampaign(campaign.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Regular Campaigns */}
      {regularCampaigns.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Marketing Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{campaign.name}</CardTitle>
                    <Badge>{campaign.platform}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {campaign.description || `A ${campaign.platform} marketing campaign.`}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Budget:</span>
                      <span className="font-medium">${campaign.budget.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <div className="w-full flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => handleEditCampaign(campaign.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => deleteCampaign(campaign.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      <div className="text-center py-4">
        <Button onClick={onCreateCampaign} className="w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Campaign
        </Button>
      </div>
    </div>
  );
}
