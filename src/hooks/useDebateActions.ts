
import { useCallback } from 'react';
import { saveDebateSession } from '@/backend/debate';
import { DebateSession, DebateParticipant, DebateTopic } from '@/utils/consultation/types';
import { toast } from 'sonner';

export default function useDebateActions(
  options: {
    sessionId: string | null;
    setSessionId: (id: string | null) => void;
    profile: any;
    participants: DebateParticipant[];
    selectedTopic: string;
    messages: any[];
    debateTitle: string;
    debateObjective: string;
    debateDuration: string;
    riskAppetite: 'low' | 'medium' | 'high';
    businessPriority: string;
    addSystemMessage: (content: string) => any;
    setIsLoading: (isLoading: boolean) => void;
    setIsDebateActive: (isActive: boolean) => void;
    setMessages: (messages: any[]) => void;
    simulateBotResponses: (
      participants: DebateParticipant[], 
      topic: string, 
      riskAppetite?: string, 
      businessPriority?: string
    ) => void;
    getSelectedTopicDetails: () => DebateTopic | undefined;
  }
) {
  const {
    sessionId,
    setSessionId,
    profile,
    participants,
    selectedTopic,
    messages,
    debateTitle,
    debateObjective,
    debateDuration,
    riskAppetite,
    businessPriority,
    addSystemMessage,
    setIsLoading,
    setIsDebateActive,
    setMessages,
    simulateBotResponses,
    getSelectedTopicDetails
  } = options;

  const startDebate = useCallback(async () => {
    if (!selectedTopic || !debateTitle || !debateObjective) {
      toast.error('Please complete all debate setup fields');
      return;
    }

    setIsLoading(true);
    setIsDebateActive(true);
    setMessages([]);

    // First message from system (debate setup)
    const selectedTopicDetails = getSelectedTopicDetails();
    
    // Include risk appetite and business priority in the initial message
    const initialMessage = addSystemMessage(
      `Debate started: ${debateTitle}\n\nObjective: ${debateObjective}\n\nTopic: ${selectedTopicDetails?.topic || selectedTopic}\n\nRisk Appetite: ${riskAppetite}\n\nBusiness Priority: ${businessPriority}`
    );
    
    // Create session object
    const sessionData: Omit<DebateSession, 'id' | 'created_at'> = {
      title: debateTitle,
      objective: debateObjective,
      topic: selectedTopicDetails || { id: selectedTopic, topic: selectedTopic, description: '' },
      participants,
      messages: [initialMessage],
      duration: parseInt(debateDuration, 10),
      company_id: profile?.company_id || 'unknown',
      riskAppetite,
      businessPriority
    };
    
    // Save the session
    const id = await saveDebateSession(sessionData);
    setSessionId(id);
    
    setIsLoading(false);
    
    // Schedule first round of bot responses
    simulateBotResponses(participants, selectedTopicDetails?.topic || selectedTopic, riskAppetite, businessPriority);
  }, [
    selectedTopic, 
    debateTitle, 
    debateObjective, 
    debateDuration, 
    participants, 
    profile, 
    riskAppetite,
    businessPriority,
    setIsLoading, 
    setIsDebateActive, 
    setMessages, 
    addSystemMessage, 
    simulateBotResponses, 
    getSelectedTopicDetails
  ]);

  const sendUserMessage = useCallback((
    content: string, 
    participants: DebateParticipant[], 
    topic: string,
    riskAppetite: string,
    businessPriority: string,
    sendMessage: (
      content: string, 
      participants: DebateParticipant[], 
      topic: string,
      riskAppetite?: string,
      businessPriority?: string
    ) => void
  ) => {
    const topicDetails = getSelectedTopicDetails();
    const topicName = topicDetails?.topic || topic;
    sendMessage(content, participants, topicName, riskAppetite, businessPriority);
  }, [getSelectedTopicDetails]);

  return {
    startDebate,
    sendUserMessage
  };
}
