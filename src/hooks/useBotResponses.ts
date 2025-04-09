
import { useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { generateBotResponse } from '@/backend/debate';

export function useBotResponses(addMessage: (message: DebateMessage) => void, setIsLoading: (loading: boolean) => void) {
  const generateBotMessage = useCallback(async (
    bot: DebateParticipant, 
    topic: string,
    riskAppetite: string = 'medium',
    businessPriority: string = 'growth'
  ): Promise<DebateMessage> => {
    // Generate a response using the backend service with OpenAI integration
    const content = await generateBotResponse(bot, topic, riskAppetite, businessPriority);
    
    return {
      id: `msg-${Date.now()}-${bot.id}`,
      sender: bot.name,
      senderId: bot.id,
      content,
      timestamp: new Date()
    };
  }, []);

  const simulateBotResponses = useCallback(async (
    participants: DebateParticipant[], 
    topic: string,
    riskAppetite: string = 'medium',
    businessPriority: string = 'growth'
  ) => {
    setIsLoading(true);
    // Simulate bot messages with slight delays between each
    for (let i = 0; i < participants.length; i++) {
      const bot = participants[i];
      try {
        // Add slight delay between responses
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 1500));
        }
        
        const botMessage = await generateBotMessage(bot, topic, riskAppetite, businessPriority);
        addMessage(botMessage);
      } catch (error) {
        console.error(`Error generating response for ${bot.name}:`, error);
      }
    }
    setIsLoading(false);
  }, [addMessage, generateBotMessage, setIsLoading]);

  return {
    generateBotMessage,
    simulateBotResponses
  };
}
