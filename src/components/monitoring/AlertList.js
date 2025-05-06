"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var scroll_area_1 = require("@/components/ui/scroll-area");
var AlertItem_1 = require("./AlertItem");
var AlertList = function (_a) {
  var alerts = _a.alerts,
    onAcknowledge = _a.onAcknowledge;
  if (alerts.length === 0) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "p-4 text-center text-gray-500",
      children: "No alerts to display",
    });
  }
  return (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
    className: "h-[250px]",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "space-y-3 p-6",
      children: alerts.map(function (alert) {
        return (0, jsx_runtime_1.jsx)(
          AlertItem_1.AlertItem,
          { alert: alert, onAcknowledge: onAcknowledge },
          alert.id,
        );
      }),
    }),
  });
};
exports.AlertList = AlertList;
