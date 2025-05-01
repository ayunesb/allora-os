
import { useAuth } from '@/context/AuthContext';
import { createAuthCompatibilityLayer } from '@/utils/authCompatibility';

export const useAuthCompat = () => {
  const auth = useAuth();
  return createAuthCompatibilityLayer(auth);
};
