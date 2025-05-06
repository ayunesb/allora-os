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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExecutiveLeaderboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var page_title_1 = require("@/components/ui/page-title");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var SomeComponent = function (_a) {
  var children = _a.children;
  return (0, jsx_runtime_1.jsx)("div", { children: children });
};
function ExecutiveLeaderboard() {
  var _a = (0, react_1.useState)([]),
    leaderboard = _a[0],
    setLeaderboard = _a[1];
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  (0, react_1.useEffect)(function () {
    function fetchLeaderboardData() {
      return __awaiter(this, void 0, void 0, function () {
        var _a, data, error_1, executiveMap_1, leaderboardData, err_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 2, 3, 4]);
              setLoading(true);
              return [
                4 /*yield*/,
                client_1.supabase
                  .from("executive_decisions")
                  .select(
                    "executive_name, executive_role, priority, risk_assessment",
                  ),
              ];
            case 1:
              (_a = _b.sent()), (data = _a.data), (error_1 = _a.error);
              if (error_1) {
                throw error_1;
              }
              executiveMap_1 = new Map();
              data.forEach(function (decision) {
                var name = decision.executive_name;
                var riskValue = decision.risk_assessment
                  ? parseFloat(decision.risk_assessment)
                  : 0;
                // Calculate priority score: High = 3, Medium = 2, Low = 1
                var priorityValue = 0;
                if (decision.priority === "high") priorityValue = 3;
                else if (decision.priority === "medium") priorityValue = 2;
                else if (decision.priority === "low") priorityValue = 1;
                if (!executiveMap_1.has(name)) {
                  executiveMap_1.set(name, {
                    name: name,
                    role: decision.executive_role,
                    decisions: 1,
                    totalRisk: riskValue,
                    priorityTotal: priorityValue,
                  });
                } else {
                  var entry = executiveMap_1.get(name);
                  entry.decisions += 1;
                  entry.totalRisk += riskValue;
                  entry.priorityTotal += priorityValue;
                }
              });
              leaderboardData = Array.from(executiveMap_1.entries()).map(
                function (_a) {
                  var _ = _a[0],
                    value = _a[1];
                  return {
                    executiveName: value.name,
                    executiveRole: value.role,
                    decisionCount: value.decisions,
                    averageRisk:
                      value.decisions > 0
                        ? value.totalRisk / value.decisions
                        : 0,
                    priorityScore:
                      value.decisions > 0
                        ? value.priorityTotal / value.decisions
                        : 0,
                  };
                },
              );
              setLeaderboard(leaderboardData);
              setError(null);
              return [3 /*break*/, 4];
            case 2:
              err_1 = _b.sent();
              console.error("Failed to load leaderboard data:", err_1);
              setError(
                "Could not load leaderboard data. Please try again later.",
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
    fetchLeaderboardData();
  }, []);
  // Render a medal based on position
  var getMedal = function (position) {
    switch (position) {
      case 0:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Medal, {
          className: "h-5 w-5 text-yellow-500",
        });
      case 1:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Medal, {
          className: "h-5 w-5 text-gray-400",
        });
      case 2:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Medal, {
          className: "h-5 w-5 text-amber-700",
        });
      default:
        return null;
    }
  };
  // Function to get color based on risk score
  var getRiskColor = function (score) {
    if (score >= 4) return "text-red-500";
    if (score >= 3) return "text-orange-500";
    if (score >= 2) return "text-yellow-500";
    return "text-green-500";
  };
  // Function to get color based on priority score
  var getPriorityColor = function (score) {
    if (score >= 2.5) return "text-purple-500";
    if (score >= 1.5) return "text-blue-500";
    return "text-gray-500";
  };
  if (loading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "container mx-auto py-6",
      children: [
        (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
          title: "Executive Leaderboard",
          description:
            "Top performing AI executives by decisions, risk, and priorities",
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "flex justify-center items-center h-64",
          children: (0, jsx_runtime_1.jsx)("div", {
            className:
              "animate-spin rounded-full h-12 w-12 border-b-2 border-primary",
          }),
        }),
      ],
    });
  }
  if (error) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "container mx-auto py-6",
      children: [
        (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
          title: "Executive Leaderboard",
          description:
            "Top performing AI executives by decisions, risk, and priorities",
        }),
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          className: "p-6 bg-red-50 border border-red-200 text-red-800",
          children: (0, jsx_runtime_1.jsx)("p", { children: error }),
        }),
      ],
    });
  }
  // Sort leaderboards by different metrics
  var byDecisions = __spreadArray([], leaderboard, true).sort(function (a, b) {
    return b.decisionCount - a.decisionCount;
  });
  var byRisk = __spreadArray([], leaderboard, true).sort(function (a, b) {
    return b.averageRisk - a.averageRisk;
  });
  var byPriority = __spreadArray([], leaderboard, true).sort(function (a, b) {
    return b.priorityScore - a.priorityScore;
  });
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto p-4",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Executive Leaderboard",
        description: "Performance metrics for your AI executive team",
        children: "Executive Leaderboard",
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "decisions",
        className: "w-full mb-8",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "mb-6",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "decisions",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                    className: "mr-2 h-4 w-4",
                  }),
                  " Most Decisions",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "risk",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldAlert, {
                    className: "mr-2 h-4 w-4",
                  }),
                  " Risk Takers",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "priority",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                    className: "mr-2 h-4 w-4",
                  }),
                  " Priority Focused",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "decisions",
            children: (0, jsx_runtime_1.jsx)(card_1.Card, {
              className: "p-0 overflow-hidden",
              children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                    children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Rank",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Executive",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Decisions Made",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Avg. Risk Score",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Avg. Priority",
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                    children: byDecisions.map(function (entry, index) {
                      return (0, jsx_runtime_1.jsxs)(
                        table_1.TableRow,
                        {
                          className: index < 3 ? "bg-muted/20" : "",
                          children: [
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "font-medium",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  getMedal(index),
                                  (0, jsx_runtime_1.jsxs)("span", {
                                    className: "ml-2",
                                    children: ["#", index + 1],
                                  }),
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  react_router_dom_1.Link,
                                  {
                                    to: "/dashboard/executives/".concat(
                                      encodeURIComponent(entry.executiveName),
                                    ),
                                    className:
                                      "hover:underline hover:text-primary font-medium",
                                    children: entry.executiveName,
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-xs text-muted-foreground",
                                  children: entry.executiveRole,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right font-bold",
                              children: entry.decisionCount,
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right ".concat(
                                getRiskColor(entry.averageRisk),
                              ),
                              children: entry.averageRisk.toFixed(1),
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right ".concat(
                                getPriorityColor(entry.priorityScore),
                              ),
                              children: entry.priorityScore.toFixed(1),
                            }),
                          ],
                        },
                        entry.executiveName,
                      );
                    }),
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "risk",
            children: (0, jsx_runtime_1.jsx)(card_1.Card, {
              className: "p-0 overflow-hidden",
              children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                    children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Rank",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Executive",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Avg. Risk Score",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Decisions Made",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Avg. Priority",
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                    children: byRisk.map(function (entry, index) {
                      return (0, jsx_runtime_1.jsxs)(
                        table_1.TableRow,
                        {
                          className: index < 3 ? "bg-muted/20" : "",
                          children: [
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "font-medium",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  getMedal(index),
                                  (0, jsx_runtime_1.jsxs)("span", {
                                    className: "ml-2",
                                    children: ["#", index + 1],
                                  }),
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  react_router_dom_1.Link,
                                  {
                                    to: "/dashboard/executives/".concat(
                                      encodeURIComponent(entry.executiveName),
                                    ),
                                    className:
                                      "hover:underline hover:text-primary font-medium",
                                    children: entry.executiveName,
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-xs text-muted-foreground",
                                  children: entry.executiveRole,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right font-bold ".concat(
                                getRiskColor(entry.averageRisk),
                              ),
                              children: entry.averageRisk.toFixed(1),
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right",
                              children: entry.decisionCount,
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right ".concat(
                                getPriorityColor(entry.priorityScore),
                              ),
                              children: entry.priorityScore.toFixed(1),
                            }),
                          ],
                        },
                        entry.executiveName,
                      );
                    }),
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "priority",
            children: (0, jsx_runtime_1.jsx)(card_1.Card, {
              className: "p-0 overflow-hidden",
              children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                    children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Rank",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Executive",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Avg. Priority",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Decisions Made",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Avg. Risk Score",
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                    children: byPriority.map(function (entry, index) {
                      return (0, jsx_runtime_1.jsxs)(
                        table_1.TableRow,
                        {
                          className: index < 3 ? "bg-muted/20" : "",
                          children: [
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "font-medium",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  getMedal(index),
                                  (0, jsx_runtime_1.jsxs)("span", {
                                    className: "ml-2",
                                    children: ["#", index + 1],
                                  }),
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  react_router_dom_1.Link,
                                  {
                                    to: "/dashboard/executives/".concat(
                                      encodeURIComponent(entry.executiveName),
                                    ),
                                    className:
                                      "hover:underline hover:text-primary font-medium",
                                    children: entry.executiveName,
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "text-xs text-muted-foreground",
                                  children: entry.executiveRole,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right font-bold ".concat(
                                getPriorityColor(entry.priorityScore),
                              ),
                              children: entry.priorityScore.toFixed(1),
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right",
                              children: entry.decisionCount,
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right ".concat(
                                getRiskColor(entry.averageRisk),
                              ),
                              children: entry.averageRisk.toFixed(1),
                            }),
                          ],
                        },
                        entry.executiveName,
                      );
                    }),
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "p-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2 mb-4",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Award, {
                className: "h-5 w-5 text-primary",
              }),
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-xl font-semibold",
                children: "Executive Leadership Stats",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mb-4",
            children:
              "View performance metrics for your AI executive team. The leadership board ranks executives based on decision volume, risk tolerance, and priority levels.",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-muted/30 p-4 rounded-lg",
                children: [
                  (0, jsx_runtime_1.jsxs)("h3", {
                    className: "font-medium flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                        className: "h-4 w-4 mr-2 text-blue-500",
                      }),
                      " Decision Score",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children:
                      "Total number of decisions made by each executive",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-muted/30 p-4 rounded-lg",
                children: [
                  (0, jsx_runtime_1.jsxs)("h3", {
                    className: "font-medium flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldAlert, {
                        className: "h-4 w-4 mr-2 text-orange-500",
                      }),
                      " Risk Score",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children:
                      "Average risk level of decisions (higher = more risky)",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-muted/30 p-4 rounded-lg",
                children: [
                  (0, jsx_runtime_1.jsxs)("h3", {
                    className: "font-medium flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                        className: "h-4 w-4 mr-2 text-purple-500",
                      }),
                      " Priority Score",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children:
                      "Average priority level (High = 3, Medium = 2, Low = 1)",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
