
/**
 * Unified User type that all application code should reference
 * This ensures consistency across the app and prevents type errors
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  company_id: string;
  created_at: string;
  
  // Optional properties
  firstName?: string;
  lastName?: string;
  avatar?: string;
  avatar_url?: string;
  company?: string;
  industry?: string;
  updated_at?: string;
  
  // Metadata
  app_metadata?: {
    is_admin?: boolean;
    [key: string]: any;
  };
  user_metadata?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role?: string;
    name?: string;
    company_id?: string;
    company?: string;
    industry?: string;
    [key: string]: any;
  };
}
