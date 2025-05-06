"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilitySettings = AccessibilitySettings;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
var sonner_1 = require("sonner");
var button_1 = require("@/components/ui/button");
var react_1 = require("react");
function AccessibilitySettings() {
  var _a = (0, AccessibilityContext_1.useAccessibility)(),
    preferences = _a.preferences,
    updatePreference = _a.updatePreference,
    applyAccessibilityClasses = _a.applyAccessibilityClasses;
  var _b = (0, react_1.useState)(true),
    showFeedback = _b[0],
    setShowFeedback = _b[1];
  var handleToggleHighContrast = function () {
    updatePreference("highContrast", !preferences.highContrast);
    applyAccessibilityClasses();
    if (showFeedback) {
      sonner_1.toast.success(
        preferences.highContrast
          ? "High contrast mode disabled"
          : "High contrast mode enabled",
      );
    }
  };
  var handleToggleLargeText = function () {
    updatePreference("largeText", !preferences.largeText);
    applyAccessibilityClasses();
    if (showFeedback) {
      sonner_1.toast.success(
        preferences.largeText
          ? "Large text mode disabled"
          : "Large text mode enabled",
      );
    }
  };
  var handleToggleReducedMotion = function () {
    updatePreference("reducedMotion", !preferences.reducedMotion);
    applyAccessibilityClasses();
    if (showFeedback) {
      sonner_1.toast.success(
        preferences.reducedMotion
          ? "Reduced motion mode disabled"
          : "Reduced motion mode enabled",
      );
    }
  };
  var handleToggleScreenReader = function () {
    updatePreference("screenReaderFriendly", !preferences.screenReaderFriendly);
    applyAccessibilityClasses();
    if (showFeedback) {
      sonner_1.toast.success(
        preferences.screenReaderFriendly
          ? "Screen reader optimizations disabled"
          : "Screen reader optimizations enabled",
      );
    }
  };
  var handleToggleFeedback = function () {
    setShowFeedback(!showFeedback);
    sonner_1.toast.info(
      showFeedback
        ? "Accessibility change notifications disabled"
        : "Accessibility change notifications enabled",
    );
  };
  // Add keyboard shortcuts for accessibility features
  (0, react_1.useEffect)(
    function () {
      var handleKeyDown = function (e) {
        // Only trigger if Alt+A (accessibility menu) is pressed
        if (e.altKey && e.key === "a") {
          // Prevent default browser action
          e.preventDefault();
          // Show accessibility menu shortcuts info
          sonner_1.toast.info("Accessibility Shortcuts", {
            description:
              "Alt+C: Toggle high contrast | Alt+T: Toggle large text | Alt+M: Toggle reduced motion | Alt+S: Toggle screen reader optimizations",
            duration: 5000,
          });
        }
        // Alt+C for high contrast
        if (e.altKey && e.key === "c") {
          e.preventDefault();
          handleToggleHighContrast();
        }
        // Alt+T for large text
        if (e.altKey && e.key === "t") {
          e.preventDefault();
          handleToggleLargeText();
        }
        // Alt+M for reduced motion
        if (e.altKey && e.key === "m") {
          e.preventDefault();
          handleToggleReducedMotion();
        }
        // Alt+S for screen reader optimizations
        if (e.altKey && e.key === "s") {
          e.preventDefault();
          handleToggleScreenReader();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return function () {
        window.removeEventListener("keydown", handleKeyDown);
      };
    },
    [preferences, showFeedback],
  );
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Accessibility Settings",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Customize your experience to make the application more accessible",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-row items-center justify-between space-y-0",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "high-contrast",
                    children: "High contrast",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Increase the contrast for better readability",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "high-contrast",
                checked: preferences.highContrast,
                onCheckedChange: handleToggleHighContrast,
                "aria-label": "Toggle high contrast mode",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-row items-center justify-between space-y-0",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "large-text",
                    children: "Larger text",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Increase text size throughout the application",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "large-text",
                checked: preferences.largeText,
                onCheckedChange: handleToggleLargeText,
                "aria-label": "Toggle large text mode",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-row items-center justify-between space-y-0",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "reduced-motion",
                    children: "Reduced motion",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Minimize animations and transitions",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "reduced-motion",
                checked: preferences.reducedMotion,
                onCheckedChange: handleToggleReducedMotion,
                "aria-label": "Toggle reduced motion mode",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-row items-center justify-between space-y-0",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "screen-reader",
                    children: "Screen reader optimization",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: "Add additional context for screen readers",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "screen-reader",
                checked: preferences.screenReaderFriendly,
                onCheckedChange: handleToggleScreenReader,
                "aria-label": "Toggle screen reader optimization",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-row items-center justify-between space-y-0",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-0.5",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "feedback-notifications",
                    children: "Accessibility change notifications",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Show notifications when accessibility settings change",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                id: "feedback-notifications",
                checked: showFeedback,
                onCheckedChange: handleToggleFeedback,
                "aria-label": "Toggle accessibility change notifications",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "pt-4 border-t border-border",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm font-medium mb-2",
                children: "Keyboard shortcuts",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-sm text-muted-foreground space-y-1",
                children: [
                  (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "Alt",
                      }),
                      " + ",
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "A",
                      }),
                      " = Show accessibility menu",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "Alt",
                      }),
                      " + ",
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "C",
                      }),
                      " = Toggle high contrast",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "Alt",
                      }),
                      " + ",
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "T",
                      }),
                      " = Toggle large text",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "Alt",
                      }),
                      " + ",
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "M",
                      }),
                      " = Toggle reduced motion",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "Alt",
                      }),
                      " + ",
                      (0, jsx_runtime_1.jsx)("kbd", {
                        className: "px-1 py-0.5 bg-muted rounded border",
                        children: "S",
                      }),
                      " = Toggle screen reader optimization",
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            className: "w-full",
            onClick: function () {
              sonner_1.toast.success(
                "Accessibility report sent to developers",
                {
                  description:
                    "Thank you for helping us improve our accessibility features",
                },
              );
            },
            children: "Report Accessibility Issue",
          }),
        ],
      }),
    ],
  });
}
