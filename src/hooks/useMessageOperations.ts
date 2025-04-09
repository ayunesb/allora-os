
import { useState, useCallback } from 'react';
import { DebateMessage } from '@/utils/consultation/types';

export function useMessageOperations() {
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

  return {
    messages,
    isLoading,
    setIsLoading,
    setMessages,
    addMessage,
    addSystemMessage,
  };
}
