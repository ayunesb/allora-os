"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var recharts_1 = require("recharts");
var AnalyticsChart = function (_a) {
  var title = _a.title,
    description = _a.description,
    chartType = _a.chartType,
    data = _a.data,
    dataKeys = _a.dataKeys,
    colors = _a.colors,
    xAxisDataKey = _a.xAxisDataKey,
    _b = _a.nameKey,
    nameKey = _b === void 0 ? "name" : _b;
  var renderChart = function () {
    switch (chartType) {
      case "line":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 300,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
            data: data,
            margin: { top: 5, right: 30, left: 20, bottom: 5 },
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                strokeDasharray: "3 3",
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                dataKey: xAxisDataKey,
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
              dataKeys.map(function (key, index) {
                return (0, jsx_runtime_1.jsx)(
                  recharts_1.Line,
                  {
                    type: "monotone",
                    dataKey: key,
                    stroke: colors[index % colors.length],
                    activeDot: { r: 8 },
                  },
                  key,
                );
              }),
            ],
          }),
        });
      case "area":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 300,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.AreaChart, {
            data: data,
            margin: { top: 5, right: 30, left: 20, bottom: 5 },
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                strokeDasharray: "3 3",
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                dataKey: xAxisDataKey,
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
              dataKeys.map(function (key, index) {
                return (0, jsx_runtime_1.jsx)(
                  recharts_1.Area,
                  {
                    type: "monotone",
                    dataKey: key,
                    fill: colors[index % colors.length],
                    stroke: colors[index % colors.length],
                  },
                  key,
                );
              }),
            ],
          }),
        });
      case "bar":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 300,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
            data: data,
            margin: { top: 5, right: 30, left: 20, bottom: 5 },
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                strokeDasharray: "3 3",
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                dataKey: xAxisDataKey,
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
              dataKeys.map(function (key, index) {
                return (0, jsx_runtime_1.jsx)(
                  recharts_1.Bar,
                  { dataKey: key, fill: colors[index % colors.length] },
                  key,
                );
              }),
            ],
          }),
        });
      case "pie":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 300,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, {
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                data: data,
                cx: "50%",
                cy: "50%",
                labelLine: true,
                label: function (_a) {
                  var name = _a.name,
                    percent = _a.percent;
                  return ""
                    .concat(name, ": ")
                    .concat((percent * 100).toFixed(0), "%");
                },
                outerRadius: 80,
                fill: "#8884d8",
                dataKey: dataKeys[0],
                nameKey: nameKey,
                children: data.map(function (entry, index) {
                  return (0, jsx_runtime_1.jsx)(
                    recharts_1.Cell,
                    { fill: colors[index % colors.length] },
                    "cell-".concat(index),
                  );
                }),
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
            ],
          }),
        });
      case "radialBar":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 300,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.RadialBarChart, {
            cx: "50%",
            cy: "50%",
            innerRadius: "10%",
            outerRadius: "80%",
            barSize: 20,
            data: data,
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.RadialBar, {
                label: { position: "insideStart", fill: "#fff" },
                background: true,
                dataKey: dataKeys[0],
                children: data.map(function (entry, index) {
                  return (0, jsx_runtime_1.jsx)(
                    recharts_1.Cell,
                    { fill: colors[index % colors.length] },
                    "cell-".concat(index),
                  );
                }),
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.Legend, {
                iconSize: 10,
                layout: "vertical",
                verticalAlign: "middle",
                wrapperStyle: {
                  top: "50%",
                  right: 0,
                  transform: "translate(0, -50%)",
                  lineHeight: "24px",
                },
                formatter: function (value, entry, index) {
                  // Display the name from our data instead
                  return data[index % data.length][nameKey];
                },
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
            ],
          }),
        });
      default:
        return (0, jsx_runtime_1.jsx)("div", {
          children: "Chart type not supported",
        });
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      title &&
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium",
          children: title,
        }),
      description &&
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-sm text-muted-foreground",
          children: description,
        }),
      renderChart(),
    ],
  });
};
exports.default = AnalyticsChart;
