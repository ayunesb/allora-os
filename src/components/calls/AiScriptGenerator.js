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
exports.default = AiScriptGenerator;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var select_1 = require("@/components/ui/select");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function AiScriptGenerator() {
  var _this = this;
  var _a = (0, react_1.useState)("call"),
    scriptType = _a[0],
    setScriptType = _a[1];
  var _b = (0, react_1.useState)("introduction"),
    scriptPurpose = _b[0],
    setScriptPurpose = _b[1];
  var _c = (0, react_1.useState)(""),
    leadInfo = _c[0],
    setLeadInfo = _c[1];
  var _d = (0, react_1.useState)(false),
    isGenerating = _d[0],
    setIsGenerating = _d[1];
  var _e = (0, react_1.useState)(null),
    generatedScript = _e[0],
    setGeneratedScript = _e[1];
  var _f = (0, react_1.useState)(false),
    isCopied = _f[0],
    setIsCopied = _f[1];
  var generateScript = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var sampleScript, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!leadInfo.trim()) {
              sonner_1.toast.error(
                "Please provide some information about the lead",
              );
              return [2 /*return*/];
            }
            setIsGenerating(true);
            setGeneratedScript(null);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            // In a real app, this would call OpenAI or another AI service
            // Here we're simulating a response
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 2000);
              }),
            ];
          case 2:
            // In a real app, this would call OpenAI or another AI service
            // Here we're simulating a response
            _a.sent();
            sampleScript = "";
            if (scriptType === "call") {
              if (scriptPurpose === "introduction") {
                sampleScript =
                  "Hello, this is [Your Name] from [Company Name]. I noticed your company has been focusing on improving customer engagement, and I thought our platform might be a great fit for your needs.\n\nWe've helped similar businesses increase their customer retention by 30% within 3 months. Would you be interested in a brief demo to see how we could help you achieve similar results?\n\n[If yes] Great! I'd be happy to schedule that. What day works best for you next week?\n\n[If no] No problem at all. Would it be alright if I send you some information via email instead? Then you can review it at your convenience.";
              } else if (scriptPurpose === "follow_up") {
                sampleScript =
                  "Hello again, this is [Your Name] from [Company Name]. We spoke last week about your customer engagement challenges.\n\nI wanted to follow up to see if you'd had a chance to review the materials I sent and if you have any questions I could answer.\n\nBased on what you shared about your current process, I think our [Specific Feature] could help you address the [Pain Point] you mentioned. Would you like to discuss how that might work specifically for your team?";
              } else if (scriptPurpose === "demo") {
                sampleScript =
                  "Hello, thanks for taking the time to see our platform in action today. During this demo, I'll show you how our solution addresses the specific challenges you mentioned regarding [Key Pain Point].\n\nI'll walk you through the main features that our other clients in your industry have found most valuable, and then we can discuss how to customize the platform for your specific needs.\n\nFeel free to ask questions at any point - this demo is all about showing you what's possible for your specific situation.";
              } else if (scriptPurpose === "closing") {
                sampleScript =
                  "Based on our previous conversations, I've put together a proposal that I believe will address the key challenges you've mentioned. To summarize:\n\n1. Our platform will help you [Benefit 1]\n2. You'll be able to [Benefit 2]\n3. Your team will save approximately [X hours/dollars] by implementing this solution\n\nWe can get you set up within [Timeframe], and our team will provide full onboarding and training. Does this solution align with what you're looking for?\n\n[Address objections as needed]\n\nIf you're ready to move forward, the next steps would be to [describe contract process]. Would you like to proceed with this plan?";
              }
            } else {
              // WhatsApp scripts - shorter and more direct
              if (scriptPurpose === "introduction") {
                sampleScript =
                  "Hi there! \uD83D\uDC4B This is [Your Name] from [Company Name]. We specialize in helping businesses like yours improve customer engagement and retention.\n\nI'd love to learn more about your current challenges in this area. Would you be open to a quick chat about how we might be able to help?\n\nLooking forward to connecting!";
              } else if (scriptPurpose === "follow_up") {
                sampleScript =
                  "Hi again from [Company Name]! \uD83D\uDC4B\n\nI wanted to follow up on our previous conversation about your customer engagement strategies. Have you had a chance to review the information I sent?\n\nI'm happy to answer any questions or schedule a quick call if that would be helpful.";
              } else if (scriptPurpose === "demo") {
                sampleScript =
                  "Hi there! \uD83D\uDCF1 Looking forward to our demo call tomorrow. Here's a quick overview of what we'll cover:\n\n\u2705 How our platform addresses your specific needs\n\u2705 Key features that will save your team time\n\u2705 Implementation process and timeline\n\nIs there anything specific you'd like me to focus on during our call?";
              } else if (scriptPurpose === "closing") {
                sampleScript =
                  "Thanks for your interest in [Company Name]! Based on our discussions, I think our [Product/Service] would be a great fit for your needs.\n\n\uD83D\uDD11 Key benefits for you:\n- [Benefit 1]\n- [Benefit 2]\n- [Benefit 3]\n\nOur team can have you up and running by [Date]. Would you like to move forward with this solution?";
              }
            }
            setGeneratedScript(sampleScript);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _a.sent();
            console.error("Error generating script:", error_1);
            sonner_1.toast.error("Failed to generate script");
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
  var copyToClipboard = function () {
    if (generatedScript) {
      navigator.clipboard.writeText(generatedScript);
      setIsCopied(true);
      sonner_1.toast.success("Script copied to clipboard");
      setTimeout(function () {
        setIsCopied(false);
      }, 3000);
    }
  };
  var regenerateScript = function () {
    generateScript();
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                className: "h-5 w-5 text-yellow-500",
              }),
              "AI Script Generator",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Create personalized scripts for calls and messages",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                htmlFor: "script-type",
                className: "text-sm font-medium",
                children: "Script Type",
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex gap-2",
                children: [
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    type: "button",
                    variant: scriptType === "call" ? "default" : "outline",
                    className: "flex-1 flex items-center justify-center gap-2",
                    onClick: function () {
                      return setScriptType("call");
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, {
                        className: "h-4 w-4",
                      }),
                      "Call Script",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    type: "button",
                    variant: scriptType === "whatsapp" ? "default" : "outline",
                    className: "flex-1 flex items-center justify-center gap-2",
                    onClick: function () {
                      return setScriptType("whatsapp");
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                        className: "h-4 w-4",
                      }),
                      "WhatsApp Message",
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                htmlFor: "script-purpose",
                className: "text-sm font-medium",
                children: "Script Purpose",
              }),
              (0, jsx_runtime_1.jsxs)(select_1.Select, {
                value: scriptPurpose,
                onValueChange: setScriptPurpose,
                children: [
                  (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                    id: "script-purpose",
                    children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, {
                      placeholder: "Select a purpose",
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                    children: [
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "introduction",
                        children: "Introduction / Cold Outreach",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "follow_up",
                        children: "Follow-up",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "demo",
                        children: "Product Demo",
                      }),
                      (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                        value: "closing",
                        children: "Closing / Deal",
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
              (0, jsx_runtime_1.jsx)("label", {
                htmlFor: "lead-info",
                className: "text-sm font-medium",
                children: "Lead Information",
              }),
              (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                id: "lead-info",
                placeholder:
                  "Enter lead details including company name, industry, pain points, etc.",
                value: leadInfo,
                onChange: function (e) {
                  return setLeadInfo(e.target.value);
                },
                className: "min-h-[100px]",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: generateScript,
            className: "w-full",
            disabled: isGenerating || !leadInfo.trim(),
            children: isGenerating
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Generating Script...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Generate AI Script",
                  ],
                }),
          }),
          generatedScript &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-3",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "p-3 border rounded-md bg-muted/30",
                  children: (0, jsx_runtime_1.jsx)("pre", {
                    className: "whitespace-pre-wrap text-sm",
                    children: generatedScript,
                  }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex gap-2",
                  children: [
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      className: "flex-1",
                      onClick: regenerateScript,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Regenerate",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      className: "flex-1",
                      onClick: copyToClipboard,
                      children: isCopied
                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                                className: "mr-2 h-4 w-4",
                              }),
                              "Copied",
                            ],
                          })
                        : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Copy, {
                                className: "mr-2 h-4 w-4",
                              }),
                              "Copy Script",
                            ],
                          }),
                    }),
                  ],
                }),
              ],
            }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "border-t pt-4 text-xs text-muted-foreground",
        children: (0, jsx_runtime_1.jsx)("p", {
          children:
            scriptType === "call"
              ? "AI-generated call scripts are personalized based on lead information and your company's tone of voice."
              : "AI-generated WhatsApp messages are optimized for high open and response rates.",
        }),
      }),
    ],
  });
}
