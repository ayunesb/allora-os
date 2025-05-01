
import { useAuth } from './useAuth';
import { User } from '@/types/fixed/User';

export const useUser = () => {
  const auth = useAuth();
  
  // Safely return user or null if not available
  return {
    user: auth?.user || null,
    userDetails: auth?.user ? {
      id: auth.user.id,
      email: auth.user.email,
      name: auth.user.user_metadata?.name || `${auth.user.user_metadata?.firstName || ''} ${auth.user.user_metadata?.lastName || ''}`.trim() || null,
      avatar_url: auth.user.user_metadata?.avatar || auth.user.avatar_url || null,
      is_admin: auth.user.app_metadata?.is_admin || false
    } : null,
    isAdmin: auth?.user?.app_metadata?.is_admin || auth?.user?.role === 'admin' || false,
  };
};
