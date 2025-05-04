export declare function useOnboardingValidation(): {
    isCompleting: boolean;
    validationError: string;
    handleComplete: () => Promise<boolean>;
};
