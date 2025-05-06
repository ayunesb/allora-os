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
exports.FollowUpSequences = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var predefinedSequences = [
  {
    id: "1",
    name: "New Lead Nurturing",
    description:
      "A sequence for new leads to introduce your company and services",
    aiGenerated: true,
    targetAudience: "new",
    steps: [
      {
        id: "1-1",
        content:
          "Thank you for your interest in our services. Here's more information about how we can help your business.",
        delayDays: 0,
        type: "email",
      },
      {
        id: "1-2",
        content:
          "Following up on our previous email. Would you be interested in scheduling a quick call to discuss your needs?",
        delayDays: 3,
        type: "email",
      },
      {
        id: "1-3",
        content:
          "Schedule a phone call to discuss their requirements and how our services can address their needs.",
        delayDays: 5,
        type: "call",
      },
      {
        id: "1-4",
        content:
          "Send a personalized proposal based on the previous call discussion.",
        delayDays: 7,
        type: "email",
      },
    ],
  },
  {
    id: "2",
    name: "Proposal Follow-Up",
    description: "A sequence for following up after sending a proposal",
    aiGenerated: true,
    targetAudience: "proposal",
    steps: [
      {
        id: "2-1",
        content:
          "I wanted to check if you had a chance to review the proposal I sent. Would you like to discuss any specific details?",
        delayDays: 2,
        type: "email",
      },
      {
        id: "2-2",
        content:
          "Follow up with a phone call to address any questions about the proposal.",
        delayDays: 4,
        type: "call",
      },
      {
        id: "2-3",
        content:
          "Send case studies of similar clients who have achieved great results with our services.",
        delayDays: 7,
        type: "email",
      },
      {
        id: "2-4",
        content:
          "Final follow-up with a special offer or incentive to make a decision.",
        delayDays: 10,
        type: "email",
      },
    ],
  },
  {
    id: "3",
    name: "Re-engagement Campaign",
    description: "A sequence for re-engaging cold leads",
    aiGenerated: true,
    targetAudience: "cold",
    steps: [
      {
        id: "3-1",
        content:
          "We haven't connected in a while. I thought you might be interested in our latest industry report.",
        delayDays: 0,
        type: "email",
      },
      {
        id: "3-2",
        content:
          "Following up on the industry report. Did you find the insights valuable for your business?",
        delayDays: 5,
        type: "email",
      },
      {
        id: "3-3",
        content:
          "Invitation to an upcoming webinar on industry trends and strategies.",
        delayDays: 10,
        type: "email",
      },
      {
        id: "3-4",
        content:
          "Schedule a reassessment call to understand current needs and challenges.",
        delayDays: 15,
        type: "call",
      },
    ],
  },
];
var FollowUpSequences = function (_a) {
  var lead = _a.lead,
    onApply = _a.onApply;
  var _b = (0, react_1.useState)("predefined"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var _c = (0, react_1.useState)(predefinedSequences),
    sequences = _c[0],
    setSequences = _c[1];
  var _d = (0, react_1.useState)(false),
    generating = _d[0],
    setGenerating = _d[1];
  var _e = (0, react_1.useState)({
      name: "",
      description: "",
      steps: [],
      aiGenerated: false,
      targetAudience: "new",
    }),
    newSequence = _e[0],
    setNewSequence = _e[1];
  var _f = (0, react_1.useState)(false),
    isEditing = _f[0],
    setIsEditing = _f[1];
  var generateAISequence = function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var newAISequence_1, error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, 3, 4]);
            setGenerating(true);
            // This would normally call an AI service to generate a sequence
            // For demo purposes, we'll simulate a delay and return a predefined sequence
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 2000);
              }),
            ];
          case 1:
            // This would normally call an AI service to generate a sequence
            // For demo purposes, we'll simulate a delay and return a predefined sequence
            _a.sent();
            newAISequence_1 = {
              id: "ai-".concat(Date.now()),
              name: "AI Generated Sequence for ".concat(
                (lead === null || lead === void 0 ? void 0 : lead.status) ||
                  "Leads",
              ),
              description: "Personalized follow-up sequence for ".concat(
                (lead === null || lead === void 0 ? void 0 : lead.name) ||
                  "leads",
                " based on their profile and status",
              ),
              aiGenerated: true,
              targetAudience:
                (lead === null || lead === void 0 ? void 0 : lead.status) ||
                "new",
              steps: [
                {
                  id: "ai-".concat(Date.now(), "-1"),
                  content:
                    "AI generated first contact message tailored to the lead's industry and needs.",
                  delayDays: 0,
                  type: "email",
                },
                {
                  id: "ai-".concat(Date.now(), "-2"),
                  content:
                    "AI generated follow-up message addressing specific pain points and offering solutions.",
                  delayDays: 3,
                  type: "email",
                },
                {
                  id: "ai-".concat(Date.now(), "-3"),
                  content:
                    "AI recommended phone call to discuss personalized solution options.",
                  delayDays: 5,
                  type: "call",
                },
                {
                  id: "ai-".concat(Date.now(), "-4"),
                  content:
                    "AI generated message with custom resources and next steps.",
                  delayDays: 7,
                  type: "email",
                },
              ],
            };
            setSequences(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [newAISequence_1],
                false,
              );
            });
            sonner_1.toast.success("AI sequence generated successfully");
            setActiveTab("custom");
            return [3 /*break*/, 4];
          case 2:
            error_1 = _a.sent();
            sonner_1.toast.error(
              "Failed to generate sequence: ".concat(error_1.message),
            );
            return [3 /*break*/, 4];
          case 3:
            setGenerating(false);
            return [7 /*endfinally*/];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleAddStep = function () {
    var newStep = {
      id: "new-".concat(Date.now()),
      content: "",
      delayDays: 1,
      type: "email",
    };
    setNewSequence(function (prev) {
      return __assign(__assign({}, prev), {
        steps: __spreadArray(
          __spreadArray([], prev.steps || [], true),
          [newStep],
          false,
        ),
      });
    });
  };
  var handleRemoveStep = function (stepId) {
    setNewSequence(function (prev) {
      return __assign(__assign({}, prev), {
        steps: (prev.steps || []).filter(function (step) {
          return step.id !== stepId;
        }),
      });
    });
  };
  var handleUpdateStep = function (stepId, field, value) {
    setNewSequence(function (prev) {
      return __assign(__assign({}, prev), {
        steps: (prev.steps || []).map(function (step) {
          var _a;
          return step.id === stepId
            ? __assign(__assign({}, step), ((_a = {}), (_a[field] = value), _a))
            : step;
        }),
      });
    });
  };
  var handleSaveSequence = function () {
    if (!newSequence.name) {
      sonner_1.toast.error("Please enter a name for the sequence");
      return;
    }
    if (!(newSequence.steps || []).length) {
      sonner_1.toast.error("Please add at least one step to the sequence");
      return;
    }
    var completeSequence = {
      id: "custom-".concat(Date.now()),
      name: newSequence.name || "Custom Sequence",
      description: newSequence.description || "",
      steps: newSequence.steps || [],
      aiGenerated: false,
      targetAudience: newSequence.targetAudience || "new",
    };
    setSequences(function (prev) {
      return __spreadArray(
        __spreadArray([], prev, true),
        [completeSequence],
        false,
      );
    });
    setNewSequence({
      name: "",
      description: "",
      steps: [],
      aiGenerated: false,
      targetAudience: "new",
    });
    sonner_1.toast.success("Sequence saved successfully");
    setIsEditing(false);
  };
  var handleApplySequence = function (sequenceId) {
    // In a real application, this would apply the sequence to the selected lead
    if (onApply) {
      onApply(sequenceId);
    }
    sonner_1.toast.success("Follow-up sequence applied successfully");
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            children: "Follow-Up Sequences",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Create and manage automated follow-up sequences for your leads",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          value: activeTab,
          onValueChange: setActiveTab,
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "mb-4",
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "predefined",
                  children: "Predefined Sequences",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "custom",
                  children: "Custom Sequences",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "create",
                  children: "Create New",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "predefined",
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium",
                      children: "AI-Generated Templates",
                    }),
                    lead &&
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        onClick: generateAISequence,
                        disabled: generating,
                        size: "sm",
                        children: generating
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
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Sparkles,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "Generate for ",
                                lead.name,
                              ],
                            }),
                      }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "space-y-4",
                  children: sequences
                    .filter(function (seq) {
                      return seq.aiGenerated;
                    })
                    .map(function (sequence) {
                      return (0, jsx_runtime_1.jsxs)(
                        "div",
                        {
                          className: "border rounded-md p-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("div", {
                              className:
                                "flex justify-between items-start mb-2",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("h4", {
                                      className:
                                        "font-medium flex items-center",
                                      children: [
                                        sequence.name,
                                        sequence.aiGenerated &&
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className:
                                              "ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full",
                                            children: "AI Generated",
                                          }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsx)("p", {
                                      className:
                                        "text-sm text-muted-foreground",
                                      children: sequence.description,
                                    }),
                                    (0, jsx_runtime_1.jsxs)("p", {
                                      className:
                                        "text-xs text-muted-foreground mt-1",
                                      children: [
                                        "Target: ",
                                        (0, jsx_runtime_1.jsx)("span", {
                                          className: "font-medium capitalize",
                                          children: sequence.targetAudience,
                                        }),
                                        " leads",
                                      ],
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)(button_1.Button, {
                                  variant: "secondary",
                                  size: "sm",
                                  onClick: function () {
                                    return handleApplySequence(sequence.id);
                                  },
                                  children: "Apply",
                                }),
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "space-y-2 mt-4",
                              children: sequence.steps.map(
                                function (step, index) {
                                  return (0, jsx_runtime_1.jsxs)(
                                    "div",
                                    {
                                      className:
                                        "flex items-start gap-3 p-2 rounded-md bg-muted/50",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("div", {
                                          className:
                                            "min-w-[30px] h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium",
                                          children: index + 1,
                                        }),
                                        (0, jsx_runtime_1.jsxs)("div", {
                                          className: "flex-1",
                                          children: [
                                            (0, jsx_runtime_1.jsx)("p", {
                                              className: "text-sm",
                                              children: step.content,
                                            }),
                                            (0, jsx_runtime_1.jsxs)("div", {
                                              className:
                                                "flex items-center gap-2 mt-1",
                                              children: [
                                                (0, jsx_runtime_1.jsxs)(
                                                  "span",
                                                  {
                                                    className:
                                                      "text-xs flex items-center text-muted-foreground",
                                                    children: [
                                                      (0, jsx_runtime_1.jsx)(
                                                        lucide_react_1.Clock,
                                                        {
                                                          className:
                                                            "h-3 w-3 mr-1",
                                                        },
                                                      ),
                                                      step.delayDays === 0
                                                        ? "Immediately"
                                                        : "After "
                                                            .concat(
                                                              step.delayDays,
                                                              " day",
                                                            )
                                                            .concat(
                                                              step.delayDays > 1
                                                                ? "s"
                                                                : "",
                                                            ),
                                                    ],
                                                  },
                                                ),
                                                (0, jsx_runtime_1.jsx)("span", {
                                                  className:
                                                    "text-xs capitalize bg-muted px-1.5 py-0.5 rounded text-muted-foreground",
                                                  children: step.type,
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    step.id,
                                  );
                                },
                              ),
                            }),
                          ],
                        },
                        sequence.id,
                      );
                    }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
              value: "custom",
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium",
                      children: "Your Custom Sequences",
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: function () {
                        setIsEditing(true);
                        setActiveTab("create");
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Create New",
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    sequences
                      .filter(function (seq) {
                        return !seq.aiGenerated;
                      })
                      .map(function (sequence) {
                        return (0, jsx_runtime_1.jsxs)(
                          "div",
                          {
                            className: "border rounded-md p-4",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className:
                                  "flex justify-between items-start mb-2",
                                children: [
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    children: [
                                      (0, jsx_runtime_1.jsx)("h4", {
                                        className: "font-medium",
                                        children: sequence.name,
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-sm text-muted-foreground",
                                        children: sequence.description,
                                      }),
                                      (0, jsx_runtime_1.jsxs)("p", {
                                        className:
                                          "text-xs text-muted-foreground mt-1",
                                        children: [
                                          "Target: ",
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "font-medium capitalize",
                                            children: sequence.targetAudience,
                                          }),
                                          " leads",
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "secondary",
                                    size: "sm",
                                    onClick: function () {
                                      return handleApplySequence(sequence.id);
                                    },
                                    children: "Apply",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className: "space-y-2 mt-4",
                                children: sequence.steps.map(
                                  function (step, index) {
                                    return (0, jsx_runtime_1.jsxs)(
                                      "div",
                                      {
                                        className:
                                          "flex items-start gap-3 p-2 rounded-md bg-muted/50",
                                        children: [
                                          (0, jsx_runtime_1.jsx)("div", {
                                            className:
                                              "min-w-[30px] h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium",
                                            children: index + 1,
                                          }),
                                          (0, jsx_runtime_1.jsxs)("div", {
                                            className: "flex-1",
                                            children: [
                                              (0, jsx_runtime_1.jsx)("p", {
                                                className: "text-sm",
                                                children: step.content,
                                              }),
                                              (0, jsx_runtime_1.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-2 mt-1",
                                                children: [
                                                  (0, jsx_runtime_1.jsxs)(
                                                    "span",
                                                    {
                                                      className:
                                                        "text-xs flex items-center text-muted-foreground",
                                                      children: [
                                                        (0, jsx_runtime_1.jsx)(
                                                          lucide_react_1.Clock,
                                                          {
                                                            className:
                                                              "h-3 w-3 mr-1",
                                                          },
                                                        ),
                                                        step.delayDays === 0
                                                          ? "Immediately"
                                                          : "After "
                                                              .concat(
                                                                step.delayDays,
                                                                " day",
                                                              )
                                                              .concat(
                                                                step.delayDays >
                                                                  1
                                                                  ? "s"
                                                                  : "",
                                                              ),
                                                      ],
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    "span",
                                                    {
                                                      className:
                                                        "text-xs capitalize bg-muted px-1.5 py-0.5 rounded text-muted-foreground",
                                                      children: step.type,
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      },
                                      step.id,
                                    );
                                  },
                                ),
                              }),
                            ],
                          },
                          sequence.id,
                        );
                      }),
                    sequences.filter(function (seq) {
                      return !seq.aiGenerated;
                    }).length === 0 &&
                      (0, jsx_runtime_1.jsxs)("div", {
                        className:
                          "flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20",
                        children: [
                          (0, jsx_runtime_1.jsx)("p", {
                            className: "text-muted-foreground mb-2",
                            children:
                              "You haven't created any custom sequences yet",
                          }),
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            size: "sm",
                            onClick: function () {
                              setIsEditing(true);
                              setActiveTab("create");
                            },
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                                className: "mr-2 h-4 w-4",
                              }),
                              "Create Your First Sequence",
                            ],
                          }),
                        ],
                      }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "create",
              className: "space-y-6",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "sequence-name",
                            children: "Sequence Name",
                          }),
                          (0, jsx_runtime_1.jsx)(input_1.Input, {
                            id: "sequence-name",
                            placeholder: "e.g., Product Demo Follow-Up",
                            value: newSequence.name,
                            onChange: function (e) {
                              return setNewSequence(function (prev) {
                                return __assign(__assign({}, prev), {
                                  name: e.target.value,
                                });
                              });
                            },
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "sequence-description",
                            children: "Description",
                          }),
                          (0, jsx_runtime_1.jsx)(textarea_1.Textarea, {
                            id: "sequence-description",
                            placeholder: "Describe what this sequence is for",
                            value: newSequence.description,
                            onChange: function (e) {
                              return setNewSequence(function (prev) {
                                return __assign(__assign({}, prev), {
                                  description: e.target.value,
                                });
                              });
                            },
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            htmlFor: "target-audience",
                            children: "Target Audience",
                          }),
                          (0, jsx_runtime_1.jsxs)(select_1.Select, {
                            value: newSequence.targetAudience,
                            onValueChange: function (value) {
                              return setNewSequence(function (prev) {
                                return __assign(__assign({}, prev), {
                                  targetAudience: value,
                                });
                              });
                            },
                            children: [
                              (0, jsx_runtime_1.jsx)(select_1.SelectTrigger, {
                                children: (0, jsx_runtime_1.jsx)(
                                  select_1.SelectValue,
                                  { placeholder: "Select lead status" },
                                ),
                              }),
                              (0, jsx_runtime_1.jsxs)(select_1.SelectContent, {
                                children: [
                                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                    value: "new",
                                    children: "New Leads",
                                  }),
                                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                    value: "contacted",
                                    children: "Contacted Leads",
                                  }),
                                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                    value: "qualified",
                                    children: "Qualified Leads",
                                  }),
                                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                    value: "proposal",
                                    children: "Proposal Sent",
                                  }),
                                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                    value: "negotiation",
                                    children: "In Negotiation",
                                  }),
                                  (0, jsx_runtime_1.jsx)(select_1.SelectItem, {
                                    value: "cold",
                                    children: "Cold Leads",
                                  }),
                                ],
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
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)(label_1.Label, {
                            children: "Sequence Steps",
                          }),
                          (0, jsx_runtime_1.jsxs)(button_1.Button, {
                            variant: "outline",
                            size: "sm",
                            onClick: handleAddStep,
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                                className: "mr-2 h-4 w-4",
                              }),
                              "Add Step",
                            ],
                          }),
                        ],
                      }),
                      (newSequence.steps || []).length === 0
                        ? (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex flex-col items-center justify-center py-8 px-4 border rounded-md bg-muted/20",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "text-muted-foreground mb-2",
                                children: "No steps added yet",
                              }),
                              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                                variant: "outline",
                                size: "sm",
                                onClick: handleAddStep,
                                children: [
                                  (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                                    className: "mr-2 h-4 w-4",
                                  }),
                                  "Add Your First Step",
                                ],
                              }),
                            ],
                          })
                        : (0, jsx_runtime_1.jsx)("div", {
                            className: "space-y-4",
                            children: (newSequence.steps || []).map(
                              function (step, index) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "border rounded-md p-4 space-y-4",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className:
                                          "flex justify-between items-center",
                                        children: [
                                          (0, jsx_runtime_1.jsxs)("h4", {
                                            className: "font-medium",
                                            children: ["Step ", index + 1],
                                          }),
                                          (0, jsx_runtime_1.jsx)(
                                            button_1.Button,
                                            {
                                              variant: "ghost",
                                              size: "icon",
                                              onClick: function () {
                                                return handleRemoveStep(
                                                  step.id,
                                                );
                                              },
                                              children: (0, jsx_runtime_1.jsx)(
                                                lucide_react_1.X,
                                                { className: "h-4 w-4" },
                                              ),
                                            },
                                          ),
                                        ],
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className: "space-y-4",
                                        children: [
                                          (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                label_1.Label,
                                                {
                                                  htmlFor: "step-type-".concat(
                                                    step.id,
                                                  ),
                                                  children: "Type",
                                                },
                                              ),
                                              (0, jsx_runtime_1.jsxs)(
                                                select_1.Select,
                                                {
                                                  value: step.type,
                                                  onValueChange: function (
                                                    value,
                                                  ) {
                                                    return handleUpdateStep(
                                                      step.id,
                                                      "type",
                                                      value,
                                                    );
                                                  },
                                                  children: [
                                                    (0, jsx_runtime_1.jsx)(
                                                      select_1.SelectTrigger,
                                                      {
                                                        id: "step-type-".concat(
                                                          step.id,
                                                        ),
                                                        children: (0,
                                                        jsx_runtime_1.jsx)(
                                                          select_1.SelectValue,
                                                          {
                                                            placeholder:
                                                              "Select step type",
                                                          },
                                                        ),
                                                      },
                                                    ),
                                                    (0, jsx_runtime_1.jsxs)(
                                                      select_1.SelectContent,
                                                      {
                                                        children: [
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "email",
                                                              children: "Email",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "call",
                                                              children:
                                                                "Phone Call",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "message",
                                                              children:
                                                                "Message",
                                                            },
                                                          ),
                                                          (0,
                                                          jsx_runtime_1.jsx)(
                                                            select_1.SelectItem,
                                                            {
                                                              value: "task",
                                                              children: "Task",
                                                            },
                                                          ),
                                                        ],
                                                      },
                                                    ),
                                                  ],
                                                },
                                              ),
                                            ],
                                          }),
                                          (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                label_1.Label,
                                                {
                                                  htmlFor:
                                                    "step-content-".concat(
                                                      step.id,
                                                    ),
                                                  children: "Content",
                                                },
                                              ),
                                              (0, jsx_runtime_1.jsx)(
                                                textarea_1.Textarea,
                                                {
                                                  id: "step-content-".concat(
                                                    step.id,
                                                  ),
                                                  placeholder:
                                                    "Enter the content or description of this step",
                                                  value: step.content,
                                                  onChange: function (e) {
                                                    return handleUpdateStep(
                                                      step.id,
                                                      "content",
                                                      e.target.value,
                                                    );
                                                  },
                                                },
                                              ),
                                            ],
                                          }),
                                          (0, jsx_runtime_1.jsxs)("div", {
                                            className: "space-y-2",
                                            children: [
                                              (0, jsx_runtime_1.jsx)(
                                                label_1.Label,
                                                {
                                                  htmlFor: "step-delay-".concat(
                                                    step.id,
                                                  ),
                                                  children: "Delay (days)",
                                                },
                                              ),
                                              (0, jsx_runtime_1.jsxs)("div", {
                                                className:
                                                  "flex items-center gap-2",
                                                children: [
                                                  (0, jsx_runtime_1.jsx)(
                                                    input_1.Input,
                                                    {
                                                      id: "step-delay-".concat(
                                                        step.id,
                                                      ),
                                                      type: "number",
                                                      min: "0",
                                                      value: step.delayDays,
                                                      onChange: function (e) {
                                                        return handleUpdateStep(
                                                          step.id,
                                                          "delayDays",
                                                          parseInt(
                                                            e.target.value,
                                                          ),
                                                        );
                                                      },
                                                    },
                                                  ),
                                                  (0, jsx_runtime_1.jsx)(
                                                    "div",
                                                    {
                                                      className:
                                                        "text-sm text-muted-foreground",
                                                      children:
                                                        step.delayDays === 0
                                                          ? "Immediately"
                                                          : step.delayDays === 1
                                                            ? "After 1 day"
                                                            : "After ".concat(
                                                                step.delayDays,
                                                                " days",
                                                              ),
                                                    },
                                                  ),
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  step.id,
                                );
                              },
                            ),
                          }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-end gap-2 pt-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        variant: "outline",
                        onClick: function () {
                          setNewSequence({
                            name: "",
                            description: "",
                            steps: [],
                            aiGenerated: false,
                            targetAudience: "new",
                          });
                          setIsEditing(false);
                          setActiveTab("custom");
                        },
                        children: "Cancel",
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        onClick: handleSaveSequence,
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.Save, {
                            className: "mr-2 h-4 w-4",
                          }),
                          "Save Sequence",
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            }),
          ],
        }),
      }),
    ],
  });
};
exports.FollowUpSequences = FollowUpSequences;
