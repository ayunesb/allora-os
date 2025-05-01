
import { useState, useCallback } from 'react';
import { Bot, Message } from './MessageType';

export interface UseBotConsultationResult {
  bot: Bot;
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  error: string;
  retryCount: number;
  handleSendMessage: (text: string) => Promise<void>;
  retryLastMessage: () => void;
  clearConversation: () => void;
}

export function useBotConsultation(initialBot: Bot): UseBotConsultationResult {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setError('');
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a response to: ${text}`,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      setError('Failed to get bot response');
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, []);
  
  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    
    if (lastUserMessage) {
      setRetryCount(prev => prev + 1);
      handleSendMessage(lastUserMessage.text);
    }
  }, [messages, handleSendMessage]);
  
  const clearConversation = useCallback(() => {
    setMessages([]);
    setError('');
    setRetryCount(0);
  }, []);
  
  return {
    bot: initialBot,
    messages,
    isLoading,
    isTyping,
    error,
    retryCount,
    handleSendMessage,
    retryLastMessage,
    clearConversation
  };
}
