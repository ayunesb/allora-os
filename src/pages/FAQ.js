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
exports.default = FAQ;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Navbar_1 = require("@/components/Navbar");
var accordion_1 = require("@/components/ui/accordion");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var client_1 = require("@/integrations/supabase/client");
function FAQ() {
  var _this = this;
  var _a = (0, react_1.useState)(""),
    question = _a[0],
    setQuestion = _a[1];
  var _b = (0, react_1.useState)(null),
    aiAnswer = _b[0],
    setAiAnswer = _b[1];
  var _c = (0, react_1.useState)(false),
    isLoading = _c[0],
    setIsLoading = _c[1];
  var faqItems = [
    {
      question: "What is Allora AI?",
      answer:
        "Allora AI is an executive advisory platform powered by artificial intelligence that helps businesses make strategic decisions, develop growth strategies, and gain competitive insights.",
    },
    {
      question: "How does Allora AI work?",
      answer:
        "Allora AI uses advanced machine learning algorithms to analyze your business data, market trends, and industry benchmarks to provide personalized strategic recommendations and insights.",
    },
    {
      question: "Is my business data secure?",
      answer:
        "Yes. We take data security seriously. All data is encrypted, stored securely, and never shared with third parties without explicit permission. We are compliant with major data protection regulations.",
    },
    {
      question: "How much does Allora AI cost?",
      answer:
        "Allora AI offers flexible pricing plans designed to fit businesses of all sizes. Visit our Pricing page for detailed information about our subscription options and features.",
    },
    {
      question: "Do I need technical expertise to use Allora AI?",
      answer:
        "No technical expertise is required. Our platform is designed with an intuitive interface that makes it easy for anyone to use, regardless of technical background.",
    },
    {
      question: "Can I integrate Allora AI with my existing systems?",
      answer:
        "Yes, Allora AI offers integration capabilities with many popular business tools and platforms. Contact our support team for specific integration questions.",
    },
    {
      question: "How accurate are the AI predictions?",
      answer:
        "Our AI models are continuously trained on extensive datasets and refined based on real-world outcomes. While no prediction system is perfect, our platform achieves high accuracy rates and improves over time.",
    },
  ];
  var askAI = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var appContext, _a, data, error, error_1;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!question.trim()) {
              sonner_1.toast.error("Please enter a question");
              return [2 /*return*/];
            }
            setIsLoading(true);
            setAiAnswer(null);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            appContext =
              "\n        About Allora AI:\n        - Allora AI is an executive advisory platform powered by artificial intelligence\n        - Main features include: AI Executive Team, Dashboard & Analytics, Strategy Management, \n          Lead Management, Communication Tools, Campaign Management, User Management & Settings\n        - The AI Executive Team includes virtual executive personas that provide specialized advice on business strategies\n        - The platform offers risk-based strategies tailored to different risk appetites (low, medium, high)\n        - Users can track business metrics, manage leads, and create marketing campaigns\n        - Communication tools include phone calling, Zoom integration, WhatsApp messaging, and AI script generation\n        - The platform is designed to be user-friendly with a responsive interface for all devices\n        \n        Core User Benefits:\n        - Make data-driven strategic decisions with AI assistance\n        - Get personalized business insights based on company size, industry, and risk preferences\n        - Connect with potential customers more effectively through integrated communication tools\n        - Track performance metrics and ROI for business initiatives\n        - Save time with AI-generated recommendations and content\n      ";
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("openai", {
                body: {
                  prompt: question,
                  botName: "FAQ Assistant",
                  botRole: "customer support specialist",
                  messages: [],
                  systemContext: appContext,
                },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) {
              throw new Error(error.message);
            }
            setAiAnswer(data.content);
            return [3 /*break*/, 5];
          case 3:
            error_1 = _b.sent();
            console.error("Error asking AI:", error_1);
            sonner_1.toast.error(
              "Failed to get answer. Please try again later.",
            );
            return [3 /*break*/, 5];
          case 4:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleKeyPress = function (e) {
    if (e.key === "Enter" && !isLoading) {
      askAI();
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "min-h-screen flex flex-col",
    children: [
      (0, jsx_runtime_1.jsx)(Navbar_1.default, {}),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex-1 container mx-auto px-4 py-16",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "max-w-3xl mx-auto",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mb-8 text-center",
              children: [
                (0, jsx_runtime_1.jsx)("h1", {
                  className: "text-4xl font-bold mb-4",
                  children: "Frequently Asked Questions",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground text-lg",
                  children: "Find answers to common questions about Allora AI",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Common Questions",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Everything you need to know about Allora AI",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)(accordion_1.Accordion, {
                    type: "single",
                    collapsible: true,
                    className: "w-full",
                    children: faqItems.map(function (item, index) {
                      return (0, jsx_runtime_1.jsxs)(
                        accordion_1.AccordionItem,
                        {
                          value: "item-".concat(index),
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              accordion_1.AccordionTrigger,
                              {
                                className: "text-left font-medium",
                                children: item.question,
                              },
                            ),
                            (0, jsx_runtime_1.jsx)(
                              accordion_1.AccordionContent,
                              {
                                className: "text-muted-foreground",
                                children: item.answer,
                              },
                            ),
                          ],
                        },
                        index,
                      );
                    }),
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "mt-12",
              children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                className: "border border-primary/20",
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                        className: "flex items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
                            className: "mr-2 h-5 w-5 text-primary",
                          }),
                          "Ask Our AI Assistant",
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                        children:
                          "Don't see your question? Ask our AI assistant for help with Allora AI",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex flex-col space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex gap-2",
                          children: [
                            (0, jsx_runtime_1.jsx)(input_1.Input, {
                              placeholder:
                                "Ask about Allora AI features, pricing, or how to use it...",
                              value: question,
                              onChange: function (e) {
                                return setQuestion(e.target.value);
                              },
                              onKeyDown: handleKeyPress,
                              className: "flex-1",
                            }),
                            (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              onClick: askAI,
                              disabled: isLoading || !question.trim(),
                              children: [
                                isLoading
                                  ? (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Loader2,
                                      { className: "h-4 w-4 animate-spin" },
                                    )
                                  : (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.Send,
                                      { className: "h-4 w-4" },
                                    ),
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "ml-2 hidden sm:inline",
                                  children: "Ask",
                                }),
                              ],
                            }),
                          ],
                        }),
                        isLoading &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-center p-4",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                                className: "h-6 w-6 animate-spin text-primary",
                              }),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "ml-2 text-muted-foreground",
                                children: "Getting your answer...",
                              }),
                            ],
                          }),
                        aiAnswer &&
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "p-4 rounded-lg bg-muted/50",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-sm font-medium mb-2",
                                children: "AI Response:",
                              }),
                              (0, jsx_runtime_1.jsx)("p", {
                                className:
                                  "text-muted-foreground whitespace-pre-line",
                                children: aiAnswer,
                              }),
                            ],
                          }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
                    className: "text-xs text-muted-foreground",
                    children:
                      "This AI assistant provides information specific to Allora AI and its features.",
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mt-12 text-center",
              children: [
                (0, jsx_runtime_1.jsx)("h2", {
                  className: "text-2xl font-bold mb-4",
                  children: "Still have questions?",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground mb-4",
                  children:
                    "Our team is here to help with any other questions you might have.",
                }),
                (0, jsx_runtime_1.jsx)("a", {
                  href: "mailto:support@allora-ai.com",
                  className: "text-primary hover:underline",
                  children: "Contact Support",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
