
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
  
  // Additional fields needed by components
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  goals?: string;
  risk_appetite?: string;
  personal_api_keys?: Record<string, string>;
  subscription_status?: string;
  subscription_plan_id?: string;
  subscription_expires_at?: string;
  
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
