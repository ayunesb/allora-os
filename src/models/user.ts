
export type User = {
  id: string;
  email: string;
  name: string;
  companyId: string;
  role: 'admin' | 'user';
  created_at: string;
};
