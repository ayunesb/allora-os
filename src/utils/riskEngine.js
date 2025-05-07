export const weightedRiskFactors = {
    ambition: 0.25,
    budget: 0.2,
    timeframe: 0.15,
    marketVolatility: 0.1,
    competitionIntensity: 0.1,
    organizationalReadiness: 0.1,
    innovationCapacity: 0.05,
    regulatoryConstraints: 0.05,
};
export const assessRiskLevel = (answers) => {
    const score = calculateRiskScore(answers).score;
    if (score <= 2.5)
        return "Low";
    if (score <= 3.5)
        return "Medium";
    return "High";
};
export const calculateRiskScore = (answers) => {
    // Initialize variables
    let totalScore = 0;
    let totalWeight = 0;
    const breakdown = {};
    // Calculate core factors (required)
    const coreFactors = {
        ambition: { value: answers.ambition, weight: weightedRiskFactors.ambition },
        budget: { value: answers.budget, weight: weightedRiskFactors.budget },
        timeframe: {
            value: answers.timeframe,
            weight: weightedRiskFactors.timeframe,
        },
    };
    // Calculate weighted score for core factors
    for (const [name, { value, weight }] of Object.entries(coreFactors)) {
        const contribution = value * weight;
        totalScore += contribution;
        totalWeight += weight;
        breakdown[name] = {
            contribution,
            percentage: 0, // Will calculate percentages after all factors are processed
        };
    }
    // Calculate additional factors (optional)
    const additionalFactors = {
        marketVolatility: {
            value: answers.marketVolatility,
            weight: weightedRiskFactors.marketVolatility,
        },
        competitionIntensity: {
            value: answers.competitionIntensity,
            weight: weightedRiskFactors.competitionIntensity,
        },
        organizationalReadiness: {
            value: answers.organizationalReadiness,
            weight: weightedRiskFactors.organizationalReadiness,
        },
        innovationCapacity: {
            value: answers.innovationCapacity,
            weight: weightedRiskFactors.innovationCapacity,
        },
        regulatoryConstraints: {
            value: answers.regulatoryConstraints,
            weight: weightedRiskFactors.regulatoryConstraints,
        },
    };
    // Add scores for available additional factors
    for (const [name, { value, weight }] of Object.entries(additionalFactors)) {
        if (value !== undefined) {
            const contribution = value * weight;
            totalScore += contribution;
            totalWeight += weight;
            breakdown[name] = {
                contribution,
                percentage: 0, // Will calculate percentages after all factors are processed
            };
        }
    }
    // Add custom factors if provided
    if (answers.customFactors && answers.customFactors.length > 0) {
        for (const factor of answers.customFactors) {
            const contribution = factor.score * factor.weight;
            totalScore += contribution;
            totalWeight += factor.weight;
            breakdown[factor.name] = {
                contribution,
                percentage: 0,
            };
        }
    }
    // Normalize the score if weights don't add up to 1
    const normalizedScore = totalWeight > 0 ? (totalScore / totalWeight) * 5 : totalScore;
    // Calculate percentage contributions
    for (const factor in breakdown) {
        breakdown[factor].percentage =
            (breakdown[factor].contribution / totalScore) * 100;
    }
    // Determine risk level
    let riskLevel;
    if (normalizedScore <= 2.5)
        riskLevel = "Low";
    else if (normalizedScore <= 3.5)
        riskLevel = "Medium";
    else
        riskLevel = "High";
    return {
        level: riskLevel,
        score: parseFloat(normalizedScore.toFixed(2)),
        breakdown,
    };
};
