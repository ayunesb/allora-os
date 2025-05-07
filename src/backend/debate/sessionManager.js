var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toast } from "sonner";
// Save a debate session to the database (mock implementation)
export const saveDebateSession = (session) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // In a real implementation, this would save to the Supabase database
        console.log("Would save debate session:", session);
        // For now, just return a mock ID
        const sessionId = `debate-${Date.now()}`;
        toast.success("Debate session saved successfully");
        return sessionId;
    }
    catch (error) {
        console.error("Error saving debate session:", error.message);
        toast.error(`Failed to save debate: ${error.message}`);
        return null;
    }
});
// Export a function to get debate sessions for a company (mock implementation)
export const getCompanyDebateSessions = (companyId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // In a real implementation, this would fetch from the Supabase database
        // For now, return mock data
        return [];
    }
    catch (error) {
        console.error("Error fetching debate sessions:", error.message);
        return [];
    }
});
