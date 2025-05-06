"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Campaigns;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function Campaigns() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Campaign Management",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Manage marketing campaigns across different platforms",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children: "Campaign management content will be displayed here.",
          }),
        }),
      ],
    }),
  });
}
