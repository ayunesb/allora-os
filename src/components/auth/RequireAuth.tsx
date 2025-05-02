import { useSession } from '@/lib/supabase/useSession';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { session } = useSession();
  return session ? children : <Navigate to="/login" replace />;
}
