var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "@/backend/supabase";
// Store a conversation interaction in memory
export function storeConversationMemory(userId, botId, userMessage, botResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get existing memory first
            const existingMemory = yield getConversationMemory(userId, botId);
            const memoryId = (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.id) || `memory-${userId}-${botId}`;
            const previousInteractions = (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.memoryContext.previousInteractions) || [];
            // Add new interaction to memory (limiting to last 10 for performance)
            const updatedInteractions = [
                ...previousInteractions,
                `User: ${userMessage}`,
                `${botId}: ${botResponse}`,
            ].slice(-10);
            // Create or update memory
            const { error } = yield supabase.from("conversation_memories").upsert({
                id: memoryId,
                user_id: userId,
                bot_id: botId,
                memory_context: {
                    previousInteractions: updatedInteractions,
                    userPreferences: (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.memoryContext.userPreferences) || {},
                    companyData: (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.memoryContext.companyData) || {},
                },
                last_updated: new Date().toISOString(),
            });
            if (error) {
                console.error("Error storing conversation memory:", error);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error("Failed to store conversation memory:", error);
            return false;
        }
    });
}
// Retrieve conversation memory for a specific user and bot
export function getConversationMemory(userId, botId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("conversation_memories")
                .select("*")
                .eq("user_id", userId)
                .eq("bot_id", botId)
                .single();
            if (error || !data) {
                if (error && error.code !== "PGRST116") {
                    // Not "no rows returned" error
                    console.error("Error retrieving conversation memory:", error);
                }
                return null;
            }
            return {
                id: data.id,
                userId: data.user_id,
                botId: data.bot_id,
                memoryContext: data.memory_context,
                lastUpdated: new Date(data.last_updated),
            };
        }
        catch (error) {
            console.error("Failed to retrieve conversation memory:", error);
            return null;
        }
    });
}
// Store user preferences in memory context
export function storeUserPreferences(userId, botId, preferences) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingMemory = yield getConversationMemory(userId, botId);
            const memoryId = (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.id) || `memory-${userId}-${botId}`;
            const memoryContext = (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.memoryContext) || {
                previousInteractions: [],
            };
            const { error } = yield supabase.from("conversation_memories").upsert({
                id: memoryId,
                user_id: userId,
                bot_id: botId,
                memory_context: Object.assign(Object.assign({}, memoryContext), { userPreferences: Object.assign(Object.assign({}, memoryContext.userPreferences), preferences) }),
                last_updated: new Date().toISOString(),
            });
            if (error) {
                console.error("Error storing user preferences:", error);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error("Failed to store user preferences:", error);
            return false;
        }
    });
}
// Store company data in memory context
export function storeCompanyData(userId, botId, companyData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existingMemory = yield getConversationMemory(userId, botId);
            const memoryId = (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.id) || `memory-${userId}-${botId}`;
            const memoryContext = (existingMemory === null || existingMemory === void 0 ? void 0 : existingMemory.memoryContext) || {
                previousInteractions: [],
            };
            const { error } = yield supabase.from("conversation_memories").upsert({
                id: memoryId,
                user_id: userId,
                bot_id: botId,
                memory_context: Object.assign(Object.assign({}, memoryContext), { companyData: Object.assign(Object.assign({}, memoryContext.companyData), companyData) }),
                last_updated: new Date().toISOString(),
            });
            if (error) {
                console.error("Error storing company data:", error);
                return false;
            }
            return true;
        }
        catch (error) {
            console.error("Failed to store company data:", error);
            return false;
        }
    });
}
