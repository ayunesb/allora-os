
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
    // Create a more detailed and persona-specific prompt
    const systemPrompt = `You are ${bot.name}, a ${bot.title} with expertise in ${bot.specialty || bot.role}. 
    You have a distinct communication style and perspective based on your background.
    Provide a thoughtful, insightful response about "${topic}" from your unique executive perspective.
    Consider a ${riskAppetite} risk appetite and prioritize ${businessPriority}.
    Your response should reflect your actual persona, including your known leadership style and business philosophy.
    DO NOT start with "As [name]" or similar phrases - speak directly in first person as this character would.`;
    
    // Call the multi-model-ai edge function with improved prompting
    const { data, error } = await supabase.functions.invoke('multi-model-ai', {
      body: {
        action: 'generate',
        modelName: 'gpt-4o-mini',
        botName: bot.name,
        botRole: bot.role,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `As ${bot.title}, what is your perspective on ${topic}, considering ${riskAppetite} risk appetite and ${businessPriority} business priority?`
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
    
    // Enhanced fallback responses with more variety and personality per role
    return getPersonalizedFallbackResponse(bot, topic, riskAppetite, businessPriority);
  }
};

// Helper function to generate more personalized fallback responses
const getPersonalizedFallbackResponse = (
  bot: DebateParticipant,
  topic: string,
  riskAppetite: string,
  businessPriority: string
): string => {
  // Create a key to help generate varied responses
  const variationKey = `${bot.role}-${riskAppetite}-${businessPriority}`;
  
  // CEO (Elon Musk style) responses
  if (bot.role === 'ceo') {
    switch (variationKey) {
      case 'ceo-high-growth':
        return `We need to be bold and disruptive with our approach to ${topic}. The companies that win are those willing to take calculated risks and innovate at rapid speed. I'd allocate 70% of our resources to breakthrough initiatives that could 10x our growth trajectory, even if some fail. The remaining 30% should maintain our core business.`;
      case 'ceo-medium-growth':
        return `For ${topic}, we need a two-pronged strategy. First, optimize what's working with incremental improvements. Second, allocate 40% of resources to potentially transformative projects that could significantly accelerate our growth curve. I believe in first principles thinking - let's break down this challenge to its fundamentals and rebuild our approach.`;
      case 'ceo-low-growth':
        return `When addressing ${topic}, we should focus on building sustainable, long-term value. Innovation doesn't always mean radical change; sometimes it's about perfecting execution and optimizing efficiency. I'd recommend a measured approach that prioritizes reliability while still exploring new opportunities.`;
      default:
        return `Looking at ${topic}, I see an opportunity to think differently than our competitors. We should question industry assumptions and redesign our approach from first principles. Success requires both vision and disciplined execution, and I believe we can achieve both.`;
    }
  }
  
  // CFO (Warren Buffett style) responses
  else if (bot.role === 'cfo') {
    switch (variationKey) {
      case 'cfo-high-growth':
        return `While I generally favor financial prudence, ${topic} presents a compelling case for strategic investment. The numbers suggest we have sufficient runway to allocate capital toward higher-yield opportunities, provided we maintain clear metrics and accountability. I'd recommend establishing financial guardrails while pursuing ambitious growth.`;
      case 'cfo-medium-growth':
        return `When evaluating ${topic}, I look at the long-term economics. Our financial analysis indicates a balanced portfolio approach would be optimal - invest in initiatives with proven unit economics while allocating 30% to higher-risk opportunities with significant upside potential. Cash flow discipline remains paramount regardless of which direction we choose.`;
      case 'cfo-low-growth':
        return `From a financial perspective, our approach to ${topic} should prioritize capital preservation and predictable returns. I've seen many companies destroy shareholder value by overextending. Let's focus on initiatives with clear ROI and manageable downside risk, maintaining our financial strength for when truly exceptional opportunities arise.`;
      default:
        return `The financial implications of ${topic} require careful consideration. We should focus on projects with clear return metrics and establish appropriate capital allocation thresholds. Remember, the best investment is often in businesses with strong competitive moats and predictable cash flows, rather than speculative ventures.`;
    }
  }
  
  // COO (Sheryl Sandberg style) responses
  else if (bot.role === 'coo') {
    switch (variationKey) {
      case 'coo-high-growth':
        return `From an operational standpoint, pursuing ${topic} aggressively requires us to build scalable infrastructure and processes now. We should be thinking three steps ahead, designing systems that can handle 5-10x our current volume. I recommend investing in automation and talent that can drive rapid scaling while maintaining quality.`;
      case 'coo-medium-growth':
        return `To execute effectively on ${topic}, we need to balance operational excellence with flexibility. I recommend establishing cross-functional teams empowered to move quickly, supported by clear metrics and accountability frameworks. Let's identify the operational bottlenecks that could constrain growth and address them proactively.`;
      case 'coo-low-growth':
        return `When approaching ${topic}, operational efficiency should be our primary focus. We can drive significant value by optimizing our current processes, reducing waste, and enhancing team collaboration. I recommend a systematic review of our value chain to identify improvement opportunities before committing to expansion.`;
      default:
        return `Successfully implementing our ${topic} strategy requires strong operational execution. We need to ensure our teams are aligned, processes are streamlined, and we're collecting the right data to measure progress. I recommend a phased implementation approach with clear milestones and accountability.`;
    }
  }
  
  // CIO/CTO (technology-focused) responses
  else if (bot.role === 'cio' || bot.role === 'cto') {
    switch (variationKey) {
      case 'cio-high-growth':
        return `From a technology perspective, ${topic} demands we embrace emerging technologies that could provide competitive advantage. I recommend investing in a modern, API-first architecture that enables rapid experimentation and scaling. We should allocate resources to explore AI, automation, and data analytics capabilities that could transform our approach.`;
      case 'cio-medium-growth':
        return `Technology will be a key enabler for our ${topic} initiatives. I recommend a balanced approach - modernize our core systems to improve efficiency while selectively investing in innovation projects with high potential impact. Data integration should be a priority to enable better decision-making across the organization.`;
      case 'cio-low-growth':
        return `When considering technology investments for ${topic}, we should prioritize stability, security, and cost optimization. I recommend focusing on consolidating our technology stack, improving our existing systems, and implementing automation where it provides clear ROI. This approach minimizes risk while still delivering value.`;
      default:
        return `The technology implications of ${topic} are significant. We need to ensure our digital infrastructure can support our strategic objectives while maintaining security and reliability. I recommend developing a roadmap that balances innovation with pragmatic implementation, focused on delivering tangible business outcomes.`;
    }
  }
  
  // CMO (marketing-focused) responses
  else if (bot.role === 'cmo') {
    switch (variationKey) {
      case 'cmo-high-growth':
        return `For ${topic}, our marketing strategy should focus on rapid customer acquisition and brand building. I recommend allocating resources to high-visibility channels, bold creative approaches, and data-driven experimentation. We should be willing to take calculated risks with our messaging to stand out in a crowded market.`;
      case 'cmo-medium-growth':
        return `Our marketing approach to ${topic} should balance customer acquisition with strengthening relationships with existing customers. I recommend developing targeted campaigns for different segments, investing in our brand narrative, and leveraging data analytics to continuously optimize our marketing mix.`;
      case 'cmo-low-growth':
        return `When addressing ${topic} from a marketing perspective, we should focus on efficiency and customer retention. I recommend deepening our understanding of our most valuable customers, refining our messaging to emphasize our unique value proposition, and optimizing our marketing spend to maximize ROI.`;
      default:
        return `From a marketing standpoint, ${topic} requires us to clearly articulate our value proposition and reach our target audience through the right channels. I recommend developing a comprehensive campaign that builds brand awareness while generating measurable results, with clear KPIs to track performance.`;
    }
  }
  
  // CHRO (HR-focused) responses
  else if (bot.role === 'chro') {
    switch (variationKey) {
      case 'chro-high-growth':
        return `The talent implications for ${topic} are significant. We need to aggressively recruit high-performers while developing a culture that enables rapid scaling. I recommend investing in our employer brand, streamlining our hiring processes, and implementing development programs that prepare our people for expanded responsibilities.`;
      case 'chro-medium-growth':
        return `To support our ${topic} initiatives, we need to balance talent acquisition with developing our existing team members. I recommend focusing on creating clear career paths, implementing targeted training programs, and ensuring our compensation strategy rewards both individual and collective performance.`;
      case 'chro-low-growth':
        return `From a people perspective, our approach to ${topic} should emphasize retention and engagement of our top performers. I recommend investing in leadership development, enhancing our performance management processes, and creating opportunities for internal mobility to keep our best people challenged and growing.`;
      default:
        return `The success of our ${topic} strategy depends greatly on our people. We need to ensure we have the right talent in key roles, a culture that supports our objectives, and leadership capable of guiding teams through change. I recommend a holistic approach to talent management that aligns with our strategic priorities.`;
    }
  }
  
  // Strategy (strategic planning) responses
  else if (bot.role === 'strategy') {
    switch (variationKey) {
      case 'strategy-high-growth':
        return `Strategically, ${topic} presents an opportunity to significantly expand our market position. I recommend identifying adjacent markets or customer segments where we can leverage our core strengths. We should be willing to cannibalize some existing business to capture larger opportunities, while maintaining a portfolio of strategic bets with varying risk profiles.`;
      case 'strategy-medium-growth':
        return `Our strategic approach to ${topic} should balance consolidating our position in core markets while selectively pursuing new opportunities. I recommend conducting scenario planning to identify the most promising paths forward, with clear metrics to evaluate progress and pivot if necessary. Competitive analysis should inform where we choose to differentiate.`;
      case 'strategy-low-growth':
        return `From a strategic perspective, our approach to ${topic} should focus on strengthening our competitive advantages in our core business. I recommend deepening our relationships with existing customers, optimizing our operations for efficiency, and making targeted investments in capabilities that enhance our value proposition.`;
      default:
        return `Looking at ${topic} through a strategic lens, we need to clearly define our objectives, understand market dynamics, and align our capabilities accordingly. I recommend developing a strategic roadmap with clear milestones, while maintaining flexibility to adapt as conditions change. Competitive differentiation should be a central consideration.`;
    }
  }
  
  // Default generic response as last resort
  return `Regarding ${topic}, we need to consider both short-term outcomes and long-term strategic positioning. With a ${riskAppetite} risk profile and focus on ${businessPriority}, I recommend a balanced approach that leverages our strengths while addressing key market opportunities. Let's ensure we have clear metrics to track progress and the ability to adjust course as needed.`;
};
