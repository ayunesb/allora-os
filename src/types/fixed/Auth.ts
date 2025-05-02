
import { User } from './User';

/**
 * Standardized Authentication Context Props
 * Used across the entire application for consistent auth state management
 */
export interface AuthContextProps {
  // Core user data
  user: User | null;
  profile: User | null; // Alias for user with profile data
  
  // Loading states
  isLoading: boolean;
  loading: boolean; // Duplicate for compatibility with older components
  hasInitialized: boolean;
  
  // Authentication status
  isEmailVerified: boolean;
  isSessionExpired: boolean;
  isAuthenticated?: boolean;
  
  // Error handling
  authError: string | null;
  
  // Session management
  session?: any; // For Supabase session
  
  // Methods
  refreshProfile: () => Promise<void>;
  refreshSession: () => Promise<boolean>; // Return success status
  signOut: () => Promise<void>;
  signIn?: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  login?: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout?: () => Promise<void>; // Alias for signOut for compatibility
}
