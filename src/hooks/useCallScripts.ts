
import { useState, useEffect } from "react";
import { useCompanyInsights } from "./useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";
import { useAuth } from "@/context/AuthContext";

export interface CallScript {
  id: string;
  title: string;
  target: string;
  duration: string;
  status: "Ready" | "In Progress";
  content?: string;
  type?: 'call' | 'message';
  aiGenerated?: boolean;
  primaryBot?: any;
  collaborators?: any[];
}

export function useCallScripts() {
  const [scripts, setScripts] = useState<CallScript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  const { profile } = useAuth();

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
            status: "Ready",
            type: 'call'
          },
          {
            id: "script-2",
            title: "Follow-up Script",
            target: "Previous Contacts",
            duration: "1-2 min",
            status: "Ready",
            type: 'message'
          }
        ];
        
        const companyName = profile?.company || "Your Company";
        const industry = profile?.industry || "Technology";
        
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
          collaborators: insight.collaborators,
          type: 'call' as const
        }));
        
        // Generate complementary message scripts
        const messageScripts: CallScript[] = aiGeneratedScripts.map(script => ({
          id: `${script.id}-message`,
          title: `Follow-up for: ${script.title}`,
          target: script.target,
          duration: "1-2 min",
          status: "Ready",
          content: `Follow-up message template for ${script.title}, targeting ${industry} prospects.`,
          aiGenerated: true,
          primaryBot: script.primaryBot,
          collaborators: script.collaborators,
          type: 'message' as const
        }));
        
        // Combine scripts
        setScripts([...aiGeneratedScripts, ...messageScripts, ...defaultScripts]);
      } catch (error) {
        console.error("Error loading call scripts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!insightsLoading) {
      loadScripts();
    }
  }, [insights, insightsLoading, profile]);
  
  const getCallScripts = () => {
    return scripts.filter(script => script.type === 'call');
  };
  
  const getMessageScripts = () => {
    return scripts.filter(script => script.type === 'message');
  };
  
  return { 
    scripts, 
    callScripts: getCallScripts(),
    messageScripts: getMessageScripts(),
    isLoading 
  };
}
