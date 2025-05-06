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
exports.default = VaultTemplatesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dashboard_breadcrumb_1 = require("@/components/ui/dashboard-breadcrumb");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
var AuthContext_1 = require("@/context/AuthContext");
function VaultTemplatesPage() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    templates = _a[0],
    setTemplates = _a[1];
  var _b = (0, react_1.useState)(true),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    selectedIndustry = _c[0],
    setSelectedIndustry = _c[1];
  var user = (0, AuthContext_1.useAuth)().user;
  (0, react_1.useEffect)(function () {
    setIsLoading(true);
    function fetchTemplates() {
      return __awaiter(this, void 0, void 0, function () {
        var _a, data, error, sortedData, err_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 2, 3, 4]);
              return [
                4 /*yield*/,
                client_1.supabase.functions.invoke("strategy-templates"),
              ];
            case 1:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) {
                console.error("Error loading strategy templates:", error);
                setTemplates([]);
              } else {
                sortedData = (data || []).sort(function (a, b) {
                  // First sort by public status (public first)
                  if (a.is_public && !b.is_public) return -1;
                  if (!a.is_public && b.is_public) return 1;
                  // Then sort by used_by count
                  return b.used_by - a.used_by;
                });
                setTemplates(sortedData);
              }
              return [3 /*break*/, 4];
            case 2:
              err_1 = _b.sent();
              console.error("Failed to fetch strategy templates:", err_1);
              setTemplates([]);
              return [3 /*break*/, 4];
            case 3:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    }
    fetchTemplates();
  }, []);
  var industries = __spreadArray(
    [],
    new Set(
      templates.map(function (t) {
        return t.industry;
      }),
    ),
    true,
  );
  var filteredTemplates = selectedIndustry
    ? templates.filter(function (t) {
        return t.industry === selectedIndustry;
      })
    : templates;
  var handleRemix = function (templateId, templateTitle) {
    return __awaiter(_this, void 0, void 0, function () {
      var tenant_id, _a, data, error, err_2;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 2, , 3]);
            tenant_id =
              (user === null || user === void 0 ? void 0 : user.tenant_id) ||
              (user === null || user === void 0 ? void 0 : user.id);
            if (!tenant_id) {
              sonner_1.toast.error("You must be logged in to remix templates");
              return [2 /*return*/];
            }
            sonner_1.toast.info(
              'Starting remix of "'.concat(templateTitle, '"...'),
            );
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("strategy-remix", {
                body: { template_id: templateId, tenant_id: tenant_id },
              }),
            ];
          case 1:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              throw new Error(error.message);
            }
            sonner_1.toast.success(
              'Successfully remixed "'.concat(templateTitle, '"'),
              {
                description: "Template will be added to your strategy board",
              },
            );
            return [3 /*break*/, 3];
          case 2:
            err_2 = _b.sent();
            console.error("Error remixing template:", err_2);
            sonner_1.toast.error("Failed to remix template");
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container py-8",
    children: [
      (0, jsx_runtime_1.jsx)(dashboard_breadcrumb_1.DashboardBreadcrumb, {}),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2 mb-6",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.File, {
            className: "h-6 w-6 text-primary",
          }),
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold",
            children: "Strategy Vault",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground mb-6",
        children:
          "Explore and remix top-performing strategies from across the platform.",
      }),
      industries.length > 0 &&
        (0, jsx_runtime_1.jsx)("div", {
          className: "mb-6",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-wrap gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: selectedIndustry === null ? "default" : "outline",
                size: "sm",
                onClick: function () {
                  return setSelectedIndustry(null);
                },
                children: "All Industries",
              }),
              industries.map(function (industry) {
                return (0, jsx_runtime_1.jsx)(
                  button_1.Button,
                  {
                    variant:
                      selectedIndustry === industry ? "default" : "outline",
                    size: "sm",
                    onClick: function () {
                      return setSelectedIndustry(industry);
                    },
                    children: industry,
                  },
                  industry,
                );
              }),
            ],
          }),
        }),
      isLoading
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
        : filteredTemplates.length > 0
          ? (0, jsx_runtime_1.jsx)("ul", {
              className: "space-y-4",
              children: filteredTemplates.map(function (tpl) {
                return (0, jsx_runtime_1.jsxs)(
                  card_1.Card,
                  {
                    className:
                      "border border-border hover:border-primary/50 transition-colors relative",
                    children: [
                      tpl.is_public &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs rounded-md flex items-center gap-1",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Star, {
                              className: "h-3 w-3",
                            }),
                            " Public",
                          ],
                        }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        className: "p-4",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-start",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                tpl.is_public &&
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className:
                                      "text-xs text-green-500 font-semibold inline-block mb-1",
                                    children: "\uD83C\uDF1F Featured",
                                  }),
                                (0, jsx_runtime_1.jsx)("h2", {
                                  className: "font-semibold text-lg",
                                  children: tpl.title,
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
                                    "text-xs text-muted-foreground text-right",
                                  children: [
                                    "Used by ",
                                    tpl.used_by,
                                    "+ teams",
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  className: "mt-2 text-xs",
                                  size: "sm",
                                  onClick: function () {
                                    return handleRemix(tpl.id, tpl.title);
                                  },
                                  children: "Remix \u2192",
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                    ],
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
                  children: selectedIndustry
                    ? "No templates found for ".concat(selectedIndustry)
                    : "No strategy templates available",
                }),
              }),
            }),
    ],
  });
}
