import { useCallback } from "react";
import useDebateParticipants from "./useDebateParticipants";
import useDebateMessages from "./useDebateMessages";
import useDebateSetup from "./useDebateSetup";
import useDebateContext from "./useDebateContext";
import useDebateActions from "./useDebateActions";
export default function useDebateSession() {
    const { sessionId, setSessionId, profile } = useDebateContext();
    const { participants, setParticipants, availableExecutives } = useDebateParticipants();
    const { messages, favorites, isLoading, setIsLoading, setMessages, addSystemMessage, simulateBotResponses, sendUserMessage: sendMessage, voteMessage, toggleFavorite, } = useDebateMessages();
    const { selectedTopic, debateTitle, debateObjective, debateDuration, isDebateActive, riskAppetite, businessPriority, debateTopics, setSelectedTopic, setDebateTitle, setDebateObjective, setDebateDuration, setIsDebateActive, setRiskAppetite, setBusinessPriority, getSelectedTopicDetails, } = useDebateSetup();
    const { startDebate, sendUserMessage: sendUserMessageAction } = useDebateActions({
        sessionId,
        setSessionId,
        profile,
        participants,
        selectedTopic,
        messages,
        debateTitle,
        debateObjective,
        debateDuration,
        riskAppetite,
        businessPriority,
        addSystemMessage,
        setIsLoading,
        setIsDebateActive,
        setMessages,
        simulateBotResponses,
        getSelectedTopicDetails,
    });
    const sendUserMessage = useCallback((content) => {
        sendUserMessageAction(content, participants, selectedTopic, riskAppetite, businessPriority, sendMessage);
    }, [
        sendUserMessageAction,
        participants,
        selectedTopic,
        riskAppetite,
        businessPriority,
        sendMessage,
    ]);
    return {
        participants,
        selectedTopic,
        messages,
        favorites,
        isDebateActive,
        debateTitle,
        debateObjective,
        debateDuration,
        riskAppetite,
        businessPriority,
        isLoading,
        sessionId,
        debateTopics,
        availableExecutives,
        startDebate,
        simulateBotResponses: () => {
            const topicDetails = getSelectedTopicDetails();
            const topic = (topicDetails === null || topicDetails === void 0 ? void 0 : topicDetails.topic) || selectedTopic;
            simulateBotResponses(participants, topic, riskAppetite, businessPriority);
        },
        sendUserMessage,
        setSelectedTopic,
        setDebateTitle,
        setDebateObjective,
        setDebateDuration,
        setRiskAppetite,
        setBusinessPriority,
        setParticipants,
        voteMessage,
        toggleFavorite,
    };
}
