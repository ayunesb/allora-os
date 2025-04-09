
import { useCallback, useState } from 'react';
import { saveDebateSession } from '@/backend/debateManager';
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
    setParticipants
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
    debateTopics,
    setSelectedTopic,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setIsDebateActive,
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
    
    const initialMessage = addSystemMessage(
      `Debate started: ${debateTitle}\n\nObjective: ${debateObjective}\n\nTopic: ${selectedTopicDetails?.topic || selectedTopic}`
    );
    
    // Create session object
    const sessionData: Omit<DebateSession, 'id' | 'created_at'> = {
      title: debateTitle,
      objective: debateObjective,
      topic: selectedTopicDetails || { id: selectedTopic, topic: selectedTopic, description: '' },
      participants,
      messages: [initialMessage],
      duration: parseInt(debateDuration, 10),
      company_id: profile?.company_id || 'unknown'
    };
    
    // Save the session
    const id = await saveDebateSession(sessionData);
    setSessionId(id);
    
    setIsLoading(false);
    
    // Schedule first round of bot responses
    simulateBotResponses(participants, selectedTopicDetails?.topic || selectedTopic);
  }, [
    selectedTopic, 
    debateTitle, 
    debateObjective, 
    debateDuration, 
    participants, 
    profile, 
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
    sendMessage(content, participants, topic);
  }, [sendMessage, participants, selectedTopic, getSelectedTopicDetails]);

  return {
    participants,
    selectedTopic,
    messages,
    isDebateActive,
    debateTitle,
    debateObjective,
    debateDuration,
    isLoading,
    sessionId,
    debateTopics,
    startDebate,
    simulateBotResponses: () => {
      const topicDetails = getSelectedTopicDetails();
      const topic = topicDetails?.topic || selectedTopic;
      simulateBotResponses(participants, topic);
    },
    sendUserMessage,
    setSelectedTopic,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setParticipants,
  };
}
