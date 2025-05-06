"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmailConfirm;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
function EmailConfirm() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex items-center justify-center min-h-screen bg-muted/40",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "w-full max-w-md",
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          className: "space-y-1",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "text-2xl",
              children: "Check your email",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "We've sent you a confirmation email with a link to verify your account",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          className: "grid gap-4",
          children: (0, jsx_runtime_1.jsx)("p", {
            className: "text-center text-muted-foreground",
            children:
              "If you don't see the email in your inbox, please check your spam folder",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          className: "flex justify-center",
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            children: "Resend email",
          }),
        }),
      ],
    }),
  });
}
