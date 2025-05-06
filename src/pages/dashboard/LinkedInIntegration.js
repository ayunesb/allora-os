"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinkedInIntegration;
var jsx_runtime_1 = require("react/jsx-runtime");
var LinkedInIntegration_1 = require("@/components/linkedin/LinkedInIntegration");
function LinkedInIntegration() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "animate-fadeIn space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-2xl font-bold tracking-tight",
        children: "LinkedIn Integration",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children:
          "Connect your LinkedIn account to import connections as leads.",
      }),
      (0, jsx_runtime_1.jsx)(LinkedInIntegration_1.LinkedInIntegration, {}),
    ],
  });
}
