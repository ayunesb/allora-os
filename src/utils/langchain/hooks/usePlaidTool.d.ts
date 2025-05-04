export declare function usePlaidTool(): {
    getAccountBalances: () => Promise<any>;
    getRecentTransactions: (days?: number) => Promise<any>;
    isLoading: boolean;
    error: string;
};
