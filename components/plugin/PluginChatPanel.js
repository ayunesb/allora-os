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
var Message_1 = require("./Message");
var usePlugin_1 = require("@/hooks/usePlugin");
var PluginChatPanel = function (_a) {
  var pluginId = _a.pluginId;
  var _b = (0, react_1.useState)(""),
    input = _b[0],
    setInput = _b[1];
  var _c = (0, react_1.useState)([]),
    messages = _c[0],
    setMessages = _c[1];
  var _d = (0, react_1.useState)(false),
    loading = _d[0],
    setLoading = _d[1];
  var plugin = (0, usePlugin_1.usePlugin)(pluginId).plugin;
  var bottomRef = (0, react_1.useRef)(null);
  (0, react_1.useEffect)(
    function () {
      var _a;
      (_a = bottomRef.current) === null || _a === void 0
        ? void 0
        : _a.scrollIntoView({ behavior: "smooth" });
    },
    [messages],
  );
  var sendMessage = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var userMessage, res, data_1, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!input.trim()) return [2 /*return*/];
            userMessage = {
              id: crypto.randomUUID(),
              sender: "user",
              message: input,
              created_at: new Date().toISOString(),
            };
            setMessages(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [userMessage],
                false,
              );
            });
            setInput("");
            setLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, 5, 6]);
            return [
              4 /*yield*/,
              fetch("/api/plugin-chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  message: userMessage.message,
                  pluginId: pluginId,
                }),
              }),
            ];
          case 2:
            res = _a.sent();
            return [4 /*yield*/, res.json()];
          case 3:
            data_1 = _a.sent();
            setMessages(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [
                  {
                    id: crypto.randomUUID(),
                    sender: "agent",
                    message: data_1.response.message,
                    created_at: new Date().toISOString(),
                  },
                ],
                false,
              );
            });
            return [3 /*break*/, 6];
          case 4:
            error_1 = _a.sent();
            console.error("Failed to send message:", error_1);
            return [3 /*break*/, 6];
          case 5:
            setLoading(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col h-full",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1 overflow-y-auto p-4",
        children: [
          messages.map(function (msg) {
            return (0, jsx_runtime_1.jsx)(
              Message_1.default,
              { message: msg },
              msg.id,
            );
          }),
          (0, jsx_runtime_1.jsx)("div", { ref: bottomRef }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "p-4 border-t border-border",
        children: (0, jsx_runtime_1.jsx)("input", {
          type: "text",
          value: input,
          onChange: function (e) {
            return setInput(e.target.value);
          },
          onKeyPress: function (e) {
            if (e.key === "Enter") sendMessage();
          },
          className: "w-full p-2 border border-border rounded-lg",
          placeholder: "Type a message...",
          disabled: loading,
        }),
      }),
    ],
  });
};
exports.default = PluginChatPanel;
