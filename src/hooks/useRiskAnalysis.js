import { useState, useCallback } from "react";
export function useRiskAnalysis() {
    const [riskFactors, setRiskFactors] = useState([
        { name: "market_volatility", weight: 0.3, score: 0 },
        { name: "competition", weight: 0.2, score: 0 },
        { name: "regulatory", weight: 0.2, score: 0 },
        { name: "technological", weight: 0.15, score: 0 },
        { name: "financial", weight: 0.15, score: 0 },
    ]);
    /**
     * Calculate a risk score based on input factors
     */
    const calculateRiskScore = useCallback((factors) => {
        let totalScore = 0;
        let totalWeight = 0;
        riskFactors.forEach((factor) => {
            if (factors[factor.name] !== undefined) {
                totalScore += factor.weight * factors[factor.name];
                totalWeight += factor.weight;
            }
        });
        if (totalWeight === 0)
            return 0;
        // Return a score between 0-100
        return Math.round((totalScore / totalWeight) * 100);
    }, [riskFactors]);
    /**
     * Update risk factor scores
     */
    const updateRiskFactors = useCallback((factors) => {
        setRiskFactors((prev) => prev.map((factor) => (Object.assign(Object.assign({}, factor), { score: factors[factor.name] !== undefined
                ? factors[factor.name]
                : factor.score }))));
    }, []);
    /**
     * Determine a risk appetite level based on score
     */
    const getRiskAppetiteFromScore = useCallback((score) => {
        if (score < 30)
            return "low";
        if (score < 70)
            return "medium";
        return "high";
    }, []);
    /**
     * Get a risk-appropriate strategy recommendation
     */
    const getStrategyRecommendation = useCallback((riskAppetite) => {
        switch (riskAppetite) {
            case "low":
                return "Focus on preserving capital and stable growth. Prioritize well-established markets and proven products.";
            case "medium":
                return "Balance growth with calculated risks. Explore adjacent markets and invest moderately in innovation.";
            case "high":
                return "Pursue aggressive growth and disruption opportunities. Consider first-mover advantages and revolutionary products.";
            default:
                return "Balanced approach recommended based on current market conditions.";
        }
    }, []);
    return {
        riskFactors,
        calculateRiskScore,
        updateRiskFactors,
        getRiskAppetiteFromScore,
        getStrategyRecommendation,
    };
}
