import { useAuth } from "@/context/AuthContext";

/**
 * A hook to easily access the current user's company ID
 * Returns undefined if not available or still loading
 */
export function useCompanyId(): string | undefined {
  const { profile, isProfileLoading } = useAuth();
  
  // If user has a company_id in profile, use that
  if (!isProfileLoading && profile?.company_id) {
    return profile.company_id;
  }
  
  // Otherwise, check if we have stored a company ID from the launch process
  const storedCompanyId = localStorage.getItem('allora_company_id');
  if (storedCompanyId) {
    return storedCompanyId;
  }
  
  // No company ID available
  return undefined;
}
