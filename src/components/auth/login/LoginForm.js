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
exports.LoginForm = LoginForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var zod_2 = require("zod");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var checkbox_1 = require("@/components/ui/checkbox");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var loginSchema = zod_2.z.object({
  email: zod_2.z.string().email("Please enter a valid email address"),
  password: zod_2.z.string().min(1, "Password is required"),
  rememberMe: zod_2.z.boolean().default(true),
});
function LoginForm(_a) {
  var onSubmit = _a.onSubmit,
    isLoading = _a.isLoading;
  var _b = (0, react_1.useState)(false),
    showPassword = _b[0],
    setShowPassword = _b[1];
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
  var togglePasswordVisibility = function () {
    return setShowPassword(!showPassword);
  };
  return (0, jsx_runtime_1.jsx)(
    form_1.Form,
    __assign({}, form, {
      children: (0, jsx_runtime_1.jsxs)("form", {
        onSubmit: form.handleSubmit(onSubmit),
        className: "space-y-4",
        children: [
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
                        disabled: isLoading,
                        className: "allora-input",
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
            name: "password",
            render: function (_a) {
              var field = _a.field;
              return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center justify-between",
                    children: [
                      (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                        children: "Password",
                      }),
                      (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                        to: "/reset-password",
                        className: "text-xs text-primary hover:underline",
                        children: "Forgot password?",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "relative",
                    children: [
                      (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                        children: (0, jsx_runtime_1.jsx)(
                          input_1.Input,
                          __assign(
                            {
                              type: showPassword ? "text" : "password",
                              placeholder:
                                "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                            },
                            field,
                            { disabled: isLoading, className: "allora-input" },
                          ),
                        ),
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        className: "absolute right-0 top-0 h-full px-3",
                        onClick: togglePasswordVisibility,
                        children: [
                          showPassword
                            ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, {
                                className: "h-4 w-4",
                              })
                            : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
                                className: "h-4 w-4",
                              }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "sr-only",
                            children: showPassword
                              ? "Hide password"
                              : "Show password",
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
            name: "rememberMe",
            render: function (_a) {
              var field = _a.field;
              return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                className: "flex flex-row items-start space-x-3 space-y-0 py-1",
                children: [
                  (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                    children: (0, jsx_runtime_1.jsx)(checkbox_1.Checkbox, {
                      checked: field.value,
                      onCheckedChange: field.onChange,
                      id: "remember-me",
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "space-y-1 leading-none",
                    children: (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                      htmlFor: "remember-me",
                      className: "text-sm text-muted-foreground cursor-pointer",
                      children: "Keep me signed in",
                    }),
                  }),
                ],
              });
            },
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            type: "submit",
            className: "allora-button w-full mt-6",
            disabled: isLoading,
            children: isLoading
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    " Logging in...",
                  ],
                })
              : "Login",
          }),
        ],
      }),
    }),
  );
}
