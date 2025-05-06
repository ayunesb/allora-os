"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
var BotChatPanel = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "medium" : _c,
    botId = _a.botId,
    bot = _a.bot,
    selectedBot = _a.selectedBot,
    onSelectBot = _a.onSelectBot,
    allBots = _a.allBots;
  var _d = (0, react_1.useState)(""),
    message = _d[0],
    setMessage = _d[1];
  var _e = (0, react_1.useState)([]),
    chatHistory = _e[0],
    setChatHistory = _e[1];
  // Use botId if provided or use selectedBot if available
  var activeBotName =
    (selectedBot === null || selectedBot === void 0
      ? void 0
      : selectedBot.name) ||
    (bot === null || bot === void 0 ? void 0 : bot.name) ||
    "Bot";
  var handleSend = function () {
    if (!message.trim()) return;
    // Add user message to chat
    var userMessage = {
      id: Date.now().toString(),
      content: message,
      isUser: true,
    };
    setChatHistory(
      __spreadArray(__spreadArray([], chatHistory, true), [userMessage], false),
    );
    // Clear input
    setMessage("");
    // Simulate bot response
    setTimeout(function () {
      var botMessage = {
        id: (Date.now() + 1).toString(),
        content: "This is a response from ".concat(activeBotName),
        isUser: false,
      };
      setChatHistory(function (prev) {
        return __spreadArray(
          __spreadArray([], prev, true),
          [botMessage],
          false,
        );
      });
    }, 1000);
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "flex flex-col h-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-3",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "text-lg font-medium",
          children: [
            activeBotName,
            " ",
            (bot === null || bot === void 0 ? void 0 : bot.title)
              ? "- ".concat(bot.title)
              : "",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "flex-1 overflow-auto pb-6",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            chatHistory.map(function (msg) {
              return (0, jsx_runtime_1.jsx)(
                "div",
                {
                  className: "p-3 rounded-lg max-w-[80%] ".concat(
                    msg.isUser
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-muted-foreground",
                  ),
                  children: msg.content,
                },
                msg.id,
              );
            }),
            chatHistory.length === 0 &&
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-center text-muted-foreground py-8",
                children: ["Start a conversation with ", activeBotName],
              }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "p-4 border-t",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex gap-2",
          children: [
            (0, jsx_runtime_1.jsx)(input_1.Input, {
              value: message,
              onChange: function (e) {
                return setMessage(e.target.value);
              },
              placeholder: "Type a message...",
              className: "flex-1",
              onKeyDown: function (e) {
                return e.key === "Enter" && handleSend();
              },
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              size: "icon",
              onClick: handleSend,
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Send, {
                className: "h-4 w-4",
              }),
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = BotChatPanel;
