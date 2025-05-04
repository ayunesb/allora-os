export interface ExecutiveAgentProfile {
    name: string;
    role: string;
    expertise: string[];
    description: string;
    personality: string;
    decisionStyle: string;
}
export interface AgentOptions {
    saveToDatabase?: boolean;
    includeRiskAssessment?: boolean;
    marketConditions?: string;
}
export interface AgentRunOptions {
    includeRiskAssessment?: boolean;
    marketConditions?: string;
    [key: string]: any;
}
