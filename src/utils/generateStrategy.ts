
import { RiskProfile } from './riskEngine';

export type StrategyAction = {
  title: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High';
  timeframe: 'Short-term' | 'Medium-term' | 'Long-term';
};

export type GeneratedStrategy = {
  title: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  primaryFocus: string;
  secondaryFocus: string;
  keyActions: StrategyAction[];
  estimatedROI: string;
  successMetrics: string[];
};

// Strategy templates based on risk level
const strategyTemplates = {
  Low: [
    {
      title: 'Steady Growth Strategy',
      description: 'Focus on organic growth, partnerships, and community building with minimal risk exposure.',
      primaryFocus: 'Optimizing existing operations',
      secondaryFocus: 'Incremental market expansion',
      keyActions: [
        {
          title: 'Process Optimization',
          description: 'Identify and eliminate inefficiencies in current processes to improve margins.',
          impact: 'Medium',
          timeframe: 'Short-term'
        },
        {
          title: 'Customer Retention Program',
          description: 'Implement loyalty programs and enhanced customer service to reduce churn.',
          impact: 'High',
          timeframe: 'Medium-term'
        },
        {
          title: 'Low-risk Partnerships',
          description: 'Form strategic alliances with established companies to access new customers.',
          impact: 'Medium',
          timeframe: 'Medium-term'
        }
      ],
      estimatedROI: '10-15% over 2 years',
      successMetrics: [
        'Customer retention rate increase by 15%',
        'Operational cost reduction of 10%',
        'Partnership-driven revenue growth of 8%'
      ]
    },
    {
      title: 'Stability-Focused Strategy',
      description: 'Prioritize financial stability and operational excellence while exploring controlled growth opportunities.',
      primaryFocus: 'Financial sustainability',
      secondaryFocus: 'Operational excellence',
      keyActions: [
        {
          title: 'Cash Flow Optimization',
          description: 'Improve invoicing processes and inventory management to enhance cash position.',
          impact: 'High',
          timeframe: 'Short-term'
        },
        {
          title: 'Incremental Product Improvements',
          description: 'Enhance existing offerings based on customer feedback without major overhauls.',
          impact: 'Medium',
          timeframe: 'Medium-term'
        },
        {
          title: 'Data-Driven Decision Making',
          description: 'Implement analytics systems to drive more informed and less risky business decisions.',
          impact: 'Medium',
          timeframe: 'Medium-term'
        }
      ],
      estimatedROI: '8-12% over 18 months',
      successMetrics: [
        'Working capital improvement of 15%',
        'Product satisfaction scores increase by 20%',
        'Decision cycle time reduction by 25%'
      ]
    }
  ],
  Medium: [
    {
      title: 'Accelerated Expansion Strategy',
      description: 'Balance calculated risks with significant growth opportunities through strategic investments and market expansion.',
      primaryFocus: 'New market penetration',
      secondaryFocus: 'Product diversification',
      keyActions: [
        {
          title: 'Adjacent Market Entry',
          description: 'Expand into closely related markets with proven demand for your offerings.',
          impact: 'High',
          timeframe: 'Medium-term'
        },
        {
          title: 'Strategic Hiring',
          description: 'Recruit key talent in areas critical for your growth objectives.',
          impact: 'Medium',
          timeframe: 'Short-term'
        },
        {
          title: 'Product Line Expansion',
          description: 'Develop complementary products to increase average customer value.',
          impact: 'High',
          timeframe: 'Medium-term'
        }
      ],
      estimatedROI: '20-30% over 2-3 years',
      successMetrics: [
        'New market revenue contribution of 25%',
        'Product portfolio expansion by 30%',
        'Customer lifetime value increase of 35%'
      ]
    },
    {
      title: 'Data-Driven Growth Strategy',
      description: 'Leverage analytics and customer insights to identify and execute on the most promising growth opportunities.',
      primaryFocus: 'Customer-centric innovation',
      secondaryFocus: 'Digital transformation',
      keyActions: [
        {
          title: 'Advanced Analytics Implementation',
          description: 'Deploy predictive analytics to identify high-potential opportunities and risks.',
          impact: 'Medium',
          timeframe: 'Short-term'
        },
        {
          title: 'Customer Journey Enhancement',
          description: 'Redesign customer touchpoints to improve conversion and satisfaction.',
          impact: 'High',
          timeframe: 'Medium-term'
        },
        {
          title: 'Strategic Digital Investments',
          description: 'Invest in technologies that provide competitive advantages in your industry.',
          impact: 'High',
          timeframe: 'Long-term'
        }
      ],
      estimatedROI: '25-35% over 3 years',
      successMetrics: [
        'Conversion rate improvement of 40%',
        'Digital engagement increase of 50%',
        'Technology-enabled cost savings of 20%'
      ]
    }
  ],
  High: [
    {
      title: 'Aggressive Market Domination Strategy',
      description: 'Prioritize rapid scaling, bold marketing initiatives, and innovative product development to capture market leadership.',
      primaryFocus: 'Disruptive innovation',
      secondaryFocus: 'Rapid market share gain',
      keyActions: [
        {
          title: 'Breakthrough Product Development',
          description: 'Invest heavily in R&D to create industry-changing products or services.',
          impact: 'High',
          timeframe: 'Medium-term'
        },
        {
          title: 'Ambitious Marketing Campaign',
          description: 'Launch high-visibility marketing initiatives to rapidly build brand awareness.',
          impact: 'High',
          timeframe: 'Short-term'
        },
        {
          title: 'Strategic Acquisitions',
          description: 'Identify and acquire companies that accelerate your market position.',
          impact: 'High',
          timeframe: 'Medium-term'
        },
        {
          title: 'Talent Acquisition',
          description: 'Aggressively recruit industry-leading talent with transformative capabilities.',
          impact: 'Medium',
          timeframe: 'Short-term'
        }
      ],
      estimatedROI: '40-60% over 3-5 years with higher volatility',
      successMetrics: [
        'Market share growth of 100%+',
        'Category-defining product launches',
        'Industry thought leadership position',
        'Valuation multiple expansion'
      ]
    },
    {
      title: 'Transformative Innovation Strategy',
      description: 'Invest in potentially groundbreaking initiatives that could fundamentally change your industry position.',
      primaryFocus: 'Breakthrough technology',
      secondaryFocus: 'Business model innovation',
      keyActions: [
        {
          title: 'Moonshot R&D Projects',
          description: 'Allocate significant resources to high-risk, high-reward research initiatives.',
          impact: 'High',
          timeframe: 'Long-term'
        },
        {
          title: 'Business Model Reinvention',
          description: 'Explore fundamentally different approaches to creating and capturing value.',
          impact: 'High',
          timeframe: 'Medium-term'
        },
        {
          title: 'Industry Consortium Leadership',
          description: 'Lead or participate in industry-wide initiatives that shape future standards.',
          impact: 'Medium',
          timeframe: 'Long-term'
        },
        {
          title: 'Venture Investment Portfolio',
          description: 'Create a portfolio of strategic investments in emerging technologies and startups.',
          impact: 'Medium',
          timeframe: 'Medium-term'
        }
      ],
      estimatedROI: '50-100%+ over 5 years with significant variability',
      successMetrics: [
        'Patents filed and granted',
        'First-to-market with revolutionary offerings',
        'Industry standard establishment',
        'Radical productivity improvements'
      ]
    }
  ]
};

