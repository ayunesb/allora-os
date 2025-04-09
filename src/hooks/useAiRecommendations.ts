
import { useState } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { RiskAppetiteType, CompanyDetails } from "./useCompanyDetails";

export type RecommendationType = { 
  title: string; 
  description: string; 
  type: string 
};

export function useAiRecommendations(
  companyDetails: CompanyDetails,
  analytics: any,
  profile: any,
  riskAppetite: RiskAppetiteType
) {
  const [aiRecommendations, setAiRecommendations] = useState<RecommendationType[]>([]);

  // Generate AI recommendations based on company profile and analytics
  const generateAiRecommendations = () => {
    // In a real app, this would be more sophisticated and personalized
    // based on the analytics and company profile data
    const industry = profile?.industry || "Technology";
    const companySize = companyDetails.companySize || "Small";
    
    // Get most active consultation topics if available
    const topTopics = analytics?.consultationAnalytics?.consultationsByTopic || {};
    const topTopicNames = Object.entries(topTopics)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(entry => entry[0]);
    
    // Get most used bots if available
    const popularBots = analytics?.consultationAnalytics?.consultationsByBot || {};
    const topBotNames = Object.entries(popularBots)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(entry => entry[0]);
    
    // Create data-driven recommendations
    const recommendations = [
      {
        title: `${industry} Market Expansion`,
        description: `Based on your ${riskAppetite} risk profile, I recommend exploring new ${industry.toLowerCase()} market segments with a phased approach.`,
        type: "strategy"
      },
      {
        title: topTopicNames[0] ? `${topTopicNames[0]} Deep Dive` : "Strategic Planning Session",
        description: topTopicNames[0] 
          ? `Your team has been focused on ${topTopicNames[0]}. Let's explore advanced strategies in this area.` 
          : "Schedule a comprehensive planning session with your executive team to align on goals.",
        type: "meeting"
      },
      {
        title: "Targeted LinkedIn Campaign",
        description: `I've drafted a ${companySize.toLowerCase()}-business optimized campaign targeting decision-makers in your industry.`,
        type: "campaign"
      },
      {
        title: topBotNames[0] ? `Chat with ${topBotNames[0]}` : "Executive Consultation",
        description: topBotNames[0]
          ? `${topBotNames[0]} has insights that could help with your current challenges.`
          : "Schedule a one-on-one consultation with an AI executive matched to your needs.",
        type: "call"
      }
    ];
    
    setAiRecommendations(recommendations);
    return recommendations;
  };

  const handleApproveRecommendation = async (index: number) => {
    try {
      // Save the recommendation to the database
      if (profile?.company_id) {
        const recommendation = aiRecommendations[index];
        
        // Add to strategies table if it's a strategy recommendation
        if (recommendation.type === "strategy") {
          const { error } = await supabase.from('strategies').insert({
            company_id: profile.company_id,
            title: recommendation.title,
            description: recommendation.description,
            risk_level: riskAppetite
          });
          
          if (error) throw error;
        }
        
        // Add to user_actions table to track this action
        await supabase.rpc('insert_user_action', {
          p_user_id: profile.id,
          p_action: 'approve_recommendation',
          p_category: 'recommendation',
          p_entity_id: `recommendation_${index}`,
          p_entity_type: recommendation.type,
          p_metadata: JSON.stringify({
            title: recommendation.title,
            type: recommendation.type
          }),
          p_timestamp: new Date().toISOString()
        });
      }
      
      toast.success("Recommendation approved and added to your workspace");
      
      // Remove the approved recommendation
      setAiRecommendations(prev => {
        const updated = [...prev];
        updated.splice(index, 1);
        return updated;
      });
    } catch (error: any) {
      console.error("Error approving recommendation:", error);
      toast.error("Failed to process recommendation");
    }
  };

  return {
    aiRecommendations,
    generateAiRecommendations,
    handleApproveRecommendation
  };
}
