"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var avatar_1 = require("@/components/ui/avatar");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@/components/ui/tooltip");
var framer_motion_1 = require("framer-motion");
var utils_1 = require("@/lib/utils");
var DebateChat = function (_a) {
  var debateTitle = _a.debateTitle,
    debateObjective = _a.debateObjective,
    messages = _a.messages,
    participants = _a.participants,
    isLoading = _a.isLoading,
    onSendMessage = _a.onSendMessage,
    onSaveDebate = _a.onSaveDebate,
    onExportDebate = _a.onExportDebate,
    onGenerateSummary = _a.onGenerateSummary,
    newMessage = _a.newMessage,
    onNewMessageChange = _a.onNewMessageChange,
    onVoteMessage = _a.onVoteMessage,
    onToggleFavorite = _a.onToggleFavorite;
  var messagesEndRef = (0, react_1.useRef)(null);
  var textareaRef = (0, react_1.useRef)(null);
  // Auto-scroll to bottom when new messages come in
  (0, react_1.useEffect)(
    function () {
      var _a;
      (_a = messagesEndRef.current) === null || _a === void 0
        ? void 0
        : _a.scrollIntoView({ behavior: "smooth" });
    },
    [messages],
  );
  // Create a map of participants for easy lookup
  var participantsMap = new Map();
  participants.forEach(function (participant) {
    participantsMap.set(participant.name, participant);
  });
  // Determine if the scrollable area needs a bottom fade for UX
  var _b = (0, react_1.useState)(false),
    showScrollIndicator = _b[0],
    setShowScrollIndicator = _b[1];
  var messagesContainerRef = (0, react_1.useRef)(null);
  (0, react_1.useEffect)(
    function () {
      var container = messagesContainerRef.current;
      if (!container) return;
      var checkScroll = function () {
        var scrollTop = container.scrollTop,
          scrollHeight = container.scrollHeight,
          clientHeight = container.clientHeight;
        setShowScrollIndicator(
          scrollHeight > clientHeight &&
            scrollTop < scrollHeight - clientHeight - 20,
        );
      };
      container.addEventListener("scroll", checkScroll);
      checkScroll();
      return function () {
        return container.removeEventListener("scroll", checkScroll);
      };
    },
    [messages],
  );
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "flex flex-col h-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-4 flex-shrink-0",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "flex items-center justify-between",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-semibold",
                  children: debateTitle,
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground mt-1",
                  children: debateObjective,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "flex space-x-1",
              children: participants.map(function (participant) {
                return (0, jsx_runtime_1.jsx)(
                  tooltip_1.TooltipProvider,
                  {
                    children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                      children: [
                        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                          asChild: true,
                          children: (0, jsx_runtime_1.jsx)("div", {
                            className:
                              "-mr-3 border-2 border-background rounded-full transition-transform hover:scale-105 hover:z-10",
                            children: (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                              className: "h-8 w-8",
                              children: [
                                (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                  src: participant.avatar,
                                  alt: participant.name,
                                }),
                                (0, jsx_runtime_1.jsx)(
                                  avatar_1.AvatarFallback,
                                  {
                                    children: participant.name
                                      .split(" ")
                                      .map(function (n) {
                                        return n[0];
                                      })
                                      .join(""),
                                  },
                                ),
                              ],
                            }),
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-medium",
                                children: participant.name,
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-xs text-muted-foreground",
                                children: participant.role,
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  },
                  participant.id || participant.name,
                );
              }),
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        ref: messagesContainerRef,
        className: "flex-grow overflow-y-auto px-4 pb-0 relative",
        children: [
          (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, {
            initial: false,
            children:
              showScrollIndicator &&
              (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                className:
                  "absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none z-10",
              }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4 pb-4",
            children: [
              (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, {
                initial: false,
                children: messages.map(function (message, i) {
                  var isSystemMessage = message.senderId === "system";
                  var isUserMessage = message.isUser;
                  var participant = participantsMap.get(message.sender);
                  if (isSystemMessage) {
                    return (0, jsx_runtime_1.jsx)(
                      framer_motion_1.motion.div,
                      {
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.3 },
                        className: "flex justify-center",
                        children: (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "bg-muted/50 text-muted-foreground text-sm py-2 px-4 rounded-full",
                          children: message.content,
                        }),
                      },
                      message.id,
                    );
                  }
                  return (0, jsx_runtime_1.jsx)(
                    framer_motion_1.motion.div,
                    {
                      initial: { opacity: 0, y: 20 },
                      animate: { opacity: 1, y: 0 },
                      transition: {
                        duration: 0.3,
                        delay: Math.min(i * 0.05, 0.3),
                      },
                      className: (0, utils_1.cn)(
                        "flex",
                        isUserMessage ? "justify-end" : "justify-start",
                      ),
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: (0, utils_1.cn)(
                          "flex items-start gap-2 max-w-[85%]",
                          isUserMessage && "flex-row-reverse",
                        ),
                        children: [
                          (0, jsx_runtime_1.jsx)(avatar_1.Avatar, {
                            className: "h-8 w-8 mt-0.5 flex-shrink-0",
                            children: isUserMessage
                              ? (0, jsx_runtime_1.jsxs)(
                                  jsx_runtime_1.Fragment,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarImage,
                                        {
                                          src: "/avatars/user.png",
                                          alt: "You",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarFallback,
                                        {
                                          children: (0, jsx_runtime_1.jsx)(
                                            lucide_react_1.User,
                                            { className: "h-4 w-4" },
                                          ),
                                        },
                                      ),
                                    ],
                                  },
                                )
                              : (0, jsx_runtime_1.jsxs)(
                                  jsx_runtime_1.Fragment,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarImage,
                                        {
                                          src:
                                            participant === null ||
                                            participant === void 0
                                              ? void 0
                                              : participant.avatar,
                                          alt: message.sender,
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarFallback,
                                        {
                                          children: message.sender
                                            .split(" ")
                                            .map(function (n) {
                                              return n[0];
                                            })
                                            .join(""),
                                        },
                                      ),
                                    ],
                                  },
                                ),
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: (0, utils_1.cn)(
                              "space-y-1",
                              isUserMessage && "items-end",
                            ),
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: (0, utils_1.cn)(
                                  "inline-flex items-center",
                                  isUserMessage && "flex-row-reverse",
                                ),
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: (0, utils_1.cn)(
                                      "text-sm font-medium px-1",
                                      isUserMessage ? "text-primary" : "",
                                    ),
                                    children: message.sender,
                                  }),
                                  !isUserMessage &&
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className:
                                        "text-xs text-muted-foreground px-1",
                                      children:
                                        participant === null ||
                                        participant === void 0
                                          ? void 0
                                          : participant.role,
                                    }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: (0, utils_1.cn)(
                                  "rounded-lg p-3",
                                  isUserMessage
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-card-foreground",
                                ),
                                children: (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm whitespace-pre-wrap",
                                  children: message.content,
                                }),
                              }),
                              !isSystemMessage &&
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: (0, utils_1.cn)(
                                    "flex items-center text-xs text-muted-foreground gap-2 pt-0.5",
                                    isUserMessage && "justify-end",
                                  ),
                                  children: [
                                    (0, jsx_runtime_1.jsx)("button", {
                                      onClick: function () {
                                        return onToggleFavorite(message.id);
                                      },
                                      className: (0, utils_1.cn)(
                                        "p-1 rounded-full hover:bg-muted/50 transition-colors",
                                        message.isFavorite
                                          ? "text-red-500"
                                          : "text-muted-foreground",
                                      ),
                                      children: (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Heart,
                                        { className: "h-3 w-3" },
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsx)("button", {
                                      onClick: function () {
                                        return onVoteMessage(message.id, 1);
                                      },
                                      className:
                                        "p-1 rounded-full hover:bg-muted/50 transition-colors",
                                      children: (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ThumbsUp,
                                        { className: "h-3 w-3" },
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsx)("button", {
                                      onClick: function () {
                                        return onVoteMessage(message.id, -1);
                                      },
                                      className:
                                        "p-1 rounded-full hover:bg-muted/50 transition-colors",
                                      children: (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ThumbsDown,
                                        { className: "h-3 w-3" },
                                      ),
                                    }),
                                    (0, jsx_runtime_1.jsx)("span", {
                                      className: "text-xs",
                                      children:
                                        message.votes > 0
                                          ? "+".concat(message.votes)
                                          : message.votes,
                                    }),
                                  ],
                                }),
                            ],
                          }),
                        ],
                      }),
                    },
                    message.id,
                  );
                }),
              }),
              (0, jsx_runtime_1.jsx)(framer_motion_1.AnimatePresence, {
                children:
                  isLoading &&
                  (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0 },
                    className: "flex justify-center py-2",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "flex space-x-1",
                          children: [0, 1, 2].map(function (i) {
                            return (0, jsx_runtime_1.jsx)(
                              "div",
                              {
                                className:
                                  "w-2 h-2 rounded-full bg-primary/50 animate-pulse",
                                style: {
                                  animationDelay: "".concat(i * 0.15, "s"),
                                },
                              },
                              i,
                            );
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm text-muted-foreground",
                          children: "Executives are thinking...",
                        }),
                      ],
                    }),
                  }),
              }),
              (0, jsx_runtime_1.jsx)("div", { ref: messagesEndRef }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "pt-4 pb-4 flex-shrink-0",
        children: (0, jsx_runtime_1.jsxs)("form", {
          onSubmit: onSendMessage,
          className: "w-full space-y-2",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "relative",
              children: [
                (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                  ref: textareaRef,
                  value: newMessage,
                  onChange: onNewMessageChange,
                  placeholder:
                    "Ask a question or provide input to the executives...",
                  className: "min-h-[80px] resize-none pr-12",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "absolute bottom-2 right-2",
                  children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    type: "submit",
                    size: "icon",
                    className: "h-8 w-8 rounded-full",
                    disabled: isLoading || !newMessage.trim(),
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Send, {
                        className: "h-4 w-4",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "sr-only",
                        children: "Send message",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      onClick: onExportDebate,
                      disabled: messages.length === 0,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                          className: "h-4 w-4 mr-1",
                        }),
                        "Export",
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      type: "button",
                      size: "sm",
                      variant: "ghost",
                      onClick: onSaveDebate,
                      disabled: messages.length === 0,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                          className: "h-4 w-4 mr-1",
                        }),
                        "Save",
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  type: "button",
                  size: "sm",
                  variant: "outline",
                  onClick: onGenerateSummary,
                  disabled: messages.length < 5,
                  className: "gap-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                      className: "h-4 w-4",
                    }),
                    "Generate Summary",
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = DebateChat;
