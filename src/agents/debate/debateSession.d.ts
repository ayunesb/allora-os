import { DebateSessionResult, DebateEntry, DebateSummary } from "@/types/agents";
/**
 * Run a debate session with multiple executives
 */
export declare function runDebateSession(task: string, riskAppetite?: string, businessPriority?: string): Promise<DebateSessionResult>;
/**
 * Summarize the debate results
 */
export declare function summarizeDebate(debateResults: DebateEntry[], risks?: string[], opportunities?: string[]): DebateSummary;
