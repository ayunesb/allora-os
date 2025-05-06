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
exports.AIContentGenerator = AIContentGenerator;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var textarea_1 = require("@/components/ui/textarea");
var input_1 = require("@/components/ui/input");
var select_1 = require("@/components/ui/select");
var slider_1 = require("@/components/ui/slider");
var switch_1 = require("@/components/ui/switch");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var TONE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "authoritative", label: "Authoritative" },
  { value: "persuasive", label: "Persuasive" },
  { value: "humorous", label: "Humorous" },
];
function AIContentGenerator() {
  var _this = this;
  var _a = (0, react_1.useState)("adCopy"),
    activeTab = _a[0],
    setActiveTab = _a[1];
  var _b = (0, react_1.useState)(false),
    isGenerating = _b[0],
    setIsGenerating = _b[1];
  var _c = (0, react_1.useState)([]),
    generations = _c[0],
    setGenerations = _c[1];
  // Form state
  var _d = (0, react_1.useState)({
      contentType: "adCopy",
      toneOption: "professional",
      industry: "",
      targetAudience: "",
      keyPoints: "",
      length: 150,
      isCreative: true,
    }),
    contentRequest = _d[0],
    setContentRequest = _d[1];
  var handleInputChange = function (field, value) {
    setContentRequest(function (prev) {
      var _a;
      return __assign(__assign({}, prev), ((_a = {}), (_a[field] = value), _a));
    });
  };
  var handleGenerate = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var newContent, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsGenerating(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // This would be replaced with a real API call to an AI service
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 2000);
              }),
            ];
          case 2:
            // This would be replaced with a real API call to an AI service
            _a.sent();
            newContent = {
              id: Date.now().toString(),
              content: generateSampleContent(contentRequest),
            };
            setGenerations(__spreadArray([newContent], generations, true));
            sonner_1.toast.success("Content generated successfully!");
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            sonner_1.toast.error(
              "Failed to generate content. Please try again.",
            );
            console.error("Error generating content:", error_1);
            return [3 /*break*/, 5];
          case 4:
            setIsGenerating(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleCopy = function (content) {
    navigator.clipboard
      .writeText(content)
      .then(function () {
        return sonner_1.toast.success("Copied to clipboard!");
      })
      .catch(function () {
        return sonner_1.toast.error("Failed to copy content");
      });
  };
  var handleFeedback = function (id, feedback) {
    setGenerations(function (prev) {
      return prev.map(function (item) {
        return item.id === id
          ? __assign(__assign({}, item), { feedback: feedback })
          : item;
      });
    });
    // In a real implementation, you'd send this feedback to your backend
    sonner_1.toast.success("Feedback recorded. Thank you!");
  };
  var handleTabChange = function (value) {
    setActiveTab(value);
    setContentRequest(function (prev) {
      return __assign(__assign({}, prev), { contentType: value });
    });
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                className: "h-5 w-5 text-primary",
              }),
              "AI Content Generator",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Create marketing content with AI assistance",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
            value: activeTab,
            onValueChange: handleTabChange,
            children: [
              (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                className: "grid grid-cols-5 mb-4",
                children: [
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "adCopy",
                    children: "Ad Copy",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "emailTemplate",
                    children: "Email",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "socialPost",
                    children: "Social Posts",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "productDescription",
                    children: "Product Desc",
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                    value: "landingPage",
                    children: "Landing Page",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "industry",
                            children: "Industry",
                          }),
                          (0, jsx_runtime_1.jsx)(input_1.Input, {
                            id: "industry",
                            placeholder: "e.g. Technology, Healthcare",
                            value: contentRequest.industry,
                            onChange: function (e) {
                              return handleInputChange(
                                "industry",
                                e.target.value,
                              );
                            },
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "tone",
                            children: "Tone of Voice",
                          }),
                          (0, jsx_runtime_1.jsxs)(select_1.Select, {
                            value: contentRequest.toneOption,
                            onValueChange: function (value) {
                              return handleInputChange("toneOption", value);
                            },
                            children: [
                              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                                id: "tone",
                                children: (0, jsx_runtime_1.jsx)(
                                  select_1.SelectValue,
                                  { placeholder: "Select tone" },
                                ),
                              }),
                              (0, jsx_runtime_1.jsx)(select_1.SelectContent, {
                                children: TONE_OPTIONS.map(function (option) {
                                  return (0, jsx_runtime_1.jsx)(
                                    select_1.SelectItem,
                                    {
                                      value: option.value,
                                      children: option.label,
                                    },
                                    option.value,
                                  );
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "targetAudience",
                        children: "Target Audience",
                      }),
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "targetAudience",
                        placeholder:
                          "e.g. Professionals aged 25-45, Small business owners",
                        value: contentRequest.targetAudience,
                        onChange: function (e) {
                          return handleInputChange(
                            "targetAudience",
                            e.target.value,
                          );
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "keyPoints",
                        children: "Key Points to Include",
                      }),
                      (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                        id: "keyPoints",
                        placeholder:
                          "Enter key messages, product features, or specific points to highlight",
                        className: "min-h-[100px]",
                        value: contentRequest.keyPoints,
                        onChange: function (e) {
                          return handleInputChange("keyPoints", e.target.value);
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "length",
                            children: "Content Length (words)",
                          }),
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-sm text-muted-foreground",
                            children: contentRequest.length,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(slider_1.Slider, {
                        id: "length",
                        min: 50,
                        max: 500,
                        step: 25,
                        value: [contentRequest.length],
                        onValueChange: function (value) {
                          return handleInputChange("length", value[0]);
                        },
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center space-x-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(switch_1.Switch, {
                        id: "creative",
                        checked: contentRequest.isCreative,
                        onCheckedChange: function (checked) {
                          return handleInputChange("isCreative", checked);
                        },
                      }),
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "creative",
                        children: "Use creative language and metaphors",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            className: "w-full mt-6",
            onClick: handleGenerate,
            disabled: isGenerating,
            children: isGenerating
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Generating...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Generate Content",
                  ],
                }),
          }),
        ],
      }),
      generations.length > 0 &&
        (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
          className: "flex flex-col border-t pt-6",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-sm font-medium mb-4",
              children: "Generated Content",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4 w-full",
              children: [
                generations.map(function (item) {
                  return (0, jsx_runtime_1.jsx)(
                    card_1.Card,
                    {
                      className: "w-full",
                      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                        className: "pt-4",
                        children: [
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "whitespace-pre-wrap text-sm mb-4",
                            children: item.content,
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "space-x-2",
                                children: [
                                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: function () {
                                      return handleFeedback(
                                        item.id,
                                        "positive",
                                      );
                                    },
                                    className:
                                      item.feedback === "positive"
                                        ? "bg-primary/10"
                                        : "",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ThumbsUp,
                                        { className: "h-4 w-4 mr-1" },
                                      ),
                                      "Like",
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: function () {
                                      return handleFeedback(
                                        item.id,
                                        "negative",
                                      );
                                    },
                                    className:
                                      item.feedback === "negative"
                                        ? "bg-primary/10"
                                        : "",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.ThumbsDown,
                                        { className: "h-4 w-4 mr-1" },
                                      ),
                                      "Improve",
                                    ],
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "space-x-2",
                                children: (0, jsx_runtime_1.jsxs)(
                                  button_1.Button,
                                  {
                                    variant: "outline",
                                    size: "sm",
                                    onClick: function () {
                                      return handleCopy(item.content);
                                    },
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Copy,
                                        { className: "h-4 w-4 mr-1" },
                                      ),
                                      "Copy",
                                    ],
                                  },
                                ),
                              }),
                            ],
                          }),
                        ],
                      }),
                    },
                    item.id,
                  );
                }),
                generations.length > 1 &&
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "ghost",
                    className: "mt-2",
                    onClick: function () {
                      return setGenerations([]);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, {
                        className: "h-4 w-4 mr-1",
                      }),
                      "Clear All",
                    ],
                  }),
              ],
            }),
          ],
        }),
    ],
  });
}
// Helper function to generate sample content (would be replaced with AI API call)
function generateSampleContent(request) {
  var contentTypes = {
    adCopy: "Introducing our revolutionary solution for "
      .concat(request.industry, " professionals!\n\nAre you a ")
      .concat(
        request.targetAudience,
        " looking to improve your results? Our product delivers exceptional performance with industry-leading features.\n\n",
      )
      .concat(request.keyPoints, "\n\nAct now and experience the difference!"),
    emailTemplate: "Subject: Special Offer for "
      .concat(
        request.targetAudience,
        "\n\nHello [Customer Name],\n\nWe hope this email finds you well. As a valued customer in the ",
      )
      .concat(
        request.industry,
        " industry, we wanted to share some exciting news with you.\n\n",
      )
      .concat(request.keyPoints, "\n\nBest regards,\n[Your Company] Team"),
    socialPost: "\uD83D\uDCE3 Attention "
      .concat(
        request.targetAudience,
        "! \n\nLooking to solve your biggest challenges in the ",
      )
      .concat(request.industry, " space?\n\n")
      .concat(
        request.keyPoints,
        "\n\nClick the link in our bio to learn more!\n#IndustryTrends #Solution #Innovation",
      ),
    productDescription: "Our premium solution for "
      .concat(
        request.industry,
        " professionals delivers unmatched performance and value.\n\nDesigned specifically for ",
      )
      .concat(
        request.targetAudience,
        ", this product addresses your most pressing needs with innovative features.\n\nKey Benefits:\n",
      )
      .concat(
        request.keyPoints,
        "\n\nAvailable now with special introductory pricing.",
      ),
    landingPage: "# Transform Your "
      .concat(request.industry, " Business\n\n## The Ultimate Solution for ")
      .concat(
        request.targetAudience,
        "\n\nAre you facing challenges with efficiency, costs, or performance? Our comprehensive platform is designed to help you excel.\n\n### Why Choose Us\n",
      )
      .concat(
        request.keyPoints,
        "\n\n### Ready to get started?\nBook a demo today or start your free trial!",
      ),
  };
  return contentTypes[request.contentType];
}
exports.default = AIContentGenerator;
