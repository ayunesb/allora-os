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
 * Verifies if RLS (Row Level Security) policies are enabled
 * for critical tables in the database
 */
export function verifyRlsPolicies() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const criticalTables = [
            "profiles",
            "companies",
            "strategies",
            "leads",
            "campaigns",
            "communications",
        ];
        const results = [];
        try {
            for (const table of criticalTables) {
                try {
                    // Call the database function to check if RLS is enabled
                    const { data, error } = yield supabase.rpc("check_rls_enabled", {
                        table_name: table,
                    });
                    if (error) {
                        results.push({
                            table,
                            name: `${table}_rls_policy`,
                            exists: false,
                            isSecure: false,
                            status: "error",
                            message: `RLS check failed for '${table}': ${error.message}`,
                        });
                    }
                    else {
                        const rlsEnabled = data && ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.rls_enabled) === true;
                        results.push({
                            table,
                            name: `${table}_rls_policy`,
                            exists: rlsEnabled,
                            isSecure: rlsEnabled,
                            status: rlsEnabled ? "success" : "warning",
                            message: rlsEnabled
                                ? `RLS enabled for '${table}'`
                                : `RLS not enabled for '${table}'`,
                        });
                    }
                }
                catch (err) {
                    results.push({
                        table,
                        name: `${table}_rls_policy`,
                        exists: false,
                        isSecure: false,
                        status: "error",
                        message: `Error checking RLS for '${table}': ${err instanceof Error ? err.message : "Unknown error"}`,
                    });
                }
            }
            return results;
        }
        catch (error) {
            console.error("Error verifying RLS policies:", error);
            return criticalTables.map((table) => ({
                table,
                name: `${table}_rls_policy`,
                exists: false,
                isSecure: false,
                status: "error",
                message: "Failed to verify RLS policies",
            }));
        }
    });
}
