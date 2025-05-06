/**
 * Strategy generation utility
 */
export interface CompanyProfile {
  level: string;
  score: number;
  breakdown: Record<string, any>;
}
export interface Strategy {
  id: string;
  title: string;
  description: string;
  keyActions: string[];
  riskLevel: "Low" | "Medium" | "High";
  estimatedROI: string;
  estimatedTimeframe: string;
  requiredResources: string[];
  successMetrics: string[];
}
/**
 * Generates a customized business strategy based on company profile
 */
export declare function generateCustomizedStrategy(
  companyProfile: CompanyProfile,
  industry: string,
  companySize: string,
  stage: string,
): Strategy;
