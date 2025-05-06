import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  verifyDatabaseTables,
  verifyRlsPolicies,
  verifyDatabaseFunctions,
  displayVerificationResults,
} from "@/utils/admin/database-verification";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Mock the dependencies
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(),
    rpc: vi.fn(),
  },
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Database Verification Utils", () => {
  // Set up mocks and clean up after each test
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("verifyDatabaseTables", () => {
    it("should correctly identify existing tables", async () => {
      // Mock the Supabase response for existing tables
      const mockSelectFn = vi.fn().mockResolvedValue({
        data: { table_name: "profiles" },
        error: null,
      });
      const mockEqFn = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({ single: mockSelectFn }),
      });

      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({ eq: mockEqFn }),
      });

      const result = await verifyDatabaseTables();

      // We should have results for each required table
      expect(result.length).toBeGreaterThan(0);
      // First table should be 'profiles' and should exist
      expect(result[0].name).toBe("profiles");
      expect(result[0].exists).toBe(true);
    });

    it("should correctly identify missing tables", async () => {
      // Mock the Supabase response for missing tables
      const mockSelectFn = vi.fn().mockResolvedValue({
        data: null,
        error: { message: "Table not found" },
      });
      const mockEqFn = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({ single: mockSelectFn }),
      });

      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({ eq: mockEqFn }),
      });

      const result = await verifyDatabaseTables();

      // Should have identified missing tables
      expect(result.filter((t) => !t.exists).length).toBeGreaterThan(0);
    });

    it("should handle errors during table verification", async () => {
      // Mock an error response
      const mockSelectFn = vi
        .fn()
        .mockRejectedValue(new Error("Network error"));
      const mockEqFn = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({ single: mockSelectFn }),
      });

      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({ eq: mockEqFn }),
      });

      const result = await verifyDatabaseTables();

      // Should have error in results - fixed to use message property
      expect(result.some((t) => t.message && t.message.includes("Error"))).toBe(
        true,
      );
    });
  });

  describe("verifyRlsPolicies", () => {
    it("should correctly identify tables with RLS policies", async () => {
      // Mock table existence check
      const mockTableSelectFn = vi.fn().mockResolvedValue({
        data: { table_name: "profiles" },
        error: null,
      });
      const mockTableEqFn = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockTableSelectFn,
        }),
      });

      // Mock policies check
      const mockPoliciesSelectFn = vi.fn().mockResolvedValue({
        data: [{ policyname: "auth_policy" }],
        error: null,
      });

      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.from.mockImplementation((table) => {
        if (table === "information_schema.tables") {
          return {
            select: vi.fn().mockReturnValue({ eq: mockTableEqFn }),
          };
        } else if (table === "pg_policies") {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue(mockPoliciesSelectFn),
              }),
            }),
          };
        }
        return { select: vi.fn() };
      });

      const result = await verifyRlsPolicies();

      // Should identify tables with RLS enabled
      expect(result.some((p) => p.exists)).toBe(true);
    });

    it("should correctly identify tables without RLS policies", async () => {
      // Mock table existence check
      const mockTableSelectFn = vi.fn().mockResolvedValue({
        data: { table_name: "profiles" },
        error: null,
      });
      const mockTableEqFn = vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: mockTableSelectFn,
        }),
      });

      // Mock policies check (no policies)
      const mockPoliciesSelectFn = vi.fn().mockResolvedValue({
        data: [],
        error: null,
      });

      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.from.mockImplementation((table) => {
        if (table === "information_schema.tables") {
          return {
            select: vi.fn().mockReturnValue({ eq: mockTableEqFn }),
          };
        } else if (table === "pg_policies") {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue(mockPoliciesSelectFn),
              }),
            }),
          };
        }
        return { select: vi.fn() };
      });

      const result = await verifyRlsPolicies();

      // Should identify tables without RLS
      expect(result.some((p) => !p.exists)).toBe(true);
    });
  });

  describe("verifyDatabaseFunctions", () => {
    it("should correctly identify existing secure functions", async () => {
      // Mock RPC call for function checking
      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.rpc.mockResolvedValue({
        data: [
          {
            function_exists: true,
            is_secure: true,
          },
        ],
        error: null,
      });

      const result = await verifyDatabaseFunctions();

      // Should identify functions that exist and are secure
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((f) => f.exists && f.isSecure)).toBe(true);
    });

    it("should correctly identify existing but insecure functions", async () => {
      // Mock RPC call for insecure function
      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.rpc.mockResolvedValue({
        data: [
          {
            function_exists: true,
            is_secure: false,
          },
        ],
        error: null,
      });

      const result = await verifyDatabaseFunctions();

      // Should identify functions that exist but are not secure
      expect(result.some((f) => f.exists && !f.isSecure)).toBe(true);
    });

    it("should correctly identify missing functions", async () => {
      // Mock RPC call for missing function
      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.rpc.mockResolvedValue({
        data: [
          {
            function_exists: false,
            is_secure: false,
          },
        ],
        error: null,
      });

      const result = await verifyDatabaseFunctions();

      // Should identify functions that don't exist
      expect(result.some((f) => !f.exists)).toBe(true);
    });

    it("should handle fallback for function checking when RPC fails", async () => {
      // Mock RPC failure first
      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.rpc.mockResolvedValue({
        data: null,
        error: { message: "Function not found" },
      });

      // Mock fallback query to pg_proc
      const mockFallbackSelectFn = vi.fn().mockResolvedValue({
        data: { proname: "handle_new_user", prosecdef: true },
        error: null,
      });

      // @ts-ignore - We're intentionally mocking a subset of the API
      supabase.from.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: mockFallbackSelectFn,
          }),
        }),
      });

      const result = await verifyDatabaseFunctions();

      // Should use fallback method and still identify functions
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe("displayVerificationResults", () => {
    it("should display success toast for all passing checks", () => {
      const tables = [
        {
          name: "profiles",
          exists: true,
          hasRLS: true,
          status: "success" as const,
          message: "Table exists",
        },
        {
          name: "companies",
          exists: true,
          hasRLS: true,
          status: "success" as const,
          message: "Table exists",
        },
      ];

      const policies = [
        {
          table: "profiles",
          name: "auth_policy",
          exists: true,
          isSecure: true,
          status: "success" as const,
          message: "RLS enabled",
        },
        {
          table: "companies",
          name: "auth_policy",
          exists: true,
          isSecure: true,
          status: "success" as const,
          message: "RLS enabled",
        },
      ];

      const functions = [
        {
          name: "handle_new_user",
          exists: true,
          isSecure: true,
          status: "success" as const,
          message: "Function is secure",
        },
      ];

      displayVerificationResults(tables, policies, functions);

      // Should show success toasts
      expect(toast.success).toHaveBeenCalledTimes(3);
      expect(toast.error).not.toHaveBeenCalled();
    });

    it("should display error toast for failing checks", () => {
      const tables = [
        {
          name: "profiles",
          exists: true,
          hasRLS: true,
          status: "success" as const,
          message: "Table exists",
        },
        {
          name: "missing_table",
          exists: false,
          hasRLS: false,
          status: "error" as const,
          message: "Table missing",
        },
      ];

      const policies = [
        {
          table: "profiles",
          name: "auth_policy",
          exists: false,
          isSecure: false,
          status: "error" as const,
          message: "No RLS",
        },
      ];

      const functions = [
        {
          name: "handle_new_user",
          exists: true,
          isSecure: false,
          status: "warning" as const,
          message: "Not secure",
        },
      ];

      displayVerificationResults(tables, policies, functions);

      // Should show error toasts
      expect(toast.error).toHaveBeenCalledTimes(3);
    });
  });
});
