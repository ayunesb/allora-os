"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var TopicSelector_1 = require("./TopicSelector");
var DebateParameters_1 = require("./DebateParameters");
var ParticipantsList_1 = require("./ParticipantsList");
var ExecutiveSelectionDialog_1 = require("./ExecutiveSelectionDialog");
var DebateSetup = function (_a) {
  var _b = _a.participants,
    participants = _b === void 0 ? [] : _b, // Add default for participants
    _c = _a.selectedTopic, // Add default for participants
    selectedTopic = _c === void 0 ? "" : _c,
    _d = _a.debateTopics,
    debateTopics = _d === void 0 ? [] : _d, // Add default empty array for debateTopics
    _e = _a.debateTitle, // Add default empty array for debateTopics
    debateTitle = _e === void 0 ? "" : _e,
    _f = _a.debateObjective,
    debateObjective = _f === void 0 ? "" : _f,
    _g = _a.debateDuration,
    debateDuration = _g === void 0 ? "" : _g,
    _h = _a.isLoading,
    isLoading = _h === void 0 ? false : _h,
    onTopicChange = _a.onTopicChange,
    onTitleChange = _a.onTitleChange,
    onObjectiveChange = _a.onObjectiveChange,
    onDurationChange = _a.onDurationChange,
    onStartDebate = _a.onStartDebate,
    onParticipantsChange = _a.onParticipantsChange;
  var _j = (0, react_1.useState)(false),
    isDialogOpen = _j[0],
    setIsDialogOpen = _j[1];
  var handleEditParticipants = function () {
    setIsDialogOpen(true);
  };
  var handleParticipantsChange = function (newParticipants) {
    if (onParticipantsChange) {
      onParticipantsChange(newParticipants);
    }
  };
  // Ensure debateTopics is an array
  var safeDebateTopics = Array.isArray(debateTopics) ? debateTopics : [];
  var handleStartDebate = function () {
    onStartDebate();
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Debate Setup",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Configure the AI executive debate parameters",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsx)(TopicSelector_1.default, {
            selectedTopic: selectedTopic,
            debateTopics: safeDebateTopics,
            onTopicChange: onTopicChange,
          }),
          (0, jsx_runtime_1.jsx)(DebateParameters_1.default, {
            debateTitle: debateTitle,
            debateObjective: debateObjective,
            debateDuration: debateDuration,
            onTitleChange: onTitleChange,
            onObjectiveChange: onObjectiveChange,
            onDurationChange: onDurationChange,
          }),
          (0, jsx_runtime_1.jsx)(ParticipantsList_1.default, {
            participants: participants,
            onEditParticipants: handleEditParticipants,
          }),
          (0, jsx_runtime_1.jsx)(ExecutiveSelectionDialog_1.default, {
            isOpen: isDialogOpen,
            onClose: function () {
              return setIsDialogOpen(false);
            },
            selectedExecutives: participants,
            onExecutivesChange: handleParticipantsChange,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          onClick: handleStartDebate,
          disabled:
            !selectedTopic || !debateTitle || !debateObjective || isLoading,
          className: "ml-auto",
          children: isLoading ? "Starting Debate..." : "Start Debate",
        }),
      }),
    ],
  });
};
exports.default = DebateSetup;
