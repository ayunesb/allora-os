
import { useState, useEffect } from "react";
import { useCompanyInsights } from "../useCompanyInsights";
import { useAuth } from "@/context/AuthContext";
import { CallScript } from "./types";
import { getDefaultScripts } from "./scriptGenerators";
import { createAiGeneratedScripts, createExecutiveCollectiveScripts } from "./scriptFactory";

export function useCallScripts() {
  const [scripts, setScripts] = useState<CallScript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  const { profile } = useAuth();

  useEffect(() => {
    const loadScripts = async () => {
      setIsLoading(true);
      
      try {
        // Get default scripts
        const defaultScripts = getDefaultScripts();
        
        // Company info
        const companyName = profile?.company || "Your Company";
        const industry = profile?.industry || "Technology";
        const companySize = profile?.company_size || "Small";
        const riskAppetite = profile?.risk_appetite || "medium";
        
        // Create AI-generated scripts from insights
        const aiGeneratedScripts = createAiGeneratedScripts(
          insights, 
          companyName, 
          industry
        );
        
        // Create executive collective scripts
        const executiveScripts = createExecutiveCollectiveScripts(
          companyName,
          industry,
          companySize,
          riskAppetite
        );
        
        // Combine scripts
        setScripts([...aiGeneratedScripts, ...executiveScripts, ...defaultScripts]);
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
  
  const getExecutiveScripts = () => {
    return scripts.filter(script => script.executiveGenerated);
  };
  
  const getWhatsAppTemplates = () => {
    return getMessageScripts().filter(script => 
      script.executiveGenerated && 
      script.title.includes('WhatsApp')
    );
  };
  
  const getColdCallScripts = () => {
    return getCallScripts().filter(script => 
      script.executiveGenerated && 
      script.title.includes('Cold Call')
    );
  };
  
  return { 
    scripts, 
    callScripts: getCallScripts(),
    messageScripts: getMessageScripts(),
    executiveScripts: getExecutiveScripts(),
    whatsAppTemplates: getWhatsAppTemplates(),
    coldCallScripts: getColdCallScripts(),
    isLoading 
  };
}
