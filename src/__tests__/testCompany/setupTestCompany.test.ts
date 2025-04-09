
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runTestCompanySetup } from '@/utils/company/testCompany';
import { supabase } from '@/backend/supabase';
import { mockTestCompany, mockUserProfile, mockSuccessSetupResult, mockErrorSetupResult } from './mockData';
import * as getUserUtil from '@/utils/users/fetchUsers';

// Mock the supabase client
vi.mock('@/backend/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis()
  }
}));

// Mock getTestCompany and createTestCompany
vi.mock('@/utils/company/testCompany/getTestCompany', () => ({
  getTestCompany: vi.fn()
}));

vi.mock('@/utils/company/testCompany/createTestCompany', () => ({
  createTestCompany: vi.fn()
}));

// Mock the getUserProfileByEmail function
vi.mock('@/utils/users/fetchUsers', () => ({
  getUserProfileByEmail: vi.fn()
}));

describe('runTestCompanySetup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates email format and returns error for invalid email', async () => {
    // Act
    const result = await runTestCompanySetup('invalid-email');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid email format provided');
    expect(result.error).toBe('Email validation failed');
    expect(result.errorCode).toBe('VALIDATION_ERROR');
  });

  it('returns error when user profile not found', async () => {
    // Arrange
    vi.mocked(getUserUtil.getUserProfileByEmail).mockResolvedValue(null);

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('No user found with email: user@example.com');
    expect(result.error).toBe('User lookup failed');
    expect(result.errorCode).toBe('USER_NOT_FOUND');
  });

  it('returns existing test company if one exists', async () => {
    // Arrange
    // Add necessary fields to make it compatible with User type
    const userProfileWithRequiredFields = {
      ...mockUserProfile,
      company_id: 'company-id',
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    vi.mocked(getUserUtil.getUserProfileByEmail).mockResolvedValue(userProfileWithRequiredFields);
    
    // Mock getTestCompany to return a successful response
    const { getTestCompany } = require('@/utils/company/testCompany/getTestCompany');
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

  it('creates a new test company when none exists', async () => {
    // Arrange
    // Add necessary fields to make it compatible with User type
    const userProfileWithRequiredFields = {
      ...mockUserProfile,
      company_id: 'company-id',
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    vi.mocked(getUserUtil.getUserProfileByEmail).mockResolvedValue(userProfileWithRequiredFields);
    
    // Mock getTestCompany to return no company
    const { getTestCompany } = require('@/utils/company/testCompany/getTestCompany');
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    
    // Mock createTestCompany to return a successful response
    const { createTestCompany } = require('@/utils/company/testCompany/createTestCompany');
    vi.mocked(createTestCompany).mockResolvedValue({
      success: true,
      data: mockTestCompany,
      message: 'Test company created successfully'
    });
    
    // Mock the Supabase update operation
    const updateMock = vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({
        error: null
      })
    });
    
    const fromMock = vi.fn().mockReturnValue({
      update: updateMock
    });
    
    vi.mocked(supabase.from).mockImplementation(fromMock);

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(true);
    expect(result.message).toBe('Successfully created and associated test company');
    expect(result.companyId).toBe(mockTestCompany.id);
    expect(result.companyName).toBe(mockTestCompany.name);
    
    // Check that the profile was updated
    expect(fromMock).toHaveBeenCalledWith('profiles');
    expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({
      company_id: mockTestCompany.id,
      company: mockTestCompany.name,
      email: 'user@example.com'
    }));
  });

  it('handles profile update error', async () => {
    // Arrange
    // Add necessary fields to make it compatible with User type
    const userProfileWithRequiredFields = {
      ...mockUserProfile,
      company_id: 'company-id',
      role: 'user',
      created_at: new Date().toISOString()
    };
    
    vi.mocked(getUserUtil.getUserProfileByEmail).mockResolvedValue(userProfileWithRequiredFields);
    
    // Mock getTestCompany to return no company
    const { getTestCompany } = require('@/utils/company/testCompany/getTestCompany');
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: null,
      message: 'No test company found'
    });
    
    // Mock createTestCompany to return a successful response
    const { createTestCompany } = require('@/utils/company/testCompany/createTestCompany');
    vi.mocked(createTestCompany).mockResolvedValue({
      success: true,
      data: mockTestCompany,
      message: 'Test company created successfully'
    });
    
    // Mock Supabase update to return an error
    const updateMock = vi.fn().mockReturnValue({
      eq: vi.fn().mockResolvedValue({
        error: {
          message: 'Database error',
          code: 'DB_ERROR'
        }
      })
    });
    
    const fromMock = vi.fn().mockReturnValue({
      update: updateMock
    });
    
    vi.mocked(supabase.from).mockImplementation(fromMock);

    // Act
    const result = await runTestCompanySetup('user@example.com');

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toContain('Created company but failed to associate with user');
    expect(result.error).toBe('Database error');
    expect(result.errorCode).toBe('DB_ERROR');
  });
});
