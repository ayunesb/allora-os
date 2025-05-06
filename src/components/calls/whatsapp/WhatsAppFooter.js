"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WhatsAppFooter;
var jsx_runtime_1 = require("react/jsx-runtime");
function WhatsAppFooter() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "text-xs text-muted-foreground mt-2",
    children: [
      (0, jsx_runtime_1.jsx)("p", {
        children:
          "You can send WhatsApp messages directly through our Twilio integration or open WhatsApp Web.",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        children:
          "Status callbacks will be logged to track message delivery status.",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "mt-1 font-medium",
        children: "Template messaging requires WhatsApp Business approval.",
      }),
    ],
  });
}
