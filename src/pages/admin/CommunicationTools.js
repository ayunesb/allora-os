"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunicationTools;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function CommunicationTools() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Communication Tools",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "Configure calling, messaging, and other communication features",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children:
              "Communication tools configuration content will be displayed here.",
          }),
        }),
      ],
    }),
  });
}
