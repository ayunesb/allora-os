"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var recharts_1 = require("recharts");
var ForecastCharts = function (_a) {
  var forecasts = _a.forecasts,
    kpiData = _a.kpiData,
    kpiNames = _a.kpiNames;
  // Format data for charts
  var getChartData = function (kpiType) {
    var data = kpiData[kpiType] || [];
    var chartData = data.map(function (value, index) {
      return {
        period: "Period ".concat(index + 1),
        value: value,
      };
    });
    // Add forecast point if available
    if (forecasts[kpiType]) {
      chartData.push({
        period: "Forecast",
        value: forecasts[kpiType],
        isForecast: true,
      });
    }
    return chartData;
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid gap-6",
    children: Object.keys(forecasts).map(function (kpi) {
      var chartData = getChartData(kpi);
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: kpiNames[kpi] || kpi,
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "h-60",
                children: (0, jsx_runtime_1.jsx)(
                  recharts_1.ResponsiveContainer,
                  {
                    width: "100%",
                    height: "100%",
                    children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
                      data: chartData,
                      children: [
                        (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                          strokeDasharray: "3 3",
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                          dataKey: "period",
                        }),
                        (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                        (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                        (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                          type: "monotone",
                          dataKey: "value",
                          stroke: "#8884d8",
                          strokeWidth: 2,
                          dot: function (props) {
                            var cx = props.cx,
                              cy = props.cy,
                              payload = props.payload;
                            return payload.isForecast
                              ? (0, jsx_runtime_1.jsx)("svg", {
                                  x: cx - 8,
                                  y: cy - 8,
                                  width: 16,
                                  height: 16,
                                  fill: "red",
                                  children: (0, jsx_runtime_1.jsx)("circle", {
                                    cx: "8",
                                    cy: "8",
                                    r: "6",
                                  }),
                                })
                              : (0, jsx_runtime_1.jsx)("svg", {
                                  x: cx - 5,
                                  y: cy - 5,
                                  width: 10,
                                  height: 10,
                                  fill: "#8884d8",
                                  children: (0, jsx_runtime_1.jsx)("circle", {
                                    cx: "5",
                                    cy: "5",
                                    r: "4",
                                  }),
                                });
                          },
                        }),
                      ],
                    }),
                  },
                ),
              }),
            }),
          ],
        },
        kpi,
      );
    }),
  });
};
exports.default = ForecastCharts;
