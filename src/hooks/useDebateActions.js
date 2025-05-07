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
import { saveDebateSession } from "@/backend/debate";
import { toast } from "sonner";
export default function useDebateActions(options) {
    const { sessionId, setSessionId, profile, participants, selectedTopic, messages, debateTitle, debateObjective, debateDuration, riskAppetite, businessPriority, addSystemMessage, setIsLoading, setIsDebateActive, setMessages, simulateBotResponses, getSelectedTopicDetails, } = options;
    const startDebate = useCallback(() => __awaiter(this, void 0, void 0, function* () {
        if (!selectedTopic || !debateTitle || !debateObjective) {
            toast.error("Please complete all debate setup fields");
            return;
        }
        setIsLoading(true);
        setIsDebateActive(true);
        setMessages([]);
        // First message from system (debate setup)
        const selectedTopicDetails = getSelectedTopicDetails();
        // Include risk appetite and business priority in the initial message
        const initialMessage = addSystemMessage(`Debate started: ${debateTitle}\n\nObjective: ${debateObjective}\n\nTopic: ${(selectedTopicDetails === null || selectedTopicDetails === void 0 ? void 0 : selectedTopicDetails.topic) || selectedTopic}\n\nRisk Appetite: ${riskAppetite}\n\nBusiness Priority: ${businessPriority}`);
        // Create session object
        const sessionData = {
            title: debateTitle,
            objective: debateObjective,
            topic: selectedTopicDetails || {
                id: selectedTopic,
                topic: selectedTopic,
                description: "",
            },
            participants,
            messages: [initialMessage],
            duration: parseInt(debateDuration, 10),
            company_id: (profile === null || profile === void 0 ? void 0 : profile.company_id) || "unknown",
            riskAppetite,
            businessPriority,
        };
        // Save the session
        const id = yield saveDebateSession(sessionData);
        setSessionId(id);
        setIsLoading(false);
        // Schedule first round of bot responses
        simulateBotResponses(participants, (selectedTopicDetails === null || selectedTopicDetails === void 0 ? void 0 : selectedTopicDetails.topic) || selectedTopic, riskAppetite, businessPriority);
    }), [
        selectedTopic,
        debateTitle,
        debateObjective,
        debateDuration,
        participants,
        profile,
        riskAppetite,
        businessPriority,
        setIsLoading,
        setIsDebateActive,
        setMessages,
        addSystemMessage,
        simulateBotResponses,
        getSelectedTopicDetails,
    ]);
    const sendUserMessage = useCallback((content, participants, topic, riskAppetite, businessPriority, sendMessage) => {
        const topicDetails = getSelectedTopicDetails();
        const topicName = (topicDetails === null || topicDetails === void 0 ? void 0 : topicDetails.topic) || topic;
        sendMessage(content, participants, topicName, riskAppetite, businessPriority);
    }, [getSelectedTopicDetails]);
    return {
        startDebate,
        sendUserMessage,
    };
}
