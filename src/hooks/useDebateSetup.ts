
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

  const handleTopicChange = useCallback((value: string) => {
    setSelectedTopic(value);
    
    // Auto-fill title and objective based on selected topic
    const topic = debateTopics.find(t => t.id === value);
    if (topic) {
      setDebateTitle(`${topic.topic} Discussion`);
      setDebateObjective(`Evaluate and decide on the best approach for ${topic.topic.toLowerCase()}`);
    }
  }, []);

  const getSelectedTopicDetails = useCallback((): DebateTopic | undefined => {
    return debateTopics.find(t => t.id === selectedTopic);
  }, [selectedTopic]);

  return {
    selectedTopic,
    debateTitle,
    debateObjective,
    debateDuration,
    isDebateActive,
    riskAppetite,
    businessPriority,
    debateTopics,
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
