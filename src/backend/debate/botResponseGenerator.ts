
import { DebateParticipant } from '@/utils/consultation/types';
import { supabase } from '../supabase';
import { toast } from 'sonner';

// Generate a debate response for a specific bot based on topic
export const generateBotResponse = async (
  bot: DebateParticipant, 
  topic: string, 
  riskAppetite: string = 'medium',
  businessPriority: string = 'growth'
): Promise<string> => {
  try {
    // Call the multi-model-ai edge function
    const { data, error } = await supabase.functions.invoke('multi-model-ai', {
      body: {
        action: 'generate',
        modelName: 'gpt-4o-mini',
        botName: bot.name,
        botRole: bot.role,
        messages: [
          {
            type: 'user',
            content: `As a ${bot.title} executive, what is your perspective on ${topic}?`
          }
        ],
        debateContext: {
          topic,
          riskAppetite,
          businessPriority
        }
      }
    });

    if (error) {
      throw new Error(`Edge function error: ${error.message}`);
    }

    if (data.error) {
      throw new Error(`API error: ${data.error}`);
    }

    return data.content;
  } catch (error) {
    console.error('Error calling AI API, falling back to mock data:', error);
    
    // Fall back to mock responses if the API call fails
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
  }
};
