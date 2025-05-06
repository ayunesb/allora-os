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
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var useWebhookValidation_1 = require("./useWebhookValidation");
var alert_1 = require("@/components/ui/alert");
var badge_1 = require("@/components/ui/badge");
var sonner_1 = require("sonner");
var GitHubWebhookConfigSection = function (_a) {
  var onConfigureWebhook = _a.onConfigureWebhook;
  var _b = (0, react_1.useState)(
      localStorage.getItem("github_webhook_url") || "",
    ),
    githubWebhook = _b[0],
    setGithubWebhook = _b[1];
  var _c = (0, react_1.useState)(false),
    isTestLoading = _c[0],
    setIsTestLoading = _c[1];
  var _d = (0, react_1.useState)(!!localStorage.getItem("github_webhook_url")),
    isConnected = _d[0],
    setIsConnected = _d[1];
  var _e = (0, react_1.useState)(false),
    isConnecting = _e[0],
    setIsConnecting = _e[1];
  var _f = (0, useWebhookValidation_1.useWebhookValidation)("github"),
    isValid = _f.isValid,
    validationMessage = _f.validationMessage,
    validateUrl = _f.validateUrl;
  (0, react_1.useEffect)(function () {
    // Validate the URL when component mounts
    if (githubWebhook) {
      validateUrl(githubWebhook);
    }
  }, []);
  var handleInputChange = function (e) {
    var value = e.target.value;
    setGithubWebhook(value);
    validateUrl(value);
  };
  var testGitHubWebhook = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        if (!githubWebhook) {
          sonner_1.toast.error("Please enter a GitHub webhook URL first");
          return [2 /*return*/];
        }
        if (isValid !== true) {
          sonner_1.toast.error("Please enter a valid GitHub webhook URL");
          return [2 /*return*/];
        }
        setIsTestLoading(true);
        // Simulate webhook testing
        setTimeout(function () {
          localStorage.setItem("github_webhook_url", githubWebhook);
          setIsConnected(true);
          setIsTestLoading(false);
          sonner_1.toast.success("GitHub webhook connection successful!");
        }, 1500);
        return [2 /*return*/];
      });
    });
  };
  var handleDirectGitHubConnect = function () {
    setIsConnecting(true);
    // Simulate GitHub OAuth flow and webhook setup
    sonner_1.toast.success("GitHub connection initiated");
    // Simulate the OAuth process with a timeout
    setTimeout(function () {
      var mockGitHubWebhookUrl =
        "https://api.github.com/repos/allora-ai/platform/hooks/12345678";
      setGithubWebhook(mockGitHubWebhookUrl);
      validateUrl(mockGitHubWebhookUrl);
      localStorage.setItem("github_webhook_url", mockGitHubWebhookUrl);
      setIsConnected(true);
      setIsConnecting(false);
      sonner_1.toast.success("GitHub repository connected successfully!");
    }, 2000);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Github, {
                className: "h-5 w-5 ".concat(
                  isConnected ? "text-green-500" : "text-muted-foreground",
                ),
              }),
              (0, jsx_runtime_1.jsx)("h3", {
                className: "font-medium",
                children: "GitHub Webhooks",
              }),
            ],
          }),
          isConnected
            ? (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                variant: "outline",
                className: "bg-green-50 text-green-700 border-green-200",
                children: "Connected",
              })
            : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                variant: "outline",
                className: "bg-red-50 text-red-700 border-red-200",
                children: "Not Connected",
              }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "github-webhook-url",
            children: "GitHub Webhook URL",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "github-webhook-url",
                placeholder:
                  "https://api.github.com/repos/username/repo/hooks/...",
                value: githubWebhook,
                onChange: handleInputChange,
                className: !isValid && githubWebhook ? "border-red-500" : "",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                type: "button",
                variant: "outline",
                onClick: testGitHubWebhook,
                disabled: isTestLoading || !githubWebhook || isValid !== true,
                children: isTestLoading
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                          className: "mr-2 h-4 w-4 animate-spin",
                        }),
                        "Testing",
                      ],
                    })
                  : "Test",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children:
              "Enter your GitHub webhook URL to receive repository events like pushes, pull requests, etc.",
          }),
        ],
      }),
      !isValid &&
        githubWebhook &&
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: "destructive",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
              children:
                validationMessage || "Invalid GitHub webhook URL format",
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row gap-2 justify-between items-center pt-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: function () {
              return window.open(
                "https://docs.github.com/en/developers/webhooks-and-events/webhooks",
                "_blank",
              );
            },
            children: "GitHub Docs",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "default",
                size: "sm",
                onClick: handleDirectGitHubConnect,
                disabled: isConnecting,
                className: "gap-2",
                children: isConnecting
                  ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                          className: "h-4 w-4 animate-spin",
                        }),
                        "Connecting...",
                      ],
                    })
                  : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Link2, {
                          className: "h-4 w-4",
                        }),
                        "Connect GitHub",
                      ],
                    }),
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: function () {
                  return onConfigureWebhook("github");
                },
                children: "Advanced Config",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = GitHubWebhookConfigSection;
