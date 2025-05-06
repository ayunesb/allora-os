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
exports.default = PluginLogsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var responsive_table_1 = require("@/components/ui/responsive-table");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
var AdminOnly_1 = require("@/components/AdminOnly");
var client_1 = require("@/integrations/supabase/client");
var loading_1 = require("@/components/ui/loading");
function PluginLogsPage() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    logs = _a[0],
    setLogs = _a[1];
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(0),
    totalValue = _c[0],
    setTotalValue = _c[1];
  var loadLogs = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, typedLogs, total, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setLoading(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("plugin_logs")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(100),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            typedLogs = data;
            setLogs(typedLogs);
            total = typedLogs.reduce(function (sum, log) {
              return sum + (log.value || 0);
            }, 0);
            setTotalValue(total);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            console.error("Error loading plugin logs:", error_1);
            sonner_1.toast.error("Failed to load plugin logs");
            return [3 /*break*/, 5];
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  (0, react_1.useEffect)(function () {
    loadLogs();
  }, []);
  // Define the columns for the responsive table
  var columns = [
    { key: "plugin_name", title: "Plugin" },
    { key: "tenant_id", title: "Tenant", hideOnMobile: true },
    { key: "event", title: "Event" },
    {
      key: "value",
      title: "Value",
      render: function (log) {
        return "$".concat(log.value.toFixed(2));
      },
    },
    {
      key: "created_at",
      title: "Date",
      render: function (log) {
        return new Date(log.created_at).toLocaleString();
      },
    },
  ];
  // Mobile-optimized columns
  var mobileColumns = [
    { key: "plugin_name", title: "Plugin" },
    { key: "event", title: "Event" },
    {
      key: "value",
      title: "Value",
      render: function (log) {
        return "$".concat(log.value.toFixed(2));
      },
    },
  ];
  return (0, jsx_runtime_1.jsx)(AdminOnly_1.default, {
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "p-6 max-w-5xl mx-auto",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className:
            "flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-2xl font-bold",
                  children: "\uD83E\uDDE9 Plugin Usage Logs",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children:
                    "Track plugin performance and tenant-level ROI activity.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: loadLogs,
              disabled: loading,
              children: loading ? "Loading..." : "Refresh",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-sm font-medium",
                    children: "Total Revenue Impact",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-2xl font-bold",
                    children: ["$", totalValue.toFixed(2)],
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-sm font-medium",
                    children: "Log Entries",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: logs.length,
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-sm font-medium",
                    children: "Unique Plugins",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: new Set(
                      logs.map(function (log) {
                        return log.plugin_name;
                      }),
                    ).size,
                  }),
                }),
              ],
            }),
          ],
        }),
        loading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "flex justify-center p-8",
              children: (0, jsx_runtime_1.jsx)(loading_1.Loading, {
                size: "lg",
                text: "Loading plugin logs...",
              }),
            })
          : (0, jsx_runtime_1.jsx)(card_1.Card, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                className: "p-4",
                children: (0, jsx_runtime_1.jsx)(
                  responsive_table_1.ResponsiveTable,
                  {
                    data: logs,
                    columns: columns,
                    mobileColumns: mobileColumns,
                    emptyState: (0, jsx_runtime_1.jsx)("div", {
                      className: "text-center py-8",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-muted-foreground",
                        children: "No plugin logs found",
                      }),
                    }),
                  },
                ),
              }),
            }),
      ],
    }),
  });
}
