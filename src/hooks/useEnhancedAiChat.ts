
import { useState, useCallback } from 'react';
import { supabase } from '@/backend/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { useAiMemory } from './useAiMemory';
import { useAiLearning } from './useAiLearning';
import { useUserPreferences } from './useUserPreferences';
import { useAiModelPreferences, AiModelType } from './useAiModelPreferences';

export function useEnhancedAiChat() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const { preferences } = useUserPreferences();
  const { preferences: modelPreferences } = useAiModelPreferences();
  const { storeInteraction, getRelevantMemories } = useAiMemory();
  const { getLearningModel } = useAiLearning();

  // Generate an AI response with memory and learning
  const generateResponse = useCallback(async (
    botName: string,
    botRole: string,
    userMessage: string,
    includeRelevantMemory: boolean = true,
    includeLearningContext: boolean = true,
    modelOverride?: AiModelType
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
      if (includeRelevantMemory && user?.id && modelPreferences.enableVectorSearch) {
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
      if (includeLearningContext && modelPreferences.enableLearning) {
        const model = await getLearningModel(botName, botRole);
        if (model) {
          // Extract most relevant topic feedback
          const topics = model.topics as Record<string, { positive: number, negative: number }> || {};
          const relevantTopic = Object.entries(topics)
            .sort((a, b) => {
              const [, aFeedback] = a;
              const [, bFeedback] = b;
              return (bFeedback.positive + bFeedback.negative) - (aFeedback.positive + aFeedback.negative);
            })
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
      
      // Determine which model to use
      const modelToUse = modelOverride || modelPreferences.defaultModel;
      
      // Call the enhanced multi-model AI function
      const { data, error } = await supabase.functions.invoke('multi-model-ai', {
        body: {
          botName,
          botRole,
          prompt: userMessage,
          messages: [...messages, userMsg],
          preferences: preferences,
          memoryContext,
          learningFeedback,
          modelPreference: modelToUse
        }
      });
      
      if (error) throw error;
      
      // Add the bot's response to the conversation
      const botMsg = {
        id: `bot-${Date.now()}`,
        content: data.content,
        model: data.model,
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
          { timestamp: new Date().toISOString(), model: data.model }
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
  }, [user, messages, preferences, modelPreferences, storeInteraction, getRelevantMemories, getLearningModel]);

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
