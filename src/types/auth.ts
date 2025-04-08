
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
}
