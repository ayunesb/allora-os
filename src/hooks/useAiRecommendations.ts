
import { useState } from "react";
import { toast } from "sonner";
import { RiskAppetiteType, CompanyDetails } from "./useCompanyDetails";
import { executiveBots } from '@/backend/executiveBots';

export type RecommendationType = { 
  id: string;
  title: string; 
  description: string; 
  type: string;
  executiveBot: {
    name: string;
    role: string;
  };
  expectedImpact: number;
  timeframe: string;
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
    const industry = profile?.industry || "Technology";
    const companySize = companyDetails.companySize || "Small";
    
    // Get most active consultation topics if available
    const topTopics = analytics?.consultationAnalytics?.consultationsByTopic || {};
    const topTopicNames = Object.entries(topTopics)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .map(entry => entry[0]);
    
    // Helper function to get a random executive from a specific role
    const getRandomExecutive = (role: string) => {
      const executives = executiveBots[role as keyof typeof executiveBots] || [];
      const randomIndex = Math.floor(Math.random() * executives.length);
      return {
        name: executives[randomIndex] || "AI Assistant",
        role
      };
    };
    
    // Create data-driven recommendations with executive attribution
    const recommendations = [
      // Elon Musk - Innovation recommendation
      {
        id: "rec-innovation-" + Date.now(), // Add unique ID
        title: `${industry} Disruptive Innovation`,
        description: `Based on your ${riskAppetite} risk profile, I recommend exploring cutting-edge ${industry.toLowerCase()} innovations with a focused R&D budget to stay ahead of competition.`,
        type: "strategy",
        executiveBot: {
          name: "Elon Musk",
          role: "ceo"
        },
        expectedImpact: riskAppetite === 'high' ? 85 : riskAppetite === 'medium' ? 70 : 55,
        timeframe: "6-12 months"
      },
      
      // Warren Buffett - Financial recommendation
      {
        id: "rec-financial-" + Date.now(), // Add unique ID
        title: riskAppetite === 'low' ? "Cost Optimization Strategy" : "Strategic Investment Plan",
        description: riskAppetite === 'low' 
          ? `I've identified key areas where we can optimize costs without sacrificing quality, potentially improving margins by 15-20%.` 
          : `I recommend allocating capital to these high-potential growth areas while maintaining sufficient operational reserves.`,
        type: "strategy",
        executiveBot: {
          name: "Warren Buffett",
          role: "cfo"
        },
        expectedImpact: riskAppetite === 'high' ? 75 : riskAppetite === 'medium' ? 65 : 80,
        timeframe: "3-6 months"
      },
      
      // Marketing recommendation
      {
        id: "rec-marketing-" + Date.now(), // Add unique ID
        title: topTopicNames[0] ? `${topTopicNames[0]} Campaign` : "Targeted LinkedIn Campaign",
        description: topTopicNames[0] 
          ? `Your team has been focused on ${topTopicNames[0]}. I've drafted a comprehensive campaign to maximize results in this area.` 
          : `I've drafted a ${companySize.toLowerCase()}-business optimized campaign targeting decision-makers in your industry.`,
        type: "campaign",
        executiveBot: getRandomExecutive('marketing'),
        expectedImpact: 72,
        timeframe: "1-3 months"
      },
      
      // Sales recommendation
      {
        id: "rec-sales-" + Date.now(), // Add unique ID
        title: "Optimized Sales Script",
        description: `I've analyzed successful conversions in the ${industry} sector and created a sales script that addresses the top 3 objections prospects typically raise.`,
        type: "call",
        executiveBot: getRandomExecutive('sales_business_development'),
        expectedImpact: 68,
        timeframe: "Immediate"
      },
      
      // Satya Nadella - Digital transformation recommendation
      {
        id: "rec-digital-" + Date.now(), // Add unique ID
        title: "Digital Workflow Optimization",
        description: `Implementing these digital workflow improvements could increase team productivity by up to 30% while reducing operational friction.`,
        type: "strategy",
        executiveBot: {
          name: "Satya Nadella",
          role: "cio"
        },
        expectedImpact: 77,
        timeframe: "2-4 months"
      }
    ];
    
    // Filter recommendations based on risk appetite
    let filteredRecommendations = recommendations;
    if (riskAppetite === 'low') {
      // Filter for more conservative recommendations
      filteredRecommendations = recommendations.filter(rec => 
        rec.type !== 'high-risk' && rec.expectedImpact < 80
      );
    } else if (riskAppetite === 'high') {
      // Prioritize high-impact recommendations
      filteredRecommendations.sort((a, b) => b.expectedImpact - a.expectedImpact);
    }
    
    // Take top 4 recommendations
    setAiRecommendations(filteredRecommendations.slice(0, 4));
    return filteredRecommendations.slice(0, 4);
  };
  
  // Remove a recommendation from the list
  const removeRecommendation = (index: number) => {
    setAiRecommendations(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  return {
    aiRecommendations,
    generateAiRecommendations,
    removeRecommendation
  };
}
