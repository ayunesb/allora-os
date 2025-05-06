import { Company } from "@/models/company";
export declare function fetchCompany(
  companyId: string,
): Promise<Company | null>;
export declare function fetchUserCompany(
  userId: string,
): Promise<Company | null>;
export declare function updateCompany(
  companyId: string,
  updates: Partial<Omit<Company, "id" | "created_at">>,
): Promise<boolean>;
