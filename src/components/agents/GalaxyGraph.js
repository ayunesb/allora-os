"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_force_graph_2d_1 = require("react-force-graph-2d");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var GalaxyGraph = function (_a) {
  var pluginFilter = _a.pluginFilter;
  var fgRef = (0, react_1.useRef)();
  var _b = (0, react_1.useState)([]),
    nodes = _b[0],
    setNodes = _b[1];
  var _c = (0, react_1.useState)([]),
    links = _c[0],
    setLinks = _c[1];
  var _d = (0, react_1.useState)(false),
    showAgentModal = _d[0],
    setShowAgentModal = _d[1];
  var _e = (0, react_1.useState)(""),
    selectedPluginName = _e[0],
    setSelectedPluginName = _e[1];
  var logAgentXP = function (agentType, taskType, context, xp) {
    return __awaiter(void 0, void 0, void 0, function () {
      var supabase, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            return [
              4 /*yield*/,
              supabase.from("agent_logs").insert({
                agent_type: agentType,
                agent_version_id: "currentVersionId", // TODO: Replace with actual version ID dynamically
                task_type: taskType,
                context: context,
                xp: xp,
              }),
            ];
          case 2:
            _a.sent();
            return [
              4 /*yield*/,
              supabase.rpc("evolve_agent_if_ready", { agent: agentType }),
            ];
          case 3:
            _a.sent();
            return [3 /*break*/, 5];
          case 4:
            error_1 = _a.sent();
            console.error("Error logging agent XP:", error_1);
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var updateNodeXP = function (name, delta) {
    setNodes(function (prevNodes) {
      var nodeExists = prevNodes.some(function (node) {
        return node.id === name;
      });
      if (!nodeExists) {
        console.warn("Node with name ".concat(name, " not found."));
        return prevNodes;
      }
      return prevNodes.map(function (node) {
        return node.id === name
          ? __assign(__assign({}, node), {
              total_xp: (node.total_xp || 0) + delta,
            })
          : node;
      });
    });
    var node = nodes.find(function (node) {
      return node.id === name;
    });
    if (node) {
      logAgentXP(
        node.agent_type || "unknown",
        "plugin_interaction",
        "Updated XP for ".concat(name),
        delta,
      );
    }
  };
  var updateAgentTypeXP = function (agentType, delta) {
    setNodes(function (prevNodes) {
      var agentExists = prevNodes.some(function (node) {
        return node.agent_type === agentType;
      });
      if (!agentExists) {
        console.warn("Agent type ".concat(agentType, " not found."));
        return prevNodes;
      }
      return prevNodes.map(function (node) {
        return node.agent_type === agentType
          ? __assign(__assign({}, node), {
              total_xp: (node.total_xp || 0) + delta,
            })
          : node;
      });
    });
    logAgentXP(
      agentType,
      "agent_type_update",
      "Updated XP for agent type ".concat(agentType),
      delta,
    );
  };
  (0, react_1.useEffect)(
    function () {
      var supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
      var fetchGraphData = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var query, _a, plugins, error, nodes_1, links_1, error_2;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2, , 3]);
                query = supabase
                  .from("plugin_logs")
                  .select("plugin_name, total_xp, agent_type");
                if (pluginFilter) {
                  query.filter("plugin_name", "eq", pluginFilter);
                }
                return [4 /*yield*/, query];
              case 1:
                (_a = _b.sent()), (plugins = _a.data), (error = _a.error);
                if (error) throw error;
                nodes_1 = plugins.map(function (plugin) {
                  return {
                    id: plugin.plugin_name,
                    total_xp: plugin.total_xp || 0,
                    agent_type: plugin.agent_type || "unknown",
                  };
                });
                links_1 = [];
                setNodes(nodes_1);
                setLinks(links_1);
                return [3 /*break*/, 3];
              case 2:
                error_2 = _b.sent();
                console.error("Error fetching graph data:", error_2);
                return [3 /*break*/, 3];
              case 3:
                return [2 /*return*/];
            }
          });
        });
      };
      fetchGraphData();
      var sub = supabase
        .channel("plugin-logs")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "plugin_logs",
          },
          function (payload) {
            var pluginName = payload.new.plugin_name;
            var xp = payload.new.value || 0;
            var agentType = payload.new.agent_type || "unknown";
            updateNodeXP(pluginName, xp);
            updateAgentTypeXP(agentType, xp);
          },
        )
        .subscribe();
      return function () {
        supabase.removeChannel(sub);
      };
    },
    [pluginFilter],
  );
  return (0, jsx_runtime_1.jsx)(react_force_graph_2d_1.default, {
    ref: fgRef,
    graphData: { nodes: nodes, links: links },
    nodeCanvasObject: function (node, ctx, globalScale) {
      var label = node.name || node.id;
      var fontSize = 12 / globalScale;
      ctx.font = "".concat(fontSize, "px sans-serif");
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(label, node.x || 0, node.y || 0);
      if (node.total_xp) {
        ctx.fillStyle = "#10b981";
        ctx.font = "".concat(10 / globalScale, "px sans-serif");
        ctx.fillText(
          "+".concat(node.total_xp, " XP"),
          node.x || 0,
          (node.y || 0) + 14,
        );
      }
      if (node.total_xp && node.total_xp >= 100) {
        ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
        ctx.lineWidth = 4 / globalScale;
        ctx.beginPath();
        ctx.arc(node.x || 0, node.y || 0, 12, 0, 2 * Math.PI);
        ctx.stroke();
      }
      if (node.total_xp && node.total_xp > 0) {
        var radius = 10;
        var percent = Math.min(node.total_xp / 100, 1);
        ctx.beginPath();
        ctx.arc(
          node.x || 0,
          node.y || 0,
          radius,
          -Math.PI / 2,
          2 * Math.PI * percent - Math.PI / 2,
        );
        ctx.strokeStyle = "#22d3ee";
        ctx.lineWidth = 3 / globalScale;
        ctx.stroke();
      }
    },
    nodeLabel: function (node) {
      return "\n        "
        .concat(node.name || node.id, "\n        XP: ")
        .concat(node.total_xp || 0, "\n        Last Version: ")
        .concat(node.version || "v1", "\n      ");
    },
    onNodeClick: function (node) {
      if (node.total_xp && node.total_xp >= 100) {
        setShowAgentModal(true);
        setSelectedPluginName(node.name || node.id);
      }
    },
  });
};
exports.default = GalaxyGraph;
