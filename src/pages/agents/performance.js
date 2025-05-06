"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AgentPerformance;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_query_1 = require("@tanstack/react-query");
var api_1 = require("@/lib/api");
var card_1 = require("@/components/ui/card");
function AgentPerformance() {
  var _a = (0, react_query_1.useQuery)(["ai_logs"], api_1.fetchAILogs),
    data = _a.data,
    isLoading = _a.isLoading;
  if (isLoading)
    return (0, jsx_runtime_1.jsx)("div", { children: "Loading..." });
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-4",
    children:
      data === null || data === void 0
        ? void 0
        : data.map(function (log) {
            return (0, jsx_runtime_1.jsxs)(
              card_1.Card,
              {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                    className: "text-sm text-muted-foreground",
                    children: log.created_at,
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    children: [
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          (0, jsx_runtime_1.jsx)("strong", {
                            children: "Agent:",
                          }),
                          " ",
                          log.agent_id,
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          (0, jsx_runtime_1.jsx)("strong", {
                            children: "Action:",
                          }),
                          " ",
                          log.action,
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("pre", {
                        className: "text-xs mt-2",
                        children: JSON.stringify(log.output, null, 2),
                      }),
                    ],
                  }),
                ],
              },
              log.id,
            );
          }),
  });
}
