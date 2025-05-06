"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AiBotLogic;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function AiBotLogic() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "AI Bot Logic",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Configure AI executive bots and their behavior",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children: "AI bot configuration content will be displayed here.",
          }),
        }),
      ],
    }),
  });
}
