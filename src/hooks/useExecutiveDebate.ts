
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCompanyInsights } from './useCompanyInsights';
import { executiveBots } from '@/backend/executiveBots';
import { formatRoleTitle } from '@/utils/consultation';

export interface DebateMessage {
  id: string;
  executive: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: Date;
}

export interface DebateSummary {
  keyFindings: string[];
  agreedPoints: string[];
  disagreedPoints: string[];
  finalDecision: string;
}

export function useExecutiveDebate() {
  const { profile } = useAuth();
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  const [debateMessages, setDebateMessages] = useState<DebateMessage[]>([]);
  const [debateSummary, setDebateSummary] = useState<DebateSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (insightsLoading || !profile?.company) {
      return;
    }

    const generateDebate = async () => {
      setIsLoading(true);
      try {
        // In a production app, this would call an API to generate a realistic debate
        // For now, we'll simulate it with predefined content based on company info
        
        const companyName = profile.company;
        const industry = profile.industry || 'Technology';
        const goals = profile.goals || [];
        const riskAppetite = profile.risk_appetite || 'Medium';
        
        // Generate debate based on company parameters
        const { messages, summary } = generateSimulatedDebate(
          companyName, 
          industry, 
          goals, 
          riskAppetite,
          insights
        );
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setDebateMessages(messages);
        setDebateSummary(summary);
      } catch (error) {
        console.error('Error generating executive debate:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateDebate();
  }, [profile, insightsLoading, insights]);

  return {
    debateMessages,
    debateSummary,
    isLoading
  };
}

function generateSimulatedDebate(
  companyName: string,
  industry: string,
  goals: string[],
  riskAppetite: string,
  insights: any[]
): { messages: DebateMessage[], summary: DebateSummary } {
  // Select key executives for the debate
  const ceoBot = selectBot('ceo');
  const cfoBot = selectBot('cfo');
  const cmoBot = selectBot('cmo');
  const strategyBot = selectBot('strategy');
  const salesBot = selectBot('sales_business_development');
  const marketingBot = selectBot('marketing');
  
  // Set debate topic based on company goals
  const primaryGoal = goals.length > 0 ? goals[0] : 'growth';
  let debateTopic = '';
  
  if (primaryGoal === 'growth') {
    debateTopic = `optimizing ${companyName}'s growth strategy in the ${industry} sector`;
  } else if (primaryGoal === 'innovation') {
    debateTopic = `balancing innovation and stability for ${companyName}`;
  } else if (primaryGoal === 'revenue') {
    debateTopic = `maximizing revenue streams for ${companyName}`;
  } else {
    debateTopic = `${companyName}'s strategic direction in the ${industry} sector`;
  }
  
  // Generate debate messages
  const messages: DebateMessage[] = [];
  const now = new Date();
  
  // Opening statement from CEO
  messages.push({
    id: 'msg-1',
    executive: ceoBot,
    content: `I believe our strategy for ${companyName} should focus on ${
      riskAppetite === 'High' ? 'aggressive market disruption' : 
      riskAppetite === 'Low' ? 'sustainable, consistent growth' :
      'balanced innovation and market expansion'
    }. The ${industry} sector is ${
      riskAppetite === 'High' ? 'ripe for disruption' :
      riskAppetite === 'Low' ? 'experiencing consolidation' :
      'evolving rapidly'
    }, and we need to position ourselves accordingly.`,
    sentiment: 'positive',
    timestamp: new Date(now.getTime() - 15 * 60000)
  });
  
  // CFO response
  messages.push({
    id: 'msg-2',
    executive: cfoBot,
    content: `I agree with the overall direction, but we need to be mindful of our capital allocation. For a ${riskAppetite.toLowerCase()}-risk profile, I recommend we ${
      riskAppetite === 'High' ? 'allocate 70% to growth initiatives but maintain a 30% safety reserve' :
      riskAppetite === 'Low' ? 'take a measured approach with 60% in stable investments and only 40% in growth ventures' :
      'balance our investments equally between proven models and innovative approaches'
    }.`,
    sentiment: riskAppetite === 'Low' ? 'positive' : 'neutral',
    timestamp: new Date(now.getTime() - 14 * 60000)
  });
  
  // Strategy expert perspective
  messages.push({
    id: 'msg-3',
    executive: strategyBot,
    content: `The ${industry} landscape is showing ${
      industry === 'Technology' ? 'significant disruption from AI and blockchain' :
      industry === 'Healthcare' ? 'increasing consolidation and digital transformation' :
      industry === 'Finance' ? 'regulatory shifts and fintech competition' :
      'changing customer expectations and new competitive threats'
    }. ${companyName} should position itself as ${
      goals.includes('innovation') ? 'an innovation leader' :
      goals.includes('cost') ? 'a value leader' :
      'a customer experience differentiator'
    } in this environment.`,
    sentiment: 'positive',
    timestamp: new Date(now.getTime() - 13 * 60000)
  });
  
  // CMO perspective on marketing
  messages.push({
    id: 'msg-4',
    executive: cmoBot,
    content: `Our brand positioning needs to reflect our strategic direction. I propose we ${
      goals.includes('enterprise') ? 'emphasize enterprise credibility and ROI' :
      goals.includes('startup') ? 'highlight agility and cutting-edge capabilities' :
      'focus on our proven track record and industry expertise'
    } in our marketing campaigns. We should allocate resources to ${
      riskAppetite === 'High' ? 'emerging channels like TikTok and podcast sponsorships' :
      riskAppetite === 'Low' ? 'proven channels like Google Ads and LinkedIn' :
      'a mix of established and emerging channels'
    }.`,
    sentiment: 'positive',
    timestamp: new Date(now.getTime() - 12 * 60000)
  });
  
  // Sales perspective
  messages.push({
    id: 'msg-5',
    executive: salesBot,
    content: `From a sales perspective, we need to equip our team with messaging that resonates with ${industry} decision-makers. Our call scripts should focus on ${
      goals.includes('revenue') ? 'immediate ROI and revenue impact' :
      goals.includes('innovation') ? 'competitive advantages and future-proofing' :
      'solving specific pain points and operational efficiency'
    }. I see potential in targeting ${
      goals.includes('enterprise') ? 'enterprise accounts with a consultative approach' :
      goals.includes('startup') ? 'high-growth startups with a value-based approach' :
      'mid-market companies with a solution-based approach'
    }.`,
    sentiment: 'positive',
    timestamp: new Date(now.getTime() - 11 * 60000)
  });
  
  // Marketing specialist input
  messages.push({
    id: 'msg-6',
    executive: marketingBot,
    content: `Building on what's been said, I recommend we ${
      riskAppetite === 'High' ? 'create disruptive content that challenges industry norms' :
      riskAppetite === 'Low' ? 'focus on case studies and success stories that demonstrate reliability' :
      'blend thought leadership with practical insights'
    }. Our campaigns should emphasize ${
      goals.includes('growth') ? 'scalability and future growth potential' :
      goals.includes('cost') ? 'efficiency and cost savings' :
      'competitive differentiation and unique value'
    } to resonate with our target audience in the ${industry} sector.`,
    sentiment: 'positive',
    timestamp: new Date(now.getTime() - 10 * 60000)
  });
  
  // Debate summary
  const summary: DebateSummary = {
    keyFindings: [
      `${companyName} should adopt a ${riskAppetite.toLowerCase()}-risk approach to growth in the ${industry} sector`,
      `Marketing should focus on ${goals.includes('enterprise') ? 'enterprise credibility' : goals.includes('startup') ? 'agility and innovation' : 'proven expertise'} to align with company goals`,
      `Sales messaging should emphasize ${goals.includes('revenue') ? 'ROI and revenue impact' : goals.includes('innovation') ? 'competitive advantage' : 'operational efficiency'}`,
      `The strategy should balance ${riskAppetite === 'High' ? 'aggressive growth with prudent reserves' : riskAppetite === 'Low' ? 'stability with measured innovation' : 'innovation and established approaches'}`
    ],
    agreedPoints: [
      'A consistent brand message across all channels is essential',
      `${industry}-specific expertise should be highlighted in customer communications`,
      'Regular strategy reviews are needed to adapt to market changes'
    ],
    disagreedPoints: [
      `Resource allocation between proven channels and emerging platforms`,
      `Timeline for implementing new growth initiatives`,
      'Priority level for different customer segments'
    ],
    finalDecision: `The executive team has aligned on a ${riskAppetite.toLowerCase()}-risk strategy focusing on ${goals.join(', ')} in the ${industry} sector. ${companyName} will implement a multi-channel approach that balances ${riskAppetite === 'High' ? 'innovation with calculated risk management' : riskAppetite === 'Low' ? 'stability with gradual growth initiatives' : 'proven methods with strategic innovation'}. The marketing and sales approaches will be tailored to emphasize ${goals.includes('enterprise') ? 'enterprise value' : goals.includes('startup') ? 'agility and innovation' : 'expertise and reliability'} while maintaining financial discipline.`
  };
  
  return { messages, summary };
}

// Helper function to select a bot by role
function selectBot(role: string) {
  const botNames = executiveBots[role as keyof typeof executiveBots] || [];
  const botName = botNames[0] || 'AI Assistant';
  
  return {
    name: botName,
    role,
    avatar: `/avatars/${botName.toLowerCase().replace(/\s+/g, '-')}.png`
  };
}
