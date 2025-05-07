import { analyzeStrategy } from "@/utils/strategyAnalysis";
export function normalizeStrategy(strategy) {
    const normalizedRisk = [
        "Low",
        "Medium",
        "High",
    ].includes(strategy.riskLevel)
        ? strategy.riskLevel
        : "Medium";
    return analyzeStrategy(Object.assign(Object.assign({}, strategy), { riskLevel: normalizedRisk }));
}
