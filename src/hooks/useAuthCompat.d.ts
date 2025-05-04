export declare const useAuthCompat: () => {
    session: any;
    isAuthenticated: boolean;
    user: import("../types").User | null;
    profile: import("../types").User | null;
    isLoading: boolean;
    loading: boolean;
    hasInitialized: boolean;
    isEmailVerified: boolean;
    isSessionExpired: boolean;
    authError: string | null;
    signIn: (email: string, password: string) => Promise<{
        success: boolean;
        error?: string;
        user?: import("../types").User;
    }>;
    signOut: () => Promise<void>;
    login: (email: string, password: string) => Promise<{
        success: boolean;
        error?: string;
        user?: import("../types").User;
    }>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    refreshSession: () => Promise<boolean>;
};
export default useAuthCompat;
