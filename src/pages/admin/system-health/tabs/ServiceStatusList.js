"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceStatusList;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ServiceStatusList(_a) {
  var services = _a.services,
    _b = _a.showViewAllButton,
    showViewAllButton = _b === void 0 ? true : _b,
    onViewAllClick = _a.onViewAllClick;
  // Get health status icon
  var getStatusIcon = function (status) {
    switch (status) {
      case "healthy":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
          className: "h-5 w-5 text-green-500",
        });
      case "degraded":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
          className: "h-5 w-5 text-amber-500",
        });
      case "down":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "h-5 w-5 text-red-500",
        });
      default:
        return null;
    }
  };
  // Get status color class
  var getStatusColorClass = function (status) {
    switch (status) {
      case "healthy":
        return "bg-green-50 text-green-700 border-green-200";
      case "degraded":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "down":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "";
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      services.map(function (service) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  getStatusIcon(service.status),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "ml-2",
                    children: service.name,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-sm px-2 py-1 rounded-full ".concat(
                  getStatusColorClass(service.status),
                ),
                children: service.status,
              }),
            ],
          },
          service.name,
        );
      }),
      services.length > 0 &&
        showViewAllButton &&
        (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "sm",
          className: "w-full mt-2",
          onClick: onViewAllClick,
          children: "View All Services",
        }),
    ],
  });
}
