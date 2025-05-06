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
exports.default = PublishStrategyTemplates;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var apiClient_1 = require("@/utils/api/apiClient");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var sonner_1 = require("sonner");
var dashboard_breadcrumb_1 = require("@/components/ui/dashboard-breadcrumb");
var AdminOnly_1 = require("@/components/AdminOnly");
var badge_1 = require("@/components/ui/badge");
function PublishStrategyTemplates() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    templates = _a[0],
    setTemplates = _a[1];
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    publishingId = _c[0],
    setPublishingId = _c[1];
  var loadTemplates = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var data, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, apiClient_1.fetchApi)("/api/vault/templates/drafts"),
            ];
          case 2:
            data = _a.sent();
            setTemplates(data || []);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error loading templates:", error_1);
            sonner_1.toast.error("Failed to load strategy templates");
            return [3 /*break*/, 5];
          case 4:
            setLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handlePublish = function (id) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setPublishingId(id);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              (0, apiClient_1.fetchApi)(
                "/api/vault/templates/publish?id=".concat(id),
                { method: "POST" },
              ),
            ];
          case 2:
            _a.sent();
            sonner_1.toast.success("Strategy template published successfully");
            loadTemplates();
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Error publishing template:", error_2);
            sonner_1.toast.error("Failed to publish strategy template");
            return [3 /*break*/, 5];
          case 4:
            setPublishingId(null);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  (0, react_1.useEffect)(function () {
    loadTemplates();
  }, []);
  return (0, jsx_runtime_1.jsx)(AdminOnly_1.default, {
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "container py-8",
      children: [
        (0, jsx_runtime_1.jsx)(dashboard_breadcrumb_1.DashboardBreadcrumb, {}),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center justify-between gap-2 mb-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-3xl font-bold",
                  children: "\uD83D\uDE80 Publish Strategy Templates",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children:
                    "Review and publish tenant-created strategies to the public Vault.",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: loadTemplates,
              disabled: loading,
              children: loading ? "Loading..." : "Refresh",
            }),
          ],
        }),
        loading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-4",
              children: [1, 2, 3].map(function (i) {
                return (0, jsx_runtime_1.jsx)(
                  card_1.Card,
                  {
                    className: "animate-pulse",
                    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "p-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "h-6 w-1/3 bg-muted rounded mb-2",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "h-4 w-full bg-muted rounded-sm mb-2",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "h-4 w-2/3 bg-muted rounded-sm",
                        }),
                      ],
                    }),
                  },
                  i,
                );
              }),
            })
          : templates.length > 0
            ? (0, jsx_runtime_1.jsx)("ul", {
                className: "space-y-4",
                children: templates.map(function (tpl) {
                  return (0, jsx_runtime_1.jsx)(
                    card_1.Card,
                    {
                      className: "border ".concat(
                        tpl.is_public ? "border-green-500/30" : "border-border",
                      ),
                      children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        className: "p-4",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-start",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center gap-2 mb-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)("h2", {
                                      className: "font-semibold text-lg",
                                      children: tpl.title,
                                    }),
                                    tpl.is_public &&
                                      (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                        variant: "success",
                                        className: "text-xs",
                                        children: "Published",
                                      }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children: tpl.industry,
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "mt-2",
                                  children: tpl.summary,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "ml-4",
                              children: [
                                (0, jsx_runtime_1.jsxs)("p", {
                                  className:
                                    "text-xs text-muted-foreground text-right mb-2",
                                  children: [
                                    "Created: ",
                                    new Date(
                                      tpl.created_at,
                                    ).toLocaleDateString(),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("p", {
                                  className:
                                    "text-xs text-muted-foreground text-right",
                                  children: [
                                    "Used by ",
                                    tpl.used_by || 0,
                                    " teams",
                                  ],
                                }),
                                !tpl.is_public &&
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    className: "mt-2 w-full",
                                    size: "sm",
                                    onClick: function () {
                                      return handlePublish(tpl.id);
                                    },
                                    disabled: publishingId === tpl.id,
                                    children:
                                      publishingId === tpl.id
                                        ? "Publishing..."
                                        : "📢 Publish",
                                  }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    },
                    tpl.id,
                  );
                }),
              })
            : (0, jsx_runtime_1.jsx)(card_1.Card, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  className: "p-6 text-center",
                  children: (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: "No strategy templates found to review",
                  }),
                }),
              }),
      ],
    }),
  });
}
