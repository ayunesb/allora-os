"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIAgent;
var jsx_runtime_1 = require("react/jsx-runtime");
var typography_1 = require("@/components/ui/typography");
var AgentQueryInterface_1 = require("@/components/ai-agents/AgentQueryInterface");
var useUser_1 = require("@/hooks/useUser");
var useCompanyId_1 = require("@/hooks/useCompanyId");
function AIAgent() {
  var _a;
  var user = (0, useUser_1.useUser)().user;
  var companyId = (0, useCompanyId_1.useCompanyId)();
  var initialContext = {
    userId: user === null || user === void 0 ? void 0 : user.id,
    companyId: companyId,
    date: new Date().toISOString(),
    userRole:
      ((_a = user === null || user === void 0 ? void 0 : user.user_metadata) ===
        null || _a === void 0
        ? void 0
        : _a.role) || "user",
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "AI Agent",
          }),
          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
            children:
              "Ask questions or make requests to your AI-powered LangChain agent. This agent can access various tools and services to help you with your business needs.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-8",
        children: (0, jsx_runtime_1.jsx)(
          AgentQueryInterface_1.AgentQueryInterface,
          {
            initialContext: initialContext,
            placeholder:
              "Ask about leads, campaigns, analyze data, or request business insights...",
          },
        ),
      }),
    ],
  });
}
