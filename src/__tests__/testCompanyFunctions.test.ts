
import { getTestCompany } from '@/utils/company/testCompany/getTestCompany';
import { createTestCompany } from '@/utils/company/testCompany/createTestCompany';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock the supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      maybeSingle: vi.fn(),
      limit: vi.fn().mockReturnThis()
    }))
  }
}));

// Import the mocked supabase
import { supabase } from '@/integrations/supabase/client';

describe('Test Company Utility Functions', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('getTestCompany', () => {
    it('should return success response with company when found', async () => {
      // Mock a successful response with data
      const mockCompany = {
        id: 'company-123',
        name: 'Test Company',
        created_at: '2023-01-01T00:00:00.000Z',
        industry: 'Technology'
      };
      
      const mockMaybeSingle = vi.fn().mockResolvedValue({
        data: mockCompany,
        error: null
      });
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        maybeSingle: mockMaybeSingle
      } as any);
      
      const result = await getTestCompany();
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCompany);
      expect(result.message).toBe('Test company found');
      expect(supabase.from).toHaveBeenCalledWith('companies');
    });

    it('should return success with null data when no company found', async () => {
      // Mock a response with no data but no error
      const mockMaybeSingle = vi.fn().mockResolvedValue({
        data: null,
        error: null
      });
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        maybeSingle: mockMaybeSingle
      } as any);
      
      const result = await getTestCompany();
      
      expect(result.success).toBe(true);
      expect(result.data).toBeNull();
      expect(result.message).toBe('No test company found');
    });

    it('should return error response when database error occurs', async () => {
      // Mock a database error
      const mockError = {
        message: 'Database connection error',
        code: 'DB_ERROR'
      };
      
      const mockMaybeSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError
      });
      
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        limit: vi.fn().mockReturnThis(),
        maybeSingle: mockMaybeSingle
      } as any);
      
      const result = await getTestCompany();
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe('Error fetching test company');
      expect(result.error).toBe(mockError.message);
      expect(result.errorCode).toBe(mockError.code);
    });

    it('should handle unexpected errors gracefully', async () => {
      // Mock an unexpected error
      vi.mocked(supabase.from).mockImplementation(() => {
        throw new Error('Unexpected error');
      });
      
      const result = await getTestCompany();
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe('Unexpected error in getTestCompany');
      expect(result.error).toBe('Unexpected error');
    });
  });

  describe('createTestCompany', () => {
    it('should create a company successfully', async () => {
      // Mock successful company creation
      const mockCompany = {
        id: 'new-company-123',
        name: 'Test Company',
        created_at: '2023-01-01T00:00:00.000Z'
      };
      
      const mockSingle = vi.fn().mockResolvedValue({
        data: mockCompany,
        error: null
      });
      
      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: mockSingle
      } as any);
      
      const result = await createTestCompany('Test Company');
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockCompany);
      expect(result.message).toBe('Test company "Test Company" created successfully');
    });

    it('should return error response when validation fails', async () => {
      const result = await createTestCompany('');
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe('Invalid company name provided');
      expect(result.errorCode).toBe('VALIDATION_ERROR');
      expect(supabase.from).not.toHaveBeenCalled();
    });

    it('should return error response when database error occurs', async () => {
      // Mock a database error
      const mockError = {
        message: 'Unique constraint violation',
        code: 'UNIQUE_VIOLATION'
      };
      
      const mockSingle = vi.fn().mockResolvedValue({
        data: null,
        error: mockError
      });
      
      vi.mocked(supabase.from).mockReturnValue({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: mockSingle
      } as any);
      
      const result = await createTestCompany('Test Company');
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe('Error creating test company');
      expect(result.error).toBe(mockError.message);
      expect(result.errorCode).toBe(mockError.code);
    });

    it('should handle unexpected errors gracefully', async () => {
      // Mock an unexpected error
      vi.mocked(supabase.from).mockImplementation(() => {
        throw new Error('Unexpected creation error');
      });
      
      const result = await createTestCompany('Test Company');
      
      expect(result.success).toBe(false);
      expect(result.data).toBeNull();
      expect(result.message).toBe('Error in createTestCompany');
      expect(result.error).toBe('Unexpected creation error');
    });
  });
});
