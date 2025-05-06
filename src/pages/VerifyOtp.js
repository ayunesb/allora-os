"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VerifyOtp;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
function VerifyOtp() {
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
              children: "Enter verification code",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "We've sent a verification code to your email",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          className: "grid gap-4",
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "grid gap-2",
            children: (0, jsx_runtime_1.jsx)(input_1.Input, {
              id: "otp",
              type: "text",
              placeholder: "Verification code",
            }),
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            className: "w-full",
            children: "Verify",
          }),
        }),
      ],
    }),
  });
}
