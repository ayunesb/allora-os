
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { runTestCompanySetup } from '@/utils/company/testCompany';
import { getTestCompany } from '@/utils/company/testCompany';
import { createTestCompany } from '@/utils/company/testCompany';
import { getUserProfileByEmail } from '@/utils/users/fetchUsers';
import { supabase } from '@/backend/supabase';
import { mockTestCompany, mockUserProfile, mockSuccessSetupResult, mockErrorSetupResult } from './mockData';

// Mocking the imports
vi.mock('@/utils/company/testCompany/getTestCompany', async () => {
  const actual = await vi.importActual('@/utils/company/testCompany/getTestCompany');
  return {
    ...actual,
    getTestCompany: vi.fn()
  };
});

vi.mock('@/utils/company/testCompany/createTestCompany', async () => {
  const actual = await vi.importActual('@/utils/company/testCompany/createTestCompany');
  return {
    ...actual,
    createTestCompany: vi.fn()
  };
});

vi.mock('@/utils/users/fetchUsers', () => ({
  getUserProfileByEmail: vi.fn()
}));

vi.mock('@/backend/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis()
  }
}));

describe('runTestCompanySetup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('rejects invalid email format', async () => {
    // Act
    const result = await runTestCompanySetup('invalid-email');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid email format provided');
    expect(result.errorCode).toBe('VALIDATION_ERROR');
  });

  it('returns error when user profile not found', async () => {
    // Arrange
    vi.mocked(getUserProfileByEmail).mockResolvedValue(null);

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('No user found with email: user@example.com');
    expect(result.errorCode).toBe('USER_NOT_FOUND');
    expect(getUserProfileByEmail).toHaveBeenCalledWith('user@example.com');
  });

  it('returns existing test company when one exists', async () => {
    // Arrange
    vi.mocked(getUserProfileByEmail).mockResolvedValue(mockUserProfile);
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: mockTestCompany,
      message: 'Test company found'
    });

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe('Test company already exists');
    expect(result.companyId).toBe(mockTestCompany.id);
    expect(result.companyName).toBe(mockTestCompany.name);
  });

  it('creates new test company when none exists', async () => {
    // Arrange
    vi.mocked(getUserProfileByEmail).mockResolvedValue(mockUserProfile);
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    vi.mocked(createTestCompany).mockResolvedValue({
      success: true,
      data: mockTestCompany,
      message: 'Test company created'
    });
    const mockUpdateResponse = { error: null };
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.update).mockReturnValue(supabase as any);
    vi.mocked(supabase.eq).mockResolvedValue(mockUpdateResponse as any);

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully created and associated test company');
    expect(result.companyId).toBe(mockTestCompany.id);
    expect(result.companyName).toBe(mockTestCompany.name);
    expect(createTestCompany).toHaveBeenCalledWith('Test Company - user');
    expect(supabase.from).toHaveBeenCalledWith('profiles');
    expect(supabase.update).toHaveBeenCalledWith(expect.objectContaining({
      company_id: mockTestCompany.id,
    }));
    expect(supabase.eq).toHaveBeenCalledWith('id', mockUserProfile.id);
  });

  it('returns error when company creation fails', async () => {
    // Arrange
    vi.mocked(getUserProfileByEmail).mockResolvedValue(mockUserProfile);
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    vi.mocked(createTestCompany).mockResolvedValue({
      success: false,
      data: null,
      message: 'Error creating test company',
      error: 'Database error',
      errorCode: 'DB_ERROR'
    });

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Failed to create test company');
    expect(result.error).toBe('Database error');
    expect(result.errorCode).toBe('COMPANY_CREATION_FAILED');
  });

  it('returns error when profile update fails', async () => {
    // Arrange
    vi.mocked(getUserProfileByEmail).mockResolvedValue(mockUserProfile);
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    vi.mocked(createTestCompany).mockResolvedValue({
      success: true,
      data: mockTestCompany,
      message: 'Test company created'
    });
    const mockUpdateResponse = { error: { message: 'Update error', code: 'UPDATE_ERROR' } };
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.update).mockReturnValue(supabase as any);
    vi.mocked(supabase.eq).mockResolvedValue(mockUpdateResponse as any);

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toContain('Created company but failed to associate with user');
    expect(result.error).toBe('Update error');
    expect(result.errorCode).toBe('UPDATE_ERROR');
  });

  it('handles unexpected errors', async () => {
    // Arrange
    vi.mocked(getUserProfileByEmail).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toContain('Error in test company setup');
    expect(result.error).toBe('Unexpected error');
  });
});
