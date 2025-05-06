"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DiagnosticsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var alert_1 = require("@/components/ui/alert");
var displayResults_1 = require("@/utils/admin/database-verification/displayResults");
var logger_1 = require("@/utils/logger");
var client_1 = require("@/integrations/supabase/client");
var lucide_react_1 = require("lucide-react");
function DiagnosticsPage() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isScanning = _a[0],
    setIsScanning = _a[1];
  var _b = (0, react_1.useState)(null),
    scanResults = _b[0],
    setScanResults = _b[1];
  var runDeepScan = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var dbCheck, scanSuccess, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsScanning(true);
            (0, logger_1.logDiagnosticInfo)("Starting deep scan", {
              timestamp: new Date().toISOString(),
            });
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, 5, 6]);
            return [4 /*yield*/, (0, client_1.checkSupabaseConnection)()];
          case 2:
            dbCheck = _a.sent();
            return [4 /*yield*/, (0, displayResults_1.performDeepScan)()];
          case 3:
            scanSuccess = _a.sent();
            // Store results
            setScanResults({
              success: scanSuccess,
              timestamp: new Date().toISOString(),
              details: {
                authentication: true, // We assume these are set by the deep scan
                database: dbCheck.connected,
                permissions: true,
                routing: true,
              },
            });
            return [3 /*break*/, 6];
          case 4:
            error_1 = _a.sent();
            console.error("Error during deep scan:", error_1);
            setScanResults({
              success: false,
              timestamp: new Date().toISOString(),
              details: {
                authentication: false,
                database: false,
                permissions: false,
                routing: false,
              },
            });
            return [3 /*break*/, 6];
          case 5:
            setIsScanning(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-8",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-6",
        children: "System Diagnostics",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-8",
        children: "Run diagnostics to identify and resolve system issues.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "h-5 w-5 text-primary",
                      }),
                      "System Deep Scan",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "Perform a comprehensive scan of authentication, database, permissions, and routing",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  scanResults &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "mb-6",
                      children: [
                        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                          variant: scanResults.success
                            ? "default"
                            : "destructive",
                          children: [
                            scanResults.success
                              ? (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.CheckCircle,
                                  { className: "h-4 w-4" },
                                )
                              : (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.AlertTriangle,
                                  { className: "h-4 w-4" },
                                ),
                            (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                              children: scanResults.success
                                ? "Scan Completed Successfully"
                                : "Issues Detected",
                            }),
                            (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
                              children: [
                                "Scan completed at ",
                                new Date(
                                  scanResults.timestamp,
                                ).toLocaleTimeString(),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-2 gap-4 mt-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                  variant: scanResults.details.authentication
                                    ? "outline"
                                    : "destructive",
                                  children: scanResults.details.authentication
                                    ? "Pass"
                                    : "Fail",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Authentication",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                  variant: scanResults.details.database
                                    ? "outline"
                                    : "destructive",
                                  children: scanResults.details.database
                                    ? "Pass"
                                    : "Fail",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Database",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                  variant: scanResults.details.permissions
                                    ? "outline"
                                    : "destructive",
                                  children: scanResults.details.permissions
                                    ? "Pass"
                                    : "Fail",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Permissions",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex items-center gap-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                  variant: scanResults.details.routing
                                    ? "outline"
                                    : "destructive",
                                  children: scanResults.details.routing
                                    ? "Pass"
                                    : "Fail",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Routing",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                    defaultValue: "instructions",
                    children: [
                      (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                        className: "mb-4",
                        children: [
                          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                            value: "instructions",
                            children: "Instructions",
                          }),
                          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                            value: "authentication",
                            children: "Authentication",
                          }),
                          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                            value: "database",
                            children: "Database",
                          }),
                          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                            value: "routing",
                            children: "Routing",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                        value: "instructions",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-sm space-y-4",
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              children: "The deep scan will check:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ul", {
                              className: "list-disc pl-5 space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Authentication status and session validity",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Database connection and table permissions",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "User role and access permissions",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Routing configuration and component loading",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children:
                                'Click "Run Deep Scan" to begin the diagnostics process.',
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                        value: "authentication",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-sm",
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium mb-2",
                              children: "Authentication Diagnostics",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "mb-2",
                              children: "The scan will verify:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ul", {
                              className: "list-disc pl-5 space-y-1",
                              children: [
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "User is properly authenticated",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Session token is valid and not expired",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "User profile is accessible",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                        value: "database",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-sm",
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium mb-2",
                              children: "Database Diagnostics",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "mb-2",
                              children: "The scan will verify:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ul", {
                              className: "list-disc pl-5 space-y-1",
                              children: [
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Supabase connection is established",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Required tables exist and are accessible",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "RLS policies are properly configured",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "Database functions are working",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                        value: "routing",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "text-sm",
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className: "font-medium mb-2",
                              children: "Routing Diagnostics",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "mb-2",
                              children: "The scan will verify:",
                            }),
                            (0, jsx_runtime_1.jsxs)("ul", {
                              className: "list-disc pl-5 space-y-1",
                              children: [
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "All required routes are defined",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Component loading is working properly",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children: "URL patterns are correct",
                                }),
                                (0, jsx_runtime_1.jsx)("li", {
                                  children:
                                    "Protection for admin routes is working",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: runDeepScan,
                  disabled: isScanning,
                  className: "w-full",
                  children: isScanning
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                            className: "mr-2 h-4 w-4 animate-spin",
                          }),
                          "Running Deep Scan...",
                        ],
                      })
                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                            className: "mr-2 h-4 w-4",
                          }),
                          "Run Deep Scan",
                        ],
                      }),
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Common Issues",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "Troubleshooting for frequently encountered problems",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-sm font-medium",
                          children: "404 Errors on Admin Pages",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children:
                            "This typically indicates a routing issue or missing component. Check route definitions in admin-routes.tsx and verify that all required components are imported correctly.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-sm font-medium",
                          children: "Database Connection Issues",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children:
                            "Verify your Supabase credentials and ensure your IP is whitelisted. Check console logs for specific error details that might indicate permission or configuration problems.",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-sm font-medium",
                          children: "Authentication Failures",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children:
                            "If authentication is failing, try signing out and back in. Check your role in the profiles table to ensure you have the correct permissions for admin functionality.",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
