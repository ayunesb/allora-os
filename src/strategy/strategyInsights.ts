import type { Strategy, PatchedStrategy } from "@/types/fixed/Strategy";
import { analyzeStrategy } from "@/utils/strategyAnalysis";

export function normalizeStrategy(strategy: Strategy): PatchedStrategy {
  const normalizedRisk: "Low" | "Medium" | "High" = [
    "Low",
    "Medium",
    "High",
  ].includes(strategy.riskLevel as string)
    ? (strategy.riskLevel as "Low" | "Medium" | "High")
    : "Medium";

  return analyzeStrategy({ ...strategy, riskLevel: normalizedRisk });
}
