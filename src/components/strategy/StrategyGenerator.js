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
exports.StrategyGenerator = StrategyGenerator;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var zod_2 = require("zod");
var tabs_1 = require("@/components/ui/tabs");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var textarea_1 = require("@/components/ui/textarea");
var badge_1 = require("@/components/ui/badge");
var skeleton_1 = require("@/components/ui/skeleton");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var useUser_1 = require("@/hooks/useUser");
var client_1 = require("@/integrations/supabase/client");
// Define the schema for the form
var formSchema = zod_2.z.object({
  companyName: zod_2.z.string().min(1, "Company name is required"),
  industry: zod_2.z.string().min(1, "Industry is required"),
  companySize: zod_2.z.string().min(1, "Company size is required"),
  revenue: zod_2.z.string().min(1, "Annual revenue is required"),
  goals: zod_2.z
    .string()
    .min(10, "Business goals must be at least 10 characters"),
  riskTolerance: zod_2.z.string().min(1, "Risk tolerance is required"),
  timeHorizon: zod_2.z.string().min(1, "Time horizon is required"),
  challenges: zod_2.z.string().optional(),
});
function StrategyGenerator() {
  var _this = this;
  var user = (0, useUser_1.useUser)().user;
  var _a = (0, react_1.useState)(null),
    strategies = _a[0],
    setStrategies = _a[1];
  var _b = (0, react_1.useState)(false),
    isLoading = _b[0],
    setIsLoading = _b[1];
  var _c = (0, react_1.useState)(null),
    error = _c[0],
    setError = _c[1];
  var _d = (0, react_1.useState)("strategy-1"),
    selectedTab = _d[0],
    setSelectedTab = _d[1];
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(formSchema),
    defaultValues: {
      companyName:
        (user === null || user === void 0 ? void 0 : user.company) || "",
      industry:
        (user === null || user === void 0 ? void 0 : user.industry) || "",
      companySize: "",
      revenue: "",
      goals: "",
      riskTolerance: "5",
      timeHorizon: "Medium term (6-12 months)",
      challenges: "",
    },
  });
  var onSubmit = function (data) {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, strategiesData, strategiesError, err_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            setIsLoading(true);
            setError(null);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("generate-strategies", {
                body: __assign(__assign({}, data), {
                  userId: user === null || user === void 0 ? void 0 : user.id,
                  companyId:
                    user === null || user === void 0 ? void 0 : user.company_id,
                }),
              }),
            ];
          case 2:
            (_a = _b.sent()),
              (strategiesData = _a.data),
              (strategiesError = _a.error);
            if (strategiesError) {
              throw new Error(strategiesError.message);
            }
            setStrategies(strategiesData);
            sonner_1.toast.success("Strategies generated successfully!");
            setSelectedTab("strategy-1");
            return [3 /*break*/, 5];
          case 3:
            err_1 = _b.sent();
            setError(err_1.message || "Failed to generate strategies");
            sonner_1.toast.error(
              "Strategy generation failed. Please try again.",
            );
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
  var getRiskColor = function (risk) {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6 p-4 md:p-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col gap-2",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold tracking-tight",
            children: "Executive Strategy Generator",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children:
              "Generate custom business strategies powered by AI based on your company profile and goals.",
          }),
        ],
      }),
      !strategies
        ? (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Business Strategy Input",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children:
                      "Fill in the details below to generate tailored strategies for your business",
                  }),
                ],
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
                              name: "companyName",
                              render: function (_a) {
                                var field = _a.field;
                                return (0, jsx_runtime_1.jsxs)(
                                  form_1.FormItem,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                        children: "Company Name",
                                      }),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormControl,
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            input_1.Input,
                                            __assign(
                                              { placeholder: "Your Company" },
                                              field,
                                            ),
                                          ),
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormMessage,
                                        {},
                                      ),
                                    ],
                                  },
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormField, {
                              control: form.control,
                              name: "industry",
                              render: function (_a) {
                                var field = _a.field;
                                return (0, jsx_runtime_1.jsxs)(
                                  form_1.FormItem,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                        children: "Industry",
                                      }),
                                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                        onValueChange: field.onChange,
                                        defaultValue: field.value,
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            form_1.FormControl,
                                            {
                                              children: (0, jsx_runtime_1.jsx)(
                                                select_1.SelectTrigger,
                                                {
                                                  children: (0,
                                                  jsx_runtime_1.jsx)(
                                                    select_1.SelectValue,
                                                    {
                                                      placeholder:
                                                        "Select your industry",
                                                    },
                                                  ),
                                                },
                                              ),
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsxs)(
                                            select_1.SelectContent,
                                            {
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Software & Technology",
                                                    children:
                                                      "Software & Technology",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "E-commerce & Retail",
                                                    children:
                                                      "E-commerce & Retail",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Healthcare",
                                                    children: "Healthcare",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Finance & Insurance",
                                                    children:
                                                      "Finance & Insurance",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Education & EdTech",
                                                    children:
                                                      "Education & EdTech",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Manufacturing",
                                                    children: "Manufacturing",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Media & Entertainment",
                                                    children:
                                                      "Media & Entertainment",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Food & Beverage",
                                                    children: "Food & Beverage",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Professional Services",
                                                    children:
                                                      "Professional Services",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Real Estate",
                                                    children: "Real Estate",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Transportation & Logistics",
                                                    children:
                                                      "Transportation & Logistics",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Energy & Utilities",
                                                    children:
                                                      "Energy & Utilities",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Travel & Hospitality",
                                                    children:
                                                      "Travel & Hospitality",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Agriculture",
                                                    children: "Agriculture",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Non-profit",
                                                    children: "Non-profit",
                                                  },
                                                ),
                                              ],
                                            },
                                          ),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormMessage,
                                        {},
                                      ),
                                    ],
                                  },
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormField, {
                              control: form.control,
                              name: "companySize",
                              render: function (_a) {
                                var field = _a.field;
                                return (0, jsx_runtime_1.jsxs)(
                                  form_1.FormItem,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                        children: "Company Size",
                                      }),
                                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                        onValueChange: field.onChange,
                                        defaultValue: field.value,
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            form_1.FormControl,
                                            {
                                              children: (0, jsx_runtime_1.jsx)(
                                                select_1.SelectTrigger,
                                                {
                                                  children: (0,
                                                  jsx_runtime_1.jsx)(
                                                    select_1.SelectValue,
                                                    {
                                                      placeholder:
                                                        "Number of employees",
                                                    },
                                                  ),
                                                },
                                              ),
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsxs)(
                                            select_1.SelectContent,
                                            {
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "1-10",
                                                    children: "1-10 employees",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "11-50",
                                                    children: "11-50 employees",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "51-200",
                                                    children:
                                                      "51-200 employees",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "201-500",
                                                    children:
                                                      "201-500 employees",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "501-1000",
                                                    children:
                                                      "501-1000 employees",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "1000+",
                                                    children: "1000+ employees",
                                                  },
                                                ),
                                              ],
                                            },
                                          ),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormMessage,
                                        {},
                                      ),
                                    ],
                                  },
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormField, {
                              control: form.control,
                              name: "revenue",
                              render: function (_a) {
                                var field = _a.field;
                                return (0, jsx_runtime_1.jsxs)(
                                  form_1.FormItem,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                        children: "Annual Revenue",
                                      }),
                                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                        onValueChange: field.onChange,
                                        defaultValue: field.value,
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            form_1.FormControl,
                                            {
                                              children: (0, jsx_runtime_1.jsx)(
                                                select_1.SelectTrigger,
                                                {
                                                  children: (0,
                                                  jsx_runtime_1.jsx)(
                                                    select_1.SelectValue,
                                                    {
                                                      placeholder:
                                                        "Select your annual revenue",
                                                    },
                                                  ),
                                                },
                                              ),
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsxs)(
                                            select_1.SelectContent,
                                            {
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Pre-revenue",
                                                    children: "Pre-revenue",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "Under $100K",
                                                    children: "Under $100K",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "$100K - $500K",
                                                    children: "$100K - $500K",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "$500K - $1M",
                                                    children: "$500K - $1M",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "$1M - $5M",
                                                    children: "$1M - $5M",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "$5M - $10M",
                                                    children: "$5M - $10M",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "$10M - $50M",
                                                    children: "$10M - $50M",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value: "$50M+",
                                                    children: "$50M+",
                                                  },
                                                ),
                                              ],
                                            },
                                          ),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormMessage,
                                        {},
                                      ),
                                    ],
                                  },
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormField, {
                              control: form.control,
                              name: "timeHorizon",
                              render: function (_a) {
                                var field = _a.field;
                                return (0, jsx_runtime_1.jsxs)(
                                  form_1.FormItem,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                        children: "Time Horizon",
                                      }),
                                      (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                        onValueChange: field.onChange,
                                        defaultValue: field.value,
                                        children: [
                                          (0, jsx_runtime_1.jsx)(
                                            form_1.FormControl,
                                            {
                                              children: (0, jsx_runtime_1.jsx)(
                                                select_1.SelectTrigger,
                                                {
                                                  children: (0,
                                                  jsx_runtime_1.jsx)(
                                                    select_1.SelectValue,
                                                    {
                                                      placeholder:
                                                        "Select time horizon",
                                                    },
                                                  ),
                                                },
                                              ),
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsxs)(
                                            select_1.SelectContent,
                                            {
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Short term (3-6 months)",
                                                    children:
                                                      "Short term (3-6 months)",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Medium term (6-12 months)",
                                                    children:
                                                      "Medium term (6-12 months)",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)(
                                                  select_1.SelectItem,
                                                  {
                                                    value:
                                                      "Long term (1-3 years)",
                                                    children:
                                                      "Long term (1-3 years)",
                                                  },
                                                ),
                                              ],
                                            },
                                          ),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormMessage,
                                        {},
                                      ),
                                    ],
                                  },
                                );
                              },
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormField, {
                              control: form.control,
                              name: "riskTolerance",
                              render: function (_a) {
                                var field = _a.field;
                                return (0, jsx_runtime_1.jsxs)(
                                  form_1.FormItem,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                        children: "Risk Tolerance (1-10)",
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "flex items-center gap-4",
                                        children: [
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "text-sm",
                                            children: "Low",
                                          }),
                                          (0, jsx_runtime_1.jsx)(
                                            form_1.FormControl,
                                            {
                                              children: (0, jsx_runtime_1.jsxs)(
                                                select_1.Select,
                                                {
                                                  onValueChange: field.onChange,
                                                  defaultValue: field.value,
                                                  children: [
                                                    (0, jsx_runtime_1.jsx)(
                                                      select_1.SelectTrigger,
                                                      {
                                                        children: (0,
                                                        jsx_runtime_1.jsx)(
                                                          select_1.SelectValue,
                                                          {
                                                            placeholder:
                                                              "Select risk level",
                                                          },
                                                        ),
                                                      },
                                                    ),
                                                    (0, jsx_runtime_1.jsxs)(
                                                      select_1.SelectContent,
                                                      {
                                                        children: [
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "1",
                                                              children:
                                                                "1 - Very Conservative",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "2",
                                                              children: "2",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "3",
                                                              children: "3",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "4",
                                                              children: "4",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "5",
                                                              children:
                                                                "5 - Moderate",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "6",
                                                              children: "6",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "7",
                                                              children: "7",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "8",
                                                              children: "8",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "9",
                                                              children: "9",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "10",
                                                              children:
                                                                "10 - Very Aggressive",
                                                            },
                                                          ),
                                                        ],
                                                      },
                                                    ),
                                                  ],
                                                },
                                              ),
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "text-sm",
                                            children: "High",
                                          }),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsx)(
                                        form_1.FormMessage,
                                        {},
                                      ),
                                    ],
                                  },
                                );
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
                                          "Describe your primary business goals and what you want to achieve...",
                                        className: "min-h-[80px]",
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
                                          "Describe any obstacles or challenges you're facing...",
                                        className: "min-h-[80px]",
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
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "flex justify-end",
                          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                            type: "submit",
                            disabled: isLoading,
                            children: isLoading
                              ? "Generating..."
                              : "Generate Strategies",
                          }),
                        }),
                        error &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.AlertCircle,
                                { className: "h-5 w-5" },
                              ),
                              (0, jsx_runtime_1.jsx)("span", {
                                children: error,
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
                ),
              }),
            ],
          })
        : (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, jsx_runtime_1.jsx)("h2", {
                    className: "text-xl font-bold",
                    children: "Generated Strategies",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    onClick: function () {
                      return setStrategies(null);
                    },
                    children: "Create New Strategies",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                value: selectedTab,
                onValueChange: setSelectedTab,
                children: [
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                    className: "grid w-full grid-cols-3",
                    children: [
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "strategy-1",
                        children: "Strategy 1",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "strategy-2",
                        children: "Strategy 2",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "strategy-3",
                        children: "Strategy 3",
                      }),
                    ],
                  }),
                  strategies.map(function (strategy, index) {
                    return (0, jsx_runtime_1.jsx)(
                      tabs_1.TabsContent,
                      {
                        value: "strategy-".concat(index + 1),
                        className: "space-y-6",
                        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                          children: [
                            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "flex items-center justify-between",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                                      className: "text-xl",
                                      children: strategy.title,
                                    }),
                                    (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                      className: getRiskColor(
                                        strategy.riskLevel,
                                      ),
                                      children: [strategy.riskLevel, " Risk"],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                                  className: "text-md",
                                  children: strategy.description,
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                              className: "space-y-6",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "grid grid-cols-1 md:grid-cols-2 gap-4",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, jsx_runtime_1.jsxs)("h3", {
                                          className:
                                            "font-semibold flex items-center gap-2",
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.CheckCircle,
                                              {
                                                className:
                                                  "h-5 w-5 text-green-500",
                                              },
                                            ),
                                            "Advantages",
                                          ],
                                        }),
                                        (0, jsx_runtime_1.jsx)("ul", {
                                          className:
                                            "list-disc list-inside text-sm space-y-1",
                                          children: strategy.pros.map(
                                            function (pro, idx) {
                                              return (0, jsx_runtime_1.jsx)(
                                                "li",
                                                { children: pro },
                                                idx,
                                              );
                                            },
                                          ),
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "space-y-2",
                                      children: [
                                        (0, jsx_runtime_1.jsxs)("h3", {
                                          className:
                                            "font-semibold flex items-center gap-2",
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              lucide_react_1.AlertCircle,
                                              {
                                                className:
                                                  "h-5 w-5 text-amber-500",
                                              },
                                            ),
                                            "Challenges",
                                          ],
                                        }),
                                        (0, jsx_runtime_1.jsx)("ul", {
                                          className:
                                            "list-disc list-inside text-sm space-y-1",
                                          children: strategy.cons.map(
                                            function (con, idx) {
                                              return (0, jsx_runtime_1.jsx)(
                                                "li",
                                                { children: con },
                                                idx,
                                              );
                                            },
                                          ),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className:
                                    "grid grid-cols-1 md:grid-cols-3 gap-4",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          card_1.CardHeader,
                                          {
                                            className: "p-4",
                                            children: (0, jsx_runtime_1.jsxs)(
                                              card_1.CardTitle,
                                              {
                                                className:
                                                  "text-sm font-medium flex items-center gap-2",
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    lucide_react_1.DollarSign,
                                                    {
                                                      className:
                                                        "h-4 w-4 text-green-500",
                                                    },
                                                  ),
                                                  "Estimated ROI",
                                                ],
                                              },
                                            ),
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          card_1.CardContent,
                                          {
                                            className: "p-4 pt-0",
                                            children: (0, jsx_runtime_1.jsx)(
                                              "p",
                                              {
                                                className: "text-sm",
                                                children: strategy.estimatedROI,
                                              },
                                            ),
                                          },
                                        ),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          card_1.CardHeader,
                                          {
                                            className: "p-4",
                                            children: (0, jsx_runtime_1.jsxs)(
                                              card_1.CardTitle,
                                              {
                                                className:
                                                  "text-sm font-medium flex items-center gap-2",
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    lucide_react_1.Clock,
                                                    {
                                                      className:
                                                        "h-4 w-4 text-blue-500",
                                                    },
                                                  ),
                                                  "Timeline",
                                                ],
                                              },
                                            ),
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          card_1.CardContent,
                                          {
                                            className: "p-4 pt-0",
                                            children: (0, jsx_runtime_1.jsx)(
                                              "p",
                                              {
                                                className: "text-sm",
                                                children: strategy.timeline,
                                              },
                                            ),
                                          },
                                        ),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)(card_1.Card, {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          card_1.CardHeader,
                                          {
                                            className: "p-4",
                                            children: (0, jsx_runtime_1.jsxs)(
                                              card_1.CardTitle,
                                              {
                                                className:
                                                  "text-sm font-medium flex items-center gap-2",
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    lucide_react_1.BarChart2,
                                                    {
                                                      className:
                                                        "h-4 w-4 text-purple-500",
                                                    },
                                                  ),
                                                  "Implementation Complexity",
                                                ],
                                              },
                                            ),
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          card_1.CardContent,
                                          {
                                            className: "p-4 pt-0",
                                            children: (0, jsx_runtime_1.jsx)(
                                              "p",
                                              {
                                                className: "text-sm",
                                                children:
                                                  strategy.riskLevel === "Low"
                                                    ? "Simple"
                                                    : strategy.riskLevel ===
                                                        "Medium"
                                                      ? "Moderate"
                                                      : "Complex",
                                              },
                                            ),
                                          },
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "space-y-3",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("h3", {
                                      className:
                                        "font-semibold flex items-center gap-2",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.TrendingUp,
                                          {
                                            className: "h-5 w-5 text-blue-500",
                                          },
                                        ),
                                        "Implementation Plan",
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsx)("ol", {
                                      className:
                                        "list-decimal list-inside text-sm space-y-2",
                                      children:
                                        strategy.implementationSteps.map(
                                          function (step, idx) {
                                            return (0, jsx_runtime_1.jsx)(
                                              "li",
                                              {
                                                className: "pl-2",
                                                children: step,
                                              },
                                              idx,
                                            );
                                          },
                                        ),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                              className: "border-t pt-4",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "flex items-center justify-between w-full",
                                children: [
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Save Strategy",
                                  }),
                                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                    variant: "default",
                                    size: "sm",
                                    children: [
                                      "Implement Now",
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ChevronRight,
                                        { className: "ml-1 h-4 w-4" },
                                      ),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      },
                      index,
                    );
                  }),
                ],
              }),
            ],
          }),
      isLoading &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-8 w-48",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-8 w-36",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-10 w-full",
                }),
                (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-8 w-3/4",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-6 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-6 w-5/6",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "space-y-6",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-6 w-24",
                                }),
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-4 w-full",
                                }),
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-4 w-5/6",
                                }),
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-4 w-4/5",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-2",
                              children: [
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-6 w-24",
                                }),
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-4 w-full",
                                }),
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-4 w-5/6",
                                }),
                                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                                  className: "h-4 w-4/5",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                              className: "h-6 w-40",
                            }),
                            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                              className: "h-4 w-full",
                            }),
                            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                              className: "h-4 w-5/6",
                            }),
                            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                              className: "h-4 w-4/5",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
