
/**
 * Unified User type that all application code should reference
 * This ensures consistency across the app and prevents type errors
 */
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  avatar_url?: string;
  company_id: string;
  company: string;
  industry: string;
  updated_at: string;
  created_at: string;
  app_metadata: {
    is_admin?: boolean;
    [key: string]: any;
  };
  user_metadata: {
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: string;
    name?: string;
  };
  [key: string]: any; // Fallback to prevent build breaks for legacy properties
}
