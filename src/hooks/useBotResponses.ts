
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
          businessPriority
        };
        
        // Call the OpenAI edge function
        const { data, error } = await supabase.functions.invoke('openai', {
          body: {
            botName: participant.name,
            botRole: participant.title,
            debateContext,
            preferences // Pass user preferences to the API
          }
        });
        
        if (error) {
          console.error('Error calling OpenAI API:', error);
          continue;
        }
        
        // Add the bot response message
        const message: DebateMessage = {
          id: `msg-${Date.now()}-${participant.id}`,
          sender: participant.name,
          senderId: participant.id,
          content: data.content,
          timestamp: new Date(),
          isUser: false,
          votes: 0,
          isFavorite: false
        };
        
        addMessage(message);
        
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
