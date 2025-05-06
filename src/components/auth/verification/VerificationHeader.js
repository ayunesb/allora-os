"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationHeader = VerificationHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
function VerificationHeader(_a) {
  var verificationStatus = _a.verificationStatus,
    email = _a.email;
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4",
        children:
          verificationStatus === "verified"
            ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                className: "h-8 w-8 text-green-500",
              })
            : verificationStatus === "failed"
              ? (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                  className: "h-8 w-8 text-destructive",
                })
              : (0, jsx_runtime_1.jsx)(lucide_react_1.RocketIcon, {
                  className: "h-8 w-8 text-primary",
                }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
        className: "text-2xl",
        children:
          verificationStatus === "verified"
            ? "Email Verified!"
            : verificationStatus === "failed"
              ? "Verification Failed"
              : "Verify Your Email",
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
        children:
          verificationStatus === "verified"
            ? "You'll be redirected to the dashboard shortly"
            : verificationStatus === "failed"
              ? "There was a problem verifying your email"
              : "We've sent a verification email to ".concat(email),
      }),
    ],
  });
}
