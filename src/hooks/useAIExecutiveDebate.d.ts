interface Executive {
    name: string;
    role: string;
    avatar?: string;
}
interface DebateResult {
    topic: string;
    content: string;
    executives: Executive[];
}
export declare function useAIExecutiveDebate(): {
    generateDebate: (topic: string, companyContext: string, selectedExecutives: Executive[]) => Promise<any>;
    isLoading: boolean;
    debate: DebateResult;
    error: string;
};
export {};
