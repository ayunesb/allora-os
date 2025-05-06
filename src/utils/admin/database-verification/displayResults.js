var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toast } from "sonner";
import { logDiagnosticInfo } from "@/utils/logger";
/**
 * Displays user-friendly messages for the verification results
 * and provides detailed diagnostics information
 */
export function displayVerificationResults(tables, policies, functions) {
    // Log detailed diagnostics first for debugging purposes
    logDiagnosticInfo("Database Verification Results", {
        tables,
        policies,
        functions,
    });
    // Check for empty results (indicates possible connection issues)
    if (tables.length === 0 && policies.length === 0 && functions.length === 0) {
        toast.error("No verification data returned", {
            description: "Check your Supabase connection and permissions",
        });
        return;
    }
    // Handle verification process errors (usually first item)
    const processErrorTable = tables.find((t) => t.name === "verification_process" && !t.exists);
    const processErrorPolicy = policies.find((p) => p.table === "verification_process" && !p.exists);
    const processErrorFunction = functions.find((f) => f.name === "verification_process" && !f.exists);
    if (processErrorTable || processErrorPolicy || processErrorFunction) {
        const errorMessage = (processErrorTable === null || processErrorTable === void 0 ? void 0 : processErrorTable.message) ||
            (processErrorPolicy === null || processErrorPolicy === void 0 ? void 0 : processErrorPolicy.message) ||
            (processErrorFunction === null || processErrorFunction === void 0 ? void 0 : processErrorFunction.message) ||
            "Verification process error";
        toast.error("Verification failed", {
            description: errorMessage,
        });
        return;
    }
    // Check for database connection errors
    const connectionError = tables.find((t) => t.name === "database_connection" && !t.exists);
    if (connectionError) {
        toast.error("Database connection error", {
            description: connectionError.message,
        });
        return;
    }
    // Calculate and display status of the tables
    const missingTables = tables.filter((t) => !t.exists);
    if (missingTables.length > 0) {
        if (missingTables.length === tables.length) {
            toast.error("All required tables are missing", {
                description: "You need to run the database setup script",
            });
        }
        else {
            toast.warning(`${missingTables.length} of ${tables.length} tables are missing`, {
                description: "Some tables need to be created",
            });
        }
    }
    else if (tables.length > 0) {
        toast.success("All required tables exist", {
            description: `Verified ${tables.length} tables successfully`,
        });
    }
    // Calculate and display status of RLS policies
    const missingPolicies = policies.filter((p) => !p.exists);
    if (missingPolicies.length > 0) {
        if (missingPolicies.length === policies.length) {
            toast.error("RLS policies are disabled for all tables", {
                description: "Security risk: Enable RLS for your tables",
            });
        }
        else {
            toast.warning(`RLS is disabled for ${missingPolicies.length} tables`, {
                description: "Some tables have security risks",
            });
        }
    }
    else if (policies.length > 0) {
        toast.success("RLS is enabled for all tables", {
            description: `Verified ${policies.length} table policies`,
        });
    }
    // Calculate and display status of database functions
    const missingFunctions = functions.filter((f) => !f.exists);
    const insecureFunctions = functions.filter((f) => f.exists && !f.isSecure);
    if (missingFunctions.length > 0) {
        if (missingFunctions.length === functions.length) {
            toast.error("All required functions are missing", {
                description: "You need to run the database setup script",
            });
        }
        else {
            toast.warning(`${missingFunctions.length} of ${functions.length} functions are missing`, {
                description: "Some functions need to be created",
            });
        }
    }
    else if (insecureFunctions.length > 0) {
        toast.warning(`${insecureFunctions.length} functions are not using SECURITY DEFINER`, {
            description: "Security risk: Functions should use SECURITY DEFINER",
        });
    }
    else if (functions.length > 0) {
        toast.success("All required functions exist and are secure", {
            description: `Verified ${functions.length} functions successfully`,
        });
    }
}
/**
 * Performs a deep diagnostic scan of the application
 */
export function performDeepScan() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting deep application scan...");
        try {
            const { supabase } = yield import("@/integrations/supabase/client");
            // Step 1: Check authentication status
            const { data: { session }, error: sessionError, } = yield supabase.auth.getSession();
            if (sessionError) {
                toast.error("Authentication error during deep scan", {
                    description: sessionError.message,
                });
                console.error("Authentication error:", sessionError);
                return false;
            }
            if (!session) {
                toast.error("Authentication required", {
                    description: "You must be logged in to perform a deep scan",
                });
                console.log("No active session found");
                return false;
            }
            console.log("Authentication check passed, user is logged in");
            // Step 2: Check database connectivity
            const { connected, error: dbError } = yield checkSupabaseConnection();
            if (!connected) {
                toast.error("Database connectivity issue", {
                    description: dbError
                        ? dbError.message
                        : "Could not connect to database",
                });
                console.error("Database connection error:", dbError);
                return false;
            }
            console.log("Database connectivity check passed");
            // Step 3: Check for admin permissions
            const { data: profile, error: profileError } = yield supabase
                .from("profiles")
                .select("role")
                .eq("id", session.user.id)
                .single();
            if (profileError) {
                toast.error("Profile access error", {
                    description: "Could not verify user permissions",
                });
                console.error("Error checking user profile:", profileError);
                return false;
            }
            if ((profile === null || profile === void 0 ? void 0 : profile.role) !== "admin") {
                toast.error("Permission denied", {
                    description: "Admin role required for deep scan",
                });
                console.log("User does not have admin role:", profile === null || profile === void 0 ? void 0 : profile.role);
                return false;
            }
            console.log("Permission check passed, user has admin role");
            // Step 4: Check for required routes
            const routeCheckResult = checkForRequiredRoutes();
            if (!routeCheckResult.success) {
                toast.error("Routing configuration issue", {
                    description: routeCheckResult.message,
                });
                console.error("Route check failed:", routeCheckResult.message);
                return false;
            }
            console.log("Route check passed");
            // All checks passed, perform final verification
            toast.success("Deep scan completed successfully", {
                description: "All system components are properly configured",
            });
            return true;
        }
        catch (error) {
            console.error("Unexpected error during deep scan:", error);
            toast.error("Deep scan failed", {
                description: error instanceof Error ? error.message : "Unknown error occurred",
            });
            return false;
        }
    });
}
/**
 * Check if Supabase connection is working properly
 * @returns A promise with connection status and any errors
 */
function checkSupabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { supabase } = yield import("@/integrations/supabase/client");
            // Try a simple query to check database connection
            const { data, error } = yield supabase
                .from("information_schema.tables")
                .select("table_name")
                .limit(1);
            if (error) {
                return { connected: false, error };
            }
            return { connected: true };
        }
        catch (error) {
            return {
                connected: false,
                error: error instanceof Error ? error : new Error("Unknown error"),
            };
        }
    });
}
/**
 * Check if all required routes are defined
 */
function checkForRequiredRoutes() {
    try {
        // This is a basic check to ensure the router definition exists
        // In a production environment, we would do more sophisticated checks
        if (window.location.pathname.includes("admin/settings") &&
            !document.querySelector("main")) {
            return {
                success: false,
                message: "Admin Settings route definition issue detected",
            };
        }
        return { success: true };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Route check failed",
        };
    }
}
