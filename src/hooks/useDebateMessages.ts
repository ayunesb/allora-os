import { useState, useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { generateBotResponse } from '@/backend/debate';

export default function useDebateMessages() {
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((message: DebateMessage) => {
    setMessages(prevMessages => [...prevMessages, message]);
  }, []);

  const addSystemMessage = useCallback((content: string) => {
    const systemMessage: DebateMessage = {
      id: `msg-${Date.now()}`,
      sender: 'System',
      senderId: 'system',
      content,
      timestamp: new Date(),
    };
    
    addMessage(systemMessage);
    return systemMessage;
  }, [addMessage]);

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
  }, [addMessage, generateBotMessage]);

  const sendUserMessage = useCallback(async (
    content: string, 
    participants: DebateParticipant[], 
    topic: string,
    riskAppetite: string = 'medium',
    businessPriority: string = 'growth'
  ) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: DebateMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'You',
      senderId: 'user',
      content,
      timestamp: new Date(),
      isUser: true
    };
    
    addMessage(userMessage);
    
    // Trigger bot responses with a small delay
    setTimeout(async () => {
      await simulateBotResponses(participants, topic, riskAppetite, businessPriority);
    }, 1000);
  }, [addMessage, simulateBotResponses]);

  return {
    messages,
    isLoading,
    setIsLoading,
    setMessages,
    addMessage,
    addSystemMessage,
    simulateBotResponses,
    sendUserMessage,
  };
}
