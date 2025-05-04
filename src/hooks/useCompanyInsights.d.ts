import { BotInsight } from '@/components/bot-insights/BotInsightCard';
export type InsightContributor = {
    name: string;
    role: string;
    contribution: string;
    opinion?: 'positive' | 'negative' | 'neutral';
};
export type DetailedInsight = BotInsight & {
    keyPoints: string[];
    reasoning: string;
    executiveSummary: string;
    contributors: InsightContributor[];
};
export declare function useCompanyInsights(): {
    insights: BotInsight[];
    isLoading: boolean;
    error: string;
    getDetailedInsight: (insightId: string) => DetailedInsight | null;
};
