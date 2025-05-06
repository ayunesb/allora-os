"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiIntegrations;
var jsx_runtime_1 = require("react/jsx-runtime");
var ZapierReadinessTest_1 = require("@/components/admin/webhooks/ZapierReadinessTest");
function ApiIntegrations() {
  // Example webhook URL and validation state
  var webhookUrl = "https://hooks.zapier.com/hooks/catch/123456/abcdef/";
  var isValid = true;
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h1", { children: "API Integrations" }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-6",
        children: [
          (0, jsx_runtime_1.jsx)("h2", { children: "Zapier Integration" }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-4",
            children: (0, jsx_runtime_1.jsx)(ZapierReadinessTest_1.default, {
              webhookUrl: webhookUrl,
              isValid: isValid,
            }),
          }),
        ],
      }),
    ],
  });
}
