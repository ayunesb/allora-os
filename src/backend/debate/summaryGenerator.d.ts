import { DebateMessage } from '@/utils/consultation/types';
export declare const generateDebateSummary: (debateTitle: string, messages: DebateMessage[]) => Promise<{
    key_insights: string[];
    recommendations: string[];
    next_steps: string[];
}>;
