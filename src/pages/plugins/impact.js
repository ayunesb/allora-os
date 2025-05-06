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
exports.default = PluginImpact;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var table_1 = require("@/components/ui/table");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var usePlugins_1 = require("@/hooks/usePlugins");
var dashboard_breadcrumb_1 = require("@/components/ui/dashboard-breadcrumb");
function PluginImpact() {
  var _a = (0, react_1.useState)([]),
    impactData = _a[0],
    setImpactData = _a[1]; // Fix type
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var fetchPluginImpact = (0, usePlugins_1.usePlugins)().fetchPluginImpact;
  (0, react_1.useEffect)(
    function () {
      function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
          var data, err_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, 3, 4]);
                setLoading(true);
                return [4 /*yield*/, fetchPluginImpact()];
              case 1:
                data = _a.sent();
                setImpactData(data);
                return [3 /*break*/, 4];
              case 2:
                err_1 = _a.sent();
                console.error("Error fetching plugin impact data:", err_1);
                setError(
                  err_1 instanceof Error
                    ? err_1.message
                    : "Failed to load plugin impact data. Please try again later.",
                );
                return [3 /*break*/, 4];
              case 3:
                setLoading(false);
                return [7 /*endfinally*/];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      }
      fetchData();
    },
    [fetchPluginImpact],
  );
  var formatCurrency = function (value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value || 0);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container py-8",
    children: [
      (0, jsx_runtime_1.jsx)(dashboard_breadcrumb_1.DashboardBreadcrumb, {
        rootPath: "/dashboard",
        rootLabel: "Dashboard",
        rootIcon: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {}),
        currentPath: "/plugins/impact",
        currentLabel: "Plugin Impact",
      }),
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold mb-6",
        children: "Plugin ROI Analysis",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-8",
        children:
          "Track the impact and return on investment for all activated plugins across your organization.",
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "mb-8",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Plugin Performance Metrics",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: loading
              ? (0, jsx_runtime_1.jsx)("div", {
                  className: "flex justify-center items-center py-12",
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                    className: "h-8 w-8 animate-spin text-primary",
                  }),
                })
              : error
                ? (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "bg-destructive/10 text-destructive p-4 rounded-md",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children: "Error loading data",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm",
                        children: error,
                      }),
                    ],
                  })
                : impactData.length === 0
                  ? (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-center py-12 text-muted-foreground",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "mb-2 font-medium",
                          children: "No plugin impact data available",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm",
                          children:
                            "Activate plugins and use them to start collecting ROI metrics",
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)("div", {
                      className: "overflow-x-auto",
                      children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
                        children: [
                          (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                            children: (0, jsx_runtime_1.jsxs)(
                              table_1.TableRow,
                              {
                                children: [
                                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                    children: "Plugin",
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                    children: "Tenant",
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                    className: "text-right",
                                    children: "Usage",
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                    className: "text-right",
                                    children: "Total Value",
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                    className: "text-right",
                                    children: "Avg. ROI",
                                  }),
                                  (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                                    children: "Status",
                                  }),
                                ],
                              },
                            ),
                          }),
                          (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                            children: impactData.map(function (item, idx) {
                              return (0, jsx_runtime_1.jsxs)(
                                table_1.TableRow,
                                {
                                  children: [
                                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                      className: "font-medium",
                                      children: item.plugin_name,
                                    }),
                                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                      children:
                                        item.tenant_name ||
                                        "Tenant ".concat(
                                          item.tenant_id.substring(0, 6),
                                          "...",
                                        ),
                                    }),
                                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                      className: "text-right",
                                      children: item.usage_count,
                                    }),
                                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                      className: "text-right",
                                      children: formatCurrency(
                                        item.total_value,
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                      className: "text-right",
                                      children: formatCurrency(
                                        item.average_value,
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                      children: (0, jsx_runtime_1.jsx)(
                                        badge_1.Badge,
                                        {
                                          variant:
                                            item.average_value > 10
                                              ? "success"
                                              : item.average_value > 0
                                                ? "outline"
                                                : "secondary",
                                          className: "badge-class", // Add missing className
                                          children:
                                            item.average_value > 10
                                              ? "High ROI"
                                              : item.average_value > 0
                                                ? "Positive"
                                                : "Neutral",
                                        },
                                      ),
                                    }),
                                  ],
                                },
                                ""
                                  .concat(item.tenant_id, "-")
                                  .concat(item.plugin_name, "-")
                                  .concat(idx),
                              );
                            }),
                          }),
                        ],
                      }),
                    }),
          }),
        ],
      }),
    ],
  });
}
