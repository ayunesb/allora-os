
import { toast } from 'sonner';
import { supabase } from '@/backend/supabase';

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
    // In a real implementation, this would save to a database
    // For now, we'll just simulate success
    toast.success('Message saved');
    return true;
  } catch (error: any) {
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
      ]
    };

    // Get responses for this bot role, fallback to generic if not found
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
    // In a real implementation, this would fetch from a database
    // For now, return an empty array
    return [];
  } catch (error: any) {
    console.error('Error fetching consultation history:', error.message);
    return [];
  }
}
