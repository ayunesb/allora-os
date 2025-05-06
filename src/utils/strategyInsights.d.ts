import { Strategy } from "@/models/strategy";
import { GeneratedStrategy } from "./strategy/types";
import type {
  ImplementationStep,
  StrategyStrength,
  StrategyWeakness,
} from "@/utils/strategy/strategyAnalysis";
import { analyzeStrategy } from "./strategy/strategyAnalysis";
export interface StrategyAnalysis {
  strengths: string[];
  weaknesses: string[];
  implementationComplexity: {
    score: number;
  };
  competitiveAdvantage: {
    score: number;
  };
  insights: {
    id: string;
    type: "positive" | "negative" | "neutral";
    title: string;
    description: string;
  }[];
}
export declare const estimateTimeToResults: (
  strategy: Strategy | GeneratedStrategy,
) => string;
export declare const calculateImplementationComplexity: (
  strategy: Strategy | GeneratedStrategy,
) => number;
export declare const calculateCompetitiveAdvantage: (
  strategy: Strategy | GeneratedStrategy,
) => number;
export declare const analyzeStrategyFactors: (
  strategy: Strategy | GeneratedStrategy,
) => any;
export { analyzeStrategy };
export declare function getStrategyInsights(
  strategy: Strategy | GeneratedStrategy,
): {
  steps: ImplementationStep[];
  strengths: StrategyStrength[];
  weaknesses: StrategyWeakness[];
};
