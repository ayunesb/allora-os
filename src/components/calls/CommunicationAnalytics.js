"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunicationAnalytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var skeleton_1 = require("@/components/ui/skeleton");
var recharts_1 = require("recharts");
// Helper function to get week number from date
var getWeekNumber = function (date) {
  var firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  var pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};
function CommunicationAnalytics(_a) {
  var communications = _a.communications,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)("month"),
    timeframe = _b[0],
    setTimeframe = _b[1];
  // Data processing for analytics
  // Communication types breakdown
  var typeBreakdown = communications.reduce(function (acc, comm) {
    acc[comm.type] = (acc[comm.type] || 0) + 1;
    return acc;
  }, {});
  var typeData = Object.entries(typeBreakdown).map(function (_a) {
    var name = _a[0],
      value = _a[1];
    return {
      name: name,
      value: value,
    };
  });
  // Communication outcomes breakdown
  var outcomeBreakdown = communications.reduce(function (acc, comm) {
    var outcome = comm.outcome || "no_outcome";
    acc[outcome] = (acc[outcome] || 0) + 1;
    return acc;
  }, {});
  var outcomeData = Object.entries(outcomeBreakdown).map(function (_a) {
    var name = _a[0],
      value = _a[1];
    return {
      name: name === "no_outcome" ? "No Outcome" : name.replace("_", " "),
      value: value,
    };
  });
  // Communication trends over time
  var now = new Date();
  var currentYear = now.getFullYear();
  var currentMonth = now.getMonth();
  // Weekly trend data
  var weeklyTrendData = Array.from({ length: 12 }, function (_, i) {
    var weekNumber = getWeekNumber(now) - 11 + i;
    return {
      name: "W".concat(weekNumber > 0 ? weekNumber : 52 + weekNumber),
      calls: 0,
      messages: 0,
      meetings: 0,
    };
  });
  communications.forEach(function (comm) {
    var date = new Date(comm.ended_at || comm.created_at);
    var weekDiff = getWeekNumber(now) - getWeekNumber(date);
    if (weekDiff >= 0 && weekDiff < 12) {
      var index = 11 - weekDiff;
      if (comm.type === "phone") {
        weeklyTrendData[index].calls++;
      } else if (comm.type === "whatsapp") {
        weeklyTrendData[index].messages++;
      } else if (comm.type === "zoom") {
        weeklyTrendData[index].meetings++;
      }
    }
  });
  // Monthly trend data
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var monthlyTrendData = Array.from({ length: 6 }, function (_, i) {
    var monthIndex = (currentMonth - 5 + i + 12) % 12;
    return {
      name: monthNames[monthIndex],
      calls: 0,
      messages: 0,
      meetings: 0,
    };
  });
  communications.forEach(function (comm) {
    var date = new Date(comm.ended_at || comm.created_at);
    var monthDiff =
      (currentYear - date.getFullYear()) * 12 + currentMonth - date.getMonth();
    if (monthDiff >= 0 && monthDiff < 6) {
      var index = 5 - monthDiff;
      if (comm.type === "phone") {
        monthlyTrendData[index].calls++;
      } else if (comm.type === "whatsapp") {
        monthlyTrendData[index].messages++;
      } else if (comm.type === "zoom") {
        monthlyTrendData[index].meetings++;
      }
    }
  });
  // Display the correct trend data based on timeframe
  var trendData = timeframe === "week" ? weeklyTrendData : monthlyTrendData;
  // Colors for charts
  var COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A259FF"];
  // Lead engagement data - Dummy data for now
  var leadEngagementData = [
    {
      name: "1 touch",
      value: communications.filter(function (c) {
        return c.lead_id;
      }).length,
    },
    {
      name: "2-3 touches",
      value: Math.floor(
        communications.filter(function (c) {
          return c.lead_id;
        }).length * 0.6,
      ),
    },
    {
      name: "4-6 touches",
      value: Math.floor(
        communications.filter(function (c) {
          return c.lead_id;
        }).length * 0.3,
      ),
    },
    {
      name: "7+ touches",
      value: Math.floor(
        communications.filter(function (c) {
          return c.lead_id;
        }).length * 0.1,
      ),
    },
  ];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Communication Trends",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "View trends across communication channels",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: timeframe === "week" ? "default" : "outline",
                    size: "sm",
                    onClick: function () {
                      return setTimeframe("week");
                    },
                    children: "Weekly",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: timeframe === "month" ? "default" : "outline",
                    size: "sm",
                    onClick: function () {
                      return setTimeframe("month");
                    },
                    children: "Monthly",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "h-[300px]",
            children: isLoading
              ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "w-full h-full",
                })
              : (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
                    data: trendData,
                    margin: { top: 5, right: 30, left: 20, bottom: 5 },
                    children: [
                      (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                        strokeDasharray: "3 3",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                        dataKey: "name",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                        type: "monotone",
                        dataKey: "calls",
                        stroke: "#8884d8",
                        name: "Phone Calls",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                        type: "monotone",
                        dataKey: "messages",
                        stroke: "#82ca9d",
                        name: "WhatsApp",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                        type: "monotone",
                        dataKey: "meetings",
                        stroke: "#ffc658",
                        name: "Zoom Meetings",
                      }),
                    ],
                  }),
                }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Communication Types",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Breakdown by communication channel",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "h-[300px]",
            children: isLoading
              ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "w-full h-full",
                })
              : (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, {
                    children: [
                      (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                        data: typeData,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 60,
                        outerRadius: 80,
                        fill: "#8884d8",
                        paddingAngle: 5,
                        dataKey: "value",
                        label: function (_a) {
                          var name = _a.name,
                            percent = _a.percent;
                          return ""
                            .concat(name, " ")
                            .concat((percent * 100).toFixed(0), "%");
                        },
                        children: typeData.map(function (entry, index) {
                          return (0, jsx_runtime_1.jsx)(
                            recharts_1.Cell,
                            { fill: COLORS[index % COLORS.length] },
                            "cell-".concat(index),
                          );
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                    ],
                  }),
                }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "h-3 w-3 rounded-full bg-[#0088FE]",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-xs",
                    children: "Phone",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "h-3 w-3 rounded-full bg-[#00C49F]",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-xs",
                    children: "WhatsApp",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "h-3 w-3 rounded-full bg-[#FFBB28]",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-xs",
                    children: "Zoom",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Outcomes Analysis",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Conversion metrics from communications",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "h-[300px]",
            children: isLoading
              ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "w-full h-full",
                })
              : (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
                    data: outcomeData,
                    margin: { top: 5, right: 30, left: 20, bottom: 5 },
                    children: [
                      (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                        strokeDasharray: "3 3",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                        dataKey: "name",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                        dataKey: "value",
                        name: "Count",
                        fill: "#8884d8",
                      }),
                    ],
                  }),
                }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Lead Engagement",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Number of touchpoints per lead",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "h-[300px]",
            children: isLoading
              ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "w-full h-full",
                })
              : (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
                  width: "100%",
                  height: "100%",
                  children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, {
                    children: [
                      (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                        data: leadEngagementData,
                        cx: "50%",
                        cy: "50%",
                        outerRadius: 80,
                        fill: "#8884d8",
                        dataKey: "value",
                        label: function (_a) {
                          var name = _a.name,
                            percent = _a.percent;
                          return ""
                            .concat(name, " ")
                            .concat((percent * 100).toFixed(0), "%");
                        },
                        children: leadEngagementData.map(
                          function (entry, index) {
                            return (0, jsx_runtime_1.jsx)(
                              recharts_1.Cell,
                              { fill: COLORS[index % COLORS.length] },
                              "cell-".concat(index),
                            );
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                    ],
                  }),
                }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "text-xs text-muted-foreground",
              children:
                "The more touchpoints with a lead, the higher the conversion rate typically is.",
            }),
          }),
        ],
      }),
    ],
  });
}
