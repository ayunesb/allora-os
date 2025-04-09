
import { useState, useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { generateBotResponse } from '@/backend/debateManager';

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

  const generateBotMessage = useCallback((bot: DebateParticipant, topic: string): DebateMessage => {
    // Generate a response using the backend service
    const content = generateBotResponse(bot, topic);
    
    return {
      id: `msg-${Date.now()}-${bot.id}`,
      sender: bot.name,
      senderId: bot.id,
      content,
      timestamp: new Date()
    };
  }, []);

  const simulateBotResponses = useCallback((participants: DebateParticipant[], topic: string) => {
    // Simulate bot messages with slight delays between each
    participants.forEach((bot, index) => {
      setTimeout(() => {
        const botMessage = generateBotMessage(bot, topic);
        addMessage(botMessage);
      }, (index + 1) * 2500); // Stagger responses
    });
  }, [addMessage, generateBotMessage]);

  const sendUserMessage = useCallback((content: string, participants: DebateParticipant[], topic: string) => {
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
    
    // Trigger bot responses
    setTimeout(() => {
      simulateBotResponses(participants, topic);
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
