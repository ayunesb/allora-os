
import { useState, useCallback } from 'react';
import { Strategy } from '@/models/strategy';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { handleApiError } from '@/utils/api/errorHandling';

interface DebateMessage {
  id: string;
  sender: string;
  content: string;
  avatar?: string;
  role?: string;
}

interface DebateSession {
  id: string;
  strategyId: string;
  messages: DebateMessage[];
  consensus?: string;
}

export function useExecutiveDebate() {
  const [debate, setDebate] = useState<DebateSession | null>(null);
  const [isGeneratingDebate, setIsGeneratingDebate] = useState<boolean>(false);
  const { user } = useAuthState();
  
  const generateDebate = useCallback(async (strategy: Strategy) => {
    if (!strategy) {
      toast.error('No strategy selected for debate');
      return;
    }
    
    setIsGeneratingDebate(true);
    
    try {
      // In a real implementation, this would call an API to generate the debate
      // For now, we'll simulate a delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock debate generation - in a real implementation, this would come from the API
      const mockDebateSession: DebateSession = {
        id: `debate-${Date.now()}`,
        strategyId: strategy.id,
        messages: [],
        consensus: ''
      };
      
      setDebate(mockDebateSession);
    } catch (err: any) {
      console.error('Error generating debate:', err);
      handleApiError(err, { customMessage: 'Failed to generate executive debate' });
    } finally {
      setIsGeneratingDebate(false);
    }
  }, []);

  return {
    debate,
    isGeneratingDebate,
    generateDebate
  };
}
