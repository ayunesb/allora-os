
export interface CompanyDetails {
  // Basic company details
  companySize?: string;
  foundingYear?: number;
  website?: string;
  location?: string;
  
  // Financial information
  revenue?: string;
  funding?: string;
  profitMargin?: string;
  
  // Business information
  businessModel?: string;
  targetMarket?: string;
  competitiveLandscape?: string;
  marketPosition?: string;
  
  // Goals and risk information
  goals?: string[];
  shortTermGoals?: string[];
  longTermGoals?: string[];
  riskAppetite?: 'low' | 'medium' | 'high';
  
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
