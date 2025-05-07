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
 * Verifies if required tables exist in the database
 */
export function verifyDatabaseTables() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const results = [];
        try {
            // Get the list of tables from the database
            const { data, error } = yield supabase
                .from("pg_tables")
                .select("tablename")
                .eq("schemaname", "public");
            if (error) {
                console.error("Error fetching tables:", error);
                return requiredTables.map((table) => ({
                    name: table,
                    exists: false,
                    hasRLS: false,
                    status: "error",
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
                    status: exists ? "success" : "error",
                    message: exists
                        ? `Table '${table}' exists`
                        : `Table '${table}' missing`,
                });
            }
            return results;
        }
        catch (error) {
            console.error("Error verifying database tables:", error);
            return requiredTables.map((table) => ({
                name: table,
                exists: false,
                hasRLS: false,
                status: "error",
                message: "Failed to verify database tables",
            }));
        }
    });
}
