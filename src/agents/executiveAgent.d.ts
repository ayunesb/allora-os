import { ExecutiveDecision } from '@/types/agents';
export { executiveProfiles } from './agentProfiles';
export { getExecutiveDecisions } from './executiveMemory';
interface AgentOptions {
    saveToDatabase?: boolean;
}
/**
 * Runs an executive agent to make a decision on a given task
 * @param task The task to perform
 * @param executiveProfile The executive profile to use
 * @param options Additional options
 * @returns The decision made by the executive
 */
export declare function runExecutiveAgent(task: string, executiveProfile: {
    name: string;
    role: string;
}, options?: AgentOptions): Promise<ExecutiveDecision>;
