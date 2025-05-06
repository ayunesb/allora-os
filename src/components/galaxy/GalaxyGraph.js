"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_force_graph_3d_1 = require("react-force-graph-3d");
var GalaxyGraph = function (_a) {
  var nodes = _a.nodes,
    links = _a.links,
    onNodeClick = _a.onNodeClick;
  var fgRef = (0, react_1.useRef)();
  (0, react_1.useEffect)(function () {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-150);
    }
  }, []);
  return (0, jsx_runtime_1.jsx)("div", {
    className: "h-[600px] w-full",
    children: (0, jsx_runtime_1.jsx)(react_force_graph_3d_1.default, {
      ref: fgRef,
      graphData: { nodes: nodes, links: links },
      backgroundColor: "#0A0A23",
      nodeLabel: function (node) {
        return "".concat(node.id, " (").concat(node.total_xp, " XP)");
      },
      nodeAutoColorBy: "group",
      linkDirectionalParticles: 2,
      linkDirectionalParticleSpeed: function (d) {
        return d.value * 0.001 || 0.01;
      },
      onNodeClick: onNodeClick,
      nodeCanvasObject: function (node, ctx, globalScale) {
        var label = node.name;
        var fontSize = 12 / globalScale;
        ctx.font = "".concat(fontSize, "px Inter");
        ctx.fillStyle = node.color || "white";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        // Draw badge (XP or impact score)
        if (node.type === "plugin") {
          ctx.fillStyle = "#5A67D8"; // XP badge background
          ctx.fillRect(node.x + 8, node.y - 8, 24, 14);
          ctx.fillStyle = "white";
          ctx.font = "".concat(10 / globalScale, "px Inter");
          ctx.fillText("".concat(node.xp || 0, " XP"), node.x + 10, node.y + 2);
        }
        ctx.fillStyle = "white";
        ctx.fillText(label, node.x + 10, node.y);
      },
      onNodeClick: function (node) {
        if (node.type === "plugin") {
          router.push("/plugin/".concat(node.id));
        } else if (node.type === "strategy") {
          router.push("/strategy/".concat(node.id));
        }
      },
    }),
  });
};
exports.default = GalaxyGraph;
