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
exports.default = CompanySettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_helmet_async_1 = require("react-helmet-async");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var select_1 = require("@/components/ui/select");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var form_1 = require("@/components/ui/form");
var react_hook_form_1 = require("react-hook-form");
var useCompanyManagement_1 = require("@/hooks/admin/useCompanyManagement");
var use_mobile_1 = require("@/hooks/use-mobile");
var textarea_1 = require("@/components/ui/textarea");
var BrandIdentityForm_1 = require("@/components/onboarding/BrandIdentityForm");
function CompanySettings() {
  var _this = this;
  var _a = (0, useCompanyManagement_1.useCompanyManagement)(),
    companies = _a.companies,
    isLoading = _a.isLoading,
    loadCompanies = _a.loadCompanies,
    updateCompany = _a.updateCompany;
  var _b = (0, react_1.useState)("general"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var _c = (0, react_1.useState)(false),
    isSaving = _c[0],
    setIsSaving = _c[1];
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  var _d = (0, react_1.useState)({
      primaryColor: "#4F46E5",
      secondaryColor: "#10B981",
      brandTone: "friendly",
      logoUrl: "",
    }),
    companyDetails = _d[0],
    setCompanyDetails = _d[1];
  var form = (0, react_hook_form_1.useForm)({
    defaultValues: {
      name: "",
      industry: "",
      description: "",
      mission: "",
      vision: "",
      headquarters: "",
      phone: "",
    },
  });
  (0, react_1.useEffect)(
    function () {
      loadCompanies();
    },
    [loadCompanies],
  );
  (0, react_1.useEffect)(
    function () {
      var _a, _b, _c, _d, _e;
      if (companies && companies.length > 0) {
        var company = companies[0];
        form.reset({
          name: company.name || "",
          industry: company.industry || "",
          description:
            ((_a = company.details) === null || _a === void 0
              ? void 0
              : _a.description) || "",
          mission:
            ((_b = company.details) === null || _b === void 0
              ? void 0
              : _b.mission) || "",
          vision:
            ((_c = company.details) === null || _c === void 0
              ? void 0
              : _c.vision) || "",
          headquarters:
            ((_d = company.details) === null || _d === void 0
              ? void 0
              : _d.headquarters) || "",
          phone:
            ((_e = company.details) === null || _e === void 0
              ? void 0
              : _e.phone) || "",
        });
        // Load branding details if available
        if (company.details) {
          setCompanyDetails({
            primaryColor: company.details.primaryColor || "#4F46E5",
            secondaryColor: company.details.secondaryColor || "#10B981",
            brandTone: company.details.brandTone || "friendly",
            logoUrl: company.details.logoUrl || "",
          });
        }
      }
    },
    [companies, form],
  );
  var onSubmit = function (data) {
    return __awaiter(_this, void 0, void 0, function () {
      var companyId, updatedData, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!companies || companies.length === 0) {
              sonner_1.toast.error("No company found to update");
              return [2 /*return*/];
            }
            setIsSaving(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            companyId = companies[0].id;
            updatedData = {
              name: data.name,
              industry: data.industry,
              details: __assign(
                {
                  description: data.description,
                  mission: data.mission,
                  vision: data.vision,
                  headquarters: data.headquarters,
                  phone: data.phone,
                },
                companies[0].details || {},
              ),
            };
            return [4 /*yield*/, updateCompany(companyId, updatedData)];
          case 2:
            _a.sent();
            sonner_1.toast.success("Company settings updated successfully");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error updating company:", error_1);
            sonner_1.toast.error("Failed to update company settings");
            return [3 /*break*/, 5];
          case 4:
            setIsSaving(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var updateBrandingDetails = function (details) {
    if (!companies || companies.length === 0) {
      sonner_1.toast.error("No company found to update");
      return;
    }
    setIsSaving(true);
    var companyId = companies[0].id;
    // Update the state
    setCompanyDetails(__assign(__assign({}, companyDetails), details));
    // Update the company in the database
    updateCompany(companyId, {
      details: __assign(__assign({}, companies[0].details), details),
    })
      .then(function () {
        sonner_1.toast.success("Brand identity updated successfully");
      })
      .catch(function (error) {
        console.error("Error updating brand identity:", error);
        sonner_1.toast.error("Failed to update brand identity");
      })
      .finally(function () {
        setIsSaving(false);
      });
  };
  var industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "Manufacturing",
    "Retail",
    "Media",
    "Transportation",
    "Energy",
    "Consulting",
    "Other",
  ];
  // Explicitly type 'field' parameter
  var renderField = function (field) {
    return (0, jsx_runtime_1.jsxs)("div", {
      children: [
        (0, jsx_runtime_1.jsx)("label", { children: field.label }),
        (0, jsx_runtime_1.jsx)("input", { value: field.value }),
      ],
    });
  };
  // Ensure 'children' is used correctly and define CustomComponent properly
  var CustomComponent = function (_a) {
    var children = _a.children;
    return (0, jsx_runtime_1.jsx)("div", { children: children });
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Company Settings | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col gap-2",
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Company Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Manage company-wide settings and configurations.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: activeTab,
            onValueChange: setActiveTab,
            className: "w-full",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid w-full ".concat(
                  isMobileView ? "grid-cols-2" : "grid-cols-4",
                ),
                children: [
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "general",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, {
                        className: "h-4 w-4 mr-2",
                      }),
                      (0, jsx_runtime_1.jsx)("span", { children: "General" }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "branding",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shapes, {
                        className: "h-4 w-4 mr-2",
                      }),
                      (0, jsx_runtime_1.jsx)("span", { children: "Branding" }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "team",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                        className: "h-4 w-4 mr-2",
                      }),
                      (0, jsx_runtime_1.jsx)("span", { children: "Team" }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                    value: "preferences",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Cog, {
                        className: "h-4 w-4 mr-2",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Preferences",
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "general",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Building2, {
                              className: "h-5 w-5 mr-2",
                            }),
                            "Company Information",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Update your company's basic information and profile",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)(
                        form_1.Form,
                        __assign({}, form, {
                          children: (0, jsx_runtime_1.jsxs)("form", {
                            onSubmit: form.handleSubmit(onSubmit),
                            className: "space-y-4",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                  (0, jsx_runtime_1.jsx)(form_1.FormField, {
                                    control: form.control,
                                    name: "name",
                                    render: function (_a) {
                                      var field = _a.field;
                                      return (0, jsx_runtime_1.jsxs)(
                                        form_1.FormItem,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormLabel,
                                              { children: "Company Name" },
                                            ),
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormControl,
                                              {
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  input_1.Input,
                                                  __assign(
                                                    {
                                                      placeholder:
                                                        "Enter company name",
                                                    },
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
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormLabel,
                                              { children: "Industry" },
                                            ),
                                            (0, jsx_runtime_1.jsxs)(
                                              select_1.Select,
                                              {
                                                onValueChange: field.onChange,
                                                defaultValue: field.value,
                                                value: field.value,
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    form_1.FormControl,
                                                    {
                                                      children: (0,
                                                      jsx_runtime_1.jsx)(
                                                        select_1.SelectTrigger,
                                                        {
                                                          children: (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectValue,
                                                            {
                                                              placeholder:
                                                                "Select industry",
                                                            },
                                                          ),
                                                        },
                                                      ),
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    select_1.SelectContent,
                                                    {
                                                      children: industries.map(
                                                        function (industry) {
                                                          return (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: industry,
                                                              children:
                                                                industry,
                                                            },
                                                            industry,
                                                          );
                                                        },
                                                      ),
                                                    },
                                                  ),
                                                ],
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
                                    name: "headquarters",
                                    render: function (_a) {
                                      var field = _a.field;
                                      return (0, jsx_runtime_1.jsxs)(
                                        form_1.FormItem,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormLabel,
                                              { children: "Headquarters" },
                                            ),
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormControl,
                                              {
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  input_1.Input,
                                                  __assign(
                                                    {
                                                      placeholder:
                                                        "Enter headquarters location",
                                                    },
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
                                    name: "phone",
                                    render: function (_a) {
                                      var field = _a.field;
                                      return (0, jsx_runtime_1.jsxs)(
                                        form_1.FormItem,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormLabel,
                                              { children: "Contact Phone" },
                                            ),
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormControl,
                                              {
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  input_1.Input,
                                                  __assign(
                                                    {
                                                      placeholder:
                                                        "Enter contact phone",
                                                    },
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
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)(form_1.FormField, {
                                control: form.control,
                                name: "description",
                                render: function (_a) {
                                  var field = _a.field;
                                  return (0, jsx_runtime_1.jsxs)(
                                    form_1.FormItem,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          form_1.FormLabel,
                                          { children: "Company Description" },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          form_1.FormControl,
                                          {
                                            children: (0, jsx_runtime_1.jsx)(
                                              textarea_1.Textarea,
                                              __assign(
                                                {
                                                  placeholder:
                                                    "Enter a description of your company",
                                                  className: "min-h-[120px]",
                                                },
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
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: [
                                  (0, jsx_runtime_1.jsx)(form_1.FormField, {
                                    control: form.control,
                                    name: "mission",
                                    render: function (_a) {
                                      var field = _a.field;
                                      return (0, jsx_runtime_1.jsxs)(
                                        form_1.FormItem,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormLabel,
                                              { children: "Mission Statement" },
                                            ),
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormControl,
                                              {
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  textarea_1.Textarea,
                                                  __assign(
                                                    {
                                                      placeholder:
                                                        "Enter your company's mission",
                                                      className:
                                                        "min-h-[100px]",
                                                    },
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
                                    name: "vision",
                                    render: function (_a) {
                                      var field = _a.field;
                                      return (0, jsx_runtime_1.jsxs)(
                                        form_1.FormItem,
                                        {
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormLabel,
                                              { children: "Vision Statement" },
                                            ),
                                            (0, jsx_runtime_1.jsx)(
                                              form_1.FormControl,
                                              {
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  textarea_1.Textarea,
                                                  __assign(
                                                    {
                                                      placeholder:
                                                        "Enter your company's vision",
                                                      className:
                                                        "min-h-[100px]",
                                                    },
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
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-end space-x-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    type: "button",
                                    variant: "outline",
                                    onClick: function () {
                                      return form.reset();
                                    },
                                    disabled: isSaving,
                                    children: "Reset",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    type: "submit",
                                    disabled: isSaving,
                                    children: isSaving
                                      ? "Saving..."
                                      : "Save Changes",
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
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "branding",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Shapes, {
                              className: "h-5 w-5 mr-2",
                            }),
                            "Brand Identity",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Configure your company's branding elements and visual identity",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)(
                        BrandIdentityForm_1.BrandIdentityForm,
                        {
                          companyDetails: companyDetails,
                          updateCompanyDetails: updateBrandingDetails,
                        },
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                      className: "flex justify-end",
                      children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                        variant: "outline",
                        className: "mr-2",
                        onClick: function () {
                          return setCompanyDetails({
                            primaryColor: "#4F46E5",
                            secondaryColor: "#10B981",
                            brandTone: "friendly",
                            logoUrl: "",
                          });
                        },
                        disabled: isSaving,
                        children: "Reset",
                      }),
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "team",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  className: "p-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                              className: "h-5 w-5 mr-2",
                            }),
                            "Team Management",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Manage your company team and departments",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20",
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-center text-muted-foreground",
                          children:
                            "Team management settings will be implemented in a future update",
                        }),
                      }),
                    }),
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "preferences",
                className: "space-y-4 mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  className: "p-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Cog, {
                              className: "h-5 w-5 mr-2",
                            }),
                            "System Preferences",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children:
                            "Configure system-wide preferences for your company",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className:
                          "flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md border-muted-foreground/20",
                        children: (0, jsx_runtime_1.jsx)("p", {
                          className: "text-center text-muted-foreground",
                          children:
                            "System preference settings will be implemented in a future update",
                        }),
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
}
