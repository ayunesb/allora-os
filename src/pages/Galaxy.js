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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GalaxyPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var GalaxyGraph_1 = require("@/components/galaxy/GalaxyGraph");
var supabase_js_1 = require("@supabase/supabase-js");
var supabase = (0, supabase_js_1.createClient)(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
function GalaxyPage() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    nodes = _a[0],
    setNodes = _a[1];
  var _b = (0, react_1.useState)([]),
    links = _b[0],
    setLinks = _b[1];
  (0, react_1.useEffect)(function () {
    var fetchGraphData = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var plugins,
          strategies,
          agentLinks,
          pluginNodes,
          strategyNodes,
          pluginToStrategyLinks,
          agentToPluginLinks,
          agentNodes;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, supabase.from("plugins").select("*")];
            case 1:
              plugins = _a.sent().data;
              return [4 /*yield*/, supabase.from("strategies").select("*")];
            case 2:
              strategies = _a.sent().data;
              return [
                4 /*yield*/,
                supabase.from("plugin_logs").select("plugin_id, agent_id"),
              ];
            case 3:
              agentLinks = _a.sent().data;
              pluginNodes =
                (plugins === null || plugins === void 0
                  ? void 0
                  : plugins.map(function (p) {
                      return { id: p.name, group: "plugin" };
                    })) || [];
              strategyNodes =
                (strategies === null || strategies === void 0
                  ? void 0
                  : strategies.map(function (s) {
                      return { id: s.title, group: "strategy" };
                    })) || [];
              pluginToStrategyLinks =
                (strategies === null || strategies === void 0
                  ? void 0
                  : strategies.flatMap(function (s) {
                      var _a;
                      return (_a = s.plugin_ids) === null || _a === void 0
                        ? void 0
                        : _a
                            .map(function (pluginId) {
                              var plugin = plugins.find(function (p) {
                                return p.id === pluginId;
                              });
                              return plugin
                                ? { source: plugin.name, target: s.title }
                                : null;
                            })
                            .filter(Boolean);
                    })) || [];
              agentToPluginLinks =
                (agentLinks === null || agentLinks === void 0
                  ? void 0
                  : agentLinks
                      .map(function (log) {
                        var _a;
                        return {
                          source: "agent:".concat(log.agent_id),
                          target:
                            (_a = plugins.find(function (p) {
                              return p.id === log.plugin_id;
                            })) === null || _a === void 0
                              ? void 0
                              : _a.name,
                        };
                      })
                      .filter(function (l) {
                        return l.target;
                      })) || [];
              agentNodes = __spreadArray(
                [],
                new Set(
                  agentLinks === null || agentLinks === void 0
                    ? void 0
                    : agentLinks.map(function (l) {
                        return "agent:".concat(l.agent_id);
                      }),
                ),
                true,
              ).map(function (id) {
                return {
                  id: id,
                  group: "agent",
                };
              });
              setNodes(
                __spreadArray(
                  __spreadArray(
                    __spreadArray([], pluginNodes, true),
                    strategyNodes,
                    true,
                  ),
                  agentNodes,
                  true,
                ),
              );
              setLinks(
                __spreadArray(
                  __spreadArray([], pluginToStrategyLinks, true),
                  agentToPluginLinks,
                  true,
                ),
              );
              return [2 /*return*/];
          }
        });
      });
    };
    fetchGraphData();
  }, []);
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-2xl font-bold mb-4",
        children: "Galaxy Explorer",
      }),
      (0, jsx_runtime_1.jsx)(GalaxyGraph_1.default, {
        nodes: nodes,
        links: links,
      }),
    ],
  });
}
