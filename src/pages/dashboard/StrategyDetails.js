"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyDetails;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var react_helmet_async_1 = require("react-helmet-async");
var card_1 = require("@/components/ui/card");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var StrategyImplementationTools_1 = require("@/components/strategy-implementation/StrategyImplementationTools");
function StrategyDetails() {
  var id = (0, react_router_dom_1.useParams)().id;
  return (0, jsx_runtime_1.jsxs)(PageErrorBoundary_1.PageErrorBoundary, {
    pageName: "Strategy Details",
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Strategy Details | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold",
            children: "Strategy Details",
          }),
          (0, jsx_runtime_1.jsx)(card_1.Card, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              className: "pt-6",
              children: id
                ? (0, jsx_runtime_1.jsx)(
                    StrategyImplementationTools_1.default,
                    { strategyId: id },
                  )
                : (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "Strategy not found",
                  }),
            }),
          }),
        ],
      }),
    ],
  });
}
