
import { CallScript } from './types';

/**
 * Provides default call scripts that are always available
 */
export function getDefaultScripts(): CallScript[] {
  return [
    {
      id: 'default-cold-call-1',
      title: 'Cold Call - First Contact',
      content: `# Cold Call Script - First Contact

## Introduction
- Greet the prospect warmly and introduce yourself and your company
- Explain the purpose of your call briefly

## Value Proposition
- Present your main value proposition tailored to businesses in their industry
- Highlight 2-3 key benefits of your solution

## Qualification Questions
- What challenges are they currently facing?
- How are they currently addressing these challenges?
- What would an ideal solution look like for them?

## Objection Handling
- "No budget": Focus on ROI and long-term value
- "Not interested": Ask about their current strategy and challenges
- "Bad timing": Offer to schedule a follow-up at a better time

## Call to Action
- Schedule a demo/follow-up meeting
- Send additional information
- Confirm next steps

## Closing
- Thank them for their time
- Restate any commitments made
- Provide your contact information`,
      target: 'New Prospects',
      duration: '5-7 minutes',
      status: 'Ready',
      type: 'call',
      aiGenerated: false
    },
    {
      id: 'default-follow-up-1',
      title: 'Follow-Up After Initial Contact',
      content: `# Follow-Up Call Script

## Introduction
- Greet the prospect by name
- Remind them of your previous conversation
- Thank them for their time

## Recapitulation
- Briefly summarize key points from the previous call
- Mention any specific pain points they shared

## Additional Value
- Provide any new information relevant to their needs
- Share a relevant case study or success story

## Overcoming Objections
- Address any concerns raised in the previous call
- Provide clear, concise answers to outstanding questions

## Next Steps
- Propose a concrete next step (demo, proposal, meeting with decision-makers)
- Suggest specific dates and times
- Confirm their interest

## Closing
- Thank them for their continued interest
- Confirm the next steps
- Provide your contact information again`,
      target: 'Warm Prospects',
      duration: '7-10 minutes',
      status: 'Ready',
      type: 'call',
      aiGenerated: false
    },
    {
      id: 'default-message-1',
      title: 'Email Follow-Up Template',
      content: `Subject: Following Up on Our Conversation About [Solution]

Hi [Name],

I hope this message finds you well. I wanted to follow up on our recent conversation about how [Your Company] can help [Their Company] with [specific challenge discussed].

Based on what you shared about [reference specific point from your conversation], I thought you might be interested in seeing how we helped a similar company in your industry achieve [specific result]. You can find the case study here: [link].

Would you be available for a brief follow-up call this week to discuss next steps? I'm available on [provide 2-3 specific times].

Best regards,
[Your Name]
[Your Title]
[Your Contact Information]`,
      target: 'Recent Contacts',
      duration: 'N/A',
      status: 'Ready',
      type: 'message',
      aiGenerated: false
    }
  ];
}
