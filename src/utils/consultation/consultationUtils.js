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
export function getUserConsultationHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Mock implementation since we don't have the actual tables yet
            // This returns a static set of sample consultations
            // Generate some sample consultations
            const sampleConsultations = [
                {
                    id: "1",
                    botName: "Elon Musk",
                    botRole: "ceo",
                    messages: [
                        {
                            type: "user",
                            content: "How can I scale my business faster?",
                            timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                        },
                        {
                            type: "bot",
                            content: "As Elon Musk, I would recommend focusing on your unit economics first before scaling. Make sure each transaction is profitable.",
                            timestamp: new Date(Date.now() - 86300000).toISOString(),
                        },
                    ],
                },
                {
                    id: "2",
                    botName: "Ruth Porat",
                    botRole: "cfo",
                    messages: [
                        {
                            type: "user",
                            content: "Should I invest in marketing or product development?",
                            timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
                        },
                        {
                            type: "bot",
                            content: "As Ruth Porat, I'd recommend calculating the ROI of both options. Typically, investing in product enhancements that increase customer lifetime value yields better long-term results.",
                            timestamp: new Date(Date.now() - 172700000).toISOString(),
                        },
                    ],
                },
            ];
            return sampleConsultations;
        }
        catch (error) {
            console.error("Error fetching consultation history:", error.message);
            return [];
        }
    });
}
export function startNewConsultation(botName, botRole) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Mock implementation since we don't have the actual tables
            // In a real implementation, this would save to a database
            console.log("Starting new consultation with", botName, "in role", botRole);
            // Generate a random ID for the consultation
            const consultationId = Math.random().toString(36).substring(2, 15);
            return consultationId;
        }
        catch (error) {
            console.error("Error starting new consultation:", error.message);
            toast.error("Failed to start consultation");
            return null;
        }
    });
}
