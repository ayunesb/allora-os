
import { useUser } from '@/hooks/useUser';
import { useAuth } from '@/context/AuthContext';

/**
 * Hook to get the current user's company ID
 * This is useful for queries that need to filter by company
 */
export const useCompanyId = (): string => {
  const { user } = useUser();
  const auth = useAuth();
  
  // If we're still loading the user, return an empty string
  if (auth.loading) {
    return '';
  }
  
  // Return the company ID from the user object, or an empty string if not available
  return user?.company_id || '';
};

export default useCompanyId;
