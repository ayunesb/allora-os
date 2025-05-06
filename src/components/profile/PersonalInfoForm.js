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
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var PersonalInfoForm = function (_a) {
  var register = _a.register,
    errors = _a.errors,
    userCreatedAt = _a.userCreatedAt;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium",
        children: "Personal Information",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "name",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
                    className: "h-4 w-4",
                  }),
                  "Full Name",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "name", placeholder: "Your full name" },
                  register("name", { required: "Name is required" }),
                  { className: errors.name ? "border-destructive" : "" },
                ),
              ),
              errors.name &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-destructive",
                  children: errors.name.message,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "email",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.AtSign, {
                    className: "h-4 w-4",
                  }),
                  "Email Address",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  {
                    id: "email",
                    type: "email",
                    placeholder: "Your email address",
                    disabled: true,
                  },
                  register("email"),
                ),
              ),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-xs text-muted-foreground",
                children: "Email cannot be changed",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "company",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Building, {
                    className: "h-4 w-4",
                  }),
                  "Company",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "company", placeholder: "Your company name" },
                  register("company"),
                ),
              ),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "role",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, {
                    className: "h-4 w-4",
                  }),
                  "Job Title",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "role", placeholder: "Your job title" },
                  register("role"),
                ),
              ),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "phone",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                    className: "h-4 w-4",
                  }),
                  "Phone Number",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "phone", placeholder: "Your phone number" },
                  register("phone"),
                ),
              ),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "location",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, {
                    className: "h-4 w-4",
                  }),
                  "Location",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "location", placeholder: "City, Country" },
                  register("location"),
                ),
              ),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "website",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, {
                    className: "h-4 w-4",
                  }),
                  "Website",
                ],
              }),
              (0, jsx_runtime_1.jsx)(
                input_1.Input,
                __assign(
                  { id: "website", placeholder: "https://example.com" },
                  register("website"),
                ),
              ),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "joinDate",
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                    className: "h-4 w-4",
                  }),
                  "Joined",
                ],
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "joinDate",
                value: userCreatedAt
                  ? new Date(userCreatedAt).toLocaleDateString()
                  : "N/A",
                disabled: true,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsxs)(label_1.Label, {
            htmlFor: "bio",
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
                className: "h-4 w-4",
              }),
              "Bio",
            ],
          }),
          (0, jsx_runtime_1.jsx)(
            textarea_1.Textarea,
            __assign(
              { id: "bio", placeholder: "Tell us a bit about yourself" },
              register("bio"),
              { rows: 4 },
            ),
          ),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-xs text-muted-foreground",
            children: "This will be displayed on your public profile",
          }),
        ],
      }),
    ],
  });
};
exports.default = PersonalInfoForm;
