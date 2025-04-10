
export const formatRoleTitle = (role: string): string => {
  switch (role) {
    case 'ceo':
      return 'Chief Executive Officer';
    case 'coo':
      return 'Chief Operations Officer';
    case 'cfo':
      return 'Chief Financial Officer';
    case 'cio':
      return 'Chief Information Officer';
    case 'cmo':
      return 'Chief Marketing Officer';
    case 'chro':
      return 'Chief HR Officer';
    case 'strategy':
      return 'Chief Strategy Officer';
    case 'vp_global_operations':
      return 'VP Global Operations';
    case 'vp_research_development':
      return 'VP Research & Development';
    case 'sales_business_development':
      return 'Sales & BD Executive';
    case 'operations_efficiency':
      return 'Operations Efficiency Expert';
    case 'cold_calling':
      return 'Cold Calling Expert';
    case 'customer_success':
      return 'Customer Success Executive';
    case 'marketing':
      return 'Marketing Expert';
    case 'lead_qualification':
      return 'Lead Qualification Expert';
    default:
      // Convert snake_case to Title Case
      return role
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
};

export const getBotExpertise = (role: string): string => {
  switch (role) {
    case 'ceo':
      return 'Strategic leadership, vision, innovation';
    case 'coo':
      return 'Operational efficiency, business processes, scaling';
    case 'cfo':
      return 'Financial strategy, risk management, investment';
    case 'cio':
      return 'Digital transformation, IT strategy, cybersecurity';
    case 'cmo':
      return 'Marketing strategy, brand development, GTM planning';
    case 'chro':
      return 'Talent strategy, org development, culture';
    case 'strategy':
      return 'Market analysis, competitive positioning, growth planning';
    case 'vp_global_operations':
      return 'Global logistics, supply chain, international expansion';
    case 'vp_research_development':
      return 'Innovation, product development, R&D strategy';
    case 'sales_business_development':
      return 'Sales strategy, partnership development, revenue growth';
    case 'operations_efficiency':
      return 'Process optimization, operational excellence, efficiency';
    case 'cold_calling':
      return 'Outbound sales, cold calling frameworks, objection handling';
    case 'customer_success':
      return 'Customer retention, loyalty, experience management';
    case 'marketing':
      return 'Marketing campaigns, brand positioning, customer acquisition';
    case 'lead_qualification':
      return 'Lead scoring, qualification process, conversion optimization';
    default:
      return 'Business strategy, leadership, optimization';
  }
};
