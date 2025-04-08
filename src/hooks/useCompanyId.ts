
import { useAuth } from "@/context/AuthContext";

/**
 * A hook to easily access the current user's company ID
 * Returns undefined if not available or still loading
 */
export function useCompanyId(): string | undefined {
  const { profile, isProfileLoading } = useAuth();
  
  if (isProfileLoading || !profile) {
    return undefined;
  }
  
  return profile.company_id || undefined;
}
