"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIExecutiveBoardroom;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var use_mobile_1 = require("@/hooks/use-mobile");
var useBoardroomData_1 = require("./useBoardroomData");
var LoadingState_1 = require("./LoadingState");
var TimeoutError_1 = require("./TimeoutError");
var EmptyDebateState_1 = require("./EmptyDebateState");
var IntroductionState_1 = require("./IntroductionState");
var DebateContent_1 = require("./DebateContent");
function AIExecutiveBoardroom(_a) {
  var companyId = _a.companyId;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var _b = (0, useBoardroomData_1.useBoardroomData)(companyId),
    topic = _b.topic,
    summary = _b.summary,
    discussion = _b.discussion,
    conclusion = _b.conclusion,
    isLoading = _b.isLoading,
    error = _b.error,
    timeoutError = _b.timeoutError,
    sampleDebate = _b.sampleDebate;
  var handleStartNewDebate = function () {
    // Navigate directly to the debate page
    navigate("/dashboard/debate");
  };
  // Show loading state
  if (isLoading && !timeoutError) {
    return (0, jsx_runtime_1.jsx)(LoadingState_1.LoadingState, {});
  }
  // Show timeout error
  if (timeoutError && isLoading) {
    return (0, jsx_runtime_1.jsx)(TimeoutError_1.TimeoutError, {
      onRefresh: function () {
        return window.location.reload();
      },
    });
  }
  // Show error state with sample data
  if (error) {
    return (0, jsx_runtime_1.jsx)(IntroductionState_1.IntroductionState, {
      sampleDebate: sampleDebate,
      onStartNewDebate: handleStartNewDebate,
    });
  }
  // Show empty state
  if (!topic && !summary && discussion.length === 0) {
    return (0, jsx_runtime_1.jsx)(EmptyDebateState_1.EmptyDebateState, {
      onStartNewDebate: handleStartNewDebate,
    });
  }
  // Show debate content
  return (0, jsx_runtime_1.jsx)(DebateContent_1.DebateContent, {
    topic: topic,
    summary: summary,
    discussion: discussion,
    conclusion: conclusion,
    onStartNewDebate: handleStartNewDebate,
  });
}
