
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
}
