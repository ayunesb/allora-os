import { ExecutiveDecision } from "@/types/agents";
/**
 * Saves an executive decision to the database
 */
export declare function saveExecutiveDecision(
  decision: ExecutiveDecision,
  userId: string,
): Promise<void>;
/**
 * Fetches coaching memories for a specific executive
 */
export declare function fetchCoachingMemories(
  executiveName: string,
): Promise<string[]>;
/**
 * Fetches recent executive decisions
 */
export declare function getExecutiveDecisions(
  userId: string,
  limit?: number,
): Promise<ExecutiveDecision[]>;
