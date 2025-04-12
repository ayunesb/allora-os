
export interface PartialCompanyDetails {
  name?: string;
  industry?: string;
  size?: string;
  founded?: string;
  website?: string;
  headquarters?: string;
  description?: string;
  revenue?: string;
  funding?: string;
  employees?: string;
  riskProfile?: string;
  executives?: Array<{
    name: string;
    role: string;
    imageUrl?: string;
  }>;
  goals?: string[];
  competitors?: string[];
  target_audience?: string;
  usps?: string[];
  challenges?: string[];
  strengths?: string[];
  weaknesses?: string[];
  technologies?: string[];
  crmSystem?: string;
  marketingPlatform?: string;
  usesEcommerce?: boolean;
  shopName?: string;
  brandColors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  logoUrl?: string;
  communicationPreferences?: {
    emailFrequency?: string;
    notificationPreferences?: string[];
    preferredChannel?: string;
  };
  documentGenerationTypes?: string[];
  integrationApiKey?: string;
  
  // Brand Identity properties
  primaryColor?: string;
  secondaryColor?: string;
  brandTone?: string;
  
  // Communication preferences properties
  emailEnabled?: boolean;
  whatsAppEnabled?: boolean;
  phoneEnabled?: boolean;
  zoomEnabled?: boolean;
  communicationChannels?: string[];
  salesStylePreference?: string;
  
  // Company fundamentals
  mission?: string;
  vision?: string;
  phone?: string;
  targetMarket?: string;
  businessType?: string;
  coreProducts?: string[];
  businessModel?: string;
  
  // Financial overview
  financials?: string;
  burnRate?: string;
  runway?: string;
  
  // Growth & traction
  userMetrics?: string;
  partnerships?: string[];
  
  // Market analysis
  marketSize?: string;
  differentiators?: string;
  painPoints?: string[];
  
  // Marketing & sales
  acquisitionStrategy?: string[];
  salesChannels?: string[];
  customerRetention?: string;
  pricingStrategy?: string;
  
  // Product & technology
  techStack?: string[];
  productStage?: string;
  intellectualProperty?: string;
  rdPipeline?: string;
  
  // Team & leadership
  founders?: string;
  teamSize?: string;
  cultureValues?: string[];
  
  // Strategic goals
  shortTermPlan?: string;
  longTermVision?: string;
  
  // AI readiness
  currentAiUse?: string;
  aiOpportunities?: string[];
  
  // Special info
  socialImpact?: string;
  exitStrategy?: string;
  
  // Executive team settings
  executiveTeamEnabled?: boolean;
  
  [key: string]: any; // Allow any other properties
}
