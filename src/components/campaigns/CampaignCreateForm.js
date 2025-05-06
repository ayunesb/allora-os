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
exports.default = CampaignCreateForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var z = require("zod");
var react_router_dom_1 = require("react-router-dom");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var form_1 = require("@/components/ui/form");
var select_1 = require("@/components/ui/select");
var campaignService_1 = require("@/services/campaignService");
var sonner_1 = require("sonner");
var useAuth_1 = require("@/hooks/useAuth");
var label_1 = require("../ui/label");
var lucide_react_1 = require("lucide-react");
var TikTokIcon_1 = require("@/components/icons/TikTokIcon");
// Form schema definition
var formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Campaign name must be at least 2 characters" }),
  platform: z.enum(["meta", "tiktok"]),
  budget: z.coerce.number().min(100, { message: "Minimum budget is $100" }),
  targetingAudience: z
    .string()
    .min(5, { message: "Please describe your target audience" }),
  targetingLocation: z
    .string()
    .min(2, { message: "Please specify a location" }),
  adTitle: z
    .string()
    .min(5, { message: "Ad title must be at least 5 characters" }),
  adDescription: z
    .string()
    .min(10, { message: "Ad description must be at least 10 characters" }),
});
function CampaignCreateForm() {
  var _this = this;
  var profile = (0, useAuth_1.useAuth)().profile;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)(false),
    isSubmitting = _a[0],
    setIsSubmitting = _a[1];
  var _b = (0, react_1.useState)(1),
    step = _b[0],
    setStep = _b[1];
  var _c = (0, react_1.useState)(0),
    managementFee = _c[0],
    setManagementFee = _c[1];
  var _d = (0, react_1.useState)(0),
    totalAmount = _d[0],
    setTotalAmount = _d[1];
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(formSchema),
    defaultValues: {
      name: "",
      platform: "meta",
      budget: 1000,
      targetingAudience: "",
      targetingLocation: "",
      adTitle: "",
      adDescription: "",
    },
  });
  var watchBudget = form.watch("budget");
  // Calculate management fee and total amount when budget changes
  (0, react_1.useState)(function () {
    var calculatedFee = Math.round(watchBudget * 0.1);
    setManagementFee(calculatedFee);
    setTotalAmount(watchBudget + calculatedFee);
  });
  var handleNextStep = function () {
    var currentValues = form.getValues();
    // Validate different fields based on current step
    if (step === 1) {
      var result = z
        .object({
          name: formSchema.shape.name,
          platform: formSchema.shape.platform,
          budget: formSchema.shape.budget,
        })
        .safeParse({
          name: currentValues.name,
          platform: currentValues.platform,
          budget: currentValues.budget,
        });
      if (!result.success) {
        result.error.issues.forEach(function (issue) {
          form.setError(issue.path[0], {
            type: "manual",
            message: issue.message,
          });
        });
        return;
      }
    } else if (step === 2) {
      var result = z
        .object({
          targetingAudience: formSchema.shape.targetingAudience,
          targetingLocation: formSchema.shape.targetingLocation,
        })
        .safeParse({
          targetingAudience: currentValues.targetingAudience,
          targetingLocation: currentValues.targetingLocation,
        });
      if (!result.success) {
        result.error.issues.forEach(function (issue) {
          form.setError(issue.path[0], {
            type: "manual",
            message: issue.message,
          });
        });
        return;
      }
    }
    setStep(step + 1);
  };
  var handlePreviousStep = function () {
    setStep(step - 1);
  };
  var onSubmit = function (values) {
    return __awaiter(_this, void 0, void 0, function () {
      var targeting,
        creatives,
        campaignResult,
        campaignId,
        checkoutResult,
        error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsSubmitting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, , 5]);
            targeting = {
              audience: values.targetingAudience,
              location: values.targetingLocation,
            };
            creatives = [
              {
                title: values.adTitle,
                description: values.adDescription,
              },
            ];
            return [
              4 /*yield*/,
              (0, campaignService_1.createCampaign)({
                name: values.name,
                platform: values.platform,
                budget: values.budget,
                targeting: targeting,
                creatives: creatives,
                company_id:
                  profile === null || profile === void 0
                    ? void 0
                    : profile.company_id,
              }),
            ];
          case 2:
            campaignResult = _a.sent();
            if (!campaignResult.success) {
              throw new Error(
                campaignResult.error || "Failed to create campaign",
              );
            }
            campaignId = campaignResult.campaignId;
            if (!campaignId) {
              throw new Error("No campaign ID returned");
            }
            return [
              4 /*yield*/,
              (0, campaignService_1.createCampaignCheckout)(
                campaignId,
                window.location.href,
              ),
            ];
          case 3:
            checkoutResult = _a.sent();
            if (!checkoutResult.success) {
              throw new Error(
                checkoutResult.error || "Failed to create checkout",
              );
            }
            // Redirect to Stripe Checkout
            if (checkoutResult.url) {
              window.location.href = checkoutResult.url;
            } else {
              throw new Error("No checkout URL returned");
            }
            return [3 /*break*/, 5];
          case 4:
            error_1 = _a.sent();
            sonner_1.toast.error(
              "Failed to process campaign: ".concat(error_1.message),
            );
            setIsSubmitting(false);
            return [3 /*break*/, 5];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var renderFormStep = function () {
    switch (step) {
      case 1:
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(form_1.FormField, {
              control: form.control,
              name: "name",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Campaign Name",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                      children: (0, jsx_runtime_1.jsx)(
                        input_1.Input,
                        __assign({ placeholder: "Summer Sale 2025" }, field),
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                  ],
                });
              },
            }),
            (0, jsx_runtime_1.jsx)(form_1.FormField, {
              control: form.control,
              name: "platform",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Ad Platform",
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
                                { placeholder: "Select an ad platform" },
                              ),
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "meta",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    lucide_react_1.Facebook,
                                    { className: "mr-2 h-4 w-4 text-blue-600" },
                                  ),
                                  "Meta (Facebook/Instagram)",
                                ],
                              }),
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "tiktok",
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    TikTokIcon_1.TikTokIcon,
                                    { className: "mr-2 h-4 w-4" },
                                  ),
                                  "TikTok",
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                  ],
                });
              },
            }),
            (0, jsx_runtime_1.jsx)(form_1.FormField, {
              control: form.control,
              name: "budget",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Ad Budget (USD)",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                      children: (0, jsx_runtime_1.jsx)(
                        input_1.Input,
                        __assign(
                          {
                            type: "number",
                            min: "100",
                            step: "100",
                            placeholder: "1000",
                          },
                          field,
                          {
                            onChange: function (e) {
                              field.onChange(e);
                              var value = parseFloat(e.target.value);
                              if (!isNaN(value)) {
                                var fee = Math.round(value * 0.1);
                                setManagementFee(fee);
                                setTotalAmount(value + fee);
                              }
                            },
                          },
                        ),
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormDescription, {
                      children: "Minimum budget is $100",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                  ],
                });
              },
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "bg-muted p-4 rounded-md space-y-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between text-sm",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", { children: "Ad Budget:" }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      children: ["$", watchBudget],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between text-sm",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      children: "Management Fee (10%):",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      children: ["$", managementFee],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between font-medium",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      children: "Total Amount:",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      children: ["$", totalAmount],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      case 2:
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(form_1.FormField, {
              control: form.control,
              name: "targetingAudience",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Target Audience",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                      children: (0, jsx_runtime_1.jsx)(
                        textarea_1.Textarea,
                        __assign(
                          {
                            placeholder:
                              "E.g., Males and females, ages 25-45, interested in fitness and nutrition",
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
              name: "targetingLocation",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Target Location",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                      children: (0, jsx_runtime_1.jsx)(
                        input_1.Input,
                        __assign(
                          { placeholder: "E.g., United States, Canada" },
                          field,
                        ),
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                  ],
                });
              },
            }),
          ],
        });
      case 3:
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(form_1.FormField, {
              control: form.control,
              name: "adTitle",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Ad Title",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                      children: (0, jsx_runtime_1.jsx)(
                        input_1.Input,
                        __assign(
                          { placeholder: "E.g., Summer Sale - 50% Off" },
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
              name: "adDescription",
              render: function (_a) {
                var field = _a.field;
                return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                  children: [
                    (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      children: "Ad Description",
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                      children: (0, jsx_runtime_1.jsx)(
                        textarea_1.Textarea,
                        __assign(
                          {
                            placeholder:
                              "E.g., Don't miss our biggest sale of the year! Get 50% off all products until July 31.",
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
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)(label_1.Label, {
                      children: "Campaign Summary",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "bg-muted p-4 rounded-md space-y-2 mt-2",
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "grid grid-cols-2 gap-2 text-sm",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Campaign Name:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children: form.getValues("name"),
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Platform:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            children:
                              form.getValues("platform") === "meta"
                                ? "Meta (Facebook/Instagram)"
                                : "TikTok",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Budget:",
                          }),
                          (0, jsx_runtime_1.jsxs)("span", {
                            children: ["$", form.getValues("budget")],
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Management Fee:",
                          }),
                          (0, jsx_runtime_1.jsxs)("span", {
                            children: ["$", managementFee],
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium col-span-2 pt-2",
                            children: "Location:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "col-span-2",
                            children: form.getValues("targetingLocation"),
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium col-span-2 pt-2",
                            children: "Target Audience:",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "col-span-2",
                            children: form.getValues("targetingAudience"),
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "bg-primary/10 p-4 rounded-md",
                  children: (0, jsx_runtime_1.jsxs)("p", {
                    className: "text-sm",
                    children: [
                      'By clicking "Create Campaign & Checkout", you agree to pay the total amount of ',
                      (0, jsx_runtime_1.jsxs)("strong", {
                        children: ["$", totalAmount],
                      }),
                      " which includes your ad budget ($",
                      form.getValues("budget"),
                      ") and the 10% management fee ($",
                      managementFee,
                      ").",
                    ],
                  }),
                }),
              ],
            }),
          ],
        });
      default:
        return null;
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full max-w-2xl mx-auto",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Create New Ad Campaign",
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            children: [
              step === 1 && "Set up your campaign basics and budget",
              step === 2 && "Define your target audience",
              step === 3 && "Create your ad content and review",
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)(
          form_1.Form,
          __assign({}, form, {
            children: (0, jsx_runtime_1.jsx)("form", {
              onSubmit: form.handleSubmit(onSubmit),
              className: "space-y-6",
              children: renderFormStep(),
            }),
          }),
        ),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-between",
        children: [
          step > 1 &&
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              type: "button",
              variant: "outline",
              onClick: handlePreviousStep,
              disabled: isSubmitting,
              children: "Previous",
            }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "ml-auto",
            children:
              step < 3
                ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    onClick: handleNextStep,
                    disabled: isSubmitting,
                    children: "Next",
                  })
                : (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "submit",
                    onClick: form.handleSubmit(onSubmit),
                    disabled: isSubmitting,
                    children: isSubmitting
                      ? "Processing..."
                      : "Create Campaign & Checkout",
                  }),
          }),
        ],
      }),
    ],
  });
}
