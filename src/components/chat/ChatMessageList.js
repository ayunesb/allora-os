"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
var ChatMessageList = function (_a) {
  var messages = _a.messages,
    _b = _a.isTyping,
    isTyping = _b === void 0 ? false : _b,
    onClearChat = _a.onClearChat;
  var messagesEndRef = (0, react_1.useRef)(null);
  var scrollToBottom = function () {
    var _a;
    (_a = messagesEndRef.current) === null || _a === void 0
      ? void 0
      : _a.scrollIntoView({ behavior: "smooth" });
  };
  (0, react_1.useEffect)(
    function () {
      scrollToBottom();
    },
    [messages],
  );
  if (messages.length === 0) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "h-[400px] flex items-center justify-center",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "text-center",
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mb-2",
            children: "No messages yet",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "Start the conversation by sending a message",
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "relative",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "absolute top-0 right-0",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "ghost",
          size: "icon",
          onClick: onClearChat,
          className: "text-muted-foreground hover:text-foreground",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 16 }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4 mt-2 max-h-[400px] overflow-y-auto pr-2",
        children: [
          messages.map(function (message) {
            return (0, jsx_runtime_1.jsx)(
              "div",
              {
                className: "flex ".concat(
                  message.sender === "user" ? "justify-end" : "justify-start",
                ),
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "max-w-[80%] px-4 py-2 rounded-lg ".concat(
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted",
                  ),
                  children: [
                    message.text,
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-xs mt-1 ".concat(
                        message.sender === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground",
                      ),
                      children: new Date(message.timestamp).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      ),
                    }),
                  ],
                }),
              },
              message.id,
            );
          }),
          isTyping &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "flex justify-start",
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "max-w-[80%] px-4 py-2 rounded-lg bg-muted",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex gap-1 items-center h-6",
                  children: [
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-2 w-2 rounded-full animate-pulse",
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-2 w-2 rounded-full animate-pulse delay-75",
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-2 w-2 rounded-full animate-pulse delay-150",
                    }),
                  ],
                }),
              }),
            }),
          (0, jsx_runtime_1.jsx)("div", { ref: messagesEndRef }),
        ],
      }),
    ],
  });
};
exports.ChatMessageList = ChatMessageList;
