import { supabase } from "@/integrations/supabase/client";
import { PolicyStatus } from "@/types/databaseVerification";

/**
 * Verifies if RLS (Row Level Security) policies are enabled
 * for critical tables in the database
 */
export async function verifyRlsPolicies(): Promise<PolicyStatus[]> {
  const criticalTables = [
    "profiles",
    "companies",
    "strategies",
    "leads",
    "campaigns",
    "communications",
  ];

  const results: PolicyStatus[] = [];

  try {
    for (const table of criticalTables) {
      try {
        // Call the database function to check if RLS is enabled
        const { data, error } = await supabase.rpc("check_rls_enabled", {
          table_name: table,
        });

        if (error) {
          results.push({
            table,
            name: `${table}_rls_policy`,
            exists: false,
            isSecure: false,
            status: "error" as const,
            message: `RLS check failed for '${table}': ${error.message}`,
          });
        } else {
          const rlsEnabled = data && data[0]?.rls_enabled === true;
          results.push({
            table,
            name: `${table}_rls_policy`,
            exists: rlsEnabled,
            isSecure: rlsEnabled,
            status: rlsEnabled ? ("success" as const) : ("warning" as const),
            message: rlsEnabled
              ? `RLS enabled for '${table}'`
              : `RLS not enabled for '${table}'`,
          });
        }
      } catch (err) {
        results.push({
          table,
          name: `${table}_rls_policy`,
          exists: false,
          isSecure: false,
          status: "error" as const,
          message: `Error checking RLS for '${table}': ${err instanceof Error ? err.message : "Unknown error"}`,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Error verifying RLS policies:", error);
    return criticalTables.map((table) => ({
      table,
      name: `${table}_rls_policy`,
      exists: false,
      isSecure: false,
      status: "error" as const,
      message: "Failed to verify RLS policies",
    }));
  }
}
