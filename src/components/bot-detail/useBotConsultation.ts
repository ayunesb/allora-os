
import { useState, useCallback, useEffect } from "react";
import { Message, Bot } from "./MessageType";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export { Bot } from "./MessageType"; // Re-export for convenience

export function useBotConsultation(botName: string = "", botRole: string = "") {
  const [messages, setMessages] = useState<Message[]>([]);
  const [bot, setBot] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Initialize the bot when component mounts
  useEffect(() => {
    // In a real implementation, this would fetch the bot from an API
    // For now, we'll create a mock bot based on the provided name and role
    if (botName) {
      setBot({
        id: `bot-${botName.toLowerCase().replace(/\s+/g, '-')}`,
        name: botName,
        title: botRole || 'Executive Advisor',
        role: botRole || 'advisor',
        expertise: 'Business Strategy',
        isActive: true
      });
    }
  }, [botName, botRole]);

  // Simulate API call to get bot response
  const getBotResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate bot response
    try {
      // This would be a real API call in production
      // const response = await fetch('/api/bot/chat', {
      //  method: 'POST',
      //  headers: { 'Content-Type': 'application/json' },
      //  body: JSON.stringify({ message: userMessage, botId: bot?.id })
      // });

      // Simulate different bot responses based on the bot role
      let response = "";
      
      if (botRole?.toLowerCase().includes('finance')) {
        response = `As a financial advisor, I'd suggest looking at your cash flow statements and ROI metrics first. ${userMessage.length > 20 ? 'Your detailed question helps me provide better advice.' : 'Could you share more specific financial concerns?'}`;
      }
      else if (botRole?.toLowerCase().includes('market')) {
        response = `From a market analysis perspective, we should examine your competitive positioning. ${userMessage.length > 20 ? 'I appreciate your detailed question.' : 'Could you elaborate on your market concerns?'}`;
      }
      else {
        response = `I've analyzed your question about "${userMessage.substring(0, 30)}${userMessage.length > 30 ? '...' : ''}". As your ${botRole || 'executive advisor'}, I recommend focusing on strategic growth opportunities while maintaining operational excellence.`;
      }

      return response;
    } catch (error) {
      console.error("Error getting bot response:", error);
      throw new Error("Failed to get a response from the AI advisor. Please try again.");
    }
  };

  // Handle sending a new message
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !bot) return;

    setIsLoading(true);
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      // Add typing indicator
      setIsTyping(true);
      
      // Get bot response
      const response = await getBotResponse(text);
      
      setIsTyping(false);
      
      // Add bot message after a small delay to show typing indicator
      setTimeout(() => {
        const botMessage: Message = {
          id: uuidv4(),
          text: response,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setRetryCount(0);
      }, 500);
    } catch (error) {
      setIsTyping(false);
      setRetryCount(prev => prev + 1);
      setError(error instanceof Error ? error.message : "Something went wrong with the AI advisor");
      toast.error("Failed to get response from AI advisor");
    } finally {
      setIsLoading(false);
    }
  }, [bot]);

  // Handle retrying the last message
  const retryLastMessage = useCallback(() => {
    const userMessages = messages.filter(m => m.sender === 'user');
    if (userMessages.length === 0) return;
    
    const lastUserMessage = userMessages[userMessages.length - 1];
    
    // Filter out the last bot message (if any) before retrying
    const filteredMessages = messages.filter(m => {
      if (m.sender === 'bot') {
        const userIndex = messages.findIndex(msg => msg.id === lastUserMessage.id);
        const botIndex = messages.findIndex(msg => msg.id === m.id);
        return botIndex < userIndex;
      }
      return true;
    });
    
    setMessages(filteredMessages);
    handleSendMessage(lastUserMessage.text);
  }, [messages, handleSendMessage]);

  // Clear the conversation
  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    bot,
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
