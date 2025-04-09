
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

// Placeholders for test company functions
export const runTestCompanySetup = async (email: string): Promise<TestCompanySetupResult> => {
  console.warn('Test company functionality is disabled in production');
  return {
    success: false,
    message: 'Test company functionality is disabled in production'
  };
};

export const getTestCompany = async (): Promise<TestCompanyResponse> => {
  console.warn('Test company functionality is disabled in production');
  return {
    success: false,
    data: null,
    message: 'Test company functionality is disabled in production'
  };
};

export const createTestCompany = async (): Promise<TestCompanyResponse> => {
  console.warn('Test company functionality is disabled in production');
  return {
    success: false,
    data: null,
    message: 'Test company functionality is disabled in production'
  };
};
