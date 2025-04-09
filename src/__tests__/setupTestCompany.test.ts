
import { runTestCompanySetup } from '@/utils/company/testCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { getTestCompany } from '@/utils/company/testCompany/getTestCompany';
import { createTestCompany } from '@/utils/company/testCompany/createTestCompany';
import { supabase } from '@/backend/supabase';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the dependencies
vi.mock('@/utils/users/fetchUsers');
vi.mock('@/utils/company/testCompany/getTestCompany');
vi.mock('@/utils/company/testCompany/createTestCompany');
vi.mock('@/backend/supabase');

// Type the mocks for TypeScript - using proper Vitest MockInstance types
const mockedGetUserProfileByEmail = getUserProfileByEmail as unknown as typeof getUserProfileByEmail & { mockResolvedValue: (value: any) => void, mockRejectedValue: (value: any) => void };
const mockedGetTestCompany = getTestCompany as unknown as typeof getTestCompany & { mockResolvedValue: (value: any) => void };
const mockedCreateTestCompany = createTestCompany as unknown as typeof createTestCompany & { mockResolvedValue: (value: any) => void };

// Properly typed Supabase mock
type SupabaseMock = typeof supabase & {
  from: ReturnType<typeof vi.fn> & {
    mockReturnValue: (value: {
      update: ReturnType<typeof vi.fn> & {
        mockReturnValue: (value: {
          eq: ReturnType<typeof vi.fn> & {
            mockResolvedValue: (value: { error: Error | null }) => void
          }
        }) => void
      }
    }) => void
  }
};

const mockedSupabase = supabase as SupabaseMock;

describe('setupTestCompany', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Properly typed mock implementation for supabase
    mockedSupabase.from.mockReturnValue({
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: null })
      })
    });
  });

  it('should validate email format', async () => {
    // Test with invalid email
    const result = await runTestCompanySetup('invalid-email');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Invalid email format');
    expect(mockedGetUserProfileByEmail).not.toHaveBeenCalled();
  });

  it('should fail if user is not found', async () => {
    // Mock user not found
    mockedGetUserProfileByEmail.mockResolvedValue(null);
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('No user found');
    expect(mockedGetUserProfileByEmail).toHaveBeenCalledWith('valid@example.com');
    expect(mockedGetTestCompany).not.toHaveBeenCalled();
  });

  it('should return existing company if one exists', async () => {
    // Mock user found
    mockedGetUserProfileByEmail.mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock existing company found
    mockedGetTestCompany.mockResolvedValue({
      id: 'company-123',
      name: 'Existing Test Company',
      created_at: '2023-01-01'
    });
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('already exists');
    expect(result.companyId).toBe('company-123');
    expect(result.companyName).toBe('Existing Test Company');
    expect(mockedCreateTestCompany).not.toHaveBeenCalled();
  });

  it('should create new company when none exists', async () => {
    // Mock user found
    mockedGetUserProfileByEmail.mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock no existing company
    mockedGetTestCompany.mockResolvedValue(null);
    
    // Mock company creation success
    mockedCreateTestCompany.mockResolvedValue({
      id: 'new-company-123',
      name: 'Test Company - valid',
      created_at: '2023-01-01'
    });
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Successfully created');
    expect(result.companyId).toBe('new-company-123');
    expect(mockedCreateTestCompany).toHaveBeenCalledWith('Test Company - valid');
    
    // Verify profile update was called correctly
    expect(mockedSupabase.from).toHaveBeenCalledWith('profiles');
    expect(mockedSupabase.from().update).toHaveBeenCalledWith({
      company_id: 'new-company-123',
      company: 'Test Company - valid',
      email: 'valid@example.com'
    });
  });

  it('should handle company creation failure', async () => {
    // Mock user found
    mockedGetUserProfileByEmail.mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock no existing company
    mockedGetTestCompany.mockResolvedValue(null);
    
    // Mock company creation failure
    mockedCreateTestCompany.mockResolvedValue(null);
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Failed to create test company');
    expect(mockedSupabase.from).not.toHaveBeenCalled();
  });

  it('should handle profile update failure', async () => {
    // Mock user found
    mockedGetUserProfileByEmail.mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock no existing company
    mockedGetTestCompany.mockResolvedValue(null);
    
    // Mock company creation success
    mockedCreateTestCompany.mockResolvedValue({
      id: 'new-company-123',
      name: 'Test Company - valid',
      created_at: '2023-01-01'
    });
    
    // Mock profile update failure - with proper typing
    mockedSupabase.from.mockReturnValue({
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ error: { message: 'Profile update failed' } })
      })
    });
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Created company but failed to associate with user');
  });

  it('should handle unexpected errors gracefully', async () => {
    // Mock user found
    mockedGetUserProfileByEmail.mockRejectedValue(new Error('Unexpected database error'));
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Error in test company setup: Unexpected database error');
  });
});
