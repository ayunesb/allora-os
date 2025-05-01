
import { useAuth } from './useAuth';
import { normalizeUserObject } from '@/utils/authCompatibility';
import { UnifiedUser } from '@/types/unified-types';

export const useUser = () => {
  const auth = useAuth();
  const normalizedUser = normalizeUserObject(auth?.user);
  
  // Safely return user or null if not available
  return {
    user: normalizedUser || null,
    userDetails: normalizedUser ? {
      id: normalizedUser.id,
      email: normalizedUser.email,
      name: normalizedUser.name || 
            `${normalizedUser.user_metadata?.firstName || ''} ${normalizedUser.user_metadata?.lastName || ''}`.trim() || null,
      avatar_url: normalizedUser.avatar_url || 
                 normalizedUser.user_metadata?.avatar || null,
      is_admin: normalizedUser.app_metadata?.is_admin || 
               normalizedUser.role === 'admin' || false,
      role: normalizedUser.role || 'user',
      company: normalizedUser.company || null,
      company_id: normalizedUser.company_id || null,
      industry: normalizedUser.industry || null
    } : null,
    isAdmin: normalizedUser?.app_metadata?.is_admin || 
            normalizedUser?.role === 'admin' || false,
  };
};
