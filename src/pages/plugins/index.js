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
exports.default = PluginsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var usePlugins_1 = require("@/hooks/usePlugins");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var input_1 = require("@/components/ui/input");
var tabs_1 = require("@/components/ui/tabs");
var PluginLeaderboard_1 = require("@/components/plugins/PluginLeaderboard");
var pluginAgent_1 = require("@/utils/pluginAgent");
var useCompanyId_1 = require("@/hooks/useCompanyId");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
function PluginsPage() {
  var _this = this;
  var _a = (0, usePlugins_1.usePlugins)(),
    plugins = _a.plugins,
    loading = _a.loading;
  var _b = (0, react_1.useState)(""),
    searchQuery = _b[0],
    setSearchQuery = _b[1];
  var _c = (0, react_1.useState)("marketplace"),
    activeTab = _c[0],
    setActiveTab = _c[1];
  var _d = (0, react_1.useState)(null),
    installingPlugin = _d[0],
    setInstallingPlugin = _d[1];
  var _e = (0, react_1.useState)(null),
    executingPlugin = _e[0],
    setExecutingPlugin = _e[1];
  var tenantId = (0, useCompanyId_1.useCompanyId)();
  // Filter plugins based on search query
  var filteredPlugins = plugins.filter(function (plugin) {
    var _a, _b;
    return (
      plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ((_a = plugin.description) === null || _a === void 0
        ? void 0
        : _a.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ((_b = plugin.tags) === null || _b === void 0
        ? void 0
        : _b.some(function (tag) {
            return tag.toLowerCase().includes(searchQuery.toLowerCase());
          }))
    );
  });
  var handleInstall = function (pluginSlug) {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!tenantId) {
              sonner_1.toast.error(
                "Cannot install plugin: No tenant ID available",
              );
              return [2 /*return*/];
            }
            setInstallingPlugin(pluginSlug);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, pluginAgent_1.installPlugin)(pluginSlug, tenantId),
            ];
          case 2:
            result = _a.sent();
            if (result.success) {
              sonner_1.toast.success("Plugin installed successfully");
              setActiveTab("installed");
            } else {
              sonner_1.toast.error(
                "Failed to install plugin: ".concat(result.error),
              );
            }
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error installing plugin:", error_1);
            sonner_1.toast.error(
              "An error occurred while installing the plugin",
            );
            return [3 /*break*/, 5];
          case 4:
            setInstallingPlugin(null);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleExecute = function (pluginSlug) {
    return __awaiter(_this, void 0, void 0, function () {
      var result, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!tenantId) {
              sonner_1.toast.error(
                "Cannot execute plugin: No tenant ID available",
              );
              return [2 /*return*/];
            }
            setExecutingPlugin(pluginSlug);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, pluginAgent_1.executePlugin)(pluginSlug, tenantId),
            ];
          case 2:
            result = _a.sent();
            if (result.success) {
              sonner_1.toast.success(result.message);
            } else {
              sonner_1.toast.error(
                "Failed to execute plugin: ".concat(result.error),
              );
            }
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Error executing plugin:", error_2);
            sonner_1.toast.error(
              "An error occurred while executing the plugin",
            );
            return [3 /*break*/, 5];
          case 4:
            setExecutingPlugin(null);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var renderPluginCard = function (plugin) {
    var _a;
    return (0, jsx_runtime_1.jsxs)(
      card_1.Card,
      {
        className: "overflow-hidden",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between items-start",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: plugin.name,
                  }),
                  plugin.tags &&
                    plugin.tags.length > 0 &&
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      children: plugin.tags[0],
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: plugin.description,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "pb-2",
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "flex flex-wrap gap-1",
              children:
                (_a = plugin.tags) === null || _a === void 0
                  ? void 0
                  : _a.slice(1).map(function (tag) {
                      return (0, jsx_runtime_1.jsx)(
                        badge_1.Badge,
                        {
                          variant: "secondary",
                          className: "text-xs",
                          children: tag,
                        },
                        tag,
                      );
                    }),
            }),
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
            className: "flex justify-between pt-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                disabled: !!executingPlugin,
                onClick: function () {
                  return handleExecute(plugin.slug);
                },
                className: "text-xs",
                children:
                  executingPlugin === plugin.slug
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className:
                              "loading loading-spinner loading-xs mr-2",
                          }),
                          "Executing...",
                        ],
                      })
                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                            className: "h-3 w-3 mr-1",
                          }),
                          "Execute",
                        ],
                      }),
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                size: "sm",
                disabled: !!installingPlugin,
                onClick: function () {
                  return handleInstall(plugin.slug);
                },
                className: "text-xs",
                children:
                  installingPlugin === plugin.slug
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className:
                              "loading loading-spinner loading-xs mr-2",
                          }),
                          "Installing...",
                        ],
                      })
                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                            className: "h-3 w-3 mr-1",
                          }),
                          "Install",
                        ],
                      }),
              }),
            ],
          }),
        ],
      },
      plugin.id,
    );
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto p-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Plugin Marketplace",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Extend your AI platform with powerful integrations",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "w-full md:w-auto",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "relative",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
                  className:
                    "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground",
                }),
                (0, jsx_runtime_1.jsx)(input_1.Input, {
                  type: "search",
                  placeholder: "Search plugins...",
                  className: "pl-8 w-full md:w-[250px] lg:w-[300px]",
                  value: searchQuery,
                  onChange: function (e) {
                    return setSearchQuery(e.target.value);
                  },
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "marketplace",
        value: activeTab,
        onValueChange: setActiveTab,
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "marketplace",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Package, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Marketplace",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "installed",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Installed",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                value: "analytics",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Analytics",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "marketplace",
            className: "mt-6",
            children: loading
              ? (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                  children: [1, 2, 3, 4, 5, 6].map(function (i) {
                    return (0, jsx_runtime_1.jsxs)(
                      card_1.Card,
                      {
                        className: "animate-pulse",
                        children: [
                          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "h-6 bg-muted rounded w-2/3 mb-2",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "h-4 bg-muted rounded w-3/4 opacity-70",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "h-4 bg-muted rounded w-1/4 mb-1",
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "h-4 bg-muted rounded w-1/3",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                            className: "flex justify-end",
                            children: (0, jsx_runtime_1.jsx)("div", {
                              className: "h-8 bg-muted rounded w-[100px]",
                            }),
                          }),
                        ],
                      },
                      i,
                    );
                  }),
                })
              : filteredPlugins.length === 0
                ? (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-center py-12",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Package, {
                        className: "h-12 w-12 mx-auto text-muted-foreground",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "mt-4 text-lg font-medium",
                        children: "No plugins found",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-muted-foreground",
                        children:
                          "Try a different search query or check back later for new plugins",
                      }),
                    ],
                  })
                : (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                    children: filteredPlugins.map(renderPluginCard),
                  }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "installed",
            className: "mt-6",
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
              children: filteredPlugins.slice(0, 3).map(renderPluginCard),
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "analytics",
            className: "mt-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
              children: [
                (0, jsx_runtime_1.jsx)(
                  PluginLeaderboard_1.PluginLeaderboard,
                  {},
                ),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                      children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                        children: "Plugin Performance",
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-center text-muted-foreground py-8",
                        children: "Plugin performance analytics coming soon",
                      }),
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
