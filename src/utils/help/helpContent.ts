
/**
 * Help content utility for displaying context-sensitive help throughout the application
 */

export type HelpContent = {
  title: string;
  description: string;
  steps?: { title: string; description: string }[];
  links?: { title: string; url: string }[];
  video?: string;
};

// Map of context IDs to help content
const helpContentMap: Record<string, HelpContent> = {
  // Dashboard help
  "dashboard.overview": {
    title: "Dashboard Overview",
    description: "Your dashboard provides a comprehensive view of your business strategy and performance metrics.",
    steps: [
      { 
        title: "Review CEO Message", 
        description: "Check the AI-generated CEO message for strategic insights tailored to your business." 
      },
      { 
        title: "Monitor Key Metrics", 
        description: "Track your business performance through the analytics cards and charts." 
      },
      { 
        title: "Access Quick Tools", 
        description: "Use the quick access tools to navigate to frequently used features." 
      }
    ],
    links: [
      { title: "Analytics Guide", url: "/help/analytics" },
      { title: "Setting Up Your Dashboard", url: "/help/dashboard-setup" }
    ]
  },
  
  // Strategy board help
  "strategy.board": {
    title: "Strategy Board Guide",
    description: "The Strategy Board helps you manage and visualize your business strategies based on risk levels.",
    steps: [
      { 
        title: "Filter by Risk Level", 
        description: "Use the risk filters to view strategies by their risk category (low, medium, high)." 
      },
      { 
        title: "Create New Strategy", 
        description: "Click the 'Create Strategy' button to develop a new business strategy with AI assistance." 
      },
      { 
        title: "View Strategy Details", 
        description: "Click on any strategy card to view detailed implementation steps and metrics." 
      }
    ],
    video: "https://example.com/videos/strategy-board-tutorial"
  },
  
  // Webhook setup help
  "admin.webhooks": {
    title: "Setting Up Webhooks",
    description: "Webhooks allow external services to receive real-time updates from the Allora AI platform.",
    steps: [
      { 
        title: "Choose Webhook Type", 
        description: "Select the appropriate webhook type (Stripe, Zapier, GitHub, Slack, or Custom)." 
      },
      { 
        title: "Enter Webhook URL", 
        description: "Enter the URL provided by your external service where notifications should be sent." 
      },
      { 
        title: "Test Connection", 
        description: "Use the 'Test' button to ensure your webhook is correctly configured." 
      },
      { 
        title: "Save Configuration", 
        description: "Click 'Save' to activate your webhook configuration." 
      }
    ],
    links: [
      { title: "Zapier Integration Guide", url: "/help/zapier-integration" },
      { title: "Slack Webhook Setup", url: "/help/slack-webhooks" }
    ]
  },
  
  // Lead management help
  "admin.leads": {
    title: "Managing Leads",
    description: "Track and organize your sales leads through the Lead Management system.",
    steps: [
      { 
        title: "Add New Lead", 
        description: "Click the 'Add Lead' button to manually enter a new lead's information." 
      },
      { 
        title: "Filter and Search", 
        description: "Use the search bar and status filters to find specific leads quickly." 
      },
      { 
        title: "Track Communication", 
        description: "Log calls, emails, and other interactions with each lead to maintain a communication history." 
      }
    ]
  },
  
  // Help for AI executive debates
  "ai.debate": {
    title: "AI Executive Debates",
    description: "AI Executive Debates simulate discussions between AI executives with different perspectives on your business strategies.",
    steps: [
      { 
        title: "Select a Strategy", 
        description: "Choose a strategy you want the AI executives to debate." 
      },
      { 
        title: "Review Arguments", 
        description: "Examine the different perspectives and arguments presented by each AI executive persona." 
      },
      { 
        title: "Consider Recommendations", 
        description: "Review the final recommendations and insights generated from the debate." 
      }
    ],
    video: "https://example.com/videos/ai-debate-tutorial"
  },
  
  // Campaign management help
  "admin.campaigns": {
    title: "Campaign Management",
    description: "Create and manage marketing campaigns to promote your business and track their performance.",
    steps: [
      { 
        title: "Create Campaign", 
        description: "Click 'New Campaign' to set up a marketing campaign with targets, budget, and timeline." 
      },
      { 
        title: "Assign Leads", 
        description: "Associate relevant leads with your campaign to track conversion rates." 
      },
      { 
        title: "Monitor Performance", 
        description: "Track key metrics like engagement, conversion, and ROI for each campaign." 
      }
    ]
  }
};

/**
 * Get help content for a specific context ID
 * @param contextId The ID of the help context to retrieve
 * @returns The help content or null if not found
 */
export const getHelpContent = (contextId: string): HelpContent | null => {
  return helpContentMap[contextId] || null;
};

/**
 * Check if help content exists for a specific context
 * @param contextId The context ID to check
 * @returns Boolean indicating if help content exists
 */
export const hasHelpContent = (contextId: string): boolean => {
  return contextId in helpContentMap;
};

/**
 * Get all available help content contexts
 * @returns Array of all context IDs with available help content
 */
export const getAllHelpContexts = (): string[] => {
  return Object.keys(helpContentMap);
};
