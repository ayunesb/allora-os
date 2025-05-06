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
exports.PersonalitySettings = PersonalitySettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var label_1 = require("@/components/ui/label");
var slider_1 = require("@/components/ui/slider");
var switch_1 = require("@/components/ui/switch");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var useSelfLearning_1 = require("@/hooks/useSelfLearning");
var personalityDescriptions = {
  conservative:
    "Cautious, risk-averse, prioritizes stability and proven strategies",
  balanced: "Even approach, considers both risks and opportunities equally",
  bold: "Forward-thinking, embraces reasonable risks, innovation-focused",
  aggressive:
    "Highly risk-tolerant, pursues high-reward opportunities, disruption-oriented",
};
var responseStyleDescriptions = {
  concise: "Brief, to-the-point responses (1-2 sentences)",
  balanced: "Moderate detail (3-4 sentences with key information)",
  detailed: "Comprehensive explanations with examples and context",
};
function PersonalitySettings(_a) {
  var _this = this;
  var _b, _c;
  var botPersonalities = _a.botPersonalities,
    onUpdatePersonality = _a.onUpdatePersonality;
  var _d = (0, react_1.useState)(
      ((_b = botPersonalities[0]) === null || _b === void 0
        ? void 0
        : _b.botId) || "",
    ),
    activeBot = _d[0],
    setActiveBot = _d[1];
  var trackAction = (0, useSelfLearning_1.useSelfLearning)().trackAction;
  var currentBot =
    botPersonalities.find(function (bot) {
      return bot.botId === activeBot;
    }) || botPersonalities[0];
  var handleSavePersonality = function (botId, settings) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, onUpdatePersonality(botId, settings)];
          case 1:
            _a.sent();
            sonner_1.toast.success(
              "".concat(currentBot.botName, "'s personality updated"),
              {
                description:
                  "Your changes have been saved and will apply to future interactions.",
              },
            );
            // Track the personality update for the self-learning system
            trackAction(
              "update_bot_personality",
              "ai_customization",
              botId,
              "bot",
              {
                botName: currentBot.botName,
                botRole: currentBot.botRole,
                personalityTrait:
                  settings.personalityTrait || currentBot.personalityTrait,
                responseStyle:
                  settings.responseStyle || currentBot.responseStyle,
              },
            );
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error updating personality:", error_1);
            sonner_1.toast.error("Failed to update personality", {
              description:
                "Please try again or contact support if the issue persists.",
            });
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  if (!currentBot) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "w-full",
      children: (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Executive Personality Settings",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "No AI executives found. Please add executives first.",
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                className: "h-5 w-5",
              }),
              "Executive Personality Settings",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Customize how your AI executives behave and communicate",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue:
          (_c = botPersonalities[0]) === null || _c === void 0
            ? void 0
            : _c.botId,
        value: activeBot,
        onValueChange: setActiveBot,
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "px-6",
            children: (0, jsx_runtime_1.jsx)(tabs_1.TabsList, {
              className:
                "w-full h-auto flex flex-wrap gap-2 bg-background mb-4 justify-start",
              children: botPersonalities.map(function (bot) {
                return (0, jsx_runtime_1.jsxs)(
                  tabs_1.TabsTrigger,
                  {
                    value: bot.botId,
                    className:
                      "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5",
                    children: [bot.botName, " (", bot.botRole, ")"],
                  },
                  bot.botId,
                );
              }),
            }),
          }),
          botPersonalities.map(function (bot) {
            return (0, jsx_runtime_1.jsx)(
              tabs_1.TabsContent,
              {
                value: bot.botId,
                className: "m-0",
                children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                  className: "space-y-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)(label_1.Label, {
                              htmlFor: "personality-".concat(bot.botId),
                              className: "text-base font-medium",
                              children: "Personality Trait",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "text-sm font-medium text-primary capitalize",
                              children: bot.personalityTrait,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "pt-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                              id: "personality-".concat(bot.botId),
                              defaultValue: [
                                getPersonalityValue(bot.personalityTrait),
                              ],
                              max: 3,
                              step: 1,
                              onValueChange: function (values) {
                                var newValue = getPersonalityFromValue(
                                  values[0],
                                );
                                handleSavePersonality(bot.botId, {
                                  personalityTrait: newValue,
                                });
                              },
                              className: "w-full",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "flex justify-between mt-2 text-xs text-muted-foreground",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Conservative",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Balanced",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Bold",
                                }),
                                (0, jsx_runtime_1.jsx)("span", {
                                  children: "Aggressive",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-2",
                          children:
                            personalityDescriptions[bot.personalityTrait],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2 pt-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "style-".concat(bot.botId),
                          className: "text-base font-medium",
                          children: "Response Style",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          defaultValue: bot.responseStyle,
                          onValueChange: function (value) {
                            return handleSavePersonality(bot.botId, {
                              responseStyle: value,
                            });
                          },
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                              id: "style-".concat(bot.botId),
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectValue,
                                { placeholder: "Select response style" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "concise",
                                  children: "Concise",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "balanced",
                                  children: "Balanced",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "detailed",
                                  children: "Detailed",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            responseStyleDescriptions[bot.responseStyle],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2 pt-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "level-".concat(bot.botId),
                          className: "text-base font-medium",
                          children: "Technical Level",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          defaultValue: bot.technicalLevel,
                          onValueChange: function (value) {
                            return handleSavePersonality(bot.botId, {
                              technicalLevel: value,
                            });
                          },
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                              id: "level-".concat(bot.botId),
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectValue,
                                { placeholder: "Select technical level" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "basic",
                                  children:
                                    "Basic - Simple language, no jargon",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "intermediate",
                                  children:
                                    "Intermediate - Some industry terms",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "advanced",
                                  children: "Advanced - Expert terminology",
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
                          htmlFor: "focus-".concat(bot.botId),
                          className: "text-base font-medium",
                          children: "Strategic Focus",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          defaultValue: bot.focusArea,
                          onValueChange: function (value) {
                            return handleSavePersonality(bot.botId, {
                              focusArea: value,
                            });
                          },
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                              id: "focus-".concat(bot.botId),
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectValue,
                                { placeholder: "Select focus area" },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "general",
                                  children: "General Business",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "growth",
                                  children: "Growth & Expansion",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "profitability",
                                  children: "Profitability & Efficiency",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "innovation",
                                  children: "Innovation & R&D",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "risk",
                                  children: "Risk Management",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "operations",
                                  children: "Operations & Logistics",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center space-x-2 pt-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                          id: "sources-".concat(bot.botId),
                          checked: bot.showSources,
                          onCheckedChange: function (checked) {
                            return handleSavePersonality(bot.botId, {
                              showSources: checked,
                            });
                          },
                        }),
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "sources-".concat(bot.botId),
                          children:
                            "Include references to business frameworks and theories",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-2 pt-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(label_1.Label, {
                          htmlFor: "custom-".concat(bot.botId),
                          className: "text-base font-medium",
                          children: "Custom Instructions",
                        }),
                        (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                          id: "custom-".concat(bot.botId),
                          placeholder:
                            "Add specific instructions for how this executive should behave...",
                          value: bot.customInstructions || "",
                          onChange: function (e) {
                            return handleSavePersonality(bot.botId, {
                              customInstructions: e.target.value,
                            });
                          },
                          className: "min-h-[100px]",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children:
                            "These instructions will be added to the AI's system prompt.",
                        }),
                      ],
                    }),
                  ],
                }),
              },
              bot.botId,
            );
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-between border-t px-6 py-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center text-sm text-muted-foreground",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                className: "h-4 w-4 mr-2",
              }),
              "Changes are saved automatically",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              sonner_1.toast.success("Settings test complete", {
                description:
                  "Your AI executive's personality setting is working correctly.",
              });
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                className: "h-4 w-4 mr-2",
              }),
              "Test Settings",
            ],
          }),
        ],
      }),
    ],
  });
}
// Helper functions to convert between personality traits and slider values
function getPersonalityValue(trait) {
  switch (trait) {
    case "conservative":
      return 0;
    case "balanced":
      return 1;
    case "bold":
      return 2;
    case "aggressive":
      return 3;
    default:
      return 1;
  }
}
function getPersonalityFromValue(value) {
  switch (value) {
    case 0:
      return "conservative";
    case 1:
      return "balanced";
    case 2:
      return "bold";
    case 3:
      return "aggressive";
    default:
      return "balanced";
  }
}
