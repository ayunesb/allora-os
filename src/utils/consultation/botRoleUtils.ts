
export const formatRoleTitle = (role: string): string => {
  switch (role) {
    // C-Suite
    case 'ceo':
      return 'Chief Executive Officer';
    case 'coo':
      return 'Chief Operations Officer';
    case 'cfo':
      return 'Chief Financial Officer';
    case 'cio':
      return 'Chief Information Officer';
    case 'cto':
      return 'Chief Technology Officer';
    case 'cmo':
      return 'Chief Marketing Officer';
    case 'chro':
      return 'Chief HR Officer';
    
    // VPs
    case 'vp_sales':
      return 'VP of Sales';
    case 'vp_product':
      return 'VP of Product';
    case 'vp_operations':
      return 'VP of Operations';
    case 'vp_marketing':
      return 'VP of Marketing';
    case 'vp_global_operations':
      return 'VP Global Operations';
    case 'vp_research_development':
      return 'VP Research & Development';
    
    // Technical Roles
    case 'data_scientist':
      return 'Data Scientist';
    case 'ml_engineer':
      return 'Machine Learning Engineer';
    case 'chief_data_officer':
      return 'Chief Data Officer';
    case 'software_engineer':
      return 'Software Engineer';
    case 'cloud_architect':
      return 'Cloud Architect';
    case 'blockchain_developer':
      return 'Blockchain Developer';
    
    // Business Roles
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
    case 'digital_marketing':
      return 'Digital Marketing Specialist';
    case 'seo_specialist':
      return 'SEO Specialist';
    case 'ppc_specialist':
      return 'PPC Specialist';
    case 'business_analyst':
      return 'Business Analyst';
    case 'growth_hacker':
      return 'Growth Hacker';
    
    // Design and UX
    case 'ux_designer':
      return 'UX/UI Designer';
    case 'architect':
      return 'Architect';
    case 'civil_engineer':
      return 'Civil Engineer';
    case 'structural_engineer':
      return 'Structural Engineer';
    case 'fashion_designer':
      return 'Fashion Designer';
    
    // Finance and Investment
    case 'venture_capitalist':
      return 'Venture Capitalist';
    case 'investment_banker':
      return 'Investment Banker';
    case 'risk_manager':
      return 'Risk Manager';
    case 'financial_advisor':
      return 'Financial Advisor';
    
    // Strategy
    case 'strategy':
      return 'Chief Strategy Officer';
    case 'innovation_manager':
      return 'Innovation Manager';
    case 'brand_strategist':
      return 'Brand Strategist';
    
    // Operations and Logistics
    case 'supply_chain_manager':
      return 'Supply Chain Manager';
    case 'manufacturing_engineer':
      return 'Manufacturing Engineer';
    case 'transportation_manager':
      return 'Transportation Manager';
    case 'aviation_manager':
      return 'Aviation Manager';
    
    // Legal and Compliance
    case 'legal_counsel':
      return 'Legal Counsel';
    case 'compliance_officer':
      return 'Compliance Officer';
    
    // Media and Communications
    case 'content_creator':
      return 'Content Creator';
    case 'public_relations':
      return 'Public Relations Officer';
    case 'journalist':
      return 'Journalist';
    case 'diplomat':
      return 'Diplomat';
    
    // Tech Specialties
    case 'ai_ethics_researcher':
      return 'AI Ethics Researcher';
    case 'cybersecurity_specialist':
      return 'Cybersecurity Specialist';
    case 'vr_ar_developer':
      return 'VR/AR Developer';
    
    // Entertainment
    case 'music_producer':
      return 'Music Producer';
    case 'film_director':
      return 'Film Director';
    case 'actor':
      return 'Actor/Actress';
    case 'game_designer':
      return 'Game Designer';
    case 'esports_coach':
      return 'Esports Coach';
    
    // Retail and Hospitality
    case 'retail_manager':
      return 'Retail Manager';
    case 'ecommerce_director':
      return 'E-commerce Director';
    case 'luxury_brand_manager':
      return 'Luxury Brand Manager';
    case 'food_beverage_director':
      return 'Food & Beverage Director';
    case 'hospitality_manager':
      return 'Hospitality Manager';
    
    // Education and Sports
    case 'sports_coach':
      return 'Sports Coach';
    case 'sports_agent':
      return 'Sports Agent';
    case 'education_consultant':
      return 'Education Consultant';
    case 'university_president':
      return 'University President';
    
    // Real Estate
    case 'real_estate_broker':
      return 'Real Estate Broker';
    case 'construction_manager':
      return 'Construction Project Manager';
    
    // Scientific and Healthcare
    case 'sustainability_officer':
      return 'Sustainability Officer';
    case 'biotech_scientist':
      return 'Biotech Scientist';
    case 'genetic_engineer':
      return 'Genetic Engineer';
    case 'medical_doctor':
      return 'Medical Doctor';
    case 'neurosurgeon':
      return 'Neurosurgeon';
    
    // Special Roles
    case 'political_campaign_manager':
      return 'Political Campaign Manager';
    case 'strategic_partnerships':
      return 'Strategic Partnerships Manager';
    case 'renewable_energy_engineer':
      return 'Renewable Energy Engineer';
    case 'electric_vehicle_engineer':
      return 'Electric Vehicle Engineer';
    case 'aerospace_engineer':
      return 'Aerospace Engineer';
    case 'event_planner':
      return 'Event Planner';
    case 'call_center_manager':
      return 'Call Center Manager';
    
    default:
      // Convert snake_case to Title Case
      return role
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  }
};

