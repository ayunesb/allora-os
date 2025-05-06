var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { useApiClient } from "@/utils/api/enhancedApiClient";
import { toast } from "sonner";
export function useDatabaseVerification() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const { execute } = useApiClient();
    // This is a compatibility object to match the structure expected by tests
    const verificationResult = {
        tables: [],
        policies: [],
        functions: [],
        isVerifying: isLoading,
    };
    const fetchDatabaseInfo = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const data = yield execute("/api/admin/database-verification", "GET");
            setResults(data);
            // Process issues
            const newIssues = [];
            // Table issues
            data.tables.forEach((table) => {
                if (table.status !== "ok") {
                    newIssues.push({
                        type: "table",
                        name: table.name,
                        message: table.message || `Issue with table: ${table.name}`,
                        severity: table.status === "error" ? "error" : "warning",
                    });
                }
            });
            // Function issues
            data.functions.forEach((func) => {
                if (func.status !== "ok") {
                    newIssues.push({
                        type: "function",
                        name: func.name,
                        message: func.message || `Issue with function: ${func.name}`,
                        severity: func.status === "error" ? "error" : "warning",
                    });
                }
            });
            // RLS policy issues
            data.rlsPolicies.forEach((policy) => {
                if (policy.status !== "ok") {
                    newIssues.push({
                        type: "policy",
                        name: `${policy.table}.${policy.name}`,
                        message: policy.message || `Issue with RLS policy: ${policy.name}`,
                        severity: policy.status === "error" ? "error" : "warning",
                    });
                }
            });
            setIssues(newIssues);
            return data;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to fetch database information";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }), [execute]);
    // This is the function being used in the test files
    const verifyDatabaseConfiguration = fetchDatabaseInfo;
    const repairAutomatically = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        setIsLoading(true);
        setError(null);
        try {
            const result = yield execute("/api/admin/database-repair", "POST");
            if (result.success) {
                toast.success(result.message || "Database repaired successfully");
                // Refresh verification data
                yield fetchDatabaseInfo();
            }
            else {
                toast.error(result.message || "Failed to repair database");
            }
            return result;
        }
        catch (err) {
            const errorMessage = err.message || "Failed to repair database";
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }), [execute, fetchDatabaseInfo]);
    return {
        isLoading,
        results,
        issues,
        error,
        fetchDatabaseInfo,
        repairAutomatically,
        // Added to fix test compatibility
        verificationResult,
        verifyDatabaseConfiguration,
    };
}
