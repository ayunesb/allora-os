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

export interface Agent {
  id: string;
  name: string;
  role: string;
  version: string;
  status: "active" | "retired";
}

export type AgentPersonality = "analytical" | "creative" | "diplomatic" | "aggressive" | "cautious";
