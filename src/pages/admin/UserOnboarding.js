"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserOnboarding;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function UserOnboarding() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "User Onboarding",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Configure the onboarding process for new users",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children:
              "User onboarding configuration content will be displayed here.",
          }),
        }),
      ],
    }),
  });
}
