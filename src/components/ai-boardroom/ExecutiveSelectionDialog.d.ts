import React from "react";
import { DebateParticipant } from "@/utils/consultation/types";
interface ExecutiveSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedExecutives: DebateParticipant[];
  onExecutivesChange: (executives: DebateParticipant[]) => void;
}
declare const ExecutiveSelectionDialog: React.FC<ExecutiveSelectionDialogProps>;
export default ExecutiveSelectionDialog;
