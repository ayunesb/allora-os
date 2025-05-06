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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveMessages = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var scroll_area_1 = require("@/components/ui/scroll-area");
var meshNetwork_1 = require("@/agents/meshNetwork");
var AuthContext_1 = require("@/context/AuthContext");
var ExecutiveMessages = function (_a) {
  var executiveName = _a.executiveName,
    executiveRole = _a.executiveRole,
    avatarUrl = _a.avatarUrl;
  var _b = (0, react_1.useState)([]),
    messages = _b[0],
    setMessages = _b[1];
  var _c = (0, react_1.useState)(true),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var user = (0, AuthContext_1.useAuth)().user;
  (0, react_1.useEffect)(
    function () {
      var loadMessages = function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var executiveMessages, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 2, 3, 4]);
                setIsLoading(true);
                return [
                  4 /*yield*/,
                  (0, meshNetwork_1.fetchMessagesForExecutive)(executiveName),
                ];
              case 1:
                executiveMessages = _a.sent();
                setMessages(executiveMessages);
                return [3 /*break*/, 4];
              case 2:
                error_1 = _a.sent();
                console.error("Failed to fetch executive messages:", error_1);
                return [3 /*break*/, 4];
              case 3:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      loadMessages();
    },
    [executiveName],
  );
  var getInitials = function (name) {
    return name
      .split(" ")
      .map(function (part) {
        return part[0];
      })
      .join("")
      .toUpperCase();
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "text-lg flex items-center gap-2",
            children: [
              "Messages",
              messages.filter(function (m) {
                return !m.read;
              }).length > 0 &&
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "destructive",
                  className:
                    "rounded-full h-5 min-w-5 flex items-center justify-center p-1",
                  children: messages.filter(function (m) {
                    return !m.read;
                  }).length,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Communications with other executives",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "flex items-center justify-center p-6",
              children: (0, jsx_runtime_1.jsx)("div", {
                className:
                  "animate-spin rounded-full h-8 w-8 border-b-2 border-primary",
              }),
            })
          : messages.length > 0
            ? (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollArea, {
                className: "h-[320px] pr-4",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "space-y-4",
                  children: messages.map(function (message) {
                    return (0, jsx_runtime_1.jsxs)(
                      "div",
                      {
                        className: "flex gap-3 ".concat(
                          !message.read ? "bg-primary/5 p-2 rounded-md" : "",
                        ),
                        children: [
                          (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                            className: "h-8 w-8",
                            children: [
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                src:
                                  message.from === executiveName
                                    ? avatarUrl
                                    : undefined,
                              }),
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                                children: getInitials(message.from),
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-1 flex-1",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex justify-between items-center",
                                children: [
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm font-medium",
                                    children: message.from,
                                  }),
                                  (0, jsx_runtime_1.jsx)("time", {
                                    className: "text-xs text-muted-foreground",
                                    children: new Date(
                                      message.timestamp,
                                    ).toLocaleDateString(),
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm text-muted-foreground",
                                children: message.content,
                              }),
                            ],
                          }),
                        ],
                      },
                      message.id,
                    );
                  }),
                }),
              })
            : (0, jsx_runtime_1.jsxs)("div", {
                className: "text-center p-6 text-muted-foreground",
                children: [
                  (0, jsx_runtime_1.jsx)("p", { children: "No messages yet" }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    className: "mt-2",
                    onClick: function () {
                      // Placeholder for message generation
                      console.log("Generate sample message");
                    },
                    children: "Generate Introduction",
                  }),
                ],
              }),
      }),
    ],
  });
};
exports.ExecutiveMessages = ExecutiveMessages;
exports.default = exports.ExecutiveMessages;
