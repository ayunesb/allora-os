
export type CompanyDetails = {
  // Company Fundamentals
  description: string;
  mission: string;
  vision: string;
  coreProducts: string[];
  businessModel: string;
  
  // Market Analysis
  marketSize: string;
  competitors: string[];
  differentiators: string;
  painPoints: string[];
  
  // Growth & Traction
  revenue: string;
  userMetrics: string;
  funding: string;
  partnerships: string[];
  
  // Product & Technology
  techStack: string[];
  productStage: string;
  intellectualProperty: string;
  rdPipeline: string;
  
  // Team & Leadership
  founders: string;
  teamSize: number;
  cultureValues: string[];
  
  // Marketing & Sales
  acquisitionStrategy: string[];
  salesChannels: string[];
  customerRetention: string;
  pricingStrategy: string;
  
  // AI Readiness
  currentAiUse: string;
  aiOpportunities: string[];
  
  // Financial Overview
  financials: string;
  burnRate: string;
  runway: string;
  
  // Strategic Goals
  shortTermPlan: string;
  longTermVision: string;
  challenges: string[];
  
  // Special Info
  socialImpact: string;
  exitStrategy: string;
};

export type PartialCompanyDetails = Partial<CompanyDetails>;
