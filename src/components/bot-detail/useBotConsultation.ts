
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Message, Bot } from './MessageType';

export const useBotConsultation = (initialBot?: Bot) => {
  const [bot, setBot] = useState<Bot>(initialBot || {
    id: 'default-bot',
    name: 'AI Consultant',
    isActive: true
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [retryCount, setRetryCount] = useState(0);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const sendConsultation = useCallback(async (prompt: string): Promise<string> => {
    try {
      setIsLoading(true);
      setError('');
      setIsTyping(true);
      
      // Simulate API call
      const response = await new Promise<{ data: { reply: string }, error?: string }>((resolve) => {
        setTimeout(() => {
          resolve({
            data: { reply: `Response to: ${prompt}` }
          });
        }, 1000);
      });
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      const botReply = response.data.reply;
      setResponse(botReply);
      return botReply;
    } catch (err: any) {
      setError(err.message || 'An error occurred during consultation');
      throw err;
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (message: string, options?: any) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const botReply = await sendConsultation(message);
      
      const botMessage: Message = {
        id: uuidv4(),
        text: botReply,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Error is already set in sendConsultation
    }
  }, [sendConsultation]);

  const retryLastMessage = useCallback(() => {
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    if (lastUserMessage) {
      setRetryCount(c => c + 1);
      handleSendMessage(lastUserMessage.text);
    }
  }, [messages, handleSendMessage]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError('');
    setResponse('');
    setRetryCount(0);
  }, []);

  const toggleVoiceInterface = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
  }, []);

  const startVoiceRecognition = useCallback(() => {
    setIsListening(true);
    // Mock implementation - would integrate with Web Speech API in real implementation
    setTimeout(() => {
      setIsListening(false);
      handleSendMessage("Voice message transcription would appear here");
    }, 2000);
  }, [handleSendMessage]);

  return {
    bot,
    messages,
    isLoading,
    isTyping,
    error,
    response,
    retryCount,
    isVoiceEnabled,
    isListening,
    sendConsultation,
    handleSendMessage,
    retryLastMessage,
    clearConversation,
    toggleVoiceInterface,
    startVoiceRecognition
  };
};

export default useBotConsultation;
export { Message, Bot } from './MessageType';
