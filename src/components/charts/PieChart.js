"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieChart = PieChart;
var jsx_runtime_1 = require("react/jsx-runtime");
var recharts_1 = require("recharts");
function PieChart(_a) {
  var data = _a.data,
    category = _a.category,
    index = _a.index,
    _b = _a.colors,
    colors =
      _b === void 0
        ? ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]
        : _b,
    valueFormatter = _a.valueFormatter,
    className = _a.className;
  var formatValue =
    valueFormatter ||
    function (value) {
      return "".concat(value);
    };
  return (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
    width: "100%",
    height: 300,
    className: className,
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
          dataKey: category,
          nameKey: index,
          children: data.map(function (entry, index) {
            return (0, jsx_runtime_1.jsx)(
              recharts_1.Cell,
              { fill: colors[index % colors.length] },
              "cell-".concat(index),
            );
          }),
        }),
        (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {
          formatter: function (value) {
            return formatValue(Number(value));
          },
        }),
        (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
      ],
    }),
  });
}
