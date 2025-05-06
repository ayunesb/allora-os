"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineChart = LineChart;
var jsx_runtime_1 = require("react/jsx-runtime");
var recharts_1 = require("recharts");
function LineChart(_a) {
  var data = _a.data,
    categories = _a.categories,
    index = _a.index,
    _b = _a.colors,
    colors = _b === void 0 ? ["blue", "green", "purple", "orange"] : _b,
    valueFormatter = _a.valueFormatter,
    _c = _a.yAxisWidth,
    yAxisWidth = _c === void 0 ? 40 : _c,
    className = _a.className;
  // Create a formatter function that matches the expected type for Recharts
  var formatTickValue = function (value) {
    if (valueFormatter && typeof value === "number") {
      return valueFormatter(value);
    }
    return "".concat(value);
  };
  // Tooltip formatter
  var formatTooltipValue = function (value, name) {
    if (valueFormatter && typeof value === "number") {
      return [valueFormatter(value, name), name];
    }
    return ["".concat(value), name];
  };
  return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
    width: "100%",
    height: 300,
    className: className,
    children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
      data: data,
      margin: { top: 5, right: 20, left: 10, bottom: 5 },
      children: [
        (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
          strokeDasharray: "3 3",
        }),
        (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: index }),
        (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
          width: yAxisWidth,
          tickFormatter: formatTickValue,
        }),
        (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
          formatter: formatTooltipValue,
        }),
        (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
        categories.map(function (category, idx) {
          return (0, jsx_runtime_1.jsx)(
            recharts_1.Line,
            {
              type: "monotone",
              dataKey: category,
              stroke: colors[idx % colors.length],
              activeDot: { r: 8 },
            },
            category,
          );
        }),
      ],
    }),
  });
}
