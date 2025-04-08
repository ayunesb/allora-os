
import { Session, User } from '@supabase/supabase-js';
import { UserProfile } from '@/utils/profileHelpers';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  profile: UserProfile | null;
  isProfileLoading: boolean;
  isEmailVerified: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshSession: () => Promise<void>;
  updateUserProfile: (data: Partial<Omit<UserProfile, 'id' | 'created_at'>>) => Promise<boolean>;
  sendPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, token: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
}
