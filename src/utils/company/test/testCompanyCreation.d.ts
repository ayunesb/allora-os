import { CompanyResponse } from "../types/testCompanyTypes";
/**
 * Creates a test company for the given user
 */
export declare function createTestCompany(
  userId: string,
  userEmail: string,
): Promise<CompanyResponse>;
