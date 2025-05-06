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
exports.default = SystemDiagnostics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var client_1 = require("@/integrations/supabase/client");
function SystemDiagnostics() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isCheckingConnection = _a[0],
    setIsCheckingConnection = _a[1];
  var _b = (0, react_1.useState)({ connected: false, error: null }),
    connectionStatus = _b[0],
    setConnectionStatus = _b[1];
  var _c = (0, react_1.useState)([]),
    routeErrors = _c[0],
    setRouteErrors = _c[1];
  var _d = (0, react_1.useState)([]),
    componentErrors = _d[0],
    setComponentErrors = _d[1];
  var _e = (0, react_1.useState)(null),
    diagnosticError = _e[0],
    setDiagnosticError = _e[1];
  // Check database connection
  var checkDatabaseConnection = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsCheckingConnection(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.from("profiles").select("id").limit(1),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              setConnectionStatus({ connected: false, error: error.message });
            } else {
              setConnectionStatus({ connected: true, error: null });
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            setConnectionStatus({
              connected: false,
              error:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown database error",
            });
            return [3 /*break*/, 5];
          case 4:
            setIsCheckingConnection(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Initial checks
  (0, react_1.useEffect)(function () {
    // Check DB connection on mount
    checkDatabaseConnection();
    // Known issues diagnostics
    setComponentErrors([
      {
        component: "DocumentLegalContent",
        error:
          "Component is using useCompliance hook outside of ComplianceProvider",
        status: "error",
      },
      {
        component: "LegalDocument",
        error: "Not properly wrapped with ComplianceProvider",
        status: "error",
      },
    ]);
    setRouteErrors([
      {
        path: "/legal/terms-of-service",
        error: "Compliance context missing",
        status: "error",
      },
      {
        path: "/admin/diagnostics",
        error: "Route may be inaccessible due to other errors",
        status: "warning",
      },
    ]);
  }, []);
  return (0, jsx_runtime_1.jsx)("div", {
    className: "min-h-screen bg-background p-6",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "max-w-5xl mx-auto space-y-6",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-3xl font-bold",
              children: "System Diagnostics",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex space-x-2",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  asChild: true,
                  children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                    to: "/",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Home",
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  asChild: true,
                  children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
                    to: "/admin",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Admin",
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid md:grid-cols-2 gap-6",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: connectionStatus.connected
                ? "border-green-200"
                : "border-red-200",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  children: (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Status of your Supabase database connection",
                  }),
                }),
                " ",
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: connectionStatus.connected
                              ? "outline"
                              : "destructive",
                            className: "mr-2",
                            children: connectionStatus.connected
                              ? "Connected"
                              : "Disconnected",
                          }),
                          connectionStatus.connected
                            ? (0, jsx_runtime_1.jsx)(
                                lucide_react_1.CheckCircle,
                                { className: "h-4 w-4 text-green-500" },
                              )
                            : (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                                className: "h-4 w-4 text-red-500",
                              }),
                        ],
                      }),
                      !connectionStatus.connected &&
                        connectionStatus.error &&
                        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                          variant: "destructive",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              { className: "h-4 w-4" },
                            ),
                            (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                              children: "Connection Error",
                            }),
                            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                              children: connectionStatus.error,
                            }),
                          ],
                        }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    onClick: checkDatabaseConnection,
                    disabled: isCheckingConnection,
                    variant: "outline",
                    className: "w-full",
                    children: isCheckingConnection
                      ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                              className: "mr-2 h-4 w-4 animate-spin",
                            }),
                            "Checking Connection...",
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                              className: "mr-2 h-4 w-4",
                            }),
                            "Check Connection",
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
                    (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                      className: "flex items-center",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                          className: "mr-2 h-5 w-5 text-primary",
                        }),
                        "Application Status",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Overall application health diagnostics",
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
                            className: "text-sm font-medium mb-2",
                            children: "Component Errors",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "space-y-2",
                            children: componentErrors.map(
                              function (error, index) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className: "p-2 rounded text-sm ".concat(
                                      error.status === "error"
                                        ? "bg-red-50 text-red-800"
                                        : error.status === "warning"
                                          ? "bg-amber-50 text-amber-800"
                                          : "bg-green-50 text-green-800",
                                    ),
                                    children: [
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className: "font-medium",
                                        children: error.component,
                                      }),
                                      (0, jsx_runtime_1.jsx)("div", {
                                        children: error.error,
                                      }),
                                    ],
                                  },
                                  index,
                                );
                              },
                            ),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "text-sm font-medium mb-2",
                            children: "Route Issues",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "space-y-2",
                            children: routeErrors.map(function (error, index) {
                              return (0, jsx_runtime_1.jsxs)(
                                "div",
                                {
                                  className: "p-2 rounded text-sm ".concat(
                                    error.status === "error"
                                      ? "bg-red-50 text-red-800"
                                      : error.status === "warning"
                                        ? "bg-amber-50 text-amber-800"
                                        : "bg-green-50 text-green-800",
                                  ),
                                  children: [
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className: "font-medium",
                                      children: error.path,
                                    }),
                                    (0, jsx_runtime_1.jsx)("div", {
                                      children: error.error,
                                    }),
                                  ],
                                },
                                index,
                              );
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
            " ",
          ],
        }),
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.FileWarning, {
                      className: "mr-2 h-5 w-5 text-primary",
                    }),
                    "Recommended Fixes",
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Automated fixes for detected issues",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "p-3 border rounded",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium mb-2",
                        children: "Fix ComplianceProvider Issue",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm text-muted-foreground mb-3",
                        children:
                          "The Legal Document component needs to be properly wrapped with ComplianceProvider. This fix will modify LegalDocument.tsx to ensure proper context is provided.",
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "bg-muted p-2 rounded text-sm font-mono mb-3",
                        children: (0, jsx_runtime_1.jsx)("pre", {
                          children:
                            'import { ComplianceProvider } from "@/context/ComplianceContext";\n\nexport default function LegalDocument() {\n  return (\n    <ComplianceProvider>\n      <DocumentLegalContent />\n    </ComplianceProvider>\n  );\n}',
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        asChild: true,
                        className: "w-full",
                        children: (0, jsx_runtime_1.jsx)(
                          react_router_dom_1.Link,
                          {
                            to: "/admin/diagnostics",
                            children: "Go to Admin Diagnostics",
                          },
                        ),
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                        className: "h-4 w-4",
                      }),
                      (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                        children: "Route Access Issues",
                      }),
                      (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
                        children: [
                          "You may be experiencing issues accessing certain routes due to the compliance context error. Try accessing the ",
                          (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                            to: "/admin",
                            className: "underline",
                            children: "Admin Dashboard",
                          }),
                          " directly.",
                        ],
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
  });
}
