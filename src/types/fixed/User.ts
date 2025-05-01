export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  avatar_url?: string;
  company_id?: string;
  company?: string;
  industry?: string;
  updated_at?: string;
  app_metadata?: any;
  [key: string]: any; // 👈 fallback to prevent build breaks for legacy properties
}
