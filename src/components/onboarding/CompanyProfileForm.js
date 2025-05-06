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
exports.default = CompanyProfileForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var z = require("zod");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var textarea_1 = require("@/components/ui/textarea");
var industries_1 = require("@/constants/industries");
var companyProfileSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  size: z.string().optional(),
});
function CompanyProfileForm(_a) {
  var onSubmit = _a.onSubmit,
    initialValues = _a.initialValues,
    isLoading = _a.isLoading;
  var _b = (0, react_hook_form_1.useForm)({
      resolver: (0, zod_1.zodResolver)(companyProfileSchema),
      defaultValues: {
        name:
          (initialValues === null || initialValues === void 0
            ? void 0
            : initialValues.name) || "",
        industry:
          (initialValues === null || initialValues === void 0
            ? void 0
            : initialValues.industry) || "",
        website:
          (initialValues === null || initialValues === void 0
            ? void 0
            : initialValues.website) || "",
        description:
          (initialValues === null || initialValues === void 0
            ? void 0
            : initialValues.description) || "",
        size:
          (initialValues === null || initialValues === void 0
            ? void 0
            : initialValues.size) || "",
      },
    }),
    register = _b.register,
    handleSubmit = _b.handleSubmit,
    errors = _b.formState.errors,
    setValue = _b.setValue,
    watch = _b.watch;
  var handleIndustryChange = function (value) {
    setValue("industry", value);
  };
  var handleSizeChange = function (value) {
    setValue("size", value);
  };
  var selectedIndustry = watch("industry");
  var selectedSize = watch("size");
  return (0, jsx_runtime_1.jsxs)("form", {
    onSubmit: handleSubmit(onSubmit),
    className: "space-y-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "name",
                children: "Company Name",
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "name", placeholder: "Enter your company name" },
                  register("name"),
                  { className: errors.name ? "border-red-500" : "" },
                ),
              ),
              errors.name &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-red-500",
                  children: errors.name.message,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "industry",
                children: "Industry",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: selectedIndustry,
                onValueChange: handleIndustryChange,
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "industry",
                    className: errors.industry ? "border-red-500" : "",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select your industry",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                    children: industries_1.INDUSTRY_OPTIONS.map(
                      function (industry) {
                        return (0, jsx_runtime_1.jsx)(
                          select_1.SelectItem,
                          { value: industry.value, children: industry.label },
                          industry.value,
                        );
                      },
                    ),
                  }),
                ],
              }),
              errors.industry &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-red-500",
                  children: errors.industry.message,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "website",
                children: "Website URL",
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "website", placeholder: "https://yourcompany.com" },
                  register("website"),
                  { className: errors.website ? "border-red-500" : "" },
                ),
              ),
              errors.website &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-red-500",
                  children: errors.website.message,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "size",
                children: "Company Size",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: selectedSize,
                onValueChange: handleSizeChange,
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "size",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select company size",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "1-10",
                        children: "1-10 employees",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "11-50",
                        children: "11-50 employees",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "51-200",
                        children: "51-200 employees",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "201-500",
                        children: "201-500 employees",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "501-1000",
                        children: "501-1000 employees",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "1001+",
                        children: "1001+ employees",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "description",
                children: "Company Description",
              }),
              (0, jsx_runtime_1.jsx)(
                textarea_1.Textarea,
                __assign(
                  {
                    id: "description",
                    placeholder: "Brief description of your company",
                  },
                  register("description"),
                  { className: errors.description ? "border-red-500" : "" },
                ),
              ),
              errors.description &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-red-500",
                  children: errors.description.message,
                }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        type: "submit",
        disabled: isLoading,
        children: isLoading ? "Saving..." : "Save Company Profile",
      }),
    ],
  });
}
