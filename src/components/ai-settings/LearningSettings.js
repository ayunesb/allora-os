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
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var LearningSettings = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "medium" : _c;
  var handleResetLearning = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      return __generator(this, function (_a) {
        try {
          sonner_1.toast.success("Learning data has been reset", {
            description: "Your AI executives will start learning from scratch.",
          });
        } catch (error) {
          console.error("Error resetting learning data:", error);
          sonner_1.toast.error("Failed to reset learning data");
        }
        return [2 /*return*/];
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                className: "h-5 w-5",
              }),
              "Self-Learning Settings",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Control how your AI executives learn from your interactions",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between py-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "text-base font-medium",
                    children: "Enable Self-Learning",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground mt-1",
                    children:
                      "Allow AI executives to adapt based on your feedback and choices",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                checked: learningEnabled,
                onCheckedChange: onToggleLearning,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-accent/50 rounded-lg p-4",
            children: [
              (0, jsx_runtime_1.jsxs)("h3", {
                className: "text-sm font-medium mb-2 flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "What does self-learning do?",
                ],
              }),
              (0, jsx_runtime_1.jsxs)("ul", {
                className: "text-sm space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)("li", {
                    children:
                      "\u2022 Tracks which strategies you approve or reject",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children:
                      "\u2022 Learns your risk tolerance and business preferences",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children:
                      "\u2022 Adapts communication style to your preferences",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children: "\u2022 Improves recommendations over time",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                className: "text-base font-medium",
                children: "Learning Data",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex flex-col space-y-2 mt-2",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between items-center text-sm",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Interactions tracked",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "font-medium",
                        children: "247",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between items-center text-sm",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Learning sessions",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "font-medium",
                        children: "18",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between items-center text-sm",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        children: "Last updated",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "font-medium",
                        children: "Today, 2:45 PM",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "flex justify-between border-t px-6 py-4",
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "outline",
          className: "text-destructive",
          onClick: handleResetLearning,
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
              className: "h-4 w-4 mr-2",
            }),
            "Reset Learning Data",
          ],
        }),
      }),
    ],
  });
};
