"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInput = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var ChatInput = function (_a) {
  var onSendMessage = _a.onSendMessage,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    _c = _a.placeholder,
    placeholder = _c === void 0 ? "Type your message..." : _c;
  var _d = (0, react_1.useState)(""),
    message = _d[0],
    setMessage = _d[1];
  var handleChange = function (e) {
    setMessage(e.target.value);
  };
  var handleKeyDown = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  var handleSendMessage = function () {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "relative",
    children: [
      (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
        value: message,
        onChange: handleChange,
        onKeyDown: handleKeyDown,
        placeholder: placeholder,
        className: "pr-12 resize-none min-h-[80px]",
        disabled: isLoading,
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        size: "icon",
        className: "absolute bottom-2 right-2",
        onClick: handleSendMessage,
        disabled: !message.trim() || isLoading,
        children: [
          isLoading
            ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                className: "h-4 w-4 animate-spin",
              })
            : (0, jsx_runtime_1.jsx)(lucide_react_1.Send, {
                className: "h-4 w-4",
              }),
          (0, jsx_runtime_1.jsx)("span", {
            className: "sr-only",
            children: "Send message",
          }),
        ],
      }),
    ],
  });
};
exports.ChatInput = ChatInput;
