
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
  isAuthenticated: boolean;
  
  // Error handling
  authError: string | null;
  
  // Session management
  session: any; // Supabase session
  
  // Authentication methods
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout: () => Promise<void>;
  
  // Profile management
  refreshProfile: () => Promise<void>;
  refreshSession: () => Promise<boolean>; // Return success status
}
