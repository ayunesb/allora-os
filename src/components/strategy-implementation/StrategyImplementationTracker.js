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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var table_1 = require("@/components/ui/table");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var implementationUtils_1 = require("@/utils/strategyImplementation/implementationUtils");
var MilestoneDialog_1 = require("./MilestoneDialog");
var StrategyImplementationTracker = function (_a) {
  var strategyId = _a.strategyId,
    strategyTitle = _a.strategyTitle;
  var _b = (0, react_1.useState)([]),
    milestones = _b[0],
    setMilestones = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)(0),
    totalProgress = _d[0],
    setTotalProgress = _d[1];
  var _e = (0, react_1.useState)(false),
    isDialogOpen = _e[0],
    setIsDialogOpen = _e[1];
  var _f = (0, react_1.useState)(null),
    currentMilestone = _f[0],
    setCurrentMilestone = _f[1];
  (0, react_1.useEffect)(
    function () {
      var loadMilestones = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var data;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                setIsLoading(true);
                return [
                  4 /*yield*/,
                  (0, implementationUtils_1.fetchStrategyMilestones)(
                    strategyId,
                  ),
                ];
              case 1:
                data = _a.sent();
                setMilestones(data);
                setTotalProgress(
                  (0, implementationUtils_1.calculateStrategyProgress)(data),
                );
                setIsLoading(false);
                return [2 /*return*/];
            }
          });
        });
      };
      loadMilestones();
    },
    [strategyId],
  );
  var handleAddMilestone = function () {
    setCurrentMilestone(null);
    setIsDialogOpen(true);
  };
  var handleEditMilestone = function (milestone) {
    setCurrentMilestone(milestone);
    setIsDialogOpen(true);
  };
  var handleMilestoneSaved = function (savedMilestone) {
    // Update the milestone list and recalculate progress
    var updated = currentMilestone
      ? milestones.map(function (m) {
          return m.id === savedMilestone.id ? savedMilestone : m;
        })
      : __spreadArray(
          __spreadArray([], milestones, true),
          [savedMilestone],
          false,
        );
    setMilestones(updated);
    setTotalProgress(
      (0, implementationUtils_1.calculateStrategyProgress)(updated),
    );
    setIsDialogOpen(false);
  };
  var handleMilestoneDeleted = function (milestoneId) {
    var updated = milestones.filter(function (m) {
      return m.id !== milestoneId;
    });
    setMilestones(updated);
    setTotalProgress(
      (0, implementationUtils_1.calculateStrategyProgress)(updated),
    );
  };
  var getStatusLabel = function (status) {
    switch (status) {
      case "not_started":
        return "Not Started";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "delayed":
        return "Delayed";
      default:
        return status;
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Implementation Tracker",
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                onClick: handleAddMilestone,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "Add Milestone",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "mt-2 space-y-1",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between text-sm",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    children: "Overall Progress",
                  }),
                  (0, jsx_runtime_1.jsxs)("span", {
                    children: [totalProgress, "%"],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                value: totalProgress,
                className: "h-2",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "py-6 text-center text-muted-foreground",
              children: "Loading milestones...",
            })
          : milestones.length === 0
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "py-12 text-center text-muted-foreground",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "mb-4",
                    children: "No milestones have been added yet.",
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    onClick: handleAddMilestone,
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Create your first milestone",
                    ],
                  }),
                ],
              })
            : (0, jsx_runtime_1.jsxs)(table_1.Table, {
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                    children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Milestone",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Status",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Due Date",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          children: "Progress",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                          className: "text-right",
                          children: "Actions",
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                    children: milestones.map(function (milestone) {
                      return (0, jsx_runtime_1.jsxs)(
                        table_1.TableRow,
                        {
                          children: [
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "font-medium",
                              children: milestone.title,
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              children: (0, jsx_runtime_1.jsx)("span", {
                                className:
                                  "px-2 py-1 rounded-full text-xs font-medium ".concat(
                                    (0, implementationUtils_1.getStatusColor)(
                                      milestone.status,
                                    ),
                                  ),
                                children: getStatusLabel(milestone.status),
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Calendar,
                                    {
                                      className:
                                        "h-3 w-3 mr-1 text-muted-foreground",
                                    },
                                  ),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "text-sm",
                                    children: (0,
                                    date_fns_1.formatDistanceToNow)(
                                      new Date(milestone.dueDate),
                                      { addSuffix: true },
                                    ),
                                  }),
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-y-1",
                                children: [
                                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                                    value: milestone.progress,
                                    className: "h-2",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: [milestone.progress, "%"],
                                  }),
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                              className: "text-right",
                              children: (0, jsx_runtime_1.jsxs)(
                                button_1.Button,
                                {
                                  variant: "ghost",
                                  size: "icon",
                                  onClick: function () {
                                    return handleEditMilestone(milestone);
                                  },
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Edit2,
                                      { className: "h-4 w-4" },
                                    ),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "sr-only",
                                      children: "Edit",
                                    }),
                                  ],
                                },
                              ),
                            }),
                          ],
                        },
                        milestone.id,
                      );
                    }),
                  }),
                ],
              }),
      }),
      isDialogOpen &&
        (0, jsx_runtime_1.jsx)(MilestoneDialog_1.default, {
          isOpen: isDialogOpen,
          onClose: function () {
            return setIsDialogOpen(false);
          },
          strategyId: strategyId,
          milestone: currentMilestone,
          onSave: handleMilestoneSaved,
          onDelete: handleMilestoneDeleted,
        }),
    ],
  });
};
exports.default = StrategyImplementationTracker;
