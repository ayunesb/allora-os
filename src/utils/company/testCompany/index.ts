
/**
 * TestCompany utilities module
 * Provides functionality for creating and managing test companies
 */

// Re-export all test company functions
export * from './setupTestCompany';
export * from './getTestCompany';
export * from './createTestCompany';

// Export common interfaces
export interface TestCompany {
  id: string;
  name: string;
  created_at: string;
  industry?: string;
}

export interface TestCompanySetupResult {
  success: boolean;
  message: string;
  companyId?: string;
  companyName?: string;
  error?: string;
}
