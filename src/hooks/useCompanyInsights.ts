
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { BotInsight, InsightType } from '@/components/bot-insights/BotInsightCard';
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation';

export function useCompanyInsights() {
  const { profile, user } = useAuth();
  const [insights, setInsights] = useState<BotInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only generate insights when we have a profile with company info
    if (!profile || !user?.id) {
      setIsLoading(false);
      return;
    }

    const generateInsights = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // In a production app, this would be an API call to fetch insights
        // based on company data. For now, we'll generate mock insights locally.
        
        // If a company name exists, generate insights based on it
        const hasCompanyInfo = Boolean(profile.company);
        
        if (!hasCompanyInfo) {
          setInsights([]);
          setIsLoading(false);
          return;
        }
        
        const companyName = profile.company || "Your Company";
        const industry = profile.industry || "Technology";
        
        // Generate insights with appropriate bots for each insight type
        const newInsights: BotInsight[] = generateCompanySpecificInsights(companyName, industry);
        
        // Wait for a brief moment to simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
        
        setInsights(newInsights);
      } catch (err: any) {
        console.error('Error generating insights:', err);
        setError(err.message || 'Failed to generate company insights');
        toast.error('Failed to generate insights');
      } finally {
        setIsLoading(false);
      }
    };

    generateInsights();
  }, [profile, user?.id]);

  return { insights, isLoading, error };
}

// Helper function to generate insights based on company data
function generateCompanySpecificInsights(companyName: string, industry: string): BotInsight[] {
  // Generate a unique ID based on company name to ensure consistency
  const generateId = (prefix: string) => `${prefix}-${companyName.toLowerCase().replace(/\s+/g, '-')}`;
  
  // Get the current date
  const now = new Date();
  
  // Select appropriate bots for each insight type
  const strategyBots = getBotsForRole('strategy', 'ceo', 'cmo');
  const campaignBots = getBotsForRole('marketing', 'sales_business_development', 'cmo');
  const callScriptBots = getBotsForRole('lead_qualification', 'sales_business_development', 'cold_calling');
  
  return [
    // Strategy insight
    {
      id: generateId('strategy'),
      title: `${industry} Market Expansion Strategy for ${companyName}`,
      description: `A comprehensive growth strategy tailored for ${companyName} in the ${industry} sector, focusing on market penetration and competitive positioning.`,
      type: 'strategy' as InsightType,
      primaryBot: strategyBots.primary,
      collaborators: strategyBots.collaborators,
      createdAt: new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 5)))
    },
    
    // Campaign insight
    {
      id: generateId('campaign'),
      title: `Q3 ${industry} Targeted LinkedIn Campaign`,
      description: `Proposal for a high-ROI LinkedIn campaign targeting decision-makers in the ${industry} space with personalized messaging and content strategy.`,
      type: 'campaign' as InsightType,
      primaryBot: campaignBots.primary,
      collaborators: campaignBots.collaborators,
      createdAt: new Date(now.setDate(now.getDate() - Math.floor(Math.random() * 3)))
    },
    
    // Call script insight
    {
      id: generateId('call_script'),
      title: `Enterprise Solution Pitch for ${industry} Clients`,
      description: `High-conversion call script designed to communicate ${companyName}'s value proposition to enterprise-level prospects in the ${industry} industry.`,
      type: 'call_script' as InsightType,
      primaryBot: callScriptBots.primary,
      collaborators: callScriptBots.collaborators,
      createdAt: new Date()
    }
  ];
}

// Helper function to get a bot from the executiveBots object
function getBotInfo(role: string, name: string) {
  return {
    name,
    role,
    avatar: `/avatars/${name.toLowerCase().replace(/\s+/g, '-')}.png`
  };
}

// Helper to get primary bot and collaborators for a specific insight type
function getBotsForRole(...roles: string[]) {
  // Select primary bot from first role
  const primaryRole = roles[0];
  const primaryBotName = executiveBots[primaryRole as keyof typeof executiveBots]?.[0] || 'AI Assistant';
  
  const primary = {
    name: primaryBotName,
    role: primaryRole,
    avatar: `/avatars/${primaryBotName.toLowerCase().replace(/\s+/g, '-')}.png`
  };
  
  // Create collaborators from other roles
  const collaborators = roles.slice(1).map(role => {
    const botNames = executiveBots[role as keyof typeof executiveBots] || [];
    const botName = botNames[0] || 'AI Assistant';
    
    const contributions = {
      strategy: 'Strategic analysis',
      ceo: 'Executive oversight',
      coo: 'Operational planning',
      cfo: 'Financial analysis',
      cmo: 'Marketing strategy',
      marketing: 'Marketing optimization',
      sales_business_development: 'Sales approach',
      lead_qualification: 'Lead qualification',
      cold_calling: 'Cold calling techniques'
    };
    
    return {
      name: botName,
      role,
      contribution: contributions[role as keyof typeof contributions] || 'Advisory support'
    };
  });
  
  return { primary, collaborators };
}
