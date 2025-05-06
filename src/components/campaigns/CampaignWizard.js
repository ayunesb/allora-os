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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignWizard = CampaignWizard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var tabs_1 = require("@/components/ui/tabs");
var use_toast_1 = require("@/components/ui/use-toast");
var zod_1 = require("zod");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("@hookform/resolvers/zod");
var form_1 = require("@/components/ui/form");
var campaignSchema = zod_1.z.object({
  name: zod_1.z.string().min(3, "Campaign name must be at least 3 characters"),
  description: zod_1.z.string().optional(),
  platform: zod_1.z.enum(["meta", "tiktok", "email", "whatsapp", "Google"]),
  budget: zod_1.z.coerce.number().min(1, "Budget must be greater than 0"),
  goal: zod_1.z.string().optional(),
  audience: zod_1.z.string().optional(),
  adCopy: zod_1.z.string().optional(),
});
function CampaignWizard(_a) {
  var onSubmit = _a.onSubmit,
    initialValues = _a.initialValues;
  var _b = (0, react_1.useState)("details"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var toast = (0, use_toast_1.useToast)().toast;
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_2.zodResolver)(campaignSchema),
    defaultValues: {
      name:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.name) || "",
      description:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.description) || "",
      platform:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.platform) || "meta",
      budget:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.budget) || 1000,
      goal:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.goal) || "",
      audience:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.audience) || "",
      adCopy:
        (initialValues === null || initialValues === void 0
          ? void 0
          : initialValues.adCopy) || "",
    },
  });
  var handleSubmit = function (values) {
    try {
      onSubmit(
        __assign(__assign({}, values), {
          status: "draft",
          createdAt: new Date().toISOString(),
        }),
      );
      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "There was an error creating your campaign.",
        variant: "destructive",
      });
    }
  };
  var handlePlatformChange = function (newPlatform) {
    form.setValue("platform", newPlatform);
  };
  var goToNextTab = function () {
    if (activeTab === "details") {
      setActiveTab("audience");
    } else if (activeTab === "audience") {
      setActiveTab("creative");
    }
  };
  var goToPreviousTab = function () {
    if (activeTab === "creative") {
      setActiveTab("audience");
    } else if (activeTab === "audience") {
      setActiveTab("details");
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Create New Campaign",
        }),
      }),
      (0, jsx_runtime_1.jsx)(
        form_1.Form,
        __assign({}, form, {
          children: (0, jsx_runtime_1.jsx)("form", {
            onSubmit: form.handleSubmit(handleSubmit),
            children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
              value: activeTab,
              onValueChange: setActiveTab,
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                  className: "grid w-full grid-cols-3",
                  children: [
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "details",
                      children: "Campaign Details",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "audience",
                      children: "Target Audience",
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                      value: "creative",
                      children: "Creative",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "pt-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                      value: "details",
                      className: "space-y-4",
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
                                    __assign(
                                      { placeholder: "Summer Sale 2023" },
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
                          name: "description",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Description",
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    textarea_1.Textarea,
                                    __assign(
                                      {
                                        placeholder:
                                          "Brief description of your campaign",
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
                          name: "platform",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Platform",
                                }),
                                (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                  onValueChange: function (value) {
                                    return handlePlatformChange(value);
                                  },
                                  defaultValue: field.value,
                                  children: [
                                    (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                      children: (0, jsx_runtime_1.jsx)(
                                        select_1.SelectTrigger,
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            select_1.SelectValue,
                                            { placeholder: "Select platform" },
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
                                              value: "meta",
                                              children:
                                                "Meta (Facebook/Instagram)",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "tiktok",
                                              children: "TikTok",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "email",
                                              children: "Email",
                                            },
                                          ),
                                          (0, jsx_runtime_1.jsx)(
                                            select_1.SelectItem,
                                            {
                                              value: "whatsapp",
                                              children: "WhatsApp",
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
                          name: "budget",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Budget ($)",
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    input_1.Input,
                                    __assign(
                                      { type: "number", min: "1", step: "1" },
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
                    }),
                    (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
                      value: "audience",
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormField, {
                          control: form.control,
                          name: "audience",
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
                                          "Describe your target audience",
                                        className: "min-h-[150px]",
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
                          name: "goal",
                          render: function (_a) {
                            var field = _a.field;
                            return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                              children: [
                                (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                  children: "Campaign Goal",
                                }),
                                (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                  children: (0, jsx_runtime_1.jsx)(
                                    textarea_1.Textarea,
                                    __assign(
                                      {
                                        placeholder:
                                          "What do you want to achieve with this campaign?",
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
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                      value: "creative",
                      className: "space-y-4",
                      children: (0, jsx_runtime_1.jsx)(form_1.FormField, {
                        control: form.control,
                        name: "adCopy",
                        render: function (_a) {
                          var field = _a.field;
                          return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                            children: [
                              (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                                children: "Ad Copy",
                              }),
                              (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                                children: (0, jsx_runtime_1.jsx)(
                                  textarea_1.Textarea,
                                  __assign(
                                    {
                                      placeholder: "Enter your ad copy here",
                                      className: "min-h-[200px]",
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
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
                  className: "flex justify-between",
                  children: [
                    activeTab !== "details"
                      ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                          type: "button",
                          variant: "outline",
                          onClick: goToPreviousTab,
                          children: "Previous",
                        })
                      : (0, jsx_runtime_1.jsx)("div", {}),
                    activeTab !== "creative"
                      ? (0, jsx_runtime_1.jsx)(button_1.Button, {
                          type: "button",
                          onClick: goToNextTab,
                          children: "Next",
                        })
                      : (0, jsx_runtime_1.jsx)(button_1.Button, {
                          type: "submit",
                          children: "Create Campaign",
                        }),
                  ],
                }),
              ],
            }),
          }),
        }),
      ),
    ],
  });
}
exports.default = CampaignWizard;
