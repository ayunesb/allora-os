"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DatabaseVerificationPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var database_verification_1 = require("@/components/admin/database-verification");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
function DatabaseVerificationPage() {
  var _a = (0, react_1.useState)("tables"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  // Initialize with loading state
  var _b = (0, react_1.useState)({
      tables: [],
      policies: [],
      functions: [],
      isVerifying: false,
    }),
    verificationData = _b[0],
    setVerificationData = _b[1];
  var _c = (0, react_1.useState)({
      tables: "idle",
      functions: "idle",
      policies: "idle",
    }),
    verificationStatus = _c[0],
    setVerificationStatus = _c[1];
  var runVerification = function () {
    setVerificationData(function (prev) {
      return __assign(__assign({}, prev), { isVerifying: true });
    });
    // Simulate API call to get verification data
    setTimeout(function () {
      setVerificationData({
        tables: [
          {
            name: "profiles",
            exists: true,
            hasRLS: true,
            status: "success",
            message: "Table exists and has proper structure",
          },
          {
            name: "companies",
            exists: true,
            hasRLS: true,
            status: "success",
            message: "Table exists and has proper structure",
          },
          {
            name: "strategies",
            exists: true,
            hasRLS: true,
            status: "success",
            message: "Table exists and has proper structure",
          },
        ],
        policies: [
          {
            table: "profiles",
            name: "auth_policy",
            exists: true,
            isSecure: true,
            status: "success",
            message: "RLS policies are configured correctly",
          },
          {
            table: "companies",
            name: "auth_policy",
            exists: true,
            isSecure: true,
            status: "success",
            message: "RLS policies are configured correctly",
          },
          {
            table: "strategies",
            name: "auth_policy",
            exists: true,
            isSecure: true,
            status: "success",
            message: "RLS policies are configured correctly",
          },
        ],
        functions: [
          {
            name: "handle_new_user",
            exists: true,
            isSecure: true,
            status: "success",
            message: "Function exists and is secure",
          },
          {
            name: "get_user_companies",
            exists: true,
            isSecure: true,
            status: "success",
            message: "Function exists and is secure",
          },
        ],
        isVerifying: false,
      });
      setVerificationStatus({
        tables: "success",
        functions: "success",
        policies: "success",
      });
    }, 1500);
  };
  (0, react_1.useEffect)(function () {
    runVerification();
  }, []);
  // Derived status counts
  var tableSuccessCount = verificationData.tables.filter(function (t) {
    return t.exists;
  }).length;
  var policySuccessCount = verificationData.policies.filter(function (p) {
    return p.exists;
  }).length;
  var functionSuccessCount = verificationData.functions.filter(function (f) {
    return f.exists && f.isSecure;
  }).length;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-start",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Database Verification",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Verify your database structure, RLS policies, and functions",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: runVerification,
            disabled: verificationData.isVerifying,
            variant: "outline",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "mr-2 h-4 w-4 ".concat(
                  verificationData.isVerifying ? "animate-spin" : "",
                ),
              }),
              verificationData.isVerifying
                ? "Verifying..."
                : "Run Verification",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      className: "text-lg",
                      children: "Tables",
                    }),
                    (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                      variant:
                        verificationStatus.tables === "success"
                          ? "success"
                          : "secondary",
                      children: [
                        tableSuccessCount,
                        "/",
                        verificationData.tables.length,
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: verificationData.isVerifying
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className: "flex justify-center py-4",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.RefreshCw,
                        { className: "animate-spin h-8 w-8 text-primary/70" },
                      ),
                    })
                  : (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        verificationStatus.tables === "success"
                          ? (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-5 w-5 text-green-500" },
                            )
                          : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                              className: "h-5 w-5 text-amber-500",
                            }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children:
                            verificationStatus.tables === "success"
                              ? "All tables verified successfully"
                              : "Table verification incomplete",
                        }),
                      ],
                    }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      className: "text-lg",
                      children: "RLS Policies",
                    }),
                    (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                      variant:
                        verificationStatus.policies === "success"
                          ? "success"
                          : "secondary",
                      children: [
                        policySuccessCount,
                        "/",
                        verificationData.policies.length,
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: verificationData.isVerifying
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className: "flex justify-center py-4",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.RefreshCw,
                        { className: "animate-spin h-8 w-8 text-primary/70" },
                      ),
                    })
                  : (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        verificationStatus.policies === "success"
                          ? (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-5 w-5 text-green-500" },
                            )
                          : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                              className: "h-5 w-5 text-amber-500",
                            }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children:
                            verificationStatus.policies === "success"
                              ? "All RLS policies configured properly"
                              : "RLS policy verification incomplete",
                        }),
                      ],
                    }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      className: "text-lg",
                      children: "Functions",
                    }),
                    (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                      variant:
                        verificationStatus.functions === "success"
                          ? "success"
                          : "secondary",
                      children: [
                        functionSuccessCount,
                        "/",
                        verificationData.functions.length,
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: verificationData.isVerifying
                  ? (0, jsx_runtime_1.jsx)("div", {
                      className: "flex justify-center py-4",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.RefreshCw,
                        { className: "animate-spin h-8 w-8 text-primary/70" },
                      ),
                    })
                  : (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        verificationStatus.functions === "success"
                          ? (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-5 w-5 text-green-500" },
                            )
                          : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                              className: "h-5 w-5 text-amber-500",
                            }),
                        (0, jsx_runtime_1.jsx)("span", {
                          children:
                            verificationStatus.functions === "success"
                              ? "All functions verified successfully"
                              : "Function verification incomplete",
                        }),
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
              value: activeTab,
              onValueChange: setActiveTab,
              children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "tables",
                    children: "Tables",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "policies",
                    children: "RLS Policies",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "functions",
                    children: "Functions",
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "tables",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(
                  database_verification_1.DatabaseTablesCheck,
                  { tables: verificationData.tables },
                ),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "policies",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(
                  database_verification_1.RlsPoliciesCheck,
                  { policies: verificationData.policies },
                ),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "functions",
                className: "mt-0",
                children: (0, jsx_runtime_1.jsx)(
                  database_verification_1.DatabaseFunctionsCheck,
                  { functions: verificationData.functions },
                ),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
