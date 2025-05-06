import { supabase } from "@/integrations/supabase/client";
import { DatabaseTableStatus } from "@/types/databaseVerification";

/**
 * Verifies if required tables exist in the database
 */
export async function verifyDatabaseTables(): Promise<DatabaseTableStatus[]> {
  const requiredTables = [
    "profiles",
    "companies",
    "strategies",
    "leads",
    "campaigns",
    "communications",
    "tasks",
    "audit_logs",
  ];

  const results: DatabaseTableStatus[] = [];

  try {
    // Get the list of tables from the database
    const { data, error } = await supabase
      .from("pg_tables")
      .select("tablename")
      .eq("schemaname", "public");

    if (error) {
      console.error("Error fetching tables:", error);
      return requiredTables.map((table) => ({
        name: table,
        exists: false,
        hasRLS: false,
        status: "error" as const,
        message: "Failed to fetch tables from database",
      }));
    }

    const tableNames = data.map((t) => t.tablename);

    // Check each required table
    for (const table of requiredTables) {
      const exists = tableNames.includes(table);
      results.push({
        name: table,
        exists: exists,
        hasRLS: false, // We'll set this properly when we check RLS
        status: exists ? ("success" as const) : ("error" as const),
        message: exists
          ? `Table '${table}' exists`
          : `Table '${table}' missing`,
      });
    }

    return results;
  } catch (error) {
    console.error("Error verifying database tables:", error);
    return requiredTables.map((table) => ({
      name: table,
      exists: false,
      hasRLS: false,
      status: "error" as const,
      message: "Failed to verify database tables",
    }));
  }
}
