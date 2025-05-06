var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Export all the verification utilities
export * from "./tableVerification";
export * from "./rlsVerification";
export * from "./functionVerification";
export * from "./displayResults";
// Add a new dedicated function to check if a user is logged in and has admin privileges
export function checkVerificationAccess() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Import supabase client
            const { supabase } = yield import("@/integrations/supabase/client");
            // Check if user is logged in
            const { data: { session }, } = yield supabase.auth.getSession();
            if (!session) {
                console.log("Database verification: No active session found");
                return {
                    canAccess: false,
                    reason: "authentication",
                    message: "You must be logged in to verify database",
                };
            }
            // Check if user has a profile with admin role
            const { data: profile, error: profileError } = yield supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single();
            if (profileError) {
                console.error("Error checking user role:", profileError);
                return {
                    canAccess: false,
                    reason: "profile",
                    message: "Could not verify user permissions",
                };
            }
            if ((profile === null || profile === void 0 ? void 0 : profile.role) !== "admin") {
                console.log("User does not have admin role:", profile === null || profile === void 0 ? void 0 : profile.role);
                return {
                    canAccess: false,
                    reason: "permission",
                    message: "Admin role required for database verification",
                };
            }
            return { canAccess: true };
        }
        catch (error) {
            console.error("Error checking verification access:", error);
            return {
                canAccess: false,
                reason: "error",
                message: "Error checking permissions",
            };
        }
    });
}
