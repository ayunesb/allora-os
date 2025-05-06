import { User } from "@supabase/supabase-js";
export declare function useUserProfile(): {
  user: User;
  setUser: import("react").Dispatch<import("react").SetStateAction<User>>;
  profile: any;
  setProfile: import("react").Dispatch<any>;
  isProfileLoading: boolean;
  isEmailVerified: boolean;
  authError: string;
  setAuthError: import("react").Dispatch<
    import("react").SetStateAction<string>
  >;
  loadUserProfile: (userId: string) => Promise<void>;
  updateEmailVerification: (user: User | null) => void;
};
