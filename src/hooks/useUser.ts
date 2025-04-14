
import { useAuth } from './useAuth';

export const useUser = () => {
  const { user } = useAuth();
  
  return {
    user,
    userDetails: user ? {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || null,
      avatar_url: user.user_metadata?.avatar_url || null,
      is_admin: user.app_metadata?.is_admin || false
    } : null,
    isAdmin: user?.app_metadata?.is_admin || false,
  };
};
