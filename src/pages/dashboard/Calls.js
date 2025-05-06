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
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var useCallScripts_1 = require("@/hooks/callScripts/useCallScripts");
var tabs_1 = require("@/components/ui/tabs");
var skeleton_1 = require("@/components/ui/skeleton");
var sonner_1 = require("sonner");
var Calls = function () {
  var _a = (0, react_1.useState)("sales"),
    scriptType = _a[0],
    setScriptType = _a[1];
  var _b = (0, useCallScripts_1.useCallScripts)(),
    scripts = _b.scripts,
    isLoading = _b.isLoading,
    error = _b.error,
    generateScript = _b.generateScript;
  var _c = (0, react_1.useState)(false),
    isFetching = _c[0],
    setIsFetching = _c[1];
  var onGenerateScript = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var result, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsFetching(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [4 /*yield*/, generateScript({ scriptType: scriptType })];
          case 2:
            result = _a.sent();
            if (result) {
              sonner_1.toast.success("Script generated successfully");
            } else {
              sonner_1.toast.error("Failed to generate script");
            }
            return [3 /*break*/, 5];
          case 3:
            err_1 = _a.sent();
            console.error("Error generating script:", err_1);
            sonner_1.toast.error("Error generating script");
            return [3 /*break*/, 5];
          case 4:
            setIsFetching(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto p-4",
    children: [
      (0, jsx_runtime_1.jsx)(typography_1.PageTitle, {
        title: "Communication Scripts",
        description:
          "AI-generated scripts for your sales calls, follow-ups, and customer engagement",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-6 mt-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Generate New Script",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "Choose the type of communication script you need",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                className: "space-y-4",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid gap-4 md:grid-cols-4",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "col-span-3",
                      children: (0, jsx_runtime_1.jsxs)(select_1.Select, {
                        value: scriptType,
                        onValueChange: setScriptType,
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                            children: (0, jsx_runtime_1.jsx)(
                              select_1.SelectValue,
                              { placeholder: "Select script type" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                            children: [
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "sales",
                                children: "Sales Call",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "followup",
                                children: "Follow-up Email",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "introduction",
                                children: "Introduction Message",
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                value: "meeting",
                                children: "Meeting Agenda",
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      onClick: onGenerateScript,
                      disabled: isFetching,
                      className: "col-span-1",
                      children: isFetching ? "Generating..." : "Generate",
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Your Scripts",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Previously generated communication scripts",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                  defaultValue: "all",
                  children: [
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                      className: "mb-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                          value: "all",
                          children: "All Scripts",
                        }),
                        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                          value: "sales",
                          children: "Sales",
                        }),
                        (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                          value: "followup",
                          children: "Follow-ups",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                      value: "all",
                      className: "space-y-4",
                      children: isLoading
                        ? (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-4",
                            children: [
                              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                className: "h-24 w-full",
                              }),
                              (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                className: "h-24 w-full",
                              }),
                            ],
                          })
                        : scripts.length > 0
                          ? scripts.map(function (script) {
                              return (0, jsx_runtime_1.jsxs)(
                                "div",
                                {
                                  className: "p-4 border rounded-md",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "flex justify-between items-start mb-2",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("h3", {
                                          className: "font-medium",
                                          children:
                                            script.title || script.script_type,
                                        }),
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className:
                                            "text-xs bg-primary/10 text-primary px-2 py-1 rounded-full",
                                          children: script.script_type,
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className: "text-sm whitespace-pre-line",
                                      children: script.content,
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className:
                                        "mt-2 text-xs text-muted-foreground",
                                      children: [
                                        "Created: ",
                                        new Date(
                                          script.created_at,
                                        ).toLocaleDateString(),
                                      ],
                                    }),
                                  ],
                                },
                                script.id,
                              );
                            })
                          : (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "text-center py-12 text-muted-foreground",
                              children:
                                "No scripts generated yet. Create your first script!",
                            }),
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                      value: "sales",
                      className: "space-y-4",
                      children: isLoading
                        ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                            className: "h-24 w-full",
                          })
                        : scripts.filter(function (s) {
                              return s.script_type === "sales";
                            }).length > 0
                          ? scripts
                              .filter(function (s) {
                                return s.script_type === "sales";
                              })
                              .map(function (script) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className: "p-4 border rounded-md",
                                    children: [
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className:
                                          "flex justify-between items-start mb-2",
                                        children: (0, jsx_runtime_1.jsx)("h3", {
                                          className: "font-medium",
                                          children:
                                            script.title || "Sales Script",
                                        }),
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm whitespace-pre-line",
                                        children: script.content,
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className:
                                          "mt-2 text-xs text-muted-foreground",
                                        children: [
                                          "Created: ",
                                          new Date(
                                            script.created_at,
                                          ).toLocaleDateString(),
                                        ],
                                      }),
                                    ],
                                  },
                                  script.id,
                                );
                              })
                          : (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "text-center py-12 text-muted-foreground",
                              children:
                                "No sales scripts yet. Generate one now!",
                            }),
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                      value: "followup",
                      className: "space-y-4",
                      children: isLoading
                        ? (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                            className: "h-24 w-full",
                          })
                        : scripts.filter(function (s) {
                              return s.script_type === "followup";
                            }).length > 0
                          ? scripts
                              .filter(function (s) {
                                return s.script_type === "followup";
                              })
                              .map(function (script) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className: "p-4 border rounded-md",
                                    children: [
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className:
                                          "flex justify-between items-start mb-2",
                                        children: (0, jsx_runtime_1.jsx)("h3", {
                                          className: "font-medium",
                                          children:
                                            script.title || "Follow-up Script",
                                        }),
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm whitespace-pre-line",
                                        children: script.content,
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className:
                                          "mt-2 text-xs text-muted-foreground",
                                        children: [
                                          "Created: ",
                                          new Date(
                                            script.created_at,
                                          ).toLocaleDateString(),
                                        ],
                                      }),
                                    ],
                                  },
                                  script.id,
                                );
                              })
                          : (0, jsx_runtime_1.jsx)("div", {
                              className:
                                "text-center py-12 text-muted-foreground",
                              children:
                                "No follow-up scripts yet. Generate one now!",
                            }),
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = Calls;
