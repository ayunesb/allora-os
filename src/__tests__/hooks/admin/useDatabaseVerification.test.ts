
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react-hooks';
import { useDatabaseVerification } from '@/hooks/admin/useDatabaseVerification';
import { toast } from 'sonner';
import * as databaseVerification from '@/utils/admin/database-verification';

// Mock the dependencies
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

vi.mock('@/utils/admin/database-verification', () => ({
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

// Test data
const mockTableResults = [{ 
  name: 'profiles', 
  exists: true, 
  hasRLS: true, 
  status: 'success' as const, 
  message: 'Table exists' 
}];
const mockPolicyResults = [{ 
  table: 'profiles',
  name: 'auth_policy', 
  exists: true, 
  isSecure: true,
  status: 'success' as const, 
  message: 'RLS enabled' 
}];
const mockFunctionResults = [{ 
  name: 'handle_new_user', 
  exists: true, 
  isSecure: true, 
  status: 'success' as const, 
  message: 'Function is secure' 
}];

describe('useDatabaseVerification Hook', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with empty verification result', () => {
      const { result } = renderHook(() => useDatabaseVerification());
      
      expect(result.current.verificationResult).toEqual({
        tables: [],
        policies: [],
        functions: [],
        isVerifying: false
      });
    });
  });

  describe('Verification Process', () => {
    beforeEach(() => {
      // Setup common mocks for verification process tests
      vi.mocked(databaseVerification.verifyDatabaseTables).mockResolvedValue(mockTableResults);
      vi.mocked(databaseVerification.verifyRlsPolicies).mockResolvedValue(mockPolicyResults);
      vi.mocked(databaseVerification.verifyDatabaseFunctions).mockResolvedValue(mockFunctionResults);
    });

    it('should set isVerifying flag when verification starts', () => {
      const { result } = renderHook(() => useDatabaseVerification());
      
      act(() => {
        result.current.verifyDatabaseConfiguration();
      });
      
      expect(result.current.verificationResult.isVerifying).toBe(true);
    });

    it('should perform full verification and update results', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
      
      act(() => {
        result.current.verifyDatabaseConfiguration();
      });
      
      await waitForNextUpdate();
      
      // Verify final state
      expect(result.current.verificationResult).toEqual({
        tables: mockTableResults,
        policies: mockPolicyResults,
        functions: mockFunctionResults,
        isVerifying: false
      });
      
      // Verify that all verification functions were called
      expect(databaseVerification.verifyDatabaseTables).toHaveBeenCalledTimes(1);
      expect(databaseVerification.verifyRlsPolicies).toHaveBeenCalledTimes(1);
      expect(databaseVerification.verifyDatabaseFunctions).toHaveBeenCalledTimes(1);
      
      // Verify display function was called with correct params
      expect(databaseVerification.displayVerificationResults).toHaveBeenCalledWith(
        mockTableResults, mockPolicyResults, mockFunctionResults
      );
    });
  });

  describe('Error Handling', () => {
    it('should handle errors during verification and show error toast', async () => {
      // Mock the verification function to throw an error
      const testError = new Error('Test verification error');
      vi.mocked(databaseVerification.verifyDatabaseTables).mockRejectedValue(testError);
      
      const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
      
      act(() => {
        result.current.verifyDatabaseConfiguration();
      });
      
      await waitForNextUpdate();
      
      // Should reset isVerifying flag
      expect(result.current.verificationResult.isVerifying).toBe(false);
      
      // Should show error toast
      expect(toast.error).toHaveBeenCalledWith(expect.stringContaining('Test verification error'));
    });
  });

  describe('Toast Notifications', () => {
    it('should show success toast when all checks pass', async () => {
      // Mock all verification functions to return successful results
      vi.mocked(databaseVerification.verifyDatabaseTables).mockResolvedValue(mockTableResults);
      vi.mocked(databaseVerification.verifyRlsPolicies).mockResolvedValue(mockPolicyResults);
      vi.mocked(databaseVerification.verifyDatabaseFunctions).mockResolvedValue(mockFunctionResults);
      
      const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
      
      act(() => {
        result.current.verifyDatabaseConfiguration();
      });
      
      await waitForNextUpdate();
      
      expect(toast.success).toHaveBeenCalledWith("Database verification completed - All checks passed");
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should show error toast with count when issues are found', async () => {
      // Mock tables verification to return a failure
      const tablesWithIssue = [{ 
        name: 'profiles', 
        exists: false, 
        hasRLS: false, 
        status: 'error' as const, 
        message: 'Table missing' 
      }];
      vi.mocked(databaseVerification.verifyDatabaseTables).mockResolvedValue(tablesWithIssue);
      vi.mocked(databaseVerification.verifyRlsPolicies).mockResolvedValue(mockPolicyResults);
      vi.mocked(databaseVerification.verifyDatabaseFunctions).mockResolvedValue(mockFunctionResults);
      
      const { result, waitForNextUpdate } = renderHook(() => useDatabaseVerification());
      
      act(() => {
        result.current.verifyDatabaseConfiguration();
      });
      
      await waitForNextUpdate();
      
      expect(toast.error).toHaveBeenCalledWith("Database verification completed - 1 issues found");
      expect(toast.success).not.toHaveBeenCalled();
    });
  });
});
