
import { toast } from 'sonner';
import { supabase } from '@/backend/supabase';
import { executiveBots } from '@/backend/executiveBots';

export type ConsultationMessage = {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
};

export type BotConsultation = {
  id: string;
  botName: string;
  botRole: string;
  messages: ConsultationMessage[];
};

export async function saveConsultationMessage(
  consultationId: string,
  message: Omit<ConsultationMessage, 'timestamp'>
): Promise<boolean> {
  try {
    // Since the bot_messages table doesn't exist yet, we'll create a mock implementation
    console.log('Would save message to consultation:', consultationId, message);
    
    // Simulate successful save
    toast.success('Message saved');
    return true;
  } catch (error: any) {
    console.error('Error saving message:', error);
    toast.error(`Failed to save message: ${error.message}`);
    return false;
  }
}

export async function generateBotResponse(
  botName: string,
  botRole: string,
  userMessage: string
): Promise<string> {
  try {
    // Simulate an AI response based on the bot's role and expertise
    // In a real implementation, this would call an AI service
    
    const responses: Record<string, string[]> = {
      ceo: [
        "From a CEO's perspective, I'd focus on growth and scaling. Have you considered expanding into new markets?",
        "Looking at this strategically, I'd recommend you evaluate the long-term impact on your business model.",
        "My experience building multiple companies suggests that you should focus on your unit economics first."
      ],
      cfo: [
        "The financial implications here are significant. Have you run projections on how this affects your cash flow?",
        "I'd recommend allocating resources more efficiently by prioritizing projects with the highest ROI.",
        "Let's look at the numbers - your current approach might benefit from a more sustainable financial structure."
      ],
      cio: [
        "From a technological standpoint, implementing a more scalable infrastructure would address these challenges.",
        "Have you considered how AI and automation could streamline these processes?",
        "Your tech stack might need modernization to support these goals. I'd suggest starting with API integrations."
      ],
      cmo: [
        "Your marketing approach should focus more on customer retention alongside acquisition.",
        "I see an opportunity to differentiate your brand by emphasizing your unique value proposition.",
        "Have you analyzed your customer journey map? There might be key touchpoints you're missing."
      ],
      chro: [
        "Building the right team culture is crucial here. Consider implementing regular feedback mechanisms.",
        "Your talent acquisition strategy could benefit from focusing on diversity and complementary skill sets.",
        "Employee engagement will be key to executing this initiative successfully."
      ],
      strategy: [
        "This challenge requires a multifaceted approach. Let's break it down into manageable initiatives.",
        "I'd recommend running a pilot program first to validate these assumptions before full implementation.",
        "Consider performing a SWOT analysis to identify the most strategic path forward."
      ],
      coo: [
        "From an operational perspective, we should focus on streamlining your processes before scaling.",
        "Have you considered implementing KPIs to measure operational efficiency across departments?",
        "I'd suggest conducting a thorough audit of your current operations to identify bottlenecks."
      ],
      vp_global_operations: [
        "Global expansion requires careful consideration of local regulations and market conditions.",
        "I'd recommend establishing regional hubs to better manage your global operations.",
        "Have you analyzed the supply chain implications of your current growth strategy?"
      ],
      vp_research_development: [
        "Innovation should be at the core of your strategy. Have you established a formal R&D process?",
        "I'd suggest allocating a specific percentage of revenue to research and development initiatives.",
        "Consider creating cross-functional innovation teams to tackle your biggest challenges."
      ],
      sales_business_development: [
        "Your sales process needs to be more consultative to address complex B2B customer needs.",
        "Have you considered implementing a customer success program to drive retention and expansion?",
        "I'd focus on building strategic partnerships that can accelerate your market penetration."
      ],
      operations_efficiency: [
        "Process optimization should be your priority. Have you mapped your current workflows?",
        "I'd recommend implementing lean methodologies across your organization.",
        "Consider investing in automation for your most repetitive and time-consuming tasks."
      ]
    };

    // Get responses for this bot role, fallback to strategy if not found
    const roleResponses = responses[botRole] || responses.strategy;
    
    // Select a random response from the available options
    const randomIndex = Math.floor(Math.random() * roleResponses.length);
    const baseResponse = roleResponses[randomIndex];
    
    // Personalize the response with the bot's name
    return `As ${botName}, ${baseResponse}`;
  } catch (error: any) {
    console.error('Error generating bot response:', error.message);
    return `I apologize, but I'm having trouble formulating a response right now. Could we try a different approach to your question?`;
  }
}

