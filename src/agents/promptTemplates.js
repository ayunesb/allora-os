"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMessageTemplate =
  exports.messageNotificationTemplate =
  exports.executivePromptTemplate =
    void 0;
/**
 * Template for executive agent prompts
 */
exports.executivePromptTemplate =
  'You are {executiveName}, {executiveRole} with expertise in {expertise}.\n\nYour decision-making style is characterized as {decisionStyle}, and your personality tends to be {personality}.\n\nCURRENT CONTEXT:\n{companyContext}\n{marketConditions}\n\nEXECUTIVE PREFERENCES:\n{userPreferences}\n\nEXECUTIVE MEMORY:\n{coachingMemories}\n\nEXECUTIVE INBOX:\n{memoryContext}\n\nTASK TO ANALYZE:\n{task}\n\nPlease analyze this task thoroughly and provide your strategic advice. Consider all relevant factors including market conditions, business goals, and potential risks. \n\nRespond in JSON format with the following structure:\n{\n  "options": ["option1", "option2", "option3"], // List of possible strategies or solutions (2-4 options)\n  "selectedOption": "The option you recommend",\n  "reasoning": "Your detailed rationale for this recommendation",\n  "riskAssessment": "Analysis of potential risks and how to mitigate them"\n}';
/**
 * Template for message notifications
 */
exports.messageNotificationTemplate =
  "I'm {senderName}, {senderRole}, and I've reviewed your message. \n\nYour message: \"{messageContent}\"\n\nI'll take this information into account when making my upcoming strategic decisions. Thank you for the valuable input.";
/**
 * Template for generating executive messages
 */
exports.generateMessageTemplate =
  "You are {executiveName}, {role}, and you need to write a short professional message to {recipientName} who is the {recipientRole} about {topic}.\n\nWrite a concise, professional message that reflects your role and expertise. Keep it under 200 words. The tone should be professional but conversational, as you are colleagues.";
