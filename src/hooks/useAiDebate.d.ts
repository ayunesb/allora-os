import { DebateParticipant } from '@/utils/consultation/types';
export declare function useAiDebate(): {
    isLoading: boolean;
    debateId: string;
    debateMessages: any[];
    debateSummary: string;
    initiateDebate: (topic: string, participants: DebateParticipant[], context?: Record<string, any>) => Promise<any>;
    addUserMessage: (message: string) => Promise<boolean>;
    generateExecutiveResponses: () => Promise<boolean>;
    generateDebateSummary: () => Promise<any>;
    fetchDebateMessages: (existingDebateId: string) => Promise<boolean>;
    resetDebate: () => void;
};
