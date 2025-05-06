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
import { runTestCompanySetup } from "@/utils/company/test";
import { getUserProfileByEmail } from "@/utils/users/fetchUsers";
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
    it("should return validation error for invalid email", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield runTestCompanySetup("invalid-email");
        expect(result.success).toBe(false);
        expect(result.errorCode).toBe("VALIDATION_ERROR");
        expect(getUserProfileByEmail).not.toHaveBeenCalled();
    }));
    it("should return error when user profile not found", () => __awaiter(void 0, void 0, void 0, function* () {
        vi.mocked(getUserProfileByEmail).mockResolvedValue(null);
        const result = yield runTestCompanySetup("valid@example.com");
        expect(result.success).toBe(false);
        expect(result.errorCode).toBe("USER_NOT_FOUND");
        expect(getUserProfileByEmail).toHaveBeenCalledWith("valid@example.com");
    }));
});
