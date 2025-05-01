
export interface ExecutiveAgentProfile {
  name: string;
  role: string;
  expertise: string[];
  decisionStyle: string;
  personality: string;
}

export interface AgentRunOptions {
  saveToDatabase?: boolean;
  includeRiskAssessment?: boolean;
  priority?: 'low' | 'medium' | 'high';
  companyContext?: string;
  marketConditions?: string;
  userId?: string;
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

export interface ExecutiveMessage {
  id: string;
  from_executive: string;
  to_executive: string;
  message_content: string;
  created_at: string;
  status: 'read' | 'unread';
}

export interface ToolResponse {
  tool: string;
  result: string;
  data?: any;
}

export interface ExecutiveResponse {
  aiResponse: string;
  toolResponses?: ToolResponse[];
  raw?: any;
}
