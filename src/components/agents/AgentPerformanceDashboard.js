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
var textarea_1 = require("@/components/ui/textarea"); // Assuming Textarea component exists
var button_1 = require("@/components/ui/button"); // Assuming Button component exists
var sonner_1 = require("sonner");
var navigation_1 = require("next/navigation");
var AgentPerformanceDashboard = function (_a) {
  var pluginFilter = _a.pluginFilter;
  var _b = (0, react_1.useState)([]),
    pluginXpData = _b[0],
    setPluginXpData = _b[1];
  var _c = (0, react_1.useState)([]),
    usageStreaks = _c[0],
    setUsageStreaks = _c[1];
  var _d = (0, react_1.useState)(""),
    changelog = _d[0],
    setChangelog = _d[1]; // Added changelog state
  var _e = (0, react_1.useState)({}),
    groupedLogs = _e[0],
    setGroupedLogs = _e[1];
  var _f = (0, react_1.useState)({}),
    agentXpLogs = _f[0],
    setAgentXpLogs = _f[1];
  var router = (0, navigation_1.useRouter)();
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
                      pluginFilter ? "eq" : "is",
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
                Object.values(totals).forEach(function (total_xp, index) {
                  return __awaiter(void 0, void 0, void 0, function () {
                    var pluginName, last, newVersion;
                    var _a;
                    return __generator(this, function (_b) {
                      switch (_b.label) {
                        case 0:
                          if (!(total_xp >= 100)) return [3 /*break*/, 4];
                          (0, canvas_confetti_1.default)({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                          });
                          pluginName = Object.keys(totals)[index];
                          return [
                            4 /*yield*/,
                            supabase
                              .from("agent_versions")
                              .select("version")
                              .eq("agent_type", "plugin_assistant")
                              .order("created_at", { descending: true })
                              .limit(1)
                              .single(),
                          ];
                        case 1:
                          last = _b.sent().data;
                          newVersion =
                            "v" +
                            (parseInt(
                              ((_a =
                                last === null || last === void 0
                                  ? void 0
                                  : last.version) === null || _a === void 0
                                ? void 0
                                : _a.replace("v", "")) || "1",
                            ) + 1 || 2);
                          // Insert new version
                          return [
                            4 /*yield*/,
                            supabase.from("agent_versions").insert({
                              agent_type: "plugin_assistant",
                              version: newVersion,
                              prompt:
                                "Auto-evolution triggered by XP threshold",
                              changelog:
                                "Auto-evolution triggered by plugin: ".concat(
                                  pluginName,
                                ),
                            }),
                          ];
                        case 2:
                          // Insert new version
                          _b.sent();
                          // Log evolution
                          return [
                            4 /*yield*/,
                            supabase.from("agent_evolution_logs").insert({
                              agent_type: "plugin_assistant",
                              from_version: last.version,
                              to_version: newVersion,
                              triggered_by: "xp_threshold",
                              triggered_by_plugin: pluginName,
                            }),
                          ];
                        case 3:
                          // Log evolution
                          _b.sent();
                          _b.label = 4;
                        case 4:
                          return [2 /*return*/];
                      }
                    });
                  });
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
                      pluginFilter ? "eq" : "is",
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
      var fetchLogs = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var logs, grouped;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  supabase
                    .from("agent_evolution_logs")
                    .select("*")
                    .eq("agent_type", "plugin_assistant")
                    .order("created_at", { descending: true }),
                ];
              case 1:
                logs = _a.sent().data;
                grouped =
                  (logs === null || logs === void 0
                    ? void 0
                    : logs.reduce(function (acc, log) {
                        var key = log.triggered_by || "unknown";
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(log);
                        return acc;
                      }, {})) || {};
                setGroupedLogs(grouped);
                return [2 /*return*/];
            }
          });
        });
      };
      var fetchAgentXP = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var data, totals;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [
                  4 /*yield*/,
                  supabase.from("agent_logs").select("agent_type, xp"),
                ];
              case 1:
                data = _a.sent().data;
                totals = {};
                data === null || data === void 0
                  ? void 0
                  : data.forEach(function (log) {
                      totals[log.agent_type] =
                        (totals[log.agent_type] || 0) + (log.xp || 0);
                    });
                setAgentXpLogs(totals);
                return [2 /*return*/];
            }
          });
        });
      };
      fetchPluginXP();
      fetchUsageStreaks();
      fetchLogs();
      fetchAgentXP();
    },
    [pluginFilter],
  );
  var handleRollback = function (pluginName, rollbackVersion) {
    return __awaiter(void 0, void 0, void 0, function () {
      var response_1, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              fetch("/api/rollback-agent", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  pluginName: pluginName,
                  rollbackVersion: rollbackVersion,
                }),
              }),
            ];
          case 1:
            response_1 = _a.sent();
            if (!response_1.ok) {
              throw new Error("Failed to rollback plugin version");
            }
            alert("Rollback successful!");
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error(error_1);
            alert("An error occurred during rollback.");
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
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
                      (0, jsx_runtime_1.jsxs)("div", {
                        children: [
                          (0, jsx_runtime_1.jsx)(alert_1.Alert, {
                            variant: "success",
                            className: "mt-4",
                            children:
                              "\uD83E\uDDEC Plugin Assistant ready to evolve! Next version unlocked.",
                          }),
                          (0, jsx_runtime_1.jsx)("button", {
                            onClick: function () {
                              return handleRollback(
                                plugin.plugin_name,
                                "previous_version",
                              );
                            },
                            className:
                              "mt-2 bg-red-500 text-white px-3 py-1 rounded",
                            children: "Rollback",
                          }),
                        ],
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
        className: "mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("label", {
            className: "block text-sm font-medium mb-1",
            children: "Changelog Notes",
          }),
          (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
            value: changelog,
            onChange: function (e) {
              return setChangelog(e.target.value);
            },
            rows: 3,
            placeholder: "Describe what changed in this version...",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-4",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "default",
          onClick: function () {
            return __awaiter(void 0, void 0, void 0, function () {
              var last, newVersion;
              var _a;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      supabase
                        .from("agent_versions")
                        .select("version")
                        .eq("agent_type", "plugin_assistant")
                        .order("created_at", { descending: true })
                        .limit(1)
                        .single(),
                    ];
                  case 1:
                    last = _b.sent().data;
                    newVersion =
                      "v" +
                      (parseInt(
                        ((_a =
                          last === null || last === void 0
                            ? void 0
                            : last.version) === null || _a === void 0
                          ? void 0
                          : _a.replace("v", "")) || "1",
                      ) + 1 || 2);
                    // Insert new version
                    return [
                      4 /*yield*/,
                      supabase.from("agent_versions").insert({
                        agent_type: "plugin_assistant",
                        version: newVersion,
                        prompt: prompt,
                        changelog:
                          changelog ||
                          "Manual version bump from ".concat(last.version),
                      }),
                    ];
                  case 2:
                    // Insert new version
                    _b.sent();
                    // Log evolution
                    return [
                      4 /*yield*/,
                      supabase.from("agent_evolution_logs").insert({
                        agent_type: "plugin_assistant",
                        from_version: last.version,
                        to_version: newVersion,
                        triggered_by: "manual",
                      }),
                    ];
                  case 3:
                    // Log evolution
                    _b.sent();
                    sonner_1.toast.success(
                      "New version ".concat(newVersion, " created"),
                    );
                    setTimeout(function () {
                      router.push("/admin/ai-decisions");
                    }, 1200);
                    return [2 /*return*/];
                }
              });
            });
          },
          children: "\uD83D\uDE80 Bump Version",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-6",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-lg font-semibold mb-2",
            children: "\uD83D\uDD01 Evolution History",
          }),
          Object.entries(groupedLogs).map(function (_a) {
            var trigger = _a[0],
              logs = _a[1];
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className: "mb-6",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-md font-bold capitalize mb-2",
                    children: trigger.replace(/_/g, " "),
                  }),
                  (0, jsx_runtime_1.jsx)("ul", {
                    className: "space-y-2",
                    children: logs.map(function (log) {
                      return (0, jsx_runtime_1.jsxs)(
                        "li",
                        {
                          className: "border rounded p-3 text-sm bg-muted",
                          children: [
                            log.from_version,
                            " \u2192 ",
                            log.to_version,
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-xs text-muted-foreground mt-1",
                              children: new Date(
                                log.created_at,
                              ).toLocaleString(),
                            }),
                          ],
                        },
                        log.id,
                      );
                    }),
                  }),
                ],
              },
              trigger,
            );
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("ul", {
        className: "grid grid-cols-2 gap-4 mt-6",
        children: Object.entries(agentXpLogs).map(function (_a) {
          var type = _a[0],
            xp = _a[1];
          return (0, jsx_runtime_1.jsxs)(
            "li",
            {
              className: "bg-muted p-4 rounded",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "font-bold",
                  children: type.replace("_", " ").toUpperCase(),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "text-sm text-muted-foreground",
                  children: [xp, " XP total"],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "w-full h-2 bg-border rounded mt-2 overflow-hidden",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-full bg-indigo-500",
                    style: {
                      width: "".concat(Math.min(xp / 100, 1) * 100, "%"),
                    },
                  }),
                }),
              ],
            },
            type,
          );
        }),
      }),
    ],
  });
};
exports.AgentPerformanceDashboard = AgentPerformanceDashboard;
