
import { useState, useEffect } from "react";
import { useCompanyInsights } from "./useCompanyInsights";
import { InsightType } from "@/components/bot-insights/BotInsightCard";
import { useAuth } from "@/context/AuthContext";

export interface CallScript {
  id: string;
  title: string;
  target: string;
  duration: string;
  status: "Ready" | "In Progress";
  content?: string;
  type?: 'call' | 'message';
  aiGenerated?: boolean;
  primaryBot?: any;
  collaborators?: any[];
}

export function useCallScripts() {
  const [scripts, setScripts] = useState<CallScript[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { insights, isLoading: insightsLoading } = useCompanyInsights();
  const { profile } = useAuth();

  useEffect(() => {
    const loadScripts = async () => {
      setIsLoading(true);
      
      try {
        // Start with default scripts
        const defaultScripts: CallScript[] = [
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
          }
        ];
        
        const companyName = profile?.company || "Your Company";
        const industry = profile?.industry || "Technology";
        
        // Add AI-generated scripts from insights
        const callScriptInsights = insights.filter(insight => insight.type === "call_script" as InsightType);
        
        const aiGeneratedScripts = callScriptInsights.map(insight => ({
          id: insight.id,
          title: insight.title,
          target: `${insight.primaryBot.name}'s Recommendations`,
          duration: "4-5 min",
          status: "Ready" as const,
          content: insight.description || generateScriptContent(insight.title, insight.primaryBot.name, insight.primaryBot.role),
          aiGenerated: true,
          primaryBot: insight.primaryBot,
          collaborators: insight.collaborators,
          type: 'call' as const
        }));
        
        // Generate complementary message scripts
        const messageScripts: CallScript[] = aiGeneratedScripts.map(script => ({
          id: `${script.id}-message`,
          title: `Follow-up for: ${script.title}`,
          target: script.target,
          duration: "1-2 min",
          status: "Ready",
          content: generateMessageContent(script.title, script.target, industry),
          aiGenerated: true,
          primaryBot: script.primaryBot,
          collaborators: script.collaborators,
          type: 'message' as const
        }));
        
        // Combine scripts
        setScripts([...aiGeneratedScripts, ...messageScripts, ...defaultScripts]);
      } catch (error) {
        console.error("Error loading call scripts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (!insightsLoading) {
      loadScripts();
    }
  }, [insights, insightsLoading, profile]);
  
  // Helper function to generate script content
  const generateScriptContent = (title: string, botName: string, botRole?: string) => {
    return `# ${title}

## Introduction
- "Hello, my name is [Your Name] calling on behalf of ${profile?.company || 'our company'}."
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
  
  // Helper function to generate message content
  const generateMessageContent = (scriptTitle: string, target: string, industry: string) => {
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
  
  const getCallScripts = () => {
    return scripts.filter(script => script.type === 'call');
  };
  
  const getMessageScripts = () => {
    return scripts.filter(script => script.type === 'message');
  };
  
  return { 
    scripts, 
    callScripts: getCallScripts(),
    messageScripts: getMessageScripts(),
    isLoading 
  };
}
