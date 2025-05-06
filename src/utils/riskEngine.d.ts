export type RiskFactor = {
  name: string;
  score: number;
  weight: number;
};
export type RiskAssessmentInput = {
  ambition: number;
  budget: number;
  timeframe: number;
  marketVolatility?: number;
  competitionIntensity?: number;
  organizationalReadiness?: number;
  innovationCapacity?: number;
  regulatoryConstraints?: number;
  customFactors?: RiskFactor[];
};
export type RiskProfile = {
  level: "Low" | "Medium" | "High";
  score: number;
  breakdown: {
    [key: string]: {
      contribution: number;
      percentage: number;
    };
  };
};
export declare const weightedRiskFactors: {
  ambition: number;
  budget: number;
  timeframe: number;
  marketVolatility: number;
  competitionIntensity: number;
  organizationalReadiness: number;
  innovationCapacity: number;
  regulatoryConstraints: number;
};
export declare const assessRiskLevel: (
  answers: RiskAssessmentInput,
) => "Low" | "Medium" | "High";
export declare const calculateRiskScore: (
  answers: RiskAssessmentInput,
) => RiskProfile;
