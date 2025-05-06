import type {
  ImplementationStep,
  StrategyStrength,
  StrategyWeakness,
} from "@/utils/strategy/strategyAnalysis";
import { Strategy, GeneratedStrategy } from "@/utils/strategy/strategyTypes";
export declare const analyzeStrategyFactors: (
  strategy: Strategy | GeneratedStrategy,
) => {
  steps: ImplementationStep[];
  strengths: StrategyStrength[];
  weaknesses: StrategyWeakness[];
};
export declare function getStrategyInsights(
  strategy: Strategy | GeneratedStrategy,
): {
  steps: ImplementationStep[];
  strengths: StrategyStrength[];
  weaknesses: StrategyWeakness[];
};
