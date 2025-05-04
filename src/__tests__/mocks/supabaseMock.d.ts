export declare const createSupabaseMock: () => {
    from: import("vitest").Mock<(...args: any[]) => any>;
    rpc: import("vitest").Mock<(...args: any[]) => any>;
    auth: {
        getUser: import("vitest").Mock<(...args: any[]) => any>;
        getSession: import("vitest").Mock<(...args: any[]) => any>;
        signUp: import("vitest").Mock<(...args: any[]) => any>;
        signIn: import("vitest").Mock<(...args: any[]) => any>;
        signOut: import("vitest").Mock<(...args: any[]) => any>;
    };
    storage: {
        from: import("vitest").Mock<(...args: any[]) => any>;
    };
};
export type SupabaseMock = ReturnType<typeof createSupabaseMock>;
