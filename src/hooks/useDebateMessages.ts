
import { useCallback } from 'react';
import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
import { useMessageOperations } from './useMessageOperations';
import { useBotResponses } from './useBotResponses';
import { useUserPreferences } from './useUserPreferences';

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

  const { preferences } = useUserPreferences();

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
    
    // Trigger bot responses with a small delay, passing user preferences
    setTimeout(async () => {
      await simulateBotResponses(participants, topic, riskAppetite, businessPriority, preferences);
    }, 1000);
  }, [addMessage, simulateBotResponses, preferences]);

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
