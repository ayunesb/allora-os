
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runTestCompanySetup, getTestCompany, createTestCompany } from '@/utils/company/test';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockReturnThis(),
  }
}));

vi.mock('@/utils/users/fetchUsers', () => ({
  getUserProfileByEmail: vi.fn()
}));

vi.mock('@/utils/company/test', () => ({
  ...vi.importActual('@/utils/company/test'),
  getTestCompany: vi.fn(),
  createTestCompany: vi.fn()
}));

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

describe('runTestCompanySetup error handling', () => {
  it('should handle profile update error', async () => {
    const mockUser = { id: 'user-123', email: 'test@example.com' };
    const mockNewCompany = { id: 'new-company-123', name: 'Test Company - test', created_at: '2023-01-01' };
    
    // Mock user exists
    vi.mocked(getUserProfileByEmail).mockResolvedValue(mockUser);
    
    // Mock no existing company
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    
    // Mock successful company creation
    vi.mocked(createTestCompany).mockResolvedValue({
      success: true,
      data: mockNewCompany,
      message: 'Test company "Test Company - test" created successfully'
    });
    
    // Mock failed profile update
    vi.mocked(supabase.from).mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          update: vi.fn().mockReturnThis(),
          eq: vi.fn().mockResolvedValue({ 
            error: { 
              message: 'Profile update failed', 
              code: 'PROFILE_UPDATE_ERROR' 
            } 
          })
        };
      }
      return {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockReturnThis(),
      };
    });
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Created company but failed to associate with user');
    expect(result.errorCode).toBe('PROFILE_UPDATE_ERROR');
  });

  it('should handle unexpected exceptions', async () => {
    vi.mocked(getUserProfileByEmail).mockRejectedValue(new Error('Unexpected error'));
    
    const result = await runTestCompanySetup('test@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Error in test company setup');
    expect(result.error).toBe('Unexpected error');
  });
});
