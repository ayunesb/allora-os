
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export function useAiMemory() {
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Store an interaction in the database for future reference
  const storeInteraction = useCallback(async (
    botName: string,
    botRole: string,
    userMessage: string, 
    botResponse: string,
    metadata: Record<string, any> = {}
  ) => {
    if (!user?.id) return false;
    
    setIsProcessing(true);
    try {
      // Store the interaction in the database
      const { error } = await supabase
        .from('bot_interactions')
        .insert([{
          user_id: user.id,
          bot_name: botName,
          bot_role: botRole,
          user_message: userMessage,
          bot_response: botResponse,
          metadata
        }]);
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error storing interaction:", error);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [user]);
  
  // Get relevant memories based on semantic search
  const getRelevantMemories = useCallback(async (
    userMessage: string,
    botName?: string,
    botRole?: string,
    limit: number = 5
  ) => {
    if (!user?.id) return [];
    
    try {
      // First, get embedding for the user's message
      const { data: embedding, error: embeddingError } = await supabase.functions.invoke('get-embedding', {
        body: { text: userMessage }
      });
      
      if (embeddingError) throw embeddingError;
      
      // Build the query to search for relevant memories
      let query = supabase
        .from('bot_interactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      // Add bot filters if provided
      if (botName) {
        query = query.eq('bot_name', botName);
      }
      
      if (botRole) {
        query = query.eq('bot_role', botRole);
      }
      
      // Execute the query
      const { data, error } = await query.limit(limit);
      
      if (error) throw error;
      
      // TODO: When vector search is implemented, replace with semantic search
      // For now, just return the most recent interactions
      return data || [];
    } catch (error) {
      console.error("Error retrieving relevant memories:", error);
      return [];
    }
  }, [user]);
  
  // Get all interactions with a specific bot
  const getBotInteractions = useCallback(async (
    botName: string,
    botRole?: string,
    limit: number = 20
  ) => {
    if (!user?.id) return [];
    
    try {
      let query = supabase
        .from('bot_interactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('bot_name', botName)
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (botRole) {
        query = query.eq('bot_role', botRole);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error("Error retrieving bot interactions:", error);
      return [];
    }
  }, [user]);
  
  // Clear all stored interactions with a specific bot
  const clearBotMemory = useCallback(async (
    botName: string,
    botRole?: string
  ) => {
    if (!user?.id) return false;
    
    try {
      let query = supabase
        .from('bot_interactions')
        .delete()
        .eq('user_id', user.id)
        .eq('bot_name', botName);
        
      if (botRole) {
        query = query.eq('bot_role', botRole);
      }
      
      const { error } = await query;
      
      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error("Error clearing bot memory:", error);
      return false;
    }
  }, [user]);

  return {
    isProcessing,
    storeInteraction,
    getRelevantMemories,
    getBotInteractions,
    clearBotMemory
  };
}
