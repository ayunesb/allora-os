var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
export function useAiMemory() {
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [recentMemories, setRecentMemories] = useState([]);
    // Store an interaction in the database for future reference
    const storeInteraction = useCallback((botName_1, botRole_1, userMessage_1, botResponse_1, ...args_1) => __awaiter(this, [botName_1, botRole_1, userMessage_1, botResponse_1, ...args_1], void 0, function* (botName, botRole, userMessage, botResponse, metadata = {}) {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return false;
        setIsProcessing(true);
        try {
            // Store the interaction in the database
            const { error } = yield supabase.from("bot_interactions").insert([
                {
                    user_id: user.id,
                    bot_name: botName,
                    bot_role: botRole,
                    user_message: userMessage,
                    bot_response: botResponse,
                    metadata,
                },
            ]);
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error("Error storing interaction:", error);
            return false;
        }
        finally {
            setIsProcessing(false);
        }
    }), [user]);
    // Get relevant memories based on semantic search
    const getRelevantMemories = useCallback((userMessage_1, botName_1, botRole_1, ...args_1) => __awaiter(this, [userMessage_1, botName_1, botRole_1, ...args_1], void 0, function* (userMessage, botName, botRole, limit = 5) {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return [];
        try {
            // First, get embedding for the user's message
            const { data: embedding, error: embeddingError } = yield supabase.functions.invoke("get-embedding", {
                body: { text: userMessage },
            });
            if (embeddingError)
                throw embeddingError;
            // Build the query to search for relevant memories
            let query = supabase
                .from("bot_interactions")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false });
            // Add bot filters if provided
            if (botName) {
                query = query.eq("bot_name", botName);
            }
            if (botRole) {
                query = query.eq("bot_role", botRole);
            }
            // Execute the query
            const { data, error } = yield query.limit(limit);
            if (error)
                throw error;
            // For now, just return the most recent interactions
            return data || [];
        }
        catch (error) {
            console.error("Error retrieving relevant memories:", error);
            return [];
        }
    }), [user]);
    // Get all interactions with a specific bot
    const getBotInteractions = useCallback((botName_1, botRole_1, ...args_1) => __awaiter(this, [botName_1, botRole_1, ...args_1], void 0, function* (botName, botRole, limit = 20) {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return [];
        try {
            let query = supabase
                .from("bot_interactions")
                .select("*")
                .eq("user_id", user.id)
                .eq("bot_name", botName)
                .order("created_at", { ascending: false })
                .limit(limit);
            if (botRole) {
                query = query.eq("bot_role", botRole);
            }
            const { data, error } = yield query;
            if (error)
                throw error;
            return data || [];
        }
        catch (error) {
            console.error("Error retrieving bot interactions:", error);
            return [];
        }
    }), [user]);
    // Clear all stored interactions with a specific bot
    const clearBotMemory = useCallback((botName, botRole) => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return false;
        try {
            let query = supabase
                .from("bot_interactions")
                .delete()
                .eq("user_id", user.id)
                .eq("bot_name", botName);
            if (botRole) {
                query = query.eq("bot_role", botRole);
            }
            const { error } = yield query;
            if (error)
                throw error;
            return true;
        }
        catch (error) {
            console.error("Error clearing bot memory:", error);
            return false;
        }
    }), [user]);
    // Get learning insights from stored interactions
    const getLearningInsights = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return null;
        try {
            const { data, error } = yield supabase.functions.invoke("memory", {
                body: {
                    action: "get_learning_insights",
                    userId: user.id,
                },
            });
            if (error)
                throw error;
            return data.insightsSummary || null;
        }
        catch (error) {
            console.error("Error getting learning insights:", error);
            return null;
        }
    }), [user]);
    return {
        isProcessing,
        recentMemories,
        storeInteraction,
        getRelevantMemories,
        getBotInteractions,
        clearBotMemory,
        getLearningInsights,
    };
}
