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
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var z = require("zod");
var useUser_1 = require("@/hooks/useUser");
var sonner_1 = require("sonner");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var slider_1 = require("@/components/ui/slider");
var tabs_1 = require("@/components/ui/tabs");
var select_1 = require("@/components/ui/select");
var AlertMessage_1 = require("@/components/ui/AlertMessage");
var lucide_react_1 = require("lucide-react");
var formSchema = z.object({
  industry: z.string().min(1, { message: "Industry is required" }),
  companySize: z.number().min(1, { message: "Company size is required" }),
  revenue: z.number().min(0, { message: "Revenue must be a positive number" }),
  goals: z
    .string()
    .min(10, { message: "Business goals must be at least 10 characters" }),
  riskTolerance: z.number().min(1).max(10),
  timeHorizon: z.string().min(1, { message: "Time horizon is required" }),
  challenges: z.string().optional(),
});
var StrategyForm = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "large" : _c;
  var user = (0, useUser_1.useUser)().user;
  var _d = (0, react_1.useState)(false),
    isLoading = _d[0],
    setIsLoading = _d[1];
  var _e = (0, react_1.useState)([]),
    strategies = _e[0],
    setStrategies = _e[1];
  var _f = (0, react_1.useState)(null),
    error = _f[0],
    setError = _f[1];
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(formSchema),
    defaultValues: {
      industry:
        (user === null || user === void 0 ? void 0 : user.industry) || "",
      companySize: 5,
      revenue: 0,
      goals: "",
      riskTolerance: 5,
      timeHorizon: "medium",
      challenges: "",
    },
  });
  var onSubmit = function (data) {
    return __awaiter(void 0, void 0, void 0, function () {
      var _a, strategies_1, error_1, err_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!user) {
              sonner_1.toast.error(
                "You must be logged in to generate strategies",
              );
              return [2 /*return*/];
            }
            setIsLoading(true);
            setError(null);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              generateStrategies(
                __assign(__assign({}, data), {
                  userId: user.id,
                  companyId: user.company_id,
                  companyName: user.company,
                }),
              ),
            ];
          case 2:
            (_a = _b.sent()), (strategies_1 = _a.data), (error_1 = _a.error);
            if (error_1) throw new Error(error_1);
            setStrategies(strategies_1 || []);
            sonner_1.toast.success("Strategies generated successfully!");
            return [3 /*break*/, 5];
          case 3:
            err_1 = _b.sent();
            setError(err_1.message || "Failed to generate strategies");
            sonner_1.toast.error("Failed to generate strategies");
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-8",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Executive Strategy Generator",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsx)(
              form_1.Form,
              __assign({}, form, {
                children: (0, jsx_runtime_1.jsxs)("form", {
                  onSubmit: form.handleSubmit(onSubmit),
                  className: "space-y-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormField, {
                          control: form.control,
                          name: "industry",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Industry",
                                }),
                                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                  onValueChange: field.onChange,
                                  defaultValue: field.value,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                      children: (0, jsx_runtime_1.jsx)(
                                        select_1.SelectTrigger,
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            select_1.SelectValue,
                                            { placeholder: "Select industry" },
                                          ),
                                        },
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsxs)(
                                      select_1.SelectContent,
                                      {
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "technology",
                                              children: "Technology",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "healthcare",
                                              children: "Healthcare",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "finance",
                                              children: "Finance",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "education",
                                              children: "Education",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "retail",
                                              children: "Retail",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "manufacturing",
                                              children: "Manufacturing",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "services",
                                              children: "Services",
                                            },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                              ],
                            });
                          },
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormField, {
                          control: form.control,
                          name: "timeHorizon",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Time Horizon",
                                }),
                                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                  onValueChange: field.onChange,
                                  defaultValue: field.value,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                      children: (0, jsx_runtime_1.jsx)(
                                        select_1.SelectTrigger,
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            select_1.SelectValue,
                                            {
                                              placeholder:
                                                "Select time horizon",
                                            },
                                          ),
                                        },
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsxs)(
                                      select_1.SelectContent,
                                      {
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "short",
                                              children:
                                                "Short-term (3-6 months)",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "medium",
                                              children:
                                                "Medium-term (6-12 months)",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "long",
                                              children: "Long-term (1-3 years)",
                                            },
                                          ),
                                        ],
                                      },
                                    ),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                              ],
                            });
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormField, {
                          control: form.control,
                          name: "companySize",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Company Size (Employees)",
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    input_1.Input,
                                    __assign({ type: "number" }, field, {
                                      onChange: function (e) {
                                        return field.onChange(
                                          parseInt(e.target.value) || 0,
                                        );
                                      },
                                    }),
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                              ],
                            });
                          },
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormField, {
                          control: form.control,
                          name: "revenue",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Annual Revenue ($)",
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    input_1.Input,
                                    __assign({ type: "number" }, field, {
                                      onChange: function (e) {
                                        return field.onChange(
                                          parseInt(e.target.value) || 0,
                                        );
                                      },
                                    }),
                                  ),
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                              ],
                            });
                          },
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormField, {
                      control: form.control,
                      name: "goals",
                      render: function (_a) {
                        var field = _a.field;
                        return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                          children: [
                            (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                              children: "Business Goals",
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                              children: (0, jsx_runtime_1.jsx)(
                                textarea_1.Textarea,
                                __assign(
                                  {
                                    placeholder:
                                      "Describe your primary business goals and targets...",
                                    className: "min-h-[100px]",
                                  },
                                  field,
                                ),
                              ),
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                          ],
                        });
                      },
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormField, {
                      control: form.control,
                      name: "challenges",
                      render: function (_a) {
                        var field = _a.field;
                        return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                          children: [
                            (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                              children: "Current Challenges (Optional)",
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                              children: (0, jsx_runtime_1.jsx)(
                                textarea_1.Textarea,
                                __assign(
                                  {
                                    placeholder:
                                      "Describe any current challenges or obstacles...",
                                    className: "min-h-[100px]",
                                  },
                                  field,
                                ),
                              ),
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                          ],
                        });
                      },
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormField, {
                      control: form.control,
                      name: "riskTolerance",
                      render: function (_a) {
                        var field = _a.field;
                        return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                          children: [
                            (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                              children: "Risk Tolerance (1-10)",
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Conservative (1)",
                                  }),
                                  (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                                    min: 1,
                                    max: 10,
                                    step: 1,
                                    defaultValue: [field.value],
                                    onValueChange: function (values) {
                                      return field.onChange(values[0]);
                                    },
                                    className: "w-full",
                                  }),
                                  (0, jsx_runtime_1.jsx)("span", {
                                    children: "Aggressive (10)",
                                  }),
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                          ],
                        });
                      },
                    }),
                    error &&
                      (0, jsx_runtime_1.jsx)(AlertMessage_1.default, {
                        description: error,
                      }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      type: "submit",
                      disabled: isLoading,
                      className: "w-full",
                      children: [
                        isLoading ? "Generating..." : "Generate Strategies",
                        !isLoading &&
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Wand2, {
                            className: "ml-2 h-4 w-4",
                          }),
                      ],
                    }),
                  ],
                }),
              }),
            ),
          }),
        ],
      }),
      strategies.length > 0 &&
        (0, jsx_runtime_1.jsx)(StrategyResults, { strategies: strategies }),
    ],
  });
};
function StrategyResults(_a) {
  var strategies = _a.strategies;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Strategic Options",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          defaultValue: "strategy-0",
          children: [
            (0, jsx_runtime_1.jsx)(tabs_1.TabsList, {
              className: "mb-4",
              children: strategies.map(function (strategy, index) {
                return (0, jsx_runtime_1.jsxs)(
                  tabs_1.TabsTrigger,
                  {
                    value: "strategy-".concat(index),
                    children: ["Option ", index + 1],
                  },
                  index,
                );
              }),
            }),
            strategies.map(function (strategy, index) {
              return (0, jsx_runtime_1.jsxs)(
                tabs_1.TabsContent,
                {
                  value: "strategy-".concat(index),
                  className: "space-y-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "text-lg font-semibold",
                          children: strategy.title,
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground mt-2",
                          children: strategy.description,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-semibold",
                              children: "Pros",
                            }),
                            (0, jsx_runtime_1.jsx)("ul", {
                              className: "list-disc pl-5 space-y-1",
                              children: strategy.pros.map(function (pro, i) {
                                return (0, jsx_runtime_1.jsx)(
                                  "li",
                                  { children: pro },
                                  i,
                                );
                              }),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-semibold",
                              children: "Cons",
                            }),
                            (0, jsx_runtime_1.jsx)("ul", {
                              className: "list-disc pl-5 space-y-1",
                              children: strategy.cons.map(function (con, i) {
                                return (0, jsx_runtime_1.jsx)(
                                  "li",
                                  { children: con },
                                  i,
                                );
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-semibold",
                              children: "Estimated ROI",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "mt-1",
                              children: strategy.estimatedRoi,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-semibold",
                              children: "Risk Level",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "mt-1",
                              children: strategy.riskLevel,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("h4", {
                              className: "font-semibold",
                              children: "Timeline",
                            }),
                            (0, jsx_runtime_1.jsxs)("p", {
                              className: "mt-1",
                              children: [strategy.timelineMonths, " months"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h4", {
                          className: "font-semibold",
                          children: "Implementation Steps",
                        }),
                        (0, jsx_runtime_1.jsx)("ol", {
                          className: "list-decimal pl-5 space-y-1 mt-2",
                          children: strategy.implementationSteps.map(
                            function (step, i) {
                              return (0, jsx_runtime_1.jsx)(
                                "li",
                                { children: step },
                                i,
                              );
                            },
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                index,
              );
            }),
          ],
        }),
      }),
    ],
  });
}
// Fix the supabase client reference
var client_1 = require("@/integrations/supabase/client");
// Function to call the Supabase Edge Function
function generateStrategies(params) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, err_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("generate-strategies", {
              body: params,
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw new Error(error.message);
          }
          return [2 /*return*/, { data: data, error: null }];
        case 2:
          err_2 = _b.sent();
          console.error("Error generating strategies:", err_2);
          return [
            2 /*return*/,
            {
              data: null,
              error: err_2.message || "Failed to generate strategies",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
