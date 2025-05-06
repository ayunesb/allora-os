"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = KPIs;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var kpis = [
  { label: "Leads Captured", value: 312 },
  { label: "Campaign ROI", value: "168%" },
  { label: "Monthly Revenue", value: "$8,400" },
  { label: "Conversion Rate", value: "12.5%" },
];
function KPIs() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
    children: kpis.map(function (kpi, idx) {
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-sm text-muted-foreground",
                children: kpi.label,
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "text-2xl font-semibold",
                children: kpi.value,
              }),
            }),
          ],
        },
        idx,
      );
    }),
  });
}
