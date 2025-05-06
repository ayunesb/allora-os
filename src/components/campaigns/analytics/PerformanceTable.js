"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceTable = PerformanceTable;
var jsx_runtime_1 = require("react/jsx-runtime");
var table_1 = require("@/components/ui/table");
var formatters_1 = require("@/utils/formatters");
function PerformanceTable(_a) {
  var data = _a.data,
    totalMetrics = _a.totalMetrics;
  // Calculate percentages of total for each row if totalMetrics is provided
  var calculatePercentage = function (value, total) {
    if (!total) return 0;
    return (value / total) * 100;
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "overflow-auto",
    children: (0, jsx_runtime_1.jsxs)(table_1.Table, {
      children: [
        (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
          children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
            children: [
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                children: "Channel",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Impressions",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Clicks",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "CTR",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Conversions",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Conv. Rate",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Cost",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "Revenue",
              }),
              (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                className: "text-right",
                children: "ROI",
              }),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(table_1.TableBody, {
          children: [
            data.map(function (channel, index) {
              return (0, jsx_runtime_1.jsxs)(
                table_1.TableRow,
                {
                  children: [
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      className: "font-medium",
                      children: channel.channelName,
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      className: "text-right",
                      children: (0, formatters_1.formatNumber)(
                        channel.metrics.impressions,
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      className: "text-right",
                      children: (0, formatters_1.formatNumber)(
                        channel.metrics.clicks,
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                      className: "text-right",
                      children: [(channel.metrics.ctr * 100).toFixed(2), "%"],
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      className: "text-right",
                      children: (0, formatters_1.formatNumber)(
                        channel.metrics.conversions,
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                      className: "text-right",
                      children: [
                        (channel.metrics.conversionRate * 100).toFixed(2),
                        "%",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      className: "text-right",
                      children: (0, formatters_1.formatCurrency)(
                        channel.metrics.cost,
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                      className: "text-right",
                      children: (0, formatters_1.formatCurrency)(
                        channel.metrics.revenue,
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                      className: "text-right",
                      children: [(channel.metrics.roi * 100).toFixed(0), "%"],
                    }),
                  ],
                },
                index,
              );
            }),
            totalMetrics &&
              (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                className: "font-bold bg-muted/50",
                children: [
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    children: "Total",
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-right",
                    children: (0, formatters_1.formatNumber)(
                      totalMetrics.totalImpressions,
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-right",
                    children: (0, formatters_1.formatNumber)(
                      totalMetrics.totalClicks,
                    ),
                  }),
                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                    className: "text-right",
                    children: [
                      (
                        (totalMetrics.totalClicks /
                          totalMetrics.totalImpressions) *
                        100
                      ).toFixed(2),
                      "%",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-right",
                    children: (0, formatters_1.formatNumber)(
                      totalMetrics.totalConversions,
                    ),
                  }),
                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                    className: "text-right",
                    children: [
                      (
                        (totalMetrics.totalConversions /
                          totalMetrics.totalClicks) *
                        100
                      ).toFixed(2),
                      "%",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-right",
                    children: (0, formatters_1.formatCurrency)(
                      totalMetrics.totalCost,
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                    className: "text-right",
                    children: (0, formatters_1.formatCurrency)(
                      totalMetrics.totalRevenue,
                    ),
                  }),
                  (0, jsx_runtime_1.jsxs)(table_1.TableCell, {
                    className: "text-right",
                    children: [
                      (
                        (totalMetrics.totalRevenue / totalMetrics.totalCost -
                          1) *
                        100
                      ).toFixed(0),
                      "%",
                    ],
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}
