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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var slider_1 = require("@/components/ui/slider");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
var implementationUtils_1 = require("@/utils/strategyImplementation/implementationUtils");
var MilestoneDialog = function (_a) {
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    strategyId = _a.strategyId,
    milestone = _a.milestone,
    onSave = _a.onSave,
    onDelete = _a.onDelete;
  var _b = (0, react_1.useState)(""),
    title = _b[0],
    setTitle = _b[1];
  var _c = (0, react_1.useState)(""),
    description = _c[0],
    setDescription = _c[1];
  var _d = (0, react_1.useState)("not_started"),
    status = _d[0],
    setStatus = _d[1];
  var _e = (0, react_1.useState)(new Date()),
    dueDate = _e[0],
    setDueDate = _e[1];
  var _f = (0, react_1.useState)(0),
    progress = _f[0],
    setProgress = _f[1];
  var _g = (0, react_1.useState)(""),
    owner = _g[0],
    setOwner = _g[1];
  var _h = (0, react_1.useState)(""),
    notes = _h[0],
    setNotes = _h[1];
  var _j = (0, react_1.useState)(false),
    isSubmitting = _j[0],
    setIsSubmitting = _j[1];
  // Set form values when milestone changes
  (0, react_1.useEffect)(
    function () {
      if (milestone) {
        setTitle(milestone.title);
        setDescription(milestone.description || "");
        setStatus(milestone.status);
        setDueDate(new Date(milestone.dueDate));
        setProgress(milestone.progress);
        setOwner(milestone.owner || "");
        setNotes(milestone.notes || "");
      } else {
        // Default values for new milestone
        setTitle("");
        setDescription("");
        setStatus("not_started");
        setDueDate(new Date());
        setProgress(0);
        setOwner("");
        setNotes("");
      }
    },
    [milestone],
  );
  var handleSave = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var milestoneData, savedMilestone, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!title.trim()) return [2 /*return*/];
            setIsSubmitting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            milestoneData = {
              strategyId: strategyId,
              title: title,
              description: description,
              status: status,
              dueDate: dueDate.toISOString(),
              progress: progress,
              owner: owner,
              notes: notes,
            };
            savedMilestone = void 0;
            if (!milestone) return [3 /*break*/, 3];
            // Update existing milestone
            return [
              4 /*yield*/,
              (0, implementationUtils_1.updateMilestone)(
                milestone.id,
                milestoneData,
              ),
            ];
          case 2:
            // Update existing milestone
            _a.sent();
            savedMilestone = __assign(__assign({}, milestone), milestoneData);
            return [3 /*break*/, 5];
          case 3:
            return [
              4 /*yield*/,
              (0, implementationUtils_1.createMilestone)(milestoneData),
            ];
          case 4:
            // Create new milestone
            savedMilestone = _a.sent();
            _a.label = 5;
          case 5:
            if (savedMilestone) {
              onSave(savedMilestone);
            }
            return [3 /*break*/, 8];
          case 6:
            error_1 = _a.sent();
            console.error("Error saving milestone:", error_1);
            return [3 /*break*/, 8];
          case 7:
            setIsSubmitting(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDelete = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!milestone) return [2 /*return*/];
            setIsSubmitting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, implementationUtils_1.deleteMilestone)(milestone.id),
            ];
          case 2:
            _a.sent();
            onDelete(milestone.id);
            onClose();
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Error deleting milestone:", error_2);
            return [3 /*break*/, 5];
          case 4:
            setIsSubmitting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: function (open) {
      return !open && onClose();
    },
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "sm:max-w-[500px]",
      children: [
        (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
            children: milestone ? "Edit Milestone" : "Add New Milestone",
          }),
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid gap-4 py-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "title",
                  children: "Title",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  id: "title",
                  value: title,
                  onChange: function (e) {
                    return setTitle(e.target.value);
                  },
                  placeholder: "Milestone title",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "description",
                  children: "Description",
                }),
                (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                  id: "description",
                  value: description,
                  onChange: function (e) {
                    return setDescription(e.target.value);
                  },
                  placeholder: "Describe this milestone...",
                  rows: 3,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-2 gap-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      htmlFor: "status",
                      children: "Status",
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: status,
                      onValueChange: function (value) {
                        return setStatus(value);
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select status" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "not_started",
                              children: "Not Started",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "in_progress",
                              children: "In Progress",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "completed",
                              children: "Completed",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "delayed",
                              children: "Delayed",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      children: "Due Date",
                    }),
                    (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
                      children: [
                        (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
                          asChild: true,
                          children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            className: (0, utils_1.cn)(
                              "justify-start text-left font-normal",
                              !dueDate && "text-muted-foreground",
                            ),
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.CalendarIcon,
                                { className: "mr-2 h-4 w-4" },
                              ),
                              dueDate
                                ? (0, date_fns_1.format)(dueDate, "PPP")
                                : "Select date",
                            ],
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
                          className: "w-auto p-0",
                          children: (0, jsx_runtime_1.jsx)(
                            calendar_1.Calendar,
                            {
                              mode: "single",
                              selected: dueDate,
                              onSelect: function (date) {
                                return date && setDueDate(date);
                              },
                              initialFocus: true,
                            },
                          ),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-2",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "flex justify-between",
                  children: (0, jsx_runtime_1.jsxs)(label_1.Label, {
                    htmlFor: "progress",
                    children: ["Progress (", progress, "%)"],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                  id: "progress",
                  min: 0,
                  max: 100,
                  step: 5,
                  value: [progress],
                  onValueChange: function (values) {
                    return setProgress(values[0]);
                  },
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "owner",
                  children: "Owner",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  id: "owner",
                  value: owner,
                  onChange: function (e) {
                    return setOwner(e.target.value);
                  },
                  placeholder: "Responsible person",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "notes",
                  children: "Notes",
                }),
                (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                  id: "notes",
                  value: notes,
                  onChange: function (e) {
                    return setNotes(e.target.value);
                  },
                  placeholder: "Additional notes...",
                  rows: 2,
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
          className: "flex items-center justify-between",
          children: [
            milestone &&
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "destructive",
                onClick: handleDelete,
                disabled: isSubmitting,
                children: [
                  isSubmitting
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "mr-2 h-4 w-4 animate-spin",
                      })
                    : null,
                  "Delete",
                ],
              }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  onClick: onClose,
                  disabled: isSubmitting,
                  children: "Cancel",
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  onClick: handleSave,
                  disabled: isSubmitting || !title.trim(),
                  children: [
                    isSubmitting
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                          className: "mr-2 h-4 w-4 animate-spin",
                        })
                      : null,
                    "Save",
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = MilestoneDialog;
