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
exports.default = CommunicationItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var date_fns_1 = require("date-fns");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var collapsible_1 = require("@/components/ui/collapsible");
var lucide_react_1 = require("lucide-react");
var textarea_1 = require("@/components/ui/textarea");
var communications_1 = require("@/hooks/communications");
var CommunicationStatusSelector_1 = require("./CommunicationStatusSelector");
function CommunicationItem(_a) {
  var _this = this;
  var _b;
  var communication = _a.communication,
    isUpcoming = _a.isUpcoming;
  var _c = (0, react_1.useState)(false),
    isOpen = _c[0],
    setIsOpen = _c[1];
  var _d = (0, react_1.useState)(false),
    isEditingNotes = _d[0],
    setIsEditingNotes = _d[1];
  var _e = (0, react_1.useState)(communication.notes || ""),
    notes = _e[0],
    setNotes = _e[1];
  var updateCommunicationStatus = (0, communications_1.useCommunications)()
    .updateCommunicationStatus;
  var getTypeIcon = function () {
    switch (communication.type) {
      case "phone":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
          className: "h-4 w-4",
        });
      case "zoom":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
          className: "h-4 w-4",
        });
      case "whatsapp":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
          className: "h-4 w-4",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
          className: "h-4 w-4",
        });
    }
  };
  var getStatusBadge = function () {
    switch (communication.status) {
      case "scheduled":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-blue-50 text-blue-700 border-blue-200",
          children: "Scheduled",
        });
      case "completed":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-green-50 text-green-700 border-green-200",
          children: "Completed",
        });
      case "missed":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-red-50 text-red-700 border-red-200",
          children: "Missed",
        });
      case "cancelled":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-gray-50 text-gray-700 border-gray-200",
          children: "Cancelled",
        });
      default:
        return null;
    }
  };
  var formatDateTime = function (dateString) {
    if (!dateString) return "N/A";
    try {
      return (0, date_fns_1.format)(
        new Date(dateString),
        "MMM d, yyyy 'at' h:mm a",
      );
    } catch (e) {
      return dateString;
    }
  };
  var getLeadName = function () {
    var _a;
    return (
      ((_a = communication.leads) === null || _a === void 0
        ? void 0
        : _a.name) || "Unknown Lead"
    );
  };
  var handleSaveNotes = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              updateCommunicationStatus(
                communication.id,
                communication.status,
                notes,
              ),
            ];
          case 1:
            _a.sent();
            setIsEditingNotes(false);
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error saving notes:", error_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleMarkCompleted = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              updateCommunicationStatus(communication.id, "completed"),
            ];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            error_2 = _a.sent();
            console.error("Error marking as completed:", error_2);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleMarkMissed = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [
              4 /*yield*/,
              updateCommunicationStatus(communication.id, "missed"),
            ];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            error_3 = _a.sent();
            console.error("Error marking as missed:", error_3);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "border rounded-lg p-3 ".concat(
      communication.status === "scheduled"
        ? "border-blue-200 bg-blue-50/30"
        : communication.status === "completed"
          ? "border-green-200 bg-green-50/30"
          : communication.status === "missed"
            ? "border-red-200 bg-red-50/30"
            : "border-gray-200 bg-gray-50/30",
    ),
    children: (0, jsx_runtime_1.jsxs)(collapsible_1.Collapsible, {
      open: isOpen,
      onOpenChange: setIsOpen,
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-start justify-between",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start space-x-3",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "p-2 rounded-full ".concat(
                    communication.type === "phone"
                      ? "bg-blue-100 text-blue-700"
                      : communication.type === "zoom"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700",
                  ),
                  children: getTypeIcon(),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h4", {
                      className: "font-medium text-sm",
                      children: getLeadName(),
                    }),
                    (0, jsx_runtime_1.jsxs)("p", {
                      className: "text-xs text-muted-foreground",
                      children: [
                        communication.type.charAt(0).toUpperCase() +
                          communication.type.slice(1),
                        " ",
                        communication.type === "zoom"
                          ? "Meeting"
                          : communication.type === "whatsapp"
                            ? "Chat"
                            : "Call",
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center mt-1 space-x-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                          className: "h-3 w-3 text-muted-foreground",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-xs text-muted-foreground",
                          children: formatDateTime(communication.scheduled_at),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [
                getStatusBadge(),
                (0, jsx_runtime_1.jsx)(collapsible_1.CollapsibleTrigger, {
                  asChild: true,
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "ghost",
                    size: "sm",
                    className: "h-8 w-8 p-0",
                    children: isOpen
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, {
                          className: "h-4 w-4",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, {
                          className: "h-4 w-4",
                        }),
                  }),
                }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(collapsible_1.CollapsibleContent, {
          className: "pt-3 mt-3 border-t",
          children: [
            isUpcoming &&
              communication.status === "scheduled" &&
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-x-2",
                    children: [
                      communication.meeting_link &&
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          size: "sm",
                          variant: "outline",
                          asChild: true,
                          children: (0, jsx_runtime_1.jsxs)("a", {
                            href: communication.meeting_link,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ExternalLink,
                                { className: "h-3 w-3 mr-1" },
                              ),
                              "Join Meeting",
                            ],
                          }),
                        }),
                      communication.type === "whatsapp" &&
                        ((_b = communication.leads) === null || _b === void 0
                          ? void 0
                          : _b.phone) &&
                        (0, jsx_runtime_1.jsx)(button_1.Button, {
                          size: "sm",
                          variant: "outline",
                          asChild: true,
                          children: (0, jsx_runtime_1.jsxs)("a", {
                            href: "https://wa.me/".concat(
                              communication.leads.phone.replace(/[^0-9]/g, ""),
                            ),
                            target: "_blank",
                            rel: "noopener noreferrer",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.MessageSquare,
                                { className: "h-3 w-3 mr-1" },
                              ),
                              "Open WhatsApp",
                            ],
                          }),
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-x-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        size: "sm",
                        variant: "default",
                        onClick: handleMarkCompleted,
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                            className: "h-3 w-3 mr-1",
                          }),
                          "Mark Completed",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        size: "sm",
                        variant: "outline",
                        onClick: handleMarkMissed,
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                            className: "h-3 w-3 mr-1",
                          }),
                          "Mark Missed",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            !isUpcoming &&
              (0, jsx_runtime_1.jsx)(CommunicationStatusSelector_1.default, {
                communicationId: communication.id,
                currentStatus: communication.status,
                currentOutcome: communication.outcome,
              }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mt-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between mb-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("h5", {
                      className: "text-sm font-medium",
                      children: "Notes",
                    }),
                    !isEditingNotes
                      ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          variant: "ghost",
                          size: "sm",
                          onClick: function () {
                            return setIsEditingNotes(true);
                          },
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                              className: "h-3 w-3 mr-1",
                            }),
                            "Edit",
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-x-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "outline",
                              size: "sm",
                              onClick: function () {
                                return setIsEditingNotes(false);
                              },
                              children: "Cancel",
                            }),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "default",
                              size: "sm",
                              onClick: handleSaveNotes,
                              children: "Save",
                            }),
                          ],
                        }),
                  ],
                }),
                !isEditingNotes
                  ? (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children: communication.notes || "No notes available",
                    })
                  : (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                      value: notes,
                      onChange: function (e) {
                        return setNotes(e.target.value);
                      },
                      placeholder: "Enter notes about this communication...",
                      className: "w-full",
                      rows: 3,
                    }),
              ],
            }),
            communication.ai_summary &&
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "mt-4 p-3 bg-primary-foreground/50 rounded-md border border-primary/10",
                children: [
                  (0, jsx_runtime_1.jsx)("h5", {
                    className: "text-sm font-medium mb-2",
                    children: "AI Summary",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: communication.ai_summary,
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
