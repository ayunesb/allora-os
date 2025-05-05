import { Strategy, analyzeStrategy, PatchedStrategy } from "@/types/unified-types";

export function normalizeStrategy(strategy: Strategy): PatchedStrategy {
  const normalizedRisk = ['Low', 'Medium', 'High'].includes(strategy.riskLevel || strategy.risk_level || '')
    ? (strategy.riskLevel || strategy.risk_level) as 'Low' | 'Medium' | 'High'
    : 'Medium';

  return {
    ...strategy,
    riskLevel: normalizedRisk,
  };
}
