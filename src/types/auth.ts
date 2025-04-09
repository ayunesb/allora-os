
import { User, Session } from '@supabase/supabase-js';
import { UserProfile } from '@/utils/profileHelpers';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  profile: UserProfile | null;
  isProfileLoading: boolean;
  isEmailVerified: boolean;
  authError: string | null;
  isSessionExpired: boolean;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  refreshSession: () => Promise<boolean>;
  updateUserProfile: (data: Partial<Omit<UserProfile, 'id' | 'created_at'>>) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; error?: string, session?: Session }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInWithGitHub: () => Promise<{ success: boolean; error?: string }>;
}
