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
exports.default = SignupForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var alert_1 = require("@/components/ui/alert");
var useSignupForm_1 = require("@/hooks/useSignupForm");
var PasswordInput_1 = require("./PasswordInput");
var CompanyInfoFields_1 = require("./CompanyInfoFields");
var react_1 = require("react");
function SignupForm(_a) {
  var onSubmitSuccess = _a.onSubmitSuccess;
  var _b = (0, useSignupForm_1.useSignupForm)({
      onSubmitSuccess: onSubmitSuccess,
    }),
    form = _b.form,
    isLoading = _b.isLoading,
    onSubmit = _b.onSubmit,
    navigate = _b.navigate,
    formError = _b.formError;
  var _c = (0, react_1.useState)(false),
    showPasswordTips = _c[0],
    setShowPasswordTips = _c[1];
  return (0, jsx_runtime_1.jsx)(
    form_1.Form,
    __assign({}, form, {
      children: (0, jsx_runtime_1.jsxs)("form", {
        onSubmit: form.handleSubmit(onSubmit),
        className: "space-y-4",
        children: [
          formError &&
            (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
              variant: "destructive",
              className: "mb-4",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                  className: "h-4 w-4",
                }),
                (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                  children: formError,
                }),
              ],
            }),
          (0, jsx_runtime_1.jsx)(form_1.FormField, {
            control: form.control,
            name: "name",
            render: function (_a) {
              var field = _a.field;
              return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                children: [
                  (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                    children: "Full Name",
                  }),
                  (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                    children: (0, jsx_runtime_1.jsx)(
                      input_1.Input,
                      __assign({ placeholder: "John Doe" }, field),
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                ],
              });
            },
          }),
          (0, jsx_runtime_1.jsx)(form_1.FormField, {
            control: form.control,
            name: "email",
            render: function (_a) {
              var field = _a.field;
              return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                children: [
                  (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                    children: "Email",
                  }),
                  (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                    children: (0, jsx_runtime_1.jsx)(
                      input_1.Input,
                      __assign({ placeholder: "you@example.com" }, field, {
                        type: "email",
                        autoComplete: "email",
                      }),
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                ],
              });
            },
          }),
          (0, jsx_runtime_1.jsx)(PasswordInput_1.default, {
            form: form,
            name: "password",
            label: "Password",
            showStrengthMeter: true,
            setShowTips: setShowPasswordTips,
          }),
          showPasswordTips &&
            (0, jsx_runtime_1.jsxs)("div", {
              className:
                "text-xs text-muted-foreground space-y-1 bg-muted p-2 rounded",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children: "Your password should:",
                }),
                (0, jsx_runtime_1.jsxs)("ul", {
                  className: "list-disc pl-4 space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Be at least 8 characters long",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Include uppercase and lowercase letters",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Include at least one number",
                    }),
                    (0, jsx_runtime_1.jsx)("li", {
                      children: "Include at least one special character",
                    }),
                  ],
                }),
              ],
            }),
          (0, jsx_runtime_1.jsx)(PasswordInput_1.default, {
            form: form,
            name: "confirmPassword",
            label: "Confirm Password",
          }),
          (0, jsx_runtime_1.jsx)(CompanyInfoFields_1.default, { form: form }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            type: "submit",
            className: "w-full mt-6",
            disabled: isLoading,
            size: "lg",
            children: isLoading
              ? "Creating Account..."
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    "Create Account ",
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                      className: "ml-2 h-4 w-4",
                    }),
                  ],
                }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-center mt-4",
            children: (0, jsx_runtime_1.jsxs)("p", {
              className: "text-muted-foreground",
              children: [
                "Already have an account?",
                " ",
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "link",
                  className: "p-0",
                  onClick: function () {
                    return navigate("/login");
                  },
                  type: "button",
                  children: "Log in",
                }),
              ],
            }),
          }),
        ],
      }),
    }),
  );
}
