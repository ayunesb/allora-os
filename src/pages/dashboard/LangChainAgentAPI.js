"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LangChainAgentAPI;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var typography_1 = require("@/components/ui/typography");
var AgentQueryInterface_1 = require("@/components/ai-agents/AgentQueryInterface");
var useUser_1 = require("@/hooks/useUser");
var useCompanyId_1 = require("@/hooks/useCompanyId");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
function LangChainAgentAPI() {
  var _a;
  var user = (0, useUser_1.useUser)().user;
  var companyId = (0, useCompanyId_1.useCompanyId)();
  var _b = (0, react_1.useState)(
      localStorage.getItem("langchain_api_endpoint") || "",
    ),
    apiEndpoint = _b[0],
    setApiEndpoint = _b[1];
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
            children: "LangChain Agent API",
          }),
          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
            children:
              "Connect to your external LangChain Agent API to leverage AI-powered agents with access to various tools and services.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
        variant: "info",
        className: "mb-6",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.InfoIcon, {
            className: "h-4 w-4",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
            children: "API Configuration",
          }),
          (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
            children:
              "You can deploy your LangChain Agent API separately and connect it to Allora AI using the endpoint URL. This allows you to run resource-intensive AI agents outside your main application.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "API Configuration",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("form", {
              className: "space-y-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)("label", {
                    htmlFor: "apiEndpoint",
                    className: "font-medium",
                    children: "LangChain Agent API Endpoint",
                  }),
                  (0, jsx_runtime_1.jsx)("input", {
                    id: "apiEndpoint",
                    type: "text",
                    className: "w-full p-2 border rounded-md",
                    placeholder:
                      "https://your-langchain-api.example.com/api/langchain-agent",
                    value: apiEndpoint,
                    onChange: function (e) {
                      setApiEndpoint(e.target.value);
                      localStorage.setItem(
                        "langchain_api_endpoint",
                        e.target.value,
                      );
                    },
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Enter the full URL to your deployed LangChain Agent API endpoint.",
                  }),
                ],
              }),
            }),
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
