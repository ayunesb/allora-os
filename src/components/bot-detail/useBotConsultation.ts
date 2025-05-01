
import { useState, useCallback } from 'react';
import { Bot } from '@/types/fixed/Bot';
import { Message } from '@/types/fixed/Message';

export { Bot };  // Export Bot for use in other components

export interface UseBotConsultationResult {
  bot: Bot | null;
  messages: Message[];
  isLoading: boolean;
  isTyping: boolean;
  error: string;
  retryCount: number;
  isVoiceEnabled?: boolean;
  isListening?: boolean;
  handleSendMessage: (text: string) => Promise<void>;
  retryLastMessage: () => void;
  clearConversation: () => void;
  toggleVoiceInterface?: () => void;
  startVoiceRecognition?: () => void;
}

export function useBotConsultation(botName: string, role?: string): UseBotConsultationResult {
  const [bot, setBot] = useState<Bot | null>({
    name: botName || 'Assistant',
    role: role || 'Executive Advisor'
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
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
  
  const toggleVoiceInterface = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);
  
  const startVoiceRecognition = useCallback(() => {
    if (!isVoiceEnabled) return;
    
    setIsListening(true);
    
    // Placeholder for actual speech recognition
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("This is a voice-transcribed message placeholder");
    }, 2000);
  }, [isVoiceEnabled, handleSendMessage]);
  
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
