"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricCard = MetricCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
function MetricCard(_a) {
  var title = _a.title,
    value = _a.value,
    change = _a.change,
    icon = _a.icon,
    _b = _a.invertChange,
    invertChange = _b === void 0 ? false : _b;
  // If invertChange is true, positive changes are bad (like costs increasing)
  var isPositive = invertChange ? change < 0 : change > 0;
  var displayChange = Math.abs(change).toFixed(1);
  var getIcon = function () {
    switch (icon) {
      case "eye":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
          className: "h-4 w-4",
        });
      case "mouse-pointer":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.MousePointer, {
          className: "h-4 w-4",
        });
      case "check-circle":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
          className: "h-4 w-4",
        });
      case "dollar-sign":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, {
          className: "h-4 w-4",
        });
      case "percent":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Percent, {
          className: "h-4 w-4",
        });
      case "credit-card":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, {
          className: "h-4 w-4",
        });
      case "trending-up":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
          className: "h-4 w-4",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
          className: "h-4 w-4",
        });
    }
  };
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "pt-6",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center mb-2",
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              className: "text-sm font-medium text-muted-foreground",
              children: title,
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "p-1 rounded-full bg-muted",
              children: getIcon(),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "text-2xl font-bold",
          children: value,
        }),
        change !== 0 &&
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center mt-1 text-xs font-medium ".concat(
              isPositive ? "text-green-600" : "text-red-600",
            ),
            children: [
              isPositive
                ? (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                    className: "mr-1 h-3 w-3",
                  })
                : (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingDown, {
                    className: "mr-1 h-3 w-3",
                  }),
              (0, jsx_runtime_1.jsxs)("span", {
                children: [displayChange, "% vs. previous period"],
              }),
            ],
          }),
      ],
    }),
  });
}
