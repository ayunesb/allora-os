"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDebateSession;
var react_1 = require("react");
var useDebateParticipants_1 = require("./useDebateParticipants");
var useDebateMessages_1 = require("./useDebateMessages");
var useDebateSetup_1 = require("./useDebateSetup");
var useDebateContext_1 = require("./useDebateContext");
var useDebateActions_1 = require("./useDebateActions");
function useDebateSession() {
  var _a = (0, useDebateContext_1.default)(),
    sessionId = _a.sessionId,
    setSessionId = _a.setSessionId,
    profile = _a.profile;
  var _b = (0, useDebateParticipants_1.default)(),
    participants = _b.participants,
    setParticipants = _b.setParticipants,
    availableExecutives = _b.availableExecutives;
  var _c = (0, useDebateMessages_1.default)(),
    messages = _c.messages,
    favorites = _c.favorites,
    isLoading = _c.isLoading,
    setIsLoading = _c.setIsLoading,
    setMessages = _c.setMessages,
    addSystemMessage = _c.addSystemMessage,
    simulateBotResponses = _c.simulateBotResponses,
    sendMessage = _c.sendUserMessage,
    voteMessage = _c.voteMessage,
    toggleFavorite = _c.toggleFavorite;
  var _d = (0, useDebateSetup_1.default)(),
    selectedTopic = _d.selectedTopic,
    debateTitle = _d.debateTitle,
    debateObjective = _d.debateObjective,
    debateDuration = _d.debateDuration,
    isDebateActive = _d.isDebateActive,
    riskAppetite = _d.riskAppetite,
    businessPriority = _d.businessPriority,
    debateTopics = _d.debateTopics,
    setSelectedTopic = _d.setSelectedTopic,
    setDebateTitle = _d.setDebateTitle,
    setDebateObjective = _d.setDebateObjective,
    setDebateDuration = _d.setDebateDuration,
    setIsDebateActive = _d.setIsDebateActive,
    setRiskAppetite = _d.setRiskAppetite,
    setBusinessPriority = _d.setBusinessPriority,
    getSelectedTopicDetails = _d.getSelectedTopicDetails;
  var _e = (0, useDebateActions_1.default)({
      sessionId: sessionId,
      setSessionId: setSessionId,
      profile: profile,
      participants: participants,
      selectedTopic: selectedTopic,
      messages: messages,
      debateTitle: debateTitle,
      debateObjective: debateObjective,
      debateDuration: debateDuration,
      riskAppetite: riskAppetite,
      businessPriority: businessPriority,
      addSystemMessage: addSystemMessage,
      setIsLoading: setIsLoading,
      setIsDebateActive: setIsDebateActive,
      setMessages: setMessages,
      simulateBotResponses: simulateBotResponses,
      getSelectedTopicDetails: getSelectedTopicDetails,
    }),
    startDebate = _e.startDebate,
    sendUserMessageAction = _e.sendUserMessage;
  var sendUserMessage = (0, react_1.useCallback)(
    function (content) {
      sendUserMessageAction(
        content,
        participants,
        selectedTopic,
        riskAppetite,
        businessPriority,
        sendMessage,
      );
    },
    [
      sendUserMessageAction,
      participants,
      selectedTopic,
      riskAppetite,
      businessPriority,
      sendMessage,
    ],
  );
  return {
    participants: participants,
    selectedTopic: selectedTopic,
    messages: messages,
    favorites: favorites,
    isDebateActive: isDebateActive,
    debateTitle: debateTitle,
    debateObjective: debateObjective,
    debateDuration: debateDuration,
    riskAppetite: riskAppetite,
    businessPriority: businessPriority,
    isLoading: isLoading,
    sessionId: sessionId,
    debateTopics: debateTopics,
    availableExecutives: availableExecutives,
    startDebate: startDebate,
    simulateBotResponses: function () {
      var topicDetails = getSelectedTopicDetails();
      var topic =
        (topicDetails === null || topicDetails === void 0
          ? void 0
          : topicDetails.topic) || selectedTopic;
      simulateBotResponses(participants, topic, riskAppetite, businessPriority);
    },
    sendUserMessage: sendUserMessage,
    setSelectedTopic: setSelectedTopic,
    setDebateTitle: setDebateTitle,
    setDebateObjective: setDebateObjective,
    setDebateDuration: setDebateDuration,
    setRiskAppetite: setRiskAppetite,
    setBusinessPriority: setBusinessPriority,
    setParticipants: setParticipants,
    voteMessage: voteMessage,
    toggleFavorite: toggleFavorite,
  };
}
