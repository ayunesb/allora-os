export declare function useVerification(companyId: string | null): {
    isChecking: boolean;
    results: any;
    isReady: boolean;
    isAddingDemo: boolean;
    isVerifyingTables: boolean;
    isCheckingIndexes: boolean;
    isVerifyingRLS: boolean;
    isVerifyingFunctions: boolean;
    runChecks: () => Promise<void>;
    handleAddDemoData: () => Promise<void>;
    verifyRequiredTables: () => Promise<void>;
    checkDatabaseIndexes: () => Promise<void>;
    verifyRLSPolicies: () => Promise<void>;
    verifyDatabaseFunctions: () => Promise<void>;
};
