"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrategyImplementationTools = StrategyImplementationTools;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var ImplementationTabs_1 = require("./tabs/ImplementationTabs");
var ImplementationTabContent_1 = require("./tabs/ImplementationTabContent");
function StrategyImplementationTools(_a) {
  var strategyId = _a.strategyId,
    _b = _a.strategyName,
    strategyName = _b === void 0 ? "Current Strategy" : _b;
  var _c = (0, react_1.useState)("overview"),
    activeTab = _c[0],
    setActiveTab = _c[1];
  var handleTabChange = function (value) {
    setActiveTab(value);
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Implementation Tools",
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            children: [
              'Track and manage the implementation of "',
              strategyName,
              '"',
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)(ImplementationTabs_1.ImplementationTabs, {
            activeTab: activeTab,
            onTabChange: handleTabChange,
          }),
          (0, jsx_runtime_1.jsx)(ImplementationTabContent_1.default, {
            strategyId: strategyId,
            activeTab: activeTab,
          }),
        ],
      }),
    ],
  });
}
exports.default = StrategyImplementationTools;
