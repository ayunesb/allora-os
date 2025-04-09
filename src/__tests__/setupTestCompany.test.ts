import { runTestCompanySetup } from '@/utils/company/testCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { getTestCompany } from '@/utils/company/testCompany/getTestCompany';
import { createTestCompany } from '@/utils/company/testCompany/createTestCompany';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the dependencies
vi.mock('@/utils/users/fetchUsers');
vi.mock('@/utils/company/testCompany/getTestCompany');
vi.mock('@/utils/company/testCompany/createTestCompany');

// Create a proper typed mock for supabase
vi.mock('@/backend/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      limit: vi.fn().mockReturnThis()
    }))
  }
}));

// Import the mocked supabase
import { supabase } from '@/backend/supabase';

describe('setupTestCompany', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
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
    
    // Create a properly typed mock for from() -> update() -> eq()
    const mockEq = vi.fn().mockResolvedValue({ error: null });
    const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ update: mockUpdate });
    
    // Apply mock implementation
    vi.mocked(supabase.from).mockImplementation(mockFrom);
    
    const result = await runTestCompanySetup('valid@example.com');
    
    expect(result.success).toBe(true);
    expect(result.message).toContain('Successfully created');
    expect(result.companyId).toBe('new-company-123');
    expect(vi.mocked(createTestCompany)).toHaveBeenCalledWith('Test Company - valid');
    
    // Verify profile update was called correctly
    expect(mockFrom).toHaveBeenCalledWith('profiles');
    expect(mockUpdate).toHaveBeenCalledWith({ 
      company_id: 'new-company-123',
      company: 'Test Company - valid',
      email: 'valid@example.com'
    });
    expect(mockEq).toHaveBeenCalledWith('id', 'user-123');
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
    
    // Mock profile update failure with proper typing
    const mockEq = vi.fn().mockResolvedValue({ error: { message: 'Profile update failed' } });
    const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ update: mockUpdate });
    
    // Apply the mock
    vi.mocked(supabase.from).mockImplementation(mockFrom);
    
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
