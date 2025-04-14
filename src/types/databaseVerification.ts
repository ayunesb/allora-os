
export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  hasRLS: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface PolicyStatus {
  table: string;
  name: string;
  exists: boolean;
  isSecure: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface FunctionStatus {
  name: string;
  exists: boolean;
  isSecure: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}
