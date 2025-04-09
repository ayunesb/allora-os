
import { runTestCompanySetup, getTestCompany, createTestCompany } from '@/utils/company/testCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    single: jest.fn().mockReturnThis(),
    maybeSingle: jest.fn().mockReturnThis(),
  }
}));

jest.mock('@/utils/users/fetchUsers', () => ({
  getUserProfileByEmail: jest.fn()
}));

jest.mock('@/utils/company/testCompany', () => ({
  ...jest.requireActual('@/utils/company/testCompany'),
  getTestCompany: jest.fn(),
  createTestCompany: jest.fn()
}));

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('runTestCompanySetup with company creation', () => {
  test('should create and associate a new company when none exists', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockNewCompany = { id: 'new-company-123', name: 'Test Company - test', created_at: '2023-01-01' };
    
    // Mock user exists
    (getUserProfileByEmail as jest.Mock).mockResolvedValue(mockUser);
    
    // Mock no existing company
    (getTestCompany as jest.Mock).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    
    // Mock successful company creation
    (createTestCompany as jest.Mock).mockResolvedValue({
      success: true,
      data: mockNewCompany,
      message: 'Test company "Test Company - test" created successfully'
    });
    
    // Mock successful profile update
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          update: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ error: null })
        };
      }
      return {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        single: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockReturnThis(),
      };
    });
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully created and associated test company');
    expect(result.companyId).toBe(mockNewCompany.id);
    expect(result.companyName).toBe(mockNewCompany.name);
    expect(createTestCompany).toHaveBeenCalledWith('Test Company - test');
  });

  test('should handle company creation failure', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    
    // Mock user exists
    (getUserProfileByEmail as jest.Mock).mockResolvedValue(mockUser);
    
    // Mock no existing company
    (getTestCompany as jest.Mock).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    
    // Mock failed company creation
    (createTestCompany as jest.Mock).mockResolvedValue({
      success: false,
      data: null,
      message: 'Error creating test company',
      error: 'Database error',
      errorCode: 'DB_ERROR'
    });
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toBe('Failed to create test company');
    expect(result.errorCode).toBe('COMPANY_CREATION_FAILED');
  });
});
