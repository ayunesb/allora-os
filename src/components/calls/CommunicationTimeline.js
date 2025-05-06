"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunicationTimeline;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var CommunicationItem_1 = require("./CommunicationItem");
var skeleton_1 = require("@/components/ui/skeleton");
function CommunicationTimeline(_a) {
  var upcomingCommunications = _a.upcomingCommunications,
    pastCommunications = _a.pastCommunications,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)("all"),
    activeFilter = _b[0],
    setActiveFilter = _b[1];
  var filterCommunications = function (communications, filter) {
    if (filter === "all") return communications;
    return communications.filter(function (comm) {
      return comm.type === filter;
    });
  };
  var filteredUpcoming = filterCommunications(
    upcomingCommunications,
    activeFilter,
  );
  var filteredPast = filterCommunications(pastCommunications, activeFilter);
  // Show only the 5 most recent past communications in the timeline
  var recentPastCommunications = filteredPast.slice(0, 5);
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Communication Timeline",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Upcoming and recent communications",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.Tabs, {
              defaultValue: "all",
              value: activeFilter,
              onValueChange: function (v) {
                return setActiveFilter(v);
              },
              children: (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid w-full grid-cols-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "all",
                    className: "text-xs",
                    children: "All",
                  }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "phone",
                    className: "text-xs",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                        className: "h-3 w-3 mr-1",
                      }),
                      "Phone",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "zoom",
                    className: "text-xs",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.VideoIcon, {
                        className: "h-3 w-3 mr-1",
                      }),
                      "Zoom",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "whatsapp",
                    className: "text-xs",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                        className: "h-3 w-3 mr-1",
                      }),
                      "WhatsApp",
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)(TimelineLoading, {})
          : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "mb-8",
                  children: [
                    (0, jsx_runtime_1.jsxs)("h3", {
                      className:
                        "text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CalendarDays, {
                          className: "h-4 w-4 mr-2",
                        }),
                        "Upcoming",
                      ],
                    }),
                    filteredUpcoming.length === 0
                      ? (0, jsx_runtime_1.jsx)("p", {
                          className:
                            "text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md",
                          children: "No upcoming communications",
                        })
                      : (0, jsx_runtime_1.jsx)("div", {
                          className: "space-y-4",
                          children: filteredUpcoming.map(
                            function (communication) {
                              return (0, jsx_runtime_1.jsx)(
                                CommunicationItem_1.default,
                                {
                                  communication: communication,
                                  isUpcoming: true,
                                },
                                communication.id,
                              );
                            },
                          ),
                        }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className:
                        "text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center mb-4",
                      children: "Recent Activity",
                    }),
                    recentPastCommunications.length === 0
                      ? (0, jsx_runtime_1.jsx)("p", {
                          className:
                            "text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md",
                          children: "No recent communications",
                        })
                      : (0, jsx_runtime_1.jsx)("div", {
                          className: "space-y-4",
                          children: recentPastCommunications.map(
                            function (communication) {
                              return (0, jsx_runtime_1.jsx)(
                                CommunicationItem_1.default,
                                {
                                  communication: communication,
                                  isUpcoming: false,
                                },
                                communication.id,
                              );
                            },
                          ),
                        }),
                  ],
                }),
              ],
            }),
      }),
    ],
  });
}
function TimelineLoading() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-5 w-32 mb-4",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-24 w-full",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-24 w-full",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-5 w-32 mb-4",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-24 w-full",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-24 w-full",
              }),
              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                className: "h-24 w-full",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
