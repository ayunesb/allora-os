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
exports.default = UserPreferencesDialog;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var useUserPreferences_1 = require("@/hooks/useUserPreferences");
var lucide_react_1 = require("lucide-react");
var tabs_1 = require("@/components/ui/tabs");
var AIModelPreferences_1 = require("./preferences/AIModelPreferences");
var ResponseStylePreferences_1 = require("./preferences/ResponseStylePreferences");
var LearningPreferences_1 = require("./preferences/LearningPreferences");
var framer_motion_1 = require("framer-motion");
var sonner_1 = require("sonner");
function UserPreferencesDialog(_a) {
  var _this = this;
  var triggerLabel = _a.triggerLabel,
    triggerVariant = _a.triggerVariant;
  var _b = (0, react_1.useState)(false),
    open = _b[0],
    setOpen = _b[1];
  var _c = (0, useUserPreferences_1.useUserPreferences)(),
    preferences = _c.preferences,
    isLoading = _c.isLoading,
    savePreferences = _c.savePreferences,
    updatePreference = _c.updatePreference,
    resetPreferences = _c.resetPreferences;
  var _d = (0, react_1.useState)(false),
    isSaving = _d[0],
    setIsSaving = _d[1];
  // Create a wrapper function that conforms to the expected type
  var handleUpdatePreference = function (key, value) {
    // Cast the key to any to bypass TypeScript's type checking
    updatePreference(key, value);
  };
  var handleSave = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            setIsSaving(true);
            return [4 /*yield*/, savePreferences(preferences)];
          case 1:
            _a.sent();
            sonner_1.toast.success("Preferences saved successfully!");
            setOpen(false);
            return [3 /*break*/, 4];
          case 2:
            error_1 = _a.sent();
            sonner_1.toast.error("Failed to save preferences");
            console.error("Error saving preferences:", error_1);
            return [3 /*break*/, 4];
          case 3:
            setIsSaving(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleCancel = function () {
    setOpen(false);
  };
  var handleReset = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            setIsSaving(true);
            return [4 /*yield*/, resetPreferences()];
          case 1:
            _a.sent();
            sonner_1.toast.success("Preferences reset to defaults");
            setOpen(false);
            return [3 /*break*/, 4];
          case 2:
            error_2 = _a.sent();
            sonner_1.toast.error("Failed to reset preferences");
            return [3 /*break*/, 4];
          case 3:
            setIsSaving(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, {
    open: open,
    onOpenChange: setOpen,
    children: [
      (0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsx)(framer_motion_1.motion.div, {
          whileTap: { scale: 0.97 },
          transition: { duration: 0.1 },
          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: triggerVariant || "outline",
            className: "flex items-center gap-2",
            children:
              triggerLabel ||
              (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, {
                    className: "h-4 w-4",
                  }),
                  "Preferences",
                ],
              }),
          }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
        className: "max-w-2xl",
        children: [
          (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
            children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: "AI Response Preferences",
            }),
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            defaultValue: "models",
            className: "mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "mb-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "models",
                    className: "min-h-10",
                    children: "AI Models",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "style",
                    className: "min-h-10",
                    children: "Response Style",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "learning",
                    className: "min-h-10",
                    children: "Learning",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "models",
                children: (0, jsx_runtime_1.jsx)(AIModelPreferences_1.default, {
                  preferences: preferences,
                  updatePreference: handleUpdatePreference,
                }),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "style",
                children: (0, jsx_runtime_1.jsx)(
                  ResponseStylePreferences_1.default,
                  {
                    preferences: preferences,
                    updatePreference: handleUpdatePreference,
                  },
                ),
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                value: "learning",
                children: (0, jsx_runtime_1.jsx)(
                  LearningPreferences_1.default,
                  {
                    preferences: preferences,
                    updatePreference: handleUpdatePreference,
                  },
                ),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
            className: "mt-6",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: handleCancel,
                className:
                  "transition-all duration-200 hover:bg-destructive/10",
                children: "Cancel",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: handleReset,
                disabled: isSaving || isLoading,
                className: "transition-all duration-200 hover:bg-amber-500/10",
                children: "Reset Defaults",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: handleSave,
                disabled: isSaving || isLoading,
                className: "min-w-24 relative group",
                children:
                  isSaving || isLoading
                    ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                            className: "h-4 w-4 mr-2 animate-spin",
                          }),
                          "Saving...",
                        ],
                      })
                    : (0, jsx_runtime_1.jsx)(framer_motion_1.motion.span, {
                        initial: { opacity: 1 },
                        whileTap: { scale: 0.97 },
                        transition: { duration: 0.1 },
                        children: "Save Preferences",
                      }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
