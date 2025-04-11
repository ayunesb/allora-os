
import { CallScript } from "./types";

/**
 * Generate content for a call script based on provided parameters
 */
export const generateScriptContent = (title: string, botName: string, botRole?: string, companyName?: string) => {
  return `# ${title}

## Introduction
- "Hello, my name is [Your Name] calling on behalf of ${companyName || 'our company'}."
- "I'm following up on some recommendations from our ${botRole || 'executive'} team member, ${botName}."
- "Do you have a few minutes to discuss how we could potentially help your business grow?"

## Value Proposition
- Our AI-powered business strategy platform has identified specific opportunities for companies in your industry
- ${botName} has analyzed market trends and created a customized approach for businesses like yours
- We've helped similar companies achieve an average of 27% growth within 6 months

## Questions to Ask
- "What are your biggest strategic challenges right now?"
- "How are you currently approaching business strategy development?"
- "What kind of growth targets are you aiming for this year?"

## Addressing Objections
- Price: "We offer different tiers based on company size and needs. The ROI typically exceeds the investment within the first quarter."
- Timing: "Our onboarding process takes less than a week, and you'll start receiving strategic insights immediately."
- Need to consult team: "That makes sense. I'd be happy to schedule a demo with your entire leadership team."

## Call to Action
- "I'd like to set up a short demo to show you exactly how ${botName}'s recommendations would work for your specific situation."
- "Would you be available this week for a 30-minute call?"

## Closing
- "Thank you for your time today."
- "I'll send over some additional information about the specific strategies ${botName} has developed."
- "Please feel free to reach out if you have any questions before our meeting."`;
};

/**
 * Generate content for a message template based on provided parameters
 */
export const generateMessageContent = (scriptTitle: string, target: string, industry: string) => {
  return `# Follow-up Message for: ${scriptTitle}

Hi [Name],

I hope this message finds you well. I recently tried to connect with you regarding some AI-generated strategic recommendations that could benefit your ${industry} business.

## Key Points
- Our AI advisory team has developed a targeted approach specifically for companies in the ${industry} sector
- The strategy addresses common challenges like [industry-specific challenge]
- Companies implementing these recommendations have seen an average of 25% improvement in their key metrics

## What's Next?
I'd like to schedule a brief call to walk you through these recommendations and discuss how they might apply to your specific situation.

## Options
- 30-minute video call to review the strategy
- Quick 15-minute phone call to discuss your current priorities
- I can send over a summary document first if you'd prefer to review it on your own time

Let me know what works best for you, or if you have any questions!

Best regards,
[Your Name]
[Your Contact Information]`;
};

/**
 * Generate WhatsApp template based on executive expertise
 */
export const generateWhatsAppTemplate = (executiveName: string, executiveRole: string, industry: string, companyName?: string) => {
  const templates = {
    sales: `Hi [Name], ${executiveName} here (${executiveRole}). I've analyzed ${companyName || 'your company'}'s ${industry} position and found 3 critical growth opportunities. Quick 5-min call this week? The 3rd opportunity alone could boost revenue by 22-31%.`,
    marketing: `Hi [Name], ${executiveName} (${executiveRole}) from Allora AI. Just finished reviewing ${companyName || 'your'} ${industry} marketing strategy. Identified 3 conversion gaps your competitors aren't seeing. Free to chat Wed/Thu? I'll share the full competitive analysis.`,
    strategy: `[Name], ${executiveName} here (${executiveRole} specialist). Our AI executive team just completed a deep dive on the ${industry} market. We've identified a unique position for ${companyName || 'your company'} with 40% less competition. When works to discuss the strategy blueprint?`,
    finance: `Hi [Name], ${executiveName} (${executiveRole}) with Allora AI. Just completed financial modeling for ${companyName || 'your company'}'s growth in the ${industry} space. Projecting 3-year path to 2.7x current valuation. Can I walk you through the model this week?`
  };

  const template = templates[executiveRole.toLowerCase().includes('sales') ? 'sales' : 
                    executiveRole.toLowerCase().includes('market') ? 'marketing' :
                    executiveRole.toLowerCase().includes('finance') || executiveRole.toLowerCase().includes('cfo') ? 'finance' : 
                    'strategy'];
  
  return `# WhatsApp Template from ${executiveName} (${executiveRole})

${template}

## Follow-up (if no response after 2 days)
Just following up on my message about the growth opportunities for ${companyName || 'your company'} in the ${industry} space. The analysis is ready whenever you have 5 minutes to discuss.

## Personalization Tips
- Reference a recent company announcement or news if available
- Mention a specific challenge common in their industry segment
- Adapt tone based on company size (more formal for enterprise, more direct for startups)`;
};

