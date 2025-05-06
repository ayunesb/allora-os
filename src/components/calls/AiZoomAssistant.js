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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AiZoomAssistant;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var select_1 = require("@/components/ui/select");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("zod");
var zod_2 = require("@hookform/resolvers/zod");
var sonner_1 = require("sonner");
var lucide_react_1 = require("lucide-react");
var zoomMeetingSchema = zod_1.z.object({
  topic: zod_1.z.string().min(3, { message: "Meeting topic is required" }),
  agenda: zod_1.z.string().optional(),
  duration: zod_1.z.string().min(1, { message: "Duration is required" }),
  date: zod_1.z.string().min(1, { message: "Date is required" }),
  time: zod_1.z.string().min(1, { message: "Time is required" }),
  timezone: zod_1.z.string().optional(),
});
function AiZoomAssistant() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isCreatingMeeting = _a[0],
    setIsCreatingMeeting = _a[1];
  var _b = (0, react_1.useState)(null),
    meetingLink = _b[0],
    setMeetingLink = _b[1];
  var _c = (0, react_1.useState)(""),
    botPrompt = _c[0],
    setBotPrompt = _c[1];
  var _d = (0, react_1.useState)([
      {
        sender: "AI Assistant",
        content:
          "I'm your Zoom co-host AI. I can help you set up meetings and prepare talking points based on your company materials. What would you like to discuss with your lead?",
      },
    ]),
    botMessages = _d[0],
    setBotMessages = _d[1];
  var _e = (0, react_1.useState)(false),
    isLoadingBot = _e[0],
    setIsLoadingBot = _e[1];
  var _f = (0, react_hook_form_1.useForm)({
      resolver: (0, zod_2.zodResolver)(zoomMeetingSchema),
      defaultValues: {
        topic: "",
        agenda: "",
        duration: "30",
        date: new Date().toISOString().split("T")[0],
        time: "10:00",
        timezone: "America/New_York",
      },
    }),
    control = _f.control,
    handleSubmit = _f.handleSubmit,
    errors = _f.formState.errors;
  var onSubmit = function (data) {
    return __awaiter(_this, void 0, void 0, function () {
      var mockMeetingLink, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsCreatingMeeting(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // Simulating creating a Zoom meeting
            // In a real app, this would call a backend function that uses the Zoom API
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1500);
              }),
            ];
          case 2:
            // Simulating creating a Zoom meeting
            // In a real app, this would call a backend function that uses the Zoom API
            _a.sent();
            mockMeetingLink = "https://zoom.us/j/".concat(
              Math.floor(100000000 + Math.random() * 900000000),
            );
            setMeetingLink(mockMeetingLink);
            sonner_1.toast.success("Zoom meeting created successfully!");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error creating Zoom meeting:", error_1);
            sonner_1.toast.error("Failed to create Zoom meeting");
            return [3 /*break*/, 5];
          case 4:
            setIsCreatingMeeting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var sendMessage = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var userMessage, botResponse_1, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!botPrompt.trim()) return [2 /*return*/];
            userMessage = { sender: "You", content: botPrompt };
            setBotMessages(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [userMessage],
                false,
              );
            });
            setBotPrompt("");
            setIsLoadingBot(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // In a real app, this would call OpenAI or another AI service
            // Here we're simulating a response
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1200);
              }),
            ];
          case 2:
            // In a real app, this would call OpenAI or another AI service
            // Here we're simulating a response
            _a.sent();
            botResponse_1 = {
              sender: "AI Assistant",
              content:
                "Based on your input, I recommend focusing on the product's ROI and time-saving features during your meeting. Would you like me to prepare some specific talking points based on your company's use cases?",
            };
            setBotMessages(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [botResponse_1],
                false,
              );
            });
            return [3 /*break*/, 5];
          case 3:
            error_2 = _a.sent();
            console.error("Error getting AI response:", error_2);
            sonner_1.toast.error("Failed to get AI response");
            return [3 /*break*/, 5];
          case 4:
            setIsLoadingBot(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var copyToClipboard = function () {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      sonner_1.toast.success("Meeting link copied to clipboard");
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Video, {
                    className: "h-5 w-5 text-blue-600",
                  }),
                  "Create Zoom Meeting",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Schedule a Zoom meeting and get AI assistance during the call",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("form", {
            onSubmit: handleSubmit(onSubmit),
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("label", {
                        htmlFor: "topic",
                        className: "text-sm font-medium",
                        children: "Meeting Topic",
                      }),
                      (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, {
                        control: control,
                        name: "topic",
                        render: function (_a) {
                          var field = _a.field;
                          return (0, jsx_runtime_1.jsx)(
                            input_1.Input,
                            __assign(
                              {
                                id: "topic",
                                placeholder: "Product Demo with Client",
                              },
                              field,
                            ),
                          );
                        },
                      }),
                      errors.topic &&
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-xs text-destructive",
                          children: errors.topic.message,
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("label", {
                        htmlFor: "agenda",
                        className: "text-sm font-medium",
                        children: "Agenda (Optional)",
                      }),
                      (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, {
                        control: control,
                        name: "agenda",
                        render: function (_a) {
                          var field = _a.field;
                          return (0, jsx_runtime_1.jsx)(
                            textarea_1.Textarea,
                            __assign(
                              {
                                id: "agenda",
                                placeholder:
                                  "Discuss product features, pricing, and implementation timeline",
                              },
                              field,
                            ),
                          );
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("label", {
                            htmlFor: "date",
                            className: "text-sm font-medium",
                            children: "Date",
                          }),
                          (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, {
                            control: control,
                            name: "date",
                            render: function (_a) {
                              var field = _a.field;
                              return (0, jsx_runtime_1.jsx)(
                                input_1.Input,
                                __assign({ id: "date", type: "date" }, field),
                              );
                            },
                          }),
                          errors.date &&
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-destructive",
                              children: errors.date.message,
                            }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("label", {
                            htmlFor: "time",
                            className: "text-sm font-medium",
                            children: "Time",
                          }),
                          (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, {
                            control: control,
                            name: "time",
                            render: function (_a) {
                              var field = _a.field;
                              return (0, jsx_runtime_1.jsx)(
                                input_1.Input,
                                __assign({ id: "time", type: "time" }, field),
                              );
                            },
                          }),
                          errors.time &&
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-destructive",
                              children: errors.time.message,
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("label", {
                            htmlFor: "duration",
                            className: "text-sm font-medium",
                            children: "Duration (minutes)",
                          }),
                          (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, {
                            control: control,
                            name: "duration",
                            render: function (_a) {
                              var field = _a.field;
                              return (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                value: field.value,
                                onValueChange: field.onChange,
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    select_1.SelectTrigger,
                                    {
                                      id: "duration",
                                      children: (0, jsx_runtime_1.jsx)(
                                        select_1.SelectValue,
                                        { placeholder: "Select duration" },
                                      ),
                                    },
                                  ),
                                  (0, jsx_runtime_1.jsxs)(
                                    select_1.SelectContent,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "15",
                                            children: "15 minutes",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "30",
                                            children: "30 minutes",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "45",
                                            children: "45 minutes",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "60",
                                            children: "60 minutes",
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                ],
                              });
                            },
                          }),
                          errors.duration &&
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs text-destructive",
                              children: errors.duration.message,
                            }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)("label", {
                            htmlFor: "timezone",
                            className: "text-sm font-medium",
                            children: "Timezone",
                          }),
                          (0, jsx_runtime_1.jsx)(react_hook_form_1.Controller, {
                            control: control,
                            name: "timezone",
                            render: function (_a) {
                              var field = _a.field;
                              return (0, jsx_runtime_1.jsxs)(select_1.Select, {
                                value: field.value,
                                onValueChange: field.onChange,
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    select_1.SelectTrigger,
                                    {
                                      id: "timezone",
                                      children: (0, jsx_runtime_1.jsx)(
                                        select_1.SelectValue,
                                        { placeholder: "Select timezone" },
                                      ),
                                    },
                                  ),
                                  (0, jsx_runtime_1.jsxs)(
                                    select_1.SelectContent,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "America/New_York",
                                            children: "Eastern Time (ET)",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "America/Chicago",
                                            children: "Central Time (CT)",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "America/Denver",
                                            children: "Mountain Time (MT)",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          select_1.SelectItem,
                                          {
                                            value: "America/Los_Angeles",
                                            children: "Pacific Time (PT)",
                                          },
                                        ),
                                      ],
                                    },
                                  ),
                                ],
                              });
                            },
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                children: meetingLink
                  ? (0, jsx_runtime_1.jsxs)("div", {
                      className: "w-full space-y-3",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-center gap-2 p-2 bg-muted rounded-md",
                          children: [
                            (0, jsx_runtime_1.jsx)(input_1.Input, {
                              value: meetingLink,
                              readOnly: true,
                              className: "bg-background",
                            }),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              type: "button",
                              variant: "outline",
                              size: "icon",
                              onClick: copyToClipboard,
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.Copy,
                                { className: "h-4 w-4" },
                              ),
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              type: "button",
                              variant: "outline",
                              onClick: function () {
                                return setMeetingLink(null);
                              },
                              children: "Create Another",
                            }),
                            (0, jsx_runtime_1.jsx)(button_1.Button, {
                              type: "button",
                              children: "Add to Calendar",
                            }),
                          ],
                        }),
                      ],
                    })
                  : (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      type: "submit",
                      className: "w-full",
                      disabled: isCreatingMeeting,
                      children: [
                        isCreatingMeeting &&
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                            className: "mr-2 h-4 w-4 animate-spin",
                          }),
                        "Create Zoom Meeting",
                      ],
                    }),
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                    className: "h-5 w-5 text-indigo-600",
                  }),
                  "AI Zoom Co-host",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Your AI assistant will help during Zoom calls with leads",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "h-[400px] flex flex-col",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex-1 overflow-y-auto mb-4 space-y-4",
                children: [
                  botMessages.map(function (message, index) {
                    return (0, jsx_runtime_1.jsx)(
                      "div",
                      {
                        className: "flex ".concat(
                          message.sender === "You"
                            ? "justify-end"
                            : "justify-start",
                        ),
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "rounded-lg px-4 py-2 max-w-[80%] ".concat(
                            message.sender === "You"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted",
                          ),
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-xs font-medium mb-1",
                              children: message.sender,
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm",
                              children: message.content,
                            }),
                          ],
                        }),
                      },
                      index,
                    );
                  }),
                  isLoadingBot &&
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "flex justify-start",
                      children: (0, jsx_runtime_1.jsx)("div", {
                        className: "rounded-lg px-4 py-2 bg-muted",
                        children: (0, jsx_runtime_1.jsx)(
                          lucide_react_1.Loader2,
                          { className: "h-4 w-4 animate-spin" },
                        ),
                      }),
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(input_1.Input, {
                    value: botPrompt,
                    onChange: function (e) {
                      return setBotPrompt(e.target.value);
                    },
                    placeholder: "Ask your AI co-host...",
                    onKeyDown: function (e) {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    },
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    type: "button",
                    onClick: sendMessage,
                    disabled: isLoadingBot || !botPrompt.trim(),
                    children: isLoadingBot
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                          className: "h-4 w-4 animate-spin",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                          className: "h-4 w-4",
                        }),
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            className: "border-t pt-4",
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "text-xs text-muted-foreground",
              children:
                "Your AI co-host can introduce your company, follow up with questions, and summarize meetings. It learns from your company documents and previous interactions.",
            }),
          }),
        ],
      }),
    ],
  });
}
