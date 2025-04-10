
import { useState, useCallback } from 'react';
import { supabase } from '@/backend/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useAiMemory } from './useAiMemory';
import { useAiLearning } from './useAiLearning';
import { useUserPreferences } from './useUserPreferences';

export function useEnhancedAiChat() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const { preferences } = useUserPreferences();
  const { storeInteraction, getRelevantMemories } = useAiMemory();
  const { getLearningModel } = useAiLearning();

  // Generate an AI response with memory and learning
  const generateResponse = useCallback(async (
    botName: string,
    botRole: string,
    userMessage: string,
    includeRelevantMemory: boolean = true,
    includeLearningContext: boolean = true
  ) => {
    if (!userMessage.trim()) return null;
    setIsLoading(true);
    
    try {
      // Add the user message to the conversation
      const userMsg = {
        id: `user-${Date.now()}`,
        content: userMessage,
        type: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMsg]);
      
      // Get relevant memories if requested
      let memoryContext = null;
      if (includeRelevantMemory && user?.id) {
        const relevantMemories = await getRelevantMemories(userMessage, botName, botRole, 3);
        if (relevantMemories.length > 0) {
          memoryContext = {
            previousInteractions: relevantMemories.map(m => 
              `USER: ${m.user_message}\n${botName}: ${m.bot_response}`
            ),
            userPreferences: preferences
          };
        }
      }
      
      // Get learning context if requested
      let learningFeedback = null;
      if (includeLearningContext) {
        const model = await getLearningModel(botName, botRole);
        if (model) {
          // Extract most relevant topic feedback
          const topics = model.topics || {};
          const relevantTopic = Object.entries(topics)
            .sort((a, b) => (b[1].positive + b[1].negative) - (a[1].positive + a[1].negative))
            .shift();
            
          if (relevantTopic) {
            const [topic, feedback] = relevantTopic;
            const isPositive = feedback.positive > feedback.negative;
            learningFeedback = {
              topic,
              positive: isPositive
            };
          }
        }
      }
      
      // Call the enhanced OpenAI function
      const { data, error } = await supabase.functions.invoke('openai', {
        body: {
          botName,
          botRole,
          prompt: userMessage,
          messages: [...messages, userMsg],
          preferences: preferences,
          memoryContext,
          learningFeedback
        }
      });
      
      if (error) throw error;
      
      // Add the bot's response to the conversation
      const botMsg = {
        id: `bot-${Date.now()}`,
        content: data.content,
        type: 'assistant',
        sender: botName,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMsg]);
      
      // Store the interaction in memory
      if (user?.id) {
        await storeInteraction(
          botName,
          botRole,
          userMessage,
          data.content,
          { timestamp: new Date().toISOString() }
        );
      }
      
      return data.content;
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast.error('Failed to generate AI response');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user, messages, preferences, storeInteraction, getRelevantMemories, getLearningModel]);

  // Clear the conversation
  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isLoading,
    messages,
    generateResponse,
    clearConversation
  };
}
