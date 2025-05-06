"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
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
var typography_1 = require("@/components/ui/typography");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var avatar_1 = require("@/components/ui/avatar");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var apiClientEnhanced_1 = require("@/utils/api/apiClientEnhanced");
var AIChat = function (_a) {
  var children = _a.children,
    executiveName = _a.executiveName,
    executiveRole = _a.executiveRole,
    messages = _a.messages;
  var _b = (0, react_1.useState)(""),
    inputMessage = _b[0],
    setInputMessage = _b[1];
  var _c = (0, react_1.useState)(false),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var _d = (0, react_1.useState)("ceo"),
    activeTab = _d[0],
    setActiveTab = _d[1];
  var messagesEndRef = (0, react_1.useRef)(null);
  var execute = (0, apiClientEnhanced_1.useApiClient)().execute;
  var executives = {
    ceo: {
      id: "1",
      name: "Alex Chen",
      role: "CEO",
      avatarUrl: "/assets/executives/ceo-avatar.png",
    },
    cfo: {
      id: "2",
      name: "Morgan Patel",
      role: "CFO",
      avatarUrl: "/assets/executives/cfo-avatar.png",
    },
    cmo: {
      id: "3",
      name: "Sarah Johnson",
      role: "CMO",
      avatarUrl: "/assets/executives/cmo-avatar.png",
    },
    cto: {
      id: "4",
      name: "David Miller",
      role: "CTO",
      avatarUrl: "/assets/executives/cto-avatar.png",
    },
  };
  var activeExecutive = executives[activeTab];
  (0, react_1.useEffect)(
    function () {
      scrollToBottom();
    },
    [messages],
  );
  var scrollToBottom = function () {
    var _a;
    (_a = messagesEndRef.current) === null || _a === void 0
      ? void 0
      : _a.scrollIntoView({ behavior: "smooth" });
  };
  var handleSendMessage = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var userMessage, loadingMessageId, loadingMessage;
      return __generator(this, function (_a) {
        if (!inputMessage.trim()) return [2 /*return*/];
        userMessage = {
          id: Date.now().toString(),
          content: inputMessage,
          role: "user",
          timestamp: new Date(),
        };
        setMessages(function (prev) {
          return __spreadArray(
            __spreadArray([], prev, true),
            [userMessage],
            false,
          );
        });
        setInputMessage("");
        loadingMessageId = Date.now().toString() + "-loading";
        loadingMessage = {
          id: loadingMessageId,
          content: "Thinking...",
          role: "assistant",
          timestamp: new Date(),
          executiveName: activeExecutive.name,
          executiveRole: activeExecutive.role,
          isLoading: true,
        };
        setIsLoading(true);
        setMessages(function (prev) {
          return __spreadArray(
            __spreadArray([], prev, true),
            [loadingMessage],
            false,
          );
        });
        try {
          // Simulate API call to get AI response
          // In a real implementation, this would call your backend
          setTimeout(function () {
            // Remove loading message and add actual response
            setMessages(function (prev) {
              return prev.filter(function (m) {
                return m.id !== loadingMessageId;
              });
            });
            var response = {
              id: Date.now().toString(),
              content: generateResponse(inputMessage, activeExecutive),
              role: "assistant",
              timestamp: new Date(),
              executiveName: activeExecutive.name,
              executiveRole: activeExecutive.role,
            };
            setMessages(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [response],
                false,
              );
            });
            setIsLoading(false);
          }, 1500);
          // For a real implementation with your API:
          /*
                const response = await execute<{response: string}>('/api/chat', 'POST', {
                  message: inputMessage,
                  executiveId: activeExecutive.id
                });
                
                setMessages(prev => prev.filter(m => m.id !== loadingMessageId));
                
                const aiMessage: Message = {
                  id: Date.now().toString(),
                  content: response.response,
                  role: 'assistant',
                  timestamp: new Date(),
                  executiveName: activeExecutive.name,
                  executiveRole: activeExecutive.role
                };
                
                setMessages(prev => [...prev, aiMessage]);
                */
        } catch (error) {
          console.error("Failed to get response:", error);
          sonner_1.toast.error("Failed to get response from AI executive.");
          setMessages(function (prev) {
            return prev.filter(function (m) {
              return m.id !== loadingMessageId;
            });
          });
        } finally {
          setIsLoading(false);
        }
        return [2 /*return*/];
      });
    });
  };
  var generateResponse = function (message, executive) {
    // This is a placeholder. In a real app, this would come from your AI backend
    var responses = {
      ceo: [
        "Based on our strategic direction, I'd recommend focusing on market expansion while maintaining our core values.",
        "Let's approach this challenge by leveraging our organizational strengths and addressing our weaknesses head-on.",
        "I see significant potential in this opportunity. Let's assemble a cross-functional team to explore it further.",
      ],
      cfo: [
        "From a financial perspective, we should consider the ROI and cash flow implications before proceeding.",
        "Our quarterly projections indicate we have capacity for this investment if we adjust our spending in Q3.",
        "I recommend a phased approach to minimize financial risk while testing market response.",
      ],
      cmo: [
        "Our target audience would respond positively to this messaging based on our recent market research.",
        "I suggest we position this offering as premium in our existing markets before expanding to new segments.",
        "This aligns well with our brand values and would complement our current marketing initiatives.",
      ],
      cto: [
        "We can implement this using our existing technology stack with minimal additional resources.",
        "From a technical standpoint, we should consider scalability and security implications first.",
        "I recommend developing an MVP to test key assumptions before committing to a full implementation.",
      ],
    };
    var roleResponses =
      responses[
        executive.id === "1"
          ? "ceo"
          : executive.id === "2"
            ? "cfo"
            : executive.id === "3"
              ? "cmo"
              : "cto"
      ];
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };
  var handleKeyDown = function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  var provideFeedback = function (messageId, isPositive) {
    sonner_1.toast.success(
      "".concat(
        isPositive ? "Positive" : "Negative",
        " feedback recorded. Thank you!",
      ),
    );
    // Here you would typically send this feedback to your API
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container px-4 py-6 h-full flex flex-col",
    children: [
      (0, jsx_runtime_1.jsx)(typography_1.PageTitle, {
        title: "AI Executive Chat",
        description:
          "Chat with your AI executives for strategic insights and guidance",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-6 flex-1 flex flex-col gap-4 h-full",
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          value: activeTab,
          onValueChange: setActiveTab,
          className: "w-full",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "grid grid-cols-4 mb-4",
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "ceo",
                  children: "CEO",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "cfo",
                  children: "CFO",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "cmo",
                  children: "CMO",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "cto",
                  children: "CTO",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              className: "flex-1 flex flex-col h-[calc(100vh-260px)]",
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2 border-b",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                        className: "h-8 w-8",
                        children: [
                          (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                            src: activeExecutive.avatarUrl,
                          }),
                          (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                            children: activeExecutive.name.charAt(0),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                          className: "text-lg flex items-center gap-2",
                          children: [
                            activeExecutive.name,
                            (0, jsx_runtime_1.jsxs)("span", {
                              className:
                                "text-sm font-normal text-muted-foreground",
                              children: ["\u2022 ", activeExecutive.role],
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  className: "flex-1 overflow-auto py-4 px-4",
                  children:
                    messages.length === 0
                      ? (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "h-full flex items-center justify-center text-center",
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "max-w-md",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.MessageSquare,
                                {
                                  className:
                                    "h-12 w-12 mx-auto mb-4 text-muted-foreground/50",
                                },
                              ),
                              (0, jsx_runtime_1.jsxs)("h3", {
                                className: "text-lg font-medium mb-2",
                                children: ["Chat with ", activeExecutive.name],
                              }),
                              (0, jsx_runtime_1.jsxs)("p", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                  "Start a conversation with your ",
                                  activeExecutive.role,
                                  " to get strategic insights and guidance tailored to your business.",
                                ],
                              }),
                            ],
                          }),
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "space-y-4",
                          children: [
                            messages.map(function (message) {
                              var _a;
                              return (0, jsx_runtime_1.jsx)(
                                "div",
                                {
                                  className: "flex ".concat(
                                    message.role === "user"
                                      ? "justify-end"
                                      : "justify-start",
                                  ),
                                  children: (0, jsx_runtime_1.jsxs)("div", {
                                    className:
                                      "max-w-[80%] rounded-lg px-4 py-2 ".concat(
                                        message.role === "user"
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted",
                                      ),
                                    children: [
                                      message.role === "assistant" &&
                                        (0, jsx_runtime_1.jsxs)("div", {
                                          className:
                                            "flex items-center gap-2 mb-1",
                                          children: [
                                            (0, jsx_runtime_1.jsxs)(
                                              avatar_1.Avatar,
                                              {
                                                className: "h-6 w-6",
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    avatar_1.AvatarImage,
                                                    {
                                                      src: activeExecutive.avatarUrl,
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    avatar_1.AvatarFallback,
                                                    {
                                                      children:
                                                        (_a =
                                                          message.executiveName) ===
                                                          null || _a === void 0
                                                          ? void 0
                                                          : _a.charAt(0),
                                                    },
                                                  ),
                                                ],
                                              },
                                            ),
                                            (0, jsx_runtime_1.jsx)("span", {
                                              className:
                                                "text-xs font-semibold",
                                              children: message.executiveName,
                                            }),
                                            (0, jsx_runtime_1.jsxs)("span", {
                                              className:
                                                "text-xs text-muted-foreground",
                                              children: [
                                                "\u2022 ",
                                                message.executiveRole,
                                              ],
                                            }),
                                          ],
                                        }),
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className: "text-sm",
                                        children: message.isLoading
                                          ? (0, jsx_runtime_1.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2",
                                              children: [
                                                (0, jsx_runtime_1.jsx)(
                                                  lucide_react_1.RefreshCw,
                                                  {
                                                    className:
                                                      "h-4 w-4 animate-spin",
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)("span", {
                                                  children: message.content,
                                                }),
                                              ],
                                            })
                                          : message.content,
                                      }),
                                      message.role === "assistant" &&
                                        !message.isLoading &&
                                        (0, jsx_runtime_1.jsxs)("div", {
                                          className:
                                            "flex justify-end gap-1 mt-1",
                                          children: [
                                            (0, jsx_runtime_1.jsx)(
                                              button_1.Button,
                                              {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "h-6 w-6",
                                                onClick: function () {
                                                  return provideFeedback(
                                                    message.id,
                                                    true,
                                                  );
                                                },
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  lucide_react_1.ThumbsUp,
                                                  { className: "h-4 w-4" },
                                                ),
                                              },
                                            ),
                                            (0, jsx_runtime_1.jsx)(
                                              button_1.Button,
                                              {
                                                variant: "ghost",
                                                size: "icon",
                                                className: "h-6 w-6",
                                                onClick: function () {
                                                  return provideFeedback(
                                                    message.id,
                                                    false,
                                                  );
                                                },
                                                children: (0,
                                                jsx_runtime_1.jsx)(
                                                  lucide_react_1.ThumbsDown,
                                                  { className: "h-4 w-4" },
                                                ),
                                              },
                                            ),
                                          ],
                                        }),
                                    ],
                                  }),
                                },
                                message.id,
                              );
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              ref: messagesEndRef,
                            }),
                          ],
                        }),
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "p-4 border-t",
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-end gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                        placeholder: "Type your message...",
                        value: inputMessage,
                        onChange: function (e) {
                          return setInputMessage(e.target.value);
                        },
                        onKeyDown: handleKeyDown,
                        className: "flex-1 min-h-[60px] resize-none",
                        disabled: isLoading,
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex flex-col gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(button_1.Button, {
                            size: "icon",
                            variant: "outline",
                            type: "button",
                            disabled: isLoading,
                            onClick: function () {
                              return sonner_1.toast.info(
                                "Voice input feature coming soon!",
                              );
                            },
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.Mic,
                              { className: "h-5 w-5" },
                            ),
                          }),
                          (0, jsx_runtime_1.jsx)(button_1.Button, {
                            size: "icon",
                            type: "button",
                            disabled: !inputMessage.trim() || isLoading,
                            onClick: handleSendMessage,
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.Send,
                              { className: "h-5 w-5" },
                            ),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
exports.default = AIChat;
