"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationActions = VerificationActions;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function VerificationActions(_a) {
  var isChecking = _a.isChecking,
    isAddingDemo = _a.isAddingDemo,
    isVerifyingTables = _a.isVerifyingTables,
    isCheckingIndexes = _a.isCheckingIndexes,
    isVerifyingRLS = _a.isVerifyingRLS,
    isVerifyingFunctions = _a.isVerifyingFunctions,
    onRunChecks = _a.onRunChecks,
    onAddDemoData = _a.onAddDemoData,
    onVerifyTables = _a.onVerifyTables,
    onCheckIndexes = _a.onCheckIndexes,
    onVerifyRLS = _a.onVerifyRLS,
    onVerifyFunctions = _a.onVerifyFunctions,
    hasResults = _a.hasResults,
    hasVerifiedTables = _a.hasVerifiedTables,
    hasVerifiedIndexes = _a.hasVerifiedIndexes,
    hasVerifiedRLS = _a.hasVerifiedRLS,
    hasVerifiedFunctions = _a.hasVerifiedFunctions;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-wrap gap-2",
    children: [
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onRunChecks,
        disabled: isChecking,
        variant: hasResults ? "outline" : "default",
        size: "sm",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
            className: "mr-2 h-4 w-4 ".concat(isChecking ? "animate-spin" : ""),
          }),
          isChecking
            ? "Running Checks..."
            : hasResults
              ? "Re-run Checks"
              : "Run All Checks",
        ],
      }),
      onAddDemoData &&
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onAddDemoData,
          disabled: isAddingDemo,
          variant: "outline",
          size: "sm",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
              className: "mr-2 h-4 w-4",
            }),
            isAddingDemo ? "Adding Data..." : "Add Demo Data",
          ],
        }),
      onVerifyTables &&
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onVerifyTables,
          disabled: isVerifyingTables,
          variant: "outline",
          size: "sm",
          className: hasVerifiedTables
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Table2, {
              className: "mr-2 h-4 w-4",
            }),
            isVerifyingTables ? "Checking Tables..." : "Verify Tables",
          ],
        }),
      onCheckIndexes &&
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onCheckIndexes,
          disabled: isCheckingIndexes,
          variant: "outline",
          size: "sm",
          className: hasVerifiedIndexes
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
              className: "mr-2 h-4 w-4",
            }),
            isCheckingIndexes ? "Checking Indexes..." : "Check Indexes",
          ],
        }),
      onVerifyRLS &&
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onVerifyRLS,
          disabled: isVerifyingRLS,
          variant: "outline",
          size: "sm",
          className: hasVerifiedRLS
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
              className: "mr-2 h-4 w-4",
            }),
            isVerifyingRLS ? "Checking RLS..." : "Verify RLS",
          ],
        }),
      onVerifyFunctions &&
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onVerifyFunctions,
          disabled: isVerifyingFunctions,
          variant: "outline",
          size: "sm",
          className: hasVerifiedFunctions
            ? "bg-green-50 text-green-700 hover:bg-green-100"
            : "",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Code, {
              className: "mr-2 h-4 w-4",
            }),
            isVerifyingFunctions ? "Checking Functions..." : "Verify Functions",
          ],
        }),
    ],
  });
}
