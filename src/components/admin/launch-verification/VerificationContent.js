"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationContent = VerificationContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var ValidationResultItem_1 = require("./ValidationResultItem");
var DatabaseTablesSection_1 = require("./DatabaseTablesSection");
var DatabaseChecksSection_1 = require("./DatabaseChecksSection");
function VerificationContent(_a) {
  var results = _a.results,
    isChecking = _a.isChecking;
  if (isChecking) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col items-center justify-center py-6",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
          className: "h-8 w-8 animate-spin text-primary mb-4",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: "Running verification checks...",
        }),
      ],
    });
  }
  if (!results) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "flex flex-col items-center justify-center py-6",
      children: (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-4 text-center",
        children:
          "Run a comprehensive check to verify all systems are ready for production",
      }),
    });
  }
  // Extract core validation keys (excluding table/db-specific checks)
  var coreValidationKeys = Object.keys(results).filter(function (key) {
    return ![
      "databaseTables",
      "databaseIndexes",
      "rlsPolicies",
      "databaseFunctions",
      "overallStatus",
    ].includes(key);
  });
  // Type guard function to check if an object has the valid/message structure
  var isValidationResult = function (obj) {
    return obj && typeof obj === "object" && "valid" in obj && "message" in obj;
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-3",
    children: [
      coreValidationKeys.map(function (key) {
        var result = results[key];
        // Use the type guard to safely render ValidationResultItem
        if (isValidationResult(result)) {
          return (0, jsx_runtime_1.jsx)(
            ValidationResultItem_1.ValidationResultItem,
            { id: key, title: key, result: result },
            key,
          );
        }
        return null;
      }),
      results.databaseTables &&
        (0, jsx_runtime_1.jsx)(DatabaseTablesSection_1.DatabaseTablesSection, {
          tables: results.databaseTables,
        }),
      results.databaseIndexes &&
        Array.isArray(results.databaseIndexes) &&
        (0, jsx_runtime_1.jsx)(DatabaseChecksSection_1.DatabaseChecksSection, {
          title: "Database Indexes Check",
          items: results.databaseIndexes,
        }),
      results.rlsPolicies &&
        Array.isArray(results.rlsPolicies) &&
        (0, jsx_runtime_1.jsx)(DatabaseChecksSection_1.DatabaseChecksSection, {
          title: "RLS Policies Check",
          items: results.rlsPolicies,
        }),
      results.databaseFunctions &&
        Array.isArray(results.databaseFunctions) &&
        (0, jsx_runtime_1.jsx)(DatabaseChecksSection_1.DatabaseChecksSection, {
          title: "Database Functions Check",
          items: results.databaseFunctions,
        }),
    ],
  });
}
