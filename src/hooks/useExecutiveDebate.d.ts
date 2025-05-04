import { Strategy } from '@/models/strategy';
export interface DebateExecutive {
    name: string;
    role: string;
    avatar: string;
}
export interface DebateMessage {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
    executive: DebateExecutive;
    sentiment: 'positive' | 'negative' | 'neutral';
}
export interface DebateSummary {
    keyFindings: string[];
    agreedPoints: string[];
    disagreedPoints: string[];
    finalDecision: string;
}
export interface DebateSession {
    id: string;
    strategyId: string;
    messages: DebateMessage[];
    consensus?: string;
}
export declare function useExecutiveDebate(): {
    debate: DebateSession;
    isGeneratingDebate: boolean;
    generateDebate: (strategy: Strategy) => Promise<void>;
    debateMessages: DebateMessage[];
    debateSummary: DebateSummary;
    isLoading: boolean;
};
