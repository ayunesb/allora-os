import { HelpContent } from "@/types/help";

// Helper function to get help content based on contextId
export function getHelpContent(contextId: string): HelpContent | null {
  const helpContents: Record<string, HelpContent> = {
    dashboard: {
      title: "Dashboard Overview",
      description: "The dashboard shows an overview of your business performance and AI recommendations.",
      steps: [
        { 
          title: "CEO Message", 
          description: "Read a personalized strategy overview from your AI CEO." 
        },
        { 
          title: "Strategy Display", 
          description: "See your active business strategies and their current progress." 
        },
        { 
          title: "AI Recommendations", 
          description: "Review and approve AI-generated business recommendations." 
        }
      ],
      links: [
        { title: "Video Tutorial", url: "/tutorials/dashboard" },
        { title: "FAQ", url: "/faq#dashboard" }
      ]
    },
    strategies: {
      title: "Strategies Guide",
      description: "The strategy board shows all your business strategies across different risk categories.",
      steps: [
        { 
          title: "Filter Strategies", 
          description: "Use the filters to see strategies by risk level, category, or status." 
        },
        { 
          title: "Strategy Details", 
          description: "Click on any strategy card to see full details and implementation steps." 
        },
        { 
          title: "Add Strategy", 
          description: "Create a new strategy manually or use the AI Strategy Wizard." 
        }
      ]
    },
    "ai-bots": {
      title: "AI Executive Team",
      description: "Interact with your team of AI executives for specialized business advice.",
      steps: [
        { 
          title: "Select an Executive", 
          description: "Choose the executive with expertise in your current business challenge." 
        },
        { 
          title: "Ask Questions", 
          description: "Type your business questions or select from suggested topics." 
        },
        { 
          title: "Review Insights", 
          description: "See insights from previous consultations with each executive." 
        }
      ],
      video: "https://example.com/videos/executives-tutorial"
    },
    onboarding: {
      title: "Onboarding Guide",
      description: "Welcome to Allora AI! This process will help set up your personalized business acceleration platform.",
      steps: [
        { 
          title: "Company Information", 
          description: "Provide basic information about your company so we can customize the experience." 
        },
        { 
          title: "Industry Selection", 
          description: "Select your industry for more relevant AI recommendations and strategies." 
        },
        { 
          title: "Business Goals", 
          description: "Tell us your main business goals so our AI executives can focus on what matters to you." 
        },
        { 
          title: "Risk Profile", 
          description: "Define your risk appetite so we can recommend appropriate business strategies." 
        },
        { 
          title: "Brand Identity", 
          description: "Customize the platform appearance to match your brand identity." 
        },
        { 
          title: "Executive Team", 
          description: "Meet your AI executive team that will provide strategic guidance." 
        }
      ],
      links: [
        { title: "Setup Guide", url: "/guides/setup" },
        { title: "Post-Onboarding Checklist", url: "/guides/checklist" }
      ],
      video: "https://example.com/videos/onboarding-overview"
    }
  };

  return helpContents[contextId] || null;
}
