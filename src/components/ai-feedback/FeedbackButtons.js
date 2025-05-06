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
exports.default = FeedbackButtons;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var useAiLearning_1 = require("@/hooks/useAiLearning");
var textarea_1 = require("@/components/ui/textarea");
var dialog_1 = require("@/components/ui/dialog");
var sonner_1 = require("sonner");
var badge_1 = require("@/components/ui/badge");
function FeedbackButtons(_a) {
  var _this = this;
  var messageId = _a.messageId,
    interactionId = _a.interactionId,
    botName = _a.botName,
    botRole = _a.botRole,
    topic = _a.topic,
    model = _a.model,
    onFeedbackSubmitted = _a.onFeedbackSubmitted;
  var _b = (0, useAiLearning_1.useAiLearning)(),
    trackFeedback = _b.trackFeedback,
    isLoading = _b.isLoading;
  var _c = (0, react_1.useState)(""),
    feedbackComment = _c[0],
    setFeedbackComment = _c[1];
  var _d = (0, react_1.useState)(false),
    dialogOpen = _d[0],
    setDialogOpen = _d[1];
  var _e = (0, react_1.useState)(null),
    feedbackType = _e[0],
    setFeedbackType = _e[1];
  var handleQuickFeedback = function (isPositive) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              trackFeedback(
                interactionId,
                messageId,
                botName,
                botRole,
                isPositive,
                undefined, // No comment
                { topic: topic, model: model },
              ),
            ];
          case 1:
            _a.sent();
            sonner_1.toast.success(
              isPositive ? "Positive feedback recorded" : "Feedback recorded",
            );
            if (onFeedbackSubmitted) {
              onFeedbackSubmitted(isPositive);
            }
            return [2 /*return*/];
        }
      });
    });
  };
  var openFeedbackDialog = function (isPositive) {
    setFeedbackType(isPositive ? "positive" : "negative");
    setDialogOpen(true);
  };
  var submitDetailedFeedback = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!feedbackType) return [2 /*return*/];
            return [
              4 /*yield*/,
              trackFeedback(
                interactionId,
                messageId,
                botName,
                botRole,
                feedbackType === "positive",
                feedbackComment,
                { topic: topic, model: model },
              ),
            ];
          case 1:
            _a.sent();
            sonner_1.toast.success("Detailed feedback submitted");
            setDialogOpen(false);
            setFeedbackComment("");
            if (onFeedbackSubmitted) {
              onFeedbackSubmitted(feedbackType === "positive");
            }
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2 mt-2",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "mr-2 flex items-center",
            children:
              model &&
              (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                variant: "outline",
                className: "mr-2 text-xs",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                    className: "h-3 w-3 mr-1",
                  }),
                  model,
                ],
              }),
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            className:
              "h-8 px-3 text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200",
            onClick: function () {
              return handleQuickFeedback(true);
            },
            disabled: isLoading,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                className: "h-4 w-4 mr-1",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs",
                children: "Helpful",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            className:
              "h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200",
            onClick: function () {
              return handleQuickFeedback(false);
            },
            disabled: isLoading,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsDown, {
                className: "h-4 w-4 mr-1",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs",
                children: "Not helpful",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            className:
              "h-8 px-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50",
            onClick: function () {
              return openFeedbackDialog(true);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, {
                className: "h-4 w-4 mr-1",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs",
                children: "Comment",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
        open: dialogOpen,
        onOpenChange: setDialogOpen,
        children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
              children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
                children:
                  feedbackType === "positive"
                    ? "What was helpful?"
                    : "What could be improved?",
              }),
            }),
            (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
              placeholder: "Please provide more details about your feedback...",
              value: feedbackComment,
              onChange: function (e) {
                return setFeedbackComment(e.target.value);
              },
              rows: 5,
              className: "mt-2",
            }),
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "outline",
                  onClick: function () {
                    return setDialogOpen(false);
                  },
                  children: "Cancel",
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: submitDetailedFeedback,
                  disabled: isLoading,
                  children: "Submit Feedback",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
