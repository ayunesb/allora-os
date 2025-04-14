/**
 * Types for the AI Executive Agents system
 */

export interface ExecutiveAgentProfile {
  name: string;
  role: string;
  expertise: string[];
  personality?: string;
  decisionStyle?: 'conservative' | 'balanced' | 'aggressive';
}

export interface ExecutiveDecision {
  id?: string;
  executiveName: string;
  executiveRole: string;
  task: string;
  options: string[];
  selectedOption: string;
  reasoning: string;
  riskAssessment?: string;
  timestamp: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface AgentRunOptions {
  saveToDatabase?: boolean;
  includeRiskAssessment?: boolean;
  priority?: 'low' | 'medium' | 'high';
  companyContext?: string;
  marketConditions?: string;
}
