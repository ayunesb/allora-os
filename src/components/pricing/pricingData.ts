
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
      "Email support"
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
    emoji: "✨",
    priceId: "price_starter" // Replace with actual Stripe price ID
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
      "Priority support"
    ],
    buttonText: "Join Growth Plan",
    buttonVariant: "default",
    popular: true,
    emoji: "🚀",
    priceId: "price_growth" // Replace with actual Stripe price ID
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
      "24/7 premium support"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "secondary",
    popular: false,
    emoji: "🏢",
    priceId: undefined // Enterprise typically requires contacting sales
  }
];

export const faqItems: FAQItem[] = [
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and for Enterprise plans, we can also arrange invoicing."
  },
  {
    question: "Is there a limit on API usage?",
    answer: "Each plan includes specified limits for leads, messages, and other resources. If you need more, you can upgrade to a higher plan or contact us for custom pricing."
  }
];
