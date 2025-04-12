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
}
