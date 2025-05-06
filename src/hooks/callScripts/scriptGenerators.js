"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultScripts = getDefaultScripts;
/**
 * Provides default call scripts that are always available
 */
function getDefaultScripts() {
  return [
    {
      id: "default-cold-call-1",
      title: "Cold Call - First Contact",
      content:
        '# Cold Call Script - First Contact\n\n## Introduction\n- Greet the prospect warmly and introduce yourself and your company\n- Explain the purpose of your call briefly\n\n## Value Proposition\n- Present your main value proposition tailored to businesses in their industry\n- Highlight 2-3 key benefits of your solution\n\n## Qualification Questions\n- What challenges are they currently facing?\n- How are they currently addressing these challenges?\n- What would an ideal solution look like for them?\n\n## Objection Handling\n- "No budget": Focus on ROI and long-term value\n- "Not interested": Ask about their current strategy and challenges\n- "Bad timing": Offer to schedule a follow-up at a better time\n\n## Call to Action\n- Schedule a demo/follow-up meeting\n- Send additional information\n- Confirm next steps\n\n## Closing\n- Thank them for their time\n- Restate any commitments made\n- Provide your contact information',
      target: "New Prospects",
      duration: "5-7 minutes",
      status: "Ready",
      type: "call",
      aiGenerated: false,
    },
    {
      id: "default-follow-up-1",
      title: "Follow-Up After Initial Contact",
      content:
        "# Follow-Up Call Script\n\n## Introduction\n- Greet the prospect by name\n- Remind them of your previous conversation\n- Thank them for their time\n\n## Recapitulation\n- Briefly summarize key points from the previous call\n- Mention any specific pain points they shared\n\n## Additional Value\n- Provide any new information relevant to their needs\n- Share a relevant case study or success story\n\n## Overcoming Objections\n- Address any concerns raised in the previous call\n- Provide clear, concise answers to outstanding questions\n\n## Next Steps\n- Propose a concrete next step (demo, proposal, meeting with decision-makers)\n- Suggest specific dates and times\n- Confirm their interest\n\n## Closing\n- Thank them for their continued interest\n- Confirm the next steps\n- Provide your contact information again",
      target: "Warm Prospects",
      duration: "7-10 minutes",
      status: "Ready",
      type: "call",
      aiGenerated: false,
    },
    {
      id: "default-message-1",
      title: "Email Follow-Up Template",
      content:
        "Subject: Following Up on Our Conversation About [Solution]\n\nHi [Name],\n\nI hope this message finds you well. I wanted to follow up on our recent conversation about how [Your Company] can help [Their Company] with [specific challenge discussed].\n\nBased on what you shared about [reference specific point from your conversation], I thought you might be interested in seeing how we helped a similar company in your industry achieve [specific result]. You can find the case study here: [link].\n\nWould you be available for a brief follow-up call this week to discuss next steps? I'm available on [provide 2-3 specific times].\n\nBest regards,\n[Your Name]\n[Your Title]\n[Your Contact Information]",
      target: "Recent Contacts",
      duration: "N/A",
      status: "Ready",
      type: "message",
      aiGenerated: false,
    },
  ];
}
