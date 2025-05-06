import { User } from "@/types/fixed/User";
export declare const useUser: () => {
  user: User;
  userDetails: {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    avatar_url: string;
    is_admin: boolean;
    role: "user" | "admin";
    company: string;
    company_id: string;
    industry: string;
  };
  isAdmin: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  session: any;
};
