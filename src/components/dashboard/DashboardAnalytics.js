"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardAnalytics = DashboardAnalytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var recharts_1 = require("recharts");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
var tabs_1 = require("@/components/ui/tabs");
var sonner_1 = require("sonner");
function DashboardAnalytics(_a) {
  var data = _a.data,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  var _c = (0, react_1.useState)("7d"),
    timeRange = _c[0],
    setTimeRange = _c[1];
  var _d = (0, react_1.useState)("bar"),
    chartType = _d[0],
    setChartType = _d[1];
  // Sample data - in a real app, this would come from props or an API
  var revenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 7000 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 9000 },
  ];
  var performanceData = [
    { name: "Ads", value: 400 },
    { name: "Social", value: 300 },
    { name: "Email", value: 300 },
    { name: "Direct", value: 200 },
  ];
  var conversionData = [
    { name: "Mon", visits: 4000, conversions: 240 },
    { name: "Tue", visits: 3000, conversions: 198 },
    { name: "Wed", visits: 2000, conversions: 980 },
    { name: "Thu", visits: 2780, conversions: 390 },
    { name: "Fri", visits: 1890, conversions: 480 },
    { name: "Sat", visits: 2390, conversions: 380 },
    { name: "Sun", visits: 3490, conversions: 430 },
  ];
  var COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  var handleExportData = function (format) {
    // In a real app, this would generate and download the file
    sonner_1.toast.success(
      "Analytics data exported as ".concat(format.toUpperCase()),
    );
  };
  var handleFilterChange = function (value) {
    setTimeRange(value);
    sonner_1.toast.info("Data filtered to show last ".concat(value));
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className:
            "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                  className: "mr-2 h-5 w-5",
                }),
                "Business Performance Analytics",
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                  value: timeRange,
                  onValueChange: handleFilterChange,
                  children: [
                    (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                      className: "w-[120px]",
                      children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                        placeholder: "Time Range",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "7d",
                          children: "Last 7 days",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "30d",
                          children: "Last 30 days",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "90d",
                          children: "Last 90 days",
                        }),
                        (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                          value: "1y",
                          children: "Last year",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "flex gap-1",
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "icon",
                    onClick: function () {
                      return handleExportData("csv");
                    },
                    title: "Export as CSV",
                    children: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                      className: "h-4 w-4",
                    }),
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          defaultValue: "performance",
          className: "w-full",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "mb-4 grid grid-cols-3 w-full",
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "performance",
                  className: "flex items-center justify-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Performance",
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "channels",
                  className: "flex items-center justify-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.PieChart, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Channels",
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "conversions",
                  className: "flex items-center justify-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.LineChart, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Conversions",
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "performance",
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "h-80",
                children: (0, jsx_runtime_1.jsx)(
                  recharts_1.ResponsiveContainer,
                  {
                    width: "100%",
                    height: "100%",
                    children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
                      data: revenueData,
                      margin: {
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                          strokeDasharray: "3 3",
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                          dataKey: "name",
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                        (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
                          formatter: function (value) {
                            return ["$".concat(value), "Revenue"];
                          },
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                        (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                          dataKey: "value",
                          name: "Revenue",
                          fill: "#8884d8",
                          activeBar: { fill: "#6557ff", stroke: "#6557ff" },
                        }),
                      ],
                    }),
                  },
                ),
              }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "channels",
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "h-80",
                children: (0, jsx_runtime_1.jsx)(
                  recharts_1.ResponsiveContainer,
                  {
                    width: "100%",
                    height: "100%",
                    children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, {
                      children: [
                        (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                          data: performanceData,
                          cx: "50%",
                          cy: "50%",
                          labelLine: false,
                          label: function (_a) {
                            var name = _a.name,
                              percent = _a.percent;
                            return ""
                              .concat(name, ": ")
                              .concat((percent * 100).toFixed(0), "%");
                          },
                          outerRadius: 100,
                          fill: "#8884d8",
                          dataKey: "value",
                          children: performanceData.map(
                            function (entry, index) {
                              return (0, jsx_runtime_1.jsx)(
                                recharts_1.Cell,
                                { fill: COLORS[index % COLORS.length] },
                                "cell-".concat(index),
                              );
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
                          formatter: function (value) {
                            return ["".concat(value), "Value"];
                          },
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                      ],
                    }),
                  },
                ),
              }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "conversions",
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "h-80",
                children: (0, jsx_runtime_1.jsx)(
                  recharts_1.ResponsiveContainer,
                  {
                    width: "100%",
                    height: "100%",
                    children: (0, jsx_runtime_1.jsxs)(recharts_1.AreaChart, {
                      data: conversionData,
                      margin: {
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      },
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
                        (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                          type: "monotone",
                          dataKey: "visits",
                          stackId: "1",
                          stroke: "#8884d8",
                          fill: "#8884d8",
                          name: "Visits",
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                          type: "monotone",
                          dataKey: "conversions",
                          stackId: "2",
                          stroke: "#82ca9d",
                          fill: "#82ca9d",
                          name: "Conversions",
                        }),
                      ],
                    }),
                  },
                ),
              }),
            }),
          ],
        }),
      }),
    ],
  });
}
