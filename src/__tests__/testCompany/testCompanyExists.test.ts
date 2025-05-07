import { describe, it, expect, vi, beforeEach } from "vitest";
import { runTestCompanySetup, getTestCompany } from "../../utils/company/test.js";
import { getUserProfileByEmail } from "../../utils/users/fetchUsers.js";
import { supabase } from "../../integrations/supabase/client.js";
import { User } from "../../types/agents.js";

// Mock dependencies
vi.mock("../../integrations/supabase/client.js", () => ({
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

vi.mock("../../utils/users/fetchUsers.js", () => ({
  getUserProfileByEmail: vi.fn(),
}));

vi.mock("../../utils/company/test.js", () => ({
  ...vi.importActual("../../utils/company/test.js"),
  getTestCompany: vi.fn(),
}));

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});

describe("runTestCompanySetup with existing company", () => {
  it("should return existing company if found", async () => {
    const mockUser = {
      id: "user-123",
      email: "test@example.com",
      name: "Test User",
      company_id: "company-123",
      role: "user",
      created_at: "2023-01-01T00:00:00Z",
    } as User;

    const mockCompany = {
      id: "company-123",
      name: "Test Company",
      created_at: "2023-01-01",
    };

    vi.mocked(getUserProfileByEmail).mockResolvedValue(mockUser);
    vi.mocked(getTestCompany).mockResolvedValue({
      success: true,
      data: mockCompany,
      message: "Test company found",
    });

    const result = await runTestCompanySetup("test@example.com");

    expect(result.success).toBe(true);
    expect(result.message).toBe("Test company already exists");
    expect(result.companyId).toBe(mockCompany.id);
    expect(result.companyName).toBe(mockCompany.name);
    expect(supabase.from).not.toHaveBeenCalledWith("companies");
  });
});