export const getBotExpertise = (role: string): string => {
  const { botSpecialSkills } = require('@/backend/executiveBots');
  
  // Use the specialized skills if available
  if (botSpecialSkills && botSpecialSkills[role]) {
    return botSpecialSkills[role];
  }
  
  // Fall back to default expertise by role category
  switch (role) {
    // C-Suite
    case 'ceo':
      return 'Strategic leadership, vision, innovation';
    case 'coo':
      return 'Operational efficiency, business processes, scaling';
    case 'cfo':
      return 'Financial strategy, risk management, investment';
    case 'cio':
      return 'Digital transformation, IT strategy, cybersecurity';
    case 'cto':
      return 'Technical leadership, product development, innovation';
    case 'cmo':
      return 'Marketing strategy, brand development, GTM planning';
    case 'chro':
      return 'Talent strategy, org development, culture';
    
    // Strategy
    case 'strategy':
      return 'Market analysis, competitive positioning, growth planning';
    case 'innovation_manager':
      return 'Disruptive innovation, business model reinvention';
    case 'brand_strategist': 
      return 'Brand identity, positioning, messaging';
    
    // Technical
    case 'vp_research_development':
      return 'Innovation, product development, R&D strategy';
    case 'data_scientist':
      return 'Data analytics, predictive modeling, machine learning';
    case 'ml_engineer':
      return 'AI systems, neural networks, model development';
    case 'software_engineer':
      return 'Software development, architecture, coding standards';
    case 'cloud_architect':
      return 'Cloud infrastructure, distributed systems, scalability';
    case 'blockchain_developer':
      return 'Blockchain architecture, smart contracts, decentralized apps';
    
    // Operations
    case 'vp_global_operations':
      return 'Global logistics, supply chain, international expansion';
    case 'operations_efficiency':
      return 'Process optimization, operational excellence, efficiency';
    case 'supply_chain_manager':
      return 'Supply chain optimization, inventory management';
    case 'manufacturing_engineer':
      return 'Production systems, factory design, automation';
    
    // Sales & Marketing
    case 'sales_business_development':
      return 'Sales strategy, partnership development, revenue growth';
    case 'cold_calling':
      return 'Outbound sales, cold calling frameworks, objection handling';
    case 'marketing':
      return 'Marketing campaigns, brand positioning, customer acquisition';
    case 'lead_qualification':
      return 'Lead scoring, qualification process, conversion optimization';
    case 'digital_marketing':
      return 'Digital channels, online campaigns, attribution';
    case 'growth_hacker':
      return 'Growth loops, viral acquisition, retention strategies';
    
    // Design
    case 'ux_designer':
      return 'User experience, interface design, usability testing';
    case 'architect':
      return 'Architectural design, space planning, sustainable building';
    
    // Finance
    case 'venture_capitalist':
      return 'Startup investing, portfolio management, exits';
    case 'investment_banker':
      return 'M&A, capital raising, financial advisory';
    case 'risk_manager':
      return 'Risk assessment, mitigation strategies, compliance';
    
    // Specialized Sectors
    case 'ai_ethics_researcher':
      return 'AI ethics, algorithmic bias, responsible AI';
    case 'cybersecurity_specialist':
      return 'Security architecture, threat assessment, penetration testing';
    case 'renewable_energy_engineer':
      return 'Solar, wind, and renewable energy systems';
    case 'biotech_scientist':
      return 'Biotechnology research, gene editing, pharmaceutical development';
    
    default:
      return 'Business strategy, leadership, optimization';
  }
};

export const getBotOutputLocation = (role: string): string => {
  const { botOutputLocations } = require('@/backend/executiveBots');
  
  if (botOutputLocations && botOutputLocations[role]) {
    return botOutputLocations[role];
  }
  
  // Default output locations by category
  if (role.includes('sales') || role.includes('call')) {
    return 'Calls / Messaging';
  } else if (role.includes('market')) {
    return 'Campaign Manager';
  } else if (role.includes('finance') || role.includes('cfo')) {
    return 'Finance Dashboard';
  } else if (role.includes('product')) {
    return 'Product Dashboard';
  } else if (role.includes('data')) {
    return 'Analytics Dashboard';
  } else if (role.includes('tech') || role.includes('cto') || role.includes('engineer')) {
    return 'Tech Dashboard';
  } else if (role.includes('hr') || role.includes('talent')) {
    return 'HR Dashboard';
  }
  
  return 'Dashboard';
};

export const getBotExampleAction = (role: string): string => {
  const { botExampleActions } = require('@/backend/executiveBots');
  
  if (botExampleActions && botExampleActions[role]) {
    return botExampleActions[role];
  }
  
  // Default example actions by category
  if (role.includes('ceo') || role.includes('strategy')) {
    return 'Develop strategic growth plan';
  } else if (role.includes('sales')) {
    return 'Create sales optimization strategy';
  } else if (role.includes('market')) {
    return 'Design targeted marketing campaign';
  } else if (role.includes('finance') || role.includes('cfo')) {
    return 'Build financial forecasting model';
  } else if (role.includes('product')) {
    return 'Create product roadmap';
  } else if (role.includes('data')) {
    return 'Analyze customer behavior patterns';
  } else if (role.includes('tech') || role.includes('engineer')) {
    return 'Design system architecture';
  }
  
  return 'Provide expert recommendations';
};
