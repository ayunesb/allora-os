import React from "react";
import { DebateParticipant, DebateTopic } from "@/utils/consultation/types";
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
declare const DebateSetup: React.FC<DebateSetupProps>;
export default DebateSetup;
