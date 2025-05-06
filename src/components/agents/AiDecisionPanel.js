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
exports.AgentPerformanceDashboard = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var recharts_1 = require("recharts");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var canvas_confetti_1 = require("canvas-confetti"); // Added for confetti effect
var alert_1 = require("@/components/ui/alert"); // Assuming Alert component exists
var AgentPerformanceDashboard = function (_a) {
  var pluginFilter = _a.pluginFilter;
  var _b = (0, react_1.useState)([]),
    pluginXpData = _b[0],
    setPluginXpData = _b[1];
  var _c = (0, react_1.useState)([]),
    usageStreaks = _c[0],
    setUsageStreaks = _c[1];
  (0, react_1.useEffect)(
    function () {
      var supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
      var fetchPluginXP = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var data, totals;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  supabase
                    .from("plugin_logs")
                    .select("plugin_name, value")
                    .eq("event", "chat_response")
                    .filter(
                      "plugin_name",
                      pluginFilter ? "eq" : "not.is",
                      pluginFilter || null,
                    ),
                ];
              case 1:
                data = _a.sent().data;
                totals = {};
                (data || []).forEach(function (entry) {
                  if (!totals[entry.plugin_name]) totals[entry.plugin_name] = 0;
                  totals[entry.plugin_name] += entry.value || 0;
                });
                // Trigger confetti if any plugin evolves
                Object.values(totals).forEach(function (total_xp) {
                  if (total_xp >= 100) {
                    (0, canvas_confetti_1.default)({
                      particleCount: 100,
                      spread: 70,
                      origin: { y: 0.6 },
                    });
                  }
                });
                setPluginXpData(
                  Object.entries(totals).map(function (_a) {
                    var plugin_name = _a[0],
                      total_xp = _a[1];
                    return {
                      plugin_name: plugin_name,
                      total_xp: total_xp,
                    };
                  }),
                );
                return [2 /*return*/];
            }
          });
        });
      };
      var fetchUsageStreaks = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var data, calculateStreaks;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  supabase
                    .from("plugin_logs")
                    .select("plugin_name, created_at")
                    .eq("event", "chat_response")
                    .filter(
                      "plugin_name",
                      pluginFilter ? "eq" : "not.is",
                      pluginFilter || null,
                    ),
                ];
              case 1:
                data = _a.sent().data;
                calculateStreaks = function (logs) {
                  var streaks = {};
                  logs.forEach(function (log) {
                    var date = new Date(log.created_at)
                      .toISOString()
                      .slice(0, 10);
                    if (!streaks[log.plugin_name])
                      streaks[log.plugin_name] = new Set();
                    streaks[log.plugin_name].add(date);
                  });
                  return Object.entries(streaks).map(function (_a) {
                    var plugin_name = _a[0],
                      dateSet = _a[1];
                    return {
                      plugin_name: plugin_name,
                      days_used: dateSet.size,
                    };
                  });
                };
                setUsageStreaks(calculateStreaks(data || []));
                return [2 /*return*/];
            }
          });
        });
      };
      fetchPluginXP();
      fetchUsageStreaks();
    },
    [pluginFilter],
  );
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "text-lg font-semibold mb-2",
        children: "Plugin XP Chart",
      }),
      (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
        width: "100%",
        height: 250,
        children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
          data: pluginXpData,
          children: [
            (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
              dataKey: "plugin_name",
            }),
            (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
            (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
            (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
              dataKey: "total_xp",
              fill: "#10b981",
              radius: [4, 4, 0, 0],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-lg font-semibold mb-2",
            children: "Plugin Usage Streaks",
          }),
          (0, jsx_runtime_1.jsx)("ul", {
            className: "grid grid-cols-2 gap-3",
            children: usageStreaks.map(function (item) {
              return (0, jsx_runtime_1.jsxs)(
                "li",
                {
                  className: "bg-muted rounded p-3",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "font-bold",
                      children: item.plugin_name,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-sm text-muted-foreground",
                      children: [item.days_used, " active days"],
                    }),
                  ],
                },
                item.plugin_name,
              );
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-lg font-semibold mb-2",
            children: "Evolution Thresholds",
          }),
          (0, jsx_runtime_1.jsx)("ul", {
            className: "space-y-3",
            children: pluginXpData.map(function (plugin) {
              return (0, jsx_runtime_1.jsxs)(
                "li",
                {
                  className: "border rounded-lg p-3 bg-muted",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "font-bold",
                      children: plugin.plugin_name,
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "w-full h-2 bg-muted rounded-full overflow-hidden mt-1",
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "h-full bg-indigo-500 transition-all duration-500",
                        style: {
                          width: "".concat(
                            Math.min((plugin.total_xp / 100) * 100, 100),
                            "%",
                          ),
                        },
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)("p", {
                      className: "text-xs text-muted-foreground mt-1",
                      children: [plugin.total_xp, " / 100 XP to evolve"],
                    }),
                    plugin.total_xp >= 100 &&
                      (0, jsx_runtime_1.jsx)(alert_1.Alert, {
                        variant: "success",
                        className: "mt-4",
                        children:
                          "\uD83E\uDDEC Plugin Assistant ready to evolve! Next version unlocked.",
                      }),
                  ],
                },
                plugin.plugin_name,
              );
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-4 flex gap-3",
        children: [
          (0, jsx_runtime_1.jsx)("button", {
            onClick: function () {
              return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!current || !prev) return [2 /*return*/];
                      return [
                        4 /*yield*/,
                        supabase
                          .from("agent_versions")
                          .update({
                            prompt: prev.prompt,
                            changelog: "Rolled back from "
                              .concat(current.version, " to ")
                              .concat(prev.version),
                          })
                          .eq("id", current.id),
                      ];
                    case 1:
                      _a.sent();
                      window.location.reload(); // or toast and refresh state
                      return [2 /*return*/];
                  }
                });
              });
            },
            className:
              "px-4 py-2 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600",
            children: "\uD83D\uDD01 Roll Back",
          }),
          (0, jsx_runtime_1.jsx)("a", {
            href: "/PromptTuner.tsx?id=".concat(
              current === null || current === void 0 ? void 0 : current.id,
            ),
            className:
              "px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700",
            children: "\uD83C\uDF9B\uFE0F Remix in Prompt Tuner",
          }),
        ],
      }),
    ],
  });
};
exports.AgentPerformanceDashboard = AgentPerformanceDashboard;
