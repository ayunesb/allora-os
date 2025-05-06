import { User } from "@/models/user";
import { Company } from "@/models/company";
export interface AdminUserUpdateData {
  name?: string;
  role?: "admin" | "user";
  company_id?: string | null;
}
export interface AdminCompanyUpdateData {
  name?: string;
  industry?: string;
}
export declare const getAllUsers: () => Promise<User[]>;
export declare const getAllCompanies: () => Promise<Company[]>;
export declare const updateUserAsAdmin: (
  userId: string,
  data: AdminUserUpdateData,
) => Promise<boolean>;
export declare const updateCompanyAsAdmin: (
  companyId: string,
  data: AdminCompanyUpdateData,
) => Promise<boolean>;
export declare const deleteUserAsAdmin: (userId: string) => Promise<boolean>;
export declare const deleteCompanyAsAdmin: (
  companyId: string,
) => Promise<boolean>;
export declare const getCompanyUsers: (companyId: string) => Promise<User[]>;
