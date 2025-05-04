import React from "react";
import { StrategyMilestone } from "@/models/strategyImplementation";
interface MilestoneDialogProps {
    isOpen: boolean;
    onClose: () => void;
    strategyId: string;
    milestone: StrategyMilestone | null;
    onSave: (milestone: StrategyMilestone) => void;
    onDelete: (milestoneId: string) => void;
}
declare const MilestoneDialog: React.FC<MilestoneDialogProps>;
export default MilestoneDialog;
