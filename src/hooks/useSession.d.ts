import { Session } from "@supabase/supabase-js";
export declare function useSession(): {
  session: Session;
  setSession: import("react").Dispatch<import("react").SetStateAction<Session>>;
  isSessionExpired: boolean;
  isLoading: boolean;
  setIsLoading: import("react").Dispatch<
    import("react").SetStateAction<boolean>
  >;
  refreshSession: () => Promise<boolean>;
  updateLastActivity: () => void;
};
