import type {
  ImplementationStep,
  StrategyStrength,
  StrategyWeakness,
} from "@/utils/strategy/strategyAnalysis";
import { Strategy, GeneratedStrategy } from "@/utils/strategy/strategyTypes";

export const analyzeStrategyFactors = (
  strategy: Strategy | GeneratedStrategy
): {
  steps: ImplementationStep[];
  strengths: StrategyStrength[];
  weaknesses: StrategyWeakness[];
} => {
  // ...existing code...
};

export function getStrategyInsights(
  strategy: Strategy | GeneratedStrategy
): {
  steps: ImplementationStep[];
  strengths: StrategyStrength[];
  weaknesses: StrategyWeakness[];
} {
  // ...existing code...
}