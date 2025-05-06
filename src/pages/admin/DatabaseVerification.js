"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DatabaseVerification;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var database_verification_1 = require("@/components/admin/database-verification");
var useDatabaseVerification_1 = require("@/hooks/admin/useDatabaseVerification");
function DatabaseVerification() {
  var _a = (0, useDatabaseVerification_1.useDatabaseVerification)(),
    verificationResult = _a.verificationResult,
    verifyDatabaseConfiguration = _a.verifyDatabaseConfiguration;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Database Verification",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "Verify and manage your database configuration for Allora AI",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)(
            database_verification_1.DatabaseVerificationDashboard,
            {
              result: verificationResult,
              onVerify: verifyDatabaseConfiguration,
            },
          ),
        }),
      ],
    }),
  });
}
