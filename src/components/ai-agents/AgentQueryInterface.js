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
exports.AgentQueryInterface = AgentQueryInterface;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var card_1 = require("@/components/ui/card");
var useAgentQuery_1 = require("@/utils/langchain/hooks/useAgentQuery");
var useExternalLangChainAPI_1 = require("@/utils/langchain/hooks/useExternalLangChainAPI");
var page_loader_1 = require("@/components/ui/page-loader");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
function AgentQueryInterface(_a) {
  var _this = this;
  var _b = _a.title,
    title = _b === void 0 ? "Ask your AI Agent" : _b,
    _c = _a.placeholder,
    placeholder = _c === void 0 ? "Enter your question or request..." : _c,
    _d = _a.initialContext,
    initialContext = _d === void 0 ? {} : _d,
    onResult = _a.onResult;
  var _e = (0, react_1.useState)(""),
    inputValue = _e[0],
    setInputValue = _e[1];
  var _f = (0, react_1.useState)(false),
    showToolCalls = _f[0],
    setShowToolCalls = _f[1];
  var _g = (0, react_1.useState)(function () {
      return localStorage.getItem("use_external_langchain_api") === "true";
    }),
    useExternalAPI = _g[0],
    setUseExternalAPI = _g[1];
  var _h = (0, useAgentQuery_1.useAgentQuery)({
      onSuccess: function (data) {
        if (onResult && data.result && !useExternalAPI) {
          onResult(data.result);
        }
      },
      enabled: false,
    }),
    executeQuery = _h.executeQuery,
    internalResult = _h.result,
    toolCalls = _h.toolCalls,
    isInternalLoading = _h.isLoading,
    internalError = _h.error,
    setContext = _h.setContext;
  var _j = (0, useExternalLangChainAPI_1.useExternalLangChainAPI)(),
    executeExternalQuery = _j.executeQuery,
    externalResult = _j.result,
    isExternalLoading = _j.isLoading,
    externalError = _j.error;
  // Determine which result, loading state, and error to use based on the API choice
  var result = useExternalAPI ? externalResult : internalResult;
  var isLoading = useExternalAPI ? isExternalLoading : isInternalLoading;
  var error = useExternalAPI ? externalError : internalError;
  // Set initial context when component mounts
  (0, react_1.useEffect)(
    function () {
      if (Object.keys(initialContext).length > 0) {
        setContext(initialContext);
      }
    },
    [initialContext, setContext],
  );
  // Handle API toggle change
  var handleApiToggle = function (checked) {
    setUseExternalAPI(checked);
    localStorage.setItem(
      "use_external_langchain_api",
      checked ? "true" : "false",
    );
  };
  var handleSubmit = function (e) {
    return __awaiter(_this, void 0, void 0, function () {
      var result_1, err_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            e.preventDefault();
            if (!inputValue.trim()) return [2 /*return*/];
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, , 7]);
            if (!useExternalAPI) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              executeExternalQuery({
                query: inputValue,
                context: initialContext,
              }),
            ];
          case 2:
            result_1 = _a.sent();
            if (onResult && result_1.result) {
              onResult(result_1.result);
            }
            return [3 /*break*/, 5];
          case 3:
            return [4 /*yield*/, executeQuery(inputValue)];
          case 4:
            _a.sent();
            _a.label = 5;
          case 5:
            return [3 /*break*/, 7];
          case 6:
            err_1 = _a.sent();
            console.error("Error executing query:", err_1);
            return [3 /*break*/, 7];
          case 7:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full max-w-3xl mx-auto",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
              className: "flex items-center gap-2",
              children: [
                title,
                (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                  variant: "outline",
                  className: "ml-2",
                  children: useExternalAPI ? "External API" : "LangChain",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center space-x-2",
              children: [
                (0, jsx_runtime_1.jsx)(label_1.Label, {
                  htmlFor: "api-toggle",
                  className: "text-sm",
                  children: useExternalAPI
                    ? "Using External API"
                    : "Using Built-in API",
                }),
                (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                  id: "api-toggle",
                  checked: useExternalAPI,
                  onCheckedChange: handleApiToggle,
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("form", {
            onSubmit: handleSubmit,
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                placeholder: placeholder,
                value: inputValue,
                onChange: function (e) {
                  return setInputValue(e.target.value);
                },
                className: "min-h-[100px] resize-none",
                disabled: isLoading,
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "flex justify-end",
                children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                  type: "submit",
                  disabled: isLoading || !inputValue.trim(),
                  children: isLoading ? "Processing..." : "Submit",
                }),
              }),
            ],
          }),
          isLoading &&
            (0, jsx_runtime_1.jsx)(page_loader_1.PageLoader, {
              message: "Processing your request...",
            }),
          error &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "p-4 bg-red-50 text-red-600 rounded-md",
              children: error instanceof Error ? error.message : String(error),
            }),
          result &&
            !isLoading &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mt-4 space-y-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    (0, jsx_runtime_1.jsxs)("h3", {
                      className: "text-lg font-medium flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlignLeft, {
                          size: 18,
                          className: "text-primary",
                        }),
                        " Response",
                      ],
                    }),
                    !useExternalAPI &&
                      toolCalls &&
                      toolCalls.length > 0 &&
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        size: "sm",
                        onClick: function () {
                          return setShowToolCalls(!showToolCalls);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Wrench, {
                            size: 16,
                            className: "mr-2",
                          }),
                          showToolCalls ? "Hide Tools" : "Show Tools",
                        ],
                      }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "p-4 bg-muted/40 rounded-md whitespace-pre-wrap",
                  children: result,
                }),
                !useExternalAPI &&
                  showToolCalls &&
                  toolCalls &&
                  toolCalls.length > 0 &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "mt-4 p-4 bg-muted/20 rounded-md",
                    children: [
                      (0, jsx_runtime_1.jsxs)("h4", {
                        className:
                          "text-sm font-medium mb-2 flex items-center gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                            size: 16,
                          }),
                          " Tool Executions (",
                          toolCalls.length,
                          ")",
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "space-y-2",
                        children: toolCalls.map(function (call, idx) {
                          return (0, jsx_runtime_1.jsxs)(
                            "div",
                            {
                              className:
                                "p-2 bg-background border rounded-sm text-xs",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "font-bold",
                                  children: call.tool,
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "text-muted-foreground",
                                  children: [
                                    "Input: ",
                                    JSON.stringify(call.input),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "mt-1 text-muted-foreground",
                                  children: [
                                    "Output: ",
                                    typeof call.output === "object"
                                      ? JSON.stringify(call.output)
                                      : String(call.output),
                                  ],
                                }),
                              ],
                            },
                            idx,
                          );
                        }),
                      }),
                    ],
                  }),
              ],
            }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className:
          "flex items-center justify-between text-xs text-muted-foreground",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, { size: 14 }),
              new Date().toLocaleString(),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            children: useExternalAPI
              ? "Powered by External LangChain API"
              : "Powered by LangChain.tsx",
          }),
        ],
      }),
    ],
  });
}
