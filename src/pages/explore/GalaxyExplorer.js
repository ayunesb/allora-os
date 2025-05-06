"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalaxyExplorer;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var GalaxyGraph_1 = require("@/components/galaxy/GalaxyGraph");
var InspectorSidebar_1 = require("@/components/galaxy/InspectorSidebar");
var PluginInspector_1 = require("@/components/galaxy/PluginInspector");
var PluginSkeleton_1 = require("@/components/galaxy/PluginSkeleton");
function GalaxyExplorer() {
  var _a = (0, react_1.useState)(null),
    selectedPlugin = _a[0],
    setSelectedPlugin = _a[1];
  var handleNodeClick = function (pluginNode) {
    setSelectedPlugin(pluginNode);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex h-screen bg-background text-foreground",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "w-3/4",
        children: (0, jsx_runtime_1.jsx)(GalaxyGraph_1.default, {
          onNodeClick: handleNodeClick,
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "w-1/4 border-l border-border",
        children: selectedPlugin
          ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)("button", {
                  onClick: function () {
                    return setSelectedPlugin(null);
                  },
                  className:
                    "mb-2 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-lg",
                  children: "Reset Selection",
                }),
                (0, jsx_runtime_1.jsx)(react_1.Suspense, {
                  fallback: (0, jsx_runtime_1.jsx)(
                    PluginSkeleton_1.default,
                    {},
                  ),
                  children: (0, jsx_runtime_1.jsx)(PluginInspector_1.default, {
                    plugin: selectedPlugin,
                  }),
                }),
              ],
            })
          : (0, jsx_runtime_1.jsx)(InspectorSidebar_1.default, {}),
      }),
    ],
  });
}
