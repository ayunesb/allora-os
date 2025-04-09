
/**
 * TestCompany utilities module
 * Provides functionality for creating and managing test companies
 */

// Export simplified interfaces
export interface TestCompany {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

// Simple response types to avoid deep type recursion
export interface TestCompanyResponse {
  success: boolean;
  data: TestCompany | null;
  message: string;
  error?: string;
  errorCode?: string;
}

// Simplified setup result with direct properties
export interface TestCompanySetupResult {
  success: boolean;
  message: string;
  error?: string;
  errorCode?: string;
  companyId?: string;
  companyName?: string;
}

// Export function references directly
export { getTestCompany } from './getTestCompany';
export { createTestCompany } from './createTestCompany';
export { runTestCompanySetup } from './setupTestCompany';
