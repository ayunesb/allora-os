
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DebateParticipant, DebateTopic } from '@/utils/consultation/types';
import TopicSelector from './TopicSelector';
import DebateParameters from './DebateParameters';
import ParticipantsList from './ParticipantsList';
import ExecutiveSelectionDialog from './ExecutiveSelectionDialog';

interface DebateSetupProps {
  participants: DebateParticipant[];
  selectedTopic: string;
  debateTopics: DebateTopic[];
  debateTitle: string;
  debateObjective: string;
  debateDuration: string;
  isLoading: boolean;
  onTopicChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onObjectiveChange: (value: string) => void;
  onDurationChange: (value: string) => void;
  onStartDebate: () => void;
  onParticipantsChange?: (participants: DebateParticipant[]) => void;
}

const DebateSetup: React.FC<DebateSetupProps> = ({
  participants,
  selectedTopic,
  debateTopics,
  debateTitle,
  debateObjective,
  debateDuration,
  isLoading,
  onTopicChange,
  onTitleChange,
  onObjectiveChange,
  onDurationChange,
  onStartDebate,
  onParticipantsChange,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleEditParticipants = () => {
    setIsDialogOpen(true);
  };
  
  const handleParticipantsChange = (newParticipants: DebateParticipant[]) => {
    if (onParticipantsChange) {
      onParticipantsChange(newParticipants);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Debate Setup</CardTitle>
        <CardDescription>
          Configure the AI executive debate parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TopicSelector 
          selectedTopic={selectedTopic}
          debateTopics={debateTopics}
          onTopicChange={onTopicChange}
        />
        
        <DebateParameters 
          debateTitle={debateTitle}
          debateObjective={debateObjective}
          debateDuration={debateDuration}
          onTitleChange={onTitleChange}
          onObjectiveChange={onObjectiveChange}
          onDurationChange={onDurationChange}
        />
        
        <ParticipantsList 
          participants={participants} 
          onEditParticipants={handleEditParticipants}
        />
        
        <ExecutiveSelectionDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          selectedExecutives={participants}
          onExecutivesChange={handleParticipantsChange}
        />
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onStartDebate} 
          disabled={!selectedTopic || !debateTitle || !debateObjective || isLoading}
          className="ml-auto"
        >
          {isLoading ? 'Starting Debate...' : 'Start Debate'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DebateSetup;
