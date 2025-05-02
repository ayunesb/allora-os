
import { User } from './User';

export interface AuthContextProps {
  user: User | null;
  profile: User | null;
  isLoading: boolean;
  loading: boolean; // Duplicate of isLoading for compatibility with different components
  hasInitialized: boolean;
  isEmailVerified: boolean;
  isSessionExpired: boolean;
  isAuthenticated?: boolean;
  authError: string | null;
  session?: any; // For Supabase session
  refreshProfile: () => Promise<void>;
  refreshSession: () => Promise<boolean>; // Return success status
  signOut: () => Promise<void>;
  signIn?: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  login?: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
  logout?: () => Promise<void>; // Alias for signOut for compatibility
}
