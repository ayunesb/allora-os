
/**
 * Utility functions for AI executives management
 */

// Gets the appropriate image for an executive
export function getExecutiveImage(executiveName: string): string {
  const formattedName = executiveName.toLowerCase().replace(/\s+/g, '-');
  return `/avatars/${formattedName}.png`;
}

// Get executive suggestions based on risk appetite
export function getExecutiveSuggestions(riskAppetite: 'low' | 'medium' | 'high') {
  // Default executives for all risk appetites
  const baseExecutives = [
    {
      id: 'exec-1',
      name: 'Satya Nadella',
      role: 'ceo',
      title: 'CEO Advisor',
      specialty: 'Strategic Vision, Leadership, Innovation',
      avatar: '/avatars/satya-nadella.png'
    },
    {
      id: 'exec-2',
      name: 'Warren Buffett',
      role: 'cfo',
      title: 'CFO Advisor',
      specialty: 'Financial Analysis, Investment Strategy, Risk Management',
      avatar: '/avatars/warren-buffett.png'
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
          avatar: '/avatars/elon-musk.png'
        },
        {
          id: 'exec-4',
          name: 'Brian Chesky',
          role: 'strategy',
          title: 'Strategy Advisor',
          specialty: 'Business Model Innovation, User Experience',
          avatar: '/avatars/brian-chesky.png'
        },
        {
          id: 'exec-5',
          name: 'Gary Vaynerchuk',
          role: 'marketing',
          title: 'Marketing Advisor',
          specialty: 'Brand Building, Digital Marketing',
          avatar: '/avatars/gary-vaynerchuk.png'
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
          avatar: '/avatars/sheryl-sandberg.png'
        },
        {
          id: 'exec-4',
          name: 'Jeff Bezos',
          role: 'ceo',
          title: 'Growth Advisor',
          specialty: 'Scaling, Long-term Thinking, Customer Obsession',
          avatar: '/avatars/jeff-bezos.png'
        },
        {
          id: 'exec-5',
          name: 'Seth Godin',
          role: 'marketing',
          title: 'Marketing Advisor',
          specialty: 'Positioning, Marketing Strategy',
          avatar: '/avatars/seth-godin.png'
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
          avatar: '/avatars/tim-cook.png'
        },
        {
          id: 'exec-4',
          name: 'Indra Nooyi',
          role: 'operations_efficiency',
          title: 'Efficiency Advisor',
          specialty: 'Sustainable Growth, Operational Efficiency',
          avatar: '/avatars/indra-nooyi.png'
        },
        {
          id: 'exec-5',
          name: 'Howard Schultz',
          role: 'sales_business_development',
          title: 'Brand Advisor',
          specialty: 'Brand Building, Customer Experience',
          avatar: '/avatars/howard-schultz.png'
        }
      ];
    default:
      return baseExecutives;
  }
}
