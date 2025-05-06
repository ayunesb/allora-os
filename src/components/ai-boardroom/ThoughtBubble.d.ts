import React from "react";
import { DebateParticipant } from "@/utils/consultation/types";
import { DebateReaction } from "@/hooks/useExecutiveBoardroom";
interface ThoughtBubbleProps {
  reaction: DebateReaction;
  executives: DebateParticipant[];
}
declare const ThoughtBubble: React.FC<ThoughtBubbleProps>;
export default ThoughtBubble;
