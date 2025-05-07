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
import { supabase } from "@/backend/supabase";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
export function useAiDebate() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [debateId, setDebateId] = useState(null);
    const [debateMessages, setDebateMessages] = useState([]);
    const [debateSummary, setDebateSummary] = useState(null);
    // Initiate a new debate
    const initiateDebate = useCallback((topic_1, participants_1, ...args_1) => __awaiter(this, [topic_1, participants_1, ...args_1], void 0, function* (topic, participants, context = {}) {
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            toast.error("You must be logged in to start a debate");
            return null;
        }
        setIsLoading(true);
        try {
            const { data, error } = yield supabase.functions.invoke("debate", {
                body: {
                    action: "initiate_debate",
                    userId: user.id,
                    topic,
                    participants,
                    context,
                },
            });
            if (error)
                throw error;
            setDebateId(data.debateId);
            setDebateMessages([
                {
                    id: "system-0",
                    sender: "system",
                    content: `Debate started: ${topic}`,
                    timestamp: new Date().toISOString(),
                    sequence: 0,
                },
            ]);
            toast.success("AI executive debate initiated");
            return data.debateId;
        }
        catch (error) {
            console.error("Error initiating debate:", error);
            toast.error("Failed to initiate AI executive debate");
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }), [user]);
    // Add a user message to the debate
    const addUserMessage = useCallback((message) => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id) || !debateId) {
            toast.error("No active debate session");
            return false;
        }
        setIsLoading(true);
        try {
            // Optimistically add the message to the UI
            const newMessage = {
                id: `user-${Date.now()}`,
                sender: "user",
                content: message,
                timestamp: new Date().toISOString(),
                sequence: debateMessages.length,
            };
            setDebateMessages((prev) => [...prev, newMessage]);
            const { data, error } = yield supabase.functions.invoke("debate", {
                body: {
                    action: "add_user_message",
                    userId: user.id,
                    userMessage: {
                        debateId,
                        message,
                    },
                },
            });
            if (error)
                throw error;
            // Generate executive responses
            yield generateExecutiveResponses();
            return true;
        }
        catch (error) {
            console.error("Error adding user message:", error);
            toast.error("Failed to add message to debate");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [user, debateId, debateMessages]);
    // Generate responses from all executives
    const generateExecutiveResponses = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id) || !debateId) {
            return false;
        }
        setIsLoading(true);
        try {
            const { data, error } = yield supabase.functions.invoke("debate", {
                body: {
                    action: "generate_executive_responses",
                    userId: user.id,
                    userMessage: {
                        debateId,
                    },
                },
            });
            if (error)
                throw error;
            // Add the responses to the UI
            const newMessages = data.responses.map((resp) => ({
                id: `${resp.executive.name}-${Date.now()}-${resp.sequence}`,
                sender: resp.executive.name,
                senderRole: resp.executive.role,
                content: resp.content,
                timestamp: new Date().toISOString(),
                sequence: resp.sequence,
            }));
            setDebateMessages((prev) => [...prev, ...newMessages]);
            return true;
        }
        catch (error) {
            console.error("Error generating executive responses:", error);
            toast.error("Failed to generate AI responses");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [user, debateId]);
    // Generate a summary of the debate
    const generateDebateSummary = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id) || !debateId) {
            return null;
        }
        setIsLoading(true);
        try {
            const { data, error } = yield supabase.functions.invoke("debate", {
                body: {
                    action: "generate_debate_summary",
                    userId: user.id,
                    userMessage: {
                        debateId,
                    },
                },
            });
            if (error)
                throw error;
            setDebateSummary(data.summary);
            toast.success("Debate summary generated");
            return data.summary;
        }
        catch (error) {
            console.error("Error generating debate summary:", error);
            toast.error("Failed to generate debate summary");
            return null;
        }
        finally {
            setIsLoading(false);
        }
    }), [user, debateId]);
    // Fetch messages for an existing debate
    const fetchDebateMessages = useCallback((existingDebateId) => __awaiter(this, void 0, void 0, function* () {
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            return false;
        }
        setIsLoading(true);
        setDebateId(existingDebateId);
        try {
            // Get debate messages from Supabase
            const { data, error } = yield supabase
                .from("debate_messages")
                .select("*")
                .eq("debate_id", existingDebateId)
                .order("sequence", { ascending: true });
            if (error)
                throw error;
            const formattedMessages = data.map((msg) => ({
                id: `${msg.sender}-${msg.id}`,
                sender: msg.sender,
                senderRole: msg.sender_role,
                content: msg.content,
                timestamp: msg.created_at,
                sequence: msg.sequence,
            }));
            setDebateMessages(formattedMessages);
            return true;
        }
        catch (error) {
            console.error("Error fetching debate messages:", error);
            toast.error("Failed to load debate history");
            return false;
        }
        finally {
            setIsLoading(false);
        }
    }), [user]);
    // Reset the debate state
    const resetDebate = useCallback(() => {
        setDebateId(null);
        setDebateMessages([]);
        setDebateSummary(null);
    }, []);
    return {
        isLoading,
        debateId,
        debateMessages,
        debateSummary,
        initiateDebate,
        addUserMessage,
        generateExecutiveResponses,
        generateDebateSummary,
        fetchDebateMessages,
        resetDebate,
    };
}
