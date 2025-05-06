"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyImplementationPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var StrategyImplementationTools_1 = require("@/components/strategy-implementation/StrategyImplementationTools");
function StrategyImplementationPage() {
  var strategyId = (0, react_router_dom_1.useParams)().strategyId;
  var _a = (0, react_1.useState)("Current Strategy"),
    strategyTitle = _a[0],
    setStrategyTitle = _a[1];
  (0, react_1.useEffect)(
    function () {
      // Fetch strategy details and update the title
      if (strategyId) {
        // Replace this with your actual API call to fetch strategy details
        // Example:
        // fetchStrategyDetails(strategyId)
        //   .then(data => setStrategyTitle(data.title))
        //   .catch(error => console.error("Error fetching strategy details:", error));
      }
    },
    [strategyId],
  );
  // In the return statement, update the StrategyImplementationTools props
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-8",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Strategy Implementation",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)("p", {
              children:
                "Manage the implementation of your growth strategy. Track tasks, milestones, and metrics to ensure successful execution.",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "lg:col-span-2",
            children: (0, jsx_runtime_1.jsx)(
              StrategyImplementationTools_1.default,
              { strategyId: strategyId },
            ),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-4",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Additional Resources",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("ul", {
                    className: "list-disc pl-5",
                    children: [
                      (0, jsx_runtime_1.jsx)("li", {
                        children: (0, jsx_runtime_1.jsx)("a", {
                          href: "#",
                          className: "text-blue-500 hover:underline",
                          children: "Documentation",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: (0, jsx_runtime_1.jsx)("a", {
                          href: "#",
                          className: "text-blue-500 hover:underline",
                          children: "Support Forum",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)("li", {
                        children: (0, jsx_runtime_1.jsx)("a", {
                          href: "#",
                          className: "text-blue-500 hover:underline",
                          children: "Contact Us",
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
