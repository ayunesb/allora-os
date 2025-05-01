
import { useAuth } from './useAuth';
import { UnifiedUser } from '@/types/unified-types';

export const useUser = () => {
  const auth = useAuth();
  
  // Safely return user or null if not available
  return {
    user: auth?.user || null,
    userDetails: auth?.user ? {
      id: auth.user.id,
      email: auth.user.email,
      name: auth.user.user_metadata?.name || 
            auth.user.name || 
            `${auth.user.user_metadata?.firstName || ''} ${auth.user.user_metadata?.lastName || ''}`.trim() || null,
      avatar_url: auth.user.user_metadata?.avatar || 
                 auth.user.avatar_url || null,
      is_admin: auth.user.app_metadata?.is_admin || 
               auth.user.role === 'admin' || false,
      role: auth.user.role || 'user',
      company: auth.user.company || null,
      company_id: auth.user.company_id || null,
      industry: auth.user.industry || null
    } : null,
    isAdmin: auth?.user?.app_metadata?.is_admin || 
            auth?.user?.role === 'admin' || false,
  };
};
