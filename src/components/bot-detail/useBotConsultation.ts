
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useProtectedApi } from "@/hooks/useProtectedApi";
import { getBotExpertise, formatRoleTitle } from "@/utils/consultation";
import { useUserPreferences } from "@/hooks/useUserPreferences";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Bot {
  name: string;
  title: string;
  expertise: string;
}

export function useBotConsultation(botName?: string, role?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [bot, setBot] = useState<Bot | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const { execute: fetchBotResponse } = useProtectedApi<string, string>(
    async (userMessage) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In a real application, we would make an API call here
      // For now, we'll just return a mock response
      const mockResponses = [
        `Thank you for your message. Based on my analysis and ${preferences.technicalLevel === 'high' ? 'in-depth technical assessment' : 'business expertise'}, I would recommend exploring this further.`,
        `I've considered your question carefully. ${preferences.responseStyle === 'formal' ? 'My professional assessment indicates' : 'I think'} we should approach this systematically.`,
        `That's an interesting point. ${preferences.includeSourceCitations ? 'According to recent industry reports (Harvard Business Review, 2024),' : ''} this strategy could yield significant results for your business.`,
      ];
      
      // Select a random response
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      return mockResponses[randomIndex];
    }
  );

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !bot) return;
    
    setIsLoading(true);
    setError(null);
    
    // Add user message to the conversation
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    try {
      // Fetch bot response
      const response = await fetchBotResponse(content);
      
      if (response) {
        // Add bot response to the conversation
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          content: response,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error("Failed to get response");
      }
    } catch (err) {
      console.error("Failed to get response:", err);
      setError("Failed to get a response. Please try again.");
      toast.error("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    bot,
    messages,
    isLoading,
    error,
    handleSendMessage,
  };
}
