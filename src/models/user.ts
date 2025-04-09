
export type User = {
  id: string;
  email?: string; // Make email optional since it's not in the profiles table
  name: string | null;
  company_id: string | null;
  role: 'admin' | 'user';
  created_at: string;
};
