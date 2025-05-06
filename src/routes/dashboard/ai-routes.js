"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiRoutes = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AiBoardroom = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/AiBoardroom");
  });
});
var AIAgent = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/AIAgent");
  });
});
var AISettings = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/AISettings");
  });
});
var ExecutiveLeaderboard = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/ExecutiveLeaderboard");
  });
});
var AIExecutiveDebate = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/AIExecutiveDebate");
  });
});
var Executives = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/Executives");
  });
});
var LangChainAgentAPI = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/LangChainAgentAPI");
  });
});
var AIChat = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/AIChat");
  });
});
var RedirectToDashboard = (0, react_1.lazy)(function () {
  return Promise.resolve().then(function () {
    return require("@/pages/dashboard/RedirectToDashboard");
  });
});
exports.aiRoutes = [
  { path: "ai-boardroom", element: (0, jsx_runtime_1.jsx)(AiBoardroom, {}) },
  { path: "ai-agent", element: (0, jsx_runtime_1.jsx)(AIAgent, {}) },
  { path: "ai-settings", element: (0, jsx_runtime_1.jsx)(AISettings, {}) },
  {
    path: "executive-leaderboard",
    element: (0, jsx_runtime_1.jsx)(ExecutiveLeaderboard, {}),
  },
  { path: "debate", element: (0, jsx_runtime_1.jsx)(AIExecutiveDebate, {}) },
  { path: "executives", element: (0, jsx_runtime_1.jsx)(Executives, {}) },
  {
    path: "langchain-agent",
    element: (0, jsx_runtime_1.jsx)(LangChainAgentAPI, {}),
  },
  { path: "ai-chat", element: (0, jsx_runtime_1.jsx)(AIChat, {}) },
  { path: "ai-bots", element: (0, jsx_runtime_1.jsx)(RedirectToDashboard, {}) },
];
