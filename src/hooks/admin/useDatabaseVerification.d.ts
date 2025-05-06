export interface TableInfo {
  name: string;
  rowCount: number;
  description: string | null;
  status: "ok" | "warning" | "error";
  message?: string;
}
export interface FunctionInfo {
  name: string;
  returnType: string;
  language: string;
  status: "ok" | "warning" | "error";
  message?: string;
}
export interface RlsPolicy {
  table: string;
  name: string;
  definition: string;
  roles: string[];
  status: "ok" | "warning" | "error";
  message?: string;
}
export interface DatabaseVerificationResult {
  tables: TableInfo[];
  functions: FunctionInfo[];
  rlsPolicies: RlsPolicy[];
  lastUpdated: string;
}
export interface DatabaseIssue {
  type: "table" | "function" | "policy";
  name: string;
  message: string;
  severity: "warning" | "error";
}
export declare function useDatabaseVerification(): {
  isLoading: boolean;
  results: DatabaseVerificationResult;
  issues: DatabaseIssue[];
  error: string;
  fetchDatabaseInfo: () => Promise<DatabaseVerificationResult>;
  repairAutomatically: () => Promise<{
    success: boolean;
    message: string;
    repaired: string[];
  }>;
  verificationResult: {
    tables: any[];
    policies: any[];
    functions: any[];
    isVerifying: boolean;
  };
  verifyDatabaseConfiguration: () => Promise<DatabaseVerificationResult>;
};
