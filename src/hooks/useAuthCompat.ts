
import { useAuth } from '@/context/AuthContext';
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';

export const useAuthCompat = () => {
  const auth = useAuth();
  const authCompat = createAuthCompatibilityLayer(auth);
  
  // Ensure session is properly passed through
  return {
    ...authCompat,
    session: auth.session,
    isAuthenticated: !!auth.user
  };
};

export default useAuthCompat;
