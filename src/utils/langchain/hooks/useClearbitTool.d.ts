export declare function useClearbitTool(): {
    lookupCompany: (domain: string) => Promise<any>;
    lookupPerson: (email: string) => Promise<any>;
    isLoading: boolean;
    error: string;
};
