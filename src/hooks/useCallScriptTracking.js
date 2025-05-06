"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCallScriptTracking = useCallScriptTracking;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var useSelfLearning_1 = require("@/hooks/useSelfLearning");
var sonner_1 = require("sonner");
function useCallScriptTracking() {
  var user = (0, AuthContext_1.useAuth)().user;
  var trackAction = (0, useSelfLearning_1.useSelfLearning)().trackAction;
  /**
   * Track when a user views a call script
   */
  var trackScriptView = (0, react_1.useCallback)(
    function (scriptId, title, type) {
      if (!(user === null || user === void 0 ? void 0 : user.id)) return;
      trackAction(
        "view_script",
        "script_view",
        scriptId,
        "".concat(type, "_script"),
        { title: title, type: type },
      );
    },
    [user, trackAction],
  );
  /**
   * Track when a user uses a script
   */
  var trackScriptUse = (0, react_1.useCallback)(
    function (scriptId, title, type, primaryBot) {
      if (!(user === null || user === void 0 ? void 0 : user.id)) return;
      trackAction(
        "use_script",
        "script_usage",
        scriptId,
        "".concat(type, "_script"),
        {
          title: title,
          type: type,
          primaryBot:
            primaryBot === null || primaryBot === void 0
              ? void 0
              : primaryBot.name,
        },
      );
      sonner_1.toast.success(
        "".concat(
          type === "call" ? "Call" : "Message",
          " script loaded successfully!",
        ),
      );
    },
    [user, trackAction],
  );
  /**
   * Track feedback on a script
   */
  var trackScriptFeedback = (0, react_1.useCallback)(
    function (scriptId, title, type, isPositive, primaryBot, reason) {
      if (!(user === null || user === void 0 ? void 0 : user.id)) return;
      trackAction(
        isPositive ? "script_approve" : "script_reject",
        "script_feedback",
        scriptId,
        "".concat(type, "_script"),
        {
          title: title,
          type: type,
          primaryBot:
            primaryBot === null || primaryBot === void 0
              ? void 0
              : primaryBot.name,
          rating: isPositive ? "positive" : "negative",
          reason: reason,
        },
      );
      sonner_1.toast.success(
        isPositive
          ? "Thanks for your positive feedback!"
          : "Feedback recorded. We'll improve our scripts.",
      );
    },
    [user, trackAction],
  );
  return {
    trackScriptView: trackScriptView,
    trackScriptUse: trackScriptUse,
    trackScriptFeedback: trackScriptFeedback,
    isLoggedIn: !!(user === null || user === void 0 ? void 0 : user.id),
  };
}
