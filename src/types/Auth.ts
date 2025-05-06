import type { User } from './user'; // Ensure user.ts has a valid export

export interface User {
  id: string;
  email: string;
  role?: string;
}

export interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  profile?: User;
  refreshProfile?: () => Promise<void>;
  refreshSession?: () => Promise<boolean>;
  isEmailVerified?: boolean;
  authError?: Error | string;
  isSessionExpired?: boolean;
  hasInitialized?: boolean;
}
