import { ExecutiveDecision } from '@/types/agents';
export interface ExecutiveMemory {
    id?: string;
    user_id: string;
    executive_name: string;
    task: string;
    decision: string;
    timestamp?: string;
}
/**
 * Save an executive decision to memory
 */
export declare function saveDecisionToMemory(userId: string, decision: ExecutiveDecision): Promise<boolean>;
/**
 * Fetch recent memories for an executive
 */
export declare function fetchRecentMemories(userId: string, executiveName?: string, limit?: number): Promise<ExecutiveMemory[]>;
/**
 * Format memories into a prompt-friendly string
 */
export declare function formatMemoriesForPrompt(memories: ExecutiveMemory[]): string;
