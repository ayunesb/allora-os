
export function formatRoleTitle(role: string): string {
  switch (role) {
    case 'ceo': return 'Chief Executive Officer';
    case 'cfo': return 'Chief Financial Officer';
    case 'cio': return 'Chief Information Officer';
    case 'cmo': return 'Chief Marketing Officer';
    case 'chro': return 'Chief HR Officer';
    case 'coo': return 'Chief Operations Officer';
    case 'strategy': return 'Strategy Consultant';
    case 'vp_global_operations': return 'VP of Global Operations';
    case 'vp_research_development': return 'VP of Research & Development';
    case 'sales_business_development': return 'Sales & Business Development';
    case 'operations_efficiency': return 'Operations Efficiency Expert';
    default: return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}

export function getBotExpertise(role: string): string {
  switch (role) {
    case 'ceo': return 'Leadership, Vision, Strategy';
    case 'cfo': return 'Finance, Investment, Risk Management';
    case 'cio': return 'Technology, Innovation, Digital Transformation';
    case 'cmo': return 'Marketing, Brand, Customer Experience';
    case 'chro': return 'HR, Talent, Culture';
    case 'coo': return 'Operations, Efficiency, Process Optimization';
    case 'strategy': return 'Business Strategy, Competitive Analysis';
    case 'vp_global_operations': return 'Global Operations, Supply Chain';
    case 'vp_research_development': return 'R&D, Innovation, Product Development';
    case 'sales_business_development': return 'Sales, Partnerships, Business Development';
    case 'operations_efficiency': return 'Process Optimization, Operational Efficiency';
    default: return 'Business Consulting';
  }
}
