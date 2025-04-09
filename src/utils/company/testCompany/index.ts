
/**
 * TestCompany utilities module
 * Provides functionality for creating and managing test companies
 */

import { StandardResponse } from '@/utils/api/standardResponse';

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

export interface TestCompanySetupData {
  companyId?: string;
  companyName?: string;
}

export type TestCompanyResponse = StandardResponse<TestCompany | null>;
export type TestCompanySetupResult = StandardResponse<TestCompanySetupData>;
