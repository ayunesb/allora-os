
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
vi.mock('@/backend/supabase', () => {
  const mockFrom = vi.fn();
  const mockUpdate = vi.fn();
  const mockEq = vi.fn();

  mockFrom.mockReturnValue({ update: mockUpdate });
  mockUpdate.mockReturnValue({ eq: mockEq });
  mockEq.mockResolvedValue({ error: null });

  return {
    supabase: {
      from: mockFrom
    }
  };
});

describe('setupTestCompany', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    
    // Get references to the mocked functions
    const mockFrom = vi.mocked(supabase.from);
    const mockUpdate = vi.fn();
    const mockEq = vi.fn();
    
    // Reset the mock chain for each test
    mockFrom.mockReturnValue({ update: mockUpdate });
    mockUpdate.mockReturnValue({ eq: mockEq });
    mockEq.mockResolvedValue({ error: null });
  });

  it('should validate email format', async () => {
    // Test with invalid email
    const result = await runTestCompanySetup('invalid-email');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Invalid email format');
    expect(vi.mocked(getUserProfileByEmail)).not.toHaveBeenCalled();
  });

  it('should fail if user is not found', async () => {
    // Mock user not found
    vi.mocked(getUserProfileByEmail).mockResolvedValue(null);
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('No user found');
    expect(vi.mocked(getUserProfileByEmail)).toHaveBeenCalledWith('valid@example.com');
    expect(vi.mocked(getTestCompany)).not.toHaveBeenCalled();
  });

  it('should return existing company if one exists', async () => {
    // Mock user found
    vi.mocked(getUserProfileByEmail).mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock existing company found
    vi.mocked(getTestCompany).mockResolvedValue({
      id: 'company-123',
      name: 'Existing Test Company',
      created_at: '2023-01-01'
    });
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('already exists');
    expect(result.companyId).toBe('company-123');
    expect(result.companyName).toBe('Existing Test Company');
    expect(vi.mocked(createTestCompany)).not.toHaveBeenCalled();
  });

  it('should create new company when none exists', async () => {
    // Mock user found
    vi.mocked(getUserProfileByEmail).mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock no existing company
    vi.mocked(getTestCompany).mockResolvedValue(null);
    
    // Mock company creation success
    vi.mocked(createTestCompany).mockResolvedValue({
      id: 'new-company-123',
      name: 'Test Company - valid',
      created_at: '2023-01-01'
    });
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Successfully created');
    expect(result.companyId).toBe('new-company-123');
    expect(vi.mocked(createTestCompany)).toHaveBeenCalledWith('Test Company - valid');
    
    // Verify profile update was called correctly
    expect(vi.mocked(supabase.from)).toHaveBeenCalledWith('profiles');
  });

  it('should handle company creation failure', async () => {
    // Mock user found
    vi.mocked(getUserProfileByEmail).mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock no existing company
    vi.mocked(getTestCompany).mockResolvedValue(null);
    
    // Mock company creation failure
    vi.mocked(createTestCompany).mockResolvedValue(null);
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Failed to create test company');
    expect(vi.mocked(supabase.from)).not.toHaveBeenCalled();
  });

  it('should handle profile update failure', async () => {
    // Mock user found
    vi.mocked(getUserProfileByEmail).mockResolvedValue({
      id: 'user-123',
      email: 'valid@example.com',
      name: 'Test User',
      company_id: null,
      role: 'user',
      created_at: '2023-01-01'
    });
    
    // Mock no existing company
    vi.mocked(getTestCompany).mockResolvedValue(null);
    
    // Mock company creation success
    vi.mocked(createTestCompany).mockResolvedValue({
      id: 'new-company-123',
      name: 'Test Company - valid',
      created_at: '2023-01-01'
    });
    
    // Mock profile update failure
    const mockFrom = vi.mocked(supabase.from);
    const mockUpdate = vi.fn();
    const mockEq = vi.fn();
    
    mockFrom.mockReturnValue({ update: mockUpdate });
    mockUpdate.mockReturnValue({ eq: mockEq });
    mockEq.mockResolvedValue({ error: { message: 'Profile update failed' } });
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Created company but failed to associate with user');
  });

  it('should handle unexpected errors gracefully', async () => {
    // Mock user found but throw error
    vi.mocked(getUserProfileByEmail).mockRejectedValue(new Error('Unexpected database error'));
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(false);
    expect(result.message).toContain('Error in test company setup: Unexpected database error');
  });
});
