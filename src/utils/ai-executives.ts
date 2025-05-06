/**
 * Utility functions for AI executives management
 */

// Gets the appropriate image for an executive
export function getExecutiveImage(executiveName: string): string {
  // Use available images instead of relying on images that don't exist
  return "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png";
}

// Get executive suggestions based on risk appetite
export function getExecutiveSuggestions(
  riskAppetite: "low" | "medium" | "high",
) {
  // Static image paths we know exist in the project
  const defaultAvatar1 =
    "/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png";
  const defaultAvatar2 =
    "/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png";

  // Add CRO to base executives for all risk appetites
  const baseExecutives = [
    {
      id: "exec-1",
      name: "Satya Nadella",
      role: "ceo",
      title: "CEO Advisor",
      specialty: "Strategic Vision, Leadership, Innovation",
      avatar: defaultAvatar1,
    },
    {
      id: "exec-2",
      name: "Warren Buffett",
      role: "cfo",
      title: "CFO Advisor",
      specialty: "Financial Analysis, Investment Strategy, Risk Management",
      avatar: defaultAvatar2,
    },
    {
      id: "exec-cro",
      name: "RiskMind AI",
      role: "cro",
      title: "Chief Risk Officer",
      specialty:
        "Risk Appetite Analysis, Antifragility Strategies, Crisis Detection",
      avatar: defaultAvatar1,
    },
  ];

  // Add risk-specific executives
  switch (riskAppetite) {
    case "high":
      return [
        ...baseExecutives,
        {
          id: "exec-3",
          name: "Elon Musk",
          role: "ceo",
          title: "Innovation Advisor",
          specialty: "Disruptive Innovation, Moonshot Projects, Risk-Taking",
          avatar: defaultAvatar1,
        },
        {
          id: "exec-4",
          name: "Brian Chesky",
          role: "strategy",
          title: "Strategy Advisor",
          specialty: "Business Model Innovation, User Experience",
          avatar: defaultAvatar2,
        },
        {
          id: "exec-5",
          name: "Gary Vaynerchuk",
          role: "marketing",
          title: "Marketing Advisor",
          specialty: "Brand Building, Digital Marketing",
          avatar: defaultAvatar1,
        },
      ];
    case "medium":
      return [
        ...baseExecutives,
        {
          id: "exec-3",
          name: "Sheryl Sandberg",
          role: "coo",
          title: "COO Advisor",
          specialty: "Operations, Scaling, Process Optimization",
          avatar: defaultAvatar1,
        },
        {
          id: "exec-4",
          name: "Jeff Bezos",
          role: "ceo",
          title: "Growth Advisor",
          specialty: "Scaling, Long-term Thinking, Customer Obsession",
          avatar: defaultAvatar2,
        },
        {
          id: "exec-5",
          name: "Seth Godin",
          role: "marketing",
          title: "Marketing Advisor",
          specialty: "Positioning, Marketing Strategy",
          avatar: defaultAvatar1,
        },
      ];
    case "low":
      return [
        ...baseExecutives,
        {
          id: "exec-3",
          name: "Tim Cook",
          role: "ceo",
          title: "Operations Advisor",
          specialty:
            "Supply Chain, Operational Excellence, Incremental Innovation",
          avatar: defaultAvatar1,
        },
        {
          id: "exec-4",
          name: "Indra Nooyi",
          role: "operations_efficiency",
          title: "Efficiency Advisor",
          specialty: "Sustainable Growth, Operational Efficiency",
          avatar: defaultAvatar2,
        },
        {
          id: "exec-5",
          name: "Howard Schultz",
          role: "sales_business_development",
          title: "Brand Advisor",
          specialty: "Brand Building, Customer Experience",
          avatar: defaultAvatar1,
        },
      ];
    default:
      return baseExecutives;
  }
}

// Add risk analysis types for the CRO executive
export interface RiskAssessment {
  score: number;
  level: "low" | "medium" | "high" | "critical";
  insights: string[];
  recommendations: string[];
}

export interface RiskCategory {
  name: string;
  description: string;
  score: number;
}

export interface RiskScenario {
  name: string;
  probability: number;
  impact: number;
  description: string;
  mitigationSteps: string[];
}

// CRO risk modeling functions
export function generateRiskAssessment(
  businessData: Record<string, any>,
  riskAppetite: "low" | "medium" | "high",
): RiskAssessment {
  // This would normally use complex risk models, but for demo we'll use a simplified approach
  const baseScore =
    riskAppetite === "low" ? 30 : riskAppetite === "medium" ? 50 : 75;

  return {
    score: baseScore,
    level:
      baseScore < 40
        ? "low"
        : baseScore < 70
          ? "medium"
          : baseScore < 90
            ? "high"
            : "critical",
    insights: [
      "Current market volatility suggests increased caution with new investments",
      "Regulatory changes may impact core business operations in Q3",
      "Competitor landscape shows signs of consolidation",
    ],
    recommendations: [
      "Implement quarterly stress testing for all major initiatives",
      "Develop contingency plans for supply chain disruptions",
      "Consider hedging strategies for currency exposure",
      "Build additional cash reserves to improve resilience",
    ],
  };
}

export function generateRiskScenarios(industry: string): RiskScenario[] {
  // Simplified demo implementation
  return [
    {
      name: "Market Downturn",
      probability: 0.3,
      impact: 0.7,
      description:
        "Significant market contraction affecting revenue for 2-3 quarters",
      mitigationSteps: [
        "Diversify revenue streams",
        "Prepare cost-cutting measures that can be quickly implemented",
        "Identify opportunities that emerge during downturns",
      ],
    },
    {
      name: "Regulatory Changes",
      probability: 0.6,
      impact: 0.5,
      description: "New compliance requirements increasing operational costs",
      mitigationSteps: [
        "Maintain proactive regulatory monitoring",
        "Build relationships with regulatory bodies",
        "Implement flexible compliance frameworks",
      ],
    },
    {
      name: "Technological Disruption",
      probability: 0.4,
      impact: 0.8,
      description:
        "Emerging technologies making current products/services obsolete",
      mitigationSteps: [
        "Invest in R&D for emerging technologies",
        "Develop acquisition strategy for innovative startups",
        "Create internal disruption team to challenge status quo",
      ],
    },
  ];
}
