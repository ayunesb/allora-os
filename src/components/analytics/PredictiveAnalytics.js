"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictiveAnalytics = PredictiveAnalytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
var recharts_1 = require("recharts");
var lucide_react_1 = require("lucide-react");
var slider_1 = require("@/components/ui/slider");
var tooltip_1 = require("@/components/ui/tooltip");
var sonner_1 = require("sonner");
function PredictiveAnalytics(_a) {
  var onRefresh = _a.onRefresh;
  var _b = (0, react_1.useState)("leads"),
    selectedMetric = _b[0],
    setSelectedMetric = _b[1];
  var _c = (0, react_1.useState)("month"),
    timeframe = _c[0],
    setTimeframe = _c[1];
  var _d = (0, react_1.useState)(80),
    confidenceLevel = _d[0],
    setConfidenceLevel = _d[1];
  var _e = (0, react_1.useState)(false),
    isLoading = _e[0],
    setIsLoading = _e[1];
  // Sample metrics that can be predicted
  var predictableMetrics = [
    { id: "leads", name: "New Leads" },
    { id: "revenue", name: "Revenue" },
    { id: "conversion", name: "Conversion Rate" },
    { id: "retention", name: "Customer Retention" },
    { id: "engagement", name: "User Engagement" },
  ];
  // Generate sample historical and predicted data
  var generatePredictionData = function (metric, timeframe) {
    var data = [];
    var now = new Date();
    var uncertainty = (100 - confidenceLevel) / 20; // Higher confidence = narrower prediction bands
    // Historical data (past 6 periods)
    for (var i = 6; i >= 1; i--) {
      var label = void 0;
      if (timeframe === "month") {
        var pastMonth = new Date(now);
        pastMonth.setMonth(now.getMonth() - i);
        label = pastMonth.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      } else if (timeframe === "quarter") {
        var pastQuarter = new Date(now);
        pastQuarter.setMonth(now.getMonth() - i * 3);
        var quarter = Math.floor(pastQuarter.getMonth() / 3) + 1;
        label = "Q".concat(quarter, " ").concat(pastQuarter.getFullYear());
      } else {
        // year
        label = "".concat(now.getFullYear() - i);
      }
      // Base values for different metrics
      var baseValue = void 0;
      switch (metric) {
        case "leads":
          baseValue = 120 + i * 15 + Math.random() * 30;
          break;
        case "revenue":
          baseValue = 20000 + i * 1000 + Math.random() * 5000;
          break;
        case "conversion":
          baseValue = 3 + i * 0.2 + Math.random() * 1;
          break;
        case "retention":
          baseValue = 80 + i * 0.5 + Math.random() * 5;
          break;
        case "engagement":
          baseValue = 45 + i * 2 + Math.random() * 10;
          break;
        default:
          baseValue = 100 + i * 10 + Math.random() * 20;
      }
      data.push({
        period: label,
        actual: baseValue,
        predicted: baseValue,
        lower: baseValue,
        upper: baseValue,
      });
    }
    // Predicted data (next 6 periods)
    for (var i = 1; i <= 6; i++) {
      var label = void 0;
      if (timeframe === "month") {
        var futureMonth = new Date(now);
        futureMonth.setMonth(now.getMonth() + i);
        label = futureMonth.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      } else if (timeframe === "quarter") {
        var futureQuarter = new Date(now);
        futureQuarter.setMonth(now.getMonth() + i * 3);
        var quarter = Math.floor(futureQuarter.getMonth() / 3) + 1;
        label = "Q".concat(quarter, " ").concat(futureQuarter.getFullYear());
      } else {
        // year
        label = "".concat(now.getFullYear() + i);
      }
      // Predict future values with upward trend + noise
      // Last historical data point
      var lastHistorical = data[data.length - 1].actual || 0;
      // Create growth patterns based on metric type
      var predictedValue = void 0;
      var range = void 0;
      switch (metric) {
        case "leads":
          // Leads grow linearly with some seasonal variation
          predictedValue = lastHistorical + i * 18 + Math.sin(i) * 15;
          range = predictedValue * uncertainty * 0.3;
          break;
        case "revenue":
          // Revenue grows exponentially
          predictedValue =
            lastHistorical * (1 + 0.05 * i + Math.random() * 0.02);
          range = predictedValue * uncertainty * 0.4;
          break;
        case "conversion":
          // Conversion rate grows but plateaus
          predictedValue = lastHistorical + 1 / (i + 2) + Math.random() * 0.5;
          predictedValue = Math.min(predictedValue, 12); // Cap at 12%
          range = 2 * uncertainty;
          break;
        case "retention":
          // Retention rate improves but plateaus
          predictedValue =
            lastHistorical +
            (i * 0.8) / (1 + i * 0.2) +
            (Math.random() * 1 - 0.5);
          predictedValue = Math.min(predictedValue, 98); // Cap at 98%
          range = 5 * uncertainty;
          break;
        case "engagement":
          // Engagement grows with seasonal dips
          predictedValue = lastHistorical + i * 2.5 - Math.cos(i) * 8;
          range = predictedValue * uncertainty * 0.25;
          break;
        default:
          predictedValue = lastHistorical + i * 10 + (Math.random() * 10 - 5);
          range = predictedValue * uncertainty * 0.3;
      }
      data.push({
        period: label,
        predicted: predictedValue,
        lower: predictedValue - range,
        upper: predictedValue + range,
      });
    }
    return data;
  };
  var _f = (0, react_1.useState)(
      generatePredictionData(selectedMetric, timeframe),
    ),
    predictionData = _f[0],
    setPredictionData = _f[1];
  var regeneratePredictions = function () {
    setIsLoading(true);
    // Simulate an API call
    setTimeout(function () {
      var newData = generatePredictionData(selectedMetric, timeframe);
      setPredictionData(newData);
      setIsLoading(false);
      sonner_1.toast.success("Predictive models updated");
    }, 1500);
  };
  // Handle metric change
  var handleMetricChange = function (value) {
    setSelectedMetric(value);
    setPredictionData(generatePredictionData(value, timeframe));
  };
  // Handle timeframe change
  var handleTimeframeChange = function (value) {
    setTimeframe(value);
    setPredictionData(generatePredictionData(selectedMetric, value));
  };
  // Handle confidence level change
  var handleConfidenceLevelChange = function (value) {
    setConfidenceLevel(value[0]);
    // Only regenerate predictions when slider is released
  };
  // Format the y-axis values based on the selected metric
  var formatYAxis = function (value) {
    switch (selectedMetric) {
      case "revenue":
        return "$".concat((value / 1000).toFixed(0), "k");
      case "conversion":
      case "retention":
        return "".concat(value.toFixed(1), "%");
      default:
        return value.toFixed(0);
    }
  };
  // Format tooltip values
  var formatTooltipValue = function (value) {
    switch (selectedMetric) {
      case "revenue":
        return "$".concat(value.toLocaleString());
      case "conversion":
      case "retention":
        return "".concat(value.toFixed(1), "%");
      default:
        return value.toFixed(0);
    }
  };
  // Get a human-readable metric name
  var getMetricName = function () {
    var metric = predictableMetrics.find(function (m) {
      return m.id === selectedMetric;
    });
    return metric ? metric.name : selectedMetric;
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                className: "mr-2 h-5 w-5 text-primary",
              }),
              "Predictive Analytics",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "AI-powered forecasting of future business metrics based on historical data",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col md:flex-row gap-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "w-full md:w-1/3",
                children: [
                  (0, jsx_runtime_1.jsx)("label", {
                    className: "text-sm font-medium mb-1 block",
                    children: "Metric to Predict",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value: selectedMetric,
                    onValueChange: handleMetricChange,
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                        children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                          placeholder: "Select metric",
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                        children: predictableMetrics.map(function (metric) {
                          return (0, jsx_runtime_1.jsx)(
                            select_1.SelectItem,
                            { value: metric.id, children: metric.name },
                            metric.id,
                          );
                        }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "w-full md:w-1/3",
                children: [
                  (0, jsx_runtime_1.jsx)("label", {
                    className: "text-sm font-medium mb-1 block",
                    children: "Forecast Timeframe",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    value: timeframe,
                    onValueChange: handleTimeframeChange,
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                        children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                          placeholder: "Select timeframe",
                        }),
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "month",
                            children: "Monthly",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "quarter",
                            children: "Quarterly",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "year",
                            children: "Yearly",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "w-full md:w-1/3",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between items-center mb-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("label", {
                        className: "text-sm font-medium",
                        children: ["Confidence Level: ", confidenceLevel, "%"],
                      }),
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                        children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                          children: [
                            (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                              asChild: true,
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.Info,
                                { className: "h-4 w-4 text-muted-foreground" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                              children: (0, jsx_runtime_1.jsx)("p", {
                                className: "max-w-xs",
                                children:
                                  "Higher confidence levels result in wider prediction ranges. Lower values give narrower ranges but higher uncertainty.",
                              }),
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                    defaultValue: [confidenceLevel],
                    max: 95,
                    min: 50,
                    step: 5,
                    onValueChange: handleConfidenceLevelChange,
                    onValueCommit: function () {
                      return setPredictionData(
                        generatePredictionData(selectedMetric, timeframe),
                      );
                    },
                    className: "mt-2",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "my-4 h-80",
            children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
              width: "100%",
              height: "100%",
              children: (0, jsx_runtime_1.jsxs)(recharts_1.AreaChart, {
                data: predictionData,
                margin: { top: 10, right: 30, left: 0, bottom: 0 },
                children: [
                  (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                    strokeDasharray: "3 3",
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                    dataKey: "period",
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                    tickFormatter: formatYAxis,
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
                    formatter: function (value) {
                      return [formatTooltipValue(value), getMetricName()];
                    },
                    labelFormatter: function (label) {
                      return "Period: ".concat(label);
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
                  (0, jsx_runtime_1.jsxs)("defs", {
                    children: [
                      (0, jsx_runtime_1.jsxs)("linearGradient", {
                        id: "actualGradient",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                          (0, jsx_runtime_1.jsx)("stop", {
                            offset: "5%",
                            stopColor: "#8884d8",
                            stopOpacity: 0.8,
                          }),
                          (0, jsx_runtime_1.jsx)("stop", {
                            offset: "95%",
                            stopColor: "#8884d8",
                            stopOpacity: 0,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("linearGradient", {
                        id: "predictedGradient",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                          (0, jsx_runtime_1.jsx)("stop", {
                            offset: "5%",
                            stopColor: "#82ca9d",
                            stopOpacity: 0.8,
                          }),
                          (0, jsx_runtime_1.jsx)("stop", {
                            offset: "95%",
                            stopColor: "#82ca9d",
                            stopOpacity: 0,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("linearGradient", {
                        id: "rangeGradient",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                          (0, jsx_runtime_1.jsx)("stop", {
                            offset: "5%",
                            stopColor: "#ffc658",
                            stopOpacity: 0.3,
                          }),
                          (0, jsx_runtime_1.jsx)("stop", {
                            offset: "95%",
                            stopColor: "#ffc658",
                            stopOpacity: 0,
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                    type: "monotone",
                    dataKey: "actual",
                    stroke: "#8884d8",
                    fillOpacity: 1,
                    fill: "url(#actualGradient)",
                    name: "Historical",
                    activeDot: { r: 8 },
                    isAnimationActive: true,
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                    type: "monotone",
                    dataKey: "predicted",
                    stroke: "#82ca9d",
                    fillOpacity: 1,
                    fill: "url(#predictedGradient)",
                    name: "Predicted",
                    strokeDasharray: "5 5",
                    strokeWidth: 2,
                    isAnimationActive: true,
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                    type: "monotone",
                    dataKey: "upper",
                    stroke: "transparent",
                    fill: "url(#rangeGradient)",
                    fillOpacity: 1,
                    name: "Upper Bound",
                    isAnimationActive: true,
                    hide: true,
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                    type: "monotone",
                    dataKey: "lower",
                    stroke: "transparent",
                    fill: "url(#rangeGradient)",
                    fillOpacity: 1,
                    name: "Lower Bound",
                    isAnimationActive: true,
                    hide: true,
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                    type: "monotone",
                    dataKey: "upper",
                    stroke: "#ffc658",
                    strokeDasharray: "3 3",
                    strokeWidth: 1,
                    fill: "url(#rangeGradient)",
                    fillOpacity: 1,
                    name: "Confidence Range",
                    isAnimationActive: true,
                    activeDot: false,
                  }),
                  (0, jsx_runtime_1.jsx)(recharts_1.Area, {
                    type: "monotone",
                    dataKey: "lower",
                    stroke: "#ffc658",
                    strokeDasharray: "3 3",
                    strokeWidth: 1,
                    fill: "transparent",
                    isAnimationActive: true,
                    activeDot: false,
                    hide: true,
                  }),
                ],
              }),
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-muted/50 p-3 rounded-md flex items-start space-x-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                className: "h-5 w-5 text-amber-500 mt-0.5",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-sm",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: "Note:",
                  }),
                  " ",
                  "Predictions are based on historical data and AI modeling. Actual results may vary. The confidence interval (",
                  confidenceLevel,
                  "%) indicates the range within which future values are expected to fall.",
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "flex justify-end",
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "outline",
          onClick: regeneratePredictions,
          disabled: isLoading,
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
              className: "mr-2 h-4 w-4 ".concat(
                isLoading ? "animate-spin" : "",
              ),
            }),
            isLoading ? "Updating..." : "Refresh Forecast",
          ],
        }),
      }),
    ],
  });
}
