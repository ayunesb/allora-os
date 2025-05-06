import { BasicCompanyData, CompanyResponse } from "../types/testCompanyTypes";
/**
 * Checks if the test company exists in the database
 */
export declare function testCompanyExists(): Promise<boolean>;
/**
 * Gets the test company if it exists
 */
export declare function getTestCompany(): Promise<CompanyResponse>;
/**
 * Creates a test company in the database if it doesn't exist
 */
export declare function ensureTestCompanyExists(): Promise<BasicCompanyData | null>;
