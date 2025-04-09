
import { useState, useEffect } from "react";
import { 
  ConsultationMessage, 
  getBotByNameAndRole, 
  generateBotResponse, 
  saveConsultationMessage, 
  startNewConsultation 
} from "@/utils/consultation";
import { useUserPreferences } from "@/hooks/useUserPreferences";

export function useBotConsultation(botName?: string, role?: string) {
  const [messages, setMessages] = useState<ConsultationMessage[]>([]);
  const [consultationId, setConsultationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { preferences } = useUserPreferences();
  
  const bot = botName && role ? getBotByNameAndRole(botName, role) : null;

  useEffect(() => {
    async function initConsultation() {
      if (botName && role) {
        const newConsultationId = await startNewConsultation(botName, role);
        setConsultationId(newConsultationId);
      }
    }
    
    initConsultation();
  }, [botName, role]);

  async function handleSendMessage(inputMessage: string) {
    if (!inputMessage.trim() || !consultationId || !botName || !role) return;
    
    setIsLoading(true);
    
    const userMessage: ConsultationMessage = {
      type: "user",
      content: inputMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    await saveConsultationMessage(consultationId, {
      type: "user",
      content: inputMessage
    });
    
    try {
      // Pass user preferences to the response generator
      const responseContent = await generateBotResponse(
        botName, 
        role, 
        inputMessage, 
        messages,
        undefined, // No debate context
        preferences // Pass user preferences
      );
      
      const botMessage: ConsultationMessage = {
        type: "bot",
        content: responseContent,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      await saveConsultationMessage(consultationId, {
        type: "bot",
        content: responseContent
      });
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    bot,
    messages,
    isLoading,
    handleSendMessage
  };
}
