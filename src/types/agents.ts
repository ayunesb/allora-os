
export interface User {
  id: string;
  email: string;
  name: string;
  company_id: string;
  role: string;
  created_at: string;
}

export interface ExecutiveMessage {
  id: string;
  created_at: string;
  from_executive: string;
  to_executive: string;
  message_content: string;
  status: "read" | "unread";
}

export interface DebateEntry {
  executiveName: string;
  role: string;
  opinion: string;
  stance: string;
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

export interface ExecutiveDecision {
  id: string;
  executiveName: string;
  executiveRole: string;
  task: string;
  options: string[];
  selectedOption: string;
  reasoning: string;
  riskAssessment: string;
  priority: string;
  timestamp: string;
}

export interface ExecutiveAgentProfile {
  name: string;
  role: string;
  expertise?: string[];
  traits?: string[];
  communication_style?: string;
}
