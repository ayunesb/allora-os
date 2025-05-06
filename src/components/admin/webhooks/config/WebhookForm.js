"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var alert_1 = require("@/components/ui/alert");
var WebhookForm = function (_a) {
  var title = _a.title,
    description = _a.description,
    placeholder = _a.placeholder,
    value = _a.value,
    onChange = _a.onChange,
    onTest = _a.onTest,
    onSave = _a.onSave,
    isSaving = _a.isSaving,
    isValid = _a.isValid,
    isTestLoading = _a.isTestLoading,
    webhookType = _a.webhookType;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 py-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, {
            htmlFor: "".concat(webhookType, "-webhook"),
            children: title,
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "".concat(webhookType, "-webhook"),
                placeholder: placeholder,
                value: value,
                onChange: function (e) {
                  return onChange(e.target.value);
                },
                className: !isValid && value ? "border-red-500" : "",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                type: "button",
                variant: "outline",
                onClick: onTest,
                disabled: !isValid || isTestLoading || !value,
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
            children: description,
          }),
        ],
      }),
      !isValid &&
        value &&
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: "destructive",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
              children: ["Invalid webhook URL format for ", webhookType],
            }),
          ],
        }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex justify-end",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          onClick: onSave,
          disabled: isSaving,
          children: isSaving
            ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                    className: "mr-2 h-4 w-4 animate-spin",
                  }),
                  "Saving",
                ],
              })
            : "Save All Webhooks",
        }),
      }),
    ],
  });
};
exports.default = WebhookForm;
