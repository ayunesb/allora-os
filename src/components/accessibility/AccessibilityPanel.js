"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessibilityPanel = AccessibilityPanel;
exports.AccessibilityButton = AccessibilityButton;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var dialog_1 = require("@/components/ui/dialog");
var slider_1 = require("@/components/ui/slider");
var lucide_react_1 = require("lucide-react");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var useAccessibility_1 = require("@/hooks/useAccessibility");
function AccessibilityPanel() {
  var _a = (0, react_1.useState)(false),
    open = _a[0],
    setOpen = _a[1];
  // Use our extended type to ensure all properties are available
  var _b = (0, useAccessibility_1.useAccessibility)(),
    screenReaderFriendly = _b.screenReaderFriendly,
    highContrast = _b.highContrast,
    reducedMotion = _b.reducedMotion,
    largeText = _b.largeText,
    invertColors = _b.invertColors,
    _c = _b.fontSize,
    fontSize = _c === void 0 ? 16 : _c,
    _d = _b.setFontSize,
    setFontSize = _d === void 0 ? function () {} : _d,
    _e = _b.toggleScreenReaderFriendly,
    toggleScreenReaderFriendly = _e === void 0 ? function () {} : _e,
    _f = _b.toggleHighContrast,
    toggleHighContrast = _f === void 0 ? function () {} : _f,
    _g = _b.toggleReducedMotion,
    toggleReducedMotion = _g === void 0 ? function () {} : _g,
    _h = _b.toggleLargeText,
    toggleLargeText = _h === void 0 ? function () {} : _h,
    _j = _b.toggleInvertColors,
    toggleInvertColors = _j === void 0 ? function () {} : _j;
  var handleFontSizeChange = function (value) {
    setFontSize(value[0]);
  };
  var toggles = [
    {
      id: "screen-reader",
      label: "Screen Reader Mode",
      checked: screenReaderFriendly,
      onChange: toggleScreenReaderFriendly,
      description: "Optimizes content for screen readers",
    },
    {
      id: "high-contrast",
      label: "High Contrast",
      checked: highContrast,
      onChange: toggleHighContrast,
      description: "Increases contrast for better visibility",
    },
    {
      id: "reduced-motion",
      label: "Reduced Motion",
      checked: reducedMotion,
      onChange: toggleReducedMotion,
      description: "Reduces animations throughout the application",
    },
    {
      id: "large-text",
      label: "Large Text",
      checked: largeText,
      onChange: toggleLargeText,
      description: "Increases base text size throughout the app",
    },
    {
      id: "invert-colors",
      label: "Invert Colors",
      checked: invertColors,
      onChange: toggleInvertColors,
      description: "Inverts colors for reduced eye strain",
    },
  ];
  return (0, jsx_runtime_1.jsxs)(dialog_1.Dialog, {
    open: open,
    onOpenChange: setOpen,
    children: [
      (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
        className: "sm:max-w-[425px]",
        children: [
          (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
            children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Accessibility, {
                  className: "h-5 w-5",
                }),
                "Accessibility Settings",
              ],
            }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-6 py-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsxs)(label_1.Label, {
                    children: ["Font Size (", fontSize, "px)"],
                  }),
                  (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                    value: [Number(fontSize)],
                    min: 12,
                    max: 24,
                    step: 1,
                    onValueChange: handleFontSizeChange,
                    className: "w-full",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-4",
                children: toggles.map(function (toggle) {
                  return (0, jsx_runtime_1.jsxs)(
                    "div",
                    {
                      className: "flex flex-col space-y-1",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, jsx_runtime_1.jsx)(label_1.Label, {
                              htmlFor: toggle.id,
                              className: "cursor-pointer",
                              children: toggle.label,
                            }),
                            (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                              id: toggle.id,
                              checked: toggle.checked,
                              onCheckedChange: toggle.onChange,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-xs text-muted-foreground",
                          children: toggle.description,
                        }),
                      ],
                    },
                    toggle.id,
                  );
                }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(dialog_1.DialogTrigger, {
        asChild: true,
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "icon",
          className:
            "fixed bottom-4 right-4 rounded-full z-50 bg-primary text-primary-foreground",
          "aria-label": "Accessibility Settings",
          children: (0, jsx_runtime_1.jsx)(lucide_react_1.Accessibility, {
            className: "h-4 w-4",
          }),
        }),
      }),
    ],
  });
}
function AccessibilityButton() {
  return (0, jsx_runtime_1.jsx)(AccessibilityPanel, {});
}
exports.default = AccessibilityPanel;
