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
exports.default = PasswordInput;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var PasswordStrengthMeter_1 = require("./PasswordStrengthMeter");
function PasswordInput(_a) {
  var form = _a.form,
    name = _a.name,
    label = _a.label,
    _b = _a.showStrengthMeter,
    showStrengthMeter = _b === void 0 ? false : _b,
    setShowTips = _a.setShowTips;
  var _c = (0, react_1.useState)(false),
    showPassword = _c[0],
    setShowPassword = _c[1];
  var togglePasswordVisibility = function () {
    setShowPassword(!showPassword);
  };
  return (0, jsx_runtime_1.jsx)(form_1.FormField, {
    control: form.control,
    name: name,
    render: function (_a) {
      var field = _a.field;
      return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
        children: [
          (0, jsx_runtime_1.jsx)(form_1.FormLabel, { children: label }),
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
                    {
                      onFocus: function () {
                        return setShowTips && setShowTips(true);
                      },
                      onBlur: function () {
                        return setShowTips && setShowTips(false);
                      },
                      className: "pr-10",
                    },
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
                    children: showPassword ? "Hide password" : "Show password",
                  }),
                ],
              }),
            ],
          }),
          showStrengthMeter &&
            form.watch(name) &&
            (0, jsx_runtime_1.jsx)(PasswordStrengthMeter_1.default, {
              password: form.watch(name),
            }),
          (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
        ],
      });
    },
  });
}