/**
 * Generate cold call script based on executive expertise
 */
export const generateColdCallScript = (executiveName: string, executiveRole: string, industry: string, companyName?: string) => {
  let scriptStyle = "";
  let technique = "";
  
  if (executiveRole.toLowerCase().includes('sales')) {
    scriptStyle = "Trish Bertuzzi";
    technique = "targeted value proposition";
  } else if (executiveRole.toLowerCase().includes('market')) {
    scriptStyle = "Gary Vaynerchuk";
    technique = "pattern interruption";
  } else if (executiveRole.toLowerCase().includes('growth')) {
    scriptStyle = "Grant Cardone";
    technique = "10X mindset framework";
  } else {
    scriptStyle = "Mike Weinberg";
    technique = "curiosity-based questioning";
  }
  
  return `# Cold Call Script in the style of ${scriptStyle}

## Introduction (10 seconds)
"Hi [Name], this is [Your Name] calling based on ${executiveName}'s recommendation. [Small pause] Our AI executive team just completed an analysis of the ${industry} space and identified some significant opportunities for ${companyName || 'companies like yours'}. Do you have 2 minutes?"

## Value Statement (20 seconds)
"Great. ${executiveName}, our ${executiveRole}, used our AI platform to analyze growth patterns in the ${industry} sector. [pause] We've found that companies implementing our strategic recommendations are seeing a 27% average increase in qualified leads within 90 days. I wanted to share the 3 key findings specific to your situation."

## Qualifying Questions (using ${scriptStyle}'s ${technique})
- "What's your biggest challenge right now in acquiring new customers?"
- "On a scale of 1-10, how satisfied are you with your current growth rate?"
- "What would reaching [2X current revenue] in the next 18 months mean for your business?"

## Addressing Common Objections
- "We already have consultants": "I understand. What makes our approach different is that we combine AI-powered analysis with expertise from executives like ${executiveName} who have specific experience in ${industry}. This gives you both data-driven insights and battle-tested strategies."
  
- "Not interested right now": "I appreciate that. Just to clarify, is it the timing that's not right, or are you not interested in accelerating growth in [specific area]?"

- "Send me some information": "I'd be happy to. What specifically would be most valuable for you to see? Case studies, industry analysis, or the specific recommendations ${executiveName} has for your company?"

## Call to Action
"Based on our conversation, I'd like to set up a brief strategy session where we can walk through ${executiveName}'s specific recommendations for ${companyName || 'your company'}. We could do this Thursday at 2pm or Friday at 10am - which works better for you?"

## Approved by ${executiveName} (${executiveRole})
This script was developed using ${scriptStyle}'s ${technique} methodology, chosen specifically for its effectiveness in the ${industry} industry.`;
};

/**
 * Generate default call scripts with sample content
 */
