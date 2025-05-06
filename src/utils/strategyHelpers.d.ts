import { Strategy } from "@/models/strategy";
import { RiskAssessmentInput } from "@/utils/riskEngine";
export declare function fetchCompanyStrategies(
  companyId: string,
): Promise<Strategy[]>;
export declare function fetchStrategy(
  strategyId: string,
): Promise<Strategy | null>;
export declare function createStrategy(
  companyId: string,
  title: string,
  description: string,
  riskLevel: "Low" | "Medium" | "High",
): Promise<Strategy | null>;
export declare function generateStrategyFromAnswers(
  companyId: string,
  answers: RiskAssessmentInput,
): Promise<Strategy | null>;
export declare function updateStrategy(
  strategyId: string,
  updates: Partial<Omit<Strategy, "id" | "created_at" | "company_id">>,
): Promise<boolean>;
export declare function deleteStrategy(strategyId: string): Promise<boolean>;