export const generateStrategy = (riskProfile: RiskProfile | 'Low' | 'Medium' | 'High'): GeneratedStrategy => {
  // Determine risk level
  const riskLevel = typeof riskProfile === 'string' ? riskProfile : riskProfile.level;
  
  // Get strategies for the risk level
  const strategies = strategyTemplates[riskLevel];
  
  // Randomly select one of the strategies for the determined risk level
  const selectedStrategy = strategies[Math.floor(Math.random() * strategies.length)];
  
  // Add risk level explicitly to the return object
  return {
    ...selectedStrategy,
    riskLevel
  };
};

// Generate a strategy with customizations based on specific inputs
export const generateCustomizedStrategy = (
  riskProfile: RiskProfile,
  industryFocus?: string,
  companySize?: 'Startup' | 'Small' | 'Medium' | 'Enterprise',
  primaryGoal?: 'Growth' | 'Profitability' | 'Innovation' | 'Stability'
): GeneratedStrategy => {
  // Get base strategy
  const baseStrategy = generateStrategy(riskProfile);
  
  // Make customizations based on inputs
  let customizedStrategy = { ...baseStrategy };
  
  // Customize title based on industry if provided
  if (industryFocus) {
    customizedStrategy.title = `${baseStrategy.title} for ${industryFocus}`;
  }
  
  // Customize description based on company size if provided
  if (companySize) {
    const sizeContext = {
      Startup: 'early-stage ventures with limited resources',
      Small: 'small businesses looking to establish market position',
      Medium: 'mid-sized organizations seeking to scale operations',
      Enterprise: 'large enterprises aiming to maintain competitive edge'
    };
    
    customizedStrategy.description = `${baseStrategy.description} Tailored for ${sizeContext[companySize]}.`;
  }
  
  // Customize primary focus based on goal if provided
  if (primaryGoal) {
    const goalFocusMap = {
      Growth: ['Market expansion', 'Customer acquisition', 'Revenue scaling'],
      Profitability: ['Margin improvement', 'Operational efficiency', 'Cost optimization'],
      Innovation: ['Product development', 'Technological advancement', 'Creative disruption'],
      Stability: ['Risk management', 'Process standardization', 'Sustainable operations']
    };
    
    // Randomly select a focus from the appropriate category
    const focusOptions = goalFocusMap[primaryGoal];
    customizedStrategy.primaryFocus = focusOptions[Math.floor(Math.random() * focusOptions.length)];
    
    // Add goal-specific action
    const goalActionMap = {
      Growth: {
        title: 'Growth Acceleration Initiative',
        description: 'Implement cross-functional program focused exclusively on growth metrics.',
        impact: 'High' as const,
        timeframe: 'Medium-term' as const
      },
      Profitability: {
        title: 'Profit Enhancement Program',
        description: 'Systematic review and optimization of all cost centers and revenue streams.',
        impact: 'High' as const,
        timeframe: 'Short-term' as const
      },
      Innovation: {
        title: 'Innovation Incubator',
        description: 'Create dedicated team and resources for exploring and developing new ideas.',
        impact: 'Medium' as const,
        timeframe: 'Long-term' as const
      },
      Stability: {
        title: 'Business Continuity Framework',
        description: 'Develop comprehensive plans to ensure operational resilience.',
        impact: 'Medium' as const,
        timeframe: 'Short-term' as const
      }
    };
    
    customizedStrategy.keyActions = [
      goalActionMap[primaryGoal],
      ...customizedStrategy.keyActions.slice(0, 3) // Keep only first 3 original actions
    ];
  }
  
  return customizedStrategy;
};
