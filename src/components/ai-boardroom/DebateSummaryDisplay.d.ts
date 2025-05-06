import React from "react";
import { DebateParticipant } from "@/utils/consultation/types";
import { DebateSummary } from "@/hooks/useExecutiveBoardroom";
interface DebateSummaryDisplayProps {
  summary: DebateSummary;
  debateTopic: string;
  executives: DebateParticipant[];
  onSaveStrategy: () => void;
  onNewDebate: () => void;
}
declare const DebateSummaryDisplay: React.FC<DebateSummaryDisplayProps>;
export default DebateSummaryDisplay;
