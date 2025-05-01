
export interface User {
  id: string;
  email: string;
  name: string;
  company_id: string;
  role: "user" | "admin";
  created_at: string;
}
