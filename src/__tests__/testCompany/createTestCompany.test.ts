
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createTestCompany } from '@/utils/company/testCompany';
import { supabase } from '@/integrations/supabase/client';
import { mockTestCompany } from './mockData';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn()
  }
}));

describe('createTestCompany', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('creates a test company successfully', async () => {
    // Arrange
    const mockSupabaseResponse = {
      data: mockTestCompany,
      error: null
    };
    
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.insert).mockReturnValue(supabase as any);
    vi.mocked(supabase.select).mockReturnValue(supabase as any);
    vi.mocked(supabase.single).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await createTestCompany("Test Company");

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockTestCompany);
    expect(supabase.from).toHaveBeenCalledWith('companies');
    expect(supabase.insert).toHaveBeenCalledWith([
      expect.objectContaining({
        name: "Test Company",
        is_test: true,
        status: 'active'
      })
    ]);
    expect(supabase.select).toHaveBeenCalledWith('id, name, created_at, industry');
  });

  it('returns error for empty company name', async () => {
    // Act
    const result = await createTestCompany("");

    // Assert
    expect(result.success).toBe(false);
    expect(result.error).toBe('Company name must be a non-empty string');
    expect(result.errorCode).toBe('VALIDATION_ERROR');
    expect(supabase.from).not.toHaveBeenCalled();
  });

  it('returns error when database insert fails', async () => {
    // Arrange
    const mockSupabaseResponse = {
      data: null,
      error: {
        message: "Database error",
        code: "DB_ERROR"
      }
    };
    
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.insert).mockReturnValue(supabase as any);
    vi.mocked(supabase.select).mockReturnValue(supabase as any);
    vi.mocked(supabase.single).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await createTestCompany("Test Company");

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Error creating test company');
    expect(result.error).toBe('Database error');
  });

  it('handles unexpected errors', async () => {
    // Arrange
    vi.mocked(supabase.from).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    // Act
    const result = await createTestCompany("Test Company");

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Error in createTestCompany');
    expect(result.error).toBe('Unexpected error');
  });
});
