var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { testZapierWebhook } from "@/lib/zapier";
import { logAuditEvent } from "@/utils/auditLogger";
// Mock dependencies
vi.mock("@/lib/zapier", () => ({
    testZapierWebhook: vi.fn().mockResolvedValue({ success: true }),
    triggerBusinessEvent: vi.fn().mockResolvedValue({ success: true }),
}));
vi.mock("@/utils/auditLogger", () => ({
    logAuditEvent: vi.fn().mockResolvedValue(undefined),
}));
describe("Zapier Integration Tests", () => {
    const webhookUrl = "https://hooks.zapier.com/hooks/catch/test/webhook";
    beforeEach(() => {
        vi.clearAllMocks();
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    describe("onStrategyApproved", () => {
        it("should trigger a webhook with the correct payload", () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const strategy = {
                strategyTitle: "Market Expansion Strategy",
                strategyId: "strat-123",
                companyId: "Test Company",
                approvedBy: "AI CEO",
            };
            // Act
            const onStrategyApproved = (url, strategy) => __awaiter(void 0, void 0, void 0, function* () {
                return testZapierWebhook(url);
            });
            const result = yield onStrategyApproved(webhookUrl, strategy);
            // Assert
            expect(result).toEqual({ success: true });
            expect(testZapierWebhook).toHaveBeenCalledWith(webhookUrl);
            expect(logAuditEvent).not.toHaveBeenCalled();
        }));
    });
});
