/**
 * Runs a debate with a single executive
 */
export declare function runExecutiveDebate(executiveName: string, role: string, task: string, riskAppetite?: string, businessPriority?: string): Promise<string>;
/**
 * Save a debate result to the database
 */
export declare function saveDebateResult(task: string, executiveName: string, role: string, opinion: string): Promise<void>;
/**
 * Analyzes a debate response to extract stance, risks and opportunities
 */
export declare function analyzeDebateResponse(response: string): {
    stance: 'For' | 'Against' | 'Neutral';
    risks: string[];
    opportunities: string[];
};
