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
exports.generateHumanResponse = generateHumanResponse;
exports.processWhatsAppMessage = processWhatsAppMessage;
// Helper to add occasional emojis
var addRandomEmoji = function (responseType) {
  var emojis = {
    greeting: ["👋", "😊", "👍", "✨"],
    thanks: ["🙏", "😊", "👍", "✨"],
    question: ["🤔", "💭", "❓", "📝"],
    confirmation: ["👌", "✅", "👍", "💯"],
  };
  // 70% chance to add emoji
  if (Math.random() > 0.3) {
    var emojiSet = emojis[responseType];
    return " ".concat(emojiSet[Math.floor(Math.random() * emojiSet.length)]);
  }
  return "";
};
// Generate personalized greetings
var generateGreeting = function (name) {
  var timeOfDay = new Date().getHours();
  var greeting = "";
  if (timeOfDay < 12) greeting = "Good morning";
  else if (timeOfDay < 17) greeting = "Good afternoon";
  else greeting = "Good evening";
  if (name) {
    return ""
      .concat(greeting, ", ")
      .concat(name)
      .concat(addRandomEmoji("greeting"), "! ");
  } else {
    var alternatives = [
      "".concat(greeting).concat(addRandomEmoji("greeting"), "! "),
      "Hi there".concat(addRandomEmoji("greeting"), "! "),
      "Hello".concat(addRandomEmoji("greeting"), "! "),
    ];
    return alternatives[Math.floor(Math.random() * alternatives.length)];
  }
};
// Generate natural-sounding thanks
var generateThanks = function (context) {
  var options = [
    "Thanks for reaching out".concat(addRandomEmoji("thanks")),
    "Thanks for your message".concat(addRandomEmoji("thanks")),
    "Thank you for contacting us".concat(addRandomEmoji("thanks")),
    "I appreciate your interest".concat(addRandomEmoji("thanks")),
  ];
  return options[Math.floor(Math.random() * options.length)];
};
// Generate human-like followup questions
var generateFollowupQuestion = function (inquiryType) {
  var questions = {
    product: [
      "What specific features are you looking for?".concat(
        addRandomEmoji("question"),
      ),
      "Have you used similar products before?".concat(
        addRandomEmoji("question"),
      ),
      "What problems are you trying to solve?".concat(
        addRandomEmoji("question"),
      ),
    ],
    pricing: [
      "What's your budget range?".concat(addRandomEmoji("question")),
      "Are you looking for a specific plan?".concat(addRandomEmoji("question")),
      "Would you prefer monthly or annual billing?".concat(
        addRandomEmoji("question"),
      ),
    ],
    support: [
      "Could you tell me a bit more about the issue?".concat(
        addRandomEmoji("question"),
      ),
      "When did you first notice this happening?".concat(
        addRandomEmoji("question"),
      ),
      "Have you tried any solutions yet?".concat(addRandomEmoji("question")),
    ],
    general: [
      "How did you hear about us?".concat(addRandomEmoji("question")),
      "What made you interested in our solution?".concat(
        addRandomEmoji("question"),
      ),
      "Would it help if I shared more details about what we offer?".concat(
        addRandomEmoji("question"),
      ),
    ],
  };
  var typeQuestions = questions[inquiryType] || questions.general;
  return typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
};
// Generate meeting proposals
var generateMeetingProposal = function () {
  var proposals = [
    "Would you like to schedule a quick call to discuss this further?".concat(
      addRandomEmoji("question"),
    ),
    "I'd be happy to set up a quick meeting to go over these details. Does that work for you?".concat(
      addRandomEmoji("question"),
    ),
    "We could jump on a call to discuss your specific needs. Would that be helpful?".concat(
      addRandomEmoji("question"),
    ),
    "How about a quick 15-minute call this week to explore this more?".concat(
      addRandomEmoji("question"),
    ),
  ];
  return proposals[Math.floor(Math.random() * proposals.length)];
};
// Get communication style based on the executive bot
var getStyleForExecutive = function (executiveBot) {
  if (!executiveBot) return "balanced";
  var executiveStyles = {
    "Trish Bertuzzi": "outbound",
    "Mike Weinberg": "consultative",
    "Sheryl Sandberg": "relationship",
    "Elon Musk": "outbound",
    "Steve Jobs": "outbound",
    "Warren Buffett": "consultative",
    "Jeff Bezos": "consultative",
    "Satya Nadella": "relationship",
    // Add more executives as needed
  };
  return executiveStyles[executiveBot] || "balanced";
};
// Generate a human-like response
function generateHumanResponse(message, executiveBot, options) {
  if (options === void 0) {
    options = {};
  }
  // Determine communication style based on executive or specified style
  var style = options.style || getStyleForExecutive(executiveBot);
  // Determine the type of inquiry from message content
  var inquiryType = "general";
  if (
    message.toLowerCase().includes("price") ||
    message.toLowerCase().includes("cost") ||
    message.toLowerCase().includes("plan")
  ) {
    inquiryType = "pricing";
  } else if (
    message.toLowerCase().includes("help") ||
    message.toLowerCase().includes("issue") ||
    message.toLowerCase().includes("problem")
  ) {
    inquiryType = "support";
  } else if (
    message.toLowerCase().includes("product") ||
    message.toLowerCase().includes("feature") ||
    message.toLowerCase().includes("work")
  ) {
    inquiryType = "product";
  }
  // Create parts of the response
  var greeting =
    options.previousInteractions && options.previousInteractions > 0
      ? ""
      : generateGreeting(options.customerName);
  var thanks =
    options.previousInteractions && options.previousInteractions > 0
      ? ""
      : generateThanks();
  // Generate different response based on style
  var mainResponse = "";
  switch (style) {
    case "outbound":
      // Direct and focused on next steps
      mainResponse = "I'm looking at your question about "
        .concat(inquiryType === "general" ? "our solution" : inquiryType, ". ")
        .concat(generateFollowupQuestion(inquiryType));
      if (Math.random() > 0.5) {
        mainResponse += " ".concat(generateMeetingProposal());
      }
      break;
    case "consultative":
      // Problem-solving and questioning approach
      mainResponse = "I'd like to understand your needs better. ".concat(
        generateFollowupQuestion(inquiryType),
      );
      if (Math.random() > 0.7) {
        mainResponse +=
          " This would help me recommend the best solution for you.".concat(
            addRandomEmoji("confirmation"),
          );
      }
      break;
    case "relationship":
      // Warm and relationship-focused
      mainResponse = "I'm here to help with your "
        .concat(
          inquiryType === "general" ? "questions" : inquiryType + " questions",
          ". ",
        )
        .concat(generateFollowupQuestion(inquiryType));
      if (Math.random() > 0.5) {
        mainResponse +=
          " I want to make sure we find exactly what works for you.";
      }
      break;
    default:
      // Balanced approach
      mainResponse = "I'd be happy to help with your "
        .concat(
          inquiryType === "general" ? "inquiry" : inquiryType + " inquiry",
          ". ",
        )
        .concat(generateFollowupQuestion(inquiryType));
  }
  // Combine parts with proper spacing
  var response = "";
  if (greeting) response += greeting;
  if (thanks) {
    if (response) response += thanks.toLowerCase();
    else response += thanks;
  }
  if (response) {
    response += " ";
  }
  response += mainResponse;
  return response;
}
// Process WhatsApp messages and generate appropriate AI responses
function processWhatsAppMessage(
  incomingMessage,
  customerName,
  previousInteractions,
  executiveBot,
) {
  return __awaiter(this, void 0, void 0, function () {
    var lowerMessage;
    return __generator(this, function (_a) {
      // Check for opt-out messages
      if (incomingMessage.trim().toLowerCase() === "stop") {
        return [
          2 /*return*/,
          "I've processed your request to opt out of future messages. You won't receive any more communications from us. If you change your mind, you can text START anytime. Thank you.",
        ];
      }
      lowerMessage = incomingMessage.toLowerCase();
      // Generate human-like response
      return [
        2 /*return*/,
        generateHumanResponse(incomingMessage, executiveBot, {
          customerName: customerName,
          previousInteractions: previousInteractions,
          inquiryType: lowerMessage.includes("price")
            ? "pricing"
            : lowerMessage.includes("help")
              ? "support"
              : lowerMessage.includes("feature")
                ? "product"
                : "general",
        }),
      ];
    });
  });
}
