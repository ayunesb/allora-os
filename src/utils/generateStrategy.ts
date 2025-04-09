
import { RiskProfile } from './riskEngine';

export type StrategyAction = {
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  timeframe: 'Short-term' | 'Medium-term' | 'Long-term';
};

export type GeneratedStrategy = {
  riskLevel: 'Low' | 'Medium' | 'High';
  title: string;
  description: string;
  primaryFocus: string;
  secondaryFocus: string;
  keyActions: StrategyAction[];
  estimatedROI: string;
  successMetrics: string[];
};

// Define some template strategies for each risk level
const lowRiskStrategies = [
  {
    title: 'Operational Excellence',
    description: 'Focus on refining internal processes and incrementally improving existing products/services.',
    primaryFocus: 'Process Optimization',
    secondaryFocus: 'Customer Retention',
    actions: [
      {
        title: 'Implement Lean Methodology',
        description: 'Identify and eliminate waste in critical business processes.',
        impact: 'Medium' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Enhance Customer Feedback Loop',
        description: 'Create systematic ways to collect and act on customer feedback.',
        impact: 'Medium' as const,
        timeframe: 'Short-term' as const
      },
      {
        title: 'Staff Skills Development',
        description: 'Implement targeted training program to address skills gaps.',
        impact: 'Low' as const,
        timeframe: 'Medium-term' as const
      }
    ],
    roi: '10-15% improvement in operational efficiency within 12 months',
    metrics: [
      'Reduction in operational costs by 5-10%',
      'Improved customer satisfaction scores by 10 points',
      'Reduced employee turnover by 15%'
    ]
  },
  {
    title: 'Market Penetration Strategy',
    description: 'Deepen presence in existing markets through enhanced marketing and sales approaches.',
    primaryFocus: 'Sales Optimization',
    secondaryFocus: 'Brand Awareness',
    actions: [
      {
        title: 'Sales Process Refinement',
        description: 'Optimize sales funnel and improve conversion rates at each stage.',
        impact: 'Medium' as const,
        timeframe: 'Short-term' as const
      },
      {
        title: 'Customer Loyalty Program',
        description: 'Develop and implement a structured loyalty program with clear incentives.',
        impact: 'Medium' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Targeted Digital Marketing',
        description: 'Implement data-driven digital marketing campaigns focused on existing customer segments.',
        impact: 'Low' as const,
        timeframe: 'Short-term' as const
      }
    ],
    roi: '5-10% revenue increase from existing customers within 6-12 months',
    metrics: [
      'Increased customer retention rate by 15%',
      'Improved sales conversion rate by 10%',
      'Decreased customer acquisition cost by 8%'
    ]
  }
];

const mediumRiskStrategies = [
  {
    title: 'Selective Market Expansion',
    description: 'Strategically expand into adjacent markets or segments with calculated risk.',
    primaryFocus: 'New Market Development',
    secondaryFocus: 'Product Adaptation',
    actions: [
      {
        title: 'Market Research Initiative',
        description: 'Conduct comprehensive analysis of target adjacent markets.',
        impact: 'Medium' as const,
        timeframe: 'Short-term' as const
      },
      {
        title: 'Tailored Marketing Campaign',
        description: 'Develop marketing messaging specifically for new target segments.',
        impact: 'Medium' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Strategic Partnerships',
        description: 'Form alliances with complementary businesses in new markets.',
        impact: 'High' as const,
        timeframe: 'Medium-term' as const
      }
    ],
    roi: '15-25% new revenue stream within 18 months',
    metrics: [
      'Acquisition of 2-3 major clients in new market',
      'Achieving 20% market share in selected new segment',
      'Cross-selling success rate of 25% to existing customers'
    ]
  },
  {
    title: 'Product Diversification Strategy',
    description: 'Expand product/service offerings to create new revenue streams with controlled investment.',
    primaryFocus: 'Product Development',
    secondaryFocus: 'Market Testing',
    actions: [
      {
        title: 'New Product Development',
        description: 'Create 1-2 new offerings that leverage existing capabilities.',
        impact: 'High' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Pilot Launch Program',
        description: 'Test new offerings with select customers before full rollout.',
        impact: 'Medium' as const,
        timeframe: 'Short-term' as const
      },
      {
        title: 'Cross-functional Innovation Team',
        description: 'Establish dedicated team for ongoing product innovation.',
        impact: 'Medium' as const,
        timeframe: 'Long-term' as const
      }
    ],
    roi: '20-30% increase in revenue diversity within 24 months',
    metrics: [
      'New products contributing 15% to total revenue',
      'Customer adoption rate of 30% for new offerings',
      'Reduction in revenue volatility by 20%'
    ]
  }
];

