"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var progress_1 = require("@/components/ui/progress");
var badge_1 = require("@/components/ui/badge");
var tabs_1 = require("@/components/ui/tabs");
var monitoring_1 = require("@/utils/monitoring");
var recharts_1 = require("recharts");
var skeleton_1 = require("@/components/ui/skeleton");
var lucide_react_1 = require("lucide-react");
var PerformanceMetrics = function (_a) {
  var _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  var _c = (0, react_1.useState)(0),
    cpuUsage = _c[0],
    setCpuUsage = _c[1];
  var _d = (0, react_1.useState)(0),
    memoryUsage = _d[0],
    setMemoryUsage = _d[1];
  var _e = (0, react_1.useState)(0),
    apiResponseTime = _e[0],
    setApiResponseTime = _e[1];
  var _f = (0, react_1.useState)("gauges"),
    selectedTab = _f[0],
    setSelectedTab = _f[1];
  var _g = (0, react_1.useState)([]),
    timingData = _g[0],
    setTimingData = _g[1];
  // Simulate metrics for demo purposes
  (0, react_1.useEffect)(function () {
    var interval = setInterval(function () {
      // Update CPU usage (40-80%)
      var newCpu = 40 + Math.random() * 40;
      setCpuUsage(newCpu);
      monitoring_1.monitoring.setGauge("CPU Usage", newCpu, 0, 100, "%", {
        warning: 70,
        critical: 90,
      });
      // Update memory usage (30-70%)
      var newMemory = 30 + Math.random() * 40;
      setMemoryUsage(newMemory);
      monitoring_1.monitoring.setGauge("Memory Usage", newMemory, 0, 100, "%", {
        warning: 80,
        critical: 95,
      });
      // Update API response time (50-500ms)
      var newApiTime = 50 + Math.random() * 450;
      setApiResponseTime(newApiTime);
      monitoring_1.monitoring.setGauge(
        "API Response Time",
        newApiTime,
        0,
        1000,
        "ms",
        {
          warning: 300,
          critical: 800,
        },
      );
      // Simulate page load timing
      monitoring_1.monitoring.recordTiming(
        "Page Load",
        800 + Math.random() * 1200,
        "frontend",
      );
      // Update timing data
      setTimingData(monitoring_1.monitoring.getTimingMetrics());
    }, 5000);
    // Initial run
    monitoring_1.monitoring.startApiTimer("initial-load");
    // Generate some initial data
    monitoring_1.monitoring.setGauge("CPU Usage", 45, 0, 100, "%");
    monitoring_1.monitoring.setGauge("Memory Usage", 32, 0, 100, "%");
    monitoring_1.monitoring.setGauge("API Response Time", 120, 0, 1000, "ms");
    monitoring_1.monitoring.recordTiming("API Initialization", 345, "backend");
    monitoring_1.monitoring.recordTiming("Database Connection", 112, "backend");
    monitoring_1.monitoring.recordTiming("Auth Check", 89, "backend");
    setTimeout(function () {
      monitoring_1.monitoring.endApiTimer("initial-load");
    }, 500);
    return function () {
      return clearInterval(interval);
    };
  }, []);
  // Format timing data for charts
  var formattedTimingData = timingData
    .map(function (metric) {
      return {
        name: metric.name,
        duration: metric.duration,
        category: metric.category,
      };
    })
    .slice(0, 10);
  // Sample performance data for chart
  var performanceData = [
    { date: "10:00", cpu: 42, memory: 38, apiTime: 120 },
    { date: "10:05", cpu: 45, memory: 40, apiTime: 135 },
    { date: "10:10", cpu: 48, memory: 45, apiTime: 128 },
    { date: "10:15", cpu: 52, memory: 48, apiTime: 142 },
    { date: "10:20", cpu: 58, memory: 52, apiTime: 150 },
    { date: "10:25", cpu: 62, memory: 55, apiTime: 165 },
    { date: "10:30", cpu: 68, memory: 58, apiTime: 180 },
    { date: "10:35", cpu: 72, memory: 62, apiTime: 210 },
    { date: "10:40", cpu: 70, memory: 65, apiTime: 190 },
    { date: "10:45", cpu: 65, memory: 60, apiTime: 175 },
  ];
  var getStatusColor = function (value, warningThreshold, criticalThreshold) {
    if (value >= criticalThreshold) return "bg-red-500";
    if (value >= warningThreshold) return "bg-amber-500";
    return "bg-green-500";
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-8 w-[250px]",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-[300px] w-full",
          }),
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "System Performance",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Real-time metrics and performance data",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "gauges",
            value: selectedTab,
            onValueChange: setSelectedTab,
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "w-full mb-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "gauges",
                    children: "Resource Usage",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "timings",
                    children: "Response Times",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "history",
                    children: "Historical Data",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "gauges",
                className: "space-y-4",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-5",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Server, {
                                  className: "h-4 w-4 mr-2",
                                }),
                                "CPU Usage",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                              className: getStatusColor(cpuUsage, 70, 90),
                              children: [cpuUsage.toFixed(1), "%"],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: cpuUsage,
                          className: "h-2",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Database,
                                  { className: "h-4 w-4 mr-2" },
                                ),
                                "Memory Usage",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                              className: getStatusColor(memoryUsage, 80, 95),
                              children: [memoryUsage.toFixed(1), "%"],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: memoryUsage,
                          className: "h-2",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            (0, jsx_runtime_1.jsxs)("span", {
                              className: "flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Activity,
                                  { className: "h-4 w-4 mr-2" },
                                ),
                                "API Response Time",
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                              className: getStatusColor(
                                apiResponseTime,
                                300,
                                800,
                              ),
                              children: [apiResponseTime.toFixed(0), "ms"],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                          value: (apiResponseTime / 1000) * 100,
                          className: "h-2",
                        }),
                      ],
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "timings",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "h-[300px]",
                  children: (0, jsx_runtime_1.jsx)(
                    recharts_1.ResponsiveContainer,
                    {
                      width: "100%",
                      height: "100%",
                      children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
                        data: formattedTimingData,
                        margin: {
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 70,
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                            strokeDasharray: "3 3",
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                            dataKey: "name",
                            angle: -45,
                            textAnchor: "end",
                            height: 70,
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                            label: {
                              value: "Duration (ms)",
                              angle: -90,
                              position: "insideLeft",
                            },
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                          (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                            dataKey: "duration",
                            fill: "#8884d8",
                            name: "Duration (ms)",
                            isAnimationActive: false,
                          }),
                        ],
                      }),
                    },
                  ),
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "history",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "h-[300px]",
                  children: (0, jsx_runtime_1.jsx)(
                    recharts_1.ResponsiveContainer,
                    {
                      width: "100%",
                      height: "100%",
                      children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
                        data: performanceData,
                        margin: {
                          top: 20,
                          right: 20,
                          left: 20,
                          bottom: 20,
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                            strokeDasharray: "3 3",
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                            dataKey: "date",
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                            yAxisId: "left",
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                            yAxisId: "right",
                            orientation: "right",
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                          (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                            yAxisId: "left",
                            type: "monotone",
                            dataKey: "cpu",
                            name: "CPU Usage (%)",
                            stroke: "#8884d8",
                            activeDot: { r: 8 },
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                            yAxisId: "left",
                            type: "monotone",
                            dataKey: "memory",
                            name: "Memory (%)",
                            stroke: "#82ca9d",
                          }),
                          (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                            yAxisId: "right",
                            type: "monotone",
                            dataKey: "apiTime",
                            name: "API Time (ms)",
                            stroke: "#ffc658",
                          }),
                        ],
                      }),
                    },
                  ),
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "mt-4 text-xs text-muted-foreground flex items-center gap-1",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                className: "h-3 w-3",
              }),
              (0, jsx_runtime_1.jsxs)("span", {
                children: ["Last updated: ", new Date().toLocaleTimeString()],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = PerformanceMetrics;
