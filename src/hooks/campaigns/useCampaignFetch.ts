import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCompanyInsights } from "../useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";
import { Campaign, Platform } from "@/models/campaign";
import { fetchCompanyCampaigns } from "@/utils/campaignHelpers";
import { toast } from "sonner";

export function useCampaignFetch() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { profile } = useAuth();
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!profile?.company_id) return;
      
      setIsLoading(true);
      
      try {
        // Fetch campaigns from Supabase
        const campaignsData = await fetchCompanyCampaigns(profile.company_id);
        
        // Process campaigns before setting them
        const processedCampaigns = campaignsData.map(campaign => {
          // Generate some random metrics for demo purposes
          const clicks = Math.floor((campaign.budget || 1000) * 0.5 * (Math.random() + 0.5));
          const impressions = clicks * (Math.floor(Math.random() * 20) + 10);
          
          return {
            ...campaign,
            // Add some mock metrics
            impressions,
            clicks,
            leads: Math.floor(clicks * (Math.random() * 0.1 + 0.01)),
            // Add a random executive bot if one doesn't exist
            executiveBot: campaign.executiveBot || getRandomExecutive(),
            // Add a justification if one doesn't exist
            justification: campaign.justification || getRandomJustification(campaign),
            // Add a status if one doesn't exist
            status: campaign.status || getRandomStatus(),
          } as Campaign;
        });
        
        // Get campaigns from AI insights to augment the Supabase data
        const campaignInsights = insights.filter(insight => insight.type === "campaign" as InsightType);
        
        // Convert insights to campaign format
        const aiGeneratedCampaigns = campaignInsights.map((insight, index) => {
          const platform = getRandomPlatform(index);
          const executiveBot = insight.primaryBot || getRandomExecutive();
          
          return {
            id: `ai-${insight.id}`,
            name: insight.title,
            platform,
            budget: getRandomBudget(2500, 10000),
            description: insight.description,
            aiGenerated: true,
            executiveBot,
            collaborators: insight.collaborators,
            justification: insight.description,
            status: "Draft" as const,
            healthScore: "good" as const,
          } as Campaign;
        });
        
        // Combine all sources
        setCampaigns([...processedCampaigns, ...aiGeneratedCampaigns]);
        setIsError(false);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        toast.error("Failed to load campaigns");
        setIsError(true);
        setError(err);
        
        // Set mock campaigns for demo purposes
        setCampaigns(getMockCampaigns());
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!insightsLoading) {
      fetchCampaigns();
    }
  }, [profile?.company_id, insights, insightsLoading]);
  
  const refetch = () => {
    // Re-fetch campaigns
    setIsLoading(true);
    setTimeout(() => {
      // For the demo, just refresh the page
      window.location.reload();
    }, 500);
  };
  
  return {
    campaigns,
    isLoading,
    isError,
    error,
    refetch,
    companyId: profile?.company_id
  };
}

// Helper function to get a random platform
function getRandomPlatform(index: number): Platform {
  const platforms: Platform[] = ["Google", "LinkedIn", "Facebook", "Instagram", "TikTok", "Email", "Twitter"];
  return platforms[index % platforms.length];
}

// Helper function to get a random budget in a range
function getRandomBudget(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to get a random executive
function getRandomExecutive(): string {
  const executives = [
    "Elon Musk", "Jeff Bezos", "Satya Nadella", "Tim Cook", 
    "Sheryl Sandberg", "Brian Chesky", "Marc Benioff", "Seth Godin"
  ];
  return executives[Math.floor(Math.random() * executives.length)];
}

// Helper function to get a random campaign justification
function getRandomJustification(campaign: Campaign): string {
  const justifications = [
    `This ${campaign.platform} campaign targets your ideal customers with precision.`,
    `Based on your industry trends, this ${campaign.platform} campaign will maximize ROI.`,
    `Our analysis shows this ${campaign.platform} strategy will outperform competitors.`,
    `This ${campaign.platform} approach aligns perfectly with your Q3 growth objectives.`
  ];
  return justifications[Math.floor(Math.random() * justifications.length)];
}

// Helper function to get a random status
function getRandomStatus(): Campaign["status"] {
  const statuses: Campaign["status"][] = ["Draft", "Active", "Paused", "Completed"];
  const weights = [0.2, 0.5, 0.2, 0.1]; // 50% chance of Active
  
  const random = Math.random();
  let cumulativeWeight = 0;
  
  for (let i = 0; i < statuses.length; i++) {
    cumulativeWeight += weights[i];
    if (random < cumulativeWeight) {
      return statuses[i];
    }
  }
  
  return "Active";
}

// Helper function to get mock campaigns when the API fails
function getMockCampaigns(): Campaign[] {
  return [
    {
      id: "1",
      name: "Summer Product Launch",
      platform: "Google",
      budget: 5000,
      status: "Active",
      executiveBot: "Jeff Bezos",
      justification: "This campaign targets high-intent customers searching for your products. The ad copy focuses on your unique value proposition.",
      roi: "Expected ROI: 320%",
      healthScore: "good"
    },
    {
      id: "2",
      name: "Brand Awareness Campaign",
      platform: "Facebook",
      budget: 3000,
      status: "Active",
      executiveBot: "Sheryl Sandberg",
      justification: "Facebook's targeting capabilities allow us to reach new audiences that match your ideal customer profile.",
      roi: "Expected ROI: 180%",
      healthScore: "warning"
    },
    {
      id: "3",
      name: "Professional Lead Gen",
      platform: "LinkedIn",
      budget: 4500,
      status: "Paused",
      executiveBot: "Satya Nadella",
      justification: "LinkedIn offers the best B2B targeting options for your industry. Recommend increasing budget for better results.",
      roi: "Expected ROI: 220%",
      healthScore: "critical"
    },
    {
      id: "4",
      name: "Email Nurture Sequence",
      platform: "Email",
      budget: 1200,
      status: "Draft",
      executiveBot: "Seth Godin",
      justification: "Email marketing offers the highest ROI of all channels. This nurture sequence will convert your existing leads.",
      roi: "Expected ROI: 450%",
      healthScore: "good"
    }
  ];
}
