"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedVisualization = EnhancedVisualization;
var jsx_runtime_1 = require("react/jsx-runtime");
var recharts_1 = require("recharts");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#4BC0C0",
  "#36A2EB",
  "#9966FF",
];
function EnhancedVisualization(_a) {
  var type = _a.type,
    data = _a.data,
    title = _a.title,
    description = _a.description,
    _b = _a.config,
    config = _b === void 0 ? {} : _b;
  var renderVisualization = function () {
    switch (type) {
      case "treemap":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 350,
          children: (0, jsx_runtime_1.jsx)(recharts_1.Treemap, {
            data: data,
            dataKey: "value",
            nameKey: "name",
            aspectRatio: 4 / 3,
            stroke: "#fff",
            fill: "#8884d8",
            children: (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
              formatter: function (value) {
                return ["".concat(value), "Value"];
              },
            }),
          }),
        });
      case "funnel":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 350,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.FunnelChart, {
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.Funnel, {
                dataKey: "value",
                data: data,
                isAnimationActive: true,
                fill: COLORS[0],
                children: (0, jsx_runtime_1.jsx)(recharts_1.LabelList, {
                  position: "right",
                  fill: "#000",
                  stroke: "none",
                  dataKey: "name",
                }),
              }),
            ],
          }),
        });
      case "bubble":
        return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
          width: "100%",
          height: 350,
          children: (0, jsx_runtime_1.jsxs)(recharts_1.ScatterChart, {
            margin: { top: 20, right: 20, bottom: 20, left: 20 },
            children: [
              (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {}),
              (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                type: "number",
                dataKey: "x",
                name: config.xAxisName || "X",
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                type: "number",
                dataKey: "y",
                name: config.yAxisName || "Y",
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.ZAxis, {
                type: "number",
                dataKey: "z",
                range: [60, 400],
                name: config.zAxisName || "Z",
              }),
              (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
                cursor: { strokeDasharray: "3 3" },
              }),
              data.map(function (group, index) {
                return (0, jsx_runtime_1.jsx)(
                  recharts_1.Scatter,
                  {
                    name: group.name,
                    data: group.data,
                    fill: COLORS[index % COLORS.length],
                  },
                  index,
                );
              }),
            ],
          }),
        });
      case "heatmap":
        // Render a simple heatmap visualization (using a styled grid of divs)
        return (0, jsx_runtime_1.jsx)("div", {
          className: "w-full h-[350px] overflow-auto",
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "grid grid-cols-10 gap-1",
            children: data.map(function (cell, index) {
              return (0, jsx_runtime_1.jsx)(
                "div",
                {
                  className: "aspect-square rounded",
                  style: {
                    backgroundColor: calculateHeatColor(
                      cell.value,
                      config.min || 0,
                      config.max || 100,
                    ),
                    opacity: 0.8,
                  },
                  title: "".concat(cell.name, ": ").concat(cell.value),
                },
                index,
              );
            }),
          }),
        });
      default:
        return (0, jsx_runtime_1.jsx)("div", {
          children: "Visualization type not supported",
        });
    }
  };
  var calculateHeatColor = function (value, min, max) {
    // Calculate color based on value relative to min/max
    var ratio = (value - min) / (max - min);
    // Generate color from blue (cold) to red (hot)
    var hue = (1 - ratio) * 240;
    return "hsl(".concat(hue, ", 80%, 60%)");
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                className: "mr-2 h-5 w-5 text-primary",
              }),
              title,
            ],
          }),
          description &&
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: description,
            }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: renderVisualization(),
      }),
    ],
  });
}
