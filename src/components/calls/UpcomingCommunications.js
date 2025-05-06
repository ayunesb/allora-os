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
exports.default = UpcomingCommunications;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var skeleton_1 = require("@/components/ui/skeleton");
var communications_1 = require("@/hooks/communications");
function UpcomingCommunications(_a) {
  var _this = this;
  var communications = _a.communications,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)(""),
    searchQuery = _b[0],
    setSearchQuery = _b[1];
  var updateCommunicationStatus = (0, communications_1.useCommunications)()
    .updateCommunicationStatus;
  var filteredCommunications = communications.filter(function (comm) {
    var _a, _b;
    return (
      ((_b = (_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) ===
        null || _b === void 0
        ? void 0
        : _b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      comm.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  var sortedCommunications = __spreadArray(
    [],
    filteredCommunications,
    true,
  ).sort(function (a, b) {
    if (!a.scheduled_at || !b.scheduled_at) return 0;
    return (
      new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
    );
  });
  var getTypeIcon = function (type) {
    switch (type) {
      case "phone":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
          className: "h-4 w-4 text-blue-600",
        });
      case "zoom":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
          className: "h-4 w-4 text-purple-600",
        });
      case "whatsapp":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
          className: "h-4 w-4 text-green-600",
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
  var handleMarkCompleted = function (id) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, updateCommunicationStatus(id, "completed")];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error marking as completed:", error_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleMarkMissed = function (id) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, updateCommunicationStatus(id, "missed")];
          case 1:
            _a.sent();
            return [3 /*break*/, 3];
          case 2:
            error_2 = _a.sent();
            console.error("Error marking as missed:", error_2);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className:
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Upcoming Communications",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Your scheduled calls, meetings and chats",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "relative w-full sm:max-w-xs",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                  className:
                    "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  placeholder: "Search communications...",
                  className: "pl-8",
                  value: searchQuery,
                  onChange: function (e) {
                    return setSearchQuery(e.target.value);
                  },
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-10 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-20 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-20 w-full",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-20 w-full",
                }),
              ],
            })
          : sortedCommunications.length === 0
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "text-center py-8 border rounded-md border-dashed",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "No upcoming communications found",
                  }),
                  searchQuery &&
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "link",
                      onClick: function () {
                        return setSearchQuery("");
                      },
                      className: "mt-2",
                      children: "Clear search",
                    }),
                ],
              })
            : (0, jsx_runtime_1.jsx)("div", {
                className: "overflow-x-auto",
                children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
                  children: [
                    (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                      children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                        children: [
                          (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                            children: "Type",
                          }),
                          (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                            children: "Lead",
                          }),
                          (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                            children: "Scheduled",
                          }),
                          (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                            children: "Duration",
                          }),
                          (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                            children: "Actions",
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                      children: sortedCommunications.map(function (comm) {
                        var _a, _b, _c;
                        return (0, jsx_runtime_1.jsxs)(
                          table_1.TableRow,
                          {
                            children: [
                              (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                children: (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    getTypeIcon(comm.type),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "capitalize",
                                      children: comm.type,
                                    }),
                                  ],
                                }),
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                children:
                                  ((_a = comm.leads) === null || _a === void 0
                                    ? void 0
                                    : _a.name) || "Unknown",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                children: formatDateTime(comm.scheduled_at),
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                children: (
                                  (_b = comm.metadata) === null || _b === void 0
                                    ? void 0
                                    : _b.duration
                                )
                                  ? "".concat(
                                      comm.metadata.duration,
                                      " minutes",
                                    )
                                  : "N/A",
                              }),
                              (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                children: (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center space-x-2",
                                  children: [
                                    comm.meeting_link &&
                                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                                        size: "sm",
                                        variant: "outline",
                                        asChild: true,
                                        children: (0, jsx_runtime_1.jsxs)("a", {
                                          href: comm.meeting_link,
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.ExternalLink,
                                              { className: "h-3 w-3 mr-1" },
                                            ),
                                            "Join",
                                          ],
                                        }),
                                      }),
                                    comm.type === "whatsapp" &&
                                      ((_c = comm.leads) === null ||
                                      _c === void 0
                                        ? void 0
                                        : _c.phone) &&
                                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                                        size: "sm",
                                        variant: "outline",
                                        asChild: true,
                                        children: (0, jsx_runtime_1.jsxs)("a", {
                                          href: "https://wa.me/".concat(
                                            comm.leads.phone.replace(
                                              /[^0-9]/g,
                                              "",
                                            ),
                                          ),
                                          target: "_blank",
                                          rel: "noopener noreferrer",
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.MessageSquare,
                                              { className: "h-3 w-3 mr-1" },
                                            ),
                                            "Chat",
                                          ],
                                        }),
                                      }),
                                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                      size: "sm",
                                      variant: "default",
                                      onClick: function () {
                                        return handleMarkCompleted(comm.id);
                                      },
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.CheckCircle,
                                          { className: "h-3 w-3 mr-1" },
                                        ),
                                        "Done",
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                      size: "sm",
                                      variant: "outline",
                                      onClick: function () {
                                        return handleMarkMissed(comm.id);
                                      },
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.XCircle,
                                          { className: "h-3 w-3 mr-1" },
                                        ),
                                        "Missed",
                                      ],
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          },
                          comm.id,
                        );
                      }),
                    }),
                  ],
                }),
              }),
      }),
    ],
  });
}
