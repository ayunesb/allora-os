
export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface ValidationResultsUI {
  [key: string]: ValidationResult | any;
}

export interface TableCheckResult {
  exists: boolean;
  message: string;
}

export interface DatabaseCheckItem {
  name: string;
  status: string;
  message?: string;
  tableName?: string;
  exists?: boolean;
}
