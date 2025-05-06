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
exports.default = WebhookForm;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var z = require("zod");
var button_1 = require("@/components/ui/button");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var sonner_1 = require("sonner");
var webhookFormSchema = z.object({
  type: z.string().min(1, { message: "Webhook type is required" }),
  url: z.string().url({ message: "Please enter a valid URL" }),
});
function WebhookForm(_a) {
  var _this = this;
  var initialData = _a.initialData,
    onSubmit = _a.onSubmit,
    _b = _a.isSubmitting,
    isSubmitting = _b === void 0 ? false : _b;
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(webhookFormSchema),
    defaultValues: initialData || {
      type: "",
      url: "",
    },
  });
  var handleSubmit = function (values) {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, onSubmit(values)];
          case 1:
            _a.sent();
            if (!initialData) {
              form.reset();
            }
            sonner_1.toast.success(
              "Webhook ".concat(
                initialData ? "updated" : "created",
                " successfully",
              ),
            );
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error submitting webhook:", error_1);
            sonner_1.toast.error("Failed to save webhook");
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  return (0, jsx_runtime_1.jsx)(
    form_1.Form,
    __assign({}, form, {
      children: (0, jsx_runtime_1.jsxs)("form", {
        onSubmit: form.handleSubmit(handleSubmit),
        className: "space-y-6",
        children: [
          (0, jsx_runtime_1.jsx)(form_1.FormField, {
            control: form.control,
            name: "type",
            render: function (_a) {
              var field = _a.field;
              return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                children: [
                  (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                    children: "Webhook Type",
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.Select, {
                    onValueChange: field.onChange,
                    defaultValue: field.value,
                    disabled: isSubmitting,
                    children: [
                      (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                        children: (0, jsx_runtime_1.jsx)(
                          select_1.SelectTrigger,
                          {
                            children: (0, jsx_runtime_1.jsx)(
                              select_1.SelectValue,
                              { placeholder: "Select webhook type" },
                            ),
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                        children: [
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "strategy_created",
                            children: "Strategy Created",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "campaign_updated",
                            children: "Campaign Updated",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "lead_captured",
                            children: "Lead Captured",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "payment_received",
                            children: "Payment Received",
                          }),
                          (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                            value: "custom",
                            children: "Custom",
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
            name: "url",
            render: function (_a) {
              var field = _a.field;
              return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                children: [
                  (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                    children: "Webhook URL",
                  }),
                  (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                    children: (0, jsx_runtime_1.jsx)(
                      input_1.Input,
                      __assign(
                        { placeholder: "https://example.com/webhook" },
                        field,
                        { disabled: isSubmitting },
                      ),
                    ),
                  }),
                  (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                ],
              });
            },
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            type: "submit",
            disabled: isSubmitting,
            children: isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Webhook"
                : "Create Webhook",
          }),
        ],
      }),
    }),
  );
}
