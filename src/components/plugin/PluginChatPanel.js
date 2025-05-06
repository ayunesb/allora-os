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
exports.default = GalaxyExplorer;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var GalaxyGraph_1 = require("@/components/galaxy/GalaxyGraph");
var InspectorSidebar_1 = require("@/components/galaxy/InspectorSidebar");
var PluginInspector_1 = require("@/components/galaxy/PluginInspector");
var PluginSkeleton_1 = require("@/components/galaxy/PluginSkeleton");
var auth_helpers_nextjs_1 = require("@supabase/auth-helpers-nextjs");
var react_toastify_1 = require("react-toastify");
var canvas_confetti_1 = require("canvas-confetti");
var router_1 = require("next/router");
function GalaxyExplorer() {
  var _this = this;
  var router = (0, router_1.useRouter)();
  var _a = (0, react_1.useState)(null),
    selectedPlugin = _a[0],
    setSelectedPlugin = _a[1];
  var _b = (0, react_1.useState)([]),
    messages = _b[0],
    setMessages = _b[1];
  var _c = (0, react_1.useState)(false),
    loading = _c[0],
    setLoading = _c[1];
  var _d = (0, react_1.useState)(""),
    input = _d[0],
    setInput = _d[1];
  var _e = (0, react_1.useState)(false),
    showXpBoost = _e[0],
    setShowXpBoost = _e[1];
  var chatEndRef = react_1.default.useRef(null);
  var handleNodeClick = function (pluginNode) {
    if (pluginNode.type === "plugin") {
      router.push("/agents/performance?plugin=".concat(pluginNode.name));
    }
    setSelectedPlugin(pluginNode);
    handleXpThreshold(pluginNode); // Check XP threshold on node click
  };
  var handleXpThreshold = function (pluginNode) {
    return __awaiter(_this, void 0, void 0, function () {
      var supabase,
        _a,
        pluginData,
        fetchError,
        newVersion,
        logError,
        updateError,
        err_1;
      var _b;
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
            _c.label = 1;
          case 1:
            _c.trys.push([1, 6, , 7]);
            return [
              4 /*yield*/,
              supabase
                .from("plugin_card_with_xp")
                .select("total_xp, agent_version_id")
                .eq("id", pluginNode.id)
                .single(),
            ];
          case 2:
            (_a = _c.sent()), (pluginData = _a.data), (fetchError = _a.error);
            if (fetchError) {
              console.error("Error fetching plugin data:", fetchError);
              return [2 /*return*/];
            }
            if (!(pluginData.total_xp >= 100)) return [3 /*break*/, 5];
            newVersion = "v".concat(
              parseInt(
                ((_b = pluginData.agent_version_id) === null || _b === void 0
                  ? void 0
                  : _b.slice(1)) || "1",
              ) + 1,
            );
            return [
              4 /*yield*/,
              supabase.from("agent_evolution_logs").insert({
                agent_type: "plugin_assistant",
                from_version: pluginData.agent_version_id || "v1",
                to_version: newVersion,
              }),
            ];
          case 3:
            logError = _c.sent().error;
            if (logError) {
              console.error("Error logging evolution:", logError);
              return [2 /*return*/];
            }
            return [
              4 /*yield*/,
              supabase
                .from("plugin_card_with_xp")
                .update({ agent_version_id: newVersion, total_xp: 0 }) // Reset XP
                .eq("id", pluginNode.id),
            ];
          case 4:
            updateError = _c.sent().error;
            if (updateError) {
              console.error("Error updating plugin version:", updateError);
            } else {
              console.log(
                "Plugin "
                  .concat(pluginNode.id, " evolved to ")
                  .concat(newVersion),
              );
              (0, canvas_confetti_1.default)(); // Trigger confetti animation
              react_toastify_1.toast.success(
                "🎉 Plugin assistant evolved to a new version!",
              );
            }
            _c.label = 5;
          case 5:
            return [3 /*break*/, 7];
          case 6:
            err_1 = _c.sent();
            console.error("Error handling XP threshold:", err_1);
            return [3 /*break*/, 7];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  (0, react_1.useEffect)(function () {
    var supabase = (0, auth_helpers_nextjs_1.createClientComponentClient)();
    var fetchChatLogs = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [
                4 /*yield*/,
                supabase.from("plugin_card_with_xp").select("*"),
              ];
            case 1:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) {
                console.error("Error fetching chat logs:", error);
              } else {
                setMessages(data);
              }
              return [2 /*return*/];
          }
        });
      });
    };
    fetchChatLogs();
  }, []);
  var sendMessage = function () {
    // Implement send message logic
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
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col h-full border border-muted rounded-xl p-3 overflow-hidden",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex-1 overflow-y-auto space-y-2 pr-2",
            children: [
              messages.map(function (msg) {
                return (0, jsx_runtime_1.jsxs)(
                  "div",
                  {
                    className: "flex items-start gap-2",
                    children: [
                      msg.sender === "agent" &&
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold",
                          children: "\uD83E\uDD16",
                        }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "max-w-[85%] px-4 py-2 rounded-lg text-sm ".concat(
                            msg.sender === "user"
                              ? "ml-auto bg-primary text-primary-foreground"
                              : "mr-auto bg-muted",
                          ),
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            children: msg.message,
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "text-[10px] text-muted-foreground mt-1",
                            children: [
                              new Date(msg.created_at).toLocaleTimeString(),
                              " ",
                              msg.agent_version_id
                                ? "\u2022 v".concat(msg.agent_version_id)
                                : "",
                            ],
                          }),
                        ],
                      }),
                      msg.sender === "user" &&
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold",
                          children: "\uD83E\uDDD1",
                        }),
                    ],
                  },
                  msg.id,
                );
              }),
              loading &&
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "mr-auto text-xs text-muted-foreground animate-pulse",
                  children: "AI is thinking...",
                }),
              (0, jsx_runtime_1.jsx)("div", { ref: chatEndRef }),
            ],
          }),
          showXpBoost &&
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "absolute top-4 right-4 animate-bounce text-green-500 text-sm font-semibold",
              children: "+5 XP \uD83D\uDCA1",
            }),
          (0, jsx_runtime_1.jsxs)("form", {
            className: "mt-3 flex items-center gap-2",
            onSubmit: function (e) {
              e.preventDefault();
              sendMessage();
            },
            children: [
              (0, jsx_runtime_1.jsx)("input", {
                value: input,
                onChange: function (e) {
                  return setInput(e.target.value);
                },
                placeholder: "Ask the plugin something...",
                className:
                  "flex-1 border border-input rounded-lg px-3 py-2 text-sm bg-background",
              }),
              (0, jsx_runtime_1.jsx)("button", {
                type: "submit",
                disabled: loading,
                className:
                  "px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg",
                children: "Send",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
