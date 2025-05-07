import { jsx as _jsx } from "react/jsx-runtime";
import { AuthProvider } from "@/context/AuthContext";
/**
 * A component that ensures all children are wrapped with the AuthProvider
 * to prevent "useAuth must be used within an AuthProvider" errors
 */
export function AuthProviderWrapper({ children }) {
    return _jsx(AuthProvider, { children: children });
}
