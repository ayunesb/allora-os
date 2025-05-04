import { GeneratedStrategy } from "./types";
interface StrategyStrength {
    description: string;
    impact: "high" | "medium" | "low";
}
interface StrategyWeakness {
    description: string;
    risk: "high" | "medium" | "low";
}
interface ImplementationStep {
    description: string;
    timeframe: string;
    complexity: "high" | "medium" | "low";
}
export declare function analyzeStrategy(strategy: GeneratedStrategy): {
    title: string;
    description: string;
    marketFit: string;
    strengths: StrategyStrength[];
    weaknesses: StrategyWeakness[];
    implementationSteps: ImplementationStep[];
    timeToMarket: string;
    complexity: "medium" | "high" | "low";
    competitiveAdvantage: string;
    objectives: string[];
    actions: import("./types").StrategyAction[];
};
export declare function analyzeStrategyFactors(strategy: GeneratedStrategy, riskProfile: any): {
    strengths: string[];
    weaknesses: string[];
    keySuccessFactors: string[];
};
export declare function calculateImplementationComplexity(strategy: GeneratedStrategy, assessmentInput: any): {
    score: number;
    factors: string[];
};
export declare function calculateCompetitiveAdvantage(strategy: GeneratedStrategy, riskProfile: any): {
    score: number;
    factors: string[];
};
export declare function estimateTimeToResults(strategy: GeneratedStrategy, riskProfile: any): {
    timeframe: string;
    confidenceLevel: string;
    milestones: {
        description: string;
        timeframe: string;
    }[];
};
export {};
