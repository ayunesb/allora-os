
import { useState, useCallback } from 'react';
import { Strategy } from '@/models/strategy';
import { toast } from 'sonner';
import { useAuthState } from '@/hooks/useAuthState';
import { handleApiError } from '@/utils/api/errorHandling';
import { formatRoleTitle } from '@/utils/consultation';

export interface DebateExecutive {
  name: string;
  role: string;
  avatar: string;
}

export interface DebateMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  executive: DebateExecutive;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface DebateSummary {
  keyFindings: string[];
  agreedPoints: string[];
  disagreedPoints: string[];
  finalDecision: string;
}

export interface DebateSession {
  id: string;
  strategyId: string;
  messages: DebateMessage[];
  consensus?: string;
}

export function useExecutiveDebate() {
  const [debate, setDebate] = useState<DebateSession | null>(null);
  const [isGeneratingDebate, setIsGeneratingDebate] = useState<boolean>(false);
  const [debateMessages, setDebateMessages] = useState<DebateMessage[]>([]);
  const [debateSummary, setDebateSummary] = useState<DebateSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useAuthState();
  
  const generateDebate = useCallback(async (strategy: Strategy) => {
    if (!strategy) {
      toast.error('No strategy selected for debate');
      return;
    }
    
    setIsGeneratingDebate(true);
    setIsLoading(true);
    
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
      
      // Generate mock debate messages
      const mockMessages: DebateMessage[] = [
        {
          id: '1',
          sender: 'Elon Musk',
          content: `I think the "${strategy.title}" strategy has significant potential, especially if we approach it with an innovative mindset. We should be willing to disrupt the existing market paradigms.`,
          timestamp: new Date(Date.now() - 300000),
          executive: {
            name: 'Elon Musk',
            role: 'ceo',
            avatar: '/avatars/elon-musk.png'
          },
          sentiment: 'positive'
        },
        {
          id: '2',
          sender: 'Warren Buffett',
          content: `I appreciate the enthusiasm, but I'm concerned about the ${strategy.risk || 'medium'} risk profile. We should consider ways to mitigate potential downside while preserving upside potential.`,
          timestamp: new Date(Date.now() - 240000),
          executive: {
            name: 'Warren Buffett',
            role: 'cfo',
            avatar: '/avatars/warren-buffett.png'
          },
          sentiment: 'negative'
        },
        {
          id: '3',
          sender: 'Satya Nadella',
          content: "We need to consider how this fits into our digital transformation goals. I suggest we build in quarterly reassessment points to ensure we're adapting to market changes.",
          timestamp: new Date(Date.now() - 180000),
          executive: {
            name: 'Satya Nadella',
            role: 'strategy',
            avatar: '/avatars/satya-nadella.png'
          },
          sentiment: 'neutral'
        },
        {
          id: '4',
          sender: 'Elon Musk',
          content: 'Good point. Perhaps we should take a phased approach - start with a smaller pilot to validate our assumptions before full implementation.',
          timestamp: new Date(Date.now() - 120000),
          executive: {
            name: 'Elon Musk',
            role: 'ceo',
            avatar: '/avatars/elon-musk.png'
          },
          sentiment: 'positive'
        }
      ];
      
      // Generate mock debate summary
      const mockSummary: DebateSummary = {
        keyFindings: [
          'The strategy has strong market potential with proper execution',
          'A phased implementation approach reduces initial risk exposure',
          'Regular reassessment will be critical to long-term success',
          'Digital transformation components should be prioritized'
        ],
        agreedPoints: [
          'A pilot phase should precede full implementation',
          'Market disruption opportunity exists in this space',
          'Digital components are essential to success'
        ],
        disagreedPoints: [
          'Level of initial investment required',
          'Timeline for expected ROI',
          'Risk appetite for more innovative elements'
        ],
        finalDecision: `After thorough discussion, the executive team recommends proceeding with the "${strategy.title}" strategy using a phased implementation approach, starting with a focused pilot program to validate key assumptions before scaling.`
      };
      
      setDebate(mockDebateSession);
      setDebateMessages(mockMessages);
      setDebateSummary(mockSummary);
    } catch (err: any) {
      console.error('Error generating debate:', err);
      handleApiError(err, { customMessage: 'Failed to generate executive debate' });
    } finally {
      setIsGeneratingDebate(false);
      setIsLoading(false);
    }
  }, []);

  return {
    debate,
    isGeneratingDebate,
    generateDebate,
    debateMessages,
    debateSummary,
    isLoading
  };
}
