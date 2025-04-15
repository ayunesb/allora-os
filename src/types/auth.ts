
import { User, Session } from '@supabase/supabase-js';

export interface UserProfile {
  id?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  company?: string;
  industry?: string;
  role?: string;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  personal_api_keys?: Record<string, string> | null;
  company_size?: string;
  risk_appetite?: string;
  goals?: string[];
  stripe_customer_id?: string;
  subscription_status?: string;
  subscription_plan_id?: string;
  subscription_expires_at?: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  profile: UserProfile | null;
  isProfileLoading: boolean;
  isEmailVerified: boolean;
  authError: string | Error | null;
  isSessionExpired: boolean;
  isAuthenticated?: boolean; 
  hasInitialized?: boolean; 
  userEmail?: string; 
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string; user?: User }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string; user?: User }>;
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
