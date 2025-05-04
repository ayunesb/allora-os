export declare function useAiMemory(): {
    isProcessing: boolean;
    recentMemories: any[];
    storeInteraction: (botName: string, botRole: string, userMessage: string, botResponse: string, metadata?: Record<string, any>) => Promise<boolean>;
    getRelevantMemories: (userMessage: string, botName?: string, botRole?: string, limit?: number) => Promise<any[]>;
    getBotInteractions: (botName: string, botRole?: string, limit?: number) => Promise<any[]>;
    clearBotMemory: (botName: string, botRole?: string) => Promise<boolean>;
    getLearningInsights: () => Promise<any>;
};
