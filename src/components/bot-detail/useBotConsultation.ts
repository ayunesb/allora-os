
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useProtectedApi } from "@/hooks/useProtectedApi";
import { getBotExpertise, formatRoleTitle } from "@/utils/consultation";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useAuth } from "@/context/AuthContext";
import { 
  getConversationMemory, 
  storeConversationMemory 
} from "@/utils/conversation/conversationMemory";

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
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);
  const { preferences } = useUserPreferences();
  const { profile } = useAuth();

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
        industry: industry || undefined
      });
      setError(null);
    } catch (err) {
      console.error("Failed to initialize bot:", err);
      setBot(null);
      setError("Failed to initialize advisor. Please try again later.");
    }
  }, [botName, role, industry]);

  // Reset state when bot changes
  useEffect(() => {
    if (botName && role) {
      setMessages([]);
      setError(null);
      setRetryCount(0);
      
      // Load previous conversation if available
      if (profile?.id) {
        loadPreviousConversation(profile.id, `${botName}-${role}`);
      }
    }
  }, [botName, role, profile?.id]);

  // Load previous conversation from memory
  const loadPreviousConversation = async (userId: string, botId: string) => {
    try {
      const memory = await getConversationMemory(userId, botId);
      
      if (memory && memory.memoryContext.previousInteractions.length > 0) {
        // Convert memory format to messages
        const historicalMessages: Message[] = [];
        
        memory.memoryContext.previousInteractions.forEach(interaction => {
          if (interaction.startsWith('User: ')) {
            historicalMessages.push({
              id: `user-${Date.now()}-${Math.random()}`,
              content: interaction.replace('User: ', ''),
              sender: "user",
              timestamp: new Date(memory.lastUpdated)
            });
          } else if (interaction.includes(': ')) {
            const [, content] = interaction.split(': ', 2);
            historicalMessages.push({
              id: `bot-${Date.now()}-${Math.random()}`,
              content,
              sender: "bot",
              timestamp: new Date(memory.lastUpdated)
            });
          }
        });
        
        if (historicalMessages.length > 0) {
          setMessages(historicalMessages);
          toast.info("Previous conversation loaded");
        }
      }
    } catch (error) {
      console.error("Failed to load previous conversation:", error);
    }
  };

  // Initialize Web Speech API for voice interface
  useEffect(() => {
    if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
      console.warn("Speech synthesis not supported in this browser");
      return;
    }

    const speechUtterance = new SpeechSynthesisUtterance();
    speechUtterance.rate = 1.0;
    speechUtterance.pitch = 1.0;
    speechUtterance.volume = 1.0;
    
    speechUtterance.onend = () => {
      setIsTyping(false);
    };
    
    speechUtterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsTyping(false);
    };
    
    setSpeech(speechUtterance);
    
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Toggle voice interface
  const toggleVoiceInterface = useCallback(() => {
    setIsVoiceEnabled(prev => !prev);
    toast.info(isVoiceEnabled ? "Voice interface disabled" : "Voice interface enabled");
  }, [isVoiceEnabled]);

  // Start voice recognition
  const startVoiceRecognition = useCallback(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => {
      setIsListening(true);
      toast.info("Listening...");
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSendMessage(transcript);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      setIsListening(false);
      toast.error("Failed to recognize speech");
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  }, []);

  const { execute: fetchBotResponse } = useProtectedApi<string, string>(
    async (userMessage) => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Get memory context if available
      let memoryContext = null;
      if (profile?.id && botName && role) {
        const memory = await getConversationMemory(profile.id, `${botName}-${role}`);
        memoryContext = memory?.memoryContext || null;
      }
      
      // In a real application, we would make an API call here with memory context
      // For now, we'll just return a mock response
      const mockResponses = [
        `Thank you for your message. Based on my analysis and ${preferences.technicalLevel === 'advanced' ? 'in-depth technical assessment' : 'business expertise'}, I would recommend exploring this further.`,
        `I've considered your question carefully. ${preferences.responseStyle === 'detailed' ? 'My professional assessment indicates' : 'I think'} we should approach this systematically.`,
        `That's an interesting point. ${preferences.showSources ? 'According to recent industry reports (Harvard Business Review, 2024),' : ''} this strategy could yield significant results for your business.`,
      ];
      
      // Select a random response
      const randomIndex = Math.floor(Math.random() * mockResponses.length);
      const response = mockResponses[randomIndex];
      
      // Store interaction in memory
      if (profile?.id && botName && role) {
        await storeConversationMemory(
          profile.id,
          `${botName}-${role}`,
          userMessage,
          response
        );
      }
      
      return response;
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
        
        // If voice interface is enabled, speak the response
        if (isVoiceEnabled && speech && window.speechSynthesis) {
          speech.text = response;
          window.speechSynthesis.speak(speech);
        }
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
    isVoiceEnabled,
    isListening,
    handleSendMessage,
    retryLastMessage,
    clearConversation,
    toggleVoiceInterface,
    startVoiceRecognition
  };
}
