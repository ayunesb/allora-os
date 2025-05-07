import { jsx as _jsx } from "react/jsx-runtime";
import { useSession } from "@/lib/supabase/useSession";
import { Navigate } from "react-router-dom";
export default function RequireAuth({ children }) {
    const { session } = useSession();
    return session ? children : _jsx(Navigate, { to: "/login", replace: true });
}
