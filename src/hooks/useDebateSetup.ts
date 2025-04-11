
import { useState, useCallback } from 'react';
import { debateTopics } from '@/backend/debateManager';
import { DebateTopic } from '@/utils/consultation/types';

export default function useDebateSetup() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [debateTitle, setDebateTitle] = useState('');
  const [debateObjective, setDebateObjective] = useState('');
  const [debateDuration, setDebateDuration] = useState<string>('5');
  const [isDebateActive, setIsDebateActive] = useState(false);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  const [businessPriority, setBusinessPriority] = useState<string>('growth');
  const [customTopics, setCustomTopics] = useState<DebateTopic[]>([]);

  // Combine predefined and custom topics
  const getAllDebateTopics = useCallback(() => {
    return [...debateTopics, ...customTopics];
  }, [customTopics]);

  const handleTopicChange = useCallback((value: string) => {
    setSelectedTopic(value);
    
    // Check if this is a predefined topic
    const existingTopic = getAllDebateTopics().find(t => t.id === value);
    
    if (existingTopic) {
      // Auto-fill title and objective based on selected topic
      setDebateTitle(`${existingTopic.topic} Discussion`);
      setDebateObjective(`Evaluate and decide on the best approach for ${existingTopic.topic.toLowerCase()}`);
    } else {
      // This is a custom topic (value should be the topic text itself)
      // Add it to custom topics if not already there
      if (!customTopics.some(t => t.id === value)) {
        const newCustomTopic: DebateTopic = {
          id: value,
          topic: value,
          description: "Custom topic"
        };
        
        setCustomTopics(prev => [...prev, newCustomTopic]);
        setDebateTitle(`${value} Discussion`);
        setDebateObjective(`Evaluate and decide on the best approach for ${value.toLowerCase()}`);
      }
    }
  }, [customTopics, getAllDebateTopics]);

  const getSelectedTopicDetails = useCallback((): DebateTopic | undefined => {
    return getAllDebateTopics().find(t => t.id === selectedTopic);
  }, [selectedTopic, getAllDebateTopics]);

  return {
    selectedTopic,
    debateTitle,
    debateObjective,
    debateDuration,
    isDebateActive,
    riskAppetite,
    businessPriority,
    debateTopics: getAllDebateTopics(),
    setSelectedTopic: handleTopicChange,
    setDebateTitle,
    setDebateObjective,
    setDebateDuration,
    setIsDebateActive,
    setRiskAppetite,
    setBusinessPriority,
    getSelectedTopicDetails
  };
}
