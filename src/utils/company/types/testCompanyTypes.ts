// Define a type for JSON data
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

// Company data type
export type BasicCompanyData = {
  id: string;
  name: string;
  industry?: string;
  details?: Record<string, any> | Json;
  created_at?: string;
};

// Response type for company operations
export type CompanyResponse = {
  success: boolean;
  message: string;
  companyId?: string;
  companyName?: string;
  data?: BasicCompanyData | null;
  error?: string;
  errorCode?: string;
};
