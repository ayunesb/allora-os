
/**
 * Utility functions for AI executives management
 */

// Gets the appropriate image for an executive
export function getExecutiveImage(executiveName: string): string {
  // Use available images instead of relying on images that don't exist
  return '/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png';
}

// Get executive suggestions based on risk appetite
export function getExecutiveSuggestions(riskAppetite: 'low' | 'medium' | 'high') {
  // Static image paths we know exist in the project
  const defaultAvatar1 = '/lovable-uploads/012d3495-8ef4-4f5e-b9b4-cbb461c250d0.png';
  const defaultAvatar2 = '/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png';
  
  // Default executives for all risk appetites
  const baseExecutives = [
    {
      id: 'exec-1',
      name: 'Satya Nadella',
      role: 'ceo',
      title: 'CEO Advisor',
      specialty: 'Strategic Vision, Leadership, Innovation',
      avatar: defaultAvatar1
    },
    {
      id: 'exec-2',
      name: 'Warren Buffett',
      role: 'cfo',
      title: 'CFO Advisor',
      specialty: 'Financial Analysis, Investment Strategy, Risk Management',
      avatar: defaultAvatar2
    }
  ];

  // Add risk-specific executives
  switch (riskAppetite) {
    case 'high':
      return [
        ...baseExecutives,
        {
          id: 'exec-3',
          name: 'Elon Musk',
          role: 'ceo',
          title: 'Innovation Advisor',
          specialty: 'Disruptive Innovation, Moonshot Projects, Risk-Taking',
          avatar: defaultAvatar1
        },
        {
          id: 'exec-4',
          name: 'Brian Chesky',
          role: 'strategy',
          title: 'Strategy Advisor',
          specialty: 'Business Model Innovation, User Experience',
          avatar: defaultAvatar2
        },
        {
          id: 'exec-5',
          name: 'Gary Vaynerchuk',
          role: 'marketing',
          title: 'Marketing Advisor',
          specialty: 'Brand Building, Digital Marketing',
          avatar: defaultAvatar1
        }
      ];
    case 'medium':
      return [
        ...baseExecutives,
        {
          id: 'exec-3',
          name: 'Sheryl Sandberg',
          role: 'coo',
          title: 'COO Advisor',
          specialty: 'Operations, Scaling, Process Optimization',
          avatar: defaultAvatar1
        },
        {
          id: 'exec-4',
          name: 'Jeff Bezos',
          role: 'ceo',
          title: 'Growth Advisor',
          specialty: 'Scaling, Long-term Thinking, Customer Obsession',
          avatar: defaultAvatar2
        },
        {
          id: 'exec-5',
          name: 'Seth Godin',
          role: 'marketing',
          title: 'Marketing Advisor',
          specialty: 'Positioning, Marketing Strategy',
          avatar: defaultAvatar1
        }
      ];
    case 'low':
      return [
        ...baseExecutives,
        {
          id: 'exec-3',
          name: 'Tim Cook',
          role: 'ceo',
          title: 'Operations Advisor',
          specialty: 'Supply Chain, Operational Excellence, Incremental Innovation',
          avatar: defaultAvatar1
        },
        {
          id: 'exec-4',
          name: 'Indra Nooyi',
          role: 'operations_efficiency',
          title: 'Efficiency Advisor',
          specialty: 'Sustainable Growth, Operational Efficiency',
          avatar: defaultAvatar2
        },
        {
          id: 'exec-5',
          name: 'Howard Schultz',
          role: 'sales_business_development',
          title: 'Brand Advisor',
          specialty: 'Brand Building, Customer Experience',
          avatar: defaultAvatar1
        }
      ];
    default:
      return baseExecutives;
  }
}
