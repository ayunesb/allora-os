"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var SomeComponent = function (_a) {
  var selectedPluginName = _a.selectedPluginName;
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h1", { children: "Selected Plugin" }),
      (0, jsx_runtime_1.jsx)("p", {
        children: selectedPluginName
          ? selectedPluginName
          : "No plugin selected",
      }),
      (0, jsx_runtime_1.jsx)("input", {
        type: "text",
        value:
          selectedPluginName !== null && selectedPluginName !== void 0
            ? selectedPluginName
            : undefined,
      }),
    ],
  });
};
exports.default = SomeComponent;