export const getDefaultScripts = (): CallScript[] => {
  return [
    {
      id: "script-1",
      title: "B2B SaaS Introduction",
      target: "Tech Startups",
      duration: "2-3 min",
      status: "Ready",
      type: 'call',
      content: `# B2B SaaS Introduction

## Introduction
- "Hi [name], this is [your name] from [company]. How are you today?"
- "I'm reaching out to tech startups like yours because we've helped similar companies increase their efficiency by 30%."

## Value Proposition
- Our platform automates your [specific pain point], saving your team an average of 15 hours per week
- We integrate seamlessly with your existing tech stack
- 95% of our customers see ROI within the first 3 months

## Questions to Ask
- "What tools are you currently using to manage [specific process]?"
- "What's your biggest challenge with [specific pain point]?"
- "How much time does your team currently spend on [manual process]?"

## Addressing Objections
- Price: "We offer flexible pricing tiers that grow with your business. Most customers see cost savings that exceed our subscription within weeks."
- Timing: "The onboarding process takes less than a week, and we handle the heavy lifting. The opportunity cost of waiting is approximately [value] per month."
- Need to consult others: "I understand. Would it be helpful if I joined a call with your team to answer their questions directly?"

## Call to Action
- "I'd love to show you a quick 15-minute demo of how this would work specifically for your use case."
- "Can we schedule that for later this week?"

## Closing
- "Thank you for your time today."
- "I'll send a calendar invite and a brief overview of what we discussed."
- "Feel free to reach out if you have any questions before our meeting."`
    },
    {
      id: "script-2",
      title: "Follow-up Script",
      target: "Previous Contacts",
      duration: "1-2 min",
      status: "Ready",
      type: 'message',
      content: `# Follow-up Message Template

Hi [Name],

I hope this message finds you well. I'm following up on our previous conversation about [topic discussed].

## Key Points to Address
- Reference our last interaction: "As we discussed on [date]..."
- Provide any new information or updates: "Since we last spoke, we've..."
- Remind them of the value proposition: "I wanted to remind you that our solution could help you [specific benefit]."

## Call to Action
I'd love to continue our conversation and discuss how we can [specific value]. Would you be available for a quick call this week?

## Alternative Options
- If you'd prefer to see a demo first, I can send you a brief video walkthrough.
- If now isn't the right time, please let me know when would be better to reconnect.

Looking forward to your response!

Best regards,
[Your Name]
[Your Contact Information]`
    },
    {
      id: "exec-whatsapp-1",
      title: "Executive WhatsApp Template",
      target: "Fortune 1000 Leaders",
      duration: "1 min",
      status: "Ready",
      type: 'message',
      content: generateWhatsAppTemplate("Trish Bertuzzi", "Sales Development Expert", "Technology", "Acme Inc")
    },
    {
      id: "exec-call-1",
      title: "Executive Cold Call Script",
      target: "C-Suite Decision Makers",
      duration: "3-4 min", 
      status: "Ready",
      type: 'call',
      content: generateColdCallScript("Mike Weinberg", "Sales Strategy Consultant", "SaaS", "Acme Inc")
    }
  ];
};

/**
 * Get executive-generated scripts for a specific role
 */
export const getExecutiveScripts = (executiveRole: string, industry: string, companyName?: string): CallScript[] => {
  // Map of executives by role category
  const executiveMap = {
    sales: ["Grant Cardone", "Brian Tracy", "Zig Ziglar", "Jill Konrath", "Trish Bertuzzi", "Mike Weinberg"],
    marketing: ["Seth Godin", "Gary Vaynerchuk", "Rand Fishkin", "Neil Patel", "Ann Handley"],
    strategy: ["Clayton Christensen", "Brian Chesky", "Reed Hastings", "Marissa Mayer", "Jim Collins"],
    finance: ["Warren Buffett", "Ruth Porat", "David Wehner", "Kelly R. Bennett", "Michael S. Dell"],
    ceo: ["Elon Musk", "Jeff Bezos", "Satya Nadella", "Tim Cook", "Sheryl Sandberg", "Gwynne Shotwell"]
  };
  
  // Determine which category the executive role falls into
  let category = 'strategy';
  for (const [cat, _] of Object.entries(executiveMap)) {
    if (executiveRole.toLowerCase().includes(cat)) {
      category = cat;
      break;
    }
  }
  
  // Select two random executives from the appropriate category
  const executives = executiveMap[category];
  const selectedExecs = [
    executives[Math.floor(Math.random() * executives.length)],
    executives[Math.floor(Math.random() * executives.length)]
  ];
  
  // Create one WhatsApp template and one cold call script for each selected executive
  return [
    {
      id: `whatsapp-${category}-${Date.now()}`,
      title: `${selectedExecs[0]}'s ${category.charAt(0).toUpperCase() + category.slice(1)} WhatsApp Template`,
      target: `${industry} Decision Makers`,
      duration: "1 min",
      status: "Ready",
      type: 'message',
      content: generateWhatsAppTemplate(selectedExecs[0], executiveRole, industry, companyName),
      aiGenerated: true,
      primaryBot: { name: selectedExecs[0], role: executiveRole }
    },
    {
      id: `call-${category}-${Date.now()}`,
      title: `${selectedExecs[1]}'s ${category.charAt(0).toUpperCase() + category.slice(1)} Cold Call Script`,
      target: `${industry} C-Suite`,
      duration: "3-4 min",
      status: "Ready",
      type: 'call',
      content: generateColdCallScript(selectedExecs[1], executiveRole, industry, companyName),
      aiGenerated: true,
      primaryBot: { name: selectedExecs[1], role: executiveRole }
    }
  ];
};
