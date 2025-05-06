"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarChart = BarChart;
var jsx_runtime_1 = require("react/jsx-runtime");
var recharts_1 = require("recharts");
function BarChart(_a) {
  var data = _a.data,
    categories = _a.categories,
    index = _a.index,
    _b = _a.colors,
    colors = _b === void 0 ? ["blue", "green", "purple", "orange"] : _b,
    valueFormatter = _a.valueFormatter,
    _c = _a.layout,
    layout = _c === void 0 ? "horizontal" : _c,
    className = _a.className;
  // Create a simpler formatter function that matches the expected type for Recharts
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
    children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
      data: data,
      layout: layout,
      margin: { top: 5, right: 20, left: 10, bottom: 5 },
      children: [
        (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
          strokeDasharray: "3 3",
        }),
        layout === "horizontal"
          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: index }),
                (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                  tickFormatter: formatTickValue,
                }),
              ],
            })
          : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                  type: "number",
                  tickFormatter: formatTickValue,
                }),
                (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {
                  type: "category",
                  dataKey: index,
                  width: 120,
                }),
              ],
            }),
        (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
          formatter: formatTooltipValue,
        }),
        (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
        categories.map(function (category, idx) {
          return (0, jsx_runtime_1.jsx)(
            recharts_1.Bar,
            { dataKey: category, fill: colors[idx % colors.length] },
            category,
          );
        }),
      ],
    }),
  });
}
