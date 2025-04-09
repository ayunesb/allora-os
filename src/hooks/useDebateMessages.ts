
import { useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { useMessageOperations } from './useMessageOperations';
import { useBotResponses } from './useBotResponses';

export default function useDebateMessages() {
  const {
    messages,
    favorites,
    isLoading,
    setIsLoading,
    setMessages,
    addMessage,
    addSystemMessage,
    voteMessage,
    toggleFavorite
  } = useMessageOperations();

  const {
    simulateBotResponses
  } = useBotResponses(addMessage, setIsLoading);

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
      isUser: true,
      votes: 0,
      isFavorite: false
    };
    
    addMessage(userMessage);
    
    // Trigger bot responses with a small delay
    setTimeout(async () => {
      await simulateBotResponses(participants, topic, riskAppetite, businessPriority);
    }, 1000);
  }, [addMessage, simulateBotResponses]);

  return {
    messages,
    favorites,
    isLoading,
    setIsLoading,
    setMessages,
    addSystemMessage,
    simulateBotResponses,
    sendUserMessage,
    voteMessage,
    toggleFavorite,
  };
}
