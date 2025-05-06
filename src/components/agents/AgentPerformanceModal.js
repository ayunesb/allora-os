"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPerformanceModal = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var AgentPerformanceDashboard_1 = require("./AgentPerformanceDashboard");
var AgentPerformanceModal = function (_a) {
  var open = _a.open,
    onClose = _a.onClose,
    pluginName = _a.pluginName;
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: open,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsx)(dialog_1.DialogContent, {
      className: "max-w-4xl w-full max-h-[90vh] overflow-y-auto",
      children: (0, jsx_runtime_1.jsx)(
        AgentPerformanceDashboard_1.AgentPerformanceDashboard,
        { pluginFilter: pluginName },
      ),
    }),
  });
};
exports.AgentPerformanceModal = AgentPerformanceModal;
