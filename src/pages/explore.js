"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExploreGalaxy;
var jsx_runtime_1 = require("react/jsx-runtime");
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var ForceGraph2D = (0, dynamic_1.default)(
  function () {
    return Promise.resolve()
      .then(function () {
        return require("react-force-graph");
      })
      .then(function (mod) {
        return mod.ForceGraph2D;
      });
  },
  {
    ssr: false,
  },
);
function ExploreGalaxy() {
  var data = (0, react_1.useMemo)(function () {
    return {
      nodes: [
        { id: "CEO_Agent", group: "agent", name: "AI CEO" },
        { id: "Growth_Agent", group: "agent", name: "Growth" },
        { id: "Tenant_X", group: "workspace", name: "Startup A" },
        { id: "Strategy_1", group: "strategy", name: "Launch Campaign" },
      ],
      links: [
        { source: "Tenant_X", target: "CEO_Agent" },
        { source: "CEO_Agent", target: "Strategy_1" },
        { source: "Strategy_1", target: "Growth_Agent" },
      ],
    };
  }, []);
  return (0, jsx_runtime_1.jsx)("div", {
    className: "h-screen bg-black text-white",
    children: (0, jsx_runtime_1.jsx)(ForceGraph2D, {
      graphData: data,
      nodeLabel: "name",
      nodeAutoColorBy: "group",
      linkDirectionalParticles: 2,
      linkDirectionalArrowLength: 4,
      onNodeClick: function (node) {
        var _a;
        if (
          (_a = node.id) === null || _a === void 0
            ? void 0
            : _a.toString().includes("Tenant")
        ) {
          window.location.href = "/startup/".concat(node.id);
        }
      },
    }),
  });
}
