
import { useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { supabase } from '@/integrations/supabase/client';
import { UserPreferences } from './useUserPreferences';

export function useBotResponses(
  addMessage: (message: DebateMessage) => void,
  setIsLoading: (loading: boolean) => void
) {
  const simulateBotResponses = useCallback(async (
    participants: DebateParticipant[],
    topic: string,
    riskAppetite: string = 'medium',
    businessPriority: string = 'growth',
    preferences?: UserPreferences
  ) => {
    if (!participants.length) return;
    
    setIsLoading(true);
    
    try {
      // Get responses from each participant sequentially
      for (const participant of participants) {
        // Create a debateContext object to send to the API
        const debateContext = {
          topic,
          riskAppetite,
          businessPriority,
          includeRationale: preferences?.showSources || false
        };
        
        try {
          // Call the OpenAI edge function
          const { data, error } = await supabase.functions.invoke('multi-model-ai', {
            body: {
              action: 'debate',
              modelName: 'gpt-4o-mini',
              botName: participant.name,
              botRole: participant.title,
              debateContext,
              preferences // Pass user preferences to the API
            }
          });
          
          if (error) {
            console.error('Error calling AI API:', error);
            throw error;
          }
          
          // Format the response to include rationale if requested
          let content = data.content;
          
          // If rationale isn't already included but was requested
          if (preferences?.showSources && !content.includes('Rationale:')) {
            content += `\n\nRationale: Based on my experience as ${participant.name}, I believe this approach aligns with the ${riskAppetite} risk profile and prioritizes ${businessPriority}.`;
          }
          
          // Add the bot response message
          const message: DebateMessage = {
            id: `msg-${Date.now()}-${participant.id}`,
            sender: participant.name,
            senderId: participant.id,
            content,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
          };
          
          addMessage(message);
        } catch (error) {
          // Create varied fallback responses based on the executive's role
          let fallbackContent = '';
          
          // Personalized fallback responses based on executive role
          if (participant.role === 'ceo') {
            fallbackContent = `Looking at ${topic} from a strategic viewpoint, I believe we need to balance both acquisition and retention efforts, but with a slight emphasis on ${businessPriority === 'growth' ? 'acquisition to fuel our growth trajectory' : 'retention to stabilize our revenue'}. Innovation will be key regardless of which path we prioritize.`;
          } else if (participant.role === 'cfo') {
            fallbackContent = `From a financial perspective, ${topic} requires careful analysis of customer lifetime value. For a ${riskAppetite} risk profile, I'd recommend ${riskAppetite === 'high' ? 'investing more in acquisition despite higher CAC' : riskAppetite === 'low' ? 'focusing on retention which typically offers better ROI' : 'a balanced approach with clear metrics for both strategies'}.`;
          } else if (participant.role === 'coo') {
            fallbackContent = `Operationally speaking, our approach to ${topic} must consider our current resource allocation. With our ${businessPriority} priority, we should ${businessPriority === 'growth' ? 'build scalable acquisition channels while maintaining basic retention efforts' : 'optimize our customer journey to maximize retention while still acquiring new customers strategically'}.`;
          } else if (participant.role === 'cio' || participant.role === 'cto') {
            fallbackContent = `From a technology standpoint, our data infrastructure should support both aspects of ${topic}. I recommend investing in analytics that can identify which customers are most valuable to retain while also optimizing our acquisition funnel with A/B testing and personalization technologies.`;
          } else if (participant.role === 'cmo') {
            fallbackContent = `Marketing should approach ${topic} by segmenting our audience carefully. We should develop distinct strategies for acquisition versus retention, with appropriate content and channels for each. For a ${riskAppetite} risk profile, we should ${riskAppetite === 'high' ? 'experiment with new acquisition channels' : 'optimize our existing marketing mix'}.`;
          } else {
            fallbackContent = `Regarding ${topic}, we need to consider both strategies but align them with our ${businessPriority} business priority. For a company with a ${riskAppetite} risk appetite, I'd suggest a ${riskAppetite === 'high' ? 'more aggressive' : riskAppetite === 'low' ? 'more conservative' : 'balanced'} approach.`;
          }
          
          if (preferences?.showSources) {
            fallbackContent += `\n\nRationale: My recommendation is based on extensive experience in ${participant.specialty || participant.role}, considering the ${riskAppetite} risk profile and ${businessPriority} priority.`;
          }
          
          const fallbackMessage: DebateMessage = {
            id: `msg-${Date.now()}-${participant.id}`,
            sender: participant.name,
            senderId: participant.id,
            content: fallbackContent,
            timestamp: new Date(),
            isUser: false,
            votes: 0,
            isFavorite: false
          };
          
          addMessage(fallbackMessage);
        }
        
        // Add a delay between responses to make it feel more natural
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    } catch (error) {
      console.error('Error in simulateBotResponses:', error);
    } finally {
      setIsLoading(false);
    }
  }, [addMessage, setIsLoading]);

  return {
    simulateBotResponses
  };
}
