
import React, { useState, useEffect, useCallback } from 'react';
import { useProtectedApi } from '@/hooks/useProtectedApi';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Export the Message interface so it can be used in other components
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

export interface Bot {
  name: string;
  title: string;
  role: string;
  expertise: string;
  avatar?: string;
  industry?: string;
}

export function useBotConsultation(botName?: string, role?: string, industry?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [bot, setBot] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const { fetchApi } = useProtectedApi();
  const { preferences } = useUserPreferences();
  const { user } = useAuth();

  // Fetch bot details
  useEffect(() => {
    if (botName && role) {
      setBot({
        name: botName,
        title: role,
        role: role,
        expertise: industry || 'General Business',
        industry: industry
      });
    }
  }, [botName, role, industry]);

  const handleSendMessage = async (userMessage: string): Promise<void> => {
    if (!userMessage.trim()) return;
    
    // Add user message to the list
    const userMessageObj: Message = {
      id: uuidv4(),
      content: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    const typingMessageObj: Message = {
      id: uuidv4(),
      content: '',
      sender: 'bot',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prev => [...prev, userMessageObj, typingMessageObj]);
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchApi<{ reply: string }>('/api/bot/chat', 'POST', {
        message: userMessage,
        botName: botName || '',
        role: role || '',
        industry: industry || '',
        userId: user?.id || '',
        preferences: preferences || {}
      });
      
      // Remove typing message and add actual response
      setMessages(prev => {
        const filteredMessages = prev.filter(msg => !msg.isTyping);
        return [
          ...filteredMessages,
          {
            id: uuidv4(),
            content: response?.reply || 'I apologize, but I couldn\'t generate a response.',
            sender: 'bot',
            timestamp: new Date()
          }
        ];
      });
    } catch (err: any) {
      setError(err.message || 'Failed to get a response');
      setRetryCount(prev => prev + 1);
      
      // Remove typing message
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      toast.error('Failed to get a response from the advisor');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages]
      .reverse()
      .find(message => message.sender === 'user');
      
    if (lastUserMessage) {
      handleSendMessage(lastUserMessage.content);
    }
  }, [messages]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    setRetryCount(0);
    toast.success('Conversation cleared');
  }, []);

  const toggleVoiceInterface = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

  const startVoiceRecognition = useCallback(() => {
    setIsListening(true);
    // Implement voice recognition logic here
    // This is a placeholder; real implementation would use a speech recognition API
    setTimeout(() => {
      setIsListening(false);
    }, 3000);
  }, []);

  return {
    bot,
    messages,
    isLoading,
    isTyping,
    error,
    retryCount,
    isVoiceEnabled,
    isListening,
    handleSendMessage,
    retryLastMessage,
    clearConversation,
    toggleVoiceInterface,
    startVoiceRecognition
  };
}
