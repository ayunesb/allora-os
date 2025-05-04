interface CeoMessage {
    greeting: string;
    strategicOverview: string;
    tags: string[];
    actionSteps: string;
    closingStatement: string;
}
export declare function useCeoMessage(riskAppetite: 'low' | 'medium' | 'high', industry?: string, companyName?: string): {
    message: CeoMessage;
    isLoading: boolean;
};
export {};
