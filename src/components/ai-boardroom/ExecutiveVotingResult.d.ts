import React from "react";
import { DebateParticipant } from "@/utils/consultation/types";
import { ExecutiveVote } from "@/hooks/useExecutiveBoardroom";
interface ExecutiveVotingResultProps {
  votes: ExecutiveVote[];
  executives: DebateParticipant[];
}
declare const ExecutiveVotingResult: React.FC<ExecutiveVotingResultProps>;
export default ExecutiveVotingResult;
