"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@/components/ui/tooltip");
var MessageInput = function (_a) {
  var botName = _a.botName,
    isLoading = _a.isLoading,
    onSendMessage = _a.onSendMessage,
    onRetry = _a.onRetry,
    onClear = _a.onClear,
    error = _a.error,
    _b = _a.canRetry,
    canRetry = _b === void 0 ? false : _b;
  var _c = (0, react_1.useState)(""),
    message = _c[0],
    setMessage = _c[1];
  var textareaRef = (0, react_1.useRef)(null);
  var maxLength = 1000; // Set a reasonable character limit
  // Auto focus the textarea when the component mounts
  (0, react_1.useEffect)(function () {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  // Set up keyboard shortcuts
  (0, react_1.useEffect)(
    function () {
      var handleKeyboardShortcuts = function (e) {
        // Ctrl+Enter or Cmd+Enter to submit
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          if (message.trim() && !isLoading) {
            onSendMessage(message);
            setMessage("");
          }
        }
        // Escape to clear input
        if (
          e.key === "Escape" &&
          document.activeElement === textareaRef.current
        ) {
          setMessage("");
        }
      };
      window.addEventListener("keydown", handleKeyboardShortcuts);
      return function () {
        return window.removeEventListener("keydown", handleKeyboardShortcuts);
      };
    },
    [message, isLoading, onSendMessage],
  );
  var handleSubmit = function (e) {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage("");
    }
  };
  var handleKeyDown = function (e) {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  var getCharacterCountColor = function () {
    var percent = (message.length / maxLength) * 100;
    if (percent < 70) return "text-muted-foreground";
    if (percent < 90) return "text-amber-500";
    return "text-destructive";
  };
  return (0, jsx_runtime_1.jsxs)("form", {
    onSubmit: handleSubmit,
    className: "w-full flex flex-col gap-2",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex-grow relative",
            children: [
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                ref: textareaRef,
                value: message,
                onChange: function (e) {
                  return setMessage(e.target.value);
                },
                onKeyDown: handleKeyDown,
                placeholder: "Ask ".concat(botName, " a question..."),
                className:
                  "flex-grow resize-none min-h-[60px] max-h-[150px] pr-16",
                disabled: isLoading,
                "aria-label": "Your message",
                "aria-describedby": error ? "message-error" : undefined,
                maxLength: maxLength,
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "absolute bottom-2 right-3 text-xs ".concat(
                  getCharacterCountColor(),
                ),
                "aria-live": "polite",
                "aria-atomic": "true",
                children: [message.length, "/", maxLength],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex flex-col gap-2",
            children: (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
              children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                children: [
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                      type: "submit",
                      size: "icon",
                      disabled: !message.trim() || isLoading,
                      "aria-label": "Send message",
                      className:
                        "h-[60px] w-[60px] relative transition-all duration-200 ease-in-out",
                      "data-sending": isLoading,
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.SendIcon,
                        { className: "h-5 w-5" },
                      ),
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                    side: "left",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex flex-col",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          children: "Send message",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-xs opacity-80 mt-1",
                          children: "Ctrl+Enter",
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
            children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
              children: [
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                  asChild: true,
                  children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-7 px-2 text-xs text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Keyboard, {
                        className: "h-3 w-3 mr-1",
                      }),
                      (0, jsx_runtime_1.jsx)("span", { children: "Shortcuts" }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "text-xs space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Enter:",
                          }),
                          " Send message",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Shift+Enter:",
                          }),
                          " New line",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Ctrl/\u2318+Enter:",
                          }),
                          " Send message",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "font-medium",
                            children: "Esc:",
                          }),
                          " Clear input",
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2 justify-end",
            children: [
              onRetry &&
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                  children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                    children: [
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                        asChild: true,
                        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: onRetry,
                          disabled: isLoading || !canRetry,
                          "aria-label": "Retry last message",
                          className: "h-7",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                              className: "h-3.5 w-3.5 mr-1",
                            }),
                            "Retry",
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                        children: (0, jsx_runtime_1.jsx)("p", {
                          children: "Retry last message",
                        }),
                      }),
                    ],
                  }),
                }),
              onClear &&
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                  children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                    children: [
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                        asChild: true,
                        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          type: "button",
                          variant: "outline",
                          size: "sm",
                          onClick: onClear,
                          disabled: isLoading,
                          "aria-label": "Clear conversation",
                          className: "h-7",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                              className: "h-3.5 w-3.5 mr-1",
                            }),
                            "Clear",
                          ],
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                        children: (0, jsx_runtime_1.jsx)("p", {
                          children: "Clear conversation",
                        }),
                      }),
                    ],
                  }),
                }),
            ],
          }),
        ],
      }),
      error &&
        (0, jsx_runtime_1.jsx)("p", {
          id: "message-error",
          className: "text-destructive text-sm mt-1",
          children: error,
        }),
    ],
  });
};
exports.default = MessageInput;
