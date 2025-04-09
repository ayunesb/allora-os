
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getTestCompany } from '@/utils/company/testCompany';
import { supabase } from '@/integrations/supabase/client';
import { mockSuccessTestCompanyResponse, mockEmptyTestCompanyResponse, mockErrorTestCompanyResponse, mockTestCompany } from './mockData';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn()
  }
}));

describe('getTestCompany', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns test company when one exists', async () => {
    // Arrange
    const mockSupabaseResponse = {
      data: mockTestCompany,
      error: null
    };
    
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.select).mockReturnValue(supabase as any);
    vi.mocked(supabase.eq).mockReturnValue(supabase as any);
    vi.mocked(supabase.limit).mockReturnValue(supabase as any);
    vi.mocked(supabase.maybeSingle).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await getTestCompany();

    // Assert
    expect(result).toEqual(mockSuccessTestCompanyResponse);
    expect(supabase.from).toHaveBeenCalledWith('companies');
    expect(supabase.select).toHaveBeenCalledWith('id, name, created_at, industry');
    expect(supabase.eq).toHaveBeenCalledWith('is_test', true);
    expect(supabase.limit).toHaveBeenCalledWith(1);
  });

  it('returns null data when no test company exists', async () => {
    // Arrange
    const mockSupabaseResponse = {
      data: null,
      error: null
    };
    
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.select).mockReturnValue(supabase as any);
    vi.mocked(supabase.eq).mockReturnValue(supabase as any);
    vi.mocked(supabase.limit).mockReturnValue(supabase as any);
    vi.mocked(supabase.maybeSingle).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await getTestCompany();

    // Assert
    expect(result).toEqual(mockEmptyTestCompanyResponse);
  });

  it('returns error response when database query fails', async () => {
    // Arrange
    const mockSupabaseResponse = {
      data: null,
      error: {
        message: "Database error",
        code: "DB_ERROR"
      }
    };
    
    vi.mocked(supabase.from).mockReturnValue(supabase as any);
    vi.mocked(supabase.select).mockReturnValue(supabase as any);
    vi.mocked(supabase.eq).mockReturnValue(supabase as any);
    vi.mocked(supabase.limit).mockReturnValue(supabase as any);
    vi.mocked(supabase.maybeSingle).mockResolvedValue(mockSupabaseResponse);

    // Act
    const result = await getTestCompany();

    // Assert
    expect(result).toEqual(mockErrorTestCompanyResponse);
  });

  it('handles unexpected errors', async () => {
    // Arrange
    vi.mocked(supabase.from).mockImplementation(() => {
      throw new Error('Unexpected error');
    });

    // Act
    const result = await getTestCompany();

    // Assert
    expect(result.success).toBe(false);
    expect(result.message).toBe('Unexpected error in getTestCompany');
    expect(result.error).toBe('Unexpected error');
  });
});
