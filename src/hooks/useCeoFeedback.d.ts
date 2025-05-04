export declare function useCeoFeedback(): {
    provideFeedback: (isPositive: boolean) => Promise<void>;
    isSubmitting: boolean;
};
