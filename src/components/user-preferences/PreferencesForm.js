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
exports.PreferencesForm = PreferencesForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
var use_toast_1 = require("@/components/ui/use-toast");
var useUserPreferences_1 = require("@/hooks/useUserPreferences");
var useAuthState_1 = require("@/hooks/useAuthState");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
function PreferencesForm() {
  var _this = this;
  var user = (0, useAuthState_1.useAuthState)().user;
  var _a = (0, useUserPreferences_1.useUserPreferences)(),
    preferences = _a.preferences,
    updatePreference = _a.updatePreference,
    isLoading = _a.isLoading,
    lastSyncTime = _a.lastSyncTime;
  var _b = (0, react_1.useState)(false),
    isEditing = _b[0],
    setIsEditing = _b[1];
  var toast = (0, use_toast_1.useToast)().toast;
  if (!user) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "pt-6",
        children: (0, jsx_runtime_1.jsx)("p", {
          children: "Please log in to set your AI preferences.",
        }),
      }),
    });
  }
  var handlePreferenceChange = function (key, value) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, updatePreference(key, value)];
          case 1:
            _a.sent();
            toast({
              title: "Preference updated",
              description: "Your ".concat(
                key.replace(/([A-Z])/g, " $1").toLowerCase(),
                " has been updated.",
              ),
            });
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            toast({
              title: "Update failed",
              description:
                "There was an error updating your preference. Please try again.",
              variant: "destructive",
            });
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-xl font-bold",
                  children: "\uD83E\uDDE0 Personalize Your AI Executives",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children:
                    "Customize how your AI executives think, communicate, and make decisions",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              size: "sm",
              variant: "outline",
              onClick: function () {
                return setIsEditing(!isEditing);
              },
              className: "flex items-center gap-1",
              children: [
                isEditing
                  ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                      className: "h-4 w-4",
                    })
                  : (0, jsx_runtime_1.jsx)(lucide_react_1.Pen, {
                      className: "h-4 w-4",
                    }),
                isEditing ? "Done" : "Edit",
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "space-y-6",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium block mb-2",
                  children: "Communication Style",
                }),
                isEditing
                  ? (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: preferences.responseStyle,
                      onValueChange: function (value) {
                        return handlePreferenceChange("responseStyle", value);
                      },
                      disabled: isLoading,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "w-full",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select communication style" },
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
                    })
                  : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "capitalize px-3 py-1 font-normal",
                      children: preferences.responseStyle || "Not set",
                    }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground mt-1",
                  children:
                    "How verbose you want your AI executives to be in their communications",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium block mb-2",
                  children: "Risk Appetite",
                }),
                isEditing
                  ? (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: preferences.riskAppetite,
                      onValueChange: function (value) {
                        return handlePreferenceChange("riskAppetite", value);
                      },
                      disabled: isLoading,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "w-full",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select risk appetite" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "low",
                              children: "Low - Conservative",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "medium",
                              children: "Medium - Balanced",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "high",
                              children: "High - Aggressive",
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "capitalize px-3 py-1 font-normal ".concat(
                        preferences.riskAppetite === "high"
                          ? "bg-red-100 text-red-800 border-red-200"
                          : preferences.riskAppetite === "low"
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200",
                      ),
                      children: preferences.riskAppetite || "Not set",
                    }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground mt-1",
                  children:
                    "How much risk your AI executives should take in their decisions",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium block mb-2",
                  children: "Technical Level",
                }),
                isEditing
                  ? (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: preferences.technicalLevel,
                      onValueChange: function (value) {
                        return handlePreferenceChange("technicalLevel", value);
                      },
                      disabled: isLoading,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "w-full",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select technical level" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "basic",
                              children: "Basic - Simple language",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "intermediate",
                              children: "Intermediate - Some terminology",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "advanced",
                              children: "Advanced - Industry terminology",
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "capitalize px-3 py-1 font-normal",
                      children: preferences.technicalLevel || "Not set",
                    }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground mt-1",
                  children:
                    "How technical you want the language to be in executive communications",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium block mb-2",
                  children: "Focus Area",
                }),
                isEditing
                  ? (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: preferences.focusArea,
                      onValueChange: function (value) {
                        return handlePreferenceChange("focusArea", value);
                      },
                      disabled: isLoading,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "w-full",
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
                              value: "strategy",
                              children: "Strategy",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "marketing",
                              children: "Marketing",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "operations",
                              children: "Operations",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "technology",
                              children: "Technology",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "finance",
                              children: "Finance",
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "capitalize px-3 py-1 font-normal",
                      children: preferences.focusArea || "Not set",
                    }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground mt-1",
                  children: "Business area to emphasize in executive responses",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("label", {
                  className: "text-sm font-medium block mb-2",
                  children: "Preferred AI Model",
                }),
                isEditing
                  ? (0, jsx_runtime_1.jsxs)(select_1.Select, {
                      value: preferences.modelPreference,
                      onValueChange: function (value) {
                        return handlePreferenceChange("modelPreference", value);
                      },
                      disabled: isLoading,
                      children: [
                        (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                          className: "w-full",
                          children: (0, jsx_runtime_1.jsx)(
                            select_1.SelectValue,
                            { placeholder: "Select AI model" },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                          children: [
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "auto",
                              children: "Auto (System chooses best model)",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "smart",
                              children: "Smart (Balanced speed/quality)",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "powerful",
                              children: "Powerful (Highest quality)",
                            }),
                            (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                              value: "fast",
                              children: "Fast (Quickest response)",
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "capitalize px-3 py-1 font-normal",
                      children: preferences.modelPreference || "Auto",
                    }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground mt-1",
                  children: "Which AI model you prefer your executives to use",
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className:
          "flex flex-col space-y-3 border-t pt-5 text-sm text-muted-foreground",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
                className: "h-4 w-4 text-primary",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                children:
                  "Your preferences will be applied to all AI executive interactions",
              }),
            ],
          }),
          lastSyncTime &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "text-xs text-muted-foreground",
              children: ["Last updated: ", lastSyncTime.toLocaleString()],
            }),
        ],
      }),
    ],
  });
}
