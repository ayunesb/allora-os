var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
export function handleSignIn(email_1, password_1) {
    return __awaiter(this, arguments, void 0, function* (email, password, rememberMe = false) {
        var _a;
        try {
            console.log("Signing in with email:", email);
            const { data, error } = yield supabase.auth.signInWithPassword({
                email,
                password,
                options: {
                // If rememberMe is true, session will be kept until explicitly signed out
                // Otherwise, session expires after browser close (default behavior)
                },
            });
            if (error) {
                console.error("Sign in error:", error);
                throw error;
            }
            console.log("Sign in successful, user:", (_a = data.user) === null || _a === void 0 ? void 0 : _a.email);
            // Store user preference for "remember me" in local storage
            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            }
            else {
                localStorage.removeItem("rememberMe");
            }
            return {
                success: true,
                user: data.user,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            return {
                success: false,
                error: error.message || "Failed to sign in",
            };
        }
    });
}
export function handleSignUp(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current URL origin for the redirect
            const origin = window.location.origin;
            const redirectTo = `${origin}/login`;
            const { data, error } = yield supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: redirectTo,
                },
            });
            if (error) {
                throw error;
            }
            return {
                success: true,
                user: data.user,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            return {
                success: false,
                error: error.message || "Failed to sign up",
            };
        }
    });
}
export function handleSignOut() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.auth.signOut();
            if (error)
                throw error;
            // Clear any auth related items from storage
            localStorage.removeItem("rememberMe");
            return { success: true };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            return { success: false, error: error.message };
        }
    });
}
export function refreshSession() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { data, error } = yield supabase.auth.refreshSession();
            if (error)
                throw error;
            return { session: data.session, user: (_b = (_a = data.session) === null || _a === void 0 ? void 0 : _a.user) !== null && _b !== void 0 ? _b : null };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            throw error;
        }
    });
}
export function sendPasswordResetEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current URL origin (e.g., https://example.com)
            const origin = window.location.origin;
            const redirectTo = `${origin}/update-password`;
            const { error } = yield supabase.auth.resetPasswordForEmail(email, {
                redirectTo,
            });
            if (error) {
                throw error;
            }
            return { success: true };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            return {
                success: false,
                error: error.message || "Failed to send reset instructions",
            };
        }
    });
}
export function verifyOtpCode(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase.auth.verifyOtp({
                email,
                token,
                type: "recovery",
            });
            if (error) {
                throw error;
            }
            return { success: true, session: data.session };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            return {
                success: false,
                error: error.message || "Failed to verify reset code",
            };
        }
    });
}
export function updateUserPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.auth.updateUser({
                password,
            });
            if (error) {
                throw error;
            }
            return { success: true };
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(error.message); // Safely access 'message' property
            }
            else {
                console.error("An unknown error occurred.");
            }
            return {
                success: false,
                error: error.message || "Failed to update password",
            };
        }
    });
}
