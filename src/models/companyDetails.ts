export interface PartialCompanyDetails {
  // Basic Information
  description?: string;
  mission?: string;
  vision?: string;
  headquarters?: string;
  phone?: string;
  website?: string;
  email?: string;
  primaryOffering?: string;
  companySize?: string;
  monthlyRevenue?: string;
  geographicMarket?: string;
  
  // Strategic Goals
  goals?: string[];
  timeHorizon?: string;
  
  // Risk Appetite
  riskAppetite?: 'low' | 'medium' | 'high';
  
  // Brand Identity
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  brandTone?: string;
  
  // Communication Preferences
  communicationChannels?: string[];
  salesStylePreference?: string;
  emailEnabled?: boolean;
  whatsAppEnabled?: boolean;
  phoneEnabled?: boolean;
  zoomEnabled?: boolean;
  
  // CRM & Marketing
  crmSystem?: string;
  marketingPlatform?: string;
  usesEcommerce?: boolean;
  shopName?: string;
  
  // Other Details
  executiveTeamEnabled?: boolean;
  [key: string]: any;
}
