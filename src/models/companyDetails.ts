
export interface CompanyDetails {
  // Basic company details
  companySize?: string;
  foundingYear?: number;
  website?: string;
  location?: string;
  description?: string;
  mission?: string;
  vision?: string;
  headquarters?: string;
  phone?: string;
  businessType?: 'B2B' | 'B2C' | 'Both';
  
  // Financial information
  revenue?: string;
  funding?: string;
  profitMargin?: string;
  financials?: string;
  burnRate?: string;
  runway?: string;
  userMetrics?: string;
  
  // Business information
  businessModel?: string;
  targetMarket?: string;
  competitiveLandscape?: string;
  marketPosition?: string;
  marketSize?: string;
  differentiators?: string;
  
  // Product and Technology
  productStage?: string;
  intellectualProperty?: string;
  rdPipeline?: string;
  
  // Teams and Leadership
  founders?: string;
  teamSize?: number;
  
  // Marketing and Sales
  customerRetention?: string;
  pricingStrategy?: string;
  
  // AI Information
  currentAiUse?: string;
  
  // Social impact
  socialImpact?: string;
  exitStrategy?: string;
  
  // Strategic planning
  shortTermPlan?: string;
  longTermVision?: string;
  
  // Goals and risk information
  goals?: string[];
  shortTermGoals?: string[];
  longTermGoals?: string[];
  riskAppetite?: 'low' | 'medium' | 'high';
  coreProducts?: string[];
  techStack?: string[];
  competitors?: string[];
  painPoints?: string[];
  acquisitionStrategy?: string[];
  salesChannels?: string[];
  partnerships?: string[];
  cultureValues?: string[];
  aiOpportunities?: string[];
  challenges?: string[];
  
  // Communication preferences
  whatsAppEnabled?: boolean;
  emailEnabled?: boolean;
  executiveTeamEnabled?: boolean;
  communication_preferences?: {
    whatsapp_enabled?: boolean;
    email_enabled?: boolean;
  };
  
  // AI compatibility
  aiReadiness?: string;
  aiExperience?: string;
  
  // Onboarding status
  onboarding_completed?: boolean;
  onboarding_completed_at?: string;
}

export type PartialCompanyDetails = Partial<CompanyDetails>;
