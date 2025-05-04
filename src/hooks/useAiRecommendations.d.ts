import { RiskAppetiteType, CompanyDetails } from "./useCompanyDetails";
export type RecommendationType = {
    id: string;
    title: string;
    description: string;
    type: string;
    executiveBot: {
        name: string;
        role: string;
    };
    expectedImpact: number;
    timeframe: string;
};
export declare function useAiRecommendations(companyDetails: CompanyDetails, analytics: any, profile: any, riskAppetite: RiskAppetiteType): {
    aiRecommendations: RecommendationType[];
    generateAiRecommendations: () => {
        id: string;
        title: string;
        description: string;
        type: string;
        executiveBot: {
            name: string;
            role: string;
        };
        expectedImpact: number;
        timeframe: string;
    }[];
    removeRecommendation: (index: number) => void;
};
