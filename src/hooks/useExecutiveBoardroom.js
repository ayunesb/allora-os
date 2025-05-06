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
exports.default = useExecutiveBoardroom;
var react_1 = require("react");
var sonner_1 = require("sonner");
var AuthContext_1 = require("@/context/AuthContext");
var executiveBots_1 = require("@/backend/executiveBots");
var consultation_1 = require("@/utils/consultation");
var supabase_1 = require("@/backend/supabase");
var useUserPreferences_1 = require("./useUserPreferences");
function useExecutiveBoardroom() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    participants = _a[0],
    setParticipants = _a[1];
  var _b = (0, react_1.useState)([]),
    messages = _b[0],
    setMessages = _b[1];
  var _c = (0, react_1.useState)(false),
    isDebating = _c[0],
    setIsDebating = _c[1];
  var _d = (0, react_1.useState)(""),
    debateTitle = _d[0],
    setDebateTitle = _d[1];
  var _e = (0, react_1.useState)(""),
    debateTopic = _e[0],
    setDebateTopic = _e[1];
  var _f = (0, react_1.useState)(false),
    isLoadingMessages = _f[0],
    setIsLoadingMessages = _f[1];
  var _g = (0, react_1.useState)([]),
    reactions = _g[0],
    setReactions = _g[1];
  var _h = (0, react_1.useState)([]),
    votes = _h[0],
    setVotes = _h[1];
  var _j = (0, react_1.useState)(null),
    debateSummary = _j[0],
    setDebateSummary = _j[1];
  var _k = (0, react_1.useState)(null),
    sessionId = _k[0],
    setSessionId = _k[1];
  var _l = (0, react_1.useState)(""),
    suggestedTopic = _l[0],
    setSuggestedTopic = _l[1];
  var profile = (0, AuthContext_1.useAuth)().profile;
  var preferences = (0, useUserPreferences_1.useUserPreferences)().preferences;
  (0, react_1.useEffect)(function () {
    var defaultExecutives = [
      "Elon Musk",
      "Jeff Bezos",
      "Satya Nadella",
      "Warren Buffett",
      "Sheryl Sandberg",
    ]
      .slice(0, 5)
      .map(function (name, index) {
        var _a;
        var role =
          ((_a = Object.entries(executiveBots_1.executiveBots).find(
            function (_a) {
              var _ = _a[0],
                names = _a[1];
              return names.includes(name);
            },
          )) === null || _a === void 0
            ? void 0
            : _a[0]) || "ceo";
        return {
          id: "exec-".concat(index),
          name: name,
          role: role,
          title: (0, consultation_1.formatRoleTitle)(role),
          specialty: getExecutiveSpecialty(role),
          avatar: "/avatars/".concat(
            name.toLowerCase().replace(/\s+/g, "-"),
            ".png",
          ),
        };
      });
    setParticipants(defaultExecutives);
  }, []);
  (0, react_1.useEffect)(
    function () {
      if (profile === null || profile === void 0 ? void 0 : profile.industry) {
        generateSuggestedTopic(profile.industry);
      }
    },
    [profile === null || profile === void 0 ? void 0 : profile.industry],
  );
  var getExecutiveSpecialty = function (role) {
    switch (role) {
      case "ceo":
        return "Strategic Vision, Innovation, Leadership";
      case "cfo":
        return "Financial Analysis, Risk Management, Investment Strategy";
      case "coo":
        return "Operations, Process Optimization, Execution";
      case "cmo":
        return "Marketing Strategy, Brand Development, Customer Insights";
      case "strategy":
        return "Competitive Analysis, Market Positioning, Growth Strategy";
      default:
        return "Business Strategy, Leadership, Innovation";
    }
  };
  var generateSuggestedTopic = function (industry) {
    return __awaiter(_this, void 0, void 0, function () {
      var mockTopics, topics;
      return __generator(this, function (_a) {
        try {
          mockTopics = {
            Technology: [
              "AI implementation for customer service automation",
              "Balancing innovation with cybersecurity concerns",
              "Web3 integration for traditional business models",
            ],
            Finance: [
              "Blockchain adoption in traditional banking",
              "Fintech partnerships vs in-house development",
              "Regulatory compliance while maintaining innovation",
            ],
            Healthcare: [
              "Telehealth expansion strategy",
              "AI in medical diagnostics: opportunities and risks",
              "Healthcare data monetization while ensuring privacy",
            ],
            Retail: [
              "Omnichannel integration strategy",
              "Competing with Amazon's logistics advantage",
              "Balancing brick-and-mortar with e-commerce expansion",
            ],
          };
          topics = mockTopics[industry] || mockTopics["Technology"];
          setSuggestedTopic(topics[Math.floor(Math.random() * topics.length)]);
        } catch (error) {
          console.error("Error generating suggested topic:", error);
        }
        return [2 /*return*/];
      });
    });
  };
  var startDebate = (0, react_1.useCallback)(
    function (topic) {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, data, error, initialMessage, error_1;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (!topic.trim()) {
                sonner_1.toast.error("Please provide a debate topic");
                return [2 /*return*/];
              }
              setDebateTitle("Executive Strategy Session: ".concat(topic));
              setDebateTopic(topic);
              setIsDebating(true);
              setIsLoadingMessages(true);
              setMessages([]);
              setReactions([]);
              setVotes([]);
              setDebateSummary(null);
              _b.label = 1;
            case 1:
              _b.trys.push([1, 3, , 4]);
              return [
                4 /*yield*/,
                supabase_1.supabase
                  .from("debates")
                  .insert({
                    topic: topic,
                    user_id:
                      profile === null || profile === void 0
                        ? void 0
                        : profile.id,
                    participants: participants.map(function (p) {
                      return { name: p.name, role: p.role };
                    }),
                    context: {
                      industry:
                        (profile === null || profile === void 0
                          ? void 0
                          : profile.industry) || "Technology",
                      riskAppetite:
                        (preferences === null || preferences === void 0
                          ? void 0
                          : preferences.riskAppetite) || "medium",
                    },
                  })
                  .select("id")
                  .single(),
              ];
            case 2:
              (_a = _b.sent()), (data = _a.data), (error = _a.error);
              if (error) throw error;
              setSessionId(data.id);
              initialMessage = {
                id: "msg-".concat(Date.now(), "-system"),
                sender: "System",
                senderId: "system",
                content: "Executive debate on: ".concat(
                  topic,
                  ". Each executive will provide their strategic perspective based on their expertise and background.",
                ),
                timestamp: new Date(),
                isUser: false,
                votes: 0,
                isFavorite: false,
              };
              setMessages([initialMessage]);
              setTimeout(function () {
                simulateExecutiveResponses(topic);
              }, 1500);
              return [3 /*break*/, 4];
            case 3:
              error_1 = _b.sent();
              console.error("Error starting debate:", error_1);
              sonner_1.toast.error("Failed to start debate. Please try again.");
              setIsDebating(false);
              return [3 /*break*/, 4];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    },
    [participants, profile, preferences],
  );
  var simulateExecutiveResponses = function (topic) {
    return __awaiter(_this, void 0, void 0, function () {
      var riskAppetite, responses, i, exec, response_1, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            riskAppetite =
              (preferences === null || preferences === void 0
                ? void 0
                : preferences.riskAppetite) || "medium";
            responses = [];
            _a.label = 1;
          case 1:
            _a.trys.push([1, 6, 7, 8]);
            i = 0;
            _a.label = 2;
          case 2:
            if (!(i < participants.length)) return [3 /*break*/, 5];
            exec = participants[i];
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 500 + Math.random() * 1500);
              }),
            ];
          case 3:
            _a.sent();
            response_1 = generateMockResponse(exec, topic, riskAppetite);
            responses.push({
              id: "msg-".concat(Date.now(), "-").concat(exec.id),
              sender: exec.name,
              senderId: exec.id,
              content: response_1,
              timestamp: new Date(),
              isUser: false,
              votes: 0,
              isFavorite: false,
            });
            setMessages(function (prev) {
              return __spreadArray(
                __spreadArray([], prev, true),
                [responses[responses.length - 1]],
                false,
              );
            });
            if (Math.random() > 0.5 && i > 0) {
              generateThoughtReaction(exec, participants[i - 1], topic);
            }
            _a.label = 4;
          case 4:
            i++;
            return [3 /*break*/, 2];
          case 5:
            setTimeout(function () {
              simulateDebateInteractions(topic, responses);
            }, 2000);
            return [3 /*break*/, 8];
          case 6:
            error_2 = _a.sent();
            console.error("Error simulating responses:", error_2);
            return [3 /*break*/, 8];
          case 7:
            setIsLoadingMessages(false);
            return [7 /*endfinally*/];
          case 8:
            return [2 /*return*/];
        }
      });
    });
  };
  var simulateDebateInteractions = function (topic, previousResponses) {
    return __awaiter(_this, void 0, void 0, function () {
      var _loop_1, i, error_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 5, , 6]);
            _loop_1 = function (i) {
              var challengerIndex,
                respondentIndex,
                challenger,
                respondent,
                previousMessage,
                challenge,
                challengeMessage,
                observersIndices,
                observerIndex,
                observer,
                response_2,
                responseMessage;
              return __generator(this, function (_b) {
                switch (_b.label) {
                  case 0:
                    return [
                      4 /*yield*/,
                      new Promise(function (resolve) {
                        return setTimeout(resolve, 1000 + Math.random() * 2000);
                      }),
                    ];
                  case 1:
                    _b.sent();
                    challengerIndex = Math.floor(
                      Math.random() * participants.length,
                    );
                    respondentIndex =
                      (challengerIndex +
                        1 +
                        Math.floor(Math.random() * (participants.length - 1))) %
                      participants.length;
                    challenger = participants[challengerIndex];
                    respondent = participants[respondentIndex];
                    previousMessage = previousResponses.find(function (m) {
                      return m.senderId === respondent.id;
                    });
                    if (!previousMessage) return [2 /*return*/, "continue"];
                    challenge = generateMockChallenge(
                      challenger,
                      respondent,
                      previousMessage.content,
                    );
                    challengeMessage = {
                      id: "msg-"
                        .concat(Date.now(), "-")
                        .concat(challenger.id, "-challenge"),
                      sender: challenger.name,
                      senderId: challenger.id,
                      content: challenge,
                      timestamp: new Date(),
                      isUser: false,
                      votes: 0,
                      isFavorite: false,
                    };
                    setMessages(function (prev) {
                      return __spreadArray(
                        __spreadArray([], prev, true),
                        [challengeMessage],
                        false,
                      );
                    });
                    observersIndices = Array.from(
                      Array(participants.length).keys(),
                    ).filter(function (idx) {
                      return idx !== challengerIndex && idx !== respondentIndex;
                    });
                    if (observersIndices.length > 0) {
                      observerIndex =
                        observersIndices[
                          Math.floor(Math.random() * observersIndices.length)
                        ];
                      observer = participants[observerIndex];
                      generateThoughtReaction(challenger, observer, topic);
                    }
                    return [
                      4 /*yield*/,
                      new Promise(function (resolve) {
                        return setTimeout(resolve, 1500 + Math.random() * 1500);
                      }),
                    ];
                  case 2:
                    _b.sent();
                    response_2 = generateMockResponse(
                      respondent,
                      challenge,
                      (preferences === null || preferences === void 0
                        ? void 0
                        : preferences.riskAppetite) || "medium",
                    );
                    responseMessage = {
                      id: "msg-"
                        .concat(Date.now(), "-")
                        .concat(respondent.id, "-response"),
                      sender: respondent.name,
                      senderId: respondent.id,
                      content: response_2,
                      timestamp: new Date(),
                      isUser: false,
                      votes: 0,
                      isFavorite: false,
                    };
                    setMessages(function (prev) {
                      return __spreadArray(
                        __spreadArray([], prev, true),
                        [responseMessage],
                        false,
                      );
                    });
                    return [2 /*return*/];
                }
              });
            };
            i = 0;
            _a.label = 1;
          case 1:
            if (!(i < 3)) return [3 /*break*/, 4];
            return [5 /*yield**/, _loop_1(i)];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            i++;
            return [3 /*break*/, 1];
          case 4:
            setTimeout(function () {
              generateExecutiveVotes(topic);
              generateDebateSummary(topic);
            }, 3000);
            return [3 /*break*/, 6];
          case 5:
            error_3 = _a.sent();
            console.error("Error simulating debate interactions:", error_3);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  var generateThoughtReaction = function (speaker, observer, topic) {
    var thoughts = [
      "Interesting point.",
      "Not sure I agree with that approach.",
      "This could disrupt the entire industry.",
      "Worth considering the financial implications.",
      "We should analyze the operational challenges.",
      "The market might not be ready for this.",
      "Bold strategy, but risky.",
      "This aligns with my thinking.",
      "We need more data on this.",
      "The competition is already doing this.",
    ];
    var thought = thoughts[Math.floor(Math.random() * thoughts.length)];
    var reaction = {
      executiveId: observer.id,
      executiveName: observer.name,
      thought: thought,
      timestamp: new Date(),
    };
    setReactions(function (prev) {
      return __spreadArray(__spreadArray([], prev, true), [reaction], false);
    });
    setTimeout(function () {
      setReactions(function (prev) {
        return prev.filter(function (r) {
          return r !== reaction;
        });
      });
    }, 4000);
  };
  var generateExecutiveVotes = function (topic) {
    var options = {
      option_a: "Aggressive expansion into ".concat(topic),
      option_b: "Cautious, phased approach to ".concat(topic),
    };
    var newVotes = participants.map(function (exec) {
      var isBold = ["ceo", "strategy", "cmo"].includes(exec.role);
      var isConservative = ["cfo", "chro", "coo"].includes(exec.role);
      var userRiskIsBold =
        (preferences === null || preferences === void 0
          ? void 0
          : preferences.riskAppetite) === "high";
      var userRiskIsCautious =
        (preferences === null || preferences === void 0
          ? void 0
          : preferences.riskAppetite) === "low";
      var choice;
      if (userRiskIsBold && !isConservative) {
        choice = "option_a";
      } else if (userRiskIsCautious && !isBold) {
        choice = "option_b";
      } else {
        choice =
          Math.random() < (isBold ? 0.8 : isConservative ? 0.2 : 0.5)
            ? "option_a"
            : "option_b";
      }
      return {
        executiveId: exec.id,
        executiveName: exec.name,
        choice: choice,
        confidence: Math.floor(70 + Math.random() * 30),
        rationale:
          choice === "option_a"
            ? "This aligns with our growth strategy and offers significant market advantage."
            : "This minimizes risk while allowing us to test market response.",
      };
    });
    setVotes(newVotes);
    var votesForA = newVotes.filter(function (v) {
      return v.choice === "option_a";
    }).length;
    var votesForB = newVotes.filter(function (v) {
      return v.choice === "option_b";
    }).length;
    var votingMessage = {
      id: "msg-".concat(Date.now(), "-voting"),
      sender: "System",
      senderId: "system",
      content: "Executive vote results:\n      \u2022 "
        .concat(options.option_a, ": ")
        .concat(votesForA, " votes (")
        .concat(
          Math.round((votesForA / participants.length) * 100),
          "%)\n      \u2022 ",
        )
        .concat(options.option_b, ": ")
        .concat(votesForB, " votes (")
        .concat(
          Math.round((votesForB / participants.length) * 100),
          "%)\n      \n      ",
        )
        .concat(
          votesForA > votesForB
            ? "The aggressive approach wins."
            : votesForB > votesForA
              ? "The cautious approach wins."
              : "The vote is tied - further discussion needed.",
        ),
      timestamp: new Date(),
      isUser: false,
      votes: 0,
      isFavorite: false,
    };
    setMessages(function (prev) {
      return __spreadArray(
        __spreadArray([], prev, true),
        [votingMessage],
        false,
      );
    });
  };
  var generateDebateSummary = function (topic) {
    var summary = {
      winningStrategy:
        votes.filter(function (v) {
          return v.choice === "option_a";
        }).length >
        votes.filter(function (v) {
          return v.choice === "option_b";
        }).length
          ? "Aggressive expansion into ".concat(topic)
          : "Cautious, phased approach to ".concat(topic),
      keyDisagreements: [
        "Timeline for implementation: Some executives favor immediate action while others recommend a phased approach.",
        "Resource allocation: Disagreement on how much to invest initially versus scaling based on results.",
        "Risk assessment: Different perspectives on the potential downside risks and how to mitigate them.",
      ],
      alternativeIdeas: [
        "Partnership strategy instead of direct investment",
        "Acquisition of smaller players in the space",
        "Development of a separate innovation lab to explore the opportunity",
      ],
      safeMove:
        "Conduct a detailed market analysis and run a small pilot program for 3 months before committing significant resources.",
      boldMove:
        "Immediately allocate 20% of R&D budget to this initiative and aim to be first-to-market with an aggressive 6-month timeline.",
      executivePerformance: participants.reduce(function (acc, exec) {
        acc[exec.id] = {
          boldnessScore: Math.floor(50 + Math.random() * 50),
          riskAlignment: Math.floor(70 + Math.random() * 30),
          innovationScore: Math.floor(60 + Math.random() * 40),
        };
        return acc;
      }, {}),
    };
    setDebateSummary(summary);
    var summaryMessage = {
      id: "msg-".concat(Date.now(), "-summary"),
      sender: "System",
      senderId: "system",
      content: "Debate Summary:\n      \n      Winning Strategy: "
        .concat(
          summary.winningStrategy,
          "\n      \n      Key Disagreements:\n      ",
        )
        .concat(
          summary.keyDisagreements
            .map(function (d) {
              return "\u2022 ".concat(d);
            })
            .join("\n"),
          "\n      \n      Alternative Ideas:\n      ",
        )
        .concat(
          summary.alternativeIdeas
            .map(function (d) {
              return "\u2022 ".concat(d);
            })
            .join("\n"),
          "\n      \n      Safe Move: ",
        )
        .concat(summary.safeMove, "\n      \n      Bold Move: ")
        .concat(summary.boldMove),
      timestamp: new Date(),
      isUser: false,
      votes: 0,
      isFavorite: false,
    };
    setMessages(function (prev) {
      return __spreadArray(
        __spreadArray([], prev, true),
        [summaryMessage],
        false,
      );
    });
    setTimeout(function () {
      generateNextTopicSuggestion(topic);
    }, 2000);
  };
  var generateNextTopicSuggestion = function (currentTopic) {
    var suggestions = [
      "Want to brainstorm your go-to-market strategy for this initiative?",
      "Should we discuss the operational requirements for implementing this strategy?",
      "Would you like to debate potential partnerships that could accelerate this strategy?",
      "Shall we analyze the financial projections and ROI timeline for this approach?",
      "Would you like to explore customer acquisition strategies related to this initiative?",
    ];
    var suggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    var suggestionMessage = {
      id: "msg-".concat(Date.now(), "-suggestion"),
      sender: "System",
      senderId: "system",
      content: "Next Debate Suggestion: ".concat(suggestion),
      timestamp: new Date(),
      isUser: false,
      votes: 0,
      isFavorite: false,
    };
    setMessages(function (prev) {
      return __spreadArray(
        __spreadArray([], prev, true),
        [suggestionMessage],
        false,
      );
    });
    sonner_1.toast.info("New Debate Suggestion Ready!");
  };
  var generateMockResponse = function (executive, topic, riskAppetite) {
    var responses = {
      ceo: {
        high: "From my perspective as a CEO focused on innovation, I see tremendous potential in ".concat(
          topic,
          ". We should be bold and move quickly - the market rewards first movers and those willing to disrupt. I envision allocating significant resources to this initiative and making it a central part of our growth strategy.",
        ),
        medium: "As CEO, I believe ".concat(
          topic,
          " presents a strategic opportunity that deserves focused attention. We should pursue this with a balanced approach - aggressive enough to capture market advantage while maintaining responsible risk management. I recommend a well-funded pilot program with clear success metrics.",
        ),
        low: "Looking at ".concat(
          topic,
          " from the CEO chair, I see potential value but also significant unknowns. I recommend we explore this carefully with a small, dedicated team to validate assumptions before making substantial commitments. Proper due diligence now will save resources and minimize disruption later.",
        ),
      },
      cfo: {
        high: "From a financial perspective, ".concat(
          topic,
          " could deliver exceptional ROI if we execute properly. While it requires significant upfront investment, my analysis suggests the potential returns justify the risk. I propose allocating budget in stages tied to clear performance milestones.",
        ),
        medium: "My financial analysis of ".concat(
          topic,
          " indicates moderate risk with promising ROI potential. We should allocate resources carefully, focusing on high-leverage activities first. I recommend a phased funding approach with quarterly reviews to adjust our financial commitment based on measurable outcomes.",
        ),
        low: "The numbers on ".concat(
          topic,
          " concern me. The upfront costs are substantial and the ROI timeline is longer than our usual threshold. If we proceed, I strongly advise a minimal initial investment with strict performance requirements before committing additional resources.",
        ),
      },
      coo: {
        high: "Operationally, implementing ".concat(
          topic,
          " at scale is ambitious but achievable. I propose we reorganize our resources to prioritize this initiative, potentially reassigning top talent from other projects to ensure successful execution.",
        ),
        medium: "From an operations standpoint, ".concat(
          topic,
          " will require careful integration with our existing processes. I recommend creating a dedicated implementation team that works alongside our current operations to minimize disruption while driving the initiative forward.",
        ),
        low: "The operational complexity of ".concat(
          topic,
          " shouldn't be underestimated. My recommendation is to start with a limited pilot that keeps our core operations insulated from any potential disruption. We can scale gradually as we solve implementation challenges.",
        ),
      },
      strategy: {
        high: "Strategically, ".concat(
          topic,
          " aligns perfectly with emerging market trends and positions us ahead of competitors. We should move aggressively to establish a dominant position in this space before others recognize the opportunity.",
        ),
        medium: "From a strategic perspective, ".concat(
          topic,
          " represents a significant opportunity to differentiate ourselves. We should develop a comprehensive roadmap that balances first-mover advantage with thoughtful market positioning.",
        ),
        low: "My strategic assessment of ".concat(
          topic,
          " suggests caution. While there's potential, market signals are mixed, and competitor movements don't indicate immediate urgency. I recommend a focused exploration phase to refine our understanding before committing to a full strategy.",
        ),
      },
    };
    var roleResponses = responses[executive.role] || responses.strategy;
    return roleResponses[riskAppetite] || roleResponses.medium;
  };
  var generateMockChallenge = function (
    challenger,
    respondent,
    previousStatement,
  ) {
    var challenges = [
      "I respectfully disagree with ".concat(
        respondent.name,
        "'s assessment. The approach outlined doesn't adequately address the competitive pressures we're facing. We need to be more aggressive in our positioning.",
      ),
      "While I appreciate ".concat(
        respondent.name,
        "'s perspective, I have concerns about the financial viability. Have we fully analyzed the cost implications and ROI timeline?",
      ),
      "I'd like to challenge the assumption in ".concat(
        respondent.name,
        "'s point about market readiness. Our research indicates customer expectations are evolving faster than this approach accounts for.",
      ),
      "".concat(
        respondent.name,
        " raises good points, but I'm not convinced about the execution timeline. The operational challenges are more significant than represented.",
      ),
      "Building on ".concat(
        respondent.name,
        "'s thinking, I believe we need to consider a more innovative approach. The traditional methods suggested might not deliver the differentiation we need.",
      ),
    ];
    return challenges[Math.floor(Math.random() * challenges.length)];
  };
  var saveStrategyToLibrary = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, error_4;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (
              !debateSummary ||
              !sessionId ||
              !(profile === null || profile === void 0
                ? void 0
                : profile.company_id)
            ) {
              sonner_1.toast.error("No strategy available to save");
              return [2 /*return*/];
            }
            _b.label = 1;
          case 1:
            _b.trys.push([1, 4, , 5]);
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("strategies")
                .insert({
                  title: "Strategy for ".concat(debateTopic),
                  description: debateSummary.winningStrategy,
                  company_id: profile.company_id,
                  risk_level:
                    (preferences === null || preferences === void 0
                      ? void 0
                      : preferences.riskAppetite) || "Medium",
                })
                .select("id")
                .single(),
            ];
          case 2:
            (_a = _b.sent()), (data = _a.data), (error = _a.error);
            if (error) throw error;
            return [
              4 /*yield*/,
              supabase_1.supabase
                .from("debates")
                .update({ status: "completed" })
                .eq("id", sessionId),
            ];
          case 3:
            _b.sent();
            sonner_1.toast.success("Strategy saved to your library");
            return [2 /*return*/, data.id];
          case 4:
            error_4 = _b.sent();
            console.error("Error saving strategy:", error_4);
            sonner_1.toast.error("Failed to save strategy");
            return [2 /*return*/, null];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  var resetDebate = function () {
    setDebateTopic("");
    setDebateTitle("");
    setIsDebating(false);
    setMessages([]);
    setReactions([]);
    setVotes([]);
    setDebateSummary(null);
    setSessionId(null);
    if (profile === null || profile === void 0 ? void 0 : profile.industry) {
      generateSuggestedTopic(profile.industry);
    }
  };
  return {
    participants: participants,
    setParticipants: setParticipants,
    messages: messages,
    isDebating: isDebating,
    debateTitle: debateTitle,
    debateTopic: debateTopic,
    isLoadingMessages: isLoadingMessages,
    reactions: reactions,
    votes: votes,
    debateSummary: debateSummary,
    suggestedTopic: suggestedTopic,
    startDebate: startDebate,
    saveStrategyToLibrary: saveStrategyToLibrary,
    resetDebate: resetDebate,
  };
}
