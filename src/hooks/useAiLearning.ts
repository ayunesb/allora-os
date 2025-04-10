
import { useState, useCallback } from 'react';
import { supabase } from '@/backend/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export function useAiLearning() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Track feedback on an AI response
  const trackFeedback = useCallback(async (
    interactionId: string | undefined,
    messageId: string | undefined,
    botName: string,
    botRole: string,
    isPositive: boolean,
    comment?: string,
    metadata: Record<string, any> = {}
  ) => {
    if (!user?.id) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('learning', {
        body: {
          action: 'track_feedback',
          userId: user.id,
          data: {
            interactionId: interactionId || `interaction-${Date.now()}`,
            messageId: messageId || `message-${Date.now()}`,
            botName,
            botRole,
            isPositive,
            comment,
            metadata
          }
        }
      });
      
      if (error) throw error;
      
      toast.success(isPositive ? 'Positive feedback recorded' : 'Feedback recorded');
      return data;
    } catch (error) {
      console.error('Error tracking feedback:', error);
      toast.error('Failed to record feedback');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Get the learning model for a specific bot
  const getLearningModel = useCallback(async (
    botName: string,
    botRole: string
  ) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('learning', {
        body: {
          action: 'get_learning_model',
          userId: user?.id || 'anonymous',
          data: {
            botName,
            botRole
          }
        }
      });
      
      if (error) throw error;
      
      return data.model;
    } catch (error) {
      console.error('Error getting learning model:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Get user preferences based on learning
  const getUserPreferences = useCallback(async () => {
    if (!user?.id) return null;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('learning', {
        body: {
          action: 'get_user_preferences',
          userId: user.id,
          data: {}
        }
      });
      
      if (error) throw error;
      
      return data.preferences;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Update user preferences explicitly
  const updateUserPreferences = useCallback(async (
    preferences: Record<string, any>
  ) => {
    if (!user?.id) return;
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('learning', {
        body: {
          action: 'update_user_preferences',
          userId: user.id,
          data: {
            preferences
          }
        }
      });
      
      if (error) throw error;
      
      toast.success('Preferences updated');
      return data;
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to update preferences');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  return {
    isLoading,
    trackFeedback,
    getLearningModel,
    getUserPreferences,
    updateUserPreferences
  };
}
