/**
 * Get personalized enhancements for an executive
 */
export declare function getExecutiveEnhancements(botName: string): {
    boost: {
        name: string;
        type: string;
    };
    model: {
        name: string;
        type: string;
    };
};
/**
 * Helper function to determine personality traits based on executive name and role
 */
export declare function determinePersonalityTraits(name: string, role: string): string[];
/**
 * Determine the cognitive layers for an executive based on their role
 */
export declare function determineCognitiveLayers(role: string): {
    operational: {
        description: string;
        capabilities: string[];
    };
    strategic: {
        description: string;
        capabilities: string[];
    };
    innovative: {
        description: string;
        capabilities: string[];
    };
};
/**
 * Determine the mental models for an executive based on their role
 */
export declare function determineMentalModels(role: string): {
    name: string;
    description: string;
}[];
/**
 * Generate daily mission objectives for an executive based on their role
 */
export declare function generateDailyMission(role: string, companyGoals?: string[]): {
    northStar: string;
    moves: {
        innovation: string;
        execution: string;
        customer: string;
    };
    riskReward: {
        description: string;
        level: "low" | "medium" | "high";
        riskFactors: string[];
        rewardPotential: string[];
    };
};
