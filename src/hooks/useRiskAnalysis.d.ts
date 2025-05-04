interface RiskFactor {
    name: string;
    weight: number;
    score: number;
}
type RiskAppetite = 'low' | 'medium' | 'high';
export declare function useRiskAnalysis(): {
    riskFactors: RiskFactor[];
    calculateRiskScore: (factors: {
        [key: string]: number;
    }) => number;
    updateRiskFactors: (factors: {
        [key: string]: number;
    }) => void;
    getRiskAppetiteFromScore: (score: number) => RiskAppetite;
    getStrategyRecommendation: (riskAppetite: RiskAppetite) => string;
};
export {};
