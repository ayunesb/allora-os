"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Analytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function Analytics() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Analytics Dashboard",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "View business performance metrics and visualization data",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children: "Analytics content will be displayed here.",
          }),
        }),
      ],
    }),
  });
}
