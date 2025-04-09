
import { runTestCompanySetup, getTestCompany, createTestCompany } from '@/utils/company/test';
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

describe('runTestCompanySetup error handling', () => {
  test('should handle profile update error', async () => {
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
    
    // Mock failed profile update
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          update: jest.fn().mockReturnThis(),
          eq: jest.fn().mockResolvedValue({ 
            error: { 
              message: 'Profile update failed', 
              code: 'PROFILE_UPDATE_ERROR' 
            } 
          })
        };
      }
      return {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        single: jest.fn().mockReturnThis(),
        maybeSingle: jest.fn().mockReturnThis(),
      };
    });
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Created company but failed to associate with user');
    expect(result.errorCode).toBe('PROFILE_UPDATE_ERROR');
  });

  test('should handle unexpected exceptions', async () => {
    (getUserProfileByEmail as jest.Mock).mockRejectedValue(new Error('Unexpected error'));
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Error in test company setup');
    expect(result.error).toBe('Unexpected error');
  });
});
