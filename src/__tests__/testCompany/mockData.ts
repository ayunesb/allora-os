
import { TestCompany, TestCompanyResponse, TestCompanySetupResult } from "@/utils/company/testCompany";

export const mockTestCompany: TestCompany = {
  id: "test-company-id",
  name: "Test Company",
  created_at: new Date().toISOString(),
  industry: "Technology"
};

export const mockSuccessTestCompanyResponse: TestCompanyResponse = {
  success: true,
  data: mockTestCompany,
  message: "Test company found"
};

export const mockEmptyTestCompanyResponse: TestCompanyResponse = {
  success: true,
  data: null,
  message: "No test company found"
};

export const mockErrorTestCompanyResponse: TestCompanyResponse = {
  success: false,
  data: null,
  message: "Error fetching test company",
  error: "Database error",
  errorCode: "DB_ERROR"
};

export const mockUserProfile = {
  id: "user-id-123",
  email: "test@example.com",
  name: "Test User"
};

export const mockSuccessSetupResult: TestCompanySetupResult = {
  success: true,
  message: "Successfully created and associated test company",
  companyId: "test-company-id",
  companyName: "Test Company"
};

export const mockErrorSetupResult: TestCompanySetupResult = {
  success: false,
  message: "Failed to create test company",
  error: "Database error",
  errorCode: "COMPANY_CREATION_FAILED"
};
