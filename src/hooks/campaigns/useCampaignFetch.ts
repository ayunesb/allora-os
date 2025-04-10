
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCompanyInsights } from "../useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";

export interface Campaign {
  id: string;
  name: string;
  platform: "Google" | "LinkedIn" | "Facebook" | "Twitter" | "Email" | "Instagram";
  budget: number;
  description?: string;
  aiGenerated?: boolean;
  primaryBot?: any;
  collaborators?: any[];
}

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Product Launch",
    platform: "Google",
    budget: 5000
  },
  {
    id: "2",
    name: "Q3 Lead Generation",
    platform: "LinkedIn",
    budget: 3500
  }
];

export function useCampaignFetch() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { profile } = useAuth();
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      
      try {
        // In a production app, you would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get campaigns from AI insights
        const campaignInsights = insights.filter(insight => insight.type === "campaign" as InsightType);
        
        // Convert insights to campaign format
        const aiGeneratedCampaigns = campaignInsights.map((insight, index) => ({
          id: `ai-${insight.id}`,
          name: insight.title,
          platform: getRandomPlatform(index),
          budget: getRandomBudget(2500, 10000),
          description: insight.description,
          aiGenerated: true,
          primaryBot: insight.primaryBot,
          collaborators: insight.collaborators
        }));
        
        // Combine with mock campaigns
        setCampaigns([...aiGeneratedCampaigns, ...mockCampaigns]);
        setIsError(false);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setIsError(true);
        setError(err);
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
      // Simulate fetch
      setIsLoading(false);
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
function getRandomPlatform(index: number): Campaign["platform"] {
  const platforms: Campaign["platform"][] = ["Google", "LinkedIn", "Facebook", "Twitter", "Email", "Instagram"];
  return platforms[index % platforms.length];
}

// Helper function to get a random budget in a range
function getRandomBudget(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
