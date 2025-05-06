"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var AgentPerformanceModal_1 = require("@/components/agents/AgentPerformanceModal");
// ...existing code...
var _a = (0, react_1.useState)(false),
  showAgentModal = _a[0],
  setShowAgentModal = _a[1];
var _b = (0, react_1.useState)(null),
  selectedPluginName = _b[0],
  setSelectedPluginName = _b[1];
var onNodeClick = function (node) {
  if (node.type === "plugin") {
    setSelectedPluginName(node.name);
    setShowAgentModal(true);
  }
};
// ...existing code...
(0, jsx_runtime_1.jsx)(AgentPerformanceModal_1.AgentPerformanceModal, {
  open: showAgentModal,
  onClose: function () {
    return setShowAgentModal(false);
  },
  pluginName: selectedPluginName,
});
