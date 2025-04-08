
import { executiveBots } from './executiveBots';
import { formatRoleTitle, getBotExpertise } from '@/utils/consultation';
import { supabase } from './supabase';
import { DebateSession, DebateParticipant, DebateMessage, DebateTopic } from '@/utils/consultation/types';
import { toast } from 'sonner';

// Predefined debate topics
export const debateTopics: DebateTopic[] = [
  { 
    id: 'growth-strategy', 
    topic: 'Growth Strategy', 
    description: 'Debate various approaches to company growth in the current market conditions.' 
  },
  { 
    id: 'market-expansion', 
    topic: 'Market Expansion', 
    description: 'Evaluate different markets and regions for potential business expansion.' 
  },
  { 
    id: 'product-development', 
    topic: 'Product Development', 
    description: 'Discuss priorities for new product features and improvements.' 
  },
  { 
    id: 'cost-reduction', 
    topic: 'Cost Reduction', 
    description: 'Analyze areas where operational costs can be reduced without impacting quality.' 
  },
  { 
    id: 'talent-acquisition', 
    topic: 'Talent Acquisition', 
    description: 'Debate strategies for recruiting and retaining top talent in a competitive market.' 
  },
  { 
    id: 'digital-transformation', 
    topic: 'Digital Transformation', 
    description: 'Discuss approaches to implementing digital technologies to transform business operations and services.' 
  },
  { 
    id: 'sustainability', 
    topic: 'Sustainability Initiatives', 
    description: 'Debate environmental and social responsibility strategies for long-term business sustainability.' 
  },
];

// Initialize debate participants from executive bots
export const getInitialParticipants = (count: number = 4): DebateParticipant[] => {
  return Object.entries(executiveBots)
    .slice(0, count) // Start with top roles
    .map(([role, names], index) => ({
      id: `bot-${index + 1}`,
      name: names[0], // Take first name from each role
      role,
      title: formatRoleTitle(role),
      specialty: getBotExpertise(role),
      avatar: `/avatars/${names[0].toLowerCase().replace(/\s+/g, '-')}.png`
    }));
};

// Generate a debate response for a specific bot based on topic
export const generateBotResponse = (
  bot: DebateParticipant, 
  topic: string, 
  context: string = ''
): string => {
  // This would integrate with an AI service in a real implementation
  // For now, return a role-specific mock response
  
  // Get responses for this bot role, fallback to strategy if not found
  const botResponses = {
    ceo: [
      `As CEO, I believe our approach to ${topic} must align with our long-term strategic vision. We should consider both immediate market opportunities and our five-year growth trajectory.`,
      `From the CEO perspective, ${topic} requires a balanced approach between shareholder value and sustainable growth. I recommend we focus on high-ROI initiatives first.`
    ],
    cfo: [
      `Looking at ${topic} from a financial lens, we must prioritize initiatives with clear ROI. Our capital allocation strategy should focus on projects with the highest return potential.`,
      `The financial implications of ${topic} cannot be overlooked. We should establish clear metrics to measure success and ensure positive impact on our bottom line.`
    ],
    coo: [
      `From an operational standpoint, implementing ${topic} will require careful resource allocation and process optimization. We need to ensure seamless execution.`,
      `Operations will be significantly impacted by our ${topic} approach. We should focus on minimizing disruption while maximizing efficiency gains.`
    ],
    cmo: [
      `${topic} presents a unique opportunity to strengthen our brand positioning. We should leverage customer insights to ensure our approach resonates with our target audience.`,
      `The marketing perspective on ${topic} centers on customer perception and competitive differentiation. Let's ensure our approach enhances our value proposition.`
    ],
    cio: [
      `Technology will be a critical enabler for ${topic}. We should evaluate our current infrastructure and identify investments needed to support this initiative.`,
      `From an IT standpoint, ${topic} requires careful consideration of our technical capabilities and potential integration challenges.`
    ],
    chro: [
      `The human capital implications of ${topic} are significant. We need to consider talent requirements, organizational structure, and change management.`,
      `From an HR perspective, ${topic} will impact our workforce planning and talent development strategies. Employee engagement will be critical to success.`
    ],
    strategy: [
      `Strategically, ${topic} should be evaluated in the context of changing market dynamics and competitive landscape. We need a flexible approach that can adapt to emerging trends.`,
      `Looking at ${topic} through a strategic lens, we should balance short-term wins with long-term positioning. This requires a phased implementation approach.`
    ]
  };
  
  const roleResponses = botResponses[bot.role as keyof typeof botResponses] || botResponses.strategy;
  const randomIndex = Math.floor(Math.random() * roleResponses.length);
  
  return roleResponses[randomIndex];
};

// Save a debate session to the database (mock implementation)
export const saveDebateSession = async (
  session: Omit<DebateSession, 'id' | 'created_at'>
): Promise<string | null> => {
  try {
    // In a real implementation, this would save to the Supabase database
    console.log('Would save debate session:', session);
    
    // For now, just return a mock ID
    const sessionId = `debate-${Date.now()}`;
    toast.success('Debate session saved successfully');
    
    return sessionId;
  } catch (error: any) {
    console.error('Error saving debate session:', error.message);
    toast.error(`Failed to save debate: ${error.message}`);
    return null;
  }
};

// Generate an AI summary of a debate (mock implementation)
export const generateDebateSummary = async (
  debateTitle: string,
  messages: DebateMessage[]
): Promise<{
  key_insights: string[];
  recommendations: string[];
  next_steps: string[];
}> => {
  // In a real implementation, this would use an AI service to analyze the debate
  // For now, return mock data
  return {
    key_insights: [
      "Focus on aligning strategy with long-term vision and mission",
      "Prioritize initiatives with clear ROI and metrics for success",
      "Balance short-term wins with long-term positioning",
      "Consider customer insights and market trends in decision-making"
    ],
    recommendations: [
      "Develop a comprehensive roadmap with phased implementation",
      "Establish clear metrics to measure success and ROI",
      "Create cross-functional teams to ensure holistic implementation",
      "Regularly review and adjust based on market feedback"
    ],
    next_steps: [
      "Schedule follow-up meeting to assign responsibilities",
      "Prepare detailed implementation plan with timelines",
      "Develop communication strategy for stakeholders",
      "Set up regular review cycles to track progress"
    ]
  };
};

// Export a function to get debate sessions for a company (mock implementation)
export const getCompanyDebateSessions = async (companyId: string): Promise<DebateSession[]> => {
  try {
    // In a real implementation, this would fetch from the Supabase database
    // For now, return mock data
    return [
      {
        id: 'debate-1',
        title: 'Growth Strategy Discussion',
        objective: 'Evaluate and decide on the best approach for growth strategy',
        topic: debateTopics[0],
        participants: getInitialParticipants(4),
        messages: [
          {
            id: 'msg-1',
            sender: 'System',
            senderId: 'system',
            content: 'Debate started: Growth Strategy Discussion',
            timestamp: new Date(Date.now() - 86400000) // 1 day ago
          }
        ],
        created_at: new Date(Date.now() - 86400000),
        duration: 30,
        company_id: companyId
      }
    ];
  } catch (error: any) {
    console.error('Error fetching debate sessions:', error.message);
    return [];
  }
};