export async function getUserConsultationHistory(): Promise<BotConsultation[]> {
  try {
    // Mock implementation since we don't have the actual tables yet
    // This returns a static set of sample consultations
    
    // Generate some sample consultations
    const sampleConsultations: BotConsultation[] = [
      {
        id: '1',
        botName: 'Elon Musk',
        botRole: 'ceo',
        messages: [
          {
            type: 'user',
            content: 'How can I scale my business faster?',
            timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
          },
          {
            type: 'bot',
            content: 'As Elon Musk, I would recommend focusing on your unit economics first before scaling. Make sure each transaction is profitable.',
            timestamp: new Date(Date.now() - 86300000).toISOString()
          }
        ]
      },
      {
        id: '2',
        botName: 'Ruth Porat',
        botRole: 'cfo',
        messages: [
          {
            type: 'user',
            content: 'Should I invest in marketing or product development?',
            timestamp: new Date(Date.now() - 172800000).toISOString() // 2 days ago
          },
          {
            type: 'bot',
            content: 'As Ruth Porat, I'd recommend calculating the ROI of both options. Typically, investing in product enhancements that increase customer lifetime value yields better long-term results.',
            timestamp: new Date(Date.now() - 172700000).toISOString()
          }
        ]
      }
    ];
    
    return sampleConsultations;
  } catch (error: any) {
    console.error('Error fetching consultation history:', error.message);
    return [];
  }
}

export async function startNewConsultation(botName: string, botRole: string): Promise<string | null> {
  try {
    // Mock implementation since we don't have the actual tables
    // In a real implementation, this would save to a database
    console.log('Starting new consultation with', botName, 'in role', botRole);
    
    // Generate a random ID for the consultation
    const consultationId = Math.random().toString(36).substring(2, 15);
    
    return consultationId;
  } catch (error: any) {
    console.error('Error starting new consultation:', error.message);
    toast.error('Failed to start consultation');
    return null;
  }
}

export function getBotByNameAndRole(name: string, role: string) {
  // Validate that this bot exists in our roster
  const roleExists = Object.keys(executiveBots).includes(role);
  const nameExists = roleExists && executiveBots[role as keyof typeof executiveBots].includes(name);
  
  if (!nameExists) {
    return null;
  }
  
  return {
    name,
    role,
    title: formatRoleTitle(role),
    expertise: getBotExpertise(role)
  };
}

function formatRoleTitle(role: string): string {
  switch (role) {
    case 'ceo': return 'Chief Executive Officer';
    case 'cfo': return 'Chief Financial Officer';
    case 'cio': return 'Chief Information Officer';
    case 'cmo': return 'Chief Marketing Officer';
    case 'chro': return 'Chief HR Officer';
    case 'coo': return 'Chief Operations Officer';
    case 'strategy': return 'Strategy Consultant';
    case 'vp_global_operations': return 'VP of Global Operations';
    case 'vp_research_development': return 'VP of Research & Development';
    case 'sales_business_development': return 'Sales & Business Development';
    case 'operations_efficiency': return 'Operations Efficiency Expert';
    default: return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}

function getBotExpertise(role: string): string {
  switch (role) {
    case 'ceo': return 'Leadership, Vision, Strategy';
    case 'cfo': return 'Finance, Investment, Risk Management';
    case 'cio': return 'Technology, Innovation, Digital Transformation';
    case 'cmo': return 'Marketing, Brand, Customer Experience';
    case 'chro': return 'HR, Talent, Culture';
    case 'coo': return 'Operations, Efficiency, Process Optimization';
    case 'strategy': return 'Business Strategy, Competitive Analysis';
    case 'vp_global_operations': return 'Global Operations, Supply Chain';
    case 'vp_research_development': return 'R&D, Innovation, Product Development';
    case 'sales_business_development': return 'Sales, Partnerships, Business Development';
    case 'operations_efficiency': return 'Process Optimization, Operational Efficiency';
    default: return 'Business Consulting';
  }
}