const highRiskStrategies = [
  {
    title: 'Disruptive Innovation Strategy',
    description: 'Create breakthrough products/services that potentially redefine your industry.',
    primaryFocus: 'Revolutionary Product Development',
    secondaryFocus: 'New Market Creation',
    actions: [
      {
        title: 'Innovation Lab Establishment',
        description: 'Create dedicated R&D unit with substantial investment and talent.',
        impact: 'High' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Technology Acquisition',
        description: 'Acquire promising startups or key technologies to accelerate innovation.',
        impact: 'High' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Disruptive Product Launch',
        description: 'Develop and release industry-changing product with aggressive go-to-market.',
        impact: 'High' as const,
        timeframe: 'Long-term' as const
      }
    ],
    roi: 'Potential 100%+ growth over 3-5 years with high variability',
    metrics: [
      'First-to-market with revolutionary offering',
      'Patent or IP protection secured',
      'Capturing 40%+ share in newly created market category'
    ]
  },
  {
    title: 'Aggressive Market Dominance Strategy',
    description: 'Rapidly scale to become the dominant player through bold market moves.',
    primaryFocus: 'Scaling Operations',
    secondaryFocus: 'Competitive Displacement',
    actions: [
      {
        title: 'Major Capacity Expansion',
        description: 'Significantly increase production/delivery capability.',
        impact: 'High' as const,
        timeframe: 'Medium-term' as const
      },
      {
        title: 'Price Leadership Initiative',
        description: 'Strategic pricing to gain market share, potentially accepting short-term losses.',
        impact: 'High' as const,
        timeframe: 'Short-term' as const
      },
      {
        title: 'Competitor Acquisition',
        description: 'Identify and acquire key competitors to consolidate market position.',
        impact: 'High' as const,
        timeframe: 'Long-term' as const
      }
    ],
    roi: '50-75% market share increase within 36 months',
    metrics: [
      'Becoming top 3 player in market',
      'Tripling customer base within 24 months',
      'Achieving economies of scale with 40% cost reduction'
    ]
  }
];

export function generateCustomizedStrategy(
  riskProfile: RiskProfile,
  industryContext?: string,
  companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise',
  primaryGoal?: 'Growth' | 'Profitability' | 'Innovation' | 'Stability'
): GeneratedStrategy {
  // Select base strategy template based on risk level
  let strategyTemplates;
  switch (riskProfile.level) {
    case 'Low':
      strategyTemplates = lowRiskStrategies;
      break;
    case 'Medium':
      strategyTemplates = mediumRiskStrategies;
      break;
    case 'High':
      strategyTemplates = highRiskStrategies;
      break;
    default:
      strategyTemplates = mediumRiskStrategies;
  }
  
  // Choose a specific template (could be random or based on other factors)
  const baseTemplate = strategyTemplates[Math.floor(Math.random() * strategyTemplates.length)];
  
  // Customize the template based on additional inputs
  const strategy: GeneratedStrategy = {
    riskLevel: riskProfile.level,
    title: customizeTitle(baseTemplate.title, industryContext, primaryGoal),
    description: customizeDescription(baseTemplate.description, industryContext, companySize),
    primaryFocus: baseTemplate.primaryFocus,
    secondaryFocus: baseTemplate.secondaryFocus,
    keyActions: baseTemplate.actions.map(action => ({
      title: action.title,
      description: action.description,
      impact: action.impact,
      timeframe: action.timeframe
    })),
    estimatedROI: customizeROI(baseTemplate.roi, companySize),
    successMetrics: customizeMetrics(baseTemplate.metrics, industryContext)
  };
  
  return strategy;
}

