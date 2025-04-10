
import { useState, useCallback } from 'react';
import { supabase } from '@/backend/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function useAiMemory() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [recentMemories, setRecentMemories] = useState<any[]>([]);

  // Store an interaction in memory
  const storeInteraction = useCallback(async (
    botName: string,
    botRole: string,
    userMessage: string,
    botResponse: string,
    metadata: Record<string, any> = {}
  ) => {
    if (!user?.id) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('memory', {
        body: {
          action: 'store_interaction',
          userId: user.id,
          data: {
            botName,
            botRole,
            userMessage,
            botResponse,
            metadata
          }
        }
      });
      
      if (error) throw error;
      console.log('Interaction stored successfully');
      return data;
    } catch (error) {
      console.error('Error storing interaction:', error);
      toast.error('Failed to store interaction in memory');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Get relevant memories based on context
  const getRelevantMemories = useCallback(async (
    query: string,
    botName: string,
    botRole: string,
    limit: number = 5
  ) => {
    if (!user?.id) return [];
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('memory', {
        body: {
          action: 'get_relevant_memory',
          userId: user.id,
          data: {
            query,
            botName,
            botRole,
            limit
          }
        }
      });
      
      if (error) throw error;
      
      setRecentMemories(data.memories || []);
      return data.memories || [];
    } catch (error) {
      console.error('Error retrieving memories:', error);
      toast.error('Failed to retrieve relevant memories');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Provide feedback on an interaction
  const provideFeedback = useCallback(async (
    interactionId: string,
    feedback: 'positive' | 'negative' | null,
  ) => {
    if (!user?.id) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('memory', {
        body: {
          action: 'update_feedback',
          userId: user.id,
          data: {
            interactionId,
            feedback
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Feedback recorded');
      return data;
    } catch (error) {
      console.error('Error updating feedback:', error);
      toast.error('Failed to record feedback');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Get learning insights
  const getLearningInsights = useCallback(async () => {
    if (!user?.id) return null;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('memory', {
        body: {
          action: 'get_learning_insights',
          userId: user.id,
          data: {}
        }
      });
      
      if (error) throw error;
      
      return data.insightsSummary;
    } catch (error) {
      console.error('Error getting learning insights:', error);
      toast.error('Failed to retrieve learning insights');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return {
    isLoading,
    recentMemories,
    storeInteraction,
    getRelevantMemories,
    provideFeedback,
    getLearningInsights
  };
}
