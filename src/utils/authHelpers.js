var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
export function resetPassword(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current URL origin (e.g., https://example.com)
            const origin = window.location.origin;
            const redirectTo = `${origin}/update-password`;
            console.log("Sending password reset to:", email);
            console.log("Redirect URL:", redirectTo);
            const { error } = yield supabase.auth.resetPasswordForEmail(email, {
                redirectTo,
            });
            if (error) {
                console.error("Password reset error:", error);
                throw error;
            }
            return { success: true };
        }
        catch (error) {
            console.error("Reset password error details:", error);
            return {
                success: false,
                error: error.message || "Failed to send reset instructions",
            };
        }
    });
}
export function updatePassword(newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.auth.updateUser({
                password: newPassword,
            });
            if (error) {
                throw error;
            }
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error.message || "Failed to update password",
            };
        }
    });
}
export function verifyOtp(email, token) {
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
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error.message || "Failed to verify OTP",
            };
        }
    });
}
export function resendVerificationEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the current URL origin for the redirect
            const origin = window.location.origin;
            const redirectTo = `${origin}/login`;
            const { error } = yield supabase.auth.resend({
                type: "signup",
                email,
                options: {
                    emailRedirectTo: redirectTo,
                },
            });
            if (error) {
                throw error;
            }
            return { success: true };
        }
        catch (error) {
            return {
                success: false,
                error: error.message || "Failed to resend verification email",
            };
        }
    });
}
