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
exports.default = ExecutiveDebateRunner;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var select_1 = require("@/components/ui/select");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var debateSession_1 = require("@/agents/debate/debateSession");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
function ExecutiveDebateRunner() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    task = _a[0],
    setTask = _a[1];
  var _b = (0, react_1.useState)("medium"),
    riskAppetite = _b[0],
    setRiskAppetite = _b[1];
  var _c = (0, react_1.useState)("growth"),
    businessPriority = _c[0],
    setBusinessPriority = _c[1];
  var _d = (0, react_1.useState)(false),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var _e = (0, react_1.useState)(null),
    debateResult = _e[0],
    setDebateResult = _e[1];
  var runDebate = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!task) {
              sonner_1.toast.error("Please enter a task to debate");
              return [2 /*return*/];
            }
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, debateSession_1.runDebateSession)(
                task,
                riskAppetite,
                businessPriority,
              ),
            ];
          case 2:
            result = _a.sent();
            setDebateResult(result);
            sonner_1.toast.success("Executive debate completed");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error running debate:", error_1);
            sonner_1.toast.error("Failed to run executive debate");
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Executive Debate",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Have your AI executive team debate a strategic decision",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "task",
                    children: "Task or Decision to Debate",
                  }),
                  (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                    id: "task",
                    placeholder: "e.g., Launch a new product line in Q3",
                    value: task,
                    onChange: function (e) {
                      return setTask(e.target.value);
                    },
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "risk-appetite",
                        children: "Risk Appetite",
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                        value: riskAppetite,
                        onValueChange: setRiskAppetite,
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                            id: "risk-appetite",
                            children: (0, jsx_runtime_1.jsx)(
                              select_1.SelectValue,
                              { placeholder: "Select risk appetite" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                            children: [
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "low",
                                children: "Low Risk",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "medium",
                                children: "Medium Risk",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "high",
                                children: "High Risk",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "business-priority",
                        children: "Business Priority",
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                        value: businessPriority,
                        onValueChange: setBusinessPriority,
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                            id: "business-priority",
                            children: (0, jsx_runtime_1.jsx)(
                              select_1.SelectValue,
                              { placeholder: "Select priority" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                            children: [
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "growth",
                                children: "Growth",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "profit",
                                children: "Profit",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "innovation",
                                children: "Innovation",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "stability",
                                children: "Stability",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: runDebate,
              disabled: isLoading || !task,
              className: "w-full",
              children: isLoading
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "mr-2 h-4 w-4 animate-spin",
                      }),
                      "Running Debate...",
                    ],
                  })
                : "Run Executive Debate",
            }),
          }),
        ],
      }),
      debateResult &&
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center justify-between",
                  children: [
                    "Debate Results",
                    debateResult.summary.majority === "For"
                      ? (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center text-green-500",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                              className: "h-5 w-5 mr-1",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Approved",
                            }),
                          ],
                        })
                      : debateResult.summary.majority === "Against"
                        ? (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center text-red-500",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ThumbsDown,
                                { className: "h-5 w-5 mr-1" },
                              ),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: "Rejected",
                              }),
                            ],
                          })
                        : (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center text-yellow-500",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.AlertTriangle,
                                { className: "h-5 w-5 mr-1" },
                              ),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: "Tie",
                              }),
                            ],
                          }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                  children: ["Task: ", debateResult.task],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-6",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex flex-wrap gap-2 justify-center",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg text-center",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: debateResult.summary.totalExecutives,
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm",
                          children: "Executives",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg text-center",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: debateResult.summary.forVotes,
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm",
                          children: "For",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-lg text-center",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: debateResult.summary.againstVotes,
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm",
                          children: "Against",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-lg text-center",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-2xl font-bold",
                          children: "".concat(
                            (
                              debateResult.summary.confidenceScore * 100
                            ).toFixed(),
                            "%",
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-sm",
                          children: "Confidence",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium mb-2",
                          children: "Top Risks",
                        }),
                        (0, jsx_runtime_1.jsx)("ul", {
                          className: "list-disc list-inside space-y-1",
                          children: debateResult.summary.topRisks.map(
                            function (risk, i) {
                              return (0, jsx_runtime_1.jsx)(
                                "li",
                                { className: "text-sm", children: risk },
                                i,
                              );
                            },
                          ),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium mb-2",
                          children: "Top Opportunities",
                        }),
                        (0, jsx_runtime_1.jsx)("ul", {
                          className: "list-disc list-inside space-y-1",
                          children: debateResult.summary.topOpportunities.map(
                            function (opp, i) {
                              return (0, jsx_runtime_1.jsx)(
                                "li",
                                { className: "text-sm", children: opp },
                                i,
                              );
                            },
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "font-medium",
                      children: "Executive Opinions",
                    }),
                    debateResult.debates.map(function (debate, i) {
                      return (0, jsx_runtime_1.jsxs)(
                        "div",
                        {
                          className: "border rounded-lg p-3 bg-muted/20",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "flex justify-between mb-2",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "font-medium",
                                  children: [
                                    debate.executiveName,
                                    " (",
                                    debate.role,
                                    ")",
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "px-2 py-0.5 rounded text-xs font-medium ".concat(
                                      debate.stance === "For"
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                        : debate.stance === "Against"
                                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                                    ),
                                  children: debate.stance,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-sm max-h-20 overflow-y-auto",
                              children: debate.opinion
                                .split("\n")
                                .map(function (line, i) {
                                  return line.trim()
                                    ? (0, jsx_runtime_1.jsx)(
                                        "p",
                                        { className: "mb-1", children: line },
                                        i,
                                      )
                                    : null;
                                }),
                            }),
                          ],
                        },
                        i,
                      );
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