// Helper functions to customize strategy elements
function customizeTitle(
  baseTitle: string, 
  industryContext?: string, 
  primaryGoal?: 'Growth' | 'Profitability' | 'Innovation' | 'Stability'
): string {
  if (!industryContext && !primaryGoal) return baseTitle;
  
  let title = baseTitle;
  
  if (primaryGoal) {
    const goalPrefix = {
      'Growth': 'Growth-Oriented',
      'Profitability': 'Profit-Focused',
      'Innovation': 'Innovation-Driven',
      'Stability': 'Sustainability-Centered'
    }[primaryGoal];
    
    title = `${goalPrefix} ${title}`;
  }
  
  if (industryContext) {
    title = `${title} for ${industryContext}`;
  }
  
  return title;
}

function customizeDescription(
  baseDescription: string, 
  industryContext?: string, 
  companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise'
): string {
  let description = baseDescription;
  
  if (industryContext) {
    description += ` Specifically tailored for the ${industryContext} industry.`;
  }
  
  if (companySize) {
    const sizeContext = {
      'Startup': 'early-stage companies looking to establish market presence',
      'Small': 'small businesses seeking sustainable growth',
      'Medium': 'mid-sized organizations aiming to scale operations',
      'Enterprise': 'established enterprises focusing on maintaining competitive advantage'
    }[companySize];
    
    description += ` Optimized for ${sizeContext}.`;
  }
  
  return description;
}

function customizeROI(baseROI: string, companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise'): string {
  if (!companySize) return baseROI;
  
  // Adjust ROI expectations based on company size
  switch(companySize) {
    case 'Startup':
      return baseROI.replace(/\d+%/g, match => {
        const num = parseInt(match);
        return `${num + 10}%`;
      });
    case 'Small':
      return baseROI;
    case 'Medium':
      return baseROI.replace(/(\d+)-(\d+)%/g, (_, min, max) => {
        return `${parseInt(min) - 5}-${parseInt(max)}%`;
      });
    case 'Enterprise':
      return baseROI.replace(/(\d+)-(\d+)%/g, (_, min, max) => {
        return `${parseInt(min) - 10}-${parseInt(max) - 5}%`;
      });
    default:
      return baseROI;
  }
}

function customizeMetrics(baseMetrics: string[], industryContext?: string): string[] {
  if (!industryContext) return baseMetrics;
  
  // Add industry-specific metrics
  const industryMetrics: {[key: string]: string} = {
    'Technology': 'Increased user engagement by 25%',
    'Healthcare': 'Improved patient outcomes by 15%',
    'Retail': 'Enhanced customer lifetime value by 20%',
    'Manufacturing': 'Reduced production defects by 30%',
    'Finance': 'Decreased risk exposure by 25%',
    'Education': 'Improved learning outcomes by 20%'
  };
  
  const metrics = [...baseMetrics];
  
  // Add industry-specific metric if available
  Object.keys(industryMetrics).forEach(industry => {
    if (industryContext.toLowerCase().includes(industry.toLowerCase())) {
      metrics.push(industryMetrics[industry]);
    }
  });
  
  // If no specific industry match, add a generic one
  if (metrics.length === baseMetrics.length) {
    metrics.push(`Achieved industry-specific benchmarks for ${industryContext}`);
  }
  
  return metrics;
}
