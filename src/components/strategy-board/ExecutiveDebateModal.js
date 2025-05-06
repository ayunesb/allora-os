"use strict";
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
exports.default = ExecutiveDebateModal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
var executiveBots_1 = require("@/backend/executiveBots");
var use_toast_1 = require("@/components/ui/use-toast");
var scrollHelpers_1 = require("@/utils/scrollHelpers");
var tabs_1 = require("@/components/ui/tabs");
function ExecutiveDebateModal(_a) {
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    strategy = _a.strategy,
    debate = _a.debate,
    isLoading = _a.isLoading;
  var toast = (0, use_toast_1.useToast)().toast;
  var messagesEndRef = react_1.default.useRef(null);
  var _b = react_1.default.useState("debate"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  // Scroll to the bottom whenever new messages come in
  react_1.default.useEffect(
    function () {
      if (isOpen && messagesEndRef.current) {
        (0, scrollHelpers_1.scrollToBottom)(messagesEndRef.current);
      }
    },
    [debate === null || debate === void 0 ? void 0 : debate.messages, isOpen],
  );
  // Generate mock executive photos
  var getExecutivePhoto = function (name) {
    var initial = name.charAt(0).toUpperCase();
    return "https://api.dicebear.com/6.x/initials/svg?seed=".concat(
      name.replace(/\s/g, ""),
      "&backgroundColor=4c1d95",
    );
  };
  // Generate mock debate if none exists
  var getMockDebate = function () {
    if (!strategy) return [];
    var risk = strategy.risk || strategy.risk_level || "Medium";
    var executives = getDebateExecutives(risk);
    return [
      {
        id: "1",
        sender: executives[0],
        content: 'I see tremendous potential in the "'.concat(
          strategy.title,
          '" strategy. The market is ready for this approach, and if executed well, we could see significant gains in both market share and revenue. However, we must be prepared to iterate rapidly based on customer feedback.',
        ),
        timestamp: new Date(Date.now() - 300000),
        executive: {
          name: executives[0],
          role: "CEO",
          avatar: getExecutivePhoto(executives[0]),
        },
        sentiment: "positive",
      },
      {
        id: "2",
        sender: executives[1],
        content:
          "While I agree with the general direction, I have concerns about the operational efficiency. Have we thoroughly analyzed the resource requirements? I'd recommend a phased implementation approach to minimize disruption to our core business activities.",
        timestamp: new Date(Date.now() - 240000),
        executive: {
          name: executives[1],
          role: "COO",
          avatar: getExecutivePhoto(executives[1]),
        },
        sentiment: "neutral",
      },
      {
        id: "3",
        sender: executives[2],
        content: "From a financial perspective, this ".concat(
          risk.toLowerCase(),
          "-risk strategy requires careful cash flow management. I've run the numbers, and we'll need to achieve at least a 15% ROI within the first year to justify the investment. Let's ensure we have robust metrics in place.",
        ),
        timestamp: new Date(Date.now() - 180000),
        executive: {
          name: executives[2],
          role: "CFO",
          avatar: getExecutivePhoto(executives[2]),
        },
        sentiment: "negative",
      },
      {
        id: "4",
        sender: executives[0],
        content:
          "Those are valid points. What if we allocate an initial 20% of the proposed budget for a pilot program? This would allow us to test key assumptions while limiting our exposure.",
        timestamp: new Date(Date.now() - 120000),
        executive: {
          name: executives[0],
          role: "CEO",
          avatar: getExecutivePhoto(executives[0]),
        },
        sentiment: "positive",
      },
    ];
  };
  // Get random executives based on risk level
  var getDebateExecutives = function (risk) {
    var allExecutives = __spreadArray(
      __spreadArray(
        __spreadArray(
          __spreadArray([], executiveBots_1.executiveBots.ceo, true),
          executiveBots_1.executiveBots.cfo,
          true,
        ),
        executiveBots_1.executiveBots.coo,
        true,
      ),
      executiveBots_1.executiveBots.strategy,
      true,
    );
    // Ensure we always include the strategy's executive if available
    var debateExecs = [];
    if (
      (strategy === null || strategy === void 0
        ? void 0
        : strategy.executiveBot) &&
      allExecutives.includes(strategy.executiveBot)
    ) {
      debateExecs.push(strategy.executiveBot);
    }
    // Add other random executives
    while (debateExecs.length < 3) {
      var randomIndex = Math.floor(Math.random() * allExecutives.length);
      var exec = allExecutives[randomIndex];
      if (!debateExecs.includes(exec)) {
        debateExecs.push(exec);
      }
    }
    return debateExecs;
  };
  // Get executive role
  var getExecutiveRole = function (name) {
    if (executiveBots_1.executiveBots.ceo.includes(name)) return "CEO";
    if (executiveBots_1.executiveBots.cfo.includes(name)) return "CFO";
    if (executiveBots_1.executiveBots.coo.includes(name)) return "COO";
    if (executiveBots_1.executiveBots.strategy.includes(name))
      return "Chief Strategy Officer";
    return "Executive";
  };
  // Get mock consensus
  var getMockConsensus = function () {
    if (!strategy) return "";
    var risk = strategy.risk || strategy.risk_level || "Medium";
    if (risk === "High") {
      return 'After thorough debate, the executive team recommends proceeding with the "'.concat(
        strategy.title,
        '" strategy, with an emphasis on carefully monitored phases and clear success metrics. The potential rewards justify the risk level, but regular reassessment will be critical.',
      );
    } else if (risk === "Medium") {
      return 'The executive team has reached consensus on implementing the "'.concat(
        strategy.title,
        '" strategy. We recommend a balanced approach with equal focus on execution quality and measuring outcomes. This strategy offers a solid risk-to-reward ratio.',
      );
    } else {
      return 'Our executive team agrees that the "'.concat(
        strategy.title,
        '" strategy presents a conservative approach that aligns well with our current market position. We recommend full implementation with quarterly reviews to evaluate effectiveness and potential for expanding scope.',
      );
    }
  };
  var handleExportPDF = function () {
    toast({
      title: "Preparing PDF",
      description:
        "Your executive debate summary is being prepared for download.",
    });
    setTimeout(function () {
      toast({
        title: "PDF Ready",
        description: "Your executive debate summary has been downloaded.",
      });
    }, 2000);
  };
  var handleFeedback = function (isPositive) {
    toast({
      title: isPositive ? "Feedback Recorded" : "Feedback Noted",
      description: isPositive
        ? "Thanks for the positive feedback! We'll incorporate these insights into future debates."
        : "We appreciate your feedback. We'll improve our executive debate simulations.",
    });
  };
  // Use mock data if no real debate available
  var debateMessages =
    (debate === null || debate === void 0 ? void 0 : debate.messages) ||
    getMockDebate();
  var consensusRecommendation =
    (debate === null || debate === void 0 ? void 0 : debate.consensus) ||
    getMockConsensus();
  if (!strategy) return null;
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className:
        "sm:max-w-[700px] max-h-[90vh] bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogTitle, {
              className: "flex items-center gap-2 text-xl",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircle, {
                  className: "h-5 w-5 text-primary",
                }),
                "Executive Team Debate",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(dialog_1.DialogDescription, {
              children: [
                'Watch your AI executive team discuss "',
                strategy.title,
                '"',
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          value: activeTab,
          onValueChange: setActiveTab,
          className: "flex-1 flex flex-col overflow-hidden",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "mb-2",
              children: [
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "debate",
                  children: "Debate",
                }),
                (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                  value: "consensus",
                  children: "Consensus",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "debate",
              className: "flex-1 overflow-hidden flex flex-col",
              children: isLoading
                ? (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "flex flex-col items-center justify-center py-10",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                        className: "h-10 w-10 text-primary animate-spin mb-4",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-lg font-medium",
                        children: "Gathering your executive team...",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className:
                          "text-sm text-muted-foreground text-center mt-2",
                        children:
                          "Our AI is simulating a debate among top executives about your strategy.",
                      }),
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-6 overflow-y-auto py-4 pr-2 flex-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "space-y-6",
                        children: debateMessages.map(function (message, index) {
                          var isEven = index % 2 === 0;
                          return (0, jsx_runtime_1.jsx)(
                            "div",
                            {
                              className: "flex ".concat(
                                isEven ? "justify-start" : "justify-end",
                              ),
                              children: (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex ".concat(
                                  isEven ? "flex-row" : "flex-row-reverse",
                                  " gap-3 max-w-[80%]",
                                ),
                                children: [
                                  (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                                    className:
                                      "h-10 w-10 border-2 border-primary/30",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarImage,
                                        {
                                          src: message.executive.avatar,
                                          alt: message.sender,
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarFallback,
                                        { children: message.sender[0] },
                                      ),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    children: [
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className:
                                          "rounded-lg p-4 mb-1 \n                                ".concat(
                                            isEven
                                              ? "bg-primary/10 border border-primary/20 rounded-tl-none"
                                              : "bg-secondary/10 border border-secondary/20 rounded-tr-none",
                                          ),
                                        children: (0, jsx_runtime_1.jsx)("p", {
                                          className: "text-sm",
                                          children: message.content,
                                        }),
                                      }),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        className:
                                          "flex items-center text-xs text-muted-foreground gap-2\n                                ".concat(
                                            isEven
                                              ? "justify-start"
                                              : "justify-end",
                                          ),
                                        children: [
                                          (0, jsx_runtime_1.jsx)("span", {
                                            className: "font-medium",
                                            children: message.sender,
                                          }),
                                          (0, jsx_runtime_1.jsxs)("span", {
                                            className: "opacity-70",
                                            children: [
                                              "(",
                                              message.executive.role ||
                                                getExecutiveRole(
                                                  message.sender,
                                                ),
                                              ")",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            },
                            message.id,
                          );
                        }),
                      }),
                      (0, jsx_runtime_1.jsx)("div", { ref: messagesEndRef }),
                    ],
                  }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "consensus",
              className: "flex-1 overflow-auto",
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "space-y-6 py-4 pr-2",
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "mt-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("h4", {
                      className:
                        "text-lg font-semibold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent",
                      children: "Consensus Recommendation",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-lg p-4",
                      children: (0, jsx_runtime_1.jsx)("p", {
                        className: "text-sm",
                        children: consensusRecommendation,
                      }),
                    }),
                  ],
                }),
              }),
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogFooter, {
          className:
            "flex flex-col sm:flex-row gap-2 border-t border-white/10 pt-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2 sm:mr-auto",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "ghost",
                  size: "sm",
                  className: "h-8 px-2",
                  onClick: function () {
                    return handleFeedback(true);
                  },
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                    className: "h-4 w-4 text-green-400",
                  }),
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "ghost",
                  size: "sm",
                  className: "h-8 px-2",
                  onClick: function () {
                    return handleFeedback(false);
                  },
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsDown, {
                    className: "h-4 w-4 text-red-400",
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              className: "bg-black/50 border-white/10",
              onClick: handleExportPDF,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.FileDown, {
                  className: "mr-2 h-4 w-4",
                }),
                "Export Summary",
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
