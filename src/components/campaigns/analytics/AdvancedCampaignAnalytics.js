"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedCampaignAnalytics = AdvancedCampaignAnalytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var recharts_1 = require("recharts");
var COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
var safeNumber = function (value) {
  return typeof value === "number" ? value : 0;
};
var formatAsPercent = function (value) {
  return "".concat((value * 100).toFixed(2), "%");
};
var formatAsCurrency = function (value) {
  return "$".concat(value.toFixed(2));
};
function AdvancedCampaignAnalytics(_a) {
  var _b, _c, _d, _e;
  var campaign = _a.campaign;
  var _f = (0, react_1.useState)("overview"),
    activeTab = _f[0],
    setActiveTab = _f[1];
  // Safely access nested properties
  var metrics = campaign.metrics || {};
  var dayMetrics = campaign.dayMetrics || [];
  var channelBreakdown = campaign.channelBreakdown || [];
  var deviceBreakdown = campaign.deviceBreakdown || [];
  // Calculate additional metrics with fallbacks
  var impressions = safeNumber(metrics.impressions);
  var clicks = safeNumber(metrics.clicks);
  var conversions = safeNumber(metrics.conversions);
  var cost = safeNumber(metrics.cost);
  var ctr =
    (_b = metrics.ctr) !== null && _b !== void 0
      ? _b
      : impressions > 0
        ? clicks / impressions
        : 0;
  var cpc =
    (_c = metrics.cpc) !== null && _c !== void 0
      ? _c
      : clicks > 0
        ? cost / clicks
        : 0;
  var conversionRate =
    (_d = metrics.conversionRate) !== null && _d !== void 0
      ? _d
      : clicks > 0
        ? conversions / clicks
        : 0;
  var roi =
    (_e = metrics.roi) !== null && _e !== void 0
      ? _e
      : cost > 0
        ? (conversions * 100 - cost) / cost
        : 0;
  // Performance overview data for the card metrics
  var performanceData = [
    { name: "Impressions", value: impressions },
    { name: "Clicks", value: clicks },
    { name: "Conversions", value: conversions },
    { name: "CTR", value: ctr, format: formatAsPercent },
    { name: "CPC", value: cpc, format: formatAsCurrency },
    { name: "Conv. Rate", value: conversionRate, format: formatAsPercent },
    {
      name: "ROI",
      value: roi,
      format: function (v) {
        return "".concat((v * 100).toFixed(2), "%");
      },
    },
  ];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("h2", {
        className: "text-2xl font-bold",
        children: [campaign.name, " Analytics"],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid grid-cols-2 md:grid-cols-4 gap-4",
        children: performanceData.slice(0, 4).map(function (item, index) {
          return (0, jsx_runtime_1.jsx)(
            card_1.Card,
            {
              children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "p-4 text-center",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium text-muted-foreground mb-1",
                    children: item.name,
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-2xl font-bold",
                    children: item.format
                      ? item.format(item.value)
                      : item.value.toLocaleString(),
                  }),
                ],
              }),
            },
            index,
          );
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4",
        children: performanceData.slice(4).map(function (item, index) {
          return (0, jsx_runtime_1.jsx)(
            card_1.Card,
            {
              children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "p-4 text-center",
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-sm font-medium text-muted-foreground mb-1",
                    children: item.name,
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-2xl font-bold",
                    children: item.format
                      ? item.format(item.value)
                      : item.value.toLocaleString(),
                  }),
                ],
              }),
            },
            index,
          );
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Performance Analysis",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
              value: activeTab,
              onValueChange: setActiveTab,
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  className: "mb-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "overview",
                      children: "Trends",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "channels",
                      children: "Channels",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "devices",
                      children: "Devices",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "overview",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-80",
                    children:
                      dayMetrics.length > 0
                        ? (0, jsx_runtime_1.jsx)(
                            recharts_1.ResponsiveContainer,
                            {
                              width: "100%",
                              height: "100%",
                              children: (0, jsx_runtime_1.jsxs)(
                                recharts_1.LineChart,
                                {
                                  data: dayMetrics,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      recharts_1.CartesianGrid,
                                      { strokeDasharray: "3 3" },
                                    ),
                                    (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                                      dataKey: "day",
                                    }),
                                    (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                                      yAxisId: "left",
                                    }),
                                    (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                                      yAxisId: "right",
                                      orientation: "right",
                                    }),
                                    (0, jsx_runtime_1.jsx)(
                                      recharts_1.Tooltip,
                                      {},
                                    ),
                                    (0, jsx_runtime_1.jsx)(
                                      recharts_1.Legend,
                                      {},
                                    ),
                                    (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                                      yAxisId: "left",
                                      type: "monotone",
                                      dataKey: "impressions",
                                      stroke: "#8884d8",
                                      name: "Impressions",
                                      dot: false,
                                    }),
                                    (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                                      yAxisId: "right",
                                      type: "monotone",
                                      dataKey: "clicks",
                                      stroke: "#82ca9d",
                                      name: "Clicks",
                                      dot: false,
                                    }),
                                  ],
                                },
                              ),
                            },
                          )
                        : (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-full flex items-center justify-center text-muted-foreground",
                            children: "No daily metrics available",
                          }),
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "channels",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-80",
                    children:
                      channelBreakdown.length > 0
                        ? (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex flex-col md:flex-row gap-6",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                recharts_1.ResponsiveContainer,
                                {
                                  width: "50%",
                                  height: 300,
                                  children: (0, jsx_runtime_1.jsxs)(
                                    recharts_1.PieChart,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                                          data: channelBreakdown,
                                          cx: "50%",
                                          cy: "50%",
                                          labelLine: false,
                                          label: function (_a) {
                                            var name = _a.name,
                                              percent = _a.percent;
                                            return ""
                                              .concat(name, ": ")
                                              .concat(
                                                (percent * 100).toFixed(0),
                                                "%",
                                              );
                                          },
                                          outerRadius: 80,
                                          fill: "#8884d8",
                                          dataKey: "value",
                                          children: channelBreakdown.map(
                                            function (entry, index) {
                                              return (0, jsx_runtime_1.jsx)(
                                                recharts_1.Cell,
                                                {
                                                  fill: COLORS[
                                                    index % COLORS.length
                                                  ],
                                                },
                                                "cell-".concat(index),
                                              );
                                            },
                                          ),
                                        }),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.Tooltip,
                                          {
                                            formatter: function (value) {
                                              return [
                                                "".concat(value),
                                                "Value",
                                              ];
                                            },
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                },
                              ),
                              (0, jsx_runtime_1.jsx)(
                                recharts_1.ResponsiveContainer,
                                {
                                  width: "50%",
                                  height: 300,
                                  children: (0, jsx_runtime_1.jsxs)(
                                    recharts_1.BarChart,
                                    {
                                      data: channelBreakdown,
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.CartesianGrid,
                                          { strokeDasharray: "3 3" },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.XAxis,
                                          { dataKey: "channel" },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.YAxis,
                                          {},
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.Tooltip,
                                          {},
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.Legend,
                                          {},
                                        ),
                                        (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                                          dataKey: "value",
                                          fill: "#8884d8",
                                          name: "Value",
                                        }),
                                      ],
                                    },
                                  ),
                                },
                              ),
                            ],
                          })
                        : (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-full flex items-center justify-center text-muted-foreground",
                            children: "No channel breakdown available",
                          }),
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                  value: "devices",
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "h-80",
                    children:
                      deviceBreakdown.length > 0
                        ? (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex flex-col md:flex-row gap-6",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                recharts_1.ResponsiveContainer,
                                {
                                  width: "50%",
                                  height: 300,
                                  children: (0, jsx_runtime_1.jsxs)(
                                    recharts_1.PieChart,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                                          data: deviceBreakdown,
                                          cx: "50%",
                                          cy: "50%",
                                          labelLine: false,
                                          label: function (_a) {
                                            var name = _a.name,
                                              percent = _a.percent;
                                            return ""
                                              .concat(name, ": ")
                                              .concat(
                                                (percent * 100).toFixed(0),
                                                "%",
                                              );
                                          },
                                          outerRadius: 80,
                                          fill: "#82ca9d",
                                          dataKey: "value",
                                          children: deviceBreakdown.map(
                                            function (entry, index) {
                                              return (0, jsx_runtime_1.jsx)(
                                                recharts_1.Cell,
                                                {
                                                  fill: COLORS[
                                                    index % COLORS.length
                                                  ],
                                                },
                                                "cell-".concat(index),
                                              );
                                            },
                                          ),
                                        }),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.Tooltip,
                                          {
                                            formatter: function (value) {
                                              return [
                                                "".concat(value),
                                                "Value",
                                              ];
                                            },
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                },
                              ),
                              (0, jsx_runtime_1.jsx)(
                                recharts_1.ResponsiveContainer,
                                {
                                  width: "50%",
                                  height: 300,
                                  children: (0, jsx_runtime_1.jsxs)(
                                    recharts_1.BarChart,
                                    {
                                      data: deviceBreakdown,
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.CartesianGrid,
                                          { strokeDasharray: "3 3" },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.XAxis,
                                          { dataKey: "device" },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.YAxis,
                                          {},
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.Tooltip,
                                          {},
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          recharts_1.Legend,
                                          {},
                                        ),
                                        (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                                          dataKey: "value",
                                          fill: "#82ca9d",
                                          name: "Value",
                                        }),
                                      ],
                                    },
                                  ),
                                },
                              ),
                            ],
                          })
                        : (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "h-full flex items-center justify-center text-muted-foreground",
                            children: "No device breakdown available",
                          }),
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
