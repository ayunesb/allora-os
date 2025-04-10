
import { useState, useEffect } from "react";
import { useCompanyInsights } from "./useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";

export interface CallScript {
  id: string;
  title: string;
  target: string;
  duration: string;
  status: "Ready" | "In Progress";
  content?: string;
}

export function useCallScripts() {
  const [scripts, setScripts] = useState<CallScript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { insights, isLoading: insightsLoading } = useCompanyInsights();

  useEffect(() => {
    const loadScripts = async () => {
      setIsLoading(true);
      
      try {
        // Start with default scripts
        const defaultScripts: CallScript[] = [
          {
            id: "script-1",
            title: "B2B SaaS Introduction",
            target: "Tech Startups",
            duration: "2-3 min",
            status: "Ready"
          },
          {
            id: "script-2",
            title: "Follow-up Script",
            target: "Previous Contacts",
            duration: "1-2 min",
            status: "Ready"
          }
        ];
        
        // Add AI-generated scripts from insights
        const callScriptInsights = insights.filter(insight => insight.type === "call_script" as InsightType);
        
        const aiGeneratedScripts = callScriptInsights.map(insight => ({
          id: insight.id,
          title: insight.title,
          target: `${insight.primaryBot.name}'s Recommendations`,
          duration: "4-5 min",
          status: "Ready" as const,
          content: insight.description,
          aiGenerated: true,
          primaryBot: insight.primaryBot,
          collaborators: insight.collaborators
        }));
        
        // Combine scripts
        setScripts([...aiGeneratedScripts, ...defaultScripts]);
      } catch (error) {
        console.error("Error loading call scripts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!insightsLoading) {
      loadScripts();
    }
  }, [insights, insightsLoading]);
  
  return { scripts, isLoading };
}
