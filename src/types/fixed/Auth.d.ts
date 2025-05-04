import { User } from './User';
/**
 * Standardized Authentication Context Props
 * Used across the entire application for consistent auth state management
 */
export interface AuthContextProps {
    user: User | null;
    profile: User | null;
    isLoading: boolean;
    loading: boolean;
    hasInitialized: boolean;
    isEmailVerified: boolean;
    isSessionExpired: boolean;
    isAuthenticated: boolean;
    authError: string | null;
    session: any;
    signIn: (email: string, password: string) => Promise<{
        success: boolean;
        error?: string;
        user?: User;
    }>;
    signOut: () => Promise<void>;
    login: (email: string, password: string) => Promise<{
        success: boolean;
        error?: string;
        user?: User;
    }>;
    logout: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    refreshSession: () => Promise<boolean>;
}
