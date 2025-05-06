"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var WebhookInput = function (_a) {
  var id = _a.id,
    label = _a.label,
    placeholder = _a.placeholder,
    value = _a.value,
    onChange = _a.onChange,
    isValid = _a.isValid,
    _b = _a.errorMessage,
    errorMessage = _b === void 0 ? "Invalid URL" : _b,
    _c = _a.validMessage,
    validMessage = _c === void 0 ? "Valid URL" : _c,
    validationMessage = _a.validationMessage,
    description = _a.description;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: id, children: label }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "relative",
        children: [
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: id,
            placeholder: placeholder,
            value: value,
            onChange: onChange,
            className: "pr-10 ".concat(
              isValid === true
                ? "border-green-500 focus-visible:ring-green-500"
                : isValid === false
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "",
            ),
          }),
          isValid !== null &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "absolute right-3 top-2.5",
              children: isValid
                ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                    className: "h-5 w-5 text-green-500",
                  })
                : (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                    className: "h-5 w-5 text-red-500",
                  }),
            }),
        ],
      }),
      description &&
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-xs text-muted-foreground",
          children: description,
        }),
      validationMessage &&
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-xs ".concat(
            isValid ? "text-green-500" : "text-red-500",
          ),
          children: validationMessage,
        }),
    ],
  });
};
exports.default = WebhookInput;
