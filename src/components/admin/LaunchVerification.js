"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaunchVerification;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var AuthContext_1 = require("@/context/AuthContext");
var VerificationContent_1 = require("./launch-verification/VerificationContent");
var VerificationActions_1 = require("./launch-verification/VerificationActions");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var useVerification_1 = require("@/hooks/admin/useVerification");
var authCompatibility_1 = require("@/utils/authCompatibility");
function LaunchVerification() {
  var _a;
  var authContext = (0, AuthContext_1.useAuth)();
  var auth = (0, authCompatibility_1.createAuthCompatibilityLayer)(authContext);
  var companyId =
    ((_a = auth.user) === null || _a === void 0 ? void 0 : _a.company_id) ||
    null;
  var _b = (0, useVerification_1.useVerification)(companyId),
    isChecking = _b.isChecking,
    results = _b.results,
    isReady = _b.isReady,
    isAddingDemo = _b.isAddingDemo,
    isVerifyingTables = _b.isVerifyingTables,
    isCheckingIndexes = _b.isCheckingIndexes,
    isVerifyingRLS = _b.isVerifyingRLS,
    isVerifyingFunctions = _b.isVerifyingFunctions,
    runChecks = _b.runChecks,
    handleAddDemoData = _b.handleAddDemoData,
    verifyRequiredTables = _b.verifyRequiredTables,
    checkDatabaseIndexes = _b.checkDatabaseIndexes,
    verifyRLSPolicies = _b.verifyRLSPolicies,
    verifyDatabaseFunctions = _b.verifyDatabaseFunctions;
  return (0, jsx_runtime_1.jsx)(ErrorBoundary_1.ErrorBoundary, {
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "border-border/50 shadow-sm",
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center justify-between",
              children: [
                "Launch Readiness Verification",
                isReady === true &&
                  (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                    className: "h-5 w-5 text-green-500",
                  }),
                isReady === false &&
                  (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                    className: "h-5 w-5 text-red-500",
                  }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children:
                "Verify that all critical systems are working correctly before launch",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)(
            VerificationContent_1.VerificationContent,
            { results: results, isChecking: isChecking },
          ),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
          children: (0, jsx_runtime_1.jsx)(
            VerificationActions_1.VerificationActions,
            {
              isChecking: isChecking,
              isAddingDemo: isAddingDemo,
              isVerifyingTables: isVerifyingTables,
              isCheckingIndexes: isCheckingIndexes,
              isVerifyingRLS: isVerifyingRLS,
              isVerifyingFunctions: isVerifyingFunctions,
              onRunChecks: runChecks,
              onAddDemoData: handleAddDemoData,
              onVerifyTables: verifyRequiredTables,
              onCheckIndexes: checkDatabaseIndexes,
              onVerifyRLS: verifyRLSPolicies,
              onVerifyFunctions: verifyDatabaseFunctions,
              hasResults: results !== null,
            },
          ),
        }),
      ],
    }),
  });
}
