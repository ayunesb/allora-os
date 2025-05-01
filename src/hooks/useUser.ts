
import { useAuth } from '@/context/AuthContext'; 
import { normalizeUserObject } from '@/utils/authCompatibility';
import { User } from '@/types/unified-types';

export const useUser = () => {
  const auth = useAuth();
  const normalizedUser = normalizeUserObject(auth?.user || auth?.profile);
  
  // Safely return user or null if not available
  return {
    user: normalizedUser,
    userDetails: normalizedUser ? {
      id: normalizedUser.id,
      email: normalizedUser.email,
      name: normalizedUser.name,
      avatar_url: normalizedUser.avatar_url,
      is_admin: normalizedUser.app_metadata?.is_admin || 
               normalizedUser.role === 'admin',
      role: normalizedUser.role,
      company: normalizedUser.company,
      company_id: normalizedUser.company_id,
      industry: normalizedUser.industry
    } : null,
    isAdmin: normalizedUser?.app_metadata?.is_admin || 
            normalizedUser?.role === 'admin' || false,
  };
};
