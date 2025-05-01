
import { User } from './User';

export interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  loading: boolean;
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
