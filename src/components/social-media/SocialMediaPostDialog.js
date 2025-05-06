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
exports.DialogCreate = DialogCreate;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var zod_1 = require("@hookform/resolvers/zod");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("zod");
var lucide_react_1 = require("lucide-react");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var date_fns_1 = require("date-fns");
var utils_1 = require("@/lib/utils");
var formSchema = zod_2.z.object({
  title: zod_2.z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  content: zod_2.z
    .string()
    .min(1, "Content is required")
    .max(2000, "Content must be less than 2000 characters"),
  platform: zod_2.z.enum([
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Instagram",
    "TikTok",
  ]),
  scheduled_date: zod_2.z.date({
    required_error: "Please select a date",
  }),
  content_type: zod_2.z.enum(["text", "image", "video", "link", "carousel"]),
  link_url: zod_2.z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(zod_2.z.literal("")),
});
function DialogCreate(_a) {
  var _this = this;
  var open = _a.open,
    onOpenChange = _a.onOpenChange,
    onSubmit = _a.onSubmit,
    defaultValues = _a.defaultValues,
    _b = _a.isEditing,
    isEditing = _b === void 0 ? false : _b;
  var form = (0, react_hook_form_1.useForm)({
    resolver: (0, zod_1.zodResolver)(formSchema),
    defaultValues: defaultValues || {
      title: "",
      content: "",
      platform: "Facebook",
      scheduled_date: new Date(),
      content_type: "text",
      link_url: "",
    },
  });
  var handleSubmit = function (data) {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, onSubmit(data)];
          case 1:
            _a.sent();
            form.reset();
            return [2 /*return*/];
        }
      });
    });
  };
  react_1.default.useEffect(
    function () {
      if (open && defaultValues) {
        form.reset(defaultValues);
      }
    },
    [open, defaultValues, form],
  );
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "sm:max-w-[500px]",
      children: [
        (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
            children: isEditing ? "Edit Post" : "Create New Post",
          }),
        }),
        (0, jsx_runtime_1.jsx)(
          form_1.Form,
          __assign({}, form, {
            children: (0, jsx_runtime_1.jsxs)("form", {
              onSubmit: form.handleSubmit(handleSubmit),
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)(form_1.FormField, {
                  control: form.control,
                  name: "title",
                  render: function (_a) {
                    var field = _a.field;
                    return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                          children: "Title",
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                          children: (0, jsx_runtime_1.jsx)(
                            input_1.Input,
                            __assign(
                              { placeholder: "Enter post title" },
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
                  name: "content",
                  render: function (_a) {
                    var field = _a.field;
                    return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                          children: "Content",
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                          children: (0, jsx_runtime_1.jsx)(
                            textarea_1.Textarea,
                            __assign(
                              { placeholder: "Write your post content..." },
                              field,
                              { className: "h-20" },
                            ),
                          ),
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                      ],
                    });
                  },
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-2 gap-4",
                  children: [
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
                                (0, jsx_runtime_1.jsxs)(
                                  select_1.SelectContent,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        {
                                          value: "Facebook",
                                          children: "Facebook",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        {
                                          value: "Twitter",
                                          children: "Twitter",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        {
                                          value: "LinkedIn",
                                          children: "LinkedIn",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        {
                                          value: "Instagram",
                                          children: "Instagram",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        { value: "TikTok", children: "TikTok" },
                                      ),
                                    ],
                                  },
                                ),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                          ],
                        });
                      },
                    }),
                    (0, jsx_runtime_1.jsx)(form_1.FormField, {
                      control: form.control,
                      name: "content_type",
                      render: function (_a) {
                        var field = _a.field;
                        return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                          children: [
                            (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                              children: "Content Type",
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
                                        { placeholder: "Select type" },
                                      ),
                                    },
                                  ),
                                }),
                                (0, jsx_runtime_1.jsxs)(
                                  select_1.SelectContent,
                                  {
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        { value: "text", children: "Text" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        { value: "image", children: "Image" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        { value: "video", children: "Video" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        { value: "link", children: "Link" },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        select_1.SelectItem,
                                        {
                                          value: "carousel",
                                          children: "Carousel",
                                        },
                                      ),
                                    ],
                                  },
                                ),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                          ],
                        });
                      },
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(form_1.FormField, {
                  control: form.control,
                  name: "scheduled_date",
                  render: function (_a) {
                    var field = _a.field;
                    return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                      className: "flex flex-col",
                      children: [
                        (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                          children: "Schedule Date",
                        }),
                        (0, jsx_runtime_1.jsxs)(popover_1.Popover, {
                          children: [
                            (0, jsx_runtime_1.jsx)(popover_1.PopoverTrigger, {
                              asChild: true,
                              children: (0, jsx_runtime_1.jsx)(
                                form_1.FormControl,
                                {
                                  children: (0, jsx_runtime_1.jsxs)(
                                    button_1.Button,
                                    {
                                      variant: "outline",
                                      className: (0, utils_1.cn)(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                      ),
                                      children: [
                                        field.value
                                          ? (0, date_fns_1.format)(
                                              field.value,
                                              "PPP",
                                            )
                                          : (0, jsx_runtime_1.jsx)("span", {
                                              children: "Pick a date",
                                            }),
                                        (0, jsx_runtime_1.jsx)(
                                          lucide_react_1.Calendar,
                                          {
                                            className:
                                              "ml-auto h-4 w-4 opacity-50",
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                },
                              ),
                            }),
                            (0, jsx_runtime_1.jsx)(popover_1.PopoverContent, {
                              className: "w-auto p-0",
                              align: "start",
                              children: (0, jsx_runtime_1.jsx)(
                                calendar_1.Calendar,
                                {
                                  mode: "single",
                                  selected: field.value,
                                  onSelect: field.onChange,
                                  initialFocus: true,
                                },
                              ),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(form_1.FormMessage, {}),
                      ],
                    });
                  },
                }),
                form.watch("content_type") === "link" &&
                  (0, jsx_runtime_1.jsx)(form_1.FormField, {
                    control: form.control,
                    name: "link_url",
                    render: function (_a) {
                      var field = _a.field;
                      return (0, jsx_runtime_1.jsxs)(form_1.FormItem, {
                        children: [
                          (0, jsx_runtime_1.jsx)(form_1.FormLabel, {
                            children: "Link URL",
                          }),
                          (0, jsx_runtime_1.jsx)(form_1.FormControl, {
                            children: (0, jsx_runtime_1.jsx)(
                              input_1.Input,
                              __assign(
                                { placeholder: "https://example.com" },
                                field,
                              ),
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
                    children: isEditing ? "Save Changes" : "Create Post",
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
exports.default = DialogCreate;
