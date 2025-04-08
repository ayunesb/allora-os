
export type User = {
  id: string;
  email: string;
  name: string;
  company_id: string;
  role: 'admin' | 'user';
  created_at: string;
};
