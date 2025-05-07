var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Helper to add occasional emojis
const addRandomEmoji = (responseType) => {
    const emojis = {
        greeting: ["👋", "😊", "👍", "✨"],
        thanks: ["🙏", "😊", "👍", "✨"],
        question: ["🤔", "💭", "❓", "📝"],
        confirmation: ["👌", "✅", "👍", "💯"],
    };
    // 70% chance to add emoji
    if (Math.random() > 0.3) {
        const emojiSet = emojis[responseType];
        return ` ${emojiSet[Math.floor(Math.random() * emojiSet.length)]}`;
    }
    return "";
};
// Generate personalized greetings
const generateGreeting = (name) => {
    const timeOfDay = new Date().getHours();
    let greeting = "";
    if (timeOfDay < 12)
        greeting = "Good morning";
    else if (timeOfDay < 17)
        greeting = "Good afternoon";
    else
        greeting = "Good evening";
    if (name) {
        return `${greeting}, ${name}${addRandomEmoji("greeting")}! `;
    }
    else {
        const alternatives = [
            `${greeting}${addRandomEmoji("greeting")}! `,
            `Hi there${addRandomEmoji("greeting")}! `,
            `Hello${addRandomEmoji("greeting")}! `,
        ];
        return alternatives[Math.floor(Math.random() * alternatives.length)];
    }
};
// Generate natural-sounding thanks
const generateThanks = (context) => {
    const options = [
        `Thanks for reaching out${addRandomEmoji("thanks")}`,
        `Thanks for your message${addRandomEmoji("thanks")}`,
        `Thank you for contacting us${addRandomEmoji("thanks")}`,
        `I appreciate your interest${addRandomEmoji("thanks")}`,
    ];
    return options[Math.floor(Math.random() * options.length)];
};
// Generate human-like followup questions
const generateFollowupQuestion = (inquiryType) => {
    const questions = {
        product: [
            `What specific features are you looking for?${addRandomEmoji("question")}`,
            `Have you used similar products before?${addRandomEmoji("question")}`,
            `What problems are you trying to solve?${addRandomEmoji("question")}`,
        ],
        pricing: [
            `What's your budget range?${addRandomEmoji("question")}`,
            `Are you looking for a specific plan?${addRandomEmoji("question")}`,
            `Would you prefer monthly or annual billing?${addRandomEmoji("question")}`,
        ],
        support: [
            `Could you tell me a bit more about the issue?${addRandomEmoji("question")}`,
            `When did you first notice this happening?${addRandomEmoji("question")}`,
            `Have you tried any solutions yet?${addRandomEmoji("question")}`,
        ],
        general: [
            `How did you hear about us?${addRandomEmoji("question")}`,
            `What made you interested in our solution?${addRandomEmoji("question")}`,
            `Would it help if I shared more details about what we offer?${addRandomEmoji("question")}`,
        ],
    };
    const typeQuestions = questions[inquiryType] || questions.general;
    return typeQuestions[Math.floor(Math.random() * typeQuestions.length)];
};
// Generate meeting proposals
const generateMeetingProposal = () => {
    const proposals = [
        `Would you like to schedule a quick call to discuss this further?${addRandomEmoji("question")}`,
        `I'd be happy to set up a quick meeting to go over these details. Does that work for you?${addRandomEmoji("question")}`,
        `We could jump on a call to discuss your specific needs. Would that be helpful?${addRandomEmoji("question")}`,
        `How about a quick 15-minute call this week to explore this more?${addRandomEmoji("question")}`,
    ];
    return proposals[Math.floor(Math.random() * proposals.length)];
};
// Get communication style based on the executive bot
const getStyleForExecutive = (executiveBot) => {
    if (!executiveBot)
        return "balanced";
    const executiveStyles = {
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
export function generateHumanResponse(message, executiveBot, options = {}) {
    // Determine communication style based on executive or specified style
    const style = options.style || getStyleForExecutive(executiveBot);
    // Determine the type of inquiry from message content
    let inquiryType = "general";
    if (message.toLowerCase().includes("price") ||
        message.toLowerCase().includes("cost") ||
        message.toLowerCase().includes("plan")) {
        inquiryType = "pricing";
    }
    else if (message.toLowerCase().includes("help") ||
        message.toLowerCase().includes("issue") ||
        message.toLowerCase().includes("problem")) {
        inquiryType = "support";
    }
    else if (message.toLowerCase().includes("product") ||
        message.toLowerCase().includes("feature") ||
        message.toLowerCase().includes("work")) {
        inquiryType = "product";
    }
    // Create parts of the response
    const greeting = options.previousInteractions && options.previousInteractions > 0
        ? ""
        : generateGreeting(options.customerName);
    const thanks = options.previousInteractions && options.previousInteractions > 0
        ? ""
        : generateThanks();
    // Generate different response based on style
    let mainResponse = "";
    switch (style) {
        case "outbound":
            // Direct and focused on next steps
            mainResponse = `I'm looking at your question about ${inquiryType === "general" ? "our solution" : inquiryType}. ${generateFollowupQuestion(inquiryType)}`;
            if (Math.random() > 0.5) {
                mainResponse += ` ${generateMeetingProposal()}`;
            }
            break;
        case "consultative":
            // Problem-solving and questioning approach
            mainResponse = `I'd like to understand your needs better. ${generateFollowupQuestion(inquiryType)}`;
            if (Math.random() > 0.7) {
                mainResponse += ` This would help me recommend the best solution for you.${addRandomEmoji("confirmation")}`;
            }
            break;
        case "relationship":
            // Warm and relationship-focused
            mainResponse = `I'm here to help with your ${inquiryType === "general" ? "questions" : inquiryType + " questions"}. ${generateFollowupQuestion(inquiryType)}`;
            if (Math.random() > 0.5) {
                mainResponse += ` I want to make sure we find exactly what works for you.`;
            }
            break;
        default:
            // Balanced approach
            mainResponse = `I'd be happy to help with your ${inquiryType === "general" ? "inquiry" : inquiryType + " inquiry"}. ${generateFollowupQuestion(inquiryType)}`;
    }
    // Combine parts with proper spacing
    let response = "";
    if (greeting)
        response += greeting;
    if (thanks) {
        if (response)
            response += thanks.toLowerCase();
        else
            response += thanks;
    }
    if (response) {
        response += " ";
    }
    response += mainResponse;
    return response;
}
// Process WhatsApp messages and generate appropriate AI responses
export function processWhatsAppMessage(incomingMessage, customerName, previousInteractions, executiveBot) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check for opt-out messages
        if (incomingMessage.trim().toLowerCase() === "stop") {
            return "I've processed your request to opt out of future messages. You won't receive any more communications from us. If you change your mind, you can text START anytime. Thank you.";
        }
        // Handle different types of inquiries
        const lowerMessage = incomingMessage.toLowerCase();
        // Generate human-like response
        return generateHumanResponse(incomingMessage, executiveBot, {
            customerName,
            previousInteractions,
            inquiryType: lowerMessage.includes("price")
                ? "pricing"
                : lowerMessage.includes("help")
                    ? "support"
                    : lowerMessage.includes("feature")
                        ? "product"
                        : "general",
        });
    });
}
