
/**
 * Types for the AI executive agents system
 */

export interface ExecutiveAgentProfile {
  name: string;
  role: string;
  expertise: string[];
  decisionStyle: string;
  personality: string;
  avatar?: string;
}

export interface ExecutiveDecision {
  id: string;
  executiveName: string;
  executiveRole: string;
  task: string;
  options: string[];
  selectedOption: string;
  reasoning: string;
  riskAssessment: string;
  timestamp: string;
  priority: string;
}

export interface AgentRunOptions {
  saveToDatabase?: boolean;
  includeRiskAssessment?: boolean;
  priority?: 'low' | 'medium' | 'high';
  companyContext?: string;
  marketConditions?: string;
  userId?: string;
}

export interface DebateSessionResult {
  task: string;
  debates: DebateEntry[];
  summary: DebateSummary;
}

export interface DebateEntry {
  executiveName: string;
  role: string;
  opinion: string;
  stance: 'For' | 'Against' | 'Neutral';
}

export interface DebateSummary {
  totalExecutives: number;
  forVotes: number;
  againstVotes: number;
  majority: 'For' | 'Against' | 'Tie';
  confidenceScore: number;
  topRisks: string[];
  topOpportunities: string[];
}
