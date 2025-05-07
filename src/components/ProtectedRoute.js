var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
// Loading state component
const AuthLoadingState = () => (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" }), _jsx("p", { className: "text-lg text-center text-muted-foreground", children: "Verifying your access..." })] }));
// Auth error state component
const AuthErrorState = ({ error, onRetry, isRetrying }) => (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: _jsxs("div", { className: "p-6 bg-destructive/10 rounded-lg max-w-md", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-destructive", children: "Authentication Error" }), _jsx("p", { className: "mb-4", children: error }), _jsx("button", { onClick: onRetry, disabled: isRetrying, className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors", children: isRetrying ? "Retrying..." : "Retry" })] }) }));
// Verification required state component
const VerificationRequiredState = ({ onRefresh, onResendVerification, isResending, }) => (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: _jsxs("div", { className: "p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg max-w-md", children: [_jsx("h2", { className: "text-xl font-bold mb-4 text-yellow-700 dark:text-yellow-400", children: "Email Verification Required" }), _jsx("p", { className: "mb-4", children: "Please verify your email address before continuing." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx("button", { onClick: onRefresh, className: "bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors", children: "I've Verified My Email" }), _jsx("button", { onClick: onResendVerification, disabled: isResending, className: "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors", children: isResending ? "Sending..." : "Resend Verification Email" })] })] }) }));
export default function ProtectedRoute({ children, roleRequired, adminOnly, requireVerified = false, }) {
    var _a, _b, _c;
    const auth = useAuth();
    const location = useLocation();
    const [isVerifying, setIsVerifying] = useState(true);
    const [lastVerified, setLastVerified] = useState(Date.now());
    // Force session verification on sensitive routes or after time threshold
    useEffect(() => {
        const verifyAuthentication = () => __awaiter(this, void 0, void 0, function* () {
            setIsVerifying(true);
            // Only verify if we have a user and sufficient time has passed since last verification
            // or if we're on a sensitive route that requires latest auth state
            const isSensitiveRoute = adminOnly || roleRequired === "admin" || requireVerified;
            const timeThreshold = isSensitiveRoute ? 30000 : 300000; // 30 seconds for sensitive routes, 5 minutes for others
            const shouldVerify = auth.user &&
                (Date.now() - lastVerified > timeThreshold || isSensitiveRoute);
            if (shouldVerify && auth.refreshSession) {
                yield auth.refreshSession();
                setLastVerified(Date.now());
            }
            setIsVerifying(false);
        });
        verifyAuthentication();
    }, [
        location.pathname,
        auth.user,
        adminOnly,
        roleRequired,
        requireVerified,
        auth.refreshSession,
        lastVerified,
    ]);
    // Handle loading state
    if (auth.isLoading || auth.loading || isVerifying) {
        return _jsx(AuthLoadingState, {});
    }
    // Handle expired session
    if (auth.isSessionExpired) {
        return (_jsx(Navigate, { to: "/login", state: { from: location, expired: true }, replace: true }));
    }
    // Handle unauthenticated users
    if (!auth.user && auth.hasInitialized) {
        toast.error("Please log in to access this page", {
            description: "This page requires authentication.",
        });
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    // Handle auth errors
    if (auth.authError) {
        return (_jsx(AuthErrorState, { error: auth.authError, onRetry: () => __awaiter(this, void 0, void 0, function* () {
                if (auth.refreshSession) {
                    yield auth.refreshSession();
                }
            }), isRetrying: false }));
    }
    // Handle verification requirement
    if (requireVerified && !auth.isEmailVerified && auth.hasInitialized) {
        return (_jsx(VerificationRequiredState, { onRefresh: () => __awaiter(this, void 0, void 0, function* () {
                if (auth.refreshSession) {
                    yield auth.refreshSession();
                }
            }), onResendVerification: () => __awaiter(this, void 0, void 0, function* () {
                // Implement resend verification logic here
            }), isResending: false }));
    }
    // Handle admin access check
    if ((adminOnly || roleRequired === "admin") && auth.hasInitialized) {
        const isAdmin = ((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.role) === "admin" ||
            (((_b = auth.user) === null || _b === void 0 ? void 0 : _b.app_metadata) && auth.user.app_metadata.is_admin);
        if (!isAdmin) {
            toast.error("You don't have permission to access this page", {
                description: "This area requires administrator privileges.",
            });
            return _jsx(Navigate, { to: "/dashboard", replace: true });
        }
    }
    else if (roleRequired && auth.profile && auth.hasInitialized) {
        const userRole = ((_c = auth.profile) === null || _c === void 0 ? void 0 : _c.role) || "user";
        const hasRequiredRole = userRole === roleRequired ||
            (roleRequired === "user" && userRole === "admin");
        if (!hasRequiredRole) {
            toast.error("You don't have permission to access this page", {
                description: `You need ${roleRequired} privileges to access this area.`,
            });
            return _jsx(Navigate, { to: "/dashboard", replace: true });
        }
    }
    return _jsx(_Fragment, { children: children });
}
