
import { useAuth } from '@/context/AuthContext'; 
import { normalizeUserObject } from '@/utils/authCompatibility';
import { User } from '@/types/fixed/User';

export const useUser = () => {
  const auth = useAuth();
  const normalizedUser = normalizeUserObject(auth?.user || auth?.profile);
  
  // Safely return user or null if not available
  return {
    user: normalizedUser,
    userDetails: normalizedUser ? {
      id: normalizedUser.id,
      email: normalizedUser.email,
      name: normalizedUser.name || `${normalizedUser.firstName || ''} ${normalizedUser.lastName || ''}`.trim(),
      firstName: normalizedUser.firstName || normalizedUser.user_metadata?.firstName || '',
      lastName: normalizedUser.lastName || normalizedUser.user_metadata?.lastName || '',
      avatar_url: normalizedUser.avatar_url || normalizedUser.avatar,
      is_admin: normalizedUser.app_metadata?.is_admin || 
               normalizedUser.role === 'admin',
      role: normalizedUser.role || 'user',
      company: normalizedUser.company || '',
      company_id: normalizedUser.company_id || '',
      industry: normalizedUser.industry || ''
    } : null,
    isAdmin: normalizedUser?.app_metadata?.is_admin || 
            normalizedUser?.role === 'admin' || false,
  };
};
