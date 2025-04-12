
import { HelpContent } from "@/types/help";

// Map of context IDs to help content
const helpContentRegistry: Record<string, HelpContent> = {
  "dashboard": {
    title: "Dashboard Overview",
    description: "Your dashboard provides a quick overview of your business performance, AI recommendations, and quick access to key features.",
    steps: [
      {
        title: "Review CEO Message",
        description: "Get strategic guidance from your AI CEO tailored to your business context."
      },
      {
        title: "Check AI Recommendations",
        description: "Review and approve AI-generated recommendations for your business."
      },
      {
        title: "Use Quick Access Cards",
        description: "Navigate to frequently used features using the quick access cards."
      }
    ],
    links: [
      {
        title: "Dashboard Guide",
        url: "#/guides/dashboard"
      }
    ]
  },
  "ai-bots": {
    title: "AI Executive Boardroom",
    description: "Engage with your AI executive team to get strategic insights and guidance on business decisions.",
    steps: [
      {
        title: "Select an Executive",
        description: "Choose an AI executive based on your current business needs."
      },
      {
        title: "Start a Conversation",
        description: "Ask specific business questions or request strategic advice."
      },
      {
        title: "Review Debate Results",
        description: "See how different executives approach your business challenges."
      }
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual tutorial video
  },
  "strategies": {
    title: "Strategy Management",
    description: "View, manage, and implement AI-generated business strategies tailored to your risk profile.",
    steps: [
      {
        title: "Filter Strategies",
        description: "Use filters to find strategies based on risk level or search terms."
      },
      {
        title: "Review Strategy Details",
        description: "Click on a strategy card to view implementation steps and expected outcomes."
      },
      {
        title: "Create New Strategy",
        description: "Request a new AI-generated strategy for specific business goals."
      }
    ]
  },
  "leads": {
    title: "Lead Management",
    description: "Organize potential customers, track interactions, and maximize conversion opportunities.",
    steps: [
      {
        title: "Add New Leads",
        description: "Manually add leads or import them from external sources."
      },
      {
        title: "Review Lead Scores",
        description: "Prioritize outreach based on AI-generated lead scores."
      },
      {
        title: "Record Interactions",
        description: "Document calls, emails, and meetings with potential clients."
      }
    ]
  },
  "campaigns": {
    title: "Campaign Management",
    description: "Create, monitor, and optimize marketing campaigns across different channels.",
    steps: [
      {
        title: "Create New Campaign",
        description: "Set up a new marketing campaign with AI-assisted content creation."
      },
      {
        title: "Monitor Performance",
        description: "Track key metrics and ROI for active campaigns."
      },
      {
        title: "Optimize Based on AI Insights",
        description: "Apply AI recommendations to improve campaign performance."
      }
    ]
  },
  "debate": {
    title: "Executive Debate",
    description: "Witness AI executives discuss and debate the best strategies for your business challenges.",
    steps: [
      {
        title: "Select a Topic",
        description: "Choose a business question or challenge for the AI executives to discuss."
      },
      {
        title: "Select Participants",
        description: "Choose which AI executives should participate in the debate."
      },
      {
        title: "Review Insights",
        description: "Analyze the debate results and strategic recommendations."
      }
    ]
  },
  "social-media": {
    title: "Social Media Management",
    description: "Create, schedule, and monitor social media content across multiple platforms.",
    steps: [
      {
        title: "Create Content",
        description: "Use AI assistance to draft social media posts for various platforms."
      },
      {
        title: "Schedule Posts",
        description: "Set up publishing schedules for optimal engagement."
      },
      {
        title: "Track Performance",
        description: "Monitor engagement metrics and audience growth."
      }
    ]
  },
  "onboarding": {
    title: "Onboarding Process",
    description: "Complete your company profile to get personalized AI guidance and recommendations.",
    steps: [
      {
        title: "Company Information",
        description: "Enter basic information about your company and industry."
      },
      {
        title: "Business Goals",
        description: "Specify your key business objectives and challenges."
      },
      {
        title: "Risk Profile",
        description: "Select your preferred risk approach for business strategies."
      },
      {
        title: "Team Setup",
        description: "Configure your AI executive team based on your needs."
      }
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual tutorial video
  }
};

/**
 * Get help content for a specific context
 * @param contextId The identifier for the help context
 * @returns Help content object or null if not found
 */
export function getHelpContent(contextId: string): HelpContent | null {
  return helpContentRegistry[contextId] || null;
}

/**
 * Register new help content for a context
 * @param contextId The identifier for the help context
 * @param content The help content object
 */
export function registerHelpContent(contextId: string, content: HelpContent): void {
  helpContentRegistry[contextId] = content;
}
