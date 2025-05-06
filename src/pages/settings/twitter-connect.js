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
exports.default = TwitterConnectPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
var AuthContext_1 = require("@/context/AuthContext");
var apiClient_1 = require("@/utils/api/apiClient");
var card_1 = require("@/components/ui/card");
function TwitterConnectPage() {
  var _this = this;
  var user = (0, AuthContext_1.useAuth)().user;
  var _a = (0, react_1.useState)(false),
    connected = _a[0],
    setConnected = _a[1];
  var _b = (0, react_1.useState)(""),
    username = _b[0],
    setUsername = _b[1];
  var _c = (0, react_1.useState)(null),
    lastTweet = _c[0],
    setLastTweet = _c[1];
  var _d = (0, react_1.useState)(false),
    loading = _d[0],
    setLoading = _d[1];
  var _e = (0, react_1.useState)({
      post_wins: true,
      post_strategies: true,
    }),
    autoPostSettings = _e[0],
    setAutoPostSettings = _e[1];
  var _f = (0, react_1.useState)(null),
    state = _f[0],
    setState = _f[1];
  setState("some-string");
  // Load connection status
  (0, react_1.useEffect)(
    function () {
      if (!user) return;
      var loadTwitterStatus = function () {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            try {
              // For now, we're using the simulation approach
              // In the future this will call a real endpoint
              setTimeout(function () {
                // Simulate loaded data for development
                var hasConnection =
                  localStorage.getItem("twitter_connected") === "true";
                if (hasConnection) {
                  setConnected(true);
                  setUsername("allora_ai");
                  setLastTweet(new Date().toISOString());
                }
              }, 500);
              // Actual implementation would be:
              // const res = await fetchApi(`/api/twitter/status?tenant_id=${user.tenant_id}`);
              // setConnected(!!res.connected);
              // setUsername(res.username || '');
              // setLastTweet(res.last_tweet_at || null);
              // setAutoPostSettings({
              //   post_wins: res.settings?.post_wins ?? true,
              //   post_strategies: res.settings?.post_strategies ?? true
              // });
            } catch (err) {
              console.error("Failed to load Twitter status", err);
              sonner_1.toast.error("Failed to load Twitter connection status");
            }
            return [2 /*return*/];
          });
        });
      };
      loadTwitterStatus();
    },
    [user],
  );
  var handleConnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setLoading(true);
        try {
          // Simulated placeholder while Twitter dev access is blocked
          sonner_1.toast.success("Simulating Twitter Connect...");
          setTimeout(function () {
            setConnected(true);
            setUsername("allora_ai");
            setLastTweet(new Date().toISOString());
            localStorage.setItem("twitter_connected", "true");
            sonner_1.toast.success("Twitter Connected! (mock)");
          }, 1000);
          // 🔒 Real version (uncomment once working):
          // const res = await fetchApi('/api/twitter/request-token');
          // window.location.href = res.url;
        } catch (err) {
          sonner_1.toast.error("Failed to connect Twitter.");
          console.error("Twitter connection error:", err);
        } finally {
          setLoading(false);
        }
        return [2 /*return*/];
      });
    });
  };
  var handleDisconnect = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        try {
          // Simulated disconnect
          sonner_1.toast.success("Disconnecting Twitter...");
          setTimeout(function () {
            setConnected(false);
            setUsername("");
            setLastTweet(null);
            localStorage.removeItem("twitter_connected");
            sonner_1.toast.success("Twitter disconnected successfully");
          }, 1000);
          // 🔒 Real version (uncomment once working):
          // await fetchApi('/api/twitter/disconnect', {
          //   method: 'POST',
          //   body: JSON.stringify({ tenant_id: user?.tenant_id })
          // });
        } catch (err) {
          sonner_1.toast.error("Failed to disconnect Twitter.");
          console.error("Twitter disconnection error:", err);
        }
        return [2 /*return*/];
      });
    });
  };
  var handleSettingChange = function (setting, value) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        setAutoPostSettings(function (prev) {
          var _a;
          return __assign(
            __assign({}, prev),
            ((_a = {}), (_a[setting] = value), _a),
          );
        });
        // In a real implementation, save the settings to the backend
        // await fetchApi('/api/twitter/settings', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     tenant_id: user?.tenant_id,
        //     settings: { ...autoPostSettings, [setting]: value }
        //   })
        // });
        sonner_1.toast.success("Settings updated");
        return [2 /*return*/];
      });
    });
  };
  var handleTestTweet = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            sonner_1.toast.success("Sending test tweet to queue...");
            // This would actually call the real API in production
            return [
              4 /*yield*/,
              (0, apiClient_1.fetchApi)("/api/twitter-post", {
                method: "POST",
                body: JSON.stringify({
                  tenant_id:
                    (user === null || user === void 0
                      ? void 0
                      : user.tenant_id) || "test-tenant",
                  message: "This is a test tweet from Allora AI at ".concat(
                    new Date().toLocaleTimeString(),
                    "! #AlloraAI #TestTweet",
                  ),
                  queue: true,
                }),
              }),
            ];
          case 1:
            // This would actually call the real API in production
            _a.sent();
            sonner_1.toast.success("Test tweet sent to approval queue!");
            return [3 /*break*/, 3];
          case 2:
            err_1 = _a.sent();
            sonner_1.toast.error("Failed to send test tweet");
            console.error("Test tweet error:", err_1);
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-6 max-w-xl mx-auto",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-2xl font-bold mb-4",
        children: "\uD83D\uDD17 Twitter Integration",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-6",
        children:
          "Connect your Twitter account to let Allora automatically publish your agent wins, strategy launches, and more.",
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "p-6 border border-border",
        children: connected
          ? (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "rounded-lg border p-4 bg-muted/30 space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)("p", {
                      className: "text-sm flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "h-4 w-4 bg-green-500 rounded-full",
                        }),
                        "Connected as ",
                        (0, jsx_runtime_1.jsxs)("strong", {
                          children: ["@", username],
                        }),
                      ],
                    }),
                    lastTweet &&
                      (0, jsx_runtime_1.jsxs)("p", {
                        className: "text-xs text-muted-foreground",
                        children: [
                          "Last tweet sent: ",
                          new Date(lastTweet).toLocaleString(),
                        ],
                      }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-sm font-medium mb-2",
                      children: "Auto-posting preferences",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("input", {
                              type: "checkbox",
                              id: "post-wins",
                              checked: autoPostSettings.post_wins,
                              onChange: function (e) {
                                return handleSettingChange(
                                  "post_wins",
                                  e.target.checked,
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)("label", {
                              htmlFor: "post-wins",
                              className: "text-sm",
                              children: "Post agent wins",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("input", {
                              type: "checkbox",
                              id: "post-strategies",
                              checked: autoPostSettings.post_strategies,
                              onChange: function (e) {
                                return handleSettingChange(
                                  "post_strategies",
                                  e.target.checked,
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)("label", {
                              htmlFor: "post-strategies",
                              className: "text-sm",
                              children: "Post new strategies",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "pt-2 space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      size: "sm",
                      variant: "outline",
                      onClick: handleTestTweet,
                      className: "w-full",
                      children: "Send Test Tweet",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "destructive",
                      size: "sm",
                      onClick: handleDisconnect,
                      className: "w-full",
                      children: "Disconnect Twitter",
                    }),
                  ],
                }),
              ],
            })
          : (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm mb-4",
                  children:
                    "Connect your Twitter account to automatically share updates about your business strategies and agent wins. This helps showcase your business growth and Allora's impact.",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: handleConnect,
                  disabled: loading,
                  className: "w-full",
                  children: loading ? "Connecting..." : "Connect Twitter",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground",
                  children:
                    "Note: You'll be redirected to Twitter to authorize this connection. No tweets will be posted without your permission.",
                }),
              ],
            }),
      }),
    ],
  });
}
