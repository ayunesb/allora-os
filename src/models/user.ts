
export interface User {
  id: string;
  email: string;
  name?: string;
  company_id?: string;
  role: "user" | "admin";
  created_at?: string;
  company?: string;
  industry?: string;
  app_metadata?: {
    is_admin?: boolean;
    [key: string]: any;
  };
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    [key: string]: any;
  };
}
