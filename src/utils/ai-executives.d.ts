/**
 * Utility functions for AI executives management
 */
export declare function getExecutiveImage(executiveName: string): string;
export declare function getExecutiveSuggestions(
  riskAppetite: "low" | "medium" | "high",
): {
  id: string;
  name: string;
  role: string;
  title: string;
  specialty: string;
  avatar: string;
}[];
export interface RiskAssessment {
  score: number;
  level: "low" | "medium" | "high" | "critical";
  insights: string[];
  recommendations: string[];
}
export interface RiskCategory {
  name: string;
  description: string;
  score: number;
}
export interface RiskScenario {
  name: string;
  probability: number;
  impact: number;
  description: string;
  mitigationSteps: string[];
}
export declare function generateRiskAssessment(
  businessData: Record<string, any>,
  riskAppetite: "low" | "medium" | "high",
): RiskAssessment;
export declare function generateRiskScenarios(industry: string): RiskScenario[];
