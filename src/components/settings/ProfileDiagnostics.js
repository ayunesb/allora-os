import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function ProfileDiagnostics() {
    const auth = useAuth();
    const { user, session, isLoading, hasInitialized } = auth;
    if (isLoading || !hasInitialized) {
        return null;
    }
    if (!user) {
        return (_jsx(Card, { className: "mb-6 bg-red-50 dark:bg-red-900/10", children: _jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { className: "text-red-600 dark:text-red-400", children: "Not Authenticated" }), _jsx(CardDescription, { children: "You are not currently authenticated. Please sign in to view your profile." })] }) }));
    }
    return (_jsxs(Card, { className: "mb-6 bg-green-50 dark:bg-green-900/10", children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { className: "text-green-600 dark:text-green-400", children: "Authentication Status" }), _jsxs(CardDescription, { children: ["You are authenticated as ", user.email] })] }), _jsx(CardContent, { children: _jsxs("div", { className: "text-sm space-y-1.5", children: [_jsxs("p", { children: [_jsx("strong", { children: "User ID:" }), " ", user.id] }), _jsxs("p", { children: [_jsx("strong", { children: "Role:" }), " ", user.role] }), _jsxs("p", { children: [_jsx("strong", { children: "Session Active:" }), " ", session ? "Yes" : "No"] }), session && (_jsxs("div", { className: "mt-2", children: [_jsx("p", { children: _jsx("strong", { children: "Session Details:" }) }), _jsx("pre", { className: "bg-slate-100 dark:bg-slate-800 p-2 rounded text-xs overflow-x-auto", children: JSON.stringify({
                                        provider: (session === null || session === void 0 ? void 0 : session.provider_token)
                                            ? "OAuth provider"
                                            : "Email/Password",
                                        expires_at: (session === null || session === void 0 ? void 0 : session.expires_at)
                                            ? new Date(session.expires_at * 1000).toLocaleString()
                                            : "Unknown",
                                        last_accessed: (session === null || session === void 0 ? void 0 : session.last_sign_in_at)
                                            ? new Date(session.last_sign_in_at).toLocaleString()
                                            : "Unknown",
                                    }, null, 2) })] }))] }) })] }));
}
