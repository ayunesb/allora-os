import { DebateMessage, DebateParticipant } from '@/utils/consultation/types';
export interface ExecutiveVote {
    executiveId: string;
    executiveName: string;
    choice: 'option_a' | 'option_b';
    confidence: number;
    rationale: string;
}
export interface DebateSummary {
    winningStrategy: string;
    keyDisagreements: string[];
    alternativeIdeas: string[];
    safeMove: string;
    boldMove: string;
    executivePerformance: Record<string, {
        boldnessScore: number;
        riskAlignment: number;
        innovationScore: number;
    }>;
}
export interface DebateReaction {
    executiveId: string;
    executiveName: string;
    thought: string;
    timestamp: Date;
}
export default function useExecutiveBoardroom(): {
    participants: DebateParticipant[];
    setParticipants: import("react").Dispatch<import("react").SetStateAction<DebateParticipant[]>>;
    messages: DebateMessage[];
    isDebating: boolean;
    debateTitle: string;
    debateTopic: string;
    isLoadingMessages: boolean;
    reactions: DebateReaction[];
    votes: ExecutiveVote[];
    debateSummary: DebateSummary;
    suggestedTopic: string;
    startDebate: (topic: string) => Promise<void>;
    saveStrategyToLibrary: () => Promise<any>;
    resetDebate: () => void;
};
