
import { runTestCompanySetup, getTestCompany } from '@/utils/company/test';
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
  getTestCompany: jest.fn()
}));

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('runTestCompanySetup with existing company', () => {
  test('should return existing company if found', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockCompany = { id: 'company-123', name: 'Test Company', created_at: '2023-01-01' };
    
    (getUserProfileByEmail as jest.Mock).mockResolvedValue(mockUser);
    (getTestCompany as jest.Mock).mockResolvedValue({
      success: true,
      data: mockCompany,
      message: 'Test company found'
    });
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toBe('Test company already exists');
    expect(result.companyId).toBe(mockCompany.id);
    expect(result.companyName).toBe(mockCompany.name);
    expect(supabase.from).not.toHaveBeenCalledWith('companies');
  });
});
