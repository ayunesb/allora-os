var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback } from "react";
import { useMessageOperations } from "./useMessageOperations";
import { useBotResponses } from "./useBotResponses";
import { useUserPreferences } from "./useUserPreferences";
export default function useDebateMessages() {
    const { messages, favorites, isLoading, setIsLoading, setMessages, addMessage, addSystemMessage, voteMessage, toggleFavorite, } = useMessageOperations();
    const { preferences } = useUserPreferences();
    const { simulateBotResponses } = useBotResponses(addMessage, setIsLoading);
    const sendUserMessage = useCallback((content_1, participants_1, topic_1, ...args_1) => __awaiter(this, [content_1, participants_1, topic_1, ...args_1], void 0, function* (content, participants, topic, riskAppetite = "medium", businessPriority = "growth") {
        if (!content.trim())
            return;
        // Add user message
        const userMessage = {
            id: `msg-${Date.now()}-user`,
            sender: "You",
            senderId: "user",
            content,
            timestamp: new Date(),
            isUser: true,
            votes: 0,
            isFavorite: false,
        };
        addMessage(userMessage);
        // Trigger bot responses with a small delay, passing user preferences
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield simulateBotResponses(participants, topic, riskAppetite, businessPriority, preferences);
        }), 1000);
    }), [addMessage, simulateBotResponses, preferences]);
    return {
        messages,
        favorites,
        isLoading,
        setIsLoading,
        setMessages,
        addSystemMessage,
        simulateBotResponses,
        sendUserMessage,
        voteMessage,
        toggleFavorite,
    };
}
