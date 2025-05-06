"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var APIKeyInput = function (_a) {
  var id = _a.id,
    label = _a.label,
    value = _a.value,
    onChange = _a.onChange,
    placeholder = _a.placeholder,
    _b = _a.isSecret,
    isSecret = _b === void 0 ? true : _b;
  var _c = (0, react_1.useState)(false),
    showSecret = _c[0],
    setShowSecret = _c[1];
  // Function to mask API keys for display
  var maskApiKey = function (key) {
    if (!key) return "";
    if (key.length <= 8) return "••••••••";
    // For longer keys, show first and last 4 characters
    return ""
      .concat(
        key.substring(0, 4),
        "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      )
      .concat(key.substring(key.length - 4));
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: id, children: label }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex relative",
        children: [
          (0, jsx_runtime_1.jsx)(input_1.Input, {
            id: id,
            type: isSecret && !showSecret ? "password" : "text",
            placeholder: placeholder || "Enter API key",
            value: value,
            onChange: function (e) {
              return onChange(e.target.value);
            },
            className: "pr-10",
          }),
          isSecret &&
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              type: "button",
              variant: "ghost",
              size: "icon",
              className: "absolute right-0 top-0 h-full",
              onClick: function () {
                return setShowSecret(!showSecret);
              },
              children: showSecret
                ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, {
                    className: "h-4 w-4",
                  })
                : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, {
                    className: "h-4 w-4",
                  }),
            }),
        ],
      }),
    ],
  });
};
exports.default = APIKeyInput;
