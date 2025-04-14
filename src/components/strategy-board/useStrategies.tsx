
import { useState, useEffect, useTransition } from "react";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";
import { useAuth } from "@/context/AuthContext";
import { Strategy } from "@/models/strategy";

export function useStrategies() {
  const [isPending, startTransition] = useTransition();
  const [strategies, setStrategies] = useState<Strategy[]>([
    { 
      id: '1',
      title: "Expand to New Markets", 
      description: "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
      risk: "Medium",
      risk_level: "Medium",
      company_id: "demo-company-id",
      created_at: new Date().toISOString()
    },
    { 
      id: '2',
      title: "AI Automation", 
      description: "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
      risk: "Low",
      risk_level: "Low",
      company_id: "demo-company-id",
      created_at: new Date().toISOString()
    },
    { 
      id: '3',
      title: "Disruptive Product Launch", 
      description: "Develop revolutionary product to disrupt industry standards and gain competitive advantage.",
      risk: "High",
      risk_level: "High",
      company_id: "demo-company-id",
      created_at: new Date().toISOString()
    },
    { 
      id: '4',
      title: "Digital Transformation", 
      description: "Overhaul legacy systems and processes with digital technologies to improve customer experience.",
      risk: "Medium",
      risk_level: "Medium",
      company_id: "demo-company-id",
      created_at: new Date().toISOString()
    },
    { 
      id: '5',
      title: "Strategic Partnerships", 
      description: "Form alliances with complementary businesses to expand offerings and reach new customer segments.",
      risk: "Low",
      risk_level: "Low",
      company_id: "demo-company-id",
      created_at: new Date().toISOString()
    },
    { 
      id: '6',
      title: "Venture Capital Funding", 
      description: "Secure Series B funding to accelerate growth initiatives and expand team capacity.",
      risk: "High",
      risk_level: "High",
      company_id: "demo-company-id",
      created_at: new Date().toISOString()
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  const { profile } = useAuth();
  
  useEffect(() => {
    const fetchStrategies = async () => {
      if (!profile?.company_id) {
        // Don't attempt to fetch without a company ID
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real implementation, you would fetch from Supabase here
        // For now we'll use demo data and AI-generated strategies
        
        // Get strategy insights from AI
        const strategyInsights = insights.filter(insight => insight.type === "strategy" as InsightType);
        
        // Convert insights to strategy format
        const aiGeneratedStrategies: Strategy[] = strategyInsights.map(insight => {
          // Ensure riskLevel is one of the valid values
          let riskLevel: "Low" | "Medium" | "High" = "Medium";
          
          // Extract risk level from description if possible
          if (insight.description.includes("high-risk") || insight.description.includes("High risk")) {
            riskLevel = "High";
          } else if (insight.description.includes("low-risk") || insight.description.includes("Low risk")) {
            riskLevel = "Low";
          }
          
          return {
            id: `ai-${insight.id}`,
            title: insight.title,
            description: insight.description,
            risk: riskLevel,
            risk_level: riskLevel,
            company_id: profile.company_id || "demo-company-id",
            created_at: insight.createdAt.toISOString(),
            executiveBot: insight.primaryBot,
          };
        });
        
        // Combine AI strategies with existing ones
        startTransition(() => {
          setStrategies(prev => {
            const existingIds = new Set(prev.map(s => s.id));
            const newAiStrategies = aiGeneratedStrategies.filter(s => !existingIds.has(s.id));
            
            // Set company_id for all strategies
            const updatedPrevStrategies = prev.map(s => ({
              ...s,
              company_id: s.company_id || profile.company_id || "demo-company-id"
            }));
            
            return [...newAiStrategies, ...updatedPrevStrategies];
          });
        });
      } catch (err: any) {
        console.error("Error fetching strategies:", err);
        setError(new Error(err.message || "Failed to load strategies"));
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!insightsLoading) {
      fetchStrategies();
    }
  }, [insights, insightsLoading, profile?.company_id, startTransition]);
  
  const refetch = () => {
    // This would normally fetch data from the API
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      startTransition(() => {
        setIsLoading(false);
        setError(null); // Clear any previous errors
      });
    }, 800);
  };

  return { 
    strategies, 
    isLoading: isLoading || isPending, 
    error, 
    refetch 
  };
}
