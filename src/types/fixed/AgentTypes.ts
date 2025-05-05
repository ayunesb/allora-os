export type ExecutiveAgentProfile = {
  name: string;
  role: string;
  expertise: string[];
  description: string;
  personality: 'analytical' | 'creative' | 'diplomatic' | 'aggressive' | 'cautious';
  decisionStyle: string;
};

export type Agent = {
  id: string;
  name: string;
  role: string;
};

export interface AgentOptions {
  includeRiskAssessment?: boolean; // ✅ Added this property
}

// Or update input profile so personality is cast to the union
const fixed: ExecutiveAgentProfile = {
  name: 'Default Name',
  role: 'Default Role',
  expertise: ['Default Expertise'],
  description: 'Default Description',
  personality: 'analytical', // Must match union
  decisionStyle: 'Default Decision Style',
};
