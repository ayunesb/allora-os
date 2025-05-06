var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/integrations/supabase/client";
/**
 * Save an executive decision to memory
 */
export function saveDecisionToMemory(userId, decision) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = yield supabase.from("executive_memory").insert({
                user_id: userId,
                executive_name: decision.executiveName,
                task: decision.task,
                decision: decision.selectedOption,
                timestamp: new Date().toISOString(),
            });
            if (error) {
                console.error("Error saving decision to memory:", error);
                return false;
            }
            console.log("Decision saved to memory successfully");
            return true;
        }
        catch (error) {
            console.error("Failed to save decision to memory:", error);
            return false;
        }
    });
}
/**
 * Fetch recent memories for an executive
 */
export function fetchRecentMemories(userId_1, executiveName_1) {
    return __awaiter(this, arguments, void 0, function* (userId, executiveName, limit = 5) {
        try {
            let query = supabase
                .from("executive_memory")
                .select("*")
                .eq("user_id", userId)
                .order("timestamp", { ascending: false })
                .limit(limit);
            if (executiveName) {
                query = query.eq("executive_name", executiveName);
            }
            const { data, error } = yield query;
            if (error) {
                console.error("Error fetching memories:", error);
                return [];
            }
            return data || [];
        }
        catch (error) {
            console.error("Failed to fetch memories:", error);
            return [];
        }
    });
}
/**
 * Format memories into a prompt-friendly string
 */
export function formatMemoriesForPrompt(memories) {
    if (!memories.length) {
        return "No previous memory.";
    }
    return memories
        .map((memory) => `Task: ${memory.task} → Decision: ${memory.decision}`)
        .join("\n");
}
