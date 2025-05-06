"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDebateSetup;
var react_1 = require("react");
var debateManager_1 = require("@/backend/debateManager");
function useDebateSetup() {
  var _a = (0, react_1.useState)(""),
    selectedTopic = _a[0],
    setSelectedTopic = _a[1];
  var _b = (0, react_1.useState)(""),
    debateTitle = _b[0],
    setDebateTitle = _b[1];
  var _c = (0, react_1.useState)(""),
    debateObjective = _c[0],
    setDebateObjective = _c[1];
  var _d = (0, react_1.useState)("5"),
    debateDuration = _d[0],
    setDebateDuration = _d[1];
  var _e = (0, react_1.useState)(false),
    isDebateActive = _e[0],
    setIsDebateActive = _e[1];
  var _f = (0, react_1.useState)("medium"),
    riskAppetite = _f[0],
    setRiskAppetite = _f[1];
  var _g = (0, react_1.useState)("growth"),
    businessPriority = _g[0],
    setBusinessPriority = _g[1];
  var _h = (0, react_1.useState)([]),
    customTopics = _h[0],
    setCustomTopics = _h[1];
  // Ensure predefinedDebateTopics is an array
  var predefinedTopics = (0, react_1.useMemo)(function () {
    return Array.isArray(debateManager_1.debateTopics)
      ? debateManager_1.debateTopics
      : [];
  }, []);
  // Combine predefined and custom topics
  var getAllDebateTopics = (0, react_1.useCallback)(
    function () {
      var allTopics = __spreadArray([], predefinedTopics, true);
      if (Array.isArray(customTopics)) {
        allTopics.push.apply(allTopics, customTopics);
      }
      return allTopics;
    },
    [predefinedTopics, customTopics],
  );
  var handleTopicChange = (0, react_1.useCallback)(
    function (value) {
      if (!value) return;
      setSelectedTopic(value);
      // Check if this is a predefined topic
      var existingTopic = getAllDebateTopics().find(function (t) {
        return t.id === value;
      });
      if (existingTopic) {
        // Auto-fill title and objective based on selected topic
        setDebateTitle("".concat(existingTopic.topic, " Discussion"));
        setDebateObjective(
          "Evaluate and decide on the best approach for ".concat(
            existingTopic.topic.toLowerCase(),
          ),
        );
      } else if (value) {
        // This is a custom topic (value should be the topic text itself)
        // Add it to custom topics if not already there
        if (
          !customTopics.some(function (t) {
            return t.id === value;
          })
        ) {
          var newCustomTopic_1 = {
            id: value,
            topic: value,
            description: "Custom topic",
          };
          setCustomTopics(function (prev) {
            return __spreadArray(
              __spreadArray([], prev, true),
              [newCustomTopic_1],
              false,
            );
          });
          setDebateTitle("".concat(value, " Discussion"));
          setDebateObjective(
            "Evaluate and decide on the best approach for ".concat(
              value.toLowerCase(),
            ),
          );
        }
      }
    },
    [customTopics, getAllDebateTopics],
  );
  var getSelectedTopicDetails = (0, react_1.useCallback)(
    function () {
      return getAllDebateTopics().find(function (t) {
        return t.id === selectedTopic;
      });
    },
    [selectedTopic, getAllDebateTopics],
  );
  return {
    selectedTopic: selectedTopic,
    debateTitle: debateTitle,
    debateObjective: debateObjective,
    debateDuration: debateDuration,
    isDebateActive: isDebateActive,
    riskAppetite: riskAppetite,
    businessPriority: businessPriority,
    debateTopics: getAllDebateTopics(),
    setSelectedTopic: handleTopicChange,
    setDebateTitle: setDebateTitle,
    setDebateObjective: setDebateObjective,
    setDebateDuration: setDebateDuration,
    setIsDebateActive: setIsDebateActive,
    setRiskAppetite: setRiskAppetite,
    setBusinessPriority: setBusinessPriority,
    getSelectedTopicDetails: getSelectedTopicDetails,
  };
}
