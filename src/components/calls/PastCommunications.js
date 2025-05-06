"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PastCommunications;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var table_1 = require("@/components/ui/table");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var badge_1 = require("@/components/ui/badge");
var skeleton_1 = require("@/components/ui/skeleton");
var CommunicationNotes_1 = require("./CommunicationNotes");
function PastCommunications(_a) {
  var communications = _a.communications,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)(""),
    searchQuery = _b[0],
    setSearchQuery = _b[1];
  var _c = (0, react_1.useState)(null),
    viewingNotes = _c[0],
    setViewingNotes = _c[1];
  var filteredCommunications = communications.filter(function (comm) {
    var _a, _b;
    return (
      ((_b = (_a = comm.leads) === null || _a === void 0 ? void 0 : _a.name) ===
        null || _b === void 0
        ? void 0
        : _b.toLowerCase().includes(searchQuery.toLowerCase())) ||
      comm.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comm.notes &&
        comm.notes.toLowerCase().includes(searchQuery.toLowerCase()))
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
  var getStatusIcon = function (status) {
    switch (status) {
      case "completed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
          className: "h-4 w-4 text-green-600",
        });
      case "missed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "h-4 w-4 text-red-600",
        });
      case "cancelled":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "h-4 w-4 text-gray-600",
        });
      case "scheduled":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
          className: "h-4 w-4 text-blue-600",
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
                  children: "Communication History",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Past calls, meetings and chats with leads",
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
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          isLoading
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
            : filteredCommunications.length === 0
              ? (0, jsx_runtime_1.jsxs)("div", {
                  className: "text-center py-8 border rounded-md border-dashed",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children: "No past communications found",
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
                              children: "Date",
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                              children: "Status",
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                              children: "Outcome",
                            }),
                            (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                              children: "Notes",
                            }),
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableBody, {
                        children: filteredCommunications.map(function (comm) {
                          var _a;
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
                                  children: formatDateTime(
                                    comm.ended_at || comm.scheduled_at,
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  children: (0, jsx_runtime_1.jsxs)("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                      getStatusIcon(comm.status),
                                      (0, jsx_runtime_1.jsx)("span", {
                                        className: "capitalize",
                                        children: comm.status,
                                      }),
                                    ],
                                  }),
                                }),
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  children: comm.outcome
                                    ? (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                        variant: "outline",
                                        className:
                                          "\n                            "
                                            .concat(
                                              comm.outcome === "follow_up"
                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                : "",
                                              "\n                            ",
                                            )
                                            .concat(
                                              comm.outcome === "opportunity"
                                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                                : "",
                                              "\n                            ",
                                            )
                                            .concat(
                                              comm.outcome === "closed_won"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "",
                                              "\n                            ",
                                            )
                                            .concat(
                                              comm.outcome === "closed_lost"
                                                ? "bg-red-50 text-red-700 border-red-200"
                                                : "",
                                              "\n                          ",
                                            ),
                                        children: [
                                          comm.outcome === "follow_up"
                                            ? "Follow-up"
                                            : "",
                                          comm.outcome === "opportunity"
                                            ? "Opportunity"
                                            : "",
                                          comm.outcome === "closed_won"
                                            ? "Closed (Won)"
                                            : "",
                                          comm.outcome === "closed_lost"
                                            ? "Closed (Lost)"
                                            : "",
                                        ],
                                      })
                                    : (0, jsx_runtime_1.jsx)("span", {
                                        className:
                                          "text-muted-foreground text-sm",
                                        children: "None",
                                      }),
                                }),
                                (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                                  children: (0, jsx_runtime_1.jsxs)(
                                    button_1.Button,
                                    {
                                      variant: "ghost",
                                      size: "sm",
                                      disabled: !comm.notes && !comm.ai_summary,
                                      onClick: function () {
                                        return setViewingNotes(comm.id);
                                      },
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.FileText,
                                          { className: "h-4 w-4 mr-2" },
                                        ),
                                        "View",
                                      ],
                                    },
                                  ),
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
          viewingNotes &&
            (0, jsx_runtime_1.jsx)(CommunicationNotes_1.default, {
              communicationId: viewingNotes,
              communications: communications,
              isLoading: isLoading,
              onClose: function () {
                return setViewingNotes(null);
              },
            }),
        ],
      }),
    ],
  });
}
