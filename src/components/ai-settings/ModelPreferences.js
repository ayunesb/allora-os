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
exports.ModelPreferences = ModelPreferences;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var slider_1 = require("@/components/ui/slider");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function ModelPreferences(_a) {
  var _this = this;
  var modelPreferences = _a.modelPreferences,
    onUpdateModelPreferences = _a.onUpdateModelPreferences;
  var handleSave = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        try {
          sonner_1.toast.success("AI model preferences updated", {
            description: "Changes will apply to all future AI interactions.",
          });
        } catch (error) {
          console.error("Error updating model preferences:", error);
          sonner_1.toast.error("Failed to update model preferences");
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
              (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                className: "h-5 w-5",
              }),
              "AI Model Preferences",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Configure which AI models power your executive team",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "provider",
                className: "text-base font-medium",
                children: "AI Provider",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: modelPreferences.provider,
                onValueChange: function (value) {
                  return onUpdateModelPreferences({
                    provider: value,
                  });
                },
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "provider",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select AI provider",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "openai",
                        children: "OpenAI",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "anthropic",
                        children: "Anthropic (Claude)",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "google",
                        children: "Google (Gemini)",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "mistral",
                        children: "Mistral AI",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2 pt-4",
            children: [
              (0, jsx_runtime_1.jsx)(label_1.Label, {
                htmlFor: "model",
                className: "text-base font-medium",
                children: "Model",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: modelPreferences.model,
                onValueChange: function (value) {
                  return onUpdateModelPreferences({ model: value });
                },
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "model",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select AI model",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      modelPreferences.provider === "openai" &&
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "gpt-4o-mini",
                              children: "GPT-4o Mini (Fastest)",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "gpt-4o",
                              children: "GPT-4o (Most Capable)",
                            }),
                          ],
                        }),
                      modelPreferences.provider === "anthropic" &&
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "claude-3-sonnet-20240229",
                              children: "Claude 3 Sonnet",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "claude-3-opus-20240229",
                              children: "Claude 3 Opus (Most Capable)",
                            }),
                          ],
                        }),
                      modelPreferences.provider === "google" &&
                        (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectItem,
                            {
                              value: "gemini-1.5-pro",
                              children: "Gemini 1.5 Pro",
                            },
                          ),
                        }),
                      modelPreferences.provider === "mistral" &&
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "mistral-large",
                              children: "Mistral Large",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "mistral-small",
                              children: "Mistral Small",
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2 pt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center justify-between",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "temperature",
                    className: "text-base font-medium",
                    children: "Temperature",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-sm font-medium",
                    children: modelPreferences.temperature.toFixed(1),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                id: "temperature",
                defaultValue: [modelPreferences.temperature],
                min: 0,
                max: 1,
                step: 0.1,
                onValueChange: function (values) {
                  return onUpdateModelPreferences({ temperature: values[0] });
                },
                className: "w-full",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className:
                  "flex justify-between mt-2 text-xs text-muted-foreground",
                children: [
                  (0, jsx_runtime_1.jsx)("span", { children: "Predictable" }),
                  (0, jsx_runtime_1.jsx)("span", { children: "Balanced" }),
                  (0, jsx_runtime_1.jsx)("span", { children: "Creative" }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-between border-t px-6 py-4",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            onClick: function () {
              return onUpdateModelPreferences({
                provider: "openai",
                model: "gpt-4o-mini",
                temperature: 0.7,
              });
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "h-4 w-4 mr-2",
              }),
              "Reset to Defaults",
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: handleSave,
            children: "Save Preferences",
          }),
        ],
      }),
    ],
  });
}
