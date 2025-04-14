
interface RiskProfile {
  level: 'Low' | 'Medium' | 'High';
  score: number;
  breakdown: Record<string, number>;
}

interface Strategy {
  id?: string;
  title: string;
  description: string;
  keyActions: {
    title: string;
    description: string;
  }[];
  riskProfile: string;
  industry: string;
  companySize: string;
  expectedROI?: {
    low: number;
    high: number;
    timeframeMonths: number;
  };
  resources?: {
    estimatedBudget?: number;
    estimatedTimeWeeks?: number;
    requiredTeamMembers?: string[];
  };
}

/**
 * Generates a customized business strategy based on company parameters
 */
export function generateCustomizedStrategy(
  riskProfile: RiskProfile,
  industry: string, 
  companySize: string, 
  primaryGoal: string
): Strategy {
  // This is a simplified strategy generator
  // In a real app, this would likely call an AI service or use a more complex algorithm
  
  let title = '';
  let description = '';
  let keyActions = [];
  
  // Generate strategy based on risk profile
  if (riskProfile.level === 'Low') {
    title = 'Steady Growth Optimization';
    description = 'A conservative approach to sustainable business growth focusing on existing markets and proven tactics.';
    keyActions = [
      {
        title: 'Customer Retention Program',
        description: 'Implement a structured program to improve customer retention by 15% over 6 months.'
      },
      {
        title: 'Process Optimization',
        description: 'Identify and eliminate inefficiencies in current processes to reduce costs by 10%.'
      },
      {
        title: 'Incremental Product Improvements',
        description: 'Enhance existing products based on customer feedback and usage data.'
      }
    ];
  } else if (riskProfile.level === 'Medium') {
    title = 'Balanced Expansion Strategy';
    description = 'A balanced approach to business growth combining proven methods with controlled innovation.';
    keyActions = [
      {
        title: 'New Market Segment Targeting',
        description: 'Identify and develop plans to enter 1-2 adjacent market segments within 9 months.'
      },
      {
        title: 'Strategic Partnerships',
        description: 'Form 2-3 key partnerships to expand reach and capabilities.'
      },
      {
        title: 'Product Line Extension',
        description: 'Develop 1-2 new complementary products or services to offer existing customers.'
      }
    ];
  } else {
    title = 'Aggressive Market Disruption';
    description = 'A bold strategy focused on innovation and rapid growth to disrupt existing markets.';
    keyActions = [
      {
        title: 'Disruptive Innovation Launch',
        description: 'Develop and launch a revolutionary product or service within 12 months.'
      },
      {
        title: 'Rapid Market Expansion',
        description: 'Enter 3+ new markets or geographic regions simultaneously.'
      },
      {
        title: 'Strategic Acquisition',
        description: 'Identify and acquire 1-2 companies that provide complementary technology or market access.'
      }
    ];
  }
  
  // Customize based on industry
  if (industry === 'Technology' || industry === 'technology') {
    keyActions.push({
      title: 'Technology Stack Modernization',
      description: 'Update core technologies to improve scalability and development speed.'
    });
  } else if (industry === 'Retail' || industry === 'retail') {
    keyActions.push({
      title: 'Omnichannel Experience Enhancement',
      description: 'Create seamless customer experiences across online and offline touchpoints.'
    });
  } else if (industry === 'Manufacturing' || industry === 'manufacturing') {
    keyActions.push({
      title: 'Supply Chain Optimization',
      description: 'Redesign supply chain for resilience and efficiency.'
    });
  }
  
  // Adjust for company size
  if (companySize === 'Small') {
    keyActions.push({
      title: 'Targeted Digital Marketing Campaign',
      description: 'Launch highly focused campaigns to maximize ROI with limited budget.'
    });
  } else if (companySize === 'Medium') {
    keyActions.push({
      title: 'Departmental Efficiency Analysis',
      description: 'Optimize team structures and processes across key departments.'
    });
  } else if (companySize === 'Large') {
    keyActions.push({
      title: 'Cross-Division Synergy Program',
      description: 'Identify and leverage opportunities for collaboration between business units.'
    });
  }
  
  // Add goal-specific action
  if (primaryGoal === 'Growth') {
    keyActions.push({
      title: 'Growth Acceleration Initiative',
      description: 'Launch comprehensive program to increase customer acquisition by 30%.'
    });
  } else if (primaryGoal === 'Profit') {
    keyActions.push({
      title: 'Profitability Enhancement Program',
      description: 'Implement margin improvement measures across all business areas.'
    });
  } else if (primaryGoal === 'Innovation') {
    keyActions.push({
      title: 'Innovation Lab Establishment',
      description: 'Create dedicated team and process for developing breakthrough ideas.'
    });
  }
  
  return {
    title,
    description,
    keyActions,
    riskProfile: riskProfile.level,
    industry,
    companySize,
    expectedROI: {
      low: riskProfile.level === 'Low' ? 5 : riskProfile.level === 'Medium' ? 15 : 25,
      high: riskProfile.level === 'Low' ? 15 : riskProfile.level === 'Medium' ? 30 : 50,
      timeframeMonths: riskProfile.level === 'Low' ? 12 : riskProfile.level === 'Medium' ? 9 : 6
    }
  };
}

/**
 * Generates a set of strategies for different risk profiles
 */
export function generateStrategySet(
  industry: string,
  companySize: string,
  primaryGoal: string
): Strategy[] {
  return [
    generateCustomizedStrategy(
      { level: 'Low', score: 25, breakdown: {} },
      industry,
      companySize,
      primaryGoal
    ),
    generateCustomizedStrategy(
      { level: 'Medium', score: 50, breakdown: {} },
      industry,
      companySize,
      primaryGoal
    ),
    generateCustomizedStrategy(
      { level: 'High', score: 75, breakdown: {} },
      industry,
      companySize,
      primaryGoal
    )
  ];
}
