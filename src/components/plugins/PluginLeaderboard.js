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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var usePlugins_1 = require("@/hooks/usePlugins");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var PluginLeaderboard = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "large" : _c;
  var _d = (0, react_1.useState)([]),
    pluginImpact = _d[0],
    setPluginImpact = _d[1];
  var _e = (0, react_1.useState)(true),
    isLoading = _e[0],
    setIsLoading = _e[1];
  var fetchPluginImpact = (0, usePlugins_1.usePlugins)().fetchPluginImpact;
  (0, react_1.useEffect)(
    function () {
      var loadPluginImpact = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var impact, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, 3, 4]);
                return [4 /*yield*/, fetchPluginImpact()];
              case 1:
                impact = _a.sent();
                setPluginImpact(
                  impact.sort(function (a, b) {
                    return b.total_value - a.total_value;
                  }),
                );
                return [3 /*break*/, 4];
              case 2:
                error_1 = _a.sent();
                console.error("Error loading plugin impact data:", error_1);
                sonner_1.toast.error("Failed to load plugin impact data");
                return [3 /*break*/, 4];
              case 3:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      loadPluginImpact();
    },
    [fetchPluginImpact],
  );
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: className,
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Plugin ROI Leaderboard",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-4",
            children: [1, 2, 3].map(function (i) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className: "flex justify-between items-center animate-pulse",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex-1",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "h-5 bg-muted rounded w-1/3 mb-1",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "h-4 bg-muted rounded w-1/4 opacity-70",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "h-6 bg-muted rounded w-16",
                    }),
                  ],
                },
                i,
              );
            }),
          }),
        }),
      ],
    });
  }
  if (!pluginImpact.length) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: className,
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Plugin ROI Leaderboard",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            className: "text-center text-muted-foreground py-8",
            children:
              "No plugin impact data available yet. Install and use plugins to see their ROI.",
          }),
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: className,
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Plugin ROI Leaderboard",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-4",
          children: pluginImpact.slice(0, 5).map(function (plugin, index) {
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className: "flex justify-between items-center",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsxs)("span", {
                            className: "font-medium",
                            children: [index + 1, "."],
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: plugin.plugin_name,
                          }),
                          index === 0 &&
                            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                              variant: "outline",
                              className:
                                "bg-amber-100 text-amber-800 border-amber-200",
                              children: "Top ROI",
                            }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                          plugin.usage_count,
                          " uses \u2022 Avg. value: $",
                          plugin.average_value.toFixed(2),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center text-green-600 font-medium",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUp, {
                        className: "h-4 w-4 mr-1",
                      }),
                      "$",
                      plugin.total_value.toFixed(2),
                    ],
                  }),
                ],
              },
              plugin.plugin_name,
            );
          }),
        }),
      }),
    ],
  });
};
