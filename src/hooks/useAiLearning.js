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
export function useAiLearning() {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // Submit feedback for a bot response
    const submitFeedback = useCallback((botName, botRole, isPositive, interactionId, messageId, comment, topics) => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return false;
        setIsSubmitting(true);
        try {
            // Insert the feedback record
            const { error } = yield supabase.from("user_feedback").insert([
                {
                    user_id: user.id,
                    bot_name: botName,
                    bot_role: botRole,
                    is_positive: isPositive,
                    interaction_id: interactionId,
                    message_id: messageId,
                    comment,
                    metadata: {
                        topics,
                        timestamp: new Date().toISOString(),
                    },
                },
            ]);
            if (error)
                throw error;
            // Update the learning model
            yield updateLearningModel(botName, botRole, isPositive ? "positive" : "negative", topics);
            return true;
        }
        catch (error) {
            console.error("Error submitting feedback:", error);
            return false;
        }
        finally {
            setIsSubmitting(false);
        }
    }), [user]);
    // Update the learning model for a bot
    const updateLearningModel = useCallback((botName, botRole, feedbackType, topics) => __awaiter(this, void 0, void 0, function* () {
        try {
            // First, check if a learning model exists for this bot
            const { data, error } = yield supabase
                .from("learning_models")
                .select("*")
                .eq("bot_name", botName)
                .eq("bot_role", botRole)
                .single();
            if (error && error.code !== "PGRST116") {
                // Not found
                throw error;
            }
            // Update counters based on feedback type
            const counters = feedbackType === "positive"
                ? {
                    positive_feedback_count: ((data === null || data === void 0 ? void 0 : data.positive_feedback_count) || 0) + 1,
                }
                : {
                    negative_feedback_count: ((data === null || data === void 0 ? void 0 : data.negative_feedback_count) || 0) + 1,
                };
            // Update topic scores
            const topicsObj = (data === null || data === void 0 ? void 0 : data.topics) || {};
            if (topics && topics.length > 0) {
                topics.forEach((topic) => {
                    if (!topicsObj[topic]) {
                        topicsObj[topic] = { positive: 0, negative: 0 };
                    }
                    if (feedbackType === "positive") {
                        topicsObj[topic].positive += 1;
                    }
                    else {
                        topicsObj[topic].negative += 1;
                    }
                });
            }
            // If model exists, update it
            if (data) {
                yield supabase
                    .from("learning_models")
                    .update(Object.assign(Object.assign({}, counters), { topics: topicsObj, updated_at: new Date().toISOString() }))
                    .eq("id", data.id);
            }
            else {
                // Create a new model
                yield supabase.from("learning_models").insert([
                    {
                        bot_name: botName,
                        bot_role: botRole,
                        positive_feedback_count: feedbackType === "positive" ? 1 : 0,
                        negative_feedback_count: feedbackType === "negative" ? 1 : 0,
                        topics: topicsObj,
                    },
                ]);
            }
            return true;
        }
        catch (error) {
            console.error("Error updating learning model:", error);
            return false;
        }
    }), []);
    // Get the learning model for a bot
    const getLearningModel = useCallback((botName, botRole) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { data, error } = yield supabase
                .from("learning_models")
                .select("*")
                .eq("bot_name", botName)
                .eq("bot_role", botRole)
                .single();
            if (error) {
                if (error.code === "PGRST116") {
                    // Not found
                    return null;
                }
                throw error;
            }
            return data;
        }
        catch (error) {
            console.error("Error retrieving learning model:", error);
            return null;
        }
    }), []);
    // Get feedback history for a bot
    const getFeedbackHistory = useCallback((botName_1, botRole_1, ...args_1) => __awaiter(this, [botName_1, botRole_1, ...args_1], void 0, function* (botName, botRole, limit = 10) {
        if (!(user === null || user === void 0 ? void 0 : user.id))
            return [];
        try {
            let query = supabase
                .from("user_feedback")
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
            console.error("Error retrieving feedback history:", error);
            return [];
        }
    }), [user]);
    // Track feedback - alias for submitFeedback to match the component's expected API
    const trackFeedback = useCallback((interactionId, messageId, botName, botRole, isPositive, comment, metadata) => __awaiter(this, void 0, void 0, function* () {
        return submitFeedback(botName, botRole, isPositive, interactionId, messageId, comment, (metadata === null || metadata === void 0 ? void 0 : metadata.topic) ? [metadata.topic] : undefined);
    }), [submitFeedback]);
    return {
        isSubmitting,
        isLoading,
        submitFeedback,
        getLearningModel,
        getFeedbackHistory,
        trackFeedback,
    };
}
