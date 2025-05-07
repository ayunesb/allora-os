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
/**
 * Checks if a table exists in the database
 */
export function checkTableExists(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the table exists by querying the information_schema
            const { data, error } = yield supabase
                .from("information_schema.tables")
                .select("table_name")
                .eq("table_schema", "public")
                .eq("table_name", tableName)
                .maybeSingle();
            if (error) {
                console.error(`Error checking if table ${tableName} exists:`, error);
                return false;
            }
            return !!data;
        }
        catch (err) {
            console.error(`Exception checking if table ${tableName} exists:`, err);
            return false;
        }
    });
}
/**
 * Checks if Row Level Security is enabled for a table
 */
export function checkRlsEnabled(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if RLS is enabled for the table
            const { data, error } = yield supabase
                .rpc("check_rls_enabled", { table_name: tableName })
                .single();
            if (error) {
                // If the RPC function doesn't exist, we'll do a test select
                // If RLS is properly configured, this will be restricted
                const { error: selectError } = yield supabase
                    .from(tableName)
                    .select("*")
                    .limit(1);
                // If we get a permission error, that suggests RLS is working
                if (selectError &&
                    (selectError.code === "42501" ||
                        selectError.message.includes("permission denied") ||
                        selectError.code === "PGRST116")) {
                    return true;
                }
                console.warn(`Could not check RLS status for ${tableName}:`, error);
                return false;
            }
            // Fix the type issue by explicitly typing the data
            const typedData = data;
            return !!typedData.rls_enabled;
        }
        catch (err) {
            console.error(`Exception checking RLS for ${tableName}:`, err);
            return false;
        }
    });
}
/**
 * Checks if the current user has admin privileges
 */
export function checkIfUserIsAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // First get the current user's auth info
            const { data: { session }, } = yield supabase.auth.getSession();
            if (!session || !session.user) {
                console.error("No active session found when checking admin status");
                return false;
            }
            // Then check if the user's profile has the admin role
            const { data: profileData, error: profileError } = yield supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single();
            if (profileError) {
                console.error("Error checking admin status:", profileError);
                return false;
            }
            return (profileData === null || profileData === void 0 ? void 0 : profileData.role) === "admin";
        }
        catch (err) {
            console.error("Exception in checkIfUserIsAdmin:", err);
            return false;
        }
    });
}
