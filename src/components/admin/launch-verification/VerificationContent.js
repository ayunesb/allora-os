import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RefreshCw } from "lucide-react";
import { ValidationResultItem } from "./ValidationResultItem";
import { DatabaseTablesSection } from "./DatabaseTablesSection";
import { DatabaseChecksSection } from "./DatabaseChecksSection";
export function VerificationContent({ results, isChecking }) {
    if (isChecking) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-6", children: [_jsx(RefreshCw, { className: "h-8 w-8 animate-spin text-primary mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Running verification checks..." })] }));
    }
    if (!results) {
        return (_jsx("div", { className: "flex flex-col items-center justify-center py-6", children: _jsx("p", { className: "text-muted-foreground mb-4 text-center", children: "Run a comprehensive check to verify all systems are ready for production" }) }));
    }
    // Extract core validation keys (excluding table/db-specific checks)
    const coreValidationKeys = Object.keys(results).filter((key) => ![
        "databaseTables",
        "databaseIndexes",
        "rlsPolicies",
        "databaseFunctions",
        "overallStatus",
    ].includes(key));
    // Type guard function to check if an object has the valid/message structure
    const isValidationResult = (obj) => {
        return obj && typeof obj === "object" && "valid" in obj && "message" in obj;
    };
    return (_jsxs("div", { className: "space-y-3", children: [coreValidationKeys.map((key) => {
                const result = results[key];
                // Use the type guard to safely render ValidationResultItem
                if (isValidationResult(result)) {
                    return (_jsx(ValidationResultItem, { id: key, title: key, result: result }, key));
                }
                return null;
            }), results.databaseTables && (_jsx(DatabaseTablesSection, { tables: results.databaseTables })), results.databaseIndexes && Array.isArray(results.databaseIndexes) && (_jsx(DatabaseChecksSection, { title: "Database Indexes Check", items: results.databaseIndexes })), results.rlsPolicies && Array.isArray(results.rlsPolicies) && (_jsx(DatabaseChecksSection, { title: "RLS Policies Check", items: results.rlsPolicies })), results.databaseFunctions &&
                Array.isArray(results.databaseFunctions) && (_jsx(DatabaseChecksSection, { title: "Database Functions Check", items: results.databaseFunctions }))] }));
}
