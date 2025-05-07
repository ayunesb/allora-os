import { describe, it, expect, vi, beforeEach } from "vitest";
import { runTestCompanySetup } from "@/utils/company/test";
import { fetchUsers } from "@/utils/users/fetchUsers";
import { supabase } from "@/integrations/supabase/client";

// Mock dependencies
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockReturnThis(),
  },
}));

vi.mock("@/utils/users/fetchUsers", () => ({
  getUserProfileByEmail: vi.fn(),
}));

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

describe("runTestCompanySetup", () => {
  it("should return validation error for invalid email", async () => {
    const result = await runTestCompanySetup("invalid-email");

    expect(result.success).toBe(false);
    expect(result.errorCode).toBe("VALIDATION_ERROR");
    expect(getUserProfileByEmail).not.toHaveBeenCalled();
  });

  it("should return error when user profile not found", async () => {
    vi.mocked(getUserProfileByEmail).mockResolvedValue(null);

    const result = await runTestCompanySetup("valid@example.com");

    expect(result.success).toBe(false);
    expect(result.errorCode).toBe("USER_NOT_FOUND");
    expect(getUserProfileByEmail).toHaveBeenCalledWith("valid@example.com");
  });
});
