import { useSession } from "@/lib/supabase/useSession";
import { Navigate } from "react-router-dom";
export default function RequireAuth({ children }) {
  const { session } = useSession();
  return session ? children : <Navigate to="/login" replace />;
}
