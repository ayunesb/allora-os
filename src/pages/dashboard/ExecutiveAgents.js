"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveAgents;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function ExecutiveAgents() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleCreateAgent = function () {
    navigate("/dashboard/executives/create");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "AI Executive Agents",
        description: "Manage your AI executive team",
        children: "AI Executive Agents",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              children: "All Agents",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: handleCreateAgent,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "mr-2 h-4 w-4",
              }),
              "Create Agent",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className: "py-8 text-center",
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              children: "Executive agent functionality is being implemented.",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "w-full h-2 bg-gray-800 rounded-full overflow-hidden mt-2",
              children: (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700 ease-in-out",
                style: {
                  width: "".concat((agent.xp / agent.maxXp) * 100, "%"),
                },
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
