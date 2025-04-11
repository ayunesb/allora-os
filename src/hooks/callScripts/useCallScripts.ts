
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { CallScript, CallScriptType } from './types';
import { getDefaultScripts } from './scriptGenerators';
import { createAiGeneratedScripts, createExecutiveCollectiveScripts } from './scriptFactory';

export function useCallScripts() {
  const [scripts, setScripts] = useState<CallScript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeScriptId, setActiveScriptId] = useState<string | null>(null);
  const { user, profile } = useAuth();
  
  // Fetch scripts from database and generate AI scripts
  const fetchScripts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: dbScripts, error } = await supabase
        .from('call_scripts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Get company info for AI-generated scripts
      const companyName = profile?.company || '';
      const industry = profile?.industry || '';
      
      // Get default scripts
      const defaultScripts = getDefaultScripts();
      
      // Fetch AI insights for script generation
      const { data: insights, error: insightsError } = await supabase
        .from('bot_insights')
        .select('*')
        .eq('type', 'call_script')
        .eq('company_id', profile?.company_id)
        .order('created_at', { ascending: false })
        .limit(5);
        
      if (insightsError) {
        console.error('Error fetching insights:', insightsError);
      }
      
      // Generate AI scripts based on insights
      const aiScripts = createAiGeneratedScripts(
        insights || [], 
        companyName,
        industry
      );
      
      // Generate executive scripts based on company profile
      const executiveScripts = createExecutiveCollectiveScripts(
        companyName,
        industry,
        profile?.company_size || 'Small',
        profile?.risk_appetite || 'medium'
      );
      
      // Combine all scripts
      const allScripts = [
        ...(dbScripts || []).map(script => ({
          ...script,
          aiGenerated: script.ai_generated
        })) as CallScript[],
        ...defaultScripts,
        ...aiScripts,
        ...executiveScripts
      ];
      
      setScripts(allScripts);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      toast.error('Failed to load communication scripts');
    } finally {
      setIsLoading(false);
    }
  }, [profile]);
  
  useEffect(() => {
    if (user) {
      fetchScripts();
    }
  }, [user, fetchScripts]);
  
  const getActiveScript = useCallback(() => {
    if (!activeScriptId) return null;
    return scripts.find(script => script.id === activeScriptId) || null;
  }, [scripts, activeScriptId]);
  
  const saveScript = useCallback(async (script: Omit<CallScript, 'id'>) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('call_scripts')
        .insert([{
          title: script.title,
          content: script.content,
          target: script.target,
          duration: script.duration,
          status: script.status,
          type: script.type,
          ai_generated: script.aiGenerated || false,
          user_id: user.id,
          company_id: profile?.company_id
        }])
        .select()
        .single();
        
      if (error) throw error;
      
      toast.success('Script saved successfully');
      fetchScripts();
      
      return data;
    } catch (error) {
      console.error('Error saving script:', error);
      toast.error('Failed to save script');
      return null;
    }
  }, [user, profile, fetchScripts]);
  
  const deleteScript = useCallback(async (scriptId: string) => {
    try {
      // First check if the script exists in the database
      const { data } = await supabase
        .from('call_scripts')
        .select('id')
        .eq('id', scriptId)
        .single();
        
      if (data) {
        // If it exists in the database, delete it
        const { error } = await supabase
          .from('call_scripts')
          .delete()
          .eq('id', scriptId);
          
        if (error) throw error;
      }
      
      // Remove from local state regardless
      setScripts(prev => prev.filter(s => s.id !== scriptId));
      
      // If the deleted script was active, clear the active script
      if (activeScriptId === scriptId) {
        setActiveScriptId(null);
      }
      
      toast.success('Script deleted');
      return true;
    } catch (error) {
      console.error('Error deleting script:', error);
      toast.error('Failed to delete script');
      return false;
    }
  }, [activeScriptId]);
  
  const getScriptsByType = useCallback((type: CallScriptType) => {
    return scripts.filter(script => script.type === type);
  }, [scripts]);
  
  const getScriptsByCategory = useCallback((category: 'ai' | 'executive' | 'user') => {
    switch (category) {
      case 'ai':
        return scripts.filter(script => script.aiGenerated);
      case 'executive':
        return scripts.filter(script => script.executiveGenerated);
      case 'user':
        return scripts.filter(script => !script.aiGenerated && !script.executiveGenerated);
      default:
        return [];
    }
  }, [scripts]);
  
  return {
    scripts,
    isLoading,
    activeScriptId,
    setActiveScriptId,
    getActiveScript,
    saveScript,
    deleteScript,
    refreshScripts: fetchScripts,
    getScriptsByType,
    getScriptsByCategory,
    callScripts: getScriptsByType('call'),
    messageScripts: getScriptsByType('message')
  };
}
