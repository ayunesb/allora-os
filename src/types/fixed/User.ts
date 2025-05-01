
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  avatar_url?: string;
  company_id?: string;
  company?: string;
  industry?: string;
  app_metadata?: {
    is_admin?: boolean;
    [key: string]: any;
  };
  user_metadata?: {
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: string;
    name?: string;
  };
  updated_at?: string;
  created_at?: string;
}
