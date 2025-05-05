export type ExecutiveAgentProfile = {
  name: string;
  role: string;
  expertise: string[];
  personality: string; // ← was union
  decisionStyle: string;
  description: string;
};
