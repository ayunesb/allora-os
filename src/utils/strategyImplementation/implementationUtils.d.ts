import {
  StrategyMilestone,
  ImplementationStatus,
} from "@/models/strategyImplementation";
export declare function fetchStrategyMilestones(
  strategyId: string,
): Promise<StrategyMilestone[]>;
export declare function createMilestone(
  milestone: Omit<StrategyMilestone, "id" | "created_at">,
): Promise<StrategyMilestone | null>;
export declare function updateMilestone(
  id: string,
  updates: Partial<Omit<StrategyMilestone, "id" | "created_at">>,
): Promise<boolean>;
export declare function deleteMilestone(id: string): Promise<boolean>;
export declare function calculateStrategyProgress(
  milestones: StrategyMilestone[],
): number;
export declare function getStatusColor(status: ImplementationStatus): string;
