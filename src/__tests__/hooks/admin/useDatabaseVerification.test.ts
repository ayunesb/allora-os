
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks'; // Corrected import
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { toast } from 'sonner';
import * as databaseVerification from '@/utils/admin/databaseVerification';

// Mock the dependencies
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('@/utils/admin/databaseVerification', () => ({
  verifyDatabaseTables: vi.fn(),
  verifyRlsPolicies: vi.fn(),
  verifyDatabaseFunctions: vi.fn(),
  displayVerificationResults: vi.fn()
}));

vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    rpc: vi.fn(),
    auth: {
      getUser: vi.fn()
    }
  }
}));

describe('useDatabaseVerification Hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should initialize with empty verification result', () => {
    const { result } = renderHook(() => useDatabaseVerification());
    
    expect(result.current.verificationResult).toEqual({
      tables: [],
      policies: [],
      functions: [],
      isVerifying: false
    });
  });

  it('should verify database configuration when triggered', async () => {
    // Mock the verification functions
    const mockTables = [{ name: 'profiles', exists: true, message: 'Table exists' }];
    const mockPolicies = [{ table: 'profiles', exists: true, message: 'RLS enabled' }];
    const mockFunctions = [{ name: 'handle_new_user', exists: true, isSecure: true, message: 'Function is secure' }];
    
    vi.mocked(databaseVerification.verifyDatabaseTables).mockResolvedValue(mockTables);
    vi.mocked(databaseVerification.verifyRlsPolicies).mockResolvedValue(mockPolicies);
    vi.mocked(databaseVerification.verifyDatabaseFunctions).mockResolvedValue(mockFunctions);
    
    const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
    
    // Trigger the verification
    act(() => {
      result.current.verifyDatabaseConfiguration();
    });
    
    // Check that isVerifying was set to true
    expect(result.current.verificationResult.isVerifying).toBe(true);
    
    await waitForNextUpdate();
    
    // After update, should have results and not be verifying
    expect(result.current.verificationResult).toEqual({
      tables: mockTables,
      policies: mockPolicies,
      functions: mockFunctions,
      isVerifying: false
    });
    
    // Should have called the display function
    expect(databaseVerification.displayVerificationResults).toHaveBeenCalledWith(
      mockTables, mockPolicies, mockFunctions
    );
  });

  it('should handle errors during verification', async () => {
    // Mock a verification function to throw an error
    vi.mocked(databaseVerification.verifyDatabaseTables).mockRejectedValue(new Error('Test error'));
    
    const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
    
    // Trigger the verification
    act(() => {
      result.current.verifyDatabaseConfiguration();
    });
    
    await waitForNextUpdate();
    
    // Should have shown error toast
    expect(toast.error).toHaveBeenCalled();
    
    // Should reset isVerifying
    expect(result.current.verificationResult.isVerifying).toBe(false);
  });

  it('should show appropriate toast message based on issues count', async () => {
    // Mock verification functions with no issues
    const mockTables = [{ name: 'profiles', exists: true, message: 'Table exists' }];
    const mockPolicies = [{ table: 'profiles', exists: true, message: 'RLS enabled' }];
    const mockFunctions = [{ name: 'handle_new_user', exists: true, isSecure: true, message: 'Function is secure' }];
    
    vi.mocked(databaseVerification.verifyDatabaseTables).mockResolvedValue(mockTables);
    vi.mocked(databaseVerification.verifyRlsPolicies).mockResolvedValue(mockPolicies);
    vi.mocked(databaseVerification.verifyDatabaseFunctions).mockResolvedValue(mockFunctions);
    
    const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
    
    // Trigger verification
    act(() => {
      result.current.verifyDatabaseConfiguration();
    });
    
    await waitForNextUpdate();
    
    // Should have shown success toast
    expect(toast.success).toHaveBeenCalledWith("Database verification completed - All checks passed");
    
    // Reset and test with issues
    vi.resetAllMocks();
    
    // Mock verification functions with issues
    const mockTablesWithIssues = [{ name: 'profiles', exists: false, message: 'Table missing' }];
    
    vi.mocked(databaseVerification.verifyDatabaseTables).mockResolvedValue(mockTablesWithIssues);
    vi.mocked(databaseVerification.verifyRlsPolicies).mockResolvedValue(mockPolicies);
    vi.mocked(databaseVerification.verifyDatabaseFunctions).mockResolvedValue(mockFunctions);
    
    const { result: result2, waitForNextUpdate: waitForNextUpdate2 } = renderHook(() => useDatabaseVerification());
    
    // Trigger verification again
    act(() => {
      result2.current.verifyDatabaseConfiguration();
    });
    
    await waitForNextUpdate2();
    
    // Should have shown error toast with count
    expect(toast.error).toHaveBeenCalledWith(expect.stringMatching(/1 issues found/));
  });
});
