"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalaxyPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var GalaxyGraph_1 = require("@/components/galaxy/GalaxyGraph");
var InspectorSidebar_1 = require("@/components/galaxy/InspectorSidebar");
var AgentVotePanel_1 = require("@/components/AgentVotePanel");
var agentUtils_1 = require("@/utils/agentUtils"); // Import the XP modifier function
function GalaxyPage() {
  var _this = this;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)(null),
    hoveredNodeId = _a[0],
    setHoveredNodeId = _a[1];
  var _b = (0, react_1.useState)(null),
    hoveredNodeData = _b[0],
    setHoveredNodeData = _b[1]; // Store hovered node data
  var handleNodeClick = function (node) {
    if (node.type === "plugin") {
      navigate("/plugin/".concat(node.id));
    } else if (node.type === "strategy") {
      navigate("/strategy/".concat(node.id));
    }
  };
  var handleNodeHover = function (node) {
    setHoveredNodeId(
      (node === null || node === void 0 ? void 0 : node.id) || null,
    );
    setHoveredNodeData(node || null); // Update hovered node data
  };
  var handleVote = function (vote) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (
              !(
                (hoveredNodeData === null || hoveredNodeData === void 0
                  ? void 0
                  : hoveredNodeData.type) === "strategy"
              )
            )
              return [3 /*break*/, 2];
            return [
              4 /*yield*/,
              (0, agentUtils_1.applyAgentVote)(hoveredNodeData.agentId, vote),
            ];
          case 1:
            _a.sent(); // Apply vote
            _a.label = 2;
          case 2:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-6 flex",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold mb-4",
            children: "Galaxy Explorer",
          }),
          (0, jsx_runtime_1.jsx)(GalaxyGraph_1.default, {
            onNodeClick: handleNodeClick,
            linkDirectionalParticles: 2,
            linkDirectionalParticleSpeed: function (d) {
              return d.value * 0.001;
            },
            linkDirectionalArrowLength: 4,
            linkDirectionalArrowRelPos: 1,
            nodeColor: function (node) {
              return node.type === "plugin" ? "#6366f1" : "#22d3ee";
            },
            nodeVal: function (node) {
              return node.xp || 1;
            },
            nodeCanvasObject: function (node, ctx, globalScale) {
              var _a;
              var label = ""
                .concat(node.name, " (")
                .concat(node.xp || 0, " XP)");
              if (
                node.type === "strategy" &&
                ((_a = node.versionHistory) === null || _a === void 0
                  ? void 0
                  : _a.length) > 1
              ) {
                ctx.shadowColor = "gold";
                ctx.shadowBlur = 20;
              } else {
                ctx.shadowBlur = 0;
              }
              ctx.fillStyle = node.id === hoveredNodeId ? "#5A67D8" : "#999";
              ctx.beginPath();
              ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
              ctx.fill();
              ctx.shadowBlur = 0; // Reset shadowBlur after drawing
              ctx.fillStyle = "#fff";
              ctx.font = "".concat(12 / globalScale, "px Inter");
              ctx.fillText(label, node.x + 10, node.y + 5);
            },
            linkWidth: function (link) {
              return link.impact || 1;
            },
            linkColor: function (link) {
              return link.type === "plugin-strategy" ? "#7dd3fc" : "#f472b6";
            },
            onNodeHover: handleNodeHover,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(InspectorSidebar_1.InspectorSidebar, {
        data: hoveredNodeData,
        onClose: function () {
          return setHoveredNodeId(null);
        },
        onNodeHover: handleNodeHover,
        children:
          hoveredNodeData &&
          hoveredNodeData.type === "strategy" &&
          (0, jsx_runtime_1.jsx)(AgentVotePanel_1.AgentVotePanel, {
            logId: hoveredNodeData.logId,
            agentId: hoveredNodeData.agentId,
            xp: hoveredNodeData.xp,
            version: hoveredNodeData.version,
            onVote: handleVote,
            renderVersionBadge: function (version) {
              return (0, jsx_runtime_1.jsx)("span", {
                className:
                  "bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full",
                children: version,
              });
            },
            renderXPBar: function (xp) {
              return (0, jsx_runtime_1.jsx)("div", {
                className: "w-full bg-gray-200 rounded-full h-2.5",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-200",
                  style: { width: "".concat(Math.min(xp / 100, 1) * 100, "%") },
                }),
              });
            },
          }),
      }),
    ],
  });
}
