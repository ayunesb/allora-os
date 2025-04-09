
import { useCallback, useState } from 'react';
import { saveDebateSession, generateDebateSummary } from '@/backend/debate';
import { DebateSession } from '@/utils/consultation/types';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import useDebateParticipants from './useDebateParticipants';
import useDebateMessages from './useDebateMessages';
import useDebateSetup from './useDebateSetup';

export default function useDebateSession() {
  const { profile } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const {
    participants,
    setParticipants,
    availableExecutives
  } = useDebateParticipants();
  
  const {
    messages,
    isLoading,
    setIsLoading,
    setMessages,
    addSystemMessage,
    simulateBotResponses,
    sendUserMessage: sendMessage
  } = useDebateMessages();
  
  const {
    selectedTopic,
    debateTitle,
    debateObjective,
    debateDuration,
    isDebateActive,
    riskAppetite,
    businessPriority,
    debateTopics,
    setSelectedTopic,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setIsDebateActive,
    setRiskAppetite,
    setBusinessPriority,
    getSelectedTopicDetails
  } = useDebateSetup();

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

  const sendUserMessage = useCallback((content: string) => {
    const topicDetails = getSelectedTopicDetails();
    const topic = topicDetails?.topic || selectedTopic;
    sendMessage(content, participants, topic, riskAppetite, businessPriority);
  }, [sendMessage, participants, selectedTopic, riskAppetite, businessPriority, getSelectedTopicDetails]);

  return {
    participants,
    selectedTopic,
    messages,
    isDebateActive,
    debateTitle,
    debateObjective,
    debateDuration,
    riskAppetite,
    businessPriority,
    isLoading,
    sessionId,
    debateTopics,
    availableExecutives,
    startDebate,
    simulateBotResponses: () => {
      const topicDetails = getSelectedTopicDetails();
      const topic = topicDetails?.topic || selectedTopic;
      simulateBotResponses(participants, topic, riskAppetite, businessPriority);
    },
    sendUserMessage,
    setSelectedTopic,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setRiskAppetite,
    setBusinessPriority,
    setParticipants,
  };
}
