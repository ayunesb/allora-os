export declare function useAiLearning(): {
    isSubmitting: boolean;
    isLoading: boolean;
    submitFeedback: (botName: string, botRole: string, isPositive: boolean, interactionId?: string, messageId?: string, comment?: string, topics?: string[]) => Promise<boolean>;
    getLearningModel: (botName: string, botRole: string) => Promise<any>;
    getFeedbackHistory: (botName: string, botRole?: string, limit?: number) => Promise<any[]>;
    trackFeedback: (interactionId: string | undefined, messageId: string | undefined, botName: string, botRole: string, isPositive: boolean, comment?: string, metadata?: Record<string, any>) => Promise<boolean>;
};
