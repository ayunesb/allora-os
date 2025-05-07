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
import { generateBotResponse } from "@/backend/debate/botResponseGenerator";
import { toast } from "sonner";
export function useBotResponses(addMessage, setIsLoading) {
    const simulateBotResponses = useCallback((participants_1, topic_1, ...args_1) => __awaiter(this, [participants_1, topic_1, ...args_1], void 0, function* (participants, topic, riskAppetite = "medium", businessPriority = "growth", preferences) {
        if (!participants.length || !topic)
            return;
        setIsLoading(true);
        try {
            // Add system message indicating the debate topic
            const systemMessage = {
                id: `system-${Date.now()}`,
                sender: "System",
                senderId: "system",
                content: `Debate started: ${topic} Discussion\nObjective: Evaluate and decide on the best approach for ${topic}\nTopic: ${topic}\nRisk Appetite: ${riskAppetite}\nBusiness Priority: ${businessPriority}`,
                timestamp: new Date(),
                isUser: false,
                votes: 0,
                isFavorite: false,
            };
            addMessage(systemMessage);
            // Get responses from each participant sequentially with slight delay between them
            for (const participant of participants) {
                try {
                    // Get a unique, persona-specific response for this executive
                    const content = yield generateBotResponse(participant, topic, riskAppetite, businessPriority);
                    // Format the response to include rationale if requested
                    let finalContent = content;
                    // If rationale isn't already included but was requested
                    if ((preferences === null || preferences === void 0 ? void 0 : preferences.showSources) &&
                        !finalContent.includes("Rationale:")) {
                        finalContent += `\n\nRationale: Based on my experience as ${participant.name}, I believe this approach aligns with the ${riskAppetite} risk profile and prioritizes ${businessPriority}.`;
                    }
                    // Add the bot response message
                    const message = {
                        id: `msg-${Date.now()}-${participant.id}`,
                        sender: participant.name,
                        senderId: participant.id,
                        content: finalContent,
                        timestamp: new Date(),
                        isUser: false,
                        votes: 0,
                        isFavorite: false,
                    };
                    addMessage(message);
                    // Add a delay between responses to make it feel more natural
                    yield new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));
                }
                catch (error) {
                    console.error(`Error generating response for ${participant.name}:`, error);
                    // Create fallback response
                    const fallbackMessage = {
                        id: `msg-${Date.now()}-${participant.id}`,
                        sender: participant.name,
                        senderId: participant.id,
                        content: `I need more context about ${topic} before providing a detailed response. However, I would approach this with a ${riskAppetite} risk profile, focusing primarily on ${businessPriority}.`,
                        timestamp: new Date(),
                        isUser: false,
                        votes: 0,
                        isFavorite: false,
                    };
                    addMessage(fallbackMessage);
                    yield new Promise((resolve) => setTimeout(resolve, 500));
                }
            }
        }
        catch (error) {
            console.error("Error in simulateBotResponses:", error);
            toast.error("Error generating executive responses");
        }
        finally {
            setIsLoading(false);
        }
    }), [addMessage, setIsLoading]);
    return {
        simulateBotResponses,
    };
}
