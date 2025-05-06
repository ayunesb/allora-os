import { ExecutiveDecision } from "@/types/agents";
export interface Strategy {
  id: string;
  title: string;
  description: string;
  implementation_steps: string[];
  expected_outcomes: string[];
  timeline: string;
  resources_required: string;
  risk_level: string;
  created_at: string;
  decision_id?: string;
}
/**
 * Generate a business strategy from an executive decision
 */
export declare function generateStrategy(
  decision: ExecutiveDecision,
): Promise<Strategy>;
/**
 * Save a strategy to the database
 */
export declare function saveStrategy(
  strategy: Strategy,
  userId: string,
): Promise<null>;
