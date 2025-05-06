export interface PricingTierData {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
  popular: boolean;
  emoji: string;
  priceId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeatureComparisonItem {
  category: string;
  features: {
    name: string;
    description?: string;
    starter: boolean | string;
    growth: boolean | string;
    enterprise: boolean | string;
  }[];
}

export const pricingTiers: PricingTierData[] = [
  {
    title: "Starter",
    price: "$199",
    description: "Ideal for solopreneurs and small teams",
    features: [
      "Basic AI Strategy",
      "Campaign Proposals",
      "500 leads/month",
      "WhatsApp Notifications",
      "Email support",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
    emoji: "✨",
    priceId: "price_starter", // Replace with actual Stripe price ID
  },
  {
    title: "Growth",
    price: "$499",
    description: "Perfect for scaling startups and agencies",
    features: [
      "Full AI Executive Board",
      "Unlimited Strategies",
      "2,000 leads/month",
      "AI Bot Debates",
      "WhatsApp + Email Campaigns",
      "Priority support",
    ],
    buttonText: "Join Growth Plan",
    buttonVariant: "default",
    popular: true,
    emoji: "🚀",
    priceId: "price_growth", // Replace with actual Stripe price ID
  },
  {
    title: "Enterprise",
    price: "$999",
    description: "For large teams and established companies",
    features: [
      "Everything from Growth plan",
      "Shopify AI Integrations",
      "Custom Zapier Automations",
      "AI Video Creation",
      "10,000 leads/month",
      "Dedicated API Access",
      "24/7 premium support",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
    popular: false,
    emoji: "🏢",
    priceId: undefined, // Enterprise typically requires contacting sales
  },
];

export const featureComparison: FeatureComparisonItem[] = [
  {
    category: "AI Executive Team",
    features: [
      {
        name: "AI CEO Advisor",
        description: "Get strategic advice from an AI modeled on top CEOs",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        name: "AI Executive Board",
        description:
          "Access to full team of AI executives with specialized expertise",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "Executive Debates",
        description:
          "Watch AI executives debate the best strategy for your business",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "Custom AI Executives",
        description:
          "Create executives modeled on your specific business needs",
        starter: false,
        growth: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Strategy Management",
    features: [
      {
        name: "Strategy Generation",
        description: "AI-powered business strategy creation",
        starter: "Basic",
        growth: "Advanced",
        enterprise: "Enterprise-grade",
      },
      {
        name: "Strategy Board",
        description: "Visual board to manage and track strategies",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        name: "Implementation Tools",
        description: "Tools to help implement strategies effectively",
        starter: "Limited",
        growth: "Full access",
        enterprise: "Custom tools",
      },
      {
        name: "Risk-Based Strategies",
        description: "Strategies tailored to different risk appetites",
        starter: false,
        growth: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Lead Management",
    features: [
      {
        name: "Lead Tracking",
        description: "Store and organize potential customer information",
        starter: "500 leads/month",
        growth: "2,000 leads/month",
        enterprise: "10,000 leads/month",
      },
      {
        name: "Lead Scoring",
        description: "Prioritize leads based on potential value",
        starter: "Basic",
        growth: "Advanced",
        enterprise: "AI-powered",
      },
      {
        name: "Communication Tools",
        description: "Tools for contacting and following up with leads",
        starter: "Email only",
        growth: "Email + WhatsApp",
        enterprise: "All channels",
      },
      {
        name: "Communication Timeline",
        description: "Track all interactions with leads and clients",
        starter: true,
        growth: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Integrations & API",
    features: [
      {
        name: "Zoom Integration",
        description: "Schedule and manage virtual meetings",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        name: "Zapier Integration",
        description: "Connect with thousands of apps via Zapier",
        starter: false,
        growth: "Basic",
        enterprise: "Advanced",
      },
      {
        name: "Shopify Integration",
        description: "Connect with Shopify for e-commerce strategies",
        starter: false,
        growth: false,
        enterprise: true,
      },
      {
        name: "API Access",
        description: "Access to our API for custom integrations",
        starter: false,
        growth: "Limited",
        enterprise: "Full access",
      },
    ],
  },
  {
    category: "Support & Training",
    features: [
      {
        name: "Customer Support",
        description: "Access to customer support team",
        starter: "Email",
        growth: "Priority email & chat",
        enterprise: "24/7 dedicated support",
      },
      {
        name: "Onboarding",
        description: "Assistance with setting up your account",
        starter: "Self-service",
        growth: "Guided setup",
        enterprise: "White-glove setup",
      },
      {
        name: "Training Resources",
        description: "Resources to help you use the platform",
        starter: "Basic docs",
        growth: "Webinars & guides",
        enterprise: "Custom training",
      },
      {
        name: "Strategy Consultations",
        description: "1-on-1 consultations with strategy experts",
        starter: false,
        growth: "Monthly",
        enterprise: "Weekly",
      },
    ],
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "Can I change plans later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and for Enterprise plans, we can also arrange invoicing.",
  },
  {
    question: "Is there a limit on API usage?",
    answer:
      "Each plan includes specified limits for leads, messages, and other resources. If you need more, you can upgrade to a higher plan or contact us for custom pricing.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes, we offer annual billing with a 15% discount compared to monthly billing. You can select your preferred billing cycle during checkout.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We offer a 14-day money-back guarantee on all plans. If you're not satisfied with the service, you can request a full refund within the first 14 days.",
  },
];
