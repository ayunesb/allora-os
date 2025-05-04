export declare function useStrategyTracking(): {
    trackApproval: (strategyId: string, strategyTitle: string) => Promise<boolean>;
    trackRejection: (strategyId: string, reason: string) => Promise<boolean>;
    trackShare: (strategyId: string, shareDetails: object) => Promise<boolean>;
    trackStrategyUpdate: (strategyId: string, title: string, riskLevel: string) => Promise<boolean>;
    trackStrategyFilter: (filterType: string, filterValue: string) => void;
    isApproving: boolean;
    isRejecting: boolean;
    isSharing: boolean;
    isLoggedIn: boolean;
};
