
export const generateStrategy = (riskLevel: 'Low' | 'Medium' | 'High') => {
  switch (riskLevel) {
    case 'Low':
      return {
        title: 'Steady Growth Strategy',
        description: 'Focus on organic growth, partnerships, and community building.',
        riskLevel: 'Low'
      };
    case 'Medium':
      return {
        title: 'Accelerated Expansion Strategy',
        description: 'Invest in marketing, partnerships, and moderate risk product development.',
        riskLevel: 'Medium'
      };
    case 'High':
      return {
        title: 'Aggressive Market Domination Strategy',
        description: 'Prioritize fast scaling, bold advertising, and innovative product launches.',
        riskLevel: 'High'
      };
    default:
      return {
        title: 'Custom Strategy',
        description: 'Build a personalized strategy based on your specific needs.',
        riskLevel: 'Medium'
      };
  }
};
