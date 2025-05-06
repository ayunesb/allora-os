"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_force_graph_1 = require("react-force-graph");
var router_1 = require("next/router");
var GalaxyGraph = function (_a) {
  var data = _a.data;
  var router = (0, router_1.useRouter)();
  var handleNodeClick = function (node) {
    if (node.type === "plugin") {
      router.push("/plugin/".concat(node.id));
    } else if (node.type === "strategy") {
      router.push("/strategy/".concat(node.id));
    }
  };
  return (0, jsx_runtime_1.jsx)(react_force_graph_1.ForceGraph2D, {
    graphData: data,
    onNodeClick: function (node) {
      handleNodeClick(node);
      // any extra logic here
    },
  });
};
exports.default = GalaxyGraph;
