
import { runTestCompanySetup } from '@/utils/company/test';
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

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

describe('runTestCompanySetup', () => {
  test('should return validation error for invalid email', async () => {
    const result = await runTestCompanySetup('invalid-email');
    
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('VALIDATION_ERROR');
    expect(getUserProfileByEmail).not.toHaveBeenCalled();
  });

  test('should return error when user profile not found', async () => {
    (getUserProfileByEmail as jest.Mock).mockResolvedValue(null);
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('USER_NOT_FOUND');
    expect(getUserProfileByEmail).toHaveBeenCalledWith('valid@example.com');
  });
});
