
import { useState, useEffect, useCallback } from 'react';
import { 
  debateTopics, 
  getInitialParticipants, 
  generateBotResponse, 
  saveDebateSession 
} from '@/backend/debateManager';
import { 
  DebateSession, 
  DebateParticipant, 
  DebateMessage, 
  DebateTopic 
} from '@/utils/consultation/types';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export default function useDebateSession() {
  const [participants, setParticipants] = useState<DebateParticipant[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [isDebateActive, setIsDebateActive] = useState(false);
  const [debateTitle, setDebateTitle] = useState('');
  const [debateObjective, setDebateObjective] = useState('');
  const [debateDuration, setDebateDuration] = useState<string>('5');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { profile } = useAuth();

  // Initialize participants from executive bots
  useEffect(() => {
    const initialParticipants = getInitialParticipants(4);
    setParticipants(initialParticipants);
  }, []);

  const startDebate = useCallback(async () => {
    if (!selectedTopic || !debateTitle || !debateObjective) {
      toast.error('Please complete all debate setup fields');
      return;
    }

    setIsLoading(true);
    setIsDebateActive(true);
    setMessages([]);

    // First message from system (debate setup)
    const selectedTopicDetails = debateTopics.find(t => t.id === selectedTopic);
    
    const initialMessage: DebateMessage = {
      id: `msg-${Date.now()}`,
      sender: 'System',
      senderId: 'system',
      content: `Debate started: ${debateTitle}\n\nObjective: ${debateObjective}\n\nTopic: ${selectedTopicDetails?.topic || selectedTopic}`,
      timestamp: new Date(),
    };
    
    setMessages([initialMessage]);
    
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
    
    // Schedule first round of bot messages
    simulateBotResponses();
  }, [selectedTopic, debateTitle, debateObjective, debateDuration, participants, profile]);

  const simulateBotResponses = useCallback(() => {
    // Simulate bot messages with slight delays between each
    participants.forEach((bot, index) => {
      setTimeout(() => {
        const botMessage = generateBotMessage(bot);
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, (index + 1) * 2500); // Stagger responses
    });
  }, [participants]);

  const generateBotMessage = useCallback((bot: DebateParticipant): DebateMessage => {
    const topicDetails = debateTopics.find(t => t.id === selectedTopic);
    const topic = topicDetails?.topic || selectedTopic;
    
    // Generate a response using the backend service
    const content = generateBotResponse(bot, topic);
    
    return {
      id: `msg-${Date.now()}-${bot.id}`,
      sender: bot.name,
      senderId: bot.id,
      content,
      timestamp: new Date()
    };
  }, [selectedTopic]);

  const sendUserMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: DebateMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'You',
      senderId: 'user',
      content,
      timestamp: new Date(),
      isUser: true
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Trigger bot responses
    setTimeout(() => {
      simulateBotResponses();
    }, 1000);
  }, [simulateBotResponses]);

  const handleTopicChange = useCallback((value: string) => {
    setSelectedTopic(value);
    
    // Auto-fill title and objective based on selected topic
    const topic = debateTopics.find(t => t.id === value);
    if (topic) {
      setDebateTitle(`${topic.topic} Discussion`);
      setDebateObjective(`Evaluate and decide on the best approach for ${topic.topic.toLowerCase()}`);
    }
  }, []);

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
    simulateBotResponses,
    sendUserMessage,
    setSelectedTopic: handleTopicChange,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setParticipants,
  };
}
