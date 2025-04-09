
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useProtectedApi } from "@/hooks/useProtectedApi";
import { getBotExpertise, formatRoleTitle } from "@/utils/consultation";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
}

export interface Bot {
  name: string;
  title: string;
  expertise: string;
}

export function useBotConsultation(botName?: string, role?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [bot, setBot] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { preferences } = useUserPreferences();

  // Initialize the bot data
  useEffect(() => {
    if (!botName || !role) {
      setBot(null);
      return;
    }

    try {
      // In a real application, we would fetch the bot data from an API
      // For now, we'll just create it based on the URL parameters
      setBot({
        name: botName || "",
        title: formatRoleTitle(role || ""),
        expertise: getBotExpertise(role || ""),
      });
      setError(null);
    } catch (err) {
      console.error("Failed to initialize bot:", err);
      setBot(null);
      setError("Failed to initialize advisor. Please try again later.");
    }
  }, [botName, role]);

  // Reset state when bot changes
  useEffect(() => {
    if (botName && role) {
      setMessages([]);
      setError(null);
      setRetryCount(0);
    }
  }, [botName, role]);

  const { execute: fetchBotResponse } = useProtectedApi<string, string>(
    async (userMessage) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real application, we would make an API call here
      // For now, we'll just return a mock response
      const mockResponses = [
        `Thank you for your message. Based on my analysis and ${preferences.technicalLevel === 'advanced' ? 'in-depth technical assessment' : 'business expertise'}, I would recommend exploring this further.`,
        `I've considered your question carefully. ${preferences.responseStyle === 'detailed' ? 'My professional assessment indicates' : 'I think'} we should approach this systematically.`,
        `That's an interesting point. ${preferences.showSources ? 'According to recent industry reports (Harvard Business Review, 2024),' : ''} this strategy could yield significant results for your business.`,
      ];
      
      // Select a random response
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      return mockResponses[randomIndex];
    }
  );

  const retryLastMessage = useCallback(async () => {
    if (messages.length === 0) return;
    
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.sender === "user");
    if (lastUserMessageIndex === -1) return;
    
    const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
    
    // Remove all messages after the last user message
    setMessages(prev => prev.slice(0, messages.length - lastUserMessageIndex));
    
    // Retry with the last user message
    await handleSendMessage(lastUserMessage.content);
    
    // Increment retry count
    setRetryCount(prev => prev + 1);
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !bot) return;
    
    setIsLoading(true);
    setIsTyping(true);
    setError(null);
    
    // Add user message to the conversation
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Add typing indicator
    const typingIndicatorId = `bot-typing-${Date.now()}`;
    setMessages((prev) => [...prev, {
      id: typingIndicatorId,
      content: "",
      sender: "bot",
      timestamp: new Date(),
      isTyping: true
    }]);
    
    try {
      // Fetch bot response
      const response = await fetchBotResponse(content);
      
      if (response) {
        // Remove typing indicator and add the real response
        setMessages((prev) => {
          const filtered = prev.filter(m => m.id !== typingIndicatorId);
          return [
            ...filtered, 
            {
              id: `bot-${Date.now()}`,
              content: response,
              sender: "bot",
              timestamp: new Date(),
            }
          ];
        });
      } else {
        throw new Error("Failed to get response");
      }
    } catch (err) {
      console.error("Failed to get response:", err);
      // Remove typing indicator
      setMessages(prev => prev.filter(m => m.id !== typingIndicatorId));
      
      setError("Failed to get a response. Please try again.");
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
    setRetryCount(0);
    toast.success("Conversation cleared");
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
