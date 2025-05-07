var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, it, expect, vi, beforeEach } from "vitest";
import { runTestCompanySetup, getTestCompany } from "@/utils/company/test";
import { getUserProfileByEmail } from "@/utils/users/fetchUsers";
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
vi.mock("@/utils/company/test", () => (Object.assign(Object.assign({}, vi.importActual("@/utils/company/test")), { getTestCompany: vi.fn() })));
// Reset mocks before each test
beforeEach(() => {
    vi.clearAllMocks();
});
describe("runTestCompanySetup with existing company", () => {
    it("should return existing company if found", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: "user-123",
            email: "test@example.com",
            name: "Test User",
            company_id: "company-123",
            role: "user",
            created_at: "2023-01-01T00:00:00Z",
        };
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
        const result = yield runTestCompanySetup("test@example.com");
        expect(result.success).toBe(true);
        expect(result.message).toBe("Test company already exists");
        expect(result.companyId).toBe(mockCompany.id);
        expect(result.companyName).toBe(mockCompany.name);
        expect(supabase.from).not.toHaveBeenCalledWith("companies");
    }));
});
