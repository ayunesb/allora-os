"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignFormDialog;
var jsx_runtime_1 = require("react/jsx-runtime");
var zod_1 = require("@hookform/resolvers/zod");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("zod");
var dialog_1 = require("@/components/ui/dialog");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var button_1 = require("@/components/ui/button");
// Define the campaign form schema
var campaignSchema = zod_2.z.object({
  name: zod_2.z.string().min(3, "Name must be at least 3 characters"),
  platform: zod_2.z.enum(["meta", "tiktok", "email", "whatsapp"]),
  budget: zod_2.z.coerce.number().min(1, "Budget must be at least 1"),
});
function CampaignFormDialog(_a) {
  var open = _a.open,
    onOpenChange = _a.onOpenChange,
    onSubmit = _a.onSubmit,
    _b = _a.defaultValues,
    defaultValues =
      _b === void 0
        ? {
            name: "",
            platform: "meta",
            budget: 100,
          }
        : _b,
    isSubmitting = _a.isSubmitting,
    isEditing = _a.isEditing;
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(campaignSchema),
    defaultValues: defaultValues,
  });
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: isEditing ? "Edit Campaign" : "Create New Campaign",
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              children: isEditing
                ? "Update your campaign details below."
                : "Fill in the details for your new marketing campaign.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(
          form_1.Form,
          __assign({}, form, {
            children: (0, jsx_runtime_1.jsxs)("form", {
              onSubmit: form.handleSubmit(onSubmit),
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)(form_1.FormField, {
                  control: form.control,
                  name: "name",
                  render: function (_a) {
                    var field = _a.field;
                    return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                          children: "Campaign Name",
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                          children: (0, jsx_runtime_1.jsx)(
                            input_1.Input,
                            __assign(
                              { placeholder: "Summer Product Launch" },
                              field,
                            ),
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                      ],
                    });
                  },
                }),
                (0, jsx_runtime_1.jsx)(form_1.FormField, {
                  control: form.control,
                  name: "platform",
                  render: function (_a) {
                    var field = _a.field;
                    return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                          children: "Platform",
                        }),
                        (0, jsx_runtime_1.jsxs)(select_1.Select, {
                          onValueChange: field.onChange,
                          defaultValue: field.value,
                          children: [
                            (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                              children: (0, jsx_runtime_1.jsx)(
                                select_1.SelectTrigger,
                                {
                                  children: (0, jsx_runtime_1.jsx)(
                                    select_1.SelectValue,
                                    { placeholder: "Select platform" },
                                  ),
                                },
                              ),
                            }),
                            (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                              children: [
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "meta",
                                  children: "Meta",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "tiktok",
                                  children: "TikTok",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "email",
                                  children: "Email",
                                }),
                                (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                  value: "whatsapp",
                                  children: "WhatsApp",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                      ],
                    });
                  },
                }),
                (0, jsx_runtime_1.jsx)(form_1.FormField, {
                  control: form.control,
                  name: "budget",
                  render: function (_a) {
                    var field = _a.field;
                    return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                          children: "Budget ($)",
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                          children: (0, jsx_runtime_1.jsx)(
                            input_1.Input,
                            __assign({ type: "number", min: 1 }, field),
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                      ],
                    });
                  },
                }),
                (0, jsx_runtime_1.jsx)(dialog_1.DialogFooter, {
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "submit",
                    disabled: isSubmitting,
                    children: isSubmitting
                      ? "Saving..."
                      : isEditing
                        ? "Update Campaign"
                        : "Create Campaign",
                  }),
                }),
              ],
            }),
          }),
        ),
      ],
    }),
  });
}
