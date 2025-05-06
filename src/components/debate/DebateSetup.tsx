import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import TopicSelector from "./TopicSelector";
import DebateParameters from "./DebateParameters";
import ParticipantsList from "./ParticipantsList";
import ExecutiveSelectionDialog from "./ExecutiveSelectionDialog";
const DebateSetup = ({
  participants = [], // Add default for participants
  selectedTopic = "",
  debateTopics = [], // Add default empty array for debateTopics
  debateTitle = "",
  debateObjective = "",
  debateDuration = "",
  isLoading = false,
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
  const handleParticipantsChange = (newParticipants) => {
    if (onParticipantsChange) {
      onParticipantsChange(newParticipants);
    }
  };
  // Ensure debateTopics is an array
  const safeDebateTopics = Array.isArray(debateTopics) ? debateTopics : [];
  const handleStartDebate = () => {
    onStartDebate();
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
          debateTopics={safeDebateTopics}
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
          onClick={handleStartDebate}
          disabled={
            !selectedTopic || !debateTitle || !debateObjective || isLoading
          }
          className="ml-auto"
        >
          {isLoading ? "Starting Debate..." : "Start Debate"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DebateSetup;
