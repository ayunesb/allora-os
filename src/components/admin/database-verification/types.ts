
export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  message?: string;
}

export interface PolicyStatus {
  table: string;
  name?: string;
  exists: boolean;
  message?: string;
}

export interface FunctionStatus {
  name: string;
  exists: boolean;
  isSecure: boolean;
  message?: string;
}

export interface DatabaseVerificationResult {
  tables: DatabaseTableStatus[];
  policies: PolicyStatus[];
  functions: FunctionStatus[];
  isVerifying: boolean;
}
