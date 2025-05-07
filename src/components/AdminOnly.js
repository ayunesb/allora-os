import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export default function AdminOnly({ children }) {
    var _a, _b, _c;
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    // Calculate isAuthenticated based on user presence
    const isAuthenticated = !!(auth === null || auth === void 0 ? void 0 : auth.user);
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/auth/login", replace: true });
    }
    // Check if the user has admin role
    const isAdmin = ((_a = auth.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" || ((_c = (_b = auth.user) === null || _b === void 0 ? void 0 : _b.app_metadata) === null || _c === void 0 ? void 0 : _c.is_admin);
    if (!isAdmin) {
        toast.error("Access denied. Admin rights required.", {
            id: "admin-access-denied",
        });
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
