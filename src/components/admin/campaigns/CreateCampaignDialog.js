"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var CampaignForm_1 = require("./CampaignForm");
var CreateCampaignDialog = function (_a) {
  var open = _a.open,
    onOpenChange = _a.onOpenChange,
    formData = _a.formData,
    onChange = _a.onChange,
    onSubmit = _a.onSubmit,
    companies = _a.companies,
    isSubmitting = _a.isSubmitting;
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      children: [
        (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
            children: "Create New Campaign",
          }),
        }),
        (0, jsx_runtime_1.jsx)(CampaignForm_1.default, {
          data: formData,
          onChange: onChange,
          onSubmit: onSubmit,
          companies: companies,
          isSubmitting: isSubmitting,
        }),
      ],
    }),
  });
};
exports.default = CreateCampaignDialog;
