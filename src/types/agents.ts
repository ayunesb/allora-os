export interface User {
  id: string;
  email: string;
  name: string;
  company_id: string;
  role: "user" | "admin";
  created_at: string;
}

// If file exists, add the types to it, otherwise create it
export interface ExecutiveAgentProfile {
  name: string;
  role: string;
  expertise: string[];
  personality: 'analytical' | 'creative' | 'diplomatic' | 'aggressive' | 'cautious';
  decisionStyle: 'data_driven' | 'intuitive' | 'consensus' | 'directive' | 'adaptive';
  avatarUrl?: string;
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

export interface ExecutiveResponse {
  aiResponse: string;
  toolResponses?: Array<{
    tool: string;
    result: string;
    data?: any;
  }>;
}

export interface AgentRunOptions {
  saveToDatabase?: boolean;
  includeRiskAssessment?: boolean;
  priority?: string;
  companyContext?: string;
  marketConditions?: string;
  userId?: string;
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

export interface DebateSessionResult {
  task: string;
  debates: DebateEntry[];
  summary: DebateSummary;
}

export interface ExecutiveMessage {
  id: string;
  from_executive: string;
  to_executive: string;
  message_content: string;
  status: 'read' | 'unread';
  created_at: string;
}

export interface Anomaly {
  kpi: string;
  issue: string;
  value: number;
  threshold: number;
}
