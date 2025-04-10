
import { useState, useEffect } from "react";
import { useCompanyInsights } from "@/hooks/useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";

export interface Strategy {
  id: string;
  title: string;
  description: string;
  risk: string;
  risk_level?: string;
  created_at: string;
  aiGenerated?: boolean;
  primaryBot?: any;
  collaborators?: any[];
}

export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([
    { 
      id: '1',
      title: "Expand to New Markets", 
      description: "Analyze emerging markets and expand operations to increase geographical footprint and customer base.",
      risk: "Medium",
      risk_level: "Medium",
      created_at: new Date().toISOString()
    },
    { 
      id: '2',
      title: "AI Automation", 
      description: "Implement AI-driven automation in workflows to increase efficiency and reduce operational costs.",
      risk: "Low",
      risk_level: "Low",
      created_at: new Date().toISOString()
    },
    { 
      id: '3',
      title: "Disruptive Product Launch", 
      description: "Develop revolutionary product to disrupt industry standards and gain competitive advantage.",
      risk: "High",
      risk_level: "High",
      created_at: new Date().toISOString()
    },
    { 
      id: '4',
      title: "Digital Transformation", 
      description: "Overhaul legacy systems and processes with digital technologies to improve customer experience.",
      risk: "Medium",
      risk_level: "Medium",
      created_at: new Date().toISOString()
    },
    { 
      id: '5',
      title: "Strategic Partnerships", 
      description: "Form alliances with complementary businesses to expand offerings and reach new customer segments.",
      risk: "Low",
      risk_level: "Low",
      created_at: new Date().toISOString()
    },
    { 
      id: '6',
      title: "Venture Capital Funding", 
      description: "Secure Series B funding to accelerate growth initiatives and expand team capacity.",
      risk: "High",
      risk_level: "High",
      created_at: new Date().toISOString()
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  
  useEffect(() => {
    const fetchStrategies = async () => {
      setIsLoading(true);
      
      try {
        // Get strategy insights from AI
        const strategyInsights = insights.filter(insight => insight.type === "strategy" as InsightType);
        
        // Convert insights to strategy format
        const aiGeneratedStrategies = strategyInsights.map(insight => {
          let riskLevel = "Medium";
          
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
            created_at: insight.createdAt.toISOString(),
            aiGenerated: true,
            primaryBot: insight.primaryBot,
            collaborators: insight.collaborators
          };
        });
        
        // Combine AI strategies with existing ones
        setStrategies(prev => {
          const existingIds = new Set(prev.map(s => s.id));
          const newAiStrategies = aiGeneratedStrategies.filter(s => !existingIds.has(s.id));
          return [...newAiStrategies, ...prev];
        });
      } catch (err: any) {
        console.error("Error fetching strategies:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!insightsLoading) {
      fetchStrategies();
    }
  }, [insights, insightsLoading]);
  
  const refetch = () => {
    // This would normally fetch data from the API
    setIsLoading(true);
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return { strategies, isLoading, error, refetch };
}
