"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversionFunnel = ConversionFunnel;
var jsx_runtime_1 = require("react/jsx-runtime");
var formatters_1 = require("@/utils/formatters");
function ConversionFunnel(_a) {
  var data = _a.data;
  // Calculate percentages and drop-offs
  var clickRate = data.clicks / data.impressions;
  var leadRate = data.leads ? data.leads / data.clicks : undefined;
  var opportunityRate =
    data.opportunities && data.leads
      ? data.opportunities / data.leads
      : undefined;
  var conversionRate = data.opportunities
    ? data.conversions / data.opportunities
    : data.conversions / data.clicks;
  // Calculate widths for funnel visualization
  var maxWidth = 100;
  var clickWidth = maxWidth * 0.8;
  var leadWidth = leadRate ? clickWidth * 0.7 : 0;
  var opportunityWidth = opportunityRate ? leadWidth * 0.6 : 0;
  var conversionWidth = clickWidth * 0.4;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col items-center space-y-6",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "w-full",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between text-sm mb-1",
              children: [
                (0, jsx_runtime_1.jsx)("span", {
                  className: "font-medium",
                  children: "Impressions",
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  children: (0, formatters_1.formatNumber)(data.impressions),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-10 bg-blue-500 rounded-t-md w-full flex items-center justify-center text-white font-medium",
              children: "Impressions",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "w-full flex flex-col items-center",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-8 border-l-2 border-r-2 border-dashed border-blue-300 w-0",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-blue-300",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between text-sm mb-1 w-[80%]",
              children: [
                (0, jsx_runtime_1.jsx)("span", {
                  className: "font-medium",
                  children: "Clicks",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex space-x-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      children: (0, formatters_1.formatNumber)(data.clicks),
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-gray-500",
                      children: ["(", (clickRate * 100).toFixed(1), "%)"],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-10 bg-green-500 rounded-md flex items-center justify-center text-white font-medium",
              style: { width: "".concat(clickWidth, "%") },
              children: "Clicks",
            }),
          ],
        }),
        data.leads &&
          (0, jsx_runtime_1.jsxs)("div", {
            className: "w-full flex flex-col items-center",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-8 border-l-2 border-r-2 border-dashed border-green-300 w-0",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-green-300",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between text-sm mb-1",
                style: { width: "".concat(leadWidth, "%") },
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: "Leads",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex space-x-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: (0, formatters_1.formatNumber)(data.leads),
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        className: "text-gray-500",
                        children: ["(", (leadRate * 100).toFixed(1), "%)"],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-10 bg-purple-500 rounded-md flex items-center justify-center text-white font-medium",
                style: { width: "".concat(leadWidth, "%") },
                children: "Leads",
              }),
            ],
          }),
        data.opportunities &&
          (0, jsx_runtime_1.jsxs)("div", {
            className: "w-full flex flex-col items-center",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-8 border-l-2 border-r-2 border-dashed border-purple-300 w-0",
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-purple-300",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between text-sm mb-1",
                style: { width: "".concat(opportunityWidth, "%") },
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: "Opportunities",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex space-x-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: (0, formatters_1.formatNumber)(
                          data.opportunities,
                        ),
                      }),
                      (0, jsx_runtime_1.jsxs)("span", {
                        className: "text-gray-500",
                        children: [
                          "(",
                          (opportunityRate * 100).toFixed(1),
                          "%)",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className:
                  "h-10 bg-amber-500 rounded-md flex items-center justify-center text-white font-medium",
                style: { width: "".concat(opportunityWidth, "%") },
                children: "Opportunities",
              }),
            ],
          }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "w-full flex flex-col items-center",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-8 border-l-2 border-r-2 border-dashed border-amber-300 w-0",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-4 w-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-amber-300",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between text-sm mb-1",
              style: { width: "".concat(conversionWidth, "%") },
              children: [
                (0, jsx_runtime_1.jsx)("span", {
                  className: "font-medium",
                  children: "Conversions",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex space-x-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      children: (0, formatters_1.formatNumber)(
                        data.conversions,
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      className: "text-gray-500",
                      children: ["(", (conversionRate * 100).toFixed(1), "%)"],
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "h-10 bg-red-500 rounded-b-md flex items-center justify-center text-white font-medium",
              style: { width: "".concat(conversionWidth, "%") },
              children: "Conversions",
            }),
          ],
        }),
      ],
    }),
  });
}
